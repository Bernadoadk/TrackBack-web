/**
 * Interactive demo: a customer return portal (left) wired to the merchant admin
 * (right). Every customer action lands on the merchant side, every merchant action
 * updates the customer's tracking page. Pure client-side simulation.
 */
import { track } from '@vercel/analytics';
import { installUrl, type Lang } from '../../config/site';
import { iconSvg, type IconName } from '../icons';
import {
  BONUS_PCT,
  DEMO,
  NEW_RMA,
  PAYOUT_METHODS,
  PORTAL,
  REASONS,
  RETURN_METHODS,
  SCENARIOS,
  SCENARIO_ORDER,
  STORES,
  type DemoItem,
  type ResolutionKey,
  type ReturnMethod,
  type ScenarioKey,
  type Status,
} from './demo-data';

type Tone = 'info' | 'success' | 'mail' | 'warn';
type ActivityEvent = { time: string; text: string; tone: Tone };

type State = {
  scenario: ScenarioKey;
  portalLang: Lang;
  step: number;
  view: 'flow' | 'submitted' | 'status';
  busy: boolean;
  error: string | null;
  orderNumber: string;
  email: string;
  name: string;
  selected: Set<string>;
  reasons: Record<string, string>;
  note: string;
  resolution: ResolutionKey | null;
  variant: string;
  payoutMethod: string;
  payoutAccount: string;
  payoutName: string;
  returnMethod: ReturnMethod;
  whatsapp: boolean;
  phone: string;
  comment: string;
  submitted: boolean;
  submittedAt: Date | null;
  status: Status;
  events: ActivityEvent[];
  clock: number;
  pending: number;
  retained: number;
  payoutRef: string;
  done: boolean;
  tab: 'customer' | 'merchant';
  unseen: number;
};

const root = document.querySelector<HTMLElement>('[data-demo]');
if (root) initDemo(root);

function initDemo(root: HTMLElement) {
  const pageLang: Lang = root.dataset.lang === 'fr' ? 'fr' : 'en';
  const T = DEMO[pageLang];
  const portalEl = root.querySelector<HTMLElement>('[data-portal]')!;
  const merchantEl = root.querySelector<HTMLElement>('[data-merchant]')!;
  const merchantPanel = root.querySelector<HTMLElement>('[data-panel="merchant"]')!;
  const scenariosEl = root.querySelector<HTMLElement>('[data-scenarios]')!;
  const toastEl = document.querySelector<HTMLElement>('[data-demo-toasts]')!;
  const unseenEl = root.querySelector<HTMLElement>('[data-unseen]');
  const desktop = window.matchMedia('(min-width: 1024px)');

  // ── Helpers ────────────────────────────────────────────────────────────────
  const esc = (value: unknown) =>
    String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
  const fmt = (template: string, vars: Record<string, string | number> = {}) =>
    template.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  const icon = (name: IconName, cls = 'h-4 w-4', sw = 2) => iconSvg(name, cls, sw);
  const locale = (lang: Lang) => (lang === 'fr' ? 'fr-FR' : 'en-US');
  const today = new Date();
  const addDays = (days: number) => new Date(today.getTime() + days * 86_400_000);
  const dateFmt = (d: Date, lang: Lang) => d.toLocaleDateString(locale(lang), { year: 'numeric', month: 'long', day: 'numeric' });
  const dateTimeFmt = (d: Date, lang: Lang) =>
    d.toLocaleString(locale(lang), { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const mask = (value: string) => {
    const v = value.replace(/\s+/g, '');
    return v.length <= 4 ? v : '•'.repeat(Math.min(6, v.length - 4)) + v.slice(-4);
  };

  const scen = () => SCENARIOS[s.scenario];
  const store = () => STORES[scen().store];
  const P = () => PORTAL[s.portalLang];
  const currency = () => store().currency[pageLang];
  const money = (amount: number, lang: Lang, digits?: number) =>
    new Intl.NumberFormat(locale(lang), {
      style: 'currency',
      currency: currency(),
      minimumFractionDigits: digits ?? (currency() === 'XOF' ? 0 : 2),
      maximumFractionDigits: digits ?? (currency() === 'XOF' ? 0 : 2),
    }).format(amount);
  const selectedItems = () => store().items.filter((i) => s.selected.has(i.id));
  const base = () => selectedItems().reduce((sum, i) => sum + i.price, 0);
  const value = () => (s.resolution === 'credit' ? Math.round(base() * (100 + BONUS_PCT)) / 100 : base());
  const payout = () => PAYOUT_METHODS.find((m) => m.key === s.payoutMethod) ?? PAYOUT_METHODS[0];
  const isWithdrawal = () => scen().flow === 'withdrawal';

  function freshState(key: ScenarioKey, keep?: Partial<State>): State {
    const sc = SCENARIOS[key];
    const st = STORES[sc.store];
    const reasons: Record<string, string> = {};
    sc.selected.forEach((id) => (reasons[id] = sc.reason));
    return {
      scenario: key,
      portalLang: keep?.portalLang ?? pageLang,
      step: 0,
      view: 'flow',
      busy: false,
      error: null,
      orderNumber: st.order,
      email: st.email,
      name: st.customer,
      selected: new Set(sc.selected),
      reasons,
      note: sc.note[keep?.portalLang ?? pageLang],
      resolution: sc.resolution,
      variant: 'L',
      payoutMethod: 'wave',
      payoutAccount: st.phone,
      payoutName: st.customer,
      returnMethod: 'ship',
      whatsapp: false,
      phone: st.phone,
      comment: '',
      submitted: false,
      submittedAt: null,
      status: 'PENDING',
      events: [],
      clock: 0,
      pending: 2,
      retained: st.retainedBase,
      payoutRef: '',
      done: false,
      tab: keep?.tab ?? 'customer',
      unseen: 0,
    };
  }

  const requested = new URLSearchParams(location.search).get('scenario') as ScenarioKey | null;
  let s: State = freshState(requested && SCENARIO_ORDER.includes(requested) ? requested : 'refund');

  // ── Merchant events & toasts ───────────────────────────────────────────────
  function clockLabel() {
    const base = s.submittedAt ? s.submittedAt.getTime() : Date.now();
    return new Date(base + s.clock * 60_000).toLocaleTimeString(locale(pageLang), { hour: '2-digit', minute: '2-digit' });
  }

  function addEvent(text: string, tone: Tone) {
    s.events.push({ time: clockLabel(), text, tone });
    s.clock += 1;
    if (!desktop.matches && s.tab === 'customer') s.unseen += 1;
  }

  let toastTimer: number | undefined;
  function toast(text: string, kind: IconName = 'bell') {
    toastEl.innerHTML = `<div class="pointer-events-auto flex max-w-md items-center gap-3 rounded-xl border border-border bg-elevated px-4 py-3 text-[14px] text-ink shadow-2xl">
      <span class="grid h-8 w-8 shrink-0 place-content-center rounded-lg bg-teal/20 text-teal-300">${icon(kind)}</span>
      <span>${esc(text)}</span></div>`;
    toastEl.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => (toastEl.hidden = true), 3600);
  }

  // ── Rendering: scenario picker & tabs ───────────────────────────────────────
  function renderScenarios() {
    scenariosEl.innerHTML = SCENARIO_ORDER.map((key) => {
      const on = key === s.scenario;
      const sc = T.scenarios[key];
      return `<button type="button" data-action="scenario" data-value="${key}" aria-pressed="${on}"
        class="shrink-0 rounded-xl border px-3.5 py-2.5 text-left transition-colors ${on ? 'border-brand-300/70 bg-brand/15' : 'border-border bg-surface hover:border-brand-300/40'}">
        <span class="block text-[14px] font-semibold ${on ? 'text-ink' : 'text-muted'}">${esc(sc.label)}</span>
        <span class="block text-[12px] text-faint">${esc(sc.hint)}</span></button>`;
    }).join('');
    // Keep the active scenario visible in the horizontally scrolling row (mobile).
    const active = scenariosEl.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (active && scenariosEl.scrollWidth > scenariosEl.clientWidth) {
      scenariosEl.scrollLeft = Math.max(0, active.offsetLeft - scenariosEl.offsetLeft - 16);
    }
  }

  function renderTabs() {
    root!.dataset.tab = s.tab;
    root!.querySelectorAll<HTMLButtonElement>('[data-action="tab"]').forEach((b) => {
      const on = b.dataset.value === s.tab;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    if (unseenEl) {
      unseenEl.hidden = s.unseen === 0;
      unseenEl.textContent = String(s.unseen);
    }
  }

  // ── Rendering: customer portal ──────────────────────────────────────────────
  const field = 'mt-1.5 block w-full rounded-lg border border-paper-line bg-white px-3 py-2.5 text-[15px] text-paper-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';
  const labelCls = 'block text-[13px] font-semibold text-paper-ink';
  const primaryBtn = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-[15px] font-semibold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50';
  const ghostBtn = 'inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-[15px] font-semibold text-paper-muted transition hover:text-paper-ink';

  function thumb(item: DemoItem) {
    return `<span class="grid h-12 w-12 shrink-0 place-content-center rounded-lg text-white" style="background:${item.color}">${icon(item.icon, 'h-6 w-6', 1.8)}</span>`;
  }

  function stepper(labels: string[], current: number) {
    return `<ol class="grid gap-1.5" style="grid-template-columns:repeat(${labels.length},minmax(0,1fr))" aria-label="${esc(fmt(P().stepOf, { n: current + 1, total: labels.length }))}">
      ${labels
        .map(
          (l, i) => `<li ${i === current ? 'aria-current="step"' : ''}>
            <span class="block h-1.5 rounded-full ${i <= current ? 'bg-brand' : 'bg-paper-line'}"></span>
            <span class="mt-1.5 hidden truncate text-[12px] sm:block ${i === current ? 'font-semibold text-paper-ink' : 'text-paper-muted'}">${esc(l)}</span></li>`,
        )
        .join('')}</ol>
      <p class="mt-2 text-[12px] font-medium text-paper-muted sm:hidden">${esc(fmt(P().stepOf, { n: current + 1, total: labels.length }))} · ${esc(labels[current])}</p>`;
  }

  function heading(title: string, desc?: string) {
    return `<h2 class="text-[20px] font-bold tracking-tight text-paper-ink outline-none" tabindex="-1" data-step-heading>${esc(title)}</h2>
      ${desc ? `<p class="mt-1 text-[14px] text-paper-muted">${esc(desc)}</p>` : ''}`;
  }

  function errorBox() {
    return s.error
      ? `<p class="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[14px] text-red-700" role="alert">${icon('alert')}${esc(s.error)}</p>`
      : '';
  }

  function nav(opts: { back?: boolean; next: string; action: string; disabled?: boolean }) {
    return `<div class="mt-6 flex items-center justify-between gap-3">
      ${opts.back ? `<button type="button" class="${ghostBtn}" data-action="back">${icon('arrow-left')}${esc(P().back)}</button>` : '<span></span>'}
      <button type="button" class="${primaryBtn}" data-action="${opts.action}" ${opts.disabled || s.busy ? 'disabled' : ''}>
        ${s.busy ? `<span class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>` : ''}${esc(opts.next)}</button></div>`;
  }

  function itemRow(item: DemoItem, withCheckbox: boolean, eligibleOverride?: boolean) {
    const eligible = eligibleOverride ?? item.eligible;
    const on = s.selected.has(item.id);
    return `<label class="flex items-center gap-3 rounded-xl border-2 p-3 transition ${eligible ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'} ${on && eligible ? 'border-brand bg-brand/[0.04]' : 'border-paper-line'}">
      ${withCheckbox ? `<input type="checkbox" class="h-4 w-4 accent-[#0e5df1]" data-field="item" data-id="${item.id}" ${on && eligible ? 'checked' : ''} ${eligible ? '' : 'disabled'} />` : ''}
      ${thumb(item)}
      <span class="min-w-0 flex-1">
        <span class="block truncate text-[15px] font-semibold text-paper-ink">${esc(item.title[s.portalLang])}</span>
        <span class="block text-[13px] text-paper-muted">${esc(item.variant[s.portalLang])} · ${esc(P().qty)} 1</span>
        ${eligible ? '' : `<span class="mt-0.5 block text-[13px] font-medium text-amber-700">${esc(P().reasonFinalSale)}</span>`}
      </span>
      <span class="text-[14px] font-semibold tabular-nums text-paper-ink">${esc(money(item.price, s.portalLang))}</span></label>`;
  }

  function resolutionOptions(): ResolutionKey[] {
    return store().offline ? ['offline', 'credit'] : ['credit', 'exchange', 'original'];
  }

  function resolutionTitle(key: ResolutionKey, lang: Lang = s.portalLang) {
    const p = PORTAL[lang];
    return { original: p.refundOriginalTitle, credit: p.storeCreditTitle, exchange: p.exchangeTitle, offline: p.refundOfflineTitle }[key];
  }

  function renderResolutionStep() {
    const p = P();
    const opts = resolutionOptions()
      .map((key) => {
        const on = s.resolution === key;
        const desc = { original: p.refundOriginalDesc, credit: p.storeCreditDesc, exchange: p.exchangeDesc, offline: p.refundOfflineDesc }[key];
        let extra = '';
        if (key === 'credit') {
          extra = `<span class="mt-1 block text-[13px] font-medium text-emerald-700">${esc(
            fmt(p.bonusLine, { total: money(Math.round(base() * (100 + BONUS_PCT)) / 100, s.portalLang), base: money(base(), s.portalLang) }),
          )}</span>`;
        }
        let details = '';
        if (on && key === 'exchange') {
          details = `<div class="mt-3 border-t border-paper-line pt-3">
            <p class="text-[13px] font-semibold text-paper-ink">${esc(p.chooseReplacement)}</p>
            <div class="mt-2 flex flex-wrap gap-2">${(store().variants ?? [])
              .map(
                (v) => `<button type="button" data-action="variant" data-value="${v.id}" ${v.stock ? '' : 'disabled'} aria-pressed="${s.variant === v.id}"
                  class="min-w-12 rounded-lg border-2 px-3 py-1.5 text-[14px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${s.variant === v.id ? 'border-brand bg-brand text-white' : 'border-paper-line text-paper-ink hover:border-brand/60'}">
                  ${esc(v.id)}${v.stock ? '' : ` <span class="text-[11px] font-medium">· ${esc(p.outOfStock)}</span>`}</button>`,
              )
              .join('')}</div></div>`;
        }
        if (on && key === 'offline') {
          const kind = payout().kind;
          details = `<div class="mt-3 grid gap-3 border-t border-paper-line pt-3 sm:grid-cols-2">
            <label class="sm:col-span-2 ${labelCls}">${esc(p.payoutMethod)}
              <select class="${field}" data-field="payoutMethod">${PAYOUT_METHODS.map(
                (m) => `<option value="${m.key}" ${m.key === s.payoutMethod ? 'selected' : ''}>${esc(m.label[s.portalLang])}</option>`,
              ).join('')}</select></label>
            ${
              kind === 'cash'
                ? `<p class="sm:col-span-2 rounded-lg bg-paper-soft px-3 py-2 text-[13px] text-paper-muted">${esc(p.payoutCashNote)}</p>`
                : `<label class="${labelCls}">${esc(kind === 'phone' ? p.payoutAccountPhone : kind === 'bank' ? p.payoutAccountBank : p.payoutAccountOther)}
                    <input class="${field}" data-field="payoutAccount" value="${esc(s.payoutAccount)}" inputmode="${kind === 'phone' ? 'tel' : 'text'}" autocomplete="off" /></label>
                  <label class="${labelCls}">${esc(p.payoutName)}
                    <input class="${field}" data-field="payoutName" value="${esc(s.payoutName)}" autocomplete="off" /></label>`
            }</div>`;
        }
        return `<div class="rounded-xl border-2 p-3.5 transition ${on ? 'border-brand bg-brand/[0.04]' : 'border-paper-line hover:border-brand/40'}">
          <label class="flex cursor-pointer items-start gap-3">
            <input type="radio" name="demo-resolution" value="${key}" data-field="resolution" class="mt-1 h-4 w-4 accent-[#0e5df1]" ${on ? 'checked' : ''} />
            <span class="min-w-0 flex-1">
              <span class="flex flex-wrap items-center gap-1.5 text-[15px] font-semibold text-paper-ink">${esc(resolutionTitle(key))}
                ${key === 'credit' ? `<span class="rounded-full bg-emerald-500/12 px-1.5 py-0.5 text-[11px] font-bold text-emerald-700">${esc(fmt(p.bonusBadge, { pct: BONUS_PCT }))}</span><span class="rounded-full bg-brand/10 px-1.5 py-0.5 text-[11px] font-bold text-brand-hover">${esc(p.recommended)}</span>` : ''}
              </span>
              <span class="mt-0.5 block text-[13px] text-paper-muted">${esc(desc)}</span>${extra}
            </span></label>${details}</div>`;
      })
      .join('');
    return `${heading(p.labelRefundType, p.descRefundType)}${errorBox()}<div class="mt-4 space-y-2.5">${opts}</div>${nav({ back: true, next: p.continue, action: 'next', disabled: !s.resolution })}`;
  }

  function summaryRows() {
    const p = P();
    const rows: [string, string, boolean?][] = selectedItems().map((i) => [`${i.title[s.portalLang]} · ${i.variant[s.portalLang]}`, money(i.price, s.portalLang)]);
    rows.push([p.subtotal, money(base(), s.portalLang)]);
    if (s.resolution === 'credit') rows.push([fmt(p.bonusCredit, { pct: BONUS_PCT }), `+${money(value() - base(), s.portalLang)}`]);
    const totalLabel = s.resolution === 'credit' ? p.totalCredit : s.resolution === 'exchange' ? p.exchangeValue : p.estimatedRefund;
    rows.push([totalLabel, money(value(), s.portalLang), true]);
    return rows
      .map(
        ([l, v, strong]) => `<div class="flex items-center justify-between gap-3 py-1.5 ${strong ? 'mt-1 border-t border-paper-line pt-2.5 text-[15px] font-bold text-paper-ink' : 'text-[14px] text-paper-muted'}">
          <span class="min-w-0 truncate">${esc(l)}</span><span class="tabular-nums">${esc(v)}</span></div>`,
      )
      .join('');
  }

  function resolutionSummary(lang: Lang = s.portalLang) {
    const title = resolutionTitle(s.resolution ?? 'original', lang);
    if (s.resolution === 'exchange') return `${title} · ${s.variant}`;
    if (s.resolution === 'offline') {
      const m = payout();
      return m.kind === 'cash' ? m.label[lang] : `${m.label[lang]} · ${mask(s.payoutAccount)}`;
    }
    return title;
  }

  function methodLabel(method: ReturnMethod, lang: Lang = s.portalLang) {
    const p = PORTAL[lang];
    return { ship: p.methodShip, label: p.methodLabel, store: p.methodStore, pickup: p.methodPickup }[method];
  }

  function renderConfirmStep() {
    const p = P();
    const methods = RETURN_METHODS.map((m) => {
      const desc = { ship: p.methodShipDesc, label: p.methodLabelDesc, store: p.methodStoreDesc, pickup: p.methodPickupDesc }[m];
      const on = s.returnMethod === m;
      return `<label class="flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 transition ${on ? 'border-brand bg-brand/[0.04]' : 'border-paper-line'}">
        <input type="radio" name="demo-method" value="${m}" data-field="returnMethod" class="mt-0.5 h-4 w-4 accent-[#0e5df1]" ${on ? 'checked' : ''} />
        <span><span class="block text-[14px] font-semibold text-paper-ink">${esc(methodLabel(m))}</span><span class="block text-[12px] text-paper-muted">${esc(desc)}</span></span></label>`;
    }).join('');
    return `${heading(p.labelConfirm, p.descConfirm)}
      <div class="mt-4 rounded-xl bg-paper-soft p-3.5">${summaryRows()}</div>
      <p class="mt-3 flex items-center justify-between gap-3 text-[14px]"><span class="text-paper-muted">${esc(p.refundMethodLabel)}</span><span class="text-right font-semibold text-paper-ink">${esc(resolutionSummary())}</span></p>
      <fieldset class="mt-5"><legend class="text-[14px] font-semibold text-paper-ink">${esc(p.returnMethodTitle)}</legend>
        <div class="mt-2 grid gap-2 sm:grid-cols-2">${methods}</div></fieldset>
      <label class="mt-5 flex cursor-pointer items-center gap-2.5 text-[14px] text-paper-ink">
        <input type="checkbox" data-field="whatsapp" class="h-4 w-4 accent-[#0e5df1]" ${s.whatsapp ? 'checked' : ''} />${esc(p.whatsappOptIn)}</label>
      ${s.whatsapp ? `<label class="mt-3 ${labelCls}">${esc(p.phoneLabel)}<input class="${field}" data-field="phone" value="${esc(s.phone)}" inputmode="tel" /></label>` : ''}
      <p class="mt-4 text-[12px] text-paper-muted">${esc(p.agreePolicy)}</p>
      ${nav({ back: true, next: s.busy ? p.submitting : p.labelSubmit, action: 'submit' })}`;
  }

  function renderReturnFlow() {
    const p = P();
    const st = store();
    const labels = [p.stepFind, p.stepItems, p.stepReason, p.stepResolution, p.stepConfirm];
    let body = '';
    if (s.step === 0) {
      body = `${heading(p.labelFindOrder, p.descFindOrder)}${errorBox()}
        <div class="mt-5 grid gap-4 sm:grid-cols-2">
          <label class="${labelCls}">${esc(p.orderNumber)}<input class="${field}" data-field="orderNumber" value="${esc(s.orderNumber)}" autocomplete="off" /></label>
          <label class="${labelCls}">${esc(p.emailAddress)}<input class="${field}" type="email" data-field="email" value="${esc(s.email)}" autocomplete="off" /></label>
        </div>
        ${nav({ next: s.busy ? p.searching : p.labelCta, action: 'find' })}`;
    } else if (s.step === 1) {
      body = `${heading(p.labelSelectItems, p.descSelectItems)}
        <p class="mt-3 text-[13px] text-paper-muted">${esc(fmt(p.fromOrder, { order: st.order, date: dateFmt(addDays(-6), s.portalLang) }))} · ${esc(fmt(p.returnBy, { date: dateFmt(addDays(24), s.portalLang) }))}</p>
        <div class="mt-4 space-y-2.5">${st.items.map((i) => itemRow(i, true)).join('')}</div>
        ${nav({ back: true, next: p.continue, action: 'next', disabled: selectedItems().length === 0 })}`;
    } else if (s.step === 2) {
      const selects = selectedItems()
        .map(
          (i) => `<label class="block ${labelCls}">${esc(i.title[s.portalLang])} — ${esc(p.selectReason)}
            <select class="${field}" data-field="reason" data-id="${i.id}"><option value="">${esc(p.chooseReason)}</option>
            ${REASONS.map((r) => `<option value="${r.key}" ${s.reasons[i.id] === r.key ? 'selected' : ''}>${esc(r.label[s.portalLang])}</option>`).join('')}</select></label>`,
        )
        .join('');
      const missing = selectedItems().some((i) => !s.reasons[i.id]);
      body = `${heading(p.labelReasons, p.descReasons)}<div class="mt-5 space-y-4">${selects}
        <label class="block ${labelCls}">${esc(p.notes)} <span class="font-normal text-paper-muted">(${esc(p.optional)})</span>
          <textarea class="${field} min-h-20" data-field="note" placeholder="${esc(p.notesPlaceholder)}">${esc(s.note)}</textarea></label></div>
        ${nav({ back: true, next: p.continue, action: 'next', disabled: missing })}`;
    } else if (s.step === 3) {
      body = renderResolutionStep();
    } else {
      body = renderConfirmStep();
    }
    return `<div class="px-5 pt-5">${stepper(labels, s.step)}</div><div class="p-5 pt-6">${body}</div>`;
  }

  function renderWithdrawalFlow() {
    const p = P();
    const st = store();
    const labels = [p.stepFind, p.withdrawConfirm];
    let body = '';
    if (s.step === 0) {
      body = `<p class="mb-3 text-[12px] text-paper-muted">${esc(p.returnCenter)} › <span class="font-semibold text-brand">${esc(p.withdrawLink)}</span></p>
        ${heading(p.withdrawTitle, p.withdrawDesc)}${errorBox()}
        <div class="mt-5 grid max-w-md gap-4">
          <label class="${labelCls}">${esc(p.withdrawName)}<input class="${field}" data-field="name" value="${esc(s.name)}" autocomplete="off" /></label>
          <label class="${labelCls}">${esc(p.orderNumber)}<input class="${field}" data-field="orderNumber" value="${esc(s.orderNumber)}" autocomplete="off" /></label>
          <label class="${labelCls}">${esc(p.emailAddress)}<input class="${field}" type="email" data-field="email" value="${esc(s.email)}" autocomplete="off" /></label>
        </div>
        ${nav({ next: s.busy ? p.searching : p.continue, action: 'find' })}`;
    } else {
      body = `${heading(p.withdrawItems, st.order)}
        <div class="mt-4 space-y-2.5">${st.items.map((i) => itemRow(i, true, true)).join('')}</div>
        <label class="mt-4 block ${labelCls}">${esc(p.withdrawComment)} <span class="font-normal text-paper-muted">(${esc(p.optional)})</span>
          <textarea class="${field} min-h-20" data-field="comment">${esc(s.comment)}</textarea></label>
        ${nav({ back: true, next: s.busy ? p.submitting : p.withdrawConfirm, action: 'submit', disabled: s.selected.size === 0 })}`;
    }
    return `<div class="px-5 pt-5">${stepper(labels, s.step)}</div><div class="p-5 pt-6">${body}</div>`;
  }

  function rmaBox() {
    return `<div class="mt-5 flex items-center justify-between gap-3 rounded-xl border border-paper-line p-3.5">
      <span class="text-[12px] font-semibold uppercase tracking-wide text-paper-muted">${esc(P().yourRma)}</span>
      <span class="font-mono text-[16px] font-bold text-paper-ink">${NEW_RMA}</span></div>`;
  }

  function seeMerchantButton() {
    return `<button type="button" data-action="see-merchant" class="inline-flex min-h-11 items-center gap-2 rounded-lg border-2 border-dashed border-brand/50 px-4 text-[14px] font-semibold text-brand transition hover:bg-brand/5">
      ${esc(T.seeMerchant)} ${icon('arrow-right')}</button>`;
  }

  function renderSubmitted() {
    const p = P();
    const sub = submittedAtLabel();
    const title = isWithdrawal() ? p.withdrawDoneTitle : p.submittedTitle;
    const desc = isWithdrawal() ? fmt(p.withdrawDoneDesc, { date: sub, email: s.email }) : p.submittedDesc;
    let steps = '';
    if (!isWithdrawal()) {
      const methodStep = { ship: p.stepShipAfterApproval, label: p.stepLabel, store: p.stepStore, pickup: p.stepPickup }[s.returnMethod];
      const resStep = s.resolution === 'credit' ? p.stepCredit : s.resolution === 'exchange' ? p.stepExchange : p.stepRefund;
      const list = [p.stepReview, methodStep, resStep];
      if (s.returnMethod === 'ship' || s.returnMethod === 'label') list.push(fmt(p.writeRma, { rma: NEW_RMA }));
      steps = `<div class="mt-5 text-left"><p class="text-[14px] font-semibold text-paper-ink">${esc(p.nextSteps)}</p>
        <ol class="mt-2 space-y-2">${list
          .map((t, i) => `<li class="flex gap-2.5 text-[14px] text-paper-muted"><span class="grid h-5 w-5 shrink-0 place-content-center rounded-full bg-brand/10 text-[11px] font-bold text-brand-hover">${i + 1}</span>${esc(t)}</li>`)
          .join('')}</ol></div>`;
    }
    return `<div class="p-6 text-center">
      <span class="mx-auto grid h-14 w-14 place-content-center rounded-full bg-emerald-500/12 text-emerald-600">${icon('check', 'h-7 w-7', 3)}</span>
      <h2 class="mt-4 text-[21px] font-bold tracking-tight text-paper-ink outline-none" tabindex="-1" data-step-heading>${esc(title)}</h2>
      <p class="mx-auto mt-1.5 max-w-sm text-[14px] text-paper-muted">${esc(desc)}</p>
      ${rmaBox()}${steps}
      <div class="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
        <button type="button" data-action="track" class="${primaryBtn}">${icon('search')}${esc(p.trackThisReturn)}</button>
        ${seeMerchantButton()}
      </div></div>`;
  }

  function submittedAtLabel() {
    return s.submittedAt ? dateTimeFmt(s.submittedAt, s.portalLang) : '';
  }

  function renderStatus() {
    const p = P();
    const order: Status[] = ['PENDING', 'APPROVED', 'RECEIVED', 'REFUNDED'];
    const reached = order.indexOf(s.status);
    const steps =
      s.status === 'REJECTED'
        ? [
            { label: p.tlRequested, done: true },
            { label: p.tlRejected, done: true, bad: true },
          ]
        : [
            { label: p.tlRequested, done: true },
            { label: p.tlApproved, done: reached >= 1 },
            { label: p.tlReceived, done: reached >= 2 },
            { label: p.tlRefunded, done: reached >= 3 },
          ];
    const tone = s.status === 'REFUNDED' ? 'bg-emerald-500/12 text-emerald-700' : s.status === 'REJECTED' ? 'bg-red-500/10 text-red-700' : 'bg-amber-500/15 text-amber-800';
    const doneLine =
      s.status === 'REFUNDED'
        ? `<p class="mt-4 rounded-lg bg-paper-soft px-3 py-2 text-[14px] font-semibold text-paper-ink">${esc(
            fmt(p.refundDone, { method: resolutionTitle(isWithdrawal() ? 'original' : (s.resolution ?? 'original')), amount: money(isWithdrawal() ? base() : value(), s.portalLang) }),
          )}</p>`
        : '';
    return `<div class="p-6">
      ${heading(p.statusTitle)}
      <div class="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span class="font-mono text-[15px] font-bold text-paper-ink">${NEW_RMA}</span>
        <span class="rounded-full px-2.5 py-1 text-[12px] font-bold ${tone}">${esc(p[`status_${s.status}` as keyof typeof p] as string)}</span>
      </div>
      <ol class="mt-5 space-y-3">${steps
        .map(
          (st) => `<li class="flex items-center gap-3 text-[14px] ${st.done ? 'font-semibold text-paper-ink' : 'text-paper-muted'}">
            <span class="grid h-6 w-6 shrink-0 place-content-center rounded-full ${st.done ? ('bad' in st && st.bad ? 'bg-red-500 text-white' : 'bg-brand text-white') : 'border-2 border-paper-line'}">${st.done ? icon('bad' in st && st.bad ? 'x' : 'check', 'h-3.5 w-3.5', 3) : ''}</span>${esc(st.label)}</li>`,
        )
        .join('')}</ol>${doneLine}
      <div class="mt-6 flex flex-col gap-2 sm:flex-row">
        ${s.done ? '' : seeMerchantButton()}
        <button type="button" data-action="restart" class="${ghostBtn}">${icon('refresh')}${esc(p.newReturn)}</button>
      </div></div>`;
  }

  function renderPortal() {
    const p = P();
    const st = store();
    const langSwitch = (['en', 'fr'] as Lang[])
      .map(
        (l) => `<button type="button" data-action="plang" data-value="${l}" aria-pressed="${s.portalLang === l}" lang="${l}"
          class="rounded-md px-2 py-1 text-[12px] font-bold transition ${s.portalLang === l ? 'bg-paper-ink text-white' : 'text-paper-muted hover:text-paper-ink'}">${l.toUpperCase()}</button>`,
      )
      .join('');
    let body: string;
    if (s.view === 'status') body = renderStatus();
    else if (s.view === 'submitted') body = renderSubmitted();
    else body = isWithdrawal() ? renderWithdrawalFlow() : renderReturnFlow();
    portalEl.lang = s.portalLang;
    portalEl.innerHTML = `
      <div class="flex items-center justify-between gap-3 border-b border-paper-line px-5 py-4">
        <div class="min-w-0"><p class="truncate text-[12px] text-paper-muted">${esc(st.name)}</p>
          <p class="text-[17px] font-bold tracking-tight text-paper-ink">${esc(p.returnCenter)}</p></div>
        <div role="group" aria-label="${esc(T.portalLang)}" class="flex shrink-0 items-center gap-0.5 rounded-lg border border-paper-line p-0.5">${langSwitch}</div>
      </div>
      <div>${body}</div>
      <p class="flex items-center justify-center gap-1.5 border-t border-paper-line px-5 py-3 text-[12px] text-paper-muted">${icon('lock', 'h-3.5 w-3.5')}${esc(p.labelPoweredBy)}</p>`;
  }

  // ── Rendering: merchant admin ───────────────────────────────────────────────
  const statusPill = (status: Status) => {
    const tone = {
      PENDING: 'bg-amber-400/15 text-amber-300',
      APPROVED: 'bg-brand-300/15 text-brand-300',
      RECEIVED: 'bg-teal/20 text-teal-300',
      REFUNDED: 'bg-emerald-400/15 text-emerald-300',
      REJECTED: 'bg-red-400/15 text-red-300',
    }[status];
    return `<span class="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${tone}">${esc(T.admin.statuses[status])}</span>`;
  };

  function merchantResolution() {
    const A = T.admin.resolutions;
    if (isWithdrawal()) return A.withdrawal;
    switch (s.resolution) {
      case 'credit':
        return fmt(A.credit, { pct: BONUS_PCT });
      case 'exchange':
        return fmt(A.exchange, { variant: s.variant });
      case 'offline':
        return fmt(A.offline, { method: payout().label[pageLang] });
      default:
        return A.original;
    }
  }

  function merchantActions() {
    const A = T.admin.actions;
    const btn = (action: string, label: string, primary = true) =>
      `<button type="button" data-action="${action}" class="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-3.5 text-[14px] font-semibold transition ${
        primary ? 'bg-brand text-white hover:bg-brand-hover' : 'border border-border text-ink hover:border-brand-300/60'
      }">${esc(label)}</button>`;
    if (s.status === 'PENDING') {
      return `<div class="grid grid-cols-3 gap-2">${btn('m-approve', isWithdrawal() ? A.instructions : A.approve)}${isWithdrawal() ? '' : btn('m-reject', A.reject, false)}${btn('m-message', A.message, false)}</div>`;
    }
    if (s.status === 'APPROVED') return `<div class="grid gap-2 sm:grid-cols-2">${btn('m-receive', A.receive)}${btn('m-message', A.message, false)}</div>`;
    if (s.status === 'RECEIVED') {
      if (!isWithdrawal() && s.resolution === 'offline') {
        return `<label class="block text-[13px] font-semibold text-muted">${esc(T.admin.reference)}
            <input data-field="payoutRef" value="${esc(s.payoutRef)}" class="mt-1.5 block w-full rounded-lg border border-border bg-bg px-3 py-2 font-mono text-[14px] text-ink outline-none focus:border-brand-300" /></label>
          <div class="mt-2">${btn('m-final', A.payout)}</div>`;
      }
      const label = isWithdrawal() ? A.refund : s.resolution === 'credit' ? A.credit : s.resolution === 'exchange' ? A.exchange : A.refund;
      return btn('m-final', label);
    }
    return '';
  }

  function renderMerchant() {
    const A = T.admin;
    const st = store();
    const rows = [
      ...(s.submitted
        ? [
            {
              rma: NEW_RMA,
              who: st.customer,
              order: st.order,
              what: isWithdrawal() ? A.withdrawalTag : merchantResolution(),
              status: s.status,
              isNew: true,
            },
          ]
        : []),
      ...st.rows.map((r) => ({ ...r, what: r.what[pageLang], isNew: false })),
    ];
    const list = rows
      .map(
        (r) => `<li class="flex items-center justify-between gap-3 px-4 py-3 ${r.isNew ? 'bg-brand/10' : ''}">
          <div class="min-w-0"><p class="flex items-center gap-2 text-[14px] font-semibold text-ink">
            ${r.isNew ? '<span class="h-2 w-2 shrink-0 rounded-full bg-teal-300"></span>' : ''}<span class="truncate font-mono text-[13px]">${esc(r.rma)}</span>
            ${r.isNew ? `<span class="rounded bg-teal/20 px-1.5 text-[11px] font-bold text-teal-300">${esc(A.newBadge)}</span>` : ''}</p>
            <p class="truncate text-[13px] text-faint">${esc(r.who)} · ${esc(r.order)} · ${esc(r.what)}</p></div>
          ${statusPill(r.status)}</li>`,
      )
      .join('');

    let detail: string;
    if (!s.submitted) {
      detail = `<div class="grid place-items-center rounded-xl border border-dashed border-border px-5 py-8 text-center">
        <span class="grid h-11 w-11 place-content-center rounded-xl bg-elevated text-faint">${icon('inbox', 'h-5 w-5')}</span>
        <p class="mt-3 text-[15px] font-semibold text-ink">${esc(A.emptyTitle)}</p>
        <p class="mt-1 max-w-xs text-[14px] text-muted">${esc(isWithdrawal() ? A.emptyWithdrawal : A.emptyReturn)}</p></div>`;
    } else {
      const facts: [string, string][] = [
        [A.customer, `${st.customer} · ${s.email}`],
        [A.items, selectedItems().map((i) => i.title[pageLang]).join(', ')],
      ];
      if (!isWithdrawal()) {
        const reasons = selectedItems()
          .map((i) => REASONS.find((r) => r.key === s.reasons[i.id])?.label[pageLang])
          .filter(Boolean)
          .join(', ');
        facts.push([A.reason, s.note ? `${reasons} · “${s.note}”` : reasons]);
      }
      facts.push([A.resolution, merchantResolution()]);
      facts.push([A.value, money(isWithdrawal() ? base() : value(), pageLang)]);
      if (!isWithdrawal() && s.resolution === 'offline') {
        const m = payout();
        facts.push([A.payout, m.kind === 'cash' ? m.label[pageLang] : `${m.label[pageLang]} · ${mask(s.payoutAccount)} · ${s.payoutName}`]);
      }
      if (isWithdrawal()) facts.push([A.deadline, dateFmt(addDays(14), pageLang)]);
      else facts.push([A.returnMethod, methodLabel(s.returnMethod, pageLang)]);
      if (s.whatsapp) facts.push([A.whatsapp, `${A.enabled} · ${s.phone}`]);

      detail = `<div class="rounded-xl border border-border bg-bg/60">
        <div class="flex items-center justify-between gap-3 border-b border-divider px-4 py-3">
          <p class="font-mono text-[14px] font-semibold text-ink">${NEW_RMA}</p>
          <span class="flex items-center gap-1.5">${isWithdrawal() ? `<span class="rounded-full bg-teal/20 px-2 py-0.5 text-[11px] font-bold text-teal-300">${esc(A.withdrawalTag)}</span>` : ''}${statusPill(s.status)}</span>
        </div>
        <dl class="grid gap-x-4 gap-y-2.5 px-4 py-3 text-[14px]">${facts
          .map(([k, v]) => `<div class="grid grid-cols-[7.5rem_1fr] gap-3"><dt class="text-faint">${esc(k)}</dt><dd class="min-w-0 break-words text-ink">${esc(v)}</dd></div>`)
          .join('')}</dl>
        ${s.done ? '' : `<div class="border-t border-divider px-4 py-3">${merchantActions()}</div>`}
      </div>`;
    }

    const doneCard = s.done
      ? `<div class="rounded-xl border border-brand-300/40 bg-linear-to-b from-brand/15 to-transparent p-5">
          <p class="text-[17px] font-semibold text-ink">${esc(s.status === 'REJECTED' ? T.done.rejectedTitle : T.done.title)}</p>
          <p class="mt-1 text-[14px] text-muted">${esc(
            s.status === 'REJECTED'
              ? T.done.rejectedText
              : fmt(T.done.text, { resolution: T.done.resolutionWords[isWithdrawal() ? 'withdrawal' : (s.resolution ?? 'original')] }),
          )}</p>
          <div class="mt-4 flex flex-col gap-2 sm:flex-row">
            <a href="${esc(installUrl(pageLang, 'demo-complete'))}" data-track="install" data-placement="demo-complete" class="btn btn-primary btn-sm">${esc(T.done.cta)} ${icon('arrow-right')}</a>
            <button type="button" data-action="another" class="btn btn-secondary btn-sm">${icon('refresh')}${esc(T.done.again)}</button>
          </div></div>`
      : '';

    const activity = s.events.length
      ? `<div><p class="text-[13px] font-semibold uppercase tracking-wider text-faint">${esc(A.activity)}</p>
          <ol class="mt-3 space-y-2.5">${s.events
            .map((e) => {
              const ic: IconName = e.tone === 'mail' ? 'mail' : e.tone === 'success' ? 'check' : e.tone === 'warn' ? 'alert' : 'zap';
              const col = e.tone === 'mail' ? 'text-teal-300' : e.tone === 'success' ? 'text-emerald-300' : e.tone === 'warn' ? 'text-red-300' : 'text-brand-300';
              return `<li class="flex gap-2.5 text-[13px]"><span class="mt-0.5 ${col}">${icon(ic, 'h-3.5 w-3.5', 2.5)}</span>
                <span class="min-w-0 flex-1 text-muted">${esc(e.text)}</span><span class="shrink-0 font-mono text-[11px] text-faint">${esc(e.time)}</span></li>`;
            })
            .join('')}</ol></div>`
      : '';

    merchantEl.innerHTML = `
      <div class="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p class="flex min-w-0 items-center gap-2 truncate text-[12px] text-faint"><img src="/images/trackback-icon-40.webp" alt="" width="18" height="18" class="h-[18px] w-[18px]" />${esc(A.crumb)}</p>
        <span class="shrink-0 text-[12px] font-semibold text-muted">${esc(st.name)}</span>
      </div>
      <div class="space-y-4 p-4">
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-xl border border-border bg-bg/60 p-3"><p class="text-[12px] text-faint">${esc(A.pending)}</p><p class="mt-0.5 text-[20px] font-bold text-ink">${s.pending}</p></div>
          <div class="rounded-xl border border-border bg-bg/60 p-3"><p class="text-[12px] text-faint">${esc(A.retained)}</p><p class="mt-0.5 text-[20px] font-bold text-emerald-300">${esc(money(s.retained, pageLang, 0))}</p></div>
        </div>
        <div class="overflow-hidden rounded-xl border border-border"><p class="border-b border-border px-4 py-2.5 text-[13px] font-semibold text-ink">${esc(A.returns)}</p><ul class="divide-y divide-divider">${list}</ul></div>
        ${detail}${doneCard}${activity}
      </div>`;
  }

  // ── Render all ─────────────────────────────────────────────────────────────
  function render(focusHeading = false) {
    const active = document.activeElement as HTMLElement | null;
    const focusKey = active && root!.contains(active) ? (active.dataset.field ? `field:${active.dataset.field}:${active.dataset.id ?? ''}` : active.dataset.action ? `action:${active.dataset.action}:${active.dataset.value ?? ''}` : null) : null;
    renderScenarios();
    renderPortal();
    renderMerchant();
    renderTabs();
    if (focusHeading) {
      portalEl.querySelector<HTMLElement>('[data-step-heading]')?.focus({ preventScroll: true });
    } else if (focusKey) {
      const [kind, name, extra] = focusKey.split(':');
      const selector = kind === 'field' ? `[data-field="${name}"]${extra ? `[data-id="${extra}"]` : ''}` : `[data-action="${name}"]${extra ? `[data-value="${extra}"]` : ''}`;
      const next = root!.querySelector<HTMLElement>(selector);
      if (s.resolution && name === 'resolution') root!.querySelector<HTMLElement>(`[data-field="resolution"][value="${s.resolution}"]`)?.focus({ preventScroll: true });
      else if (s.returnMethod && name === 'returnMethod') root!.querySelector<HTMLElement>(`[data-field="returnMethod"][value="${s.returnMethod}"]`)?.focus({ preventScroll: true });
      else next?.focus({ preventScroll: true });
    }
  }

  // ── Actions ────────────────────────────────────────────────────────────────
  function setScenario(key: ScenarioKey) {
    s = freshState(key, { portalLang: s.portalLang, tab: 'customer' });
    track('Demo scenario', { scenario: key, lang: pageLang });
    render();
  }

  function goStep(step: number) {
    s.step = step;
    s.error = null;
    render(true);
  }

  function validEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim());
  }

  function find() {
    if (!validEmail()) {
      s.error = P().errInvalidEmail;
      render();
      return;
    }
    s.busy = true;
    s.error = null;
    render();
    window.setTimeout(() => {
      s.busy = false;
      goStep(1);
    }, 650);
  }

  function next() {
    if (s.step === 3) {
      if (s.resolution === 'offline' && payout().kind !== 'cash' && (!s.payoutAccount.trim() || !s.payoutName.trim())) {
        s.error = P().errPayout;
        render();
        return;
      }
    }
    goStep(s.step + 1);
  }

  function submit() {
    s.busy = true;
    render();
    window.setTimeout(() => {
      s.busy = false;
      s.submitted = true;
      s.submittedAt = new Date();
      s.status = 'PENDING';
      s.view = 'submitted';
      s.pending += 1;
      const E = T.admin.events;
      if (isWithdrawal()) {
        addEvent(fmt(E.withdrawalReceived, { datetime: dateTimeFmt(s.submittedAt, pageLang) }), 'info');
        addEvent(fmt(E.withdrawalAck, { email: s.email }), 'mail');
        addEvent(fmt(E.withdrawalCreated, { rma: NEW_RMA, date: dateFmt(addDays(14), pageLang) }), 'success');
      } else {
        addEvent(fmt(E.verified, { order: store().order }), 'info');
        addEvent(fmt(E.created, { rma: NEW_RMA, count: selectedItems().length }), 'success');
        addEvent(fmt(E.emailSubmitted, { email: s.email, lang: s.portalLang.toUpperCase() }), 'mail');
        if (s.whatsapp) addEvent(fmt(E.whatsapp, { phone: s.phone }), 'mail');
      }
      toast(T.toasts.submitted, 'inbox');
      track('Demo submit', { scenario: s.scenario, resolution: s.resolution ?? 'withdrawal', lang: pageLang });
      render(true);
    }, 800);
  }

  function seeMerchant() {
    if (desktop.matches) {
      merchantPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      merchantEl.classList.add('ring-2', 'ring-brand-300/70');
      window.setTimeout(() => merchantEl.classList.remove('ring-2', 'ring-brand-300/70'), 1600);
      merchantEl.querySelector<HTMLElement>('[data-action^="m-"]')?.focus({ preventScroll: true });
    } else {
      switchTab('merchant');
    }
  }

  function switchTab(tab: 'customer' | 'merchant') {
    s.tab = tab;
    if (tab === 'merchant') s.unseen = 0;
    renderTabs();
    root!.querySelector<HTMLElement>(`[data-panel="${tab}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function merchant(action: string) {
    const E = T.admin.events;
    const st = store();
    if (action === 'm-message') {
      addEvent(fmt(E.message, { name: st.customer }), 'mail');
      toast(T.toasts.message, 'message');
    } else if (action === 'm-approve' && s.status === 'PENDING') {
      s.status = 'APPROVED';
      s.pending -= 1;
      if (!isWithdrawal()) addEvent(E.approved, 'success');
      addEvent(fmt(E.instructions, { method: methodLabel(isWithdrawal() ? 'ship' : s.returnMethod, pageLang) }), 'mail');
      toast(fmt(T.toasts.email, { email: s.email }), 'mail');
    } else if (action === 'm-reject' && s.status === 'PENDING') {
      s.status = 'REJECTED';
      s.pending -= 1;
      s.done = true;
      addEvent(E.rejected, 'warn');
      toast(fmt(T.toasts.email, { email: s.email }), 'mail');
    } else if (action === 'm-receive' && s.status === 'APPROVED') {
      s.status = 'RECEIVED';
      addEvent(E.received, 'success');
      if (s.resolution === 'offline' && !s.payoutRef) s.payoutRef = `${payout().ref}-8F2K1`;
    } else if (action === 'm-final' && s.status === 'RECEIVED') {
      const S = T.admin.subjects;
      if (isWithdrawal() || s.resolution === 'original') {
        addEvent(fmt(E.refunded, { amount: money(isWithdrawal() ? base() : value(), pageLang), payment: st.payment[pageLang] }), 'success');
        addEvent(fmt(E.emailDone, { subject: S.refunded }), 'mail');
      } else if (s.resolution === 'credit') {
        addEvent(fmt(E.credited, { amount: money(value(), pageLang), pct: BONUS_PCT }), 'success');
        addEvent(fmt(E.emailDone, { subject: S.credited }), 'mail');
        s.retained += base();
      } else if (s.resolution === 'exchange') {
        addEvent(fmt(E.exchanged, { order: st.exchangeOrder ?? '#1090', variant: s.variant }), 'success');
        addEvent(fmt(E.emailDone, { subject: S.exchanged }), 'mail');
        s.retained += base();
      } else if (s.resolution === 'offline') {
        addEvent(fmt(E.paidOut, { method: payout().label[pageLang], amount: money(value(), pageLang), ref: s.payoutRef.trim() || `${payout().ref}-8F2K1` }), 'success');
        addEvent(fmt(E.emailDone, { subject: S.paidOut }), 'mail');
      }
      s.status = 'REFUNDED';
      s.done = true;
      toast(fmt(T.toasts.email, { email: s.email }), 'mail');
      track('Demo complete', { scenario: s.scenario, resolution: s.resolution ?? 'withdrawal', lang: pageLang });
    }
    render();
  }

  // ── Event delegation ───────────────────────────────────────────────────────
  root.addEventListener('click', (event) => {
    const el = (event.target as HTMLElement).closest<HTMLElement>('[data-action]');
    if (!el || !root.contains(el) || (el as HTMLButtonElement).disabled) return;
    const action = el.dataset.action!;
    const v = el.dataset.value ?? '';
    switch (action) {
      case 'scenario':
        setScenario(v as ScenarioKey);
        break;
      case 'restart':
        setScenario(s.scenario);
        break;
      case 'another':
        setScenario(SCENARIO_ORDER[(SCENARIO_ORDER.indexOf(s.scenario) + 1) % SCENARIO_ORDER.length]);
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'plang':
        s.portalLang = v === 'fr' ? 'fr' : 'en';
        if (!s.submitted) s.note = scen().note[s.portalLang];
        render();
        break;
      case 'find':
        find();
        break;
      case 'next':
        next();
        break;
      case 'back':
        goStep(Math.max(0, s.step - 1));
        break;
      case 'submit':
        submit();
        break;
      case 'variant':
        s.variant = v;
        render();
        break;
      case 'track':
        s.view = 'status';
        render(true);
        break;
      case 'see-merchant':
        seeMerchant();
        break;
      case 'tab':
        switchTab(v === 'merchant' ? 'merchant' : 'customer');
        break;
      default:
        if (action.startsWith('m-')) merchant(action);
    }
  });

  root.addEventListener('change', (event) => {
    const el = event.target as HTMLInputElement | HTMLSelectElement;
    const f = el.dataset.field;
    if (!f) return;
    if (f === 'item') {
      const id = el.dataset.id!;
      if ((el as HTMLInputElement).checked) s.selected.add(id);
      else s.selected.delete(id);
      if ((el as HTMLInputElement).checked && !s.reasons[id]) s.reasons[id] = scen().reason;
    } else if (f === 'reason') s.reasons[el.dataset.id!] = el.value;
    else if (f === 'resolution') s.resolution = el.value as ResolutionKey;
    else if (f === 'payoutMethod') {
      s.payoutMethod = el.value;
      const kind = payout().kind;
      s.payoutAccount = kind === 'phone' ? store().phone : kind === 'bank' ? 'SN08 SN010 01520 0000 5678 9012' : '';
    } else if (f === 'returnMethod') s.returnMethod = el.value as ReturnMethod;
    else if (f === 'whatsapp') s.whatsapp = (el as HTMLInputElement).checked;
    else return;
    s.error = null;
    render();
  });

  root.addEventListener('input', (event) => {
    const el = event.target as HTMLInputElement | HTMLTextAreaElement;
    const f = el.dataset.field as keyof State | undefined;
    if (!f || !['orderNumber', 'email', 'name', 'note', 'payoutAccount', 'payoutName', 'phone', 'comment', 'payoutRef'].includes(f)) return;
    (s as unknown as Record<string, string>)[f] = el.value;
  });

  root.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement;
    if (event.key === 'Enter' && target.tagName === 'INPUT' && (target as HTMLInputElement).type !== 'checkbox' && (target as HTMLInputElement).type !== 'radio') {
      const primary = portalEl.contains(target) ? portalEl.querySelector<HTMLButtonElement>('[data-action="find"], [data-action="next"], [data-action="submit"]') : null;
      if (primary && !primary.disabled) {
        event.preventDefault();
        primary.click();
      }
    }
    if (target.getAttribute('role') === 'tab' && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
      switchTab(s.tab === 'customer' ? 'merchant' : 'customer');
      root.querySelector<HTMLElement>(`[role="tab"][data-value="${s.tab}"]`)?.focus();
    }
  });

  render();
  root.dataset.ready = 'true';
}

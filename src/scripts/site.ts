import { track } from '@vercel/analytics';

// ── Sticky nav: solid background once the page scrolls ─────────────────────
const nav = document.querySelector<HTMLElement>('[data-nav]');
if (nav) {
  const onScroll = () => {
    nav.dataset.scrolled = String(window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Mobile menu ────────────────────────────────────────────────────────────
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const menu = document.getElementById('mobile-menu');
if (menuButton && menu) {
  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', (open ? menuButton.dataset.labelClose : menuButton.dataset.labelOpen) ?? '');
  };
  menuButton.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      menuButton.focus();
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

// ── Conversion tracking (Vercel Web Analytics, cookie-free) ────────────────
// Any link or button with data-track="<event>" is reported with its placement.
document.addEventListener('click', (event) => {
  const el = (event.target as HTMLElement).closest<HTMLElement>('[data-track]');
  if (!el) return;
  track(el.dataset.track === 'install' ? 'Install click' : el.dataset.track!, {
    placement: el.dataset.placement ?? 'unknown',
    lang: document.documentElement.lang,
    page: location.pathname,
  });
});

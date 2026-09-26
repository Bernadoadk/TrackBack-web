/**
 * Mirror of the app's single source of truth: TrackBack/app/lib/plans.ts (PLANS)
 * and the plan table of TrackBack/README.md. Update both files together whenever
 * a price, a quota or a feature moves between plans.
 */
import type { Lang } from '../config/site';

export type PlanId = 'free' | 'starter' | 'pro';

export const ANNUAL_DISCOUNT_PCT = 20;

type Localized = Record<Lang, string>;

export type Plan = {
  id: PlanId;
  monthly: number;
  annual: number | null;
  limit: Localized;
  summary: Localized;
  recommended?: boolean;
  features: Record<Lang, string[]>;
};

export const PLANS: Plan[] = [
  {
    id: 'free',
    monthly: 0,
    annual: null,
    limit: { en: '10 returns / month', fr: '10 retours / mois' },
    summary: { en: 'Everything to start, free forever.', fr: 'Tout pour démarrer, gratuit pour toujours.' },
    features: {
      en: [
        'Branded return portal (EN / FR)',
        'Eligibility rules & return window',
        'Return methods: ship, label, store drop-off, pickup',
        'Cash-on-delivery & mobile money refunds',
        'Customer return tracking page',
        'EU withdrawal button',
        'Email notifications',
        'Auto-approval',
        '7-day analytics',
      ],
      fr: [
        'Portail de retour à votre marque (EN / FR)',
        "Règles d'éligibilité et délai de retour",
        'Modes de retour : envoi, étiquette, dépôt en boutique, enlèvement',
        'Remboursements paiement à la livraison et mobile money',
        'Page de suivi du retour pour le client',
        'Bouton de rétractation UE',
        'Notifications par e-mail',
        'Auto-approbation',
        'Analytics sur 7 jours',
      ],
    },
  },
  {
    id: 'starter',
    monthly: 19,
    annual: 182,
    recommended: true,
    limit: { en: '100 returns / month', fr: '100 retours / mois' },
    summary: { en: 'Keep more revenue with credit and exchanges.', fr: 'Gardez plus de CA grâce aux avoirs et échanges.' },
    features: {
      en: [
        'Everything in Free',
        'Portal editor: branding, layouts, texts',
        'Email template editor',
        'Store credit + bonus, gift cards',
        'Self-service variant exchanges',
        'Return fees & photo evidence',
        'Green returns (keep the item)',
        'Custom return reasons',
        'Shopify order tags',
        '90-day analytics, return rate & weekly report',
      ],
      fr: [
        'Tout le plan Gratuit',
        'Éditeur de portail : marque, mises en page, textes',
        "Éditeur d'e-mails",
        'Avoir + bonus, cartes-cadeaux',
        'Échanges de variante en libre-service',
        'Frais de retour et photos',
        "Retours verts (le client garde l'article)",
        'Motifs de retour personnalisés',
        'Tags de commande Shopify',
        'Analytics 90 jours, taux de retour et rapport hebdomadaire',
      ],
    },
  },
  {
    id: 'pro',
    monthly: 49,
    annual: 470,
    limit: { en: 'Unlimited returns', fr: 'Retours illimités' },
    summary: { en: 'Automate, chat and connect your tools.', fr: 'Automatisez, discutez et connectez vos outils.' },
    features: {
      en: [
        'Everything in Starter',
        'Exchange for any product (Shop Now)',
        'Live chat with customers',
        'WhatsApp notifications & contact',
        'Automation rules (auto-refund…)',
        'Fraud signals & customer blocklist',
        'Webhooks & REST API',
        'White-label portal',
      ],
      fr: [
        'Tout le plan Starter',
        "Échange contre n'importe quel produit (Shop Now)",
        'Chat en direct avec les clients',
        'Notifications et contact WhatsApp',
        "Règles d'automatisation (remboursement auto…)",
        'Signaux de fraude et liste noire',
        'Webhooks et API REST',
        'Portail en marque blanche',
      ],
    },
  },
];

/** Full comparison table (same rows as the app README). `true` = included. */
export type Cell = boolean | string | Localized;

export const COMPARISON: { label: Localized; values: [Cell, Cell, Cell] }[] = [
  {
    label: { en: 'Return requests per month', fr: 'Demandes de retour par mois' },
    values: ['10', '100', { en: 'Unlimited', fr: 'Illimité' }],
  },
  {
    label: { en: 'EN/FR portal in your theme, return tracking page', fr: 'Portail EN/FR dans le thème, page de suivi du retour' },
    values: [true, true, true],
  },
  {
    label: { en: 'Eligibility rules (window, sale items, non-returnable products)', fr: "Règles d'éligibilité (délai, soldes, articles non retournables)" },
    values: [true, true, true],
  },
  {
    label: { en: 'Return methods: ship, label, store drop-off, pickup', fr: 'Modes de retour : envoi, étiquette, dépôt en boutique, enlèvement' },
    values: [true, true, true],
  },
  {
    label: { en: 'Cash-on-delivery refunds (Wave, Orange Money, MTN MoMo, M-Pesa…)', fr: 'Remboursement paiement à la livraison (Wave, Orange Money, MTN MoMo, M-Pesa…)' },
    values: [true, true, true],
  },
  {
    label: { en: 'EU withdrawal button (Directive 2023/2673)', fr: 'Bouton de rétractation UE (directive 2023/2673)' },
    values: [true, true, true],
  },
  {
    label: { en: 'EN/FR emails, auto-approval, expiration, 7-day analytics, CSV export', fr: 'E-mails EN/FR, auto-approbation, expiration, analytics 7 jours, export CSV' },
    values: [true, true, true],
  },
  { label: { en: 'Portal editor, email editor', fr: "Éditeur de portail, éditeur d'e-mails" }, values: [false, true, true] },
  {
    label: { en: 'Store credit + bonus, gift cards, variant exchanges', fr: 'Avoir + bonus, cartes-cadeaux, échanges de variante' },
    values: [false, true, true],
  },
  {
    label: { en: 'Return fees, photos, green returns, custom reasons', fr: 'Frais de retour, photos, retours verts, motifs personnalisés' },
    values: [false, true, true],
  },
  {
    label: { en: 'Shopify order tags, 90-day analytics, return rate, weekly report', fr: 'Tags de commande Shopify, analytics 90 j, taux de retour, rapport hebdomadaire' },
    values: [false, true, true],
  },
  { label: { en: 'Exchange for any product (Shop Now)', fr: "Échange contre n'importe quel produit (Shop Now)" }, values: [false, false, true] },
  { label: { en: 'Live chat, WhatsApp', fr: 'Chat en direct, WhatsApp' }, values: [false, false, true] },
  {
    label: { en: 'Automations (auto-approval conditions, automatic refund)', fr: "Automatisations (conditions d'auto-approbation, remboursement automatique)" },
    values: [false, false, true],
  },
  { label: { en: 'Fraud signals and blocklist', fr: 'Signaux de fraude et liste noire' }, values: [false, false, true] },
  { label: { en: 'Webhooks, REST API, white label', fr: 'Webhooks, API REST, marque blanche' }, values: [false, false, true] },
];

export function formatPrice(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

import type { Lang } from '../config/site';

/**
 * Every page exists in English (root) and French (/fr). French slugs are in French
 * for SEO. Keep `updated` in sync when a page's content changes: it feeds the
 * sitemap <lastmod>, which Google only trusts when it is accurate.
 */
export const ROUTES = {
  home: { en: '/', fr: '/fr', updated: '2026-09-26' },
  demo: { en: '/how-trackback-works', fr: '/fr/demo', updated: '2026-09-26' },
  withdrawal: { en: '/eu-withdrawal-button', fr: '/fr/bouton-de-retractation', updated: '2026-09-26' },
  cod: { en: '/cash-on-delivery-refunds', fr: '/fr/remboursement-paiement-a-la-livraison', updated: '2026-09-26' },
  changelog: { en: '/changelog', fr: '/fr/nouveautes', updated: '2026-09-26' },
  privacy: { en: '/privacy-policy', fr: '/fr/politique-de-confidentialite', updated: '2026-09-26' },
  terms: { en: '/terms', fr: '/fr/conditions-generales', updated: '2026-09-26' },
} as const;

export type RouteKey = keyof typeof ROUTES;

/** In-page sections of the home page. */
export const ANCHORS = {
  features: { en: 'features', fr: 'fonctionnalites' },
  pricing: { en: 'pricing', fr: 'tarifs' },
  faq: { en: 'faq', fr: 'faq' },
} as const;

export function path(key: RouteKey, lang: Lang): string {
  return ROUTES[key][lang];
}

/** Link to a home-page section: "#pricing" on the home page, "/#pricing" elsewhere. */
export function anchor(key: keyof typeof ANCHORS, lang: Lang, onHome: boolean): string {
  const id = ANCHORS[key][lang];
  return onHome ? `#${id}` : `${ROUTES.home[lang]}#${id}`;
}

export function absolute(pathname: string, site: URL): string {
  return new URL(pathname, site).href;
}

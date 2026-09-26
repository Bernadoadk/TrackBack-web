/**
 * Site-wide settings. The production URL lives in astro.config.mjs (`site`) and is
 * read through `Astro.site`, so everything URL-related follows it automatically.
 */
export type Lang = 'en' | 'fr';

export const LANGS: Lang[] = ['en', 'fr'];

export const SITE = {
  /** Brand used in titles and structured data ("TrackBack" alone collides with the blog protocol). */
  brand: 'TrackBack Returns',
  shortName: 'TrackBack',
  company: 'Digital Mania',
  /**
   * Contact address shown everywhere (contact, legal, privacy). Replace it with an
   * address on your own domain (hello@…, privacy@…) as soon as you have one.
   */
  email: 'bernadoecom@gmail.com',
  appStoreUrl: 'https://apps.shopify.com/returnflow-2',
  googleSiteVerification: '1WO5HI22VEIo0wLTFWm4mnIgX4Uyrpyveuc96PK_wcA',
  themeColor: '#060A14',
} as const;

/**
 * Shopify App Store link with UTM parameters, so installs can be attributed to the
 * page and the button that sent the visitor. French pages open the French listing.
 */
export function installUrl(lang: Lang, placement: string): string {
  const url = new URL(SITE.appStoreUrl);
  if (lang === 'fr') url.searchParams.set('locale', 'fr');
  url.searchParams.set('utm_source', 'trackback-web');
  url.searchParams.set('utm_medium', 'website');
  url.searchParams.set('utm_campaign', `site-${lang}`);
  url.searchParams.set('utm_content', placement);
  return url.toString();
}

export function mailto(subject?: string): string {
  return subject ? `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}` : `mailto:${SITE.email}`;
}

/** French typography: typographic apostrophes, non-breaking spaces before « ? ! : ; » and inside quotes. */
export function frTypo(text: string): string {
  return text
    .replace(/'/g, '’')
    .replace(/ ([?!:;»])/g, ' $1')
    .replace(/« /g, '« ');
}

/** Applies `frTypo` to every string of a (deeply nested) dictionary. */
export function withFrTypo<T>(value: T): T {
  if (typeof value === 'string') return frTypo(value) as T;
  if (Array.isArray(value)) return value.map((v) => withFrTypo(v)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withFrTypo(v)])) as T;
  }
  return value;
}

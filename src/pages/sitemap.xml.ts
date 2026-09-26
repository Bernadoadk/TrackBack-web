import type { APIRoute } from 'astro';
import { LANGS } from '../config/site';
import { ROUTES } from '../i18n/routes';

/**
 * /sitemap.xml — the URL already submitted in Google Search Console. Every page is
 * listed in both languages with its hreflang alternates and a real <lastmod>.
 * (changefreq and priority are omitted: Google ignores them.)
 */
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://trackback-web.vercel.app');
  const abs = (path: string) => new URL(path, base).href;

  const urls = Object.values(ROUTES).flatMap((route) =>
    LANGS.map((lang) => {
      const alternates = [
        ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(route[l])}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(route.en)}"/>`,
      ].join('\n');
      return `  <url>\n    <loc>${abs(route[lang])}</loc>\n    <lastmod>${route.updated}</lastmod>\n${alternates}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

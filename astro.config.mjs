// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Production URL of the site. This is the ONLY place to change when moving to a
// custom domain: canonicals, hreflang, sitemap, robots.txt, Open Graph and JSON-LD
// are all derived from it.
const SITE_URL = 'https://trackback-web.vercel.app';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: {
    // /how-trackback-works → how-trackback-works.html, served without extension by
    // Vercel (cleanUrls), which matches the URLs already indexed by Google.
    format: 'file',
    // The whole stylesheet is ~25 kB: inlining it removes a render-blocking request.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
});

import type { APIRoute } from 'astro';

// Everything is crawlable, AI search crawlers included: being cited in AI answers
// (ChatGPT, Perplexity, Google AI Overviews) is a free acquisition channel.
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://trackback-web.vercel.app');
  const body = `# TrackBack Returns
User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', base).href}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

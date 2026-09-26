import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { PLANS } from '../data/plans';
import { ROUTES } from '../i18n/routes';

/**
 * /llms.txt — a plain-text summary for AI assistants and answer engines
 * (https://llmstxt.org). Generated from the same data as the pricing section.
 */
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://trackback-web.vercel.app');
  const abs = (path: string) => new URL(path, base).href;
  const plans = PLANS.map(
    (p) =>
      `- ${p.id === 'free' ? 'Free' : p.id === 'starter' ? 'Starter' : 'Pro'} — $${p.monthly}/month${p.annual ? ` or $${p.annual}/year` : ''} — ${p.limit.en}: ${p.features.en.join('; ')}`,
  ).join('\n');

  const body = `# ${SITE.brand}

> ${SITE.brand} (also called TrackBack) is a Shopify app for product returns, made by ${SITE.company}. It gives stores a branded return portal in English and French inside their theme, exchanges and store credit with a bonus, refunds for cash-on-delivery orders via mobile money (Wave, Orange Money, MTN MoMo, Moov Money, M-Pesa, Airtel Money), bank transfer or cash, and the EU withdrawal button required since 19 June 2026. Every action syncs with Shopify orders, refunds and inventory.

## Key pages

- [Home and pricing](${abs(ROUTES.home.en)}): features, plans and FAQ
- [Interactive demo](${abs(ROUTES.demo.en)}): try a return as the customer and as the merchant
- [EU withdrawal button for Shopify](${abs(ROUTES.withdrawal.en)}): what Directive (EU) 2023/2673 requires and how TrackBack implements it
- [Cash-on-delivery refunds](${abs(ROUTES.cod.en)}): how stores refund COD orders by mobile money, transfer or cash
- [Changelog](${abs(ROUTES.changelog.en)})
- [Privacy policy](${abs(ROUTES.privacy.en)}) and [terms of service](${abs(ROUTES.terms.en)})
- French version: ${abs(ROUTES.home.fr)}

## Plans (billed in USD through Shopify)

${plans}

## Install

- Shopify App Store: ${SITE.appStoreUrl}
- Contact: ${SITE.email}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

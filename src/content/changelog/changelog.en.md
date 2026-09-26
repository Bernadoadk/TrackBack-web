---
title: Changelog
description: What's new in TrackBack Returns, the Shopify returns app. Release notes, new features and fixes, newest first.
updated: 2026-09-26
---

What's new in TrackBack, newest releases first.

## 2026-09-26 — Bilingual portal, new resolutions and per-plan features

### Added

**Customer portal**

- Bilingual English / French portal that follows your store's language, with texts you can customize in each language.
- Portal displayed inside your store's theme through the Shopify app proxy (`/apps/returns`), with a full-page option.
- Return tracking page: timeline, return instructions and tracking number entry, linked from every email.
- [EU withdrawal button](/eu-withdrawal-button) (Directive 2023/2673): a two-step flow without an account, with an immediate acknowledgment.
- New return methods: store drop-off and courier pickup, in addition to customer shipping and prepaid labels.
- Photos (up to 3 per item), required depending on the reason (Starter and Pro).
- Fees and bonuses shown before submission; the server recalculates everything.

**Resolutions**

- [Refunds for orders paid on delivery](/cash-on-delivery-refunds): the customer enters their account (Wave, Orange Money, MTN MoMo, Moov Money, M-Pesa, Airtel Money, bank transfer, cash) and you record the payment with its reference; Shopify records the refund.
- Shopify gift cards (Starter and Pro), used automatically instead of store credit for orders without a customer account.
- Self-service exchanges (Starter and Pro): customers pick another size or color themselves, with live stock checks.
- Shop Now (Pro): exchange for any product in the store.
- Green returns (Starter and Pro): below an amount you set, the customer keeps the item.
- Restocking and return shipping fees (Starter and Pro), exemptions per reason, fees waived for store credit and exchanges.

**Operations**

- Automations (Pro): auto-approval conditions (maximum amount, risky customers excluded) and automatic refund on receipt.
- Risk score and customer blocklist (Pro).
- WhatsApp (Pro): button on the tracking page, a ready-to-send message on every return, automatic notifications through Meta's Cloud API.
- CSV export of filtered returns.
- Daily job: expiration of unshipped returns and a Monday weekly report (Starter and Pro).
- Shopify order tags (Starter and Pro): `trackback-return`, `trackback-exchange`, `trackback-refunded`…

**Emails and analytics**

- 8 emails in English and French (new: "Received", "Expired", "Withdrawal received"), sent in the customer's language, with replies going to your own email.
- New variables: `{{return_instructions}}`, `{{refund_details}}`, `{{status_url}}`, `{{items_list}}`…
- Analytics: return rate compared with your Shopify orders, resolution breakdown, fees collected.

**Integrations (Pro)**

- Outgoing webhooks signed with HMAC-SHA256 (`return.created` … `return.expired`), with a test event.
- REST API v1: `GET /api/v1/returns` and `GET /api/v1/returns/{rma}`, with keys stored hashed.

### Improved

- Settings reorganized into 9 tabs: General, Eligibility, Returns & fees, Refunds, Reasons, Policy, Notifications, Integrations, Portal.
- Features split by plan from a single source, with badges and upgrade prompts.
- Bulk actions send the same emails and Shopify syncs as single actions.
- Return window calculated from fulfillment, or from the order date if you prefer.
- Exact "non-returnable" rules (SKU, tags, product types).
- Dashboard: pending EU withdrawals and risky returns.
- Amounts formatted in the customer's language in the portal and emails.
- Lighter pages: the shared JavaScript bundle dropped from 803 kB to 73 kB.
- Built-in documentation rewritten, with new Refunds, Analytics, Webhooks and API sections.

### Fixed

- Annual plans were treated as Free in several places.
- Shopify sync could move a return back to an earlier status after a late webhook.
- Restocking could silently fail (missing `read_locations` scope).
- A double refund was possible on a double click or simultaneous action.
- GDPR webhooks now complete reliably, and the GDPR export includes payouts, photos and chat.
- Icons that could be invisible in the admin and the portal.
- The embedded portal could be blocked by the `frame-ancestors` policy.

### Security

- Signed (HMAC) portal, chat and tracking-link sessions.
- Server-side revalidation of eligibility, quantities, fees and amounts.
- Order search protected against search-syntax injection.
- Image deletion restricted to the store's own folder.
- Rate limiting on public endpoints and constant-time secret comparisons.

## [1.4.0] — 2026-05-18

### Added

- **Live chat bubble icon picker.** Pick one of six icons for the chat button on your customer portal. Editable from Portal Editor → Live chat.
- **Theme block with three layouts.** The "Return Button" theme app block supports three layouts (Banner, Card and Button only), filled or outlined styles, four icons and full color customization.
- **Embedded portal docs.** Settings → Portal shows three ways to expose your portal: the theme block, a direct URL or an iframe embed snippet, each with a copy button.
- **Documentation improvements:** reading progress bar, tabs grouped into 4 categories and anchor links on every section.

### Changed

- **No more trial period.** All plans bill from day one: pay only for the months you use, cancel anytime.
- **Self-healing billing.** Every admin page load syncs your subscription with Shopify, so upgrades unlock features without a refresh.
- **Chat bubble in the portal preview**, matching the icon and brand color you chose.

### Fixed

- The support widget no longer blocks clicks on the buttons under it.
- Sidebar locks, page banners and server-side checks now agree on which features are unlocked.
- Plans no longer get stuck in a "pending" state after cancelling the Shopify approval.

## [1.3.0] — 2026-04-15

### Added

- **Custom return reasons.** Build your own list of return reasons shown on the portal.
- **Live chat with customers** (Pro plan): a chat bubble on the portal and an inbox in the app, with an email notification when you are offline.
- **30-day and 90-day analytics views.**
- **GDPR / Shopify compliance webhooks:** `customers/data_request`, `customers/redact` and `shop/redact`, all HMAC-verified.

### Changed

- **More email template variables:** `{{customer_name}}`, `{{rma_number}}`, `{{order_number}}`, `{{refund_amount}}`, `{{rejection_reason}}`, `{{carrier}}`, `{{tracking_number}}`.
- The portal live chat toggle moved to Portal Editor → Live chat.

### Fixed

- Order lookup retries several formats (`name:#1234`, `name:1234`…) for stores with non-standard order names.
- Logo uploads retry once when Cloudinary times out, with a clear error message.

## [1.2.0] — 2026-03-10

### Added

- **Exchanges.** Customers can request a different item.
- **Store credit with a bonus.** Add a configurable bonus (for example +10%) when issuing store credit.
- **Auto-approval** for incoming returns.
- **Blocked SKUs** that can never be returned (final sale, hygiene products…).
- **Retained revenue** on the analytics dashboard: what you kept through store credit and exchanges.

### Changed

- Redesigned, mobile-first portal stepper.
- Refunds now use Shopify's `refundCreate` mutation directly, for a faster confirmation.

### Fixed

- Returns above the monthly plan limit now show a clear message to the customer.

## [1.1.0] — 2026-02-05

### Added

- **Portal Editor:** brand color, header, logo, store name, footer contact and every label, with a live desktop / mobile preview.
- **Five portal layouts:** Classic, Minimal, Bold, Sidebar and Compact.
- **Email template editor** for each status: request received, approved, rejected, refunded and shipped.
- **Plans page** with a feature comparison and one-click upgrade through Shopify billing.

### Changed

- Settings split into tabs: General, Reasons, Emails, Policy and Portal.

## [1.0.0] — 2026-01-20

First public release.

### Added

- **Customer return portal**, embedded in your store through the app proxy at `/apps/returns`. Customers look up their order with their email and order number, no account required.
- **Return management dashboard** with a full status workflow: pending, approved, shipped, received, refunded (or rejected and expired).
- **Refunds to the original payment method** through Shopify.
- **Email notifications** to customers on every status change.
- **Basic analytics** (7 days).
- **Theme app block** ("Return Button") to add a call to action anywhere in your theme.
- **Free plan** with 10 returns per month.

## What's next

We ship regularly. On the roadmap:

- Shipping label generation through carrier integrations
- CSV import of historical returns
- More portal languages (Spanish, German)

Have a feature request? Email [bernadoecom@gmail.com](mailto:bernadoecom@gmail.com) or chat with us from the help button in the app.

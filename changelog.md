# Changelog

What's new in TrackBack. We follow [Semantic Versioning](https://semver.org/) and roughly the [Keep a Changelog](https://keepachangelog.com/) format.

Subscribe to release notes by following us on [X / Twitter](https://twitter.com/returnflow) or via the changelog RSS feed.

---

## [1.4.0] — 2026-05-18

### Added
- **Live chat bubble icon picker.** Pick one of six icons for the chat button on your customer portal (chat, square chat, mail, headphones, lifebuoy, with-dots). Editable from Portal Editor → Live chat.
- **Theme block — three layout variants.** The "Return Button" theme app block now supports three layouts: **Banner** (default), **Card** (centered with icon), and **Button only** (compact CTA). Plus filled / outlined button styles, four icon choices, and full color customization.
- **Embedded portal docs.** A new section in Settings → Portal shows three ways to expose your portal: the theme block, a direct URL, or an iframe embed snippet — with copy buttons for each.
- **Reading progress bar** on the in-app Documentation page.
- **Tabs navigation** on the Documentation page, grouped into 4 categories.
- **Anchor links** on every documentation section (hover the heading to copy a shareable deep link).

### Changed
- **No more trial period.** All plans (Free, Starter, Pro) now bill from day one. We removed the 14-day trial — pay only for the months you actually use, cancel anytime.
- **Billing is now self-healing.** Every admin page load syncs your subscription with Shopify directly. If you cancel during the approval flow, the app immediately knows. If you upgrade, all gated features unlock without a refresh.
- **Portal preview now shows the chat bubble.** Toggling live chat in the editor displays a live preview bubble in the canvas, matching the icon and brand color you've chosen.

### Fixed
- **"Upgrade to Pro" button click area.** The bottom-right area of the page no longer captures clicks meant for buttons under it (the floating support widget had an invisible bounding box that blocked clicks).
- **Plan gating consistency.** The sidebar lock icons, the page banners, and the server-side checks now all agree on which features are unlocked.
- **Stale subscription state.** Plans no longer get stuck in a "pending" limbo after cancelling the Shopify approval — the app sees the cancellation immediately on the next page load.

### Removed
- 14-day free trial language and badges across the app (see "Changed" above).

---

## [1.3.0] — 2026-04-15

### Added
- **Custom return reasons** (Pro plan). Build your own list of return reasons that customers see on the portal.
- **Live chat with customers** (Pro plan). Floating chat bubble on the portal; merchant inbox in `/app/messages`. Polling every 4 seconds with email notification if you've been offline for 5+ minutes.
- **30-day and 90-day analytics views** (Starter plan and above).
- **GDPR / Shopify compliance webhooks** wired up: `customers/data_request`, `customers/redact`, `shop/redact`. All HMAC-verified.

### Changed
- **Email template variables expanded.** Templates now support `{{customer_name}}`, `{{rma_number}}`, `{{order_number}}`, `{{refund_amount}}`, `{{rejection_reason}}`, `{{carrier}}`, `{{tracking_number}}`.
- **Portal "live chat" toggle** moved from Settings to Portal Editor → Live chat for better discoverability.

### Fixed
- Order lookup now retries with multiple query formats (`name:#1234`, `name:1234`, etc.) for stores with non-standard order naming.
- Logo upload errors when Cloudinary times out — now retries once with a clear error message.

---

## [1.2.0] — 2026-03-10

### Added
- **Exchange refund type.** Customers can request a different item; merchants fulfill via a Shopify draft order.
- **Store credit with bonus %.** Optionally add a configurable bonus (e.g. +10%) when issuing store credit, to incentivize keeping the money in your shop.
- **Auto-approve toggle.** Auto-approve all incoming returns (useful for low-fraud categories).
- **Blocked SKUs.** Specify SKUs that can never be returned (final sale items, hygiene products, etc.).
- **Retained revenue metric** on the analytics dashboard. Tracks how much you kept via store credit + exchanges vs. raw refunds.

### Changed
- **Portal stepper** redesigned: cleaner progress indicator, mobile-first layout.
- **Refund processing** now uses Shopify's `refundCreate` mutation directly, faster confirmation back to the customer.

### Fixed
- Returns above the monthly plan limit now show a clear error message to the customer instead of a generic 500.

---

## [1.1.0] — 2026-02-05

### Added
- **Portal Editor.** Customize your portal's brand color, header background, logo, store name, footer contact, and every label and description shown to customers. Live side-by-side preview with desktop / mobile toggle and 5-step navigation.
- **Five portal layouts:** Classic, Minimal, Bold, Sidebar, Compact.
- **Email Templates editor.** Custom subject and body for each status: Request Received, Approved, Rejected, Refunded, Shipped.
- **Plans page.** Free / Starter / Pro with feature comparison and one-click upgrade via Shopify's native billing API.

### Changed
- **Settings split into tabs:** General, Reasons, Emails, Policy, Portal.

---

## [1.0.0] — 2026-01-20

Initial public release. 🎉

### Added
- **Customer return portal.** Branded, embedded in your Shopify store via App Proxy at `/apps/returns`. Customers look up their order with email + order number, no account required.
- **Return management dashboard** with status workflow: PENDING → APPROVED → SHIPPED → RECEIVED → REFUNDED (or REJECTED / EXPIRED).
- **Refunds to original payment** via Shopify's billing API.
- **Email notifications** to customers on every status change.
- **Basic analytics** (7-day window).
- **Theme app block** ("Return Button") for adding a branded CTA anywhere in your theme.
- Free plan with 10 returns per month.

---

## What's coming next

We ship every 2–3 weeks. On the roadmap:

- **Shipping label generation** (ShipStation / EasyPost integration)
- **CSV import** for historical returns
- **Localization** — multi-language portal (FR, ES, DE first)
- **Public API** — webhooks for return events, REST endpoints (Pro plan)
- **Auto-tagged Shopify customers** based on return frequency (for VIP / problematic customer detection)

Have a feature request? Email **bernadoecom@gmail.com** or chat with us from the lifebuoy button in the admin.

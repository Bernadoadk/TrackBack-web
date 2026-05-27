# Privacy Policy

**Effective date:** May 18, 2026
**Last updated:** May 18, 2026

This Privacy Policy explains how **TrackBack** ("we", "us", "our") collects, uses, shares and protects information when you install or use our Shopify app, our public landing page at returnflow.app, and the customer return portal we host on behalf of merchants. By installing or using TrackBack, you agree to the terms below.

We are committed to GDPR, CCPA and Shopify's data protection requirements. We are also committed to writing privacy policies that are actually readable. Where a section uses legal language, we summarize it in plain English just below.

---

## 1. Who we are

TrackBack is a Shopify app that lets merchants manage product returns, exchanges and refunds. The "merchant" is the Shopify store owner who installed our app. The "customer" is the shopper using a merchant's return portal.

- **Data controller (your shop's data):** the merchant — you decide what is collected from your customers
- **Data processor:** TrackBack — we process data on the merchant's behalf, per Shopify's Data Processing Addendum
- **Contact:** bernadoecom@gmail.com

---

## 2. Information we collect

### 2.1 From merchants (you, when you install the app)

- Your shop's Shopify domain (e.g. `your-store.myshopify.com`)
- Your shop's display name and contact email (read from the Shopify Admin API)
- Your subscription plan (Free / Starter / Pro) and billing status
- App settings you configure: return window, refund options, branding (logo, colors, texts), email templates, custom return reasons
- Cloudinary-hosted logo images, if you upload one

We do **not** receive your password, payment card details, or any data outside the OAuth scopes you grant during install (see your Shopify Admin → Apps → TrackBack for the exact list).

### 2.2 From customers (collected via your return portal)

When a customer files a return on your portal, we store the following on your behalf:

- Their email address and full name (as entered in Shopify at checkout)
- The order number, line items, variants, quantities and prices being returned
- The return reason and any free-text note they leave
- Their requested refund type (original payment, store credit, exchange)
- If they use live chat: the messages they send and timestamps

We do **not** collect, store or process payment card numbers. All refunds are processed through Shopify's billing API.

### 2.3 Automatically (technical info)

- HTTP request logs (IP address, user agent, URL, timestamp) — kept for 30 days for security and debugging
- Shopify session tokens (encrypted, scoped to your shop, stored in our database)

We do **not** use third-party analytics, advertising trackers or social-media pixels inside the embedded app or the customer portal.

---

## 3. How we use your information

We use the data above only to:

- Run the app's features (display return requests, send notification emails, process refunds via Shopify)
- Render your branded portal to your customers
- Provide live chat between you and your customers (Pro plan)
- Send you transactional emails (return notifications, weekly digests, billing receipts)
- Maintain security, prevent abuse and debug issues
- Comply with legal obligations (tax records, Shopify compliance webhooks)

We do **not** sell your data. We do **not** use your customers' data to train AI models. We do **not** share it for marketing.

---

## 4. Sub-processors and third parties

We rely on a small number of sub-processors to operate TrackBack. Each is bound by a Data Processing Agreement.

| Provider | Purpose | Data shared | Location |
|---|---|---|---|
| **Shopify Inc.** | App platform, billing, OAuth, order data | Everything we receive flows through Shopify | Canada / EU |
| **Cloudinary** | Hosting merchant-uploaded logo images | Logo image file only | Global CDN |
| **Hosting provider** (Vercel / equivalent) | Application hosting and serverless functions | All app data in transit | EU / US |
| **Email service** (Resend / equivalent) | Sending transactional emails | Recipient email, name, RMA details | EU / US |

We will publish a full sub-processor list and notify merchants 30 days in advance before adding any new one with access to customer data.

---

## 5. Data retention

| Data | How long we keep it |
|---|---|
| Return requests (RMAs) | While your app is installed, plus 90 days after uninstall (Shopify mandatory webhook resets this — see below) |
| Live chat transcripts | Same as above |
| Logo uploads (Cloudinary) | While your app is installed |
| HTTP / debug logs | 30 days |
| Shopify session tokens | Until uninstall or token expiry |
| Billing records | 7 years (legal requirement) |

### Mandatory Shopify compliance webhooks

We are required by Shopify to honor three webhooks. They give your customers control over their data:

- **`customers/data_request`** — A customer asks for a copy of their data. We compile every RMA and chat message tied to that customer and email it to you (the merchant) within 30 days, so you can forward it to them.
- **`customers/redact`** — A customer requests deletion. We permanently delete all their data tied to your shop within 30 days of the request.
- **`shop/redact`** — 48 hours after you uninstall the app, Shopify triggers this webhook and we permanently delete all data tied to your shop within 30 days.

All webhooks are HMAC-verified using the app secret.

---

## 6. Your rights (GDPR, CCPA, and similar laws)

If you are a merchant or a customer of a merchant using TrackBack, you have the right to:

- **Access** — request a copy of the personal data we hold about you
- **Rectification** — correct inaccurate or incomplete data
- **Erasure** — ask for your data to be deleted ("right to be forgotten")
- **Restriction** — ask us to stop processing your data
- **Portability** — receive your data in a structured, machine-readable format
- **Object** — object to specific processing activities
- **Withdraw consent** — at any time, where processing is based on consent

Customers should make these requests directly to the merchant whose store they shopped at — the merchant is the controller of that data. Merchants can fulfill these requests via the Shopify Admin → Customers panel, which triggers the compliance webhooks described above.

Merchants can request their own data (account-level) directly from us at **bernadoecom@gmail.com**. We respond within 30 days.

If you are in the EU/EEA, you also have the right to lodge a complaint with your local data protection authority.

---

## 7. Security

We protect your data using:

- **Encryption in transit** — all traffic is HTTPS / TLS 1.2+
- **Encryption at rest** — database storage encrypted at the disk level
- **Least-privilege access** — engineers access production data only when strictly necessary, with audit logging
- **HMAC-verified webhooks** — every Shopify webhook is verified using your app secret
- **No payment data** — billing is handled entirely by Shopify; we never see card numbers
- **Regular security review** — dependency audits, secret scanning, automatic patch deployment

If we ever discover a personal data breach affecting you, we will notify you within 72 hours of discovery, in line with GDPR Article 33.

---

## 8. International data transfers

Your data may be processed in the EU, US, or Canada depending on which sub-processor handles it. When data leaves the EU/EEA, we rely on the European Commission's Standard Contractual Clauses (SCCs) or an adequacy decision.

---

## 9. Cookies and tracking

Inside the **embedded Shopify admin app**, we use only the session cookies Shopify provides for authentication. We do not set our own marketing or analytics cookies.

Inside the **customer return portal**, we use:
- A single `localStorage` entry (`rf_chat_identity`) to remember a customer's email/name across chat sessions on their own browser. This data never leaves their device.

We do not use cookies or local storage for advertising or cross-site tracking.

---

## 10. Children's privacy

TrackBack is a B2B tool for merchants. We do not knowingly collect data from children under 16. If you believe we have, contact us and we will delete it.

---

## 11. Changes to this policy

If we make material changes, we will:

- Update the "Last updated" date at the top
- Post the new version on returnflow.app/privacy
- Notify active merchants by email at least 30 days before the change takes effect

Continued use of the app after the effective date constitutes acceptance.

---

## 12. Contact

For any privacy question, data request, or breach concern:

- **Email:** bernadoecom@gmail.com
- **Subject line suggestion:** "Privacy request — [your shop domain]"

We aim to respond within 48 hours and resolve requests within 30 days.

---

*TrackBack is operated by [Your legal entity name], registered at [Your registered address]. This privacy policy is governed by [your jurisdiction] law.*
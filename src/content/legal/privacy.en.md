---
title: Privacy Policy
description: How TrackBack Returns collects, uses and protects merchant and customer data. GDPR-ready, processor for your Shopify store, no card data.
updated: 2026-09-26
---

This Privacy Policy explains how **TrackBack Returns** ("TrackBack", "we", "us", "our") collects, uses, shares and protects information when you install or use our Shopify app, visit our website at trackback-web.vercel.app, or use the customer return portal we host on behalf of merchants.

We are committed to the GDPR, the CCPA and Shopify's data protection requirements, and to writing a policy you can actually read.

## 1. Who we are

TrackBack is a Shopify app that lets merchants manage product returns, exchanges, refunds and EU withdrawals. The "merchant" is the Shopify store owner who installed the app. The "customer" is the shopper using a merchant's return portal.

- **Data controller (your store's data):** the merchant, who decides what is collected from their customers
- **Data processor:** TrackBack, which processes data on the merchant's behalf, under Shopify's Data Processing Addendum
- **Operator:** Digital Mania
- **Contact:** [bernadoecom@gmail.com](mailto:bernadoecom@gmail.com)

## 2. Information we collect

### 2.1 From merchants (when you install the app)

- Your store's Shopify domain (e.g. `your-store.myshopify.com`), display name and contact email, read from the Shopify Admin API
- Your subscription plan (Free, Starter or Pro) and billing status
- The settings you configure: return window, eligibility rules, resolutions, fees, payout methods, branding (logo, colors, texts in each language), email templates and return reasons
- Logo images you upload (hosted on Cloudinary)
- If you connect WhatsApp (Pro): your WhatsApp Business phone number ID and access token
- Messages you send to our support team from the app

We do not receive your password, your payment card details, or any data outside the OAuth scopes you grant during install (see Shopify Admin → Apps → TrackBack for the exact list).

### 2.2 From customers (collected through your return portal)

When a customer uses your portal, we store on your behalf:

- Their name and email address, and the order number, items, variants, quantities and prices concerned
- The return reason and any note they add, and photos they upload as evidence (Starter and Pro, hosted on Cloudinary)
- The resolution they choose (refund, store credit, gift card, exchange) and the replacement item, if any
- For orders paid on delivery: the payout method they choose (for example Wave, Orange Money, MTN MoMo, M-Pesa, bank transfer or cash), their mobile money number or bank account details and the account holder's name, plus the payment reference you record
- The return method and, if they add it, the carrier and tracking number of their parcel
- If they opt in: their phone number for WhatsApp updates
- For EU withdrawals: their name, the items concerned, their comment and the date and time the withdrawal was received
- If they use live chat (Pro): the messages they send and their timestamps
- Their language (English or French)

We never collect, store or process payment card numbers. Refunds to the original payment method are created through Shopify's Admin API; payouts for orders paid on delivery are sent by the merchant, and TrackBack only records them.

### 2.3 Automatically (technical information)

- HTTP request logs (IP address, user agent, URL, timestamp), kept for 30 days for security and debugging
- Shopify session tokens, encrypted, scoped to your store and stored in our database

We do not use third-party analytics, advertising trackers or social-media pixels inside the embedded app or the customer portal. Our public website uses the cookie-free analytics described in section 9.

## 3. How we use information

We use the data above only to:

- Run the app's features: display return requests, send notification emails and WhatsApp messages, create refunds, store credit, gift cards and exchange orders in Shopify, and record payouts
- Display your branded portal and tracking page to your customers
- Provide live chat between you and your customers (Pro)
- Send you transactional emails (return notifications, weekly reports, billing information)
- Answer your support requests
- Maintain security, prevent abuse (rate limiting, fraud signals you enable) and debug issues
- Comply with legal obligations (accounting records, Shopify compliance webhooks)

We do not sell your data. We do not use your customers' data to train AI models. We do not share it for marketing.

## 4. Sub-processors and third parties

We rely on a small number of providers to operate TrackBack:

| Provider | Purpose | Data involved | Location |
|---|---|---|---|
| **Shopify Inc.** | App platform, authentication, billing, order data | Everything we receive flows through Shopify | Canada / EU / US |
| **Vercel Inc.** | Hosting of the app and this website, website analytics | App data in transit, anonymous page views | EU / US |
| **Database hosting provider** | Storage of the app database | Return requests, settings, chat messages | EU / US |
| **Cloudinary** | Hosting of logos and return photos | Image files | Global CDN |
| **Email delivery provider (SMTP)** | Sending transactional emails | Recipient email and name, return details | EU / US |
| **Meta Platforms (WhatsApp Cloud API)** | WhatsApp notifications, only if the merchant connects WhatsApp (Pro) | Customer phone number, message content | Global |
| **Discord** | Internal notification of support messages you send us | Your message, store domain | US |

We will keep this list up to date and notify merchants in advance before adding a provider that has access to customer data.

## 5. Data retention

| Data | Retention |
|---|---|
| Return requests, payouts, photos and withdrawals | While the app is installed, plus up to 90 days after uninstall, unless deleted earlier through the webhooks below |
| Live chat transcripts | Same as above |
| Logo uploads | While the app is installed |
| HTTP and debug logs | 30 days |
| Shopify session tokens | Until uninstall or token expiry |
| Billing records | As required by accounting law |

### Mandatory Shopify compliance webhooks

Shopify requires us to honor three webhooks that give customers control over their data:

- **`customers/data_request`**: a customer asks for a copy of their data. We compile their return requests, payouts, photos and chat messages and send them to you (the merchant) within 30 days, so you can forward them.
- **`customers/redact`**: a customer asks for deletion. We permanently delete their data tied to your store within 30 days.
- **`shop/redact`**: 48 hours after you uninstall the app, Shopify triggers this webhook and we permanently delete all data tied to your store within 30 days.

All webhooks are HMAC-verified.

## 6. Your rights (GDPR, CCPA and similar laws)

You have the right to access, rectify, erase, restrict, port and object to the processing of your personal data, and to withdraw consent at any time where processing is based on consent.

Customers should send these requests to the merchant they bought from, who is the controller of that data. Merchants can fulfill them from Shopify Admin → Customers, which triggers the webhooks described above.

Merchants can request their own account data directly from us at [bernadoecom@gmail.com](mailto:bernadoecom@gmail.com). We respond within 30 days.

If you are in the EU/EEA, you can also lodge a complaint with your local data protection authority.

## 7. Security

- **Encryption in transit:** all traffic uses HTTPS (TLS 1.2 or higher)
- **Encryption at rest:** database storage is encrypted at the disk level
- **Signed sessions and webhooks:** portal sessions, tracking links and Shopify webhooks are verified with HMAC signatures
- **Least-privilege access:** production data is accessed only when strictly necessary
- **Masked payout details:** mobile money and bank account numbers are masked in the admin
- **No card data:** payments and app billing are handled by Shopify; we never see card numbers
- **Regular maintenance:** dependency updates, secret scanning and rate limiting on public endpoints

If we discover a personal data breach affecting you, we will notify you within 72 hours of discovery, in line with Article 33 of the GDPR.

## 8. International transfers

Your data may be processed in the EU, the US or Canada depending on the provider. When data leaves the EU/EEA, we rely on the European Commission's Standard Contractual Clauses or an adequacy decision.

## 9. Cookies and tracking

- **Embedded Shopify admin app:** only the session cookies Shopify provides for authentication, and a local storage entry that remembers your light or dark theme. No marketing or analytics cookies.
- **Customer return portal:** a single local storage entry (`tb_chat_…`) remembers a customer's name and email for live chat, on their own device.
- **This website:** we use Vercel Web Analytics to count page views and clicks on key buttons. It sets no cookies and does not build personal profiles or track visitors across sites.

We never use cookies or local storage for advertising or cross-site tracking.

## 10. Children's privacy

TrackBack is a business tool for merchants. We do not knowingly collect data from children under 16. If you believe we have, contact us and we will delete it.

## 11. Changes to this policy

If we make material changes, we will update the "Last updated" date above, publish the new version on this page and notify active merchants by email before the change takes effect. Continued use of the app after that date constitutes acceptance.

## 12. Contact

For any privacy question, data request or security concern, email [bernadoecom@gmail.com](mailto:bernadoecom@gmail.com) with the subject "Privacy request — your store domain". We aim to reply within 48 hours and to resolve requests within 30 days.

TrackBack Returns is operated by Digital Mania.

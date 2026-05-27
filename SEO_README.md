# SEO setup — TrackBack landing page

This landing is **fully optimized for Google search ranking**. Below is what's
already in place and what you need to do **after deployment** to maximize
visibility.

---

## ✅ What's already done (in the code)

### 1. Meta tags (in `<head>`)
- `<title>` with primary keyword "Shopify Returns App" + secondary keywords
- `<meta name="description">` (160 chars, keyword-rich, CTA-style)
- `<meta name="keywords">` (12 high-intent keywords)
- `<meta name="robots">` — explicit `index, follow` + Google directives
- `<link rel="canonical">` — prevents duplicate-content penalties
- `<meta name="theme-color">` — colors the browser chrome on mobile

### 2. Open Graph + Twitter Card
- Full OG tags so Facebook, LinkedIn, Slack, WhatsApp render a beautiful preview
- Twitter `summary_large_image` card
- ⚠️ `og:image` points to `/og-image.png` — **you need to create this file** (see below)

### 3. JSON-LD Structured Data (the BIG SEO win)
5 schemas embedded in the page:
- **SoftwareApplication** — Google can show your app with pricing, features and rich card
- **Organization** — establishes brand entity
- **WebSite** — enables sitelinks search box in Google
- **FAQPage** — the 6 FAQs render as an expandable accordion directly in SERPs
- **BreadcrumbList** — helps with hierarchy

These give you **rich results** that competitors without them never get.

### 4. Files
- `sitemap.xml` — tells Google what to crawl
- `robots.txt` — allows search engines, blocks AI training (optional)

### 5. On-page SEO
- Semantic HTML (`<nav>`, `<section>`, `<footer>`)
- One single `<h1>` ("Returns on autopilot…")
- Clean heading hierarchy (`<h2>` per section, `<h3>` for sub-features)
- Alt text on all images
- Mobile-responsive (Google ranks mobile-first)
- Fast load (Tailwind via CDN, no heavy JS framework)

---

## ⚠️ Things you MUST do before deploying

### 1. Replace the placeholder URL `trackback-web.vercel.app`
Search & replace `trackback-web.vercel.app` everywhere in `index.html`, `robots.txt`,
`sitemap.xml` with **your real domain**.

```powershell
# Example (PowerShell):
(Get-Content index.html) -replace 'trackback-web.vercel.app', 'your-real-domain.com' | Set-Content index.html
(Get-Content robots.txt) -replace 'trackback-web.vercel.app', 'your-real-domain.com' | Set-Content robots.txt
(Get-Content sitemap.xml) -replace 'trackback-web.vercel.app', 'your-real-domain.com' | Set-Content sitemap.xml
```

### 2. Create an OG image (1200×630 px)
This is the preview shown on social shares (Facebook, LinkedIn, WhatsApp).
Save it as `og-image.png` in this folder. Recommendations:
- 1200×630 px (Facebook/LinkedIn standard)
- TrackBack logo + tagline "Returns on autopilot for Shopify"
- Dark background matching the brand
- Free tool: https://www.canva.com (template "Facebook Cover")

### 3. Update the Shopify App Store URL
Search for `https://apps.shopify.com/returnflow-2?locale=fr&st_source=autocomplete&surface_detail=autocomplete_apps` and replace with your
**actual** App Store listing URL once your app is listed.

### 4. Update the canonical URL
The `<link rel="canonical">` should match your final deployed URL exactly
(including or excluding `www.` — pick one and stick with it).

---

## 🚀 After deploying — DO THESE THINGS (in order)

These are the 2 high-impact moves that get you from "indexed somewhere on
page 5" to "page 1 for your target keywords":

### A. Submit to Google Search Console (5 minutes)
1. Go to https://search.google.com/search-console
2. Add your domain (use "Domain property" for the strongest signal)
3. Verify ownership (via DNS TXT record — fastest)
4. Once verified, go to **Sitemaps** in the left menu
5. Enter `sitemap.xml` → Submit
6. Wait 24-72h — Google starts indexing

### B. Submit to Bing Webmaster Tools
Same flow as Google, at https://www.bing.com/webmasters
Bing also powers DuckDuckGo + ChatGPT search — so this matters more than people think.

### C. Verify structured data renders correctly
Test your live URL here:
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org validator**: https://validator.schema.org/

If all 5 schemas show green → you're set. You should see the FAQs and the
SoftwareApplication detected.

### D. Test the social previews
- Facebook debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

If the previews look wrong, click "Scrape again" / "Re-fetch".

---

## 🎯 Target keywords (these are what we're optimizing for)

Primary (high competition but high intent):
- `shopify returns app`
- `shopify return management`
- `shopify return portal`

Secondary (long-tail, easier to rank):
- `shopify RMA app`
- `shopify exchange app`
- `store credit shopify`
- `shopify returns automation`
- `branded return portal shopify`

To check your ranking over time:
- Use Google Search Console → Performance tab → filter by query
- Or use https://serpapi.com / https://ahrefs.com (paid but worth it)

---

## 📈 Tips to climb the rankings faster

1. **Backlinks** — the #1 ranking factor. Get your app listed on:
   - Shopify App Store (huge)
   - Product Hunt (launch there for 200+ backlinks day 1)
   - SaaS directories: G2, Capterra, GetApp, Software Advice
   - Shopify ecosystem blogs (write guest posts)

2. **Content marketing** — add a `/blog` later with articles like:
   - "How to reduce Shopify return rates"
   - "Store credit vs refunds: which is better?"
   - "Shopify returns checklist for 2026"
   Each article = a new ranking opportunity + internal links.

3. **Reviews on the Shopify App Store** — Google factors them in for
   "best shopify returns app" searches. Ask happy customers in-app.

4. **Speed** — Google penalizes slow pages.
   Move to a built Tailwind output (not CDN) for a 50-80% load speed boost
   when you have time.

5. **Update `<title>` and `<meta description>` based on data** — once
   Search Console shows your most-clicked queries (in 2-3 months),
   rewrite the title to match the top query.

# TrackBack Returns — site marketing

Site vitrine de l'app Shopify **TrackBack Returns** : accueil, démo interactive, pages de niche (rétractation UE, remboursement paiement à la livraison), changelog et pages légales, en **anglais** (racine) et **français** (`/fr`).

- **Stack :** [Astro 7](https://astro.build) en sortie statique + Tailwind CSS v4 compilé (plus de CDN), police Inter auto-hébergée.
- **Déploiement :** Vercel (`vercel.json` fixe le build Astro, les URL sans `.html`, le cache et les en-têtes de sécurité).
- **Node :** 22.12 ou plus.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # génère dist/
npm run preview   # sert dist/ comme en production
```

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Le domaine du site (canonicals, sitemap, OG, JSON-LD suivent) | `astro.config.mjs` → `SITE_URL` |
| E-mail de contact, lien App Store, nom de marque | `src/config/site.ts` |
| Textes de l'accueil (EN + FR) | `src/i18n/home.ts` |
| Textes de la page démo / de la démo interactive | `src/i18n/demo-page.ts`, `src/components/demo/demo-data.ts` |
| Pages rétractation UE et paiement à la livraison | `src/i18n/solutions.ts` |
| Nav, pied de page, libellés communs | `src/i18n/ui.ts` |
| Prix, quotas, fonctionnalités par plan | `src/data/plans.ts` (**miroir de `TrackBack/app/lib/plans.ts`**) |
| Politique de confidentialité, CGU | `src/content/legal/*.md` |
| Changelog | `src/content/changelog/changelog.{en,fr}.md` |
| URL des pages, slugs FR, date `lastmod` du sitemap | `src/i18n/routes.ts` |
| Logo, favicons, images de partage | `python scripts/generate-assets.py` (sources dans `design/`) |

Quand une fonctionnalité ou un prix change dans l'app, mettez à jour dans la foulée `src/data/plans.ts`, le changelog, et la date `updated` de la page concernée dans `src/i18n/routes.ts`.

## SEO en place

- Une page = une URL canonique, `hreflang` en/fr/x-default réciproques, `lang` correct.
- `sitemap.xml` (même URL que celle déjà soumise à la Search Console) avec les alternates de langue et un `lastmod` réel ; `robots.txt` ouvert à tous les robots, y compris ceux des moteurs IA ; `llms.txt` pour les assistants IA.
- JSON-LD en un seul `@graph` relié par `@id` : Organization, WebSite, WebPage, BreadcrumbList, SoftwareApplication (offres = vrais plans), FAQPage identique à la FAQ affichée. **Aucune note n'est déclarée** : n'ajoutez `aggregateRating` qu'avec de vrais avis visibles sur la page.
- Images de partage EN et FR (1200×630), favicon multi-tailles, manifeste.
- Performance : aucune ressource bloquante, CSS inline (~24 Ko gzip pour l'accueil), pas de JavaScript hors démo, animations en CSS pur qui ne masquent jamais le contenu.

À savoir : Google n'affiche plus les FAQ enrichies que pour les sites gouvernementaux et de santé (depuis 2023), et la « sitelinks search box » n'existe plus (2024). Le balisage reste utile pour la compréhension de la page, pas pour un affichage spécial.

## Après chaque mise en ligne importante

1. **Vercel → Analytics → Enable** (Web Analytics, gratuit, sans cookie). Sans cette activation, le script `/_vercel/insights/script.js` renvoie une 404. Les clics sur « Install » et les étapes de la démo sont suivis comme événements (événements personnalisés visibles avec le plan Pro de Vercel).
2. **Google Search Console :** renvoyer `sitemap.xml`, inspecter `/` et `/fr` puis demander l'indexation des nouvelles pages.
3. **Bing Webmaster Tools :** importer le site depuis la Search Console (Bing alimente aussi DuckDuckGo et la recherche de ChatGPT).
4. **Vérifier** avec le [test des résultats enrichis](https://search.google.com/test/rich-results) et le [débogueur de partage Facebook](https://developers.facebook.com/tools/debug/).

## Passer à un domaine personnalisé

1. Acheter le domaine, l'ajouter dans Vercel (Settings → Domains) et le définir comme domaine principal.
2. Configurer `trackback-web.vercel.app` pour **rediriger (308)** vers le nouveau domaine.
3. Changer `SITE_URL` dans `astro.config.mjs`, puis redéployer.
4. Créer des adresses e-mail sur le domaine et mettre à jour `SITE.email` dans `src/config/site.ts`.
5. Mettre à jour la fiche Shopify App Store (site web, politique de confidentialité), le lien du changelog dans l'app (`TrackBack/app/routes/app.docs.tsx`) et ajouter la nouvelle propriété dans la Search Console.

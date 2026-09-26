/**
 * JSON-LD builders. Every page emits one @graph whose nodes reference each other by
 * @id (organization → website → webpage → app), instead of disconnected snippets.
 * No ratings are declared: only add `aggregateRating` once real, visible reviews exist.
 */
import { SITE, type Lang } from '../config/site';
import { PLANS } from '../data/plans';
import { ROUTES, type RouteKey } from '../i18n/routes';

type Node = Record<string, unknown>;

const id = (site: URL, fragment: string) => `${site.origin}/#${fragment}`;

export function organizationNode(site: URL): Node {
  return {
    '@type': 'Organization',
    '@id': id(site, 'organization'),
    name: SITE.brand,
    alternateName: SITE.shortName,
    url: `${site.origin}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': id(site, 'logo'),
      url: `${site.origin}/icon-512.png`,
      width: 512,
      height: 512,
      caption: SITE.brand,
    },
    email: SITE.email,
    parentOrganization: { '@type': 'Organization', name: SITE.company },
    sameAs: [SITE.appStoreUrl],
  };
}

export function websiteNode(site: URL): Node {
  return {
    '@type': 'WebSite',
    '@id': id(site, 'website'),
    url: `${site.origin}/`,
    name: SITE.brand,
    alternateName: SITE.shortName,
    inLanguage: ['en', 'fr'],
    publisher: { '@id': id(site, 'organization') },
  };
}

export function appNode(site: URL, lang: Lang): Node {
  const features =
    lang === 'fr'
      ? [
          'Portail de retour bilingue (français / anglais) dans le thème de la boutique',
          'Remboursement des commandes payées à la livraison par mobile money, virement ou espèces',
          'Bouton de rétractation UE (directive 2023/2673)',
          'Avoirs avec bonus, cartes-cadeaux et échanges',
          'Auto-approbation et automatisations',
          'Chat en direct et WhatsApp',
          'Analytics des retours et rapport hebdomadaire',
          'Webhooks et API REST',
        ]
      : [
          'Bilingual return portal (English / French) inside the store theme',
          'Cash-on-delivery refunds via mobile money, bank transfer or cash',
          'EU withdrawal button (Directive 2023/2673)',
          'Store credit with bonus, gift cards and exchanges',
          'Auto-approval and automation rules',
          'Live chat and WhatsApp',
          'Returns analytics and weekly report',
          'Webhooks and REST API',
        ];
  return {
    '@type': 'SoftwareApplication',
    '@id': id(site, 'app'),
    name: SITE.brand,
    alternateName: SITE.shortName,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: lang === 'fr' ? 'Gestion des retours e-commerce' : 'E-commerce returns management',
    operatingSystem: 'Web (Shopify)',
    url: `${site.origin}/`,
    installUrl: SITE.appStoreUrl,
    image: `${site.origin}/og-image.png`,
    inLanguage: ['en', 'fr'],
    availableLanguage: ['en', 'fr'],
    publisher: { '@id': id(site, 'organization') },
    featureList: features,
    offers: PLANS.map((plan) => ({
      '@type': 'Offer',
      name: `${plan.id === 'free' ? (lang === 'fr' ? 'Gratuit' : 'Free') : plan.id === 'starter' ? 'Starter' : 'Pro'} — ${plan.limit[lang]}`,
      price: String(plan.monthly),
      priceCurrency: 'USD',
      url: SITE.appStoreUrl,
      ...(plan.monthly > 0
        ? {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: String(plan.monthly),
              priceCurrency: 'USD',
              billingDuration: 'P1M',
              unitCode: 'MON',
            },
          }
        : {}),
    })),
  };
}

export function webPageNode(args: {
  site: URL;
  lang: Lang;
  url: string;
  title: string;
  description: string;
  image: string;
  type?: string;
  withBreadcrumb?: boolean;
  aboutApp?: boolean;
  dateModified?: string;
}): Node {
  return {
    '@type': args.type ?? 'WebPage',
    '@id': `${args.url}#webpage`,
    url: args.url,
    name: args.title,
    description: args.description,
    inLanguage: args.lang,
    isPartOf: { '@id': id(args.site, 'website') },
    primaryImageOfPage: { '@type': 'ImageObject', url: args.image },
    ...(args.aboutApp ? { about: { '@id': id(args.site, 'app') } } : {}),
    ...(args.withBreadcrumb ? { breadcrumb: { '@id': `${args.url}#breadcrumb` } } : {}),
    ...(args.dateModified ? { dateModified: args.dateModified } : {}),
  };
}

export function breadcrumbNode(args: { site: URL; lang: Lang; route: RouteKey; name: string; homeName: string }): Node {
  const url = new URL(ROUTES[args.route][args.lang], args.site).href;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: args.homeName, item: new URL(ROUTES.home[args.lang], args.site).href },
      { '@type': 'ListItem', position: 2, name: args.name, item: url },
    ],
  };
}

/** Must mirror the FAQ rendered on the page, word for word. */
export function faqNode(url: string, items: { q: string; a: string }[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function serializeGraph(nodes: Node[]): string {
  // Escape "<" so a string can never close the <script> element.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}

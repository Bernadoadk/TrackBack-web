import { withFrTypo } from '../config/site';
import type { IconName } from '../components/icons';

const en = {
  meta: {
    title: 'Interactive Shopify Returns Demo | TrackBack Returns',
    description:
      'Try a Shopify return as the shopper and as the merchant: refunds, exchanges, store credit, cash-on-delivery payouts and the EU withdrawal button.',
  },
  breadcrumb: 'Interactive demo',
  kicker: 'Interactive demo',
  h1: 'Try a Shopify return, from both sides.',
  sub: 'Play the shopper in the portal, then handle the request as the merchant. No store, login or install needed: it takes about a minute.',
  after: {
    kicker: 'Behind the scenes',
    title: 'What you just saw.',
    items: [
      { icon: 'chart', title: 'Revenue kept', text: 'Store credit and exchanges are offered before the refund, and the revenue you keep shows up in your dashboard.' },
      { icon: 'zap', title: 'Less manual work', text: 'Eligibility, reasons and payout details are collected before your team even opens the request.' },
      { icon: 'refresh', title: 'Synced with Shopify', text: 'Refunds, store credit, exchange orders and restocks are written to Shopify, with the return number in the note.' },
      { icon: 'mail', title: 'Customers kept informed', text: "Emails at every step in the customer's language, a tracking page, and WhatsApp updates on Pro." },
    ] as { icon: IconName; title: string; text: string }[],
  },
  faq: {
    kicker: 'Demo FAQ',
    title: 'About this demo.',
    items: [
      {
        q: 'Is this the real TrackBack portal?',
        a: "It is a faithful simulation that uses the portal's real wording in English and French. In your store, the portal is displayed inside your theme, with your logo, colors and one of five layouts.",
      },
      {
        q: 'Where do merchants manage returns?',
        a: 'TrackBack is an embedded Shopify app: you review, approve and refund returns from your Shopify admin, with the same statuses as in the demo (pending, approved, received, completed).',
      },
      {
        q: 'Can I try it on my own store?',
        a: 'Yes. Install the Free plan (10 return requests a month) and create a test return on one of your own orders to see the whole flow with your data.',
      },
    ],
  },
  final: {
    title: 'Ready to run this on your store?',
    sub: 'Install TrackBack free, set your rules in 5 minutes and add the portal to your store.',
    primary: 'Install free on Shopify',
  },
};

export type DemoPageCopy = typeof en;

const fr: DemoPageCopy = {
  meta: {
    title: 'Démo interactive : retours Shopify | TrackBack Returns',
    description:
      "Testez un retour Shopify côté client et côté marchand : remboursement, échange, avoir, paiement à la livraison par mobile money et bouton de rétractation UE.",
  },
  breadcrumb: 'Démo interactive',
  kicker: 'Démo interactive',
  h1: 'Testez un retour Shopify, des deux côtés.',
  sub: "Jouez le client dans le portail, puis traitez la demande en tant que marchand. Sans boutique, sans compte, sans installation : ça prend environ une minute.",
  after: {
    kicker: 'Dans les coulisses',
    title: 'Ce que vous venez de voir.',
    items: [
      { icon: 'chart', title: 'Du chiffre d’affaires conservé', text: "L'avoir et l'échange sont proposés avant le remboursement, et le CA conservé apparaît dans votre tableau de bord." },
      { icon: 'zap', title: 'Moins de travail manuel', text: 'Éligibilité, motifs et coordonnées de remboursement sont collectés avant même que votre équipe n’ouvre la demande.' },
      { icon: 'refresh', title: 'Synchronisé avec Shopify', text: "Remboursements, avoirs, commandes d'échange et remises en stock sont écrits dans Shopify, avec le numéro de retour en note." },
      { icon: 'mail', title: 'Des clients informés', text: 'Des e-mails à chaque étape dans la langue du client, une page de suivi, et des notifications WhatsApp sur Pro.' },
    ],
  },
  faq: {
    kicker: 'FAQ de la démo',
    title: 'À propos de cette démo.',
    items: [
      {
        q: 'Est-ce le vrai portail TrackBack ?',
        a: "C'est une simulation fidèle qui reprend les textes réels du portail en français et en anglais. Dans votre boutique, le portail s'affiche dans votre thème, avec votre logo, vos couleurs et l'une des cinq mises en page.",
      },
      {
        q: 'Où le marchand gère-t-il les retours ?',
        a: "TrackBack est une application intégrée à Shopify : vous examinez, acceptez et remboursez les retours depuis votre admin Shopify, avec les mêmes statuts que dans la démo (en attente, accepté, reçu, terminé).",
      },
      {
        q: 'Puis-je l’essayer sur ma boutique ?',
        a: 'Oui. Installez le plan Gratuit (10 demandes de retour par mois) et créez un retour de test sur l’une de vos commandes pour voir tout le parcours avec vos données.',
      },
    ],
  },
  final: {
    title: 'Prêt à le mettre en place sur votre boutique ?',
    sub: 'Installez TrackBack gratuitement, réglez vos règles en 5 minutes et ajoutez le portail à votre boutique.',
    primary: 'Installer gratuitement sur Shopify',
  },
};

export const DEMO_PAGE = { en, fr: withFrTypo(fr) };

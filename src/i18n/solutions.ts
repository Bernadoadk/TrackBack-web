import { withFrTypo } from '../config/site';
import type { IconName } from '../components/icons';

type Step = { title: string; text: string };
type Card = { icon: IconName; title: string; text: string };
type QA = { q: string; a: string };

export type SolutionCopy = {
  meta: { title: string; description: string };
  breadcrumb: string;
  kicker: string;
  h1: string;
  lead: string;
  primary: string;
  secondary: string;
  demoScenario: 'withdrawal' | 'cod';
  rules?: { kicker: string; title: string; intro: string; items: Step[]; disclaimer: string };
  problem?: { kicker: string; title: string; text: string };
  how: { kicker: string; title: string; steps: Step[] };
  methods?: { title: string; note: string; list: string[] };
  extras?: { kicker: string; title: string; items: Card[] };
  faq: { kicker: string; title: string; items: QA[] };
  final: { title: string; sub: string };
};

// ─── EU withdrawal button ────────────────────────────────────────────────────
const withdrawalEn: SolutionCopy = {
  meta: {
    title: 'EU Withdrawal Button for Shopify | TrackBack Returns',
    description:
      'Since 19 June 2026, EU online stores must offer a “withdraw from contract” button. Add a compliant two-step withdrawal flow to Shopify, free plan included.',
  },
  breadcrumb: 'EU withdrawal button',
  kicker: 'Directive (EU) 2023/2673',
  h1: 'The EU withdrawal button for Shopify, built in.',
  lead: 'Since 19 June 2026, online stores that sell to consumers in the EU must let them withdraw from a purchase through a dedicated withdrawal function. TrackBack includes it in your return portal on every plan, including Free.',
  primary: 'Install free on Shopify',
  secondary: 'Try the withdrawal demo',
  demoScenario: 'withdrawal',
  rules: {
    kicker: 'What the rule requires',
    title: 'Four things your withdrawal function must do.',
    intro:
      'Directive (EU) 2023/2673 adds a new Article 11a to the Consumer Rights Directive (2011/83/EU). For contracts concluded through an online interface, the trader must provide:',
    items: [
      {
        title: 'A clearly labelled function',
        text: 'Labelled “withdraw from contract here” or an equally unambiguous wording, prominently displayed, easy to access and available throughout the withdrawal period.',
      },
      {
        title: 'A withdrawal statement',
        text: 'The consumer identifies themselves and the contract (name, order, email) to send their withdrawal statement online.',
      },
      {
        title: 'A confirmation step',
        text: 'A second step labelled “confirm withdrawal” or similar, so the statement is only sent once the consumer confirms it.',
      },
      {
        title: 'An acknowledgment of receipt',
        text: 'Sent without undue delay on a durable medium such as email, including the content of the statement and the date and time it was received.',
      },
    ],
    disclaimer: 'This page is general information, not legal advice. Check with your legal adviser how these rules apply to your store.',
  },
  how: {
    kicker: 'How TrackBack handles it',
    title: 'A compliant flow in your portal, ready in one click.',
    steps: [
      { title: 'Turn it on', text: 'Enable the EU withdrawal button in TrackBack’s settings: the link appears on the first screen of your return portal.' },
      { title: '“Withdraw from contract here”', text: 'The link is shown in English or French, next to your regular return form.' },
      { title: 'Identify the order', text: 'The customer enters their name, order number and email. No account or password needed.' },
      { title: 'Confirm withdrawal', text: 'They select the items (or the whole order), add an optional comment and click “Confirm withdrawal”.' },
      { title: 'Instant acknowledgment', text: 'The customer sees the date and time of receipt on screen, and TrackBack immediately emails them an acknowledgment in their language.' },
      { title: 'Handled in your dashboard', text: 'Pending withdrawals show up in your dashboard: approve them, receive the items and refund the original payment method.' },
    ],
  },
  faq: {
    kicker: 'FAQ',
    title: 'Withdrawal button questions.',
    items: [
      {
        q: 'Does the withdrawal button apply to my store?',
        a: 'It applies to distance contracts concluded with consumers through an online interface in the EU. If you sell online to consumers in the EU, it most likely applies, including when your business is based outside the EU. Check your specific case with a legal adviser.',
      },
      {
        q: 'Is it the same as my return policy?',
        a: 'No. The legal right of withdrawal (generally 14 days, without giving a reason) is separate from the commercial return policy you may offer. TrackBack keeps both: the regular return flow and the withdrawal flow.',
      },
      { q: 'Which TrackBack plans include it?', a: 'Every plan, including the Free plan.' },
      {
        q: 'Is the flow available in French?',
        a: 'Yes. The link, both steps and the acknowledgment email exist in English and French: “Se rétracter du contrat ici” and “Confirmer la rétractation”.',
      },
      { q: 'Do customers need an account?', a: 'No. They identify their order with its number and the email used at checkout, just like a regular return.' },
    ],
  },
  final: {
    title: 'Be ready for EU withdrawal requests today.',
    sub: 'Install TrackBack free and turn on the withdrawal button in your settings: the link appears in your portal right away.',
  },
};

const withdrawalFr: SolutionCopy = {
  meta: {
    title: 'Bouton de rétractation UE pour Shopify | TrackBack Returns',
    description:
      "Depuis le 19 juin 2026, les boutiques en ligne de l'UE doivent proposer un bouton « se rétracter du contrat ». Ajoutez-le à Shopify, plan gratuit inclus.",
  },
  breadcrumb: 'Bouton de rétractation UE',
  kicker: 'Directive (UE) 2023/2673',
  h1: 'Le bouton de rétractation UE pour Shopify, intégré.',
  lead: "Depuis le 19 juin 2026, les boutiques en ligne qui vendent à des consommateurs de l'UE doivent leur permettre de se rétracter via une fonction de rétractation dédiée. TrackBack l'inclut dans votre portail de retour, dans tous les plans, y compris le gratuit.",
  primary: 'Installer gratuitement sur Shopify',
  secondary: 'Essayer la démo de rétractation',
  demoScenario: 'withdrawal',
  rules: {
    kicker: 'Ce que la règle impose',
    title: 'Quatre choses que votre fonction de rétractation doit faire.',
    intro:
      "La directive (UE) 2023/2673 ajoute un article 11 bis à la directive sur les droits des consommateurs (2011/83/UE). Pour les contrats conclus via une interface en ligne, le professionnel doit proposer :",
    items: [
      {
        title: 'Une fonction clairement libellée',
        text: "Intitulée « se rétracter du contrat ici » ou d'une formulation tout aussi claire, bien visible, facile d'accès et disponible pendant tout le délai de rétractation.",
      },
      {
        title: 'Une déclaration de rétractation',
        text: "Le consommateur s'identifie et désigne le contrat (nom, commande, e-mail) pour envoyer sa déclaration en ligne.",
      },
      {
        title: 'Une étape de confirmation',
        text: "Une seconde étape intitulée « confirmer la rétractation » ou équivalent : la déclaration n'est envoyée qu'après confirmation.",
      },
      {
        title: 'Un accusé de réception',
        text: "Envoyé sans retard injustifié sur un support durable, comme un e-mail, avec le contenu de la déclaration ainsi que la date et l'heure de réception.",
      },
    ],
    disclaimer: "Cette page est une information générale, pas un conseil juridique. Vérifiez avec votre conseil comment ces règles s'appliquent à votre boutique.",
  },
  how: {
    kicker: 'Comment TrackBack le gère',
    title: 'Un parcours conforme dans votre portail, prêt en un clic.',
    steps: [
      { title: 'Activez-le', text: 'Activez le bouton de rétractation UE dans les réglages de TrackBack : le lien apparaît sur le premier écran de votre portail de retour.' },
      { title: '« Se rétracter du contrat ici »', text: 'Le lien s’affiche en français ou en anglais, à côté de votre formulaire de retour habituel.' },
      { title: 'Identification de la commande', text: 'Le client saisit son nom, son numéro de commande et son e-mail. Sans compte ni mot de passe.' },
      { title: 'Confirmer la rétractation', text: 'Il sélectionne les articles (ou toute la commande), ajoute un commentaire facultatif et clique sur « Confirmer la rétractation ».' },
      { title: 'Accusé de réception immédiat', text: "Le client voit la date et l'heure de réception à l'écran, et TrackBack lui envoie aussitôt un accusé de réception par e-mail, dans sa langue." },
      { title: 'Traitée dans votre tableau de bord', text: "Les rétractations en attente apparaissent dans votre tableau de bord : acceptez-les, réceptionnez les articles et remboursez sur le moyen de paiement d'origine." },
    ],
  },
  faq: {
    kicker: 'FAQ',
    title: 'Vos questions sur le bouton de rétractation.',
    items: [
      {
        q: "Le bouton de rétractation s'applique-t-il à ma boutique ?",
        a: "Il s'applique aux contrats à distance conclus avec des consommateurs via une interface en ligne dans l'UE. Si vous vendez en ligne à des consommateurs de l'UE, il vous concerne très probablement, y compris si votre entreprise est établie hors de l'UE. Vérifiez votre cas avec un conseil juridique.",
      },
      {
        q: 'Est-ce la même chose que ma politique de retour ?',
        a: "Non. Le droit légal de rétractation (en général 14 jours, sans motif) est distinct de la politique de retour commerciale que vous proposez. TrackBack gère les deux : le parcours de retour habituel et le parcours de rétractation.",
      },
      { q: 'Quels plans TrackBack l’incluent ?', a: 'Tous les plans, y compris le plan Gratuit.' },
      {
        q: 'Le parcours est-il disponible en français ?',
        a: "Oui. Le lien, les deux étapes et l'e-mail d'accusé de réception existent en français et en anglais : « Se rétracter du contrat ici » et « Confirmer la rétractation ».",
      },
      { q: 'Le client doit-il avoir un compte ?', a: "Non. Il identifie sa commande avec son numéro et l'e-mail utilisé lors de l'achat, comme pour un retour classique." },
    ],
  },
  final: {
    title: 'Soyez prêt pour les demandes de rétractation UE dès aujourd’hui.',
    sub: 'Installez TrackBack gratuitement et activez le bouton de rétractation dans vos réglages : le lien apparaît aussitôt dans votre portail.',
  },
};

// ─── Cash-on-delivery refunds ────────────────────────────────────────────────
const METHODS_EN = ['Wave', 'Orange Money', 'MTN MoMo', 'Moov Money', 'M-Pesa', 'Airtel Money', 'Bank transfer', 'Cash', 'Other'];
const METHODS_FR = ['Wave', 'Orange Money', 'MTN MoMo', 'Moov Money', 'M-Pesa', 'Airtel Money', 'Virement bancaire', 'Espèces', 'Autre'];

const codEn: SolutionCopy = {
  meta: {
    title: 'Refund Cash-on-Delivery Orders on Shopify | TrackBack Returns',
    description:
      'Refund Shopify COD orders via Wave, Orange Money, MTN MoMo, M-Pesa, bank transfer or cash. Collect payout details and record every payout in Shopify.',
  },
  breadcrumb: 'Cash-on-delivery refunds',
  kicker: 'Cash on delivery · Mobile money',
  h1: 'Refund cash-on-delivery orders by mobile money, transfer or cash.',
  lead: 'When an order was paid on delivery, there is no card to refund. TrackBack lets customers tell you where to send their money, and records every payout in Shopify so your orders and reports stay accurate.',
  primary: 'Install free on Shopify',
  secondary: 'Try the COD demo',
  demoScenario: 'cod',
  problem: {
    kicker: 'The problem',
    title: 'Shopify can’t send a COD refund for you.',
    text: 'Cash-on-delivery orders are paid through a manual payment method, so Shopify has no card or wallet to send the money back to. Many stores end up collecting numbers over WhatsApp, paying from a phone and noting it somewhere, with no link to the order.',
  },
  how: {
    kicker: 'How it works',
    title: 'From return request to recorded payout.',
    steps: [
      {
        title: 'The customer picks a payout method',
        text: 'For orders paid on delivery, the portal offers “Mobile money or bank transfer” instead of a card refund. The customer chooses among the methods you enable and enters their number or account and the account holder’s name.',
      },
      { title: 'You approve and receive the items', text: 'Handle the return as usual: approve it and receive the parcel. TrackBack restocks the items in Shopify.' },
      { title: 'You send the money', text: 'Pay the customer from your own wallet or bank account. TrackBack never holds or moves your funds.' },
      { title: 'Record the payout', text: 'Click “Record payout” and add the payment reference. TrackBack records the refund on the Shopify order, with the method and reference in the note.' },
      { title: 'The customer is notified', text: 'An email (and WhatsApp on Pro) confirms the refund, and the tracking page shows the return as completed.' },
    ],
  },
  methods: { title: 'Supported payout methods', note: 'You choose which methods appear in your portal.', list: METHODS_EN },
  extras: {
    kicker: 'Good to know',
    title: 'Built for stores that sell on delivery.',
    items: [
      { icon: 'gift', title: 'Offer store credit instead', text: 'On Starter and Pro, customers can choose store credit with a bonus: they get it right away and you keep the revenue.' },
      { icon: 'lock', title: 'Account numbers masked', text: 'Payout numbers are masked in the admin and included in the GDPR data requests triggered from Shopify.' },
      { icon: 'languages', title: 'In French and English', text: 'The whole flow, emails included, follows your customer’s language.' },
      { icon: 'check', title: 'Included on the Free plan', text: 'Cash-on-delivery refunds are available on every plan, including Free.' },
    ],
  },
  faq: {
    kicker: 'FAQ',
    title: 'Cash-on-delivery refund questions.',
    items: [
      {
        q: 'Does TrackBack send the money to the customer?',
        a: 'No. You pay the customer with your usual wallet or bank, then record the payout and its reference in TrackBack. You stay in control of your funds.',
      },
      {
        q: 'Which methods can customers choose?',
        a: 'Wave, Orange Money, MTN MoMo, Moov Money, M-Pesa, Airtel Money, bank transfer, cash or another method. You decide which ones appear in your portal.',
      },
      {
        q: 'What happens in Shopify?',
        a: 'TrackBack records the refund on the order, with the payout method and reference in the note, and restocks the returned items, so your orders and reports stay accurate.',
      },
      { q: 'Which plans include cash-on-delivery refunds?', a: 'All of them, including the Free plan (10 return requests per month).' },
      {
        q: 'Can customers get store credit instead of cash?',
        a: 'Yes, on Starter and Pro. Store credit can come with a bonus, such as +10%, and is issued as Shopify store credit or a gift card.',
      },
    ],
  },
  final: {
    title: 'Stop tracking COD refunds in a notebook.',
    sub: 'Install TrackBack free: cash-on-delivery refunds are included in every plan.',
  },
};

const codFr: SolutionCopy = {
  meta: {
    title: 'Remboursement paiement à la livraison Shopify | TrackBack',
    description:
      'Remboursez les commandes Shopify payées à la livraison par Wave, Orange Money, MTN MoMo, M-Pesa, virement ou espèces, et enregistrez chaque versement dans Shopify.',
  },
  breadcrumb: 'Remboursement paiement à la livraison',
  kicker: 'Paiement à la livraison · Mobile money',
  h1: 'Remboursez les commandes payées à la livraison, par mobile money, virement ou espèces.',
  lead: "Quand une commande a été payée à la livraison, il n'y a pas de carte à rembourser. TrackBack permet au client d'indiquer où envoyer son argent, et enregistre chaque versement dans Shopify pour que vos commandes et vos rapports restent justes.",
  primary: 'Installer gratuitement sur Shopify',
  secondary: 'Essayer la démo paiement à la livraison',
  demoScenario: 'cod',
  problem: {
    kicker: 'Le problème',
    title: 'Shopify ne peut pas rembourser une commande payée à la livraison à votre place.',
    text: "Les commandes payées à la livraison passent par un mode de paiement manuel : Shopify n'a ni carte ni portefeuille vers lequel renvoyer l'argent. Beaucoup de boutiques finissent par récupérer les numéros sur WhatsApp, payer depuis un téléphone et le noter quelque part, sans lien avec la commande.",
  },
  how: {
    kicker: 'Comment ça marche',
    title: 'De la demande de retour au versement enregistré.',
    steps: [
      {
        title: 'Le client choisit un mode de remboursement',
        text: "Pour les commandes payées à la livraison, le portail propose « Mobile money ou virement » au lieu d'un remboursement sur carte. Le client choisit parmi les modes que vous activez et indique son numéro ou son compte, ainsi que le nom du titulaire.",
      },
      { title: 'Vous acceptez et réceptionnez', text: 'Traitez le retour comme d’habitude : acceptez-le et réceptionnez le colis. TrackBack remet les articles en stock dans Shopify.' },
      { title: 'Vous envoyez l’argent', text: 'Payez le client depuis votre propre portefeuille ou compte bancaire. TrackBack ne détient ni ne déplace jamais vos fonds.' },
      { title: 'Enregistrez le versement', text: 'Cliquez sur « Enregistrer le versement » et ajoutez la référence du paiement. TrackBack enregistre le remboursement sur la commande Shopify, avec le mode et la référence en note.' },
      { title: 'Le client est prévenu', text: 'Un e-mail (et WhatsApp sur Pro) confirme le remboursement, et la page de suivi affiche le retour comme terminé.' },
    ],
  },
  methods: { title: 'Modes de remboursement pris en charge', note: 'Vous choisissez les modes proposés dans votre portail.', list: METHODS_FR },
  extras: {
    kicker: 'Bon à savoir',
    title: 'Pensé pour les boutiques qui vendent à la livraison.',
    items: [
      { icon: 'gift', title: "Proposez plutôt un avoir", text: "Sur Starter et Pro, le client peut choisir un avoir avec bonus : il le reçoit tout de suite et vous gardez le chiffre d'affaires." },
      { icon: 'lock', title: 'Numéros de compte masqués', text: "Les numéros de versement sont masqués dans l'admin et inclus dans les demandes RGPD déclenchées depuis Shopify." },
      { icon: 'languages', title: 'En français et en anglais', text: 'Tout le parcours, e-mails compris, suit la langue de votre client.' },
      { icon: 'check', title: 'Inclus dans le plan Gratuit', text: 'Le remboursement des commandes payées à la livraison est disponible dans tous les plans, y compris le gratuit.' },
    ],
  },
  faq: {
    kicker: 'FAQ',
    title: 'Vos questions sur le remboursement à la livraison.',
    items: [
      {
        q: "TrackBack envoie-t-il l'argent au client ?",
        a: 'Non. Vous payez le client avec votre portefeuille ou votre banque habituels, puis vous enregistrez le versement et sa référence dans TrackBack. Vous gardez la main sur vos fonds.',
      },
      {
        q: 'Quels modes le client peut-il choisir ?',
        a: 'Wave, Orange Money, MTN MoMo, Moov Money, M-Pesa, Airtel Money, virement bancaire, espèces ou un autre mode. Vous décidez lesquels apparaissent dans votre portail.',
      },
      {
        q: 'Que se passe-t-il dans Shopify ?',
        a: 'TrackBack enregistre le remboursement sur la commande, avec le mode de versement et la référence en note, et remet les articles retournés en stock : vos commandes et vos rapports restent justes.',
      },
      { q: 'Quels plans incluent ce remboursement ?', a: 'Tous, y compris le plan Gratuit (10 demandes de retour par mois).' },
      {
        q: 'Le client peut-il recevoir un avoir plutôt que de l’argent ?',
        a: 'Oui, sur Starter et Pro. L’avoir peut être assorti d’un bonus, comme +10 %, et il est émis en crédit boutique Shopify ou en carte-cadeau.',
      },
    ],
  },
  final: {
    title: 'Arrêtez de noter vos remboursements dans un cahier.',
    sub: 'Installez TrackBack gratuitement : le remboursement des commandes payées à la livraison est inclus dans tous les plans.',
  },
};

export const SOLUTIONS = {
  withdrawal: { en: withdrawalEn, fr: withFrTypo(withdrawalFr) },
  cod: { en: codEn, fr: withFrTypo(codFr) },
};

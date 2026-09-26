---
title: Nouveautés
description: "Les nouveautés de TrackBack Returns, l'application de retours Shopify : notes de version, nouvelles fonctionnalités et corrections."
updated: 2026-09-26
---

Les nouveautés de TrackBack, des versions les plus récentes aux plus anciennes.

## 26 septembre 2026 — Portail bilingue, nouvelles résolutions et fonctionnalités par plan

### Ajouts

**Portail client**

- Portail bilingue anglais / français qui suit la langue de la boutique, textes personnalisables par langue.
- Portail affiché dans le thème de la boutique via l'App Proxy (`/apps/returns`), avec option pleine page.
- Page de suivi du retour : chronologie, instructions de retour, saisie du numéro de suivi ; liée dans chaque e-mail.
- [Bouton de rétractation UE](/fr/bouton-de-retractation) (directive 2023/2673) : parcours en 2 étapes sans compte et accusé de réception immédiat.
- Nouveaux modes de retour : dépôt en boutique et enlèvement par coursier, en plus de l'envoi par le client et de l'étiquette prépayée.
- Photos (jusqu'à 3 par article), obligatoires selon le motif (Starter et Pro).
- Frais et bonus affichés avant validation ; le serveur recalcule tout.

**Résolutions**

- [Remboursement des commandes payées à la livraison](/fr/remboursement-paiement-a-la-livraison) : le client indique son compte (Wave, Orange Money, MTN MoMo, Moov Money, M-Pesa, Airtel Money, virement, espèces) et le marchand enregistre le paiement avec sa référence ; Shopify enregistre le remboursement.
- Cartes-cadeaux Shopify (Starter et Pro), utilisées automatiquement à la place de l'avoir pour les commandes sans compte client.
- Échanges en libre-service (Starter et Pro) : le client choisit lui-même la taille ou la couleur, stock vérifié en direct.
- Shop Now (Pro) : échange contre n'importe quel produit de la boutique.
- Retours verts (Starter et Pro) : sous un montant défini, le client garde l'article.
- Frais de remise en stock et de retour (Starter et Pro), exemptions par motif, frais offerts pour les avoirs et échanges.

**Opérations**

- Automatisations (Pro) : conditions d'auto-approbation (montant maximum, clients à risque exclus), remboursement automatique à réception.
- Score de risque et liste noire de clients (Pro).
- WhatsApp (Pro) : bouton sur la page de suivi, message prêt à envoyer sur chaque retour, notifications automatiques via l'API Cloud de Meta.
- Export CSV des retours filtrés.
- Tâche quotidienne : expiration des retours non expédiés et rapport hebdomadaire du lundi (Starter et Pro).
- Tags de commandes Shopify (Starter et Pro) : `trackback-return`, `trackback-exchange`, `trackback-refunded`…

**E-mails et analytics**

- 8 e-mails en anglais et en français (nouveaux : « Reçu », « Expiré », « Rétractation reçue »), envoyés dans la langue du client, réponses vers l'e-mail du marchand.
- Nouvelles variables : `{{return_instructions}}`, `{{refund_details}}`, `{{status_url}}`, `{{items_list}}`…
- Analytics : taux de retour (comparé aux commandes Shopify), répartition des résolutions, frais encaissés.

**Intégrations (Pro)**

- Webhooks sortants signés HMAC-SHA256 (`return.created` … `return.expired`) avec événement de test.
- API REST v1 : `GET /api/v1/returns` et `GET /api/v1/returns/{rma}`, clés stockées hachées.

### Améliorations

- Réglages réorganisés en 9 onglets : Général, Éligibilité, Retours et frais, Remboursements, Motifs, Politique, Notifications, Intégrations, Portail.
- Fonctionnalités réparties par plan depuis une source unique, avec badges et invitations à passer au plan supérieur.
- Actions groupées : mêmes e-mails et synchronisations Shopify que les actions unitaires.
- Fenêtre de retour calculée depuis l'expédition, ou depuis la date de commande au choix.
- Règles « non retournable » exactes (SKU, tags, types de produits).
- Tableau de bord : rétractations UE en attente et retours à risque.
- Montants formatés selon la langue du client dans le portail et les e-mails.
- Pages plus légères : le JavaScript partagé passe de 803 kB à 73 kB.
- Documentation intégrée réécrite, avec de nouvelles sections Remboursements, Analytics, Webhooks et API.

### Corrections

- Les plans annuels étaient traités comme Free à plusieurs endroits.
- La synchronisation Shopify pouvait faire reculer le statut d'un retour (webhook tardif).
- La remise en stock pouvait échouer silencieusement (scope `read_locations` manquant).
- Un double remboursement était possible en cas de double clic ou d'action simultanée.
- Les webhooks RGPD aboutissent de façon fiable, et l'export RGPD inclut désormais paiements, photos et chat.
- Des icônes pouvaient être invisibles dans l'admin et le portail.
- Le portail intégré en iframe pouvait être bloqué par la politique `frame-ancestors`.

### Sécurité

- Sessions du portail, du chat et des liens de suivi signées (HMAC).
- Revalidation serveur de l'éligibilité, des quantités, des frais et des montants.
- Recherche de commande protégée contre l'injection de syntaxe de recherche.
- Suppression d'images limitée au dossier de la boutique.
- Limitation de débit sur les points d'accès publics et comparaisons de secrets en temps constant.

## [1.4.0] — 18 mai 2026

### Ajouts

- **Choix de l'icône du chat.** Choisissez parmi six icônes pour le bouton de chat de votre portail, depuis Éditeur de portail → Chat.
- **Bloc de thème en trois mises en page.** Le bloc d'application « Return Button » propose trois mises en page (Bannière, Carte et Bouton seul), des styles plein ou contour, quatre icônes et des couleurs entièrement personnalisables.
- **Documentation du portail intégrée.** Réglages → Portail présente trois façons d'afficher votre portail : le bloc de thème, une URL directe ou un code d'intégration iframe, chacun avec un bouton de copie.
- **Documentation améliorée :** barre de progression de lecture, onglets regroupés en 4 catégories et liens d'ancrage sur chaque section.

### Changements

- **Fin de la période d'essai.** Tous les plans sont facturés dès le premier jour : vous ne payez que les mois utilisés, résiliable à tout moment.
- **Facturation auto-réparatrice.** Chaque chargement de page de l'admin synchronise votre abonnement avec Shopify : un passage au plan supérieur débloque les fonctionnalités sans rechargement.
- **Bulle de chat dans l'aperçu du portail**, avec l'icône et la couleur de marque choisies.

### Corrections

- Le widget de support ne bloque plus les clics sur les boutons situés dessous.
- Les cadenas de la barre latérale, les bannières et les vérifications serveur s'accordent désormais sur les fonctionnalités débloquées.
- Les plans ne restent plus bloqués « en attente » après l'annulation de l'approbation Shopify.

## [1.3.0] — 15 avril 2026

### Ajouts

- **Motifs de retour personnalisés.** Créez votre propre liste de motifs affichés dans le portail.
- **Chat en direct avec les clients** (plan Pro) : une bulle de chat dans le portail et une boîte de réception dans l'application, avec notification par e-mail quand vous êtes hors ligne.
- **Vues analytics sur 30 et 90 jours.**
- **Webhooks de conformité RGPD / Shopify :** `customers/data_request`, `customers/redact` et `shop/redact`, tous vérifiés par HMAC.

### Changements

- **Plus de variables dans les modèles d'e-mails :** `{{customer_name}}`, `{{rma_number}}`, `{{order_number}}`, `{{refund_amount}}`, `{{rejection_reason}}`, `{{carrier}}`, `{{tracking_number}}`.
- L'activation du chat dans le portail passe dans Éditeur de portail → Chat.

### Corrections

- La recherche de commande essaie plusieurs formats (`name:#1234`, `name:1234`…) pour les boutiques aux numéros de commande non standard.
- Le téléversement du logo réessaie une fois en cas d'expiration côté Cloudinary, avec un message d'erreur clair.

## [1.2.0] — 10 mars 2026

### Ajouts

- **Échanges.** Les clients peuvent demander un autre article.
- **Avoir avec bonus.** Ajoutez un bonus configurable (par exemple +10 %) lors de l'émission d'un avoir.
- **Auto-approbation** des retours entrants.
- **SKU bloqués** qui ne peuvent jamais être retournés (vente finale, produits d'hygiène…).
- **CA conservé** dans le tableau de bord analytics : ce que vous gardez grâce aux avoirs et aux échanges.

### Changements

- Indicateur d'étapes du portail repensé, pensé d'abord pour le mobile.
- Les remboursements utilisent directement la mutation `refundCreate` de Shopify, pour une confirmation plus rapide.

### Corrections

- Les retours au-delà de la limite mensuelle du plan affichent désormais un message clair au client.

## [1.1.0] — 5 février 2026

### Ajouts

- **Éditeur de portail :** couleur de marque, en-tête, logo, nom de la boutique, contact en pied de page et chaque libellé, avec aperçu ordinateur / mobile en direct.
- **Cinq mises en page de portail :** Classic, Minimal, Bold, Sidebar et Compact.
- **Éditeur de modèles d'e-mails** pour chaque statut : demande reçue, acceptée, refusée, remboursée et expédiée.
- **Page des plans** avec comparatif des fonctionnalités et passage au plan supérieur en un clic via la facturation Shopify.

### Changements

- Réglages répartis en onglets : Général, Motifs, E-mails, Politique et Portail.

## [1.0.0] — 20 janvier 2026

Première version publique.

### Ajouts

- **Portail de retour client**, intégré à votre boutique via l'App Proxy à l'adresse `/apps/returns`. Les clients retrouvent leur commande avec leur e-mail et leur numéro de commande, sans compte.
- **Tableau de bord de gestion des retours** avec un parcours de statuts complet : en attente, accepté, expédié, reçu, remboursé (ou refusé et expiré).
- **Remboursement sur le moyen de paiement d'origine** via Shopify.
- **Notifications par e-mail** aux clients à chaque changement de statut.
- **Analytics de base** (7 jours).
- **Bloc d'application de thème** (« Return Button ») pour ajouter un appel à l'action n'importe où dans votre thème.
- **Plan Gratuit** avec 10 retours par mois.

## Et ensuite

Nous publions régulièrement. Au programme :

- Génération d'étiquettes d'expédition via des intégrations transporteurs
- Import CSV de l'historique des retours
- Nouvelles langues de portail (espagnol, allemand)

Une idée de fonctionnalité ? Écrivez à [bernadoecom@gmail.com](mailto:bernadoecom@gmail.com) ou discutez avec nous depuis le bouton d'aide de l'application.

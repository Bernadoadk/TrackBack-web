---
title: Politique de confidentialité
description: Comment TrackBack Returns collecte, utilise et protège les données des marchands et de leurs clients. Aucune donnée de carte bancaire.
updated: 2026-09-26
---

Cette politique de confidentialité explique comment **TrackBack Returns** (« TrackBack », « nous ») collecte, utilise, partage et protège les informations lorsque vous installez ou utilisez notre application Shopify, visitez notre site trackback-web.vercel.app, ou utilisez le portail de retour que nous hébergeons pour le compte des marchands.

Nous nous engageons à respecter le RGPD, le CCPA et les exigences de Shopify en matière de protection des données, et à rédiger une politique réellement lisible.

## 1. Qui sommes-nous

TrackBack est une application Shopify qui permet aux marchands de gérer les retours, échanges, remboursements et rétractations UE. Le « marchand » est le propriétaire de la boutique Shopify qui a installé l'application. Le « client » est l'acheteur qui utilise le portail de retour du marchand.

- **Responsable du traitement (données de votre boutique) :** le marchand, qui décide des données collectées auprès de ses clients
- **Sous-traitant :** TrackBack, qui traite les données pour le compte du marchand, dans le cadre de l'avenant sur le traitement des données de Shopify
- **Éditeur :** Digital Mania
- **Contact :** [bernadoecom@gmail.com](mailto:bernadoecom@gmail.com)

## 2. Les informations que nous collectons

### 2.1 Auprès des marchands (à l'installation de l'application)

- Le domaine Shopify de votre boutique (par exemple `votre-boutique.myshopify.com`), son nom et son e-mail de contact, lus via l'API Admin de Shopify
- Votre plan d'abonnement (Gratuit, Starter ou Pro) et son statut de facturation
- Les réglages que vous configurez : délai de retour, règles d'éligibilité, résolutions, frais, modes de versement, image de marque (logo, couleurs, textes dans chaque langue), modèles d'e-mails et motifs de retour
- Les logos que vous téléversez (hébergés sur Cloudinary)
- Si vous connectez WhatsApp (Pro) : l'identifiant de votre numéro WhatsApp Business et votre jeton d'accès
- Les messages que vous envoyez à notre support depuis l'application

Nous ne recevons ni votre mot de passe, ni vos données de carte de paiement, ni aucune donnée hors des autorisations OAuth accordées à l'installation (voir Admin Shopify → Applications → TrackBack pour la liste exacte).

### 2.2 Auprès des clients (via votre portail de retour)

Lorsqu'un client utilise votre portail, nous conservons pour votre compte :

- Son nom et son adresse e-mail, ainsi que le numéro de commande, les articles, variantes, quantités et prix concernés
- Le motif du retour et ses éventuelles précisions, ainsi que les photos ajoutées comme justificatifs (Starter et Pro, hébergées sur Cloudinary)
- La résolution choisie (remboursement, avoir, carte-cadeau, échange) et, le cas échéant, l'article de remplacement
- Pour les commandes payées à la livraison : le mode de versement choisi (par exemple Wave, Orange Money, MTN MoMo, M-Pesa, virement ou espèces), son numéro mobile money ou ses coordonnées bancaires et le nom du titulaire, ainsi que la référence du paiement que vous enregistrez
- Le mode de retour et, s'il les ajoute, le transporteur et le numéro de suivi de son colis
- S'il y consent : son numéro de téléphone pour le suivi WhatsApp
- Pour les rétractations UE : son nom, les articles concernés, son commentaire, ainsi que la date et l'heure de réception de la rétractation
- S'il utilise le chat (Pro) : ses messages et leur horodatage
- Sa langue (français ou anglais)

Nous ne collectons, ne stockons et ne traitons jamais de numéro de carte de paiement. Les remboursements sur le moyen de paiement d'origine sont créés via l'API Admin de Shopify ; les versements des commandes payées à la livraison sont envoyés par le marchand, TrackBack se contente de les enregistrer.

### 2.3 Automatiquement (informations techniques)

- Journaux de requêtes HTTP (adresse IP, navigateur, URL, horodatage), conservés 30 jours pour la sécurité et le débogage
- Jetons de session Shopify, chiffrés, limités à votre boutique et stockés dans notre base de données

Nous n'utilisons ni outil d'analyse tiers, ni traceur publicitaire, ni pixel de réseau social dans l'application intégrée ou dans le portail client. Notre site public utilise la mesure d'audience sans cookie décrite à la section 9.

## 3. Comment nous utilisons ces informations

Nous utilisons ces données uniquement pour :

- Faire fonctionner l'application : afficher les demandes de retour, envoyer les e-mails et messages WhatsApp, créer dans Shopify les remboursements, avoirs, cartes-cadeaux et commandes d'échange, et enregistrer les versements
- Afficher votre portail à votre marque et la page de suivi à vos clients
- Fournir le chat entre vous et vos clients (Pro)
- Vous envoyer des e-mails transactionnels (notifications de retour, rapports hebdomadaires, informations de facturation)
- Répondre à vos demandes de support
- Assurer la sécurité, prévenir les abus (limitation de débit, signaux de fraude que vous activez) et corriger les erreurs
- Respecter nos obligations légales (registres comptables, webhooks de conformité Shopify)

Nous ne vendons pas vos données. Nous n'utilisons pas les données de vos clients pour entraîner des modèles d'IA. Nous ne les partageons pas à des fins marketing.

## 4. Sous-traitants et tiers

Nous faisons appel à un nombre restreint de prestataires pour faire fonctionner TrackBack :

| Prestataire | Finalité | Données concernées | Localisation |
|---|---|---|---|
| **Shopify Inc.** | Plateforme d'applications, authentification, facturation, données de commande | Tout ce que nous recevons transite par Shopify | Canada / UE / États-Unis |
| **Vercel Inc.** | Hébergement de l'application et de ce site, mesure d'audience du site | Données de l'application en transit, pages vues anonymes | UE / États-Unis |
| **Hébergeur de base de données** | Stockage de la base de données de l'application | Demandes de retour, réglages, messages de chat | UE / États-Unis |
| **Cloudinary** | Hébergement des logos et des photos de retour | Fichiers images | CDN mondial |
| **Prestataire d'envoi d'e-mails (SMTP)** | Envoi des e-mails transactionnels | E-mail et nom du destinataire, détails du retour | UE / États-Unis |
| **Meta Platforms (API Cloud WhatsApp)** | Notifications WhatsApp, uniquement si le marchand connecte WhatsApp (Pro) | Numéro de téléphone du client, contenu du message | Monde |
| **Discord** | Notification interne des messages que vous envoyez à notre support | Votre message, domaine de la boutique | États-Unis |

Nous tenons cette liste à jour et prévenons les marchands à l'avance avant d'ajouter un prestataire ayant accès aux données des clients.

## 5. Durée de conservation

| Données | Conservation |
|---|---|
| Demandes de retour, versements, photos et rétractations | Tant que l'application est installée, puis jusqu'à 90 jours après la désinstallation, sauf suppression anticipée via les webhooks ci-dessous |
| Conversations du chat | Idem |
| Logos téléversés | Tant que l'application est installée |
| Journaux HTTP et de débogage | 30 jours |
| Jetons de session Shopify | Jusqu'à la désinstallation ou l'expiration du jeton |
| Données de facturation | Selon les obligations comptables |

### Webhooks de conformité obligatoires de Shopify

Shopify nous impose de traiter trois webhooks qui donnent aux clients la maîtrise de leurs données :

- **`customers/data_request`** : un client demande une copie de ses données. Nous rassemblons ses demandes de retour, versements, photos et messages de chat et vous les transmettons (au marchand) sous 30 jours, pour que vous puissiez les lui communiquer.
- **`customers/redact`** : un client demande l'effacement. Nous supprimons définitivement ses données liées à votre boutique sous 30 jours.
- **`shop/redact`** : 48 heures après la désinstallation de l'application, Shopify déclenche ce webhook et nous supprimons définitivement toutes les données liées à votre boutique sous 30 jours.

Tous les webhooks sont vérifiés par signature HMAC.

## 6. Vos droits (RGPD, CCPA et lois similaires)

Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition au traitement de vos données personnelles, ainsi que du droit de retirer votre consentement à tout moment lorsque le traitement repose sur celui-ci.

Les clients doivent adresser ces demandes au marchand auprès duquel ils ont acheté, qui est responsable de ces données. Les marchands peuvent y répondre depuis Admin Shopify → Clients, ce qui déclenche les webhooks décrits ci-dessus.

Les marchands peuvent demander les données de leur propre compte directement à [bernadoecom@gmail.com](mailto:bernadoecom@gmail.com). Nous répondons sous 30 jours.

Si vous êtes dans l'UE ou l'EEE, vous pouvez aussi introduire une réclamation auprès de votre autorité de protection des données (en France, la CNIL).

## 7. Sécurité

- **Chiffrement en transit :** tout le trafic passe en HTTPS (TLS 1.2 ou supérieur)
- **Chiffrement au repos :** le stockage de la base de données est chiffré au niveau du disque
- **Sessions et webhooks signés :** les sessions du portail, les liens de suivi et les webhooks Shopify sont vérifiés par signature HMAC
- **Accès minimal :** les données de production ne sont consultées qu'en cas de stricte nécessité
- **Coordonnées masquées :** les numéros mobile money et bancaires sont masqués dans l'admin
- **Aucune donnée de carte :** les paiements et la facturation de l'application sont gérés par Shopify ; nous ne voyons jamais de numéro de carte
- **Maintenance régulière :** mises à jour des dépendances, détection de secrets et limitation de débit sur les points d'accès publics

Si nous découvrons une violation de données personnelles vous concernant, nous vous en informerons dans les 72 heures suivant sa découverte, conformément à l'article 33 du RGPD.

## 8. Transferts internationaux

Vos données peuvent être traitées dans l'UE, aux États-Unis ou au Canada selon le prestataire. Lorsque des données quittent l'UE ou l'EEE, nous nous appuyons sur les clauses contractuelles types de la Commission européenne ou sur une décision d'adéquation.

## 9. Cookies et traceurs

- **Application intégrée à l'admin Shopify :** uniquement les cookies de session fournis par Shopify pour l'authentification, et une entrée de stockage local qui mémorise votre thème clair ou sombre. Aucun cookie marketing ou de mesure d'audience.
- **Portail de retour client :** une seule entrée de stockage local (`tb_chat_…`) mémorise le nom et l'e-mail du client pour le chat, sur son propre appareil.
- **Ce site :** nous utilisons Vercel Web Analytics pour compter les pages vues et les clics sur les boutons principaux. Cet outil ne dépose aucun cookie, ne crée pas de profil personnel et ne suit pas les visiteurs d'un site à l'autre.

Nous n'utilisons jamais de cookies ni de stockage local à des fins publicitaires ou de suivi entre sites.

## 10. Protection des mineurs

TrackBack est un outil professionnel destiné aux marchands. Nous ne collectons pas sciemment de données concernant des enfants de moins de 16 ans. Si vous pensez que c'est le cas, contactez-nous et nous les supprimerons.

## 11. Modifications de cette politique

En cas de modification importante, nous mettrons à jour la date de « Dernière mise à jour » ci-dessus, publierons la nouvelle version sur cette page et en informerons les marchands actifs par e-mail avant son entrée en vigueur. Continuer à utiliser l'application après cette date vaut acceptation.

## 12. Contact

Pour toute question de confidentialité, demande relative aux données ou préoccupation de sécurité, écrivez à [bernadoecom@gmail.com](mailto:bernadoecom@gmail.com) avec l'objet « Demande de confidentialité — domaine de votre boutique ». Nous visons une réponse sous 48 heures et un traitement des demandes sous 30 jours.

TrackBack Returns est édité par Digital Mania.

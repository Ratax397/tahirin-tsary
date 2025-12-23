# Tahirin-tsary

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge&logo=vercel)](https://tahirin-tsary-z6y3.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

Mini‑projet de galerie d’articles/images avec authentification Google, publication d’articles, recherche, page détail et tableau de bord utilisateur.

## Fonctionnalités

- **Authentification Google** via NextAuth
- **Liste d’articles** (Firestore) avec **recherche** par mot‑clé
- **Détail** d’un article `articles/[articleId]` (image, description, lien externe)
- **Publication** d’un article via `articlebuilder` (upload **Cloudinary**)
- **Dashboard utilisateur** `dashboard/[userId]` (profil connecté)

## Stack

- **Next.js (App Router)**, React
- **Firebase Firestore** pour les données
- **NextAuth** (provider Google)
- **Cloudinary** pour l’upload d’images côté client
- **Tailwind CSS v4** pour le style

## Scripts

- `npm run dev` — développement
- `npm run build` — build
- `npm start` — production

## Prérequis

- Node.js 18+
- Comptes/services: **Google OAuth**, **Firebase (Firestore)**, **Cloudinary**

## Installation

1. Installer les dépendances:
   ```bash
   npm install
   ```
2. Créer `.env.local` à la racine:
   ```bash
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_random_secret
   NEXTAUTH_URL=http://localhost:3000

   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
   ```
3. Google OAuth: ajouter l’URI de redirection `http://localhost:3000/api/auth/callback/google`.
4. Firebase: config dans `app/db/firebaseConfig.js` (utiliser vos clés publiques du projet). Collections: `post`, `user`.
5. Cloudinary: créer un **upload preset non signé** pour les images.

## Lancer

```bash
npm run dev
# puis ouvrir http://localhost:3000
```

## Structure (extrait)

- `app/page.jsx` — liste + recherche (`useSearchParams`)
- `app/articles/[articleId]/page.jsx` — détail d’un article
- `app/articlebuilder/page.jsx` — formulaire `FormAdd` (upload + Firestore)
- `app/dashboard/[userId]/page.jsx` — profil `UserInfo`
- `app/api/auth/[...nextauth]/route.js` — NextAuth (Google)
- `app/Provider.jsx` — `SessionProvider` global
- `next.config.ts` — domaines images autorisés (Google, Firebase, Cloudinary)

## Données & Upload

- `post`: `title`, `desc`, `link`, `image`, `userName`, `userEmail`, `userImage`, `id`
- `user`: `userEmail`, `userName`, `userImage`
- Upload direct Cloudinary via `NEXT_PUBLIC_CLOUDINARY_*` (preset non signé)

## Déploiement (Vercel)

- Définir les variables `.env` côté Vercel (mêmes clés que local)
- `NEXTAUTH_URL` = URL de prod
- Ajouter l’URI OAuth Google de prod

## Notes

- Adapter les règles Firestore (lecture publique, écriture réservée aux utilisateurs authentifiés)
- `next.config.ts` configure `images.remotePatterns` pour `googleusercontent`, `firebasestorage`, `res.cloudinary`

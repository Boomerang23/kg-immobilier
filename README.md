# KG Immobilier

Site vitrine premium pour **KG Immobilier**, agent immobilier indépendant à Abidjan (Côte d'Ivoire). Présentation des biens, galerie photos, contact WhatsApp et administration sécurisée avec Supabase.

## Stack

- **React 19** + **Vite 8**
- **React Router** — navigation SPA
- **Tailwind CSS v4** — design premium
- **Supabase** — base de données, authentification, stockage images

## Prérequis

- Node.js 20+
- npm 10+
- Compte [Supabase](https://supabase.com) (gratuit)

## Installation locale

```bash
git clone <repo-url>
cd "KG Immo"
npm install
cp .env.example .env
```

Renseignez `.env` :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anon
```

```bash
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173).

> Sans variables Supabase, le site affiche les biens par défaut embarqués dans le code (mode fallback).

## Configuration Supabase

### 1. Créer le schéma

Dans **Supabase → SQL Editor**, exécutez le fichier :

```
supabase/schema.sql
```

Cela crée :
- `properties` — biens immobiliers
- `property_images` — galerie photos
- `admin_profiles` — comptes admin autorisés
- Bucket Storage `property-images` (lecture publique)
- Politiques RLS (lecture publique, écriture admin)

### 2. Créer un compte agent

1. **Authentication → Users → Add user** (email + mot de passe)
2. Copiez l'UUID de l'utilisateur
3. Exécutez dans SQL Editor :

```sql
insert into public.admin_profiles (id, email, full_name)
values ('UUID-DE-L-UTILISATEUR', 'agent@example.com', 'KG Immobilier');
```

### 3. Variables Vercel

Ajoutez sur Vercel (Settings → Environment Variables) :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Scripts

| Commande          | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Développement                  |
| `npm run build`   | Build production → `dist/`     |
| `npm run preview` | Prévisualiser le build         |
| `npm run lint`    | ESLint                         |

## Routes

| Route               | Description              |
|---------------------|--------------------------|
| `/`                 | Accueil                  |
| `/properties/:slug` | Fiche bien               |
| `/biens/:slug`      | Alias français           |
| `/admin/login`      | Connexion agent          |
| `/admin`            | Administration (protégé) |

## Administration

1. Aller sur `/admin/login`
2. Se connecter avec le compte agent enregistré dans `admin_profiles`
3. Gérer les biens : ajouter, modifier, supprimer
4. Téléverser couverture et galerie → stockées dans Supabase Storage
5. Les données sont synchronisées sur tous les appareils

Lien discret **Admin** dans le pied de page.

## Déploiement Vercel

1. Pousser sur GitHub
2. Importer sur [vercel.com](https://vercel.com)
3. Build : `npm run build` · Output : `dist`
4. Ajouter les variables d'environnement Supabase
5. `vercel.json` gère le routing SPA

## Structure

```
src/
├── components/       # UI, sections, admin
├── context/          # Auth + Properties providers
├── hooks/            # useAuth, useProperties
├── lib/              # Client Supabase
├── pages/            # Accueil, détail, admin, login
├── services/         # properties, images
└── utils/            # Helpers
supabase/
└── schema.sql        # Schéma SQL
public/images/        # Assets statiques (hero, etc.)
```

## Contact agent

- **WhatsApp :** +2250758734693
- **Ville :** Abidjan, Côte d'Ivoire

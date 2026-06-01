# KG Immobilier

Site vitrine premium pour **KG Immobilier**, agent immobilier indépendant à Abidjan (Côte d'Ivoire). Présentation des biens, galerie photos, contact WhatsApp et administration sécurisée avec Supabase.

## Stack

- **React 19** + **Vite 8**
- **React Router** — navigation SPA
- **Tailwind CSS v4** — design premium
- **Supabase** — base de données, authentification, stockage images, Edge Functions

## Prérequis

- Node.js 20+
- npm 10+
- Compte [Supabase](https://supabase.com) (gratuit)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (pour déployer l'Edge Function)

## Installation locale

```bash
git clone https://github.com/Boomerang23/kg-immobilier.git
cd kg-immobilier
npm install
cp .env.example .env
```

Renseignez `.env` :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anon
```

> Ne jamais exposer la clé `service_role` dans le frontend. Elle est utilisée uniquement côté Edge Function.

```bash
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173).

> Sans variables Supabase, le site affiche les biens par défaut embarqués dans le code (mode fallback).

## Configuration Supabase

### 1. Créer le schéma

**Nouveau projet** — exécutez dans **Supabase → SQL Editor** :

```
supabase/schema.sql
```

**Projet existant** — exécutez en plus la migration :

```
supabase/migrations/20260601000000_add_admin_roles.sql
```

Cela crée :

- `properties` — biens immobiliers
- `property_images` — galerie photos
- `admin_profiles` — comptes admin avec rôle (`admin` | `super_admin`)
- Bucket Storage `property-images` (lecture publique)
- Politiques RLS (lecture publique, écriture admin, gestion des profils par super_admin)

### 2. Créer le premier super_admin

1. **Authentication → Users → Add user**  
   Email : `angegbocho@gmail.com` + mot de passe sécurisé
2. Copiez l'UUID de l'utilisateur
3. Exécutez dans **SQL Editor** :

```sql
insert into public.admin_profiles (id, email, full_name, role)
values ('UUID-DE-L-UTILISATEUR', 'angegbocho@gmail.com', 'Ange Gbocho', 'super_admin');
```

Pour promouvoir un admin existant :

```sql
update public.admin_profiles
set role = 'super_admin', email = 'angegbocho@gmail.com'
where email = 'angegbocho@gmail.com';
```

### 3. Déployer les Edge Functions

Ces fonctions utilisent la clé `service_role` **uniquement côté serveur** :

| Fonction | Usage |
|----------|--------|
| `create-admin-user` | Créer un compte admin (super_admin) |
| `reset-admin-password` | Réinitialiser le MDP d'un admin (super_admin, en cas d'oubli) |

```bash
supabase login
supabase link --project-ref VOTRE_PROJECT_REF

supabase functions deploy create-admin-user
supabase functions deploy reset-admin-password
```

Variables automatiques : `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

### 4. Variables Vercel

Ajoutez sur Vercel (Settings → Environment Variables) :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Rôles administrateurs

| Rôle | Biens (CRUD + images) | Créer des admins | Gérer les rôles | `/admin/users` |
|------|------------------------|------------------|-----------------|----------------|
| `admin` | Oui | Non | Non | Accès refusé |
| `super_admin` | Oui | Oui (via Edge Function) | Oui | Oui |

Sécurité :

- Un admin lit uniquement son propre profil
- Un `super_admin` lit, modifie et supprime tous les profils
- Impossible de supprimer ou rétrogrer le **dernier** `super_admin` (trigger base de données)

## Scripts

| Commande          | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Développement                  |
| `npm run build`   | Build production → `dist/`     |
| `npm run preview` | Prévisualiser le build         |
| `npm run lint`    | ESLint                         |

## Routes

| Route               | Description                         |
|---------------------|-------------------------------------|
| `/`                 | Accueil                             |
| `/properties/:slug` | Fiche bien                          |
| `/biens/:slug`      | Alias français                      |
| `/admin/login`      | Connexion agent                     |
| `/admin`            | Gestion des biens (admin protégé)   |
| `/admin/account`    | Mot de passe personnel (tous admins)  |
| `/admin/users`      | Gestion des admins (super_admin)    |

## Administration

### Connexion

1. Aller sur `/admin/login`
2. Se connecter avec un compte présent dans `admin_profiles`

### Gestion des biens (`admin` et `super_admin`)

1. `/admin` — ajouter, modifier, supprimer des biens
2. Téléverser couverture et galerie → Supabase Storage
3. Données synchronisées sur tous les appareils

### Mots de passe

| Action | Qui | Comment |
|--------|-----|---------|
| **Changer son mot de passe** | Chaque admin | `/admin/account` |
| **Première connexion** | Super_admin | Mot de passe temporaire à la création du compte |
| **Réinitialisation (oubli)** | Super_admin uniquement | `/admin/users` → « Réinitialiser le MDP » (Edge Function) |

Le super_admin change **son** mot de passe via **Mon compte** (pas via la réinitialisation d'un autre compte).

### Gestion des administrateurs (`super_admin` uniquement)

1. `/admin/users` — liste des comptes
2. **+ Nouvel administrateur** — email, mot de passe temporaire (min. 8 car.), nom
3. **Réinitialiser le MDP** — en cas d'oubli (mot de passe temporaire à transmettre de façon sécurisée)
4. Changer le rôle : Administrateur ↔ Super administrateur
5. **Retirer l'accès** — supprime la ligne `admin_profiles`

Un administrateur classique qui ouvre `/admin/users` voit une page **Accès refusé**.

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
├── components/       # UI, sections, admin (AdminLayout, guards)
├── constants/        # Rôles admin
├── context/          # Auth + Properties providers
├── hooks/            # useAuth, useProperties
├── lib/              # Client Supabase
├── pages/            # Accueil, détail, admin, users, login
├── services/         # properties, images, admin
└── utils/            # Helpers
supabase/
├── schema.sql
├── migrations/
└── functions/
    ├── create-admin-user/
    └── reset-admin-password/
public/images/
```

## Contact agent

- **WhatsApp :** +2250758734693
- **Ville :** Abidjan, Côte d'Ivoire

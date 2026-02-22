# Site Web Yoyo'bar

Site vitrine moderne pour le Yoyo'bar avec gestion de contenu via Strapi CMS.

## Structure du projet

```
site-bar/
├── frontend/          # Application Next.js (site public)
├── backend/           # Strapi CMS (gestion du contenu)
├── GUIDE-ADMINISTRATION.md   # Guide pour le client
└── README.md          # Ce fichier
```

## Technologies utilisées

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Icônes

### Backend
- **Strapi 4** - CMS headless
- **SQLite** - Base de données (pour le développement)

## Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### 1. Installer le frontend

```bash
cd frontend
npm install
```

### 2. Installer le backend

```bash
cd backend
npm install
```

### 3. Configuration

#### Frontend
Créer le fichier `.env.local` dans le dossier `frontend/` :
```bash
cd frontend
# Windows
copy .env.local.example .env.local

# Mac/Linux
cp .env.local.example .env.local
```

Le fichier contient déjà les bonnes valeurs pour le développement :
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here
```

> **Note** : Le `STRAPI_API_TOKEN` est optionnel si vous configurez les permissions publiques dans Strapi.

#### Backend
Créer le fichier `.env` dans le dossier `backend/` si nécessaire :
```bash
cd backend
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Modifier les valeurs de sécurité dans `.env` si besoin (APP_KEYS, secrets, etc.)

## Démarrage

> ⚠️ **Important** : Le site utilise maintenant l'API Strapi pour afficher le contenu. Vous devez démarrer le backend Strapi ET le frontend pour voir le site fonctionner. Consultez le fichier `DEMARRAGE-RAPIDE.md` pour un guide détaillé.

### Mode développement

**Terminal 1 - Backend Strapi :**
```bash
cd backend
npm run develop
```
Le panneau admin sera disponible sur http://localhost:1337/admin

**Terminal 2 - Frontend Next.js :**
```bash
cd frontend
npm run dev
```
Le site sera disponible sur http://localhost:3000

### Première utilisation de Strapi

1. Lancez Strapi avec `npm run develop`
2. Accédez à http://localhost:1337/admin
3. Créez votre compte administrateur
4. Dans Settings > Users & Permissions > Roles > Public, autorisez :
   - ✅ cocktail: find, findOne
   - ✅ event: find, findOne
   - ✅ gallery-image: find, findOne
   - ✅ bar-info: find
5. Ajoutez du contenu (cocktails, événements, photos)
6. **Publiez** le contenu pour qu'il soit visible sur le site

## Production

### Build du frontend
```bash
cd frontend
npm run build
npm start
```

### Build de Strapi
```bash
cd backend
npm run build
npm start
```

## Content Types Strapi

| Type | Description |
|------|-------------|
| **Cocktail** | Nom, description, prix, catégorie, image |
| **Evenement** | Titre, date, description, image, à la une |
| **Image Galerie** | Image, légende, date |
| **Informations Bar** | Adresse, contact, réseaux sociaux |

## Pages du site

- **/** - Page d'accueil
- **/cocktails** - Liste des cocktails avec filtres
- **/evenements** - Événements à venir et passés
- **/galerie** - Galerie photos avec lightbox
- **/contact** - Informations de contact et carte

## Charte graphique

- **Couleur principale** : Rose pâle (#FFD6E0)
- **Couleur texte** : Gris foncé (#1F1F1F)
- **Fond** : Blanc (#FFFFFF)

## Licence

Projet privé - Tous droits réservés

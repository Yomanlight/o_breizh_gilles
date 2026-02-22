# 🚀 Guide de Démarrage Rapide - Yoyo'bar

## ✅ Ce qui a été fait

Votre site est **entièrement connecté à Strapi** ! Toutes les pages utilisent maintenant l'API Strapi pour afficher les données dynamiques :

- ✨ **Page d'accueil** : Cocktails et événements à la une
- 🍹 **Page cocktails** : Carte complète avec filtres par catégorie
- 📅 **Page événements** : Programmation avec filtres (à venir/passés)
- 📸 **Page galerie** : Photos avec lightbox

## 🎯 Étapes pour démarrer

### 1️⃣ Configuration du Frontend

Créez le fichier `.env.local` dans le dossier `frontend/` :

```bash
cd frontend
copy .env.local.example .env.local
```

Le fichier `.env.local` contient déjà les bonnes valeurs :
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here
```

> **Note** : Le `STRAPI_API_TOKEN` est optionnel en développement si vous configurez les permissions publiques dans Strapi.

### 2️⃣ Démarrer le Backend Strapi

**Terminal 1** - Dans le dossier `backend/` :

```bash
cd backend
npm install    # Si pas encore fait
npm run develop
```

✅ Le panneau admin sera disponible sur : **http://localhost:1337/admin**

### 3️⃣ Configuration initiale de Strapi

**Première utilisation uniquement :**

1. Accédez à http://localhost:1337/admin
2. Créez votre compte administrateur
3. Configurez les permissions publiques :
   - Allez dans **Settings** > **Users & Permissions** > **Roles** > **Public**
   - Activez les permissions suivantes :
     - ✅ `cocktail` : find, findOne
     - ✅ `event` : find, findOne
     - ✅ `gallery-image` : find, findOne
     - ✅ `bar-info` : find
   - Cliquez sur **Save**

### 4️⃣ Ajouter du contenu

Ajoutez quelques données de test dans Strapi :

#### Cocktails
1. Dans le menu, cliquez sur **Cocktail** > **Créer une nouvelle entrée**
2. Remplissez les champs (nom, description, prix, catégorie)
3. Ajoutez une image
4. **Enregistrer** puis **Publier**

#### Événements
1. Cliquez sur **Evenement** > **Créer une nouvelle entrée**
2. Ajoutez un titre, une date, une description
3. Cochez "A la une" si vous voulez le mettre en avant
4. **Enregistrer** puis **Publier**

#### Galerie
1. Cliquez sur **Image Galerie** > **Créer une nouvelle entrée**
2. Téléchargez une image et ajoutez une légende
3. **Enregistrer** puis **Publier**

### 5️⃣ Démarrer le Frontend

**Terminal 2** - Dans le dossier `frontend/` :

```bash
cd frontend
npm install    # Si pas encore fait
npm run dev
```

✅ Le site sera disponible sur : **http://localhost:3000**

## 🎨 Résultat

Votre site affichera maintenant les données que vous ajoutez dans Strapi en temps réel ! 

- Rechargez simplement la page du site après avoir ajouté du contenu dans Strapi
- Les changements sont instantanés
- Aucune modification de code nécessaire

## 📝 Important

### Structure des données Strapi

Les données sont maintenant récupérées depuis Strapi avec cette structure :

```typescript
// Cocktail
{
  id: number,
  attributes: {
    name: string,
    description: string,
    price: number,
    category: 'Cocktail' | 'Mocktail' | 'Biere' | 'Vin' | 'Soft',
    image: { data: { attributes: { url: string } } }
  }
}

// Événement
{
  id: number,
  attributes: {
    title: string,
    date: string (datetime),
    description: string,
    featured: boolean,
    image: { data: { attributes: { url: string } } }
  }
}

// Image de galerie
{
  id: number,
  attributes: {
    caption: string,
    date: string,
    image: { data: { attributes: { url: string } } }
  }
}
```

## 🔧 Dépannage

### Le site ne charge pas les données

1. **Vérifiez que Strapi est démarré** sur http://localhost:1337
2. **Vérifiez les permissions publiques** dans Strapi (voir étape 3)
3. **Vérifiez que le contenu est publié** (et pas en brouillon)
4. **Ouvrez la console du navigateur** (F12) pour voir les erreurs éventuelles

### Erreur CORS

Si vous voyez des erreurs CORS dans la console :
- Vérifiez que `NEXT_PUBLIC_STRAPI_URL` dans `.env.local` est correct
- Redémarrez les deux serveurs (backend et frontend)

### Les images ne s'affichent pas

1. Vérifiez que les images sont bien téléchargées dans Strapi
2. Vérifiez que le contenu est publié
3. Les images sont automatiquement gérées par la fonction `getStrapiImageUrl()`

## 📚 Documentation

- **Guide d'administration** : Consultez `GUIDE-ADMINISTRATION.md` pour savoir comment gérer le contenu
- **README principal** : Consultez `README.md` pour plus de détails techniques

## 🎉 Prochaines étapes

Maintenant que tout est connecté, vous pouvez :

1. ✨ Ajouter vos vrais cocktails, événements et photos
2. 🎨 Personnaliser le design si nécessaire
3. 🚀 Préparer le déploiement en production
4. 📱 Tester sur mobile et différents navigateurs

Bon développement ! 🍹

# ✅ Checklist d'intégration Strapi

## Ce qui a été modifié

### ✨ Frontend - Pages mises à jour

Toutes les pages utilisent maintenant l'API Strapi au lieu des données mockées :

- ✅ **`src/app/page.tsx`** - Page d'accueil
  - Charge les 3 premiers cocktails depuis Strapi
  - Charge les 3 prochains événements depuis Strapi
  - Affiche un état de chargement pendant la récupération des données

- ✅ **`src/app/cocktails/page.tsx`** - Page cocktails
  - Charge tous les cocktails depuis Strapi
  - Filtre par catégorie (Tous, Cocktail, Mocktail, Biere, Vin, Soft)
  - Gère les états de chargement et vide

- ✅ **`src/app/evenements/page.tsx`** - Page événements
  - Charge tous les événements depuis Strapi
  - Filtre par date (à venir, passés, tous)
  - Extrait l'heure depuis le champ datetime

- ✅ **`src/app/galerie/page.tsx`** - Page galerie
  - Charge toutes les images depuis Strapi
  - Lightbox fonctionnel avec navigation
  - Affiche les légendes

### 🔧 Fichiers techniques

- ✅ **`src/lib/strapi.ts`** - Déjà existant
  - Fonctions API : `getCocktails()`, `getEvents()`, `getGalleryImages()`, etc.
  - Helper : `getStrapiImageUrl()` pour gérer les URLs d'images
  - Types TypeScript pour tous les modèles

### 📝 Documentation créée

- ✅ **`DEMARRAGE-RAPIDE.md`** - Guide de démarrage complet
- ✅ **`CHECKLIST-INTEGRATION.md`** - Cette checklist
- ✅ **`README.md`** - Mis à jour avec les nouvelles instructions

## ⚙️ Configuration requise

### À faire MAINTENANT

1. **Créer le fichier `.env.local`** dans `frontend/` :
   ```bash
   cd frontend
   copy .env.local.example .env.local
   ```

2. **Vérifier les permissions Strapi** :
   - Démarrez Strapi : `cd backend && npm run develop`
   - Accédez à http://localhost:1337/admin
   - Allez dans Settings > Users & Permissions > Roles > Public
   - Activez les permissions pour :
     - cocktail: find, findOne
     - event: find, findOne
     - gallery-image: find, findOne
     - bar-info: find

3. **Ajouter du contenu de test** :
   - Au moins 1 cocktail
   - Au moins 1 événement
   - Au moins 1 image dans la galerie
   - N'oubliez pas de **Publier** chaque entrée !

## 🧪 Tests à effectuer

### Test 1 : Backend Strapi
```bash
cd backend
npm run develop
```
- [ ] Strapi démarre sans erreur
- [ ] http://localhost:1337/admin est accessible
- [ ] Vous pouvez vous connecter à l'admin
- [ ] Les content types sont visibles (Cocktail, Evenement, Image Galerie, Informations Bar)

### Test 2 : API Strapi
Testez l'API directement dans le navigateur :
- [ ] http://localhost:1337/api/cocktails?populate=image
- [ ] http://localhost:1337/api/events?populate=image
- [ ] http://localhost:1337/api/gallery-images?populate=image

Vous devriez voir du JSON avec vos données.

### Test 3 : Frontend Next.js
```bash
cd frontend
npm run dev
```
- [ ] Le frontend démarre sans erreur
- [ ] http://localhost:3000 est accessible
- [ ] La page d'accueil charge et affiche les cocktails
- [ ] La page d'accueil affiche les événements
- [ ] La page /cocktails affiche tous les cocktails
- [ ] Les filtres de catégories fonctionnent
- [ ] La page /evenements affiche les événements
- [ ] Les filtres de dates fonctionnent
- [ ] La page /galerie affiche les images
- [ ] Le lightbox fonctionne

### Test 4 : Console du navigateur
Ouvrez la console (F12) et vérifiez :
- [ ] Pas d'erreurs rouges
- [ ] Les appels API Strapi réussissent (200 OK)
- [ ] Les images se chargent correctement

## 🐛 Problèmes courants

### Les données ne s'affichent pas
1. Vérifiez que Strapi est démarré
2. Vérifiez que le contenu est **publié** (pas en brouillon)
3. Vérifiez les permissions publiques
4. Ouvrez la console du navigateur pour voir les erreurs

### Erreur 403 Forbidden
- Les permissions publiques ne sont pas configurées correctement
- Allez dans Settings > Users & Permissions > Roles > Public

### Erreur CORS
- Vérifiez que `NEXT_PUBLIC_STRAPI_URL` dans `.env.local` est correct
- Redémarrez les deux serveurs

### Images ne s'affichent pas
- Vérifiez que les images sont téléchargées dans Strapi
- Vérifiez que le contenu est publié
- La fonction `getStrapiImageUrl()` gère automatiquement les URLs

## 📚 Ressources

- **Guide utilisateur** : `GUIDE-ADMINISTRATION.md` - Pour gérer le contenu
- **Guide de démarrage** : `DEMARRAGE-RAPIDE.md` - Pour lancer le projet
- **Documentation Strapi** : https://docs.strapi.io/
- **Documentation Next.js** : https://nextjs.org/docs

## 🎉 Prochaines étapes

Une fois que tout fonctionne :

1. Supprimer les données mockées de `src/lib/strapi.ts` (lignes 145-234) si vous ne les utilisez plus
2. Ajouter vos vrais contenus dans Strapi
3. Personnaliser le design si besoin
4. Préparer le déploiement en production

---

**Statut de l'intégration : ✅ COMPLÈTE**

Toutes les pages sont connectées à Strapi et prêtes à l'emploi !

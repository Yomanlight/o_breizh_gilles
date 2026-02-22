# 🚀 Commandes à exécuter - Dans l'ordre

## ⚠️ IMPORTANT : 2 terminaux nécessaires

Vous aurez besoin de **2 terminaux ouverts en même temps** :
- Terminal 1 : Pour Strapi (backend)
- Terminal 2 : Pour Next.js (frontend)

---

## 📍 Terminal 1 : Backend Strapi

### 1. Aller dans le dossier backend
```powershell
cd c:\Users\beyod\Documents\site-bar\backend
```

### 2. Installer les dépendances (si pas encore fait)
```powershell
npm install
```
⏱️ **Durée** : 2-5 minutes

### 3. Démarrer Strapi
```powershell
npm run develop
```

✅ **Résultat attendu** : 
```
Project information
┌────────────────────────┬──────────────────────────┐
│ Time                   │ 1456 ms                   │
│ URL                    │ http://localhost:1337     │
│ Environment            │ development               │
│ Process PID            │ 12345                     │
└────────────────────────┴──────────────────────────┘

 One more thing...
 Create your first administrator 💻 by going to the administration panel at:

 ┌─────────────────────────────┐
 │ http://localhost:1337/admin │
 └─────────────────────────────┘
```

### 4. Configurer Strapi (PREMIÈRE FOIS SEULEMENT)

1. **Ouvrez votre navigateur** : http://localhost:1337/admin
2. **Créez votre compte admin** :
   - Prénom
   - Nom
   - Email
   - Mot de passe (notez-le bien !)

3. **Configurez les permissions publiques** :
   - Cliquez sur **Settings** (⚙️) dans la barre latérale
   - Allez dans **Users & Permissions plugin** > **Roles**
   - Cliquez sur **Public**
   - Dans l'onglet **Permissions**, dépliez chaque section et cochez :
     
     **Cocktail** :
     - ✅ find
     - ✅ findOne
     
     **Event** :
     - ✅ find
     - ✅ findOne
     
     **Gallery-image** :
     - ✅ find
     - ✅ findOne
     
     **Bar-info** :
     - ✅ find
   
   - Cliquez sur **Save** en haut à droite

4. **Ajoutez du contenu de test** :
   
   **Ajouter un cocktail** :
   - Dans le menu de gauche : **Content Manager** > **Cocktail**
   - Cliquez sur **+ Create new entry**
   - Remplissez :
     - Name : "Mojito"
     - Description : "Rhum, menthe, citron vert"
     - Price : 10
     - Category : Cocktail
     - Image : Téléchargez une image
   - Cliquez sur **Save**
   - **IMPORTANT** : Cliquez sur **Publish** !
   
   **Ajouter un événement** :
   - Dans le menu : **Content Manager** > **Evenement**
   - Cliquez sur **+ Create new entry**
   - Remplissez :
     - Title : "Soirée DJ"
     - Date : Choisissez une date future
     - Description : "Venez danser !"
     - Featured : Cochez si vous voulez le mettre en avant
     - Image : Téléchargez une image
   - **Save** puis **Publish** !
   
   **Ajouter une image galerie** :
   - Dans le menu : **Content Manager** > **Image Galerie**
   - Cliquez sur **+ Create new entry**
   - Téléchargez une image
   - Ajoutez une légende (optionnel)
   - **Save** puis **Publish** !

---

## 📍 Terminal 2 : Frontend Next.js

**⚠️ NE FERMEZ PAS le Terminal 1 ! Ouvrez un NOUVEAU terminal**

### 1. Aller dans le dossier frontend
```powershell
cd c:\Users\beyod\Documents\site-bar\frontend
```

### 2. Vérifier que .env.local existe
```powershell
dir .env.local
```
✅ Si le fichier existe, c'est bon !
❌ Si erreur, exécutez : `copy .env.local.example .env.local`

### 3. Installer les dépendances (si pas encore fait)
```powershell
npm install
```

### 4. Démarrer le frontend
```powershell
npm run dev
```

✅ **Résultat attendu** :
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.x:3000

 ✓ Ready in 2.3s
```

### 5. Ouvrir le site
Ouvrez votre navigateur : **http://localhost:3000**

---

## ✅ Vérification que tout fonctionne

### Dans votre navigateur :

1. **Page d'accueil** (http://localhost:3000)
   - Vous devriez voir les cocktails que vous avez ajoutés dans Strapi
   - Vous devriez voir les événements à venir

2. **Page cocktails** (http://localhost:3000/cocktails)
   - Tous vos cocktails sont affichés
   - Les filtres fonctionnent

3. **Page événements** (http://localhost:3000/evenements)
   - Vos événements sont affichés
   - Les filtres "à venir/passés" fonctionnent

4. **Page galerie** (http://localhost:3000/galerie)
   - Vos images sont affichées
   - Le lightbox fonctionne

### Console du navigateur (F12) :
- **Pas d'erreurs rouges**
- Les appels API retournent des données

---

## 🐛 Si ça ne marche pas

### Problème : "Chargement des cocktails..." qui ne se termine jamais

**Solution** :
1. Ouvrez la console du navigateur (F12)
2. Vérifiez les erreurs
3. Si vous voyez une erreur 403 : Les permissions publiques ne sont pas configurées
4. Si vous voyez une erreur CORS : Redémarrez les deux serveurs

### Problème : Les données ne s'affichent pas

**Checklist** :
- [ ] Strapi est démarré (Terminal 1 toujours ouvert)
- [ ] Le contenu est **publié** dans Strapi (pas en brouillon)
- [ ] Les permissions publiques sont activées
- [ ] Le fichier `.env.local` existe dans `frontend/`

### Problème : Images ne s'affichent pas

**Solutions** :
- Vérifiez que les images sont bien téléchargées dans Strapi
- Vérifiez que le contenu est publié
- Rechargez la page (Ctrl + F5)

---

## 🎉 C'est tout !

Vous avez maintenant :
- ✅ Un backend Strapi fonctionnel
- ✅ Un frontend Next.js connecté à Strapi
- ✅ La possibilité de modifier le contenu sans toucher au code

**Pour ajouter/modifier du contenu :**
1. Allez sur http://localhost:1337/admin
2. Modifiez ce que vous voulez
3. N'oubliez pas de **Publier**
4. Rechargez la page du site

**Les deux terminaux doivent rester ouverts pour que le site fonctionne !**

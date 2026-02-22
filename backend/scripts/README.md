# Scripts d'import pour Strapi

## Import de cocktails

Ce script permet d'importer automatiquement une liste de cocktails dans Strapi sans avoir à les saisir manuellement.

### Prérequis

1. **Strapi doit être lancé** : `npm run develop` dans le dossier `backend`
2. **Créer un token API** :
   - Connectez-vous à l'admin Strapi : http://localhost:1337/admin
   - Allez dans **Settings > API Tokens**
   - Cliquez sur **Create new API Token**
   - Donnez-lui un nom (ex: "Import Script")
   - Sélectionnez **Token type: Full access**
   - Cliquez sur **Save**
   - **Copiez le token** (vous ne pourrez plus le voir après)

### Utilisation

#### 1. Préparer votre liste de cocktails

Éditez le fichier `scripts/import-cocktails.js` et modifiez le tableau `cocktailsToImport` :

```javascript
const cocktailsToImport = [
  {
    name: "Nom du cocktail",
    description: "Description détaillée",
    price: 9.50,
    category: "Cocktail", // ou "Mocktail", "Biere", "Vin", "Soft"
    imagePath: path.join(__dirname, 'images', 'nom-image.jpg'), // Optionnel
  },
  // Ajoutez autant de cocktails que vous voulez...
];
```

#### 2. Lancer l'import

```bash
# Dans le dossier backend
STRAPI_API_TOKEN=votre_token_ici node scripts/import-cocktails.js
```

Ou sur Windows PowerShell :
```powershell
$env:STRAPI_API_TOKEN="votre_token_ici"; node scripts/import-cocktails.js
```

### Options avancées

#### Supprimer tous les cocktails avant l'import

Décommentez cette ligne dans le script :
```javascript
await deleteAllCocktails();
```

#### Ajouter des images

1. Créez un dossier `scripts/images/`
2. Placez vos images dedans
3. Référencez-les dans `imagePath` :
```javascript
imagePath: path.join(__dirname, 'images', 'mojito.jpg')
```

### Format des données

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `name` | string | ✅ Oui | Nom du cocktail |
| `description` | string | Non | Description détaillée |
| `price` | number | Non | Prix en euros |
| `category` | string | Non | "Cocktail", "Mocktail", "Biere", "Vin" ou "Soft" |
| `imagePath` | string | Non | Chemin vers l'image locale |

### Exemple complet

```javascript
const cocktailsToImport = [
  {
    name: "Mojito",
    description: "Rhum blanc, menthe fraîche, citron vert, sucre de canne et eau gazeuse",
    price: 9.50,
    category: "Cocktail",
  },
  {
    name: "Cosmopolitan",
    description: "Vodka, triple sec, jus de cranberry, citron vert",
    price: 11.00,
    category: "Cocktail",
  },
  {
    name: "Virgin Mojito",
    description: "Menthe fraîche, citron vert, sucre de canne et eau gazeuse",
    price: 7.50,
    category: "Mocktail",
  },
];
```

### Dépannage

**Erreur "STRAPI_API_TOKEN non définie"**
- Assurez-vous d'avoir créé un token API dans Strapi
- Vérifiez que vous passez bien le token en variable d'environnement

**Erreur 401 Unauthorized**
- Le token API est invalide ou expiré
- Créez un nouveau token dans Strapi

**Erreur 403 Forbidden**
- Le token n'a pas les bonnes permissions
- Créez un token avec "Full access"

**Erreur de connexion**
- Vérifiez que Strapi est bien lancé sur http://localhost:1337
- Vérifiez que l'URL dans le script correspond à votre configuration

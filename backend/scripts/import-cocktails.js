const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Si vous n'avez pas de token API, vous devrez en créer un dans Strapi:
// Settings > API Tokens > Create new API Token (avec les permissions Full access)

const axiosInstance = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
  },
});

/**
 * Importer une liste de cocktails dans Strapi
 * @param {Array} cocktails - Liste des cocktails à importer
 * 
 * Format attendu pour chaque cocktail:
 * {
 *   name: string (requis),
 *   description: string,
 *   price: number,
 *   category: "Cocktail" | "Mocktail" | "Biere" | "Vin" | "Soft",
 *   imagePath: string (chemin local vers l'image, optionnel)
 * }
 */
async function importCocktails(cocktails) {
  console.log(`🍹 Début de l'import de ${cocktails.length} cocktails...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const cocktail of cocktails) {
    try {
      console.log(`📝 Import de "${cocktail.name}"...`);

      // 1. Upload de l'image si fournie
      let imageId = null;
      if (cocktail.imagePath && fs.existsSync(cocktail.imagePath)) {
        try {
          const formData = new FormData();
          formData.append('files', fs.createReadStream(cocktail.imagePath));

          const uploadResponse = await axiosInstance.post('/api/upload', formData, {
            headers: formData.getHeaders(),
          });

          imageId = uploadResponse.data[0].id;
          console.log(`  ✅ Image uploadée (ID: ${imageId})`);
        } catch (uploadError) {
          console.log(`  ⚠️  Erreur upload image: ${uploadError.message}`);
        }
      }

      // 2. Création du cocktail
      const cocktailData = {
        data: {
          name: cocktail.name,
          description: cocktail.description || '',
          price: cocktail.price || null,
          category: cocktail.category || 'Cocktail',
          image: imageId,
          publishedAt: new Date().toISOString(), // Publier automatiquement
        },
      };

      await axiosInstance.post('/api/cocktails', cocktailData);
      console.log(`  ✅ Cocktail créé avec succès\n`);
      successCount++;

    } catch (error) {
      console.error(`  ❌ Erreur lors de l'import de "${cocktail.name}":`, error.response?.data || error.message);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Import terminé: ${successCount} succès, ${errorCount} erreurs`);
  console.log('='.repeat(50));
}

/**
 * Supprimer tous les cocktails existants (utile pour réinitialiser)
 */
async function deleteAllCocktails() {
  try {
    console.log('🗑️  Suppression de tous les cocktails existants...');
    
    const response = await axiosInstance.get('/api/cocktails?pagination[limit]=1000');
    const cocktails = response.data.data;

    for (const cocktail of cocktails) {
      await axiosInstance.delete(`/api/cocktails/${cocktail.id}`);
      console.log(`  ✅ Cocktail "${cocktail.attributes.name}" supprimé`);
    }

    console.log(`✅ ${cocktails.length} cocktails supprimés\n`);
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error.response?.data || error.message);
  }
}

// ============================================================================
// EXEMPLE D'UTILISATION
// ============================================================================

// Liste complète des boissons du bar
const cocktailsToImport = [
  // Bières bouteille
  { name: "Desperados", price: 4.50, category: "Biere" },
  { name: "Leffe Ruby", price: 3.00, category: "Biere" },
  { name: "1664", price: 3.00, category: "Biere" },
  { name: "Heineken", price: 3.00, category: "Biere" },
  { name: "Super Bock", price: 3.00, category: "Biere" },

  // Pression Leffe/Leburg/Hoegaarden
  { name: "Ballon", description: "Pression Leffe/Leburg/Hoegaarden", price: 2.00, category: "Biere" },
  { name: "Demi", description: "Pression Leffe/Leburg/Hoegaarden", price: 3.00, category: "Biere" },
  { name: "33cl", description: "Pression Leffe/Leburg/Hoegaarden", price: 4.50, category: "Biere" },
  { name: "Pinte", description: "Pression Leffe/Leburg/Hoegaarden", price: 6.00, category: "Biere" },
  { name: "Picon", description: "Supplément", price: 0.50, category: "Biere" },
  { name: "Sirop", description: "Supplément", price: 0.40, category: "Soft" },
  { name: "Twist", price: 3.20, category: "Biere" },
  { name: "Monaco", price: 3.50, category: "Biere" },
  { name: "Panaché", price: 2.80, category: "Biere" },

  // Vin
  { name: "Petit vin 10cl", price: 2.00, category: "Vin" },
  { name: "Moelleux", price: 3.50, category: "Vin" },
  { name: "Chardonnay", price: 3.00, category: "Vin" },
  { name: "Sauvignon", price: 2.50, category: "Vin" },
  { name: "Rosé", price: 3.00, category: "Vin" },
  { name: "Merlot", price: 3.00, category: "Vin" },
  { name: "Kir", price: 3.20, category: "Vin" },
  { name: "Kir pétillant", price: 3.20, category: "Vin" },
  { name: "Pétillant nature", price: 3.00, category: "Vin" },

  // Alcool
  { name: "Ricard", price: 2.80, category: "Cocktail" },
  { name: "Cognac", price: 5.50, category: "Cocktail" },
  { name: "Gin", price: 6.00, category: "Cocktail" },
  { name: "Get 27", price: 4.50, category: "Cocktail" },
  { name: "Chivas", price: 7.00, category: "Cocktail" },
  { name: "Vodka", price: 6.50, category: "Cocktail" },
  { name: "Clan Campbell", price: 6.50, category: "Cocktail" },
  { name: "Calvados", price: 4.00, category: "Cocktail" },
  { name: "Perroquet", price: 2.90, category: "Cocktail" },
  { name: "Martini", price: 4.00, category: "Cocktail" },
  { name: "Cidre", price: 3.00, category: "Cocktail" },
  { name: "Suze", price: 3.50, category: "Cocktail" },
  { name: "Havana", price: 6.50, category: "Cocktail" },
  { name: "Baileys", price: 4.00, category: "Cocktail" },
  { name: "Jack Daniel's", price: 6.50, category: "Cocktail" },
  { name: "Malibu", price: 4.50, category: "Cocktail" },
  { name: "Porto", price: 4.00, category: "Cocktail" },
  { name: "Cocktail", price: 7.00, category: "Cocktail" },
  { name: "Supplément Coca", description: "Supplément pour cocktail", price: 0.50, category: "Soft" },

  // Boissons chaudes
  { name: "Café", price: 1.50, category: "Soft" },
  { name: "Allongé", price: 1.70, category: "Soft" },
  { name: "Café crème", price: 1.80, category: "Soft" },
  { name: "Chocolat", price: 2.60, category: "Soft" },
  { name: "Grand chocolat", price: 3.60, category: "Soft" },
  { name: "Grand crème", price: 3.60, category: "Soft" },
  { name: "Thé", price: 2.60, category: "Soft" },
];

// Fonction principale
async function main() {
  // Vérifier si un token API est fourni
  if (!API_TOKEN) {
    console.error('❌ ERREUR: Variable d\'environnement STRAPI_API_TOKEN non définie');
    console.log('\n📝 Pour créer un token API:');
    console.log('1. Connectez-vous à Strapi: http://localhost:1337/admin');
    console.log('2. Allez dans Settings > API Tokens');
    console.log('3. Créez un nouveau token avec "Full access"');
    console.log('4. Copiez le token et exécutez:');
    console.log('   STRAPI_API_TOKEN=votre_token node scripts/import-cocktails.js\n');
    process.exit(1);
  }

  try {
    // Décommenter la ligne suivante pour supprimer tous les cocktails avant l'import
    // await deleteAllCocktails();

    await importCocktails(cocktailsToImport);
  } catch (error) {
    console.error('❌ Erreur fatale:', error.message);
    process.exit(1);
  }
}

// Exécuter le script
if (require.main === module) {
  main();
}

// Exporter les fonctions pour utilisation externe
module.exports = {
  importCocktails,
  deleteAllCocktails,
};

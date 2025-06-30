const { MongoClient } = require('mongodb');
const fs = require('fs');

async function exportData() {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  
  try {
    await client.connect();
    console.log('📊 Conectado a MongoDB local');
    
    const db = client.db('property_db');
    
    // Exportar usuarios
    const users = await db.collection('users').find({}).toArray();
    fs.writeFileSync('./data-export/users.json', JSON.stringify(users, null, 2));
    console.log(`✅ Exportados ${users.length} usuarios`);
    
    // Exportar productos
    const products = await db.collection('products').find({}).toArray();
    fs.writeFileSync('./data-export/products.json', JSON.stringify(products, null, 2));
    console.log(`✅ Exportados ${products.length} productos`);
    
    console.log('🎉 Exportación completa!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

// Crear directorio si no existe
if (!fs.existsSync('./data-export')) {
  fs.mkdirSync('./data-export');
}

exportData();

/**
 * Seed Neon PostgreSQL from local SQLite database
 * Run: node seed-from-sqlite.js
 */
require('dotenv').config();

const Database = require('better-sqlite3');
const path = require('path');
const { Client } = require('pg');

const sqlitePath = path.join(__dirname, 'prisma', 'dev.db');
const sqlite = new Database(sqlitePath, { readonly: true });

async function main() {
  const pg = new Client({ connectionString: process.env.DATABASE_URL });
  await pg.connect();
  console.log('Connected to Neon PostgreSQL');

  // Read all categories from SQLite
  const categories = sqlite.prepare('SELECT * FROM "Category"').all();
  console.log(`Found ${categories.length} categories in SQLite`);

  // Read all products from SQLite
  const products = sqlite.prepare('SELECT * FROM "Product"').all();
  console.log(`Found ${products.length} products in SQLite`);

  // Insert categories
  for (const cat of categories) {
    await pg.query(
      `INSERT INTO "Category" (id, name, slug, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO NOTHING`,
      [cat.id, cat.name, cat.slug, new Date(cat.createdAt), new Date(cat.updatedAt)]
    );
  }
  console.log(`✓ Inserted ${categories.length} categories`);

  // Insert products
  for (const prod of products) {
    await pg.query(
      `INSERT INTO "Product" (id, title, description, image, "categoryId", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO NOTHING`,
      [prod.id, prod.title, prod.description, prod.image, prod.categoryId, new Date(prod.createdAt), new Date(prod.updatedAt)]
    );
  }
  console.log(`✓ Inserted ${products.length} products`);

  await pg.end();
  sqlite.close();
  console.log('\nMigration complete!');
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});

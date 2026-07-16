const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const appDir = path.join(__dirname, 'src', 'app');

const categoriesMap = {
  "rope-hawsers": "Rope & Hawsers",
  "rigging-equipment": "Rigging Equipment & General Deck Items",
  "marine-paint": "Marine Paint",
  "painting-equipment": "Painting Equipment",
  "safety-protective-gear": "Safety Protective Gear",
  "safety-equipment": "Safety Equipment",
  "hose-couplings": "Hose & Couplings",
  "nautical-equipment": "Nautical Equipment",
  "medicine": "Medicine",
  "petroleum-products": "Petroleum Products",
  "stationery": "Stationery",
  "hardware": "Hardware",
  "brushes-mats": "Brushes & Mats",
  "lavatory-equipment": "Lavatory Equipment",
  "cleaning-material-chemicals": "Cleaning Material & Chemicals",
  "pneumatic-electrical-tools": "Pneumatic & Electrical Tools",
  "hand-tools": "Hand Tools",
  "cutting-tools": "Cutting Tools",
  "measuring-tools": "Measuring Tools",
  "metal-sheets-bars": "Metal Sheets, Bars, etc.",
  "screws-nuts": "Screws & Nuts",
  "pipes-tubes": "Pipes & Tubes",
  "pipe-tube-fittings": "Pipe & Tube Fittings",
  "valves-cocks": "Valves & Cocks",
  "bearings": "Bearings",
  "electrical-equipment": "Electrical Equipment",
  "packing-jointing": "Packing & Jointing",
  "welding-equipment": "Welding Equipment",
  "machinery-equipment": "Machinery Equipment",
  "welfare-items": "Welfare Items",
  "provisions-slop-chest": "Provisions & Slop Chest",
  "cloth-linen": "Cloth & Linen",
  "clothing": "Clothing",
  "tableware-galley": "Tableware & Galley Equipment"
};

async function main() {
  const dirs = fs.readdirSync(appDir).filter(dir => {
    const stat = fs.statSync(path.join(appDir, dir));
    return stat.isDirectory() && fs.existsSync(path.join(appDir, dir, 'page.tsx'));
  });

  console.log(`Found ${dirs.length} potential category directories.`);

  for (const dir of dirs) {
    if (dir === 'dashboard' || dir === 'api') continue;

    const categoryName = categoriesMap[dir] || dir;
    console.log(`Processing category: ${categoryName} (${dir})`);

    // Create or find category
    const category = await prisma.category.upsert({
      where: { slug: dir },
      update: {},
      create: {
        name: categoryName,
        slug: dir,
      }
    });

    const pagePath = path.join(appDir, dir, 'page.tsx');
    const content = fs.readFileSync(pagePath, 'utf8');

    // Extract products array using a simple regex
    const match = content.match(/const products = (\[[\s\S]*?\]);/);
    if (match && match[1]) {
      try {
        // Danger zone: evaluate the array
        const productsArrayStr = match[1];
        // replace any ts specific stuff if present, though usually it's just JS objects
        const productsData = (new Function(`return ${productsArrayStr}`))();
        
        console.log(`  Found ${productsData.length} products.`);
        for (const p of productsData) {
          await prisma.product.create({
            data: {
              title: p.title,
              description: p.description || null,
              image: p.image || null,
              categoryId: category.id
            }
          });
        }
      } catch (e) {
        console.error(`  Error parsing products for ${dir}:`, e.message);
      }
    } else {
      console.log(`  No products array found in ${dir}.`);
    }
  }

  console.log("Migration complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

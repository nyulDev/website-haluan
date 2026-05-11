const fs = require('fs');
const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/href="#([^"]+)"/g, (match, p1) => {
  const isOurPath = ["rope-hawsers", "rigging-equipment", "marine-paint", "painting-equipment", "safety-protective-gear", "safety-equipment", "hose-couplings", "nautical-equipment", "medicine", "petroleum-products", "stationery", "hardware", "brushes-mats", "lavatory-equipment", "cleaning-material-chemicals", "pneumatic-electrical-tools", "hand-tools", "cutting-tools", "measuring-tools", "metal-sheets-bars", "screws-nuts", "pipes-tubes", "pipe-tube-fittings", "valves-cocks", "bearings", "electrical-equipment", "packing-jointing", "welding-equipment", "machinery-equipment", "welfare-items", "provisions-slop-chest"].includes(p1);
  if (isOurPath) {
    return `href="/${p1}"`;
  }
  return match;
});
fs.writeFileSync(file, content);

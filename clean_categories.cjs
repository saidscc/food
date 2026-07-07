const fs = require('fs');
let code = fs.readFileSync('src/lib/foods.ts', 'utf-8');

// replace categories:
code = code.replace(/"student"/g, '');
code = code.replace(/"kids"/g, '');
code = code.replace(/"detox"/g, '');
code = code.replace(/"turkish"/g, '');

// clean up empty commas in categories array
code = code.replace(/,\s*,/g, ',');
code = code.replace(/\[\s*,/g, '[');
code = code.replace(/,\s*\]/g, ']');

fs.writeFileSync('src/lib/foods.ts', code);
console.log('Done cleaning categories');

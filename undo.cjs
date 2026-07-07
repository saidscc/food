const fs = require('fs');

let code = fs.readFileSync('src/lib/foods.ts', 'utf-8');

// Undo the bad insert in getIngredientsList:
code = code.replace(/return \[,\n[\s\S]+?\];/, 'return [];');

fs.writeFileSync('src/lib/foods.ts', code);
console.log('Undid bad insert in getIngredientsList');

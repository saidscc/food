const fs = require('fs');
const path = require('path');

let code = fs.readFileSync('src/lib/foods.ts', 'utf-8');

const imageUpdates = {
  "grilled-steak": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
  "sushi-platter": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
  "uzbek-plov": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
  "grilled-chicken": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
  "grilled-salmon": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
  "qora-non": "https://images.unsplash.com/photo-1589367920969-ab8e050bfbb8?w=800&q=80",
  "garlic-bread": "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800&q=80",
  "water-still": "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&q=80",
  "green-tea-lemon": "https://images.unsplash.com/photo-1627492275512-4043fb94f1c5?w=800&q=80",
  "fresh-orange-juice": "https://images.unsplash.com/photo-1600271886742-f049cd451b51?w=800&q=80",
  "protein-shake": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80",
  "achchiq-chuchuk": "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&q=80",
  "spring-salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  "uzbek-manti": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
  "uzbek-lagman": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80",
  "uzbek-samsa": "https://images.unsplash.com/photo-1600289031464-74d374b64991?w=800&q=80",
  "adana-kebab": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
  "doner-kebab": "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80",
  "turkish-menemen": "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
  "boiled-eggs": "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=800&q=80",
  "scrambled-eggs": "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=800&q=80",
  "omelette-veggie": "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80",
  "green-salad": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
  "avocado-toast": "https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=800&q=80",
  "lentil-soup": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
};

const pairings = {
  "grilled-steak": { salad: "achchiq-chuchuk", side: "garlic-bread" },
  "grilled-chicken": { salad: "spring-salad", side: "qora-non" },
  "grilled-salmon": { salad: "spring-salad", side: "avocado-toast" },
  "uzbek-plov": { salad: "achchiq-chuchuk", side: "qora-non" },
  "uzbek-manti": { salad: "spring-salad", side: "green-tea-lemon" },
  "uzbek-lagman": { salad: "achchiq-chuchuk", side: "qora-non" },
  "uzbek-samsa": { salad: "achchiq-chuchuk", side: "green-tea-lemon" },
  "adana-kebab": { salad: "achchiq-chuchuk", side: "qora-non" },
  "doner-kebab": { salad: "spring-salad", side: "garlic-bread" },
  "turkish-menemen": { salad: "spring-salad", side: "qora-non" },
  "boiled-eggs": { salad: "spring-salad", side: "qora-non" },
  "scrambled-eggs": { salad: "spring-salad", side: "avocado-toast" },
  "omelette-veggie": { salad: "spring-salad", side: "qora-non" },
};

// Replace images
Object.keys(imageUpdates).forEach(id => {
  const url = imageUpdates[id];
  const regex = new RegExp('(id:\\s*"' + id + '"[\\s\\S]*?image:\\s*)([a-zA-Z]+|"[^"]+")', 'g');
  code = code.replace(regex, '$1"' + url + '"');
});

// Replace pairings
Object.keys(pairings).forEach(id => {
  const pair = pairings[id];
  const pairString = 'recommendedSaladId: "' + pair.salad + '", recommendedSideId: "' + pair.side + '",';
  
  const regex = new RegExp('(id:\\s*"' + id + '",)', 'g');
  code = code.replace(regex, '$1\\n    ' + pairString);
});

fs.writeFileSync('src/lib/foods.ts', code);
console.log('Successfully updated foods.ts');

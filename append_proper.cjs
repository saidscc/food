const fs = require('fs');

const newFoodsString = `
  // ─── SALATLAR ────────────────────────────────────────────────────────────
  {
    id: "achchiq-chuchuk",
    image: saladImg,
    categories: ["salads", "healthy", "vegetarian"],
    name: { uz: "Achchiq-chuchuk", ru: "Ачичук", en: "Achichuk Salad" },
    short: { uz: "Palov uchun ideal pomidorli salat", ru: "Идеальный томатный салат для плова", en: "Ideal tomato salad for plov" },
    calories: 45, protein: 1, fat: 0, carbs: 10, prepTime: 5, price: 1, healthScore: 95, rating: 4.9,
    vitamins: ["C", "A", "K"], minerals: ["Kaliy", "Lykopen"],
    description: {
      uz: "An'anaviy o'zbek salati — faqat pomidor, piyoz va rayhon. Yog' qo'shilmaydi. Ayniqsa yog'li ovqatlar (palov, shashlik) bilan yeyish ovqat hazm bo'lishini 30% ga osonlashtiradi.",
      ru: "Традиционный узбекский салат — только помидоры, лук и базилик. Без масла. Идеально расщепляет жиры плова или шашлыка.",
      en: "Traditional Uzbek salad — just tomatoes, onions and basil. No oil. Perfectly breaks down fats from plov or kebab."
    },
    benefits: {
      uz: ["Ovqat hazmini yengillashtiradi", "Yog'larni parchalaydi", "Qon bosimini tushiradi"],
      ru: ["Облегчает пищеварение", "Расщепляет жиры", "Снижает давление"],
      en: ["Aids digestion", "Breaks down fats", "Lowers blood pressure"]
    },
    forWhom: { uz: "Hamma, parhez tutganlar", ru: "Все, худеющие", en: "Everyone, dieters" },
    notForWhom: { uz: "Oshqozon yarasi borlar", ru: "Язва желудка", en: "Stomach ulcers" },
    whenEat: { uz: "Asosiy ovqat bilan", ru: "С основным блюдом", en: "With main course" },
    dailyRec: { uz: "Asosiy ovqat bilan", ru: "С основным блюдом", en: "With main course" },
    storage: { uz: "Yangi tayyorlanganda", ru: "Свежеприготовленным", en: "Freshly made" },
    ingredients: { uz: ["Pomidor", "Piyoz", "Rayhon", "Tuz", "Qora murch"], ru: ["Помидор", "Лук", "Базилик", "Соль", "Черный перец"], en: ["Tomato", "Onion", "Basil", "Salt", "Black pepper"] },
    recipe: { uz: ["Pomidorni juda yupqa kesing", "Piyozni halqa qilib to'g'rang", "Tuz va murch seping", "Aralashtiring"], ru: ["Нарежьте помидоры очень тонко", "Лук кольцами", "Посолите и поперчите", "Перемешайте"], en: ["Slice tomatoes very thin", "Slice onions in rings", "Salt and pepper", "Mix well"] },
    prepMethod: { uz: "Xom, yog'siz", ru: "Сырой, без масла", en: "Raw, no oil" },
  },
  {
    id: "spring-salad",
    image: saladImg,
    categories: ["salads", "healthy", "vegetarian", "fast"],
    name: { uz: "Bahor salati", ru: "Весенний салат", en: "Spring Salad" },
    short: { uz: "Yengil bodring va ko'katli salat", ru: "Легкий салат с огурцом и зеленью", en: "Light cucumber and greens salad" },
    calories: 60, protein: 2, fat: 3, carbs: 5, prepTime: 10, price: 1, healthScore: 98, rating: 4.8,
    vitamins: ["C", "K"], minerals: ["Kaliy", "Magniy"],
    description: {
      uz: "Bodring, rediska va ko'katlardan tashkil topgan vitaminli bomba. Go'shtli taomlar bilan ajoyib mos keladi.",
      ru: "Витаминная бомба из огурцов, редиса и зелени. Отлично сочетается с мясными блюдами.",
      en: "Vitamin bomb of cucumbers, radishes and greens. Pairs perfectly with meat dishes."
    },
    benefits: {
      uz: ["Tetiklashtiradi", "Immunitetni oshiradi", "Teri uchun foydali"],
      ru: ["Освежает", "Повышает иммунитет", "Полезно для кожи"],
      en: ["Refreshing", "Boosts immunity", "Good for skin"]
    },
    forWhom: { uz: "Hamma", ru: "Все", en: "Everyone" },
    notForWhom: { uz: "Yo'q", ru: "Нет", en: "None" },
    whenEat: { uz: "Tushlik va kechki ovqat", ru: "Обед и ужин", en: "Lunch and dinner" },
    dailyRec: { uz: "Xohishga ko'ra", ru: "По желанию", en: "As desired" },
    storage: { uz: "Muzlatgichda 1 kun", ru: "В холодильнике 1 день", en: "1 day in fridge" },
    ingredients: { uz: ["Bodring", "Rediska", "Ko'katlar", "Limon suvi"], ru: ["Огурец", "Редис", "Зелень", "Лимонный сок"], en: ["Cucumber", "Radish", "Greens", "Lemon juice"] },
    recipe: { uz: ["To'g'rang", "Aralashtiring"], ru: ["Нарежьте", "Перемешайте"], en: ["Chop", "Mix"] },
    prepMethod: { uz: "Xom", ru: "Сырой", en: "Raw" },
  },
  // ─── QO'SHIMCHALAR (SIDES & BREAD) ──────────────────────────────────────────
  {
    id: "qora-non",
    image: wrapImg,
    categories: ["sides", "healthy", "vegetarian"],
    name: { uz: "Qora non", ru: "Черный хлеб", en: "Black Bread" },
    short: { uz: "Javdar unidan foydali non", ru: "Полезный хлеб из ржаной муки", en: "Healthy rye bread" },
    calories: 220, protein: 7, fat: 1, carbs: 45, prepTime: 0, price: 1, healthScore: 85, rating: 4.7,
    vitamins: ["B1", "B2", "E"], minerals: ["Temir", "Magniy"],
    description: {
      uz: "Javdar unidan tayyorlangan an'anaviy qora non. Oq nonga nisbatan glikemik indeksi past, to'qlik hissini uzoqroq ushlab turadi. Sho'rva va suyuq ovqatlar bilan ideal.",
      ru: "Традиционный черный хлеб из ржаной муки. Гликемический индекс ниже, чем у белого хлеба, дольше сохраняет чувство сытости. Идеален для супов.",
      en: "Traditional rye black bread. Lower glycemic index than white bread, keeps you full longer. Ideal with soups."
    },
    benefits: {
      uz: ["Sekin uglevodlar", "Ichak faoliyatiga yordam", "Qonda shakarni keskin oshirmaydi"],
      ru: ["Медленные углеводы", "Помощь кишечнику", "Не повышает резко сахар в крови"],
      en: ["Slow carbs", "Bowel aid", "Does not spike blood sugar"]
    },
    forWhom: { uz: "Hamma, qandli diabeti borlar", ru: "Все, диабетики", en: "Everyone, diabetics" },
    notForWhom: { uz: "Glyutenga chidamsizlar", ru: "Непереносимость глютена", en: "Gluten intolerance" },
    whenEat: { uz: "Sho'rva va suyuq taomlar bilan", ru: "С супами и жидкими блюдами", en: "With soups and stews" },
    dailyRec: { uz: "1-2 bo'lak", ru: "1-2 кусочка", en: "1-2 slices" },
    storage: { uz: "Xona haroratida 3 kun", ru: "При комнатной температуре 3 дня", en: "3 days at room temp" },
    ingredients: { uz: ["Javdar uni", "Suv", "Xamirturush", "Tuz"], ru: ["Ржаная мука", "Вода", "Дрожжи", "Соль"], en: ["Rye flour", "Water", "Yeast", "Salt"] },
    recipe: { uz: ["Tayyor holda beriladi"], ru: ["Подается готовым"], en: ["Served ready"] },
  },
  {
    id: "garlic-bread",
    image: wrapImg,
    categories: ["sides", "fast"],
    name: { uz: "Sarimsoqli non", ru: "Чесночный хлеб", en: "Garlic Bread" },
    short: { uz: "Xushbo'y qovurilgan non", ru: "Ароматный жареный хлеб", en: "Fragrant toasted bread" },
    calories: 280, protein: 6, fat: 12, carbs: 36, prepTime: 5, price: 1, healthScore: 70, rating: 4.8,
    vitamins: ["B1"], minerals: ["Natriy", "Kaltsiy"],
    description: {
      uz: "Tandirda qizdirilgan, sariyog' va sarimsoq surtilgan non. Krem-sho'rvalar va italyan taomlari (masalan pasta) uchun ajoyib qo'shimcha.",
      ru: "Хлеб, подогретый в духовке, с чесноком и сливочным маслом. Отличное дополнение к крем-супам и итальянским блюдам.",
      en: "Toasted bread with garlic and butter. Great addition to cream soups and Italian dishes."
    },
    benefits: {
      uz: ["Tez energiya", "Ishtaha ochar", "Immunitet (sarimsoq)"],
      ru: ["Быстрая энергия", "Вызывает аппетит", "Иммунитет (чеснок)"],
      en: ["Quick energy", "Appetizing", "Immunity (garlic)"]
    },
    forWhom: { uz: "Hamma", ru: "Все", en: "Everyone" },
    notForWhom: { uz: "Oshqozon yarasi", ru: "Язва желудка", en: "Stomach ulcer" },
    whenEat: { uz: "Tushlik va kechki ovqat", ru: "Обед и ужин", en: "Lunch and dinner" },
    dailyRec: { uz: "1-2 bo'lak", ru: "1-2 кусочка", en: "1-2 slices" },
    storage: { uz: "Issiq holda", ru: "В горячем виде", en: "Served hot" },
    ingredients: { uz: ["Non", "Sariyog'", "Sarimsoq", "Ko'kat"], ru: ["Хлеб", "Сливочное масло", "Чеснок", "Зелень"], en: ["Bread", "Butter", "Garlic", "Greens"] },
    recipe: { uz: ["Nonga sariyog' va sarimsoq surting", "Duxovkada qizartiring"], ru: ["Намажьте хлеб маслом и чесноком", "Подрумяньте в духовке"], en: ["Spread butter and garlic on bread", "Toast in oven"] },
    prepMethod: { uz: "Duxovkada pishirilgan", ru: "Запеченный в духовке", en: "Oven baked" },
  },
  // ─── ICHIMLIKLAR (DRINKS) ──────────────────────────────────────────────────
  {
    id: "water-still",
    image: smoothieImg,
    categories: ["drinks", "healthy", "sport"],
    name: { uz: "Oddiy suv", ru: "Вода без газа", en: "Still Water" },
    short: { uz: "Eng foydali va zarur ichimlik", ru: "Самый полезный и нужный напиток", en: "Most essential and healthy drink" },
    calories: 0, protein: 0, fat: 0, carbs: 0, prepTime: 0, price: 1, healthScore: 100, rating: 5.0,
    vitamins: [], minerals: ["Kaltsiy", "Magniy"],
    description: {
      uz: "Inson tanasining 60% qismi suvdan iborat. Oddiy gazlanmagan suv — chanqoqni bosuvchi va organizmni tozalovchi eng mukammal suyuqlik. Ovqatdan 30 daqiqa oldin ichish hazmni yaxshilaydi.",
      ru: "Тело человека на 60% состоит из воды. Обычная вода без газа — идеальная жидкость для утоления жажды и очищения организма.",
      en: "The human body is 60% water. Regular still water is the perfect liquid to quench thirst and cleanse the body."
    },
    benefits: {
      uz: ["Moddalar almashinuvini tezlashtiradi", "Terini tozalaydi", "Bosh og'rig'ini qoldiradi", "Toksinlarni chiqaradi"],
      ru: ["Ускоряет метаболизм", "Очищает кожу", "Снимает головную боль", "Выводит токсины"],
      en: ["Boosts metabolism", "Clears skin", "Relieves headaches", "Flushes toxins"]
    },
    healthBenefitsInfo: {
      uz: "Ertalab och qoringa 1 stakan suv ichish ichaklarni uyg'otadi va qon aylanashini yaxshilaydi.",
      ru: "Стакан воды натощак утром будит кишечник и улучшает кровообращение.",
      en: "Drinking a glass of water on an empty stomach in the morning wakes up the intestines and improves blood circulation."
    },
    forWhom: { uz: "Hamma uchun", ru: "Для всех", en: "For everyone" },
    notForWhom: { uz: "Yo'q", ru: "Нет", en: "None" },
    whenEat: { uz: "Kun bo'yi", ru: "Весь день", en: "All day" },
    dailyRec: { uz: "Kuniga 2-3 litr", ru: "2-3 литра в день", en: "2-3 liters per day" },
    storage: { uz: "Xona haroratida", ru: "При комнатной температуре", en: "Room temperature" },
    ingredients: { uz: ["Toza ichimlik suvi"], ru: ["Чистая питьевая вода"], en: ["Clean drinking water"] },
    recipe: { uz: ["Shishadan stakanga quying"], ru: ["Налейте из бутылки в стакан"], en: ["Pour from bottle to glass"] },
  },
  {
    id: "green-tea-lemon",
    image: smoothieImg,
    categories: ["drinks", "healthy", "weightloss"],
    name: { uz: "Limonli ko'k choy", ru: "Зеленый чай с лимоном", en: "Green Tea with Lemon" },
    short: { uz: "Antioksidantlarga boy yog' erituvchi choy", ru: "Богатый антиоксидантами жиросжигающий чай", en: "Antioxidant-rich fat-burning tea" },
    calories: 2, protein: 0, fat: 0, carbs: 0, prepTime: 5, price: 1, healthScore: 99, rating: 4.9,
    vitamins: ["C"], minerals: ["Kaliy"],
    description: {
      uz: "Ko'k choy kuchli antioksidant bo'lib, metabolizmni tezlashtiradi. Limon qo'shilishi C vitaminini oshiradi va temir so'rilishini yaxshilaydi. Ovqatdan so'ng ichish hazm jarayonini osonlashtiradi.",
      ru: "Зеленый чай — мощный антиоксидант, ускоряющий метаболизм. Лимон добавляет витамин С. Питье после еды облегчает пищеварение.",
      en: "Green tea is a powerful antioxidant that speeds up metabolism. Lemon adds Vitamin C. Drinking after a meal aids digestion."
    },
    benefits: {
      uz: ["Yog' parchalanishini tezlashtiradi", "Immunitetni oshiradi", "Asabni tinchlantiradi"],
      ru: ["Ускоряет расщепление жиров", "Повышает иммунитет", "Успокаивает нервы"],
      en: ["Speeds up fat breakdown", "Boosts immunity", "Calms nerves"]
    },
    healthBenefitsInfo: {
      uz: "Yashil choydagi katexinlar qorin qismidagi yog'larni eritishda ilmiy tasdiqlangan ta'sirga ega.",
      ru: "Катехины в зеленом чае имеют научно доказанный эффект сжигания жира на животе.",
      en: "Catechins in green tea have a scientifically proven effect on burning belly fat."
    },
    forWhom: { uz: "Ozishni istaganlar", ru: "Желающие похудеть", en: "Those looking to lose weight" },
    notForWhom: { uz: "Qon bosimi past bo'lganlar", ru: "Люди с низким давлением", en: "People with low blood pressure" },
    whenEat: { uz: "Ertalab yoki ovqatdan so'ng", ru: "Утром или после еды", en: "Morning or after meals" },
    dailyRec: { uz: "Kuniga 2-3 stakan", ru: "2-3 стакана в день", en: "2-3 cups per day" },
    storage: { uz: "Yangi damlangan holda", ru: "Свежезаваренным", en: "Freshly brewed" },
    ingredients: { uz: ["Ko'k choy", "Qaynoq suv", "Limon", "Asal (ixtiyoriy)"], ru: ["Зеленый чай", "Кипяток", "Лимон", "Мёд (по желанию)"], en: ["Green tea", "Boiling water", "Lemon", "Honey (optional)"] },
    recipe: { uz: ["Choyni 80°C suvda damlang", "3 daqiqa kuting", "Limon bo'lagi qo'shing"], ru: ["Заварите чай водой 80°C", "Подождите 3 минуты", "Добавьте дольку лимона"], en: ["Brew tea in 80°C water", "Wait 3 minutes", "Add lemon slice"] },
  },
  {
    id: "protein-shake",
    image: smoothieImg,
    categories: ["drinks", "protein", "sport", "weightgain"],
    name: { uz: "Oqsil kokteyli", ru: "Протеиновый коктейль", en: "Protein Shake" },
    short: { uz: "Sportchilar uchun kuch-quvvat", ru: "Сила для спортсменов", en: "Power for athletes" },
    calories: 210, protein: 25, fat: 3, carbs: 18, prepTime: 2, price: 2, healthScore: 88, rating: 4.8,
    vitamins: ["B12", "D"], minerals: ["Kaltsiy", "Magniy"],
    description: {
      uz: "Mashg'ulotdan so'ng mushaklarni tez tiklash uchun ideal ichimlik. Sut va zardob oqsili yordamida tayyorlanadi.",
      ru: "Идеальный напиток для быстрого восстановления мышц после тренировки. Готовится на основе молока и сывороточного протеина.",
      en: "Ideal drink for quick muscle recovery after a workout. Made with milk and whey protein."
    },
    benefits: {
      uz: ["Mushaklarni o'stiradi", "Tez tiklaydi", "To'qlik hissi beradi"],
      ru: ["Растит мышцы", "Быстро восстанавливает", "Дает чувство сытости"],
      en: ["Grows muscles", "Recovers quickly", "Provides satiety"]
    },
    healthBenefitsInfo: {
      uz: "Mashg'ulotdan keyingi 30 daqiqa ichida iste'mol qilinsa, mushaklar proteinni eng maksimal darajada o'zlashtiradi.",
      ru: "При употреблении в течение 30 минут после тренировки мышцы максимально усваивают протеин.",
      en: "Consumed within 30 minutes post-workout, muscles absorb protein maximally."
    },
    forWhom: { uz: "Sportchilar", ru: "Спортсмены", en: "Athletes" },
    notForWhom: { uz: "Laktoza allergiyasi (sut bilan)", ru: "Аллергия на лактозу (с молоком)", en: "Lactose allergy (with milk)" },
    whenEat: { uz: "Mashg'ulotdan keyin", ru: "После тренировки", en: "Post-workout" },
    dailyRec: { uz: "Kuniga 1-2 stakan", ru: "1-2 стакана в день", en: "1-2 cups per day" },
    storage: { uz: "Yangi tayyorlanganda", ru: "Свежеприготовленным", en: "Freshly made" },
    ingredients: { uz: ["Oqsil kukuni", "Sut yoki suv", "Banan"], ru: ["Протеиновый порошок", "Молоко или вода", "Банан"], en: ["Protein powder", "Milk or water", "Banana"] },
    recipe: { uz: ["Barchasini blenderda aralashtiring"], ru: ["Смешайте все в блендере"], en: ["Blend everything together"] },
  },
  {
    id: "fresh-orange-juice",
    image: smoothieImg,
    categories: ["drinks", "healthy", "breakfast"],
    name: { uz: "Apelsin sharbati", ru: "Апельсиновый фреш", en: "Fresh Orange Juice" },
    short: { uz: "Vitamin C ga boy energiya manbai", ru: "Источник энергии, богатый витамином С", en: "Vitamin C rich energy source" },
    calories: 110, protein: 2, fat: 0, carbs: 26, prepTime: 5, price: 2, healthScore: 90, rating: 4.8,
    vitamins: ["C", "B1", "B9"], minerals: ["Kaliy", "Kaltsiy"],
    description: {
      uz: "Yangi siqilgan apelsin sharbati — kunni boshlash uchun klassik ichimlik. Immun tizimini ko'taradi va organizmni uyg'otadi.",
      ru: "Свежевыжатый апельсиновый сок — классический напиток для начала дня. Поднимает иммунитет и будит организм.",
      en: "Freshly squeezed orange juice — a classic drink to start the day. Boosts the immune system and wakes up the body."
    },
    benefits: {
      uz: ["Immunitetni ko'taradi", "Tetiklashtiradi", "Terini yoshartiradi"],
      ru: ["Повышает иммунитет", "Освежает", "Омолаживает кожу"],
      en: ["Boosts immunity", "Refreshes", "Rejuvenates skin"]
    },
    healthBenefitsInfo: {
      uz: "Sharbatni och qoringa emas, ovqatdan keyin ichish tavsiya etiladi (oshqozon kislotasini oshirmaslik uchun).",
      ru: "Рекомендуется пить сок после еды, а не натощак (чтобы не повышать кислотность желудка).",
      en: "It is recommended to drink juice after a meal, not on an empty stomach (to avoid increasing stomach acidity)."
    },
    forWhom: { uz: "Hamma", ru: "Все", en: "Everyone" },
    notForWhom: { uz: "Oshqozon kislotasi yuqori bo'lganlar", ru: "Люди с повышенной кислотностью желудка", en: "People with high stomach acidity" },
    whenEat: { uz: "Ertalab (ovqatdan keyin)", ru: "Утром (после еды)", en: "Morning (after food)" },
    dailyRec: { uz: "Kuniga 1 stakan", ru: "1 стакан в день", en: "1 glass per day" },
    storage: { uz: "Tayyorlangach 15 daqiqa ichida", ru: "В течение 15 минут после приготовления", en: "Within 15 mins of making" },
    ingredients: { uz: ["Apelsin 2 dona"], ru: ["Апельсин 2 шт."], en: ["Orange x2"] },
    recipe: { uz: ["Apelsinlarni sharbat siqqichda siqing"], ru: ["Выжмите апельсины в соковыжималке"], en: ["Squeeze oranges in juicer"] },
  }
`;

let code = fs.readFileSync('src/lib/foods.ts', 'utf-8');

// Replace the array end string with array end + new foods + array end
const targetEnd = `    }
  ];
  
  // Load from localStorage`;

const replacement = `    },
` + newFoodsString + `
  ];
  
  // Load from localStorage`;

code = code.replace(targetEnd, replacement);

// We still want to add recommendedSaladId for plov and recommendedSideId for soup
code = code.replace(
  'id: "uzbek-plov",',
  'id: "uzbek-plov",\n    recommendedSaladId: "achchiq-chuchuk",\n    prepMethod: { uz: "Qovurib pishirilgan", ru: "Жареный и тушеный", en: "Fried and stewed" },'
);
code = code.replace(
  'id: "lentil-soup",',
  'id: "lentil-soup",\n    recommendedSideId: "qora-non",\n    prepMethod: { uz: "Qaynatib pishirilgan", ru: "Вареный", en: "Boiled" },'
);


fs.writeFileSync('src/lib/foods.ts', code);
console.log('Successfully added the new foods');

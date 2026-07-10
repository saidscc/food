
import type { Lang } from "./i18n";

export type Loc = Record<Lang, string>;
export type LocList = Record<Lang, string[]>;

export interface Category {
  id: string;
  name: Loc;
  icon: string;
  color: string;
}

export interface Food {
  id: string;
  image: string;
  categories: string[];
  name: Loc;
  short: Loc;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  prepTime: number;
  price: 1 | 2 | 3;
  healthScore: number;
  rating: number;
  vitamins: string[];
  minerals: string[];
  description: Loc;
  benefits: LocList;
  forWhom: Loc;
  notForWhom: Loc;
  whenEat: Loc;
  dailyRec: Loc;
  storage: Loc;
  ingredients: LocList;
  recipe: LocList;
  ingredientsList?: string[];
  prepMethod?: Loc;
  healthBenefitsInfo?: Loc;
  recommendedSaladId?: string;
  recommendedSideId?: string;
}

export const HERO_IMAGE = "/hero.jpg";

export const categories: Category[] = [
  { id: "fast", name: { uz: "Tez tayyor", ru: "Быстрые", en: "Fast" }, icon: "⚡", color: "chart-2" },
  { id: "healthy", name: { uz: "Foydali", ru: "Полезные", en: "Healthy" }, icon: "🥗", color: "primary" },
  { id: "protein", name: { uz: "Protein", ru: "Белковые", en: "Protein" }, icon: "💪", color: "chart-3" },
  { id: "weightloss", name: { uz: "Ozish", ru: "Похудение", en: "Weight loss" }, icon: "🔥", color: "chart-5" },
  { id: "weightgain", name: { uz: "Vazn olish", ru: "Набор веса", en: "Weight gain" }, icon: "📈", color: "gold" },
  { id: "vegetarian", name: { uz: "Vegetarian", ru: "Вегетарианские", en: "Vegetarian" }, icon: "🌱", color: "primary" },
  { id: "sport", name: { uz: "Sport", ru: "Спорт", en: "Sport" }, icon: "🏋️", color: "chart-3" },
  { id: "breakfast", name: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast" }, icon: "🍳", color: "gold" },
  { id: "lunch", name: { uz: "Tushlik", ru: "Обед", en: "Lunch" }, icon: "🍽️", color: "primary" },
  { id: "dinner", name: { uz: "Kechki", ru: "Ужин", en: "Dinner" }, icon: "🌙", color: "chart-4" },
  { id: "uzbek", name: { uz: "O'zbek", ru: "Узбекские", en: "Uzbek" }, icon: "🏺", color: "gold" },
  { id: "salads", name: { uz: "Salatlar", ru: "Салаты", en: "Salads" }, icon: "🥗", color: "primary" },
  { id: "sides", name: { uz: "Qo'shimchalar", ru: "Гарниры", en: "Sides & Bread" }, icon: "🍞", color: "gold" },
  { id: "pairings", name: { uz: "Tavsiyalar", ru: "Сочетания", en: "Pairings" }, icon: "🔗", color: "chart-2" },
  { id: "drinks", name: { uz: "Ichimliklar", ru: "Напитки", en: "Drinks" }, icon: "🍹", color: "chart-3" }];

export let foods: Food[] = [
  // ─── TEZ TAYYOR TAOMLAR (YANGI) ──────────────────────────────────────────
  {
    id: "avocado-salmon-toast",
    recommendedSaladId: "spring-salad", recommendedSideId: "green-tea-lemon",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "protein", "breakfast", "healthy"],
    name: { uz: "Qizil baliqli avokado tost", ru: "Авокадо-тост с лососем", en: "Avocado Salmon Toast" },
    short: { uz: "Tuxum, avokado va qizil baliqli premium tost", ru: "Премиум тост с авокадо, яйцом и лососем", en: "Premium toast with avocado, egg and salmon" },
    calories: 310, protein: 18, fat: 16, carbs: 24, prepTime: 10, price: 2, healthScore: 95, rating: 4.9,
    vitamins: ["B12", "D", "E", "A"], minerals: ["Omega-3", "Kaliy", "Fosfor"],
    description: {
      uz: "Qizil baliqli avokado tost — to'yimli va premium nonushta. Zaytun moyi, limon suvi bilan ezilgan avokado, qaynatilgan tuxum va sifatli qizil baliq (losos) bo'laklari bilan bezatilgan butun bug'doy noni.",
      ru: "Авокадо-тост с лососем — питательный и премиальный завтрак. Цельнозерновой хлеб с нежным авокадо, яйцом-пашот и ломтиками слабосоленого лосося.",
      en: "Avocado salmon toast — a nutritious and premium breakfast. Whole-wheat toast topped with mashed avocado, poached egg, and slices of cured salmon.",
    },
    benefits: { uz: ["Sog'lom Omega-3 yog'lari", "Yuqori protein manbai", "Yurak salomatligini qo'llaydi", "Miya faoliyatini yaxshilaydi"], ru: ["Полезные жиры Омега-3", "Высокий источник белка", "Поддерживает сердце", "Улучшает работу мозга"], en: ["Healthy Omega-3 fats", "High protein source", "Supports heart health", "Improves brain function"] },
    forWhom: { uz: "Hamma, sportchilar, sog'lom turmush tarafdorlari", ru: "Все, спортсмены, сторонники ЗОЖ", en: "Everyone, athletes, healthy lifestyle fans" },
    notForWhom: { uz: "Baliq va tuxumga allergiyasi bo'lganlar", ru: "Аллергия на рыбу или яйца", en: "Fish or egg allergy sufferers" },
    whenEat: { uz: "Nonushta yoki tushlik", ru: "Завтрак или обед", en: "Breakfast or lunch" },
    dailyRec: { uz: "Kuniga 1 porsiya (2 dona tost)", ru: "1 порция в день (2 тоста)", en: "1 serving per day (2 toasts)" },
    storage: { uz: "Tayyorlab darhol iste'mol qiling", ru: "Употреблять сразу", en: "Eat fresh immediately" },
    ingredients: { uz: ["Butun bug'doy noni 2 dilim", "Avokado 1 dona", "Qizil baliq (losos) 50g", "Tuxum 1 dona", "Limon suvi", "Tuz va murch"], ru: ["Цельнозерновой хлеб 2 ломтика", "Авокадо 1 шт.", "Лосось 50г", "Яйцо 1 шт.", "Лимонный сок", "Соль и перец"], en: ["Whole-wheat bread 2 slices", "Avocado x1", "Salmon 50g", "Egg x1", "Lemon juice", "Salt and pepper"] },
    recipe: { uz: ["Nonni qizartirib oling", "Avokadoni tozalab, limon suvi, tuz, murch bilan ezing va nonga surting", "Tuxumni qaynatib pishiring yoki pasht qiling va tost ustiga qo'ying", "Qizil baliq (losos) bo'laklarini qo'shing", "Urug'lar yoki ko'katlar bilan bezab torting"], ru: ["Подрумяньте хлеб", "Разомните авокадо с лимоном, солью и перцем, намажьте на хлеб", "Приготовьте яйцо-пашот или сварите всмятку и выложите сверху", "Добавьте ломтики лосося", "Украсьте семенами или зеленью"], en: ["Toast the bread", "Mash avocado with lemon juice, salt, and pepper, spread on toast", "Cook a poached or soft-boiled egg and place on top", "Add slices of cured salmon", "Garnish with seeds or herbs and serve"] },
  },
  {
    id: "scrambled-eggs",
    recommendedSaladId: "spring-salad", recommendedSideId: "avocado-toast",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "breakfast", "protein"],
    name: { uz: "Qaymoqli maydalangan tuxum", ru: "Яичница-болтунья", en: "Scrambled Eggs" },
    short: { uz: "5 daqiqada tayyor yumshoq tuxum", ru: "Мягкая яичница за 5 минут", en: "Soft scrambled eggs in 5 minutes" },
    calories: 180, protein: 14, fat: 13, carbs: 2, prepTime: 5, price: 1, healthScore: 89, rating: 4.8,
    vitamins: ["B12", "D", "B2"], minerals: ["Selen", "Fosfor", "Kaliy"],
    description: {
      uz: "Maydalangan tuxum — nonushta uchun eng tez taom. Kalit sir: past olovda pishiring, doim aralashtiring. Sut yoki qaymoq qo'shsangiz yanada yumshoq bo'ladi.",
      ru: "Яичница-болтунья — самое быстрое блюдо для завтрака. Секрет: готовьте на малом огне, постоянно помешивая. Добавьте молоко — будет нежнее.",
      en: "Scrambled eggs are the fastest breakfast dish. Secret: cook on low heat, stir constantly. Add milk or cream for extra fluffiness.",
    },
    benefits: { uz: ["5 daqiqada tayyor", "Yuqori protein", "Uyg'onish uchun energiya", "B vitaminlari"], ru: ["Готово за 5 минут", "Высокий белок", "Энергия для пробуждения", "Витамины группы B"], en: ["Ready in 5 minutes", "High protein", "Morning energy", "B vitamins"] },
    forWhom: { uz: "Hamma, bolalar, tez ovqatlanmoqchilar", ru: "Все, дети, те кто спешит", en: "Everyone, kids, those in a hurry" },
    notForWhom: { uz: "Tuxumga allergiyasi bo'lganlar", ru: "Аллергия на яйца", en: "Egg allergy sufferers" },
    whenEat: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast" },
    dailyRec: { uz: "Ertalab 1 porsiya (2-3 tuxum)", ru: "1 порция утром (2-3 яйца)", en: "1 morning serving (2-3 eggs)" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat immediately" },
    ingredients: { uz: ["Tuxum 3 dona", "Sut 2 q/qoshiq", "Sariyog'", "Tuz, qalampir", "Ko'kat"], ru: ["Яйца 3 шт.", "Молоко 2 ст.л.", "Сливочное масло", "Соль, перец", "Зелень"], en: ["Eggs x3", "Milk 2 tbsp", "Butter", "Salt, pepper", "Herbs"] },
    recipe: { uz: ["Tuxumlarni sut bilan chayang", "Tavaga yog' soling, past olovda eritin", "Tuxum aralashmasini quying", "Doimiy aralashtirgan holda 3 daqiqa pishiring", "Ko'kat bilan bezang va bering"], ru: ["Взбейте яйца с молоком", "Разогрейте масло на сковороде на малом огне", "Вылейте смесь", "Постоянно помешивайте 3 минуты", "Посыпьте зеленью и подавайте"], en: ["Whisk eggs with milk", "Melt butter in pan on low heat", "Pour in the egg mixture", "Stir constantly for 3 minutes", "Garnish with herbs and serve"] },
  },
  {
    id: "omelette-veggie",
    recommendedSaladId: "spring-salad", recommendedSideId: "qora-non",
    image: "https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "breakfast", "vegetarian", "protein", "healthy"],
    name: { uz: "Sabzavotli omlet", ru: "Омлет с овощами", en: "Veggie Omelette" },
    short: { uz: "Tez tayyor sog'lom tuxum omlet", ru: "Быстрый полезный омлет с овощами", en: "Quick healthy omelette with vegetables" },
    calories: 210, protein: 16, fat: 14, carbs: 6, prepTime: 8, price: 1, healthScore: 92, rating: 4.8,
    vitamins: ["A", "B12", "C", "D"], minerals: ["Selen", "Kaliy", "Magniy"],
    description: {
      uz: "Tuxum va yangi sabzavotlardan tayyorlangan omlet — to'liq nonushta. Omletni qatlamlab yoping (frantsuzcha uslub) yoki to'g'ri pishiring. Qalampir, bodring va ko'kat qo'shing — rang va ta'm yanada yaxshi bo'ladi.",
      ru: "Омлет с яйцами и свежими овощами — полноценный завтрак. Сложите пополам (по-французски) или готовьте открытым. Перец, зелень и огурец добавят цвет и вкус.",
      en: "A veggie omelette makes a complete breakfast. Fold it French-style or cook flat. Bell pepper, greens and cucumber add color and flavor.",
    },
    benefits: { uz: ["To'liq nonushta 8 daqiqada", "Sabzavotlar + protein", "Vitaminga boy", "Hazm qilish uchun yengil"], ru: ["Полный завтрак за 8 минут", "Овощи + белок", "Богат витаминами", "Легко усваивается"], en: ["Full breakfast in 8 minutes", "Veggies + protein", "Vitamin-rich", "Easy to digest"] },
    forWhom: { uz: "Hamma, vegetarianlar, sportchilar", ru: "Все, вегетарианцы, спортсмены", en: "Everyone, vegetarians, athletes" },
    notForWhom: { uz: "Tuxumga allergiyasi bo'lganlar", ru: "Аллергия на яйца", en: "Egg allergy sufferers" },
    whenEat: { uz: "Nonushta yoki tushlik", ru: "Завтрак или обед", en: "Breakfast or lunch" },
    dailyRec: { uz: "Kuniga 1 porsiya", ru: "1 порция в день", en: "1 serving per day" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat fresh" },
    ingredients: { uz: ["Tuxum 3 dona", "Qizil bolg'or qalampir", "Piyoz", "Pomidor", "Ko'kat", "Tuz, qalampir"], ru: ["Яйца 3 шт.", "Красный болгарский перец", "Лук", "Помидор", "Зелень", "Соль, перец"], en: ["Eggs x3", "Red bell pepper", "Onion", "Tomato", "Herbs", "Salt, pepper"] },
    recipe: { uz: ["Sabzavotlarni mayda to'g'rang", "Tavada yog' eritib sabzavotlarni 2 daqiqa qovuring", "Tuxumlarni chaynb ustiga quying", "Qopqoq bilan yoping, 3-4 daqiqa pishiring", "Ikki baravarga bukling va bering"], ru: ["Нарежьте овощи мелко", "Обжарьте овощи 2 минуты в масле", "Вылейте взбитые яйца сверху", "Накройте крышкой, готовьте 3-4 минуты", "Сложите пополам и подавайте"], en: ["Dice vegetables finely", "Sauté vegetables 2 minutes in oil", "Pour beaten eggs over them", "Cover and cook 3-4 minutes", "Fold in half and serve"] },
  },
  {
    id: "egg-toast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "breakfast", "protein"],
    name: { uz: "Tuxumli tost", ru: "Тост с яйцом", en: "Egg Toast" },
    short: { uz: "Qovurilgan non ustida mo'rt tuxum", ru: "Хрустящий тост с яйцом", en: "Crunchy toast with a fried egg" },
    calories: 240, protein: 14, fat: 12, carbs: 22, prepTime: 7, price: 1, healthScore: 82, rating: 4.7,
    vitamins: ["B12", "D", "B1"], minerals: ["Selen", "Temir", "Kaliy"],
    description: {
      uz: "Qovurilgan non va tostta pishirilgan tuxum — studentlar sevimli tez nonushtasi. Non yuzasiga avval tuxum tengligi tartibida qilib, keyin tuxumni to'g'ridan-to'g'ri ustiga sindirsangiz — tog'ora kerak bo'lmaydi.",
      ru: "Тост с жареным яйцом — любимый быстрый завтрак студентов. Разбейте яйцо прямо на хлеб на сковороде — не нужна тарелка.",
      en: "Toast with a fried egg — the student's favorite fast breakfast. Crack the egg directly onto the bread in the pan — no extra dish needed.",
    },
    benefits: { uz: ["7 daqiqada tayyor", "Uglevodlar + protein", "Energiya beradi", "Qulay va arzon"], ru: ["Готово за 7 минут", "Углеводы + белок", "Даёт энергию", "Удобно и дёшево"], en: ["Ready in 7 minutes", "Carbs + protein", "Gives energy", "Easy and cheap"] },
    forWhom: { uz: "Studentlar, band odamlar", ru: "Студенты, занятые люди", en: "Students, busy people" },
    notForWhom: { uz: "Glyutenga chidamsizlar", ru: "Непереносимость глютена", en: "Gluten intolerance" },
    whenEat: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast" },
    dailyRec: { uz: "Ertalab 1 porsiya", ru: "1 порция утром", en: "1 morning serving" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat immediately" },
    ingredients: { uz: ["Nonushtalik non 2 dilim", "Tuxum 1 dona", "Sariyog'", "Tuz", "Ko'kat"], ru: ["Тостовый хлеб 2 ломтика", "Яйцо 1 шт.", "Сливочное масло", "Соль", "Зелень"], en: ["Toast bread 2 slices", "Egg x1", "Butter", "Salt", "Herbs"] },
    recipe: { uz: ["Tavaga yog' eritib qizdiring", "Nonni bir tomonini qovuring", "Ag'darib tuxumni ustiga sindirib quying", "Qopqoq bilan 2 daqiqa yoping", "Tuz va ko'kat seping"], ru: ["Разогрейте масло на сковороде", "Обжарьте хлеб с одной стороны", "Переверните и разбейте яйцо сверху", "Накройте крышкой на 2 минуты", "Посолите и посыпьте зеленью"], en: ["Heat butter in a pan", "Toast bread on one side", "Flip and crack egg on top", "Cover and cook 2 minutes", "Season with salt and herbs"] },
  },
  {
    id: "quick-sandwich",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "protein", "breakfast", "lunch"],
    name: { uz: "Tezkor sandvich", ru: "Быстрый сэндвич", en: "Quick Sandwich" },
    short: { uz: "5 daqiqada tayyor to'yimli sandvich", ru: "Сытный сэндвич за 5 минут", en: "Hearty sandwich in 5 minutes" },
    calories: 310, protein: 18, fat: 12, carbs: 34, prepTime: 5, price: 1, healthScore: 78, rating: 4.6,
    vitamins: ["B1", "B12", "C"], minerals: ["Temir", "Kaliy", "Fosfor"],
    description: {
      uz: "Tez sandvich — istalgan vaqtda tayyorlanadi. Non, pishloq, sabzavot va qo'shimcha protein bilan — to'liq ovqat 5 daqiqada. Muhimi — non yangi bo'lsin.",
      ru: "Быстрый сэндвич — готовится в любое время. Хлеб, сыр, овощи и дополнительный белок — полноценная еда за 5 минут.",
      en: "A quick sandwich is ready any time. Bread, cheese, vegetables and extra protein — a complete meal in 5 minutes.",
    },
    benefits: { uz: ["5 daqiqada tayyor", "To'yimli", "Uglevodlar + protein", "Qulay olib yurish uchun"], ru: ["Готово за 5 минут", "Сытно", "Углеводы + белок", "Удобно взять с собой"], en: ["Ready in 5 minutes", "Filling", "Carbs + protein", "Easy to take along"] },
    forWhom: { uz: "Studentlar, sayohatchilar, hamma", ru: "Студенты, путешественники, все", en: "Students, travelers, everyone" },
    notForWhom: { uz: "Glyutenga chidamsizlar", ru: "Непереносимость глютена", en: "Gluten intolerance" },
    whenEat: { uz: "Nonushta yoki tushlik", ru: "Завтрак или обед", en: "Breakfast or lunch" },
    dailyRec: { uz: "Kuniga 1-2 dona", ru: "1-2 штуки в день", en: "1-2 per day" },
    storage: { uz: "Tayyorlab 2-3 soat saqlash mumkin", ru: "Хранить 2-3 часа", en: "Store 2-3 hours" },
    ingredients: { uz: ["Non 2 dilim", "Pishloq", "Pomidor", "Salat", "Mayonez", "Qo'shimcha protein (tuxum/tovuq)"], ru: ["Хлеб 2 ломтика", "Сыр", "Помидор", "Салат", "Майонез", "Белок (яйцо/курица)"], en: ["Bread 2 slices", "Cheese", "Tomato", "Lettuce", "Mayo", "Protein (egg/chicken)"] },
    recipe: { uz: ["Nonga mayonez yoki sous surting", "Pishloq dilimini qo'ying", "Salat va pomidor joylang", "Protein qo'shing", "Ikkinchi non bilan yoping va bering"], ru: ["Намажьте хлеб соусом", "Положите ломтик сыра", "Добавьте салат и помидор", "Добавьте белок", "Накройте вторым хлебом и подавайте"], en: ["Spread sauce on bread", "Add a cheese slice", "Layer lettuce and tomato", "Add protein", "Top with second slice and serve"] },
  },
  {
    id: "instant-oatmeal-cup",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "breakfast", "healthy"],
    name: { uz: "Stakanda tayyor suli", ru: "Овсянка в стакане", en: "Instant Oat Cup" },
    short: { uz: "Qaynoq suv bilan 3 daqiqada tayyor", ru: "Готово за 3 минуты с кипятком", en: "Ready in 3 minutes with hot water" },
    calories: 195, protein: 7, fat: 4, carbs: 35, prepTime: 3, price: 1, healthScore: 86, rating: 4.7,
    vitamins: ["B1", "E", "B5"], minerals: ["Magniy", "Temir", "Rux"],
    description: {
      uz: "Stakanda suli — tezkor nonushta. Kechasi ziravorlar va rezavor bilan suvda namlab qo'ying — ertalab tayyor bo'ladi (overnight oats). Yoki qaynoq suv quying — 3 daqiqada iste'mol qiling.",
      ru: "Овсянка в стакане — быстрый завтрак. Замочите на ночь с ягодами — утром готово. Или залейте кипятком — готово через 3 минуты.",
      en: "Instant oat cup — the ultimate fast breakfast. Soak overnight with berries for a ready meal, or add boiling water for a 3-minute breakfast.",
    },
    benefits: { uz: ["3 daqiqada tayyor", "Tola beradi", "Energiya", "Hazm qilishni yaxshilaydi"], ru: ["Готово за 3 минуты", "Клетчатка", "Энергия", "Улучшает пищеварение"], en: ["Ready in 3 minutes", "Fiber-rich", "Energy", "Improves digestion"] },
    forWhom: { uz: "Studentlar, band odamlar", ru: "Студенты, занятые люди", en: "Students, busy people" },
    notForWhom: { uz: "Glyutenga chidamsizlar", ru: "Непереносимость глютена", en: "Gluten intolerance" },
    whenEat: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast" },
    dailyRec: { uz: "Ertalab 1 porsiya", ru: "1 порция утром", en: "1 morning serving" },
    storage: { uz: "Muzlatgichda 1 kun (overnight oats)", ru: "В холодильнике 1 день", en: "1 day in fridge (overnight oats)" },
    ingredients: { uz: ["Tez pishuvchi suli 60g", "Qaynoq suv yoki sut", "Asal", "Rezavorlar", "Chia urug'i"], ru: ["Быстроразваривающаяся овсянка 60г", "Кипяток или молоко", "Мёд", "Ягоды", "Семена чиа"], en: ["Quick oats 60g", "Boiling water or milk", "Honey", "Berries", "Chia seeds"] },
    recipe: { uz: ["Sulini stakanga soling", "Qaynoq suv quying (3:1)", "3 daqiqa turing", "Asal va rezavor soling", "Chia urug'i seping"], ru: ["Насыпьте овсянку в стакан", "Залейте кипятком (3:1)", "Подождите 3 минуты", "Добавьте мёд и ягоды", "Посыпьте семенами чиа"], en: ["Add oats to a cup", "Pour boiling water (3:1)", "Wait 3 minutes", "Add honey and berries", "Sprinkle chia seeds"] },
  },
  {
    id: "egg-salad-cup",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "protein", "lunch", "healthy"],
    name: { uz: "Tuxumli salat", ru: "Яичный салат", en: "Egg Salad" },
    short: { uz: "Tuxum, sabzavot va mazali sous bilan salat", ru: "Салат с яйцом, овощами и вкусным соусом", en: "Egg, veggie and dressing salad" },
    calories: 190, protein: 12, fat: 13, carbs: 7, prepTime: 10, price: 1, healthScore: 90, rating: 4.7,
    vitamins: ["B12", "D", "C", "K"], minerals: ["Selen", "Kaltsiy", "Kaliy"],
    description: {
      uz: "Tuxumli salat — ozuqali va to'yimli. Qaynatilgan tuxum, bodring, pomidor va mayonez sousi — 10 daqiqada tayyor to'liq ovqat. Dietaviy variant uchun mayonezni yogurtga almashtiring.",
      ru: "Яичный салат питателен и сытен. Варёные яйца, огурец, томат и майонез — полноценная еда за 10 минут. Для диетического варианта замените майонез йогуртом.",
      en: "Egg salad is nutritious and filling. Boiled eggs, cucumber, tomato and mayo — a complete meal in 10 minutes. Replace mayo with yogurt for a lighter version.",
    },
    benefits: { uz: ["10 daqiqada tayyor", "Yuqori protein", "Vitaminlar", "To'yimli"], ru: ["Готово за 10 минут", "Высокий белок", "Витамины", "Сытно"], en: ["Ready in 10 minutes", "High protein", "Vitamins", "Filling"] },
    forWhom: { uz: "Hamma, ozishni istaganlar", ru: "Все, желающие похудеть", en: "Everyone, weight-loss seekers" },
    notForWhom: { uz: "Tuxumga allergiyasi bo'lganlar", ru: "Аллергия на яйца", en: "Egg allergy sufferers" },
    whenEat: { uz: "Tushlik yoki gazak", ru: "Обед или перекус", en: "Lunch or snack" },
    dailyRec: { uz: "Kuniga 1 porsiya", ru: "1 порция в день", en: "1 serving per day" },
    storage: { uz: "Muzlatgichda 1 kun", ru: "В холодильнике 1 день", en: "1 day in fridge" },
    ingredients: { uz: ["Tuxum 3 dona", "Bodring", "Pomidor", "Salat bargi", "Mayonez/yogurt", "Tuz"], ru: ["Яйца 3 шт.", "Огурец", "Помидор", "Салат", "Майонез/йогурт", "Соль"], en: ["Eggs x3", "Cucumber", "Tomato", "Lettuce", "Mayo/yogurt", "Salt"] },
    recipe: { uz: ["Tuxumlarni qaynatib kesing", "Sabzavotlarni to'g'rang", "Hammasini aralashtiring", "Sous bilan quying", "Sovuq holda bering"], ru: ["Сварите и нарежьте яйца", "Нарежьте овощи", "Перемешайте всё", "Заправьте соусом", "Подавайте охлаждённым"], en: ["Boil and chop eggs", "Dice vegetables", "Mix everything together", "Drizzle dressing", "Serve chilled"] },
  },
  {
    id: "peanut-butter-banana",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "breakfast", "sport", "weightgain"],
    name: { uz: "Yer yong'oq yog'li banan tost", ru: "Тост с арахисовым маслом и бананом", en: "Peanut Butter Banana Toast" },
    short: { uz: "Kaloriyali va mazali tez nonushta", ru: "Калорийный и вкусный быстрый завтрак", en: "Caloric, tasty fast breakfast" },
    calories: 320, protein: 12, fat: 16, carbs: 38, prepTime: 4, price: 1, healthScore: 85, rating: 4.9,
    vitamins: ["B6", "E", "B3"], minerals: ["Magniy", "Kaliy", "Fosfor"],
    description: {
      uz: "Yer yong'oq yog'i va banan — kuchli kaloriya kombinatsiyasi. Sportdan oldin ideal snack. Non ustiga yer yong'oq yog'i suring, banan dilimlarini qo'ying — tayyor!",
      ru: "Арахисовое масло и банан — мощная калорийная комбинация. Идеальный снек перед тренировкой. Намажьте масло на хлеб, добавьте кружочки банана — готово!",
      en: "Peanut butter and banana — a powerful caloric combo. Ideal pre-workout snack. Spread PB on toast, add banana slices — done!",
    },
    benefits: { uz: ["4 daqiqada tayyor", "Tez energiya", "Vaznni oshiradi", "Potassiy + magniy"], ru: ["Готово за 4 минуты", "Быстрая энергия", "Набор веса", "Калий + магний"], en: ["Ready in 4 minutes", "Quick energy", "Weight gain", "Potassium + magnesium"] },
    forWhom: { uz: "Sportchilar, vazn olmoqchilar, studentlar", ru: "Спортсмены, набирающие вес, студенты", en: "Athletes, weight gainers, students" },
    notForWhom: { uz: "Yong'oqqa allergiyasi bo'lganlar", ru: "Аллергия на арахис", en: "Peanut allergy sufferers" },
    whenEat: { uz: "Nonushta yoki mashg'ulotdan oldin", ru: "Завтрак или до тренировки", en: "Breakfast or pre-workout" },
    dailyRec: { uz: "Kuniga 1-2 tost", ru: "1-2 тоста в день", en: "1-2 toasts per day" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat immediately" },
    ingredients: { uz: ["Non 2 dilim", "Yer yong'oq yog'i 2 q/qoshiq", "Banan 1 dona", "Asal (ixtiyoriy)", "Chia urug'i"], ru: ["Хлеб 2 ломтика", "Арахисовое масло 2 ст.л.", "Банан 1 шт.", "Мёд (по желанию)", "Семена чиа"], en: ["Bread 2 slices", "Peanut butter 2 tbsp", "Banana x1", "Honey (optional)", "Chia seeds"] },
    recipe: { uz: ["Nonni qizdiring", "Yer yong'oq yog'ini suring", "Bananni dilim qiling", "Ustiga joylashtiring", "Asal va chia urug'i seping"], ru: ["Подрумяньте хлеб", "Намажьте арахисовое масло", "Нарежьте банан кружочками", "Разложите сверху", "Полейте мёдом и посыпьте чиа"], en: ["Toast the bread", "Spread peanut butter", "Slice the banana", "Layer on top", "Drizzle honey and sprinkle chia"] },
  },
  {
    id: "yogurt-fruit-cup",
    image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "breakfast", "healthy"],
    name: { uz: "Yogurt va meva", ru: "Йогурт с фруктами", en: "Yogurt & Fruit Cup" },
    short: { uz: "2 daqiqada tayyor foydali gazak", ru: "Полезный перекус за 2 минуты", en: "Healthy snack in 2 minutes" },
    calories: 165, protein: 9, fat: 4, carbs: 26, prepTime: 2, price: 1, healthScore: 93, rating: 4.8,
    vitamins: ["C", "B2", "D"], minerals: ["Kaltsiy", "Magniy", "Kaliy"],
    description: {
      uz: "Grek yogurti va yangi mevalar — dunyodagi eng tez foydali nonushta. Asal va granola qo'shing — parfe tayyor. Istalgan mevalarni qo'shishingiz mumkin.",
      ru: "Греческий йогурт и свежие фрукты — быстрейший полезный завтрак. Добавьте мёд и гранолу — парфе готово. Можно добавить любые фрукты.",
      en: "Greek yogurt and fresh fruit — the world's fastest healthy breakfast. Add honey and granola for a parfait. Any fruit works perfectly.",
    },
    benefits: { uz: ["2 daqiqada tayyor", "Probiotiklar", "Kaltsiy", "Immunitet"], ru: ["Готово за 2 минуты", "Пробиотики", "Кальций", "Иммунитет"], en: ["Ready in 2 minutes", "Probiotics", "Calcium", "Immunity"] },
    forWhom: { uz: "Hamma, bolalar, studentlar", ru: "Все, дети, студенты", en: "Everyone, kids, students" },
    notForWhom: { uz: "Laktozaga chidamsizlar", ru: "Непереносимость лактозы", en: "Lactose intolerance" },
    whenEat: { uz: "Nonushta yoki gazak", ru: "Завтрак или перекус", en: "Breakfast or snack" },
    dailyRec: { uz: "Kuniga 1-2 porsiya", ru: "1-2 порции в день", en: "1-2 servings per day" },
    storage: { uz: "Muzlatgichda 1 kun", ru: "В холодильнике 1 день", en: "1 day in fridge" },
    ingredients: { uz: ["Grek yogurti 150g", "Banan", "Qulupnay", "Asal", "Granola (ixtiyoriy)"], ru: ["Греческий йогурт 150г", "Банан", "Клубника", "Мёд", "Гранола (по желанию)"], en: ["Greek yogurt 150g", "Banana", "Strawberries", "Honey", "Granola (optional)"] },
    recipe: { uz: ["Yogurtni stakanga soling", "Mevalarni bo'laklang", "Ustiga joylashtiring", "Asal quying", "Granola seping va bering"], ru: ["Налейте йогурт в стакан", "Нарежьте фрукты", "Выложите сверху", "Полейте мёдом", "Посыпьте гранолой и подавайте"], en: ["Add yogurt to a cup", "Slice the fruit", "Layer on top", "Drizzle honey", "Sprinkle granola and serve"] },
  },
  {
    id: "tuna-rice-bowl",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "protein", "lunch", "sport", "healthy"],
    name: { uz: "Tuna va guruch bowl", ru: "Боул с тунцом и рисом", en: "Tuna Rice Bowl" },
    short: { uz: "Yuqori proteinli tez tushlik bowl", ru: "Высокобелковый быстрый обеденный боул", en: "High-protein quick lunch bowl" },
    calories: 340, protein: 28, fat: 7, carbs: 40, prepTime: 10, price: 2, healthScore: 91, rating: 4.8,
    vitamins: ["B12", "D", "B3"], minerals: ["Selen", "Yod", "Omega-3"],
    description: {
      uz: "Konservadagi tuna + qaynatilgan guruch + sabzavot = mukammal tez tushlik. Tuna sog'lom protein, guruch esa uglevodlar beradi. Ko'kati, limon va soya sousi bilan lazzatlanib yeng.",
      ru: "Консервированный тунец + варёный рис + овощи = идеальный быстрый обед. Тунец — здоровый белок, рис — углеводы. Добавьте зелень, лимон и соевый соус.",
      en: "Canned tuna + cooked rice + vegetables = perfect fast lunch. Tuna provides protein, rice provides carbs. Top with greens, lemon and soy sauce.",
    },
    benefits: { uz: ["10 daqiqada tayyor", "Omega-3", "Yuqori protein", "Uzoq to'qlik"], ru: ["Готово за 10 минут", "Омега-3", "Высокий белок", "Долгое насыщение"], en: ["Ready in 10 minutes", "Omega-3", "High protein", "Long satiety"] },
    forWhom: { uz: "Sportchilar, band odamlar", ru: "Спортсмены, занятые люди", en: "Athletes, busy people" },
    notForWhom: { uz: "Baliqqa allergiyasi bo'lganlar", ru: "Аллергия на рыбу", en: "Fish allergy sufferers" },
    whenEat: { uz: "Tushlik", ru: "Обед", en: "Lunch" },
    dailyRec: { uz: "Kuniga 1 porsiya", ru: "1 порция в день", en: "1 serving per day" },
    storage: { uz: "Muzlatgichda 1 kun", ru: "В холодильнике 1 день", en: "1 day in fridge" },
    ingredients: { uz: ["Tuna konservasi 185g", "Guruch 150g (pishirilgan)", "Bodring", "Ko'kat", "Soya sousi", "Limon"], ru: ["Тунец консервированный 185г", "Рис 150г (готовый)", "Огурец", "Зелень", "Соевый соус", "Лимон"], en: ["Canned tuna 185g", "Rice 150g (cooked)", "Cucumber", "Greens", "Soy sauce", "Lemon"] },
    recipe: { uz: ["Guruchni pishiring (yoki tayyor guruch ishlating)", "Tuna konservasini oching va suvini to'king", "Bodring va ko'katni to'g'rang", "Hammani bowlga joylang", "Soya sousi va limon siqib bering"], ru: ["Сварите рис (или используйте готовый)", "Откройте консерву и слейте воду", "Нарежьте огурец и зелень", "Соберите боул", "Заправьте соевым соусом и лимоном"], en: ["Cook rice (or use pre-cooked)", "Open tuna can and drain", "Chop cucumber and greens", "Assemble the bowl", "Drizzle soy sauce and squeeze lemon"] },
  },
  // ─── EXISTING FOODS ───────────────────────────────────────────────────────
  {
    id: "grilled-salmon",
    recommendedSaladId: "spring-salad", recommendedSideId: "avocado-toast",
    image: "/food-salmon.jpg",
    categories: ["healthy", "protein", "sport", "dinner"],
    name: { uz: "Grildagi losos", ru: "Лосось на гриле", en: "Grilled Salmon" },
    short: {
      uz: "Omega-3 ga boy premium baliq",
      ru: "Премиальная рыба, богатая Omega-3",
      en: "Premium fish rich in Omega-3",
    },
    calories: 208, protein: 22, fat: 13, carbs: 0, prepTime: 20, price: 3, healthScore: 96, rating: 4.9,
    vitamins: ["B12", "D", "B6"], minerals: ["Selen", "Kaliy", "Fosfor"],
    description: {
      uz: "Losos — Omega-3 yog' kislotalari, sifatli protein va D vitaminining eng yaxshi manbalaridan biri. Yurak va miya salomatligi uchun ideal. Grildan chiqarilgach 3 daqiqa dam bering — shirasi ichida saqlanadi.",
      ru: "Лосось — один из лучших источников Omega-3, качественного белка и витамина D. Идеален для здоровья сердца и мозга. После гриля дайте отдохнуть 3 минуты, чтобы сохранить сок.",
      en: "Salmon is one of the best sources of Omega-3, high-quality protein and vitamin D. Ideal for heart and brain health. Rest 3 minutes after grilling to retain juices.",
    },
    benefits: {
      uz: ["Yurak salomatligini yaxshilaydi", "Miya faoliyatini kuchaytiradi", "Yallig'lanishni kamaytiradi", "Mushak tiklanishiga yordam beradi"],
      ru: ["Улучшает здоровье сердца", "Усиливает работу мозга", "Снижает воспаление", "Помогает восстановлению мышц"],
      en: ["Improves heart health", "Boosts brain function", "Reduces inflammation", "Supports muscle recovery"],
    },
    forWhom: { uz: "Sportchilar, katta yoshdagilar, sog'lom ovqatlanuvchilar", ru: "Спортсмены, взрослые, приверженцы ЗОЖ", en: "Athletes, adults, healthy-eating fans" },
    notForWhom: { uz: "Baliqqa allergiyasi bo'lganlar", ru: "Аллергики на рыбу", en: "People allergic to fish" },
    whenEat: { uz: "Tushlik yoki kechki ovqat", ru: "Обед или ужин", en: "Lunch or dinner" },
    dailyRec: { uz: "Haftasiga 2–3 marta, 150–200g", ru: "2–3 раза в неделю, 150–200г", en: "2–3 times a week, 150–200g" },
    storage: { uz: "Muzlatgichda 1–2 kun, muzlatilgan holda 3 oy", ru: "В холодильнике 1–2 дня, в морозилке 3 мес.", en: "1–2 days chilled, 3 months frozen" },
    ingredients: {
      uz: ["Losos filesi 200g", "Limon", "Zaytun moyi", "Tuz, qalampir", "Rayhon"],
      ru: ["Филе лосося 200г", "Лимон", "Оливковое масло", "Соль, перец", "Базилик"],
      en: ["Salmon fillet 200g", "Lemon", "Olive oil", "Salt, pepper", "Basil"],
    },
    recipe: {
      uz: ["Fileni tuz va qalampir bilan ishqalang", "Zaytun moyi va limon suvini qo'shing", "Grilni 200°C ga qizdiring", "Har tomonini 4–5 daqiqa pishiring", "3 daqiqa dam bering va rayhon bilan bezang"],
      ru: ["Натрите филе солью и перцем", "Добавьте оливковое масло и сок лимона", "Разогрейте гриль до 200°C", "Обжарьте по 4–5 минут с каждой стороны", "Дайте отдохнуть 3 минуты и украсьте базиликом"],
      en: ["Rub fillet with salt and pepper", "Add olive oil and lemon juice", "Preheat the grill to 200°C", "Cook 4–5 minutes per side", "Rest 3 minutes then garnish with basil"],
    },
  },
  {
    id: "quinoa-bowl",
    image: "/food-bowl.jpg",
    categories: ["healthy", "vegetarian", "weightloss", "lunch"],
    name: { uz: "Kinoa bowl", ru: "Боул с киноа", en: "Quinoa Bowl" },
    short: { uz: "To'yimli vegetarian taom", ru: "Сытное вегетарианское блюдо", en: "Filling vegetarian meal" },
    calories: 320, protein: 12, fat: 10, carbs: 45, prepTime: 25, price: 2, healthScore: 94, rating: 4.8,
    vitamins: ["B1", "B9", "E"], minerals: ["Magniy", "Temir", "Rux"],
    description: {
      uz: "Kinoa — to'liq protein manbai bo'lgan noyob don. Nut, avokado va ko'katlar bilan birga bu bowl kun bo'yi energiya beradi. Kinoani 20 daqiqa suvda namlang va mayda tuz bilan qaynatsa ta'mi yanada yaxshilanadi.",
      ru: "Киноа — уникальное зерно с полноценным белком. Вместе с нутом, авокадо и зеленью боул заряжает энергией на весь день. Замочите киноа на 20 минут и варите с щепоткой соли.",
      en: "Quinoa is a rare grain with complete protein. With chickpeas, avocado and greens this bowl fuels your whole day. Soak quinoa 20 minutes and cook with a pinch of salt.",
    },
    benefits: {
      uz: ["Uzoq to'qlik hissi", "Hazm qilishni yaxshilaydi", "Qonda shakarni barqarorlaydi", "Vegetarianlar uchun protein"],
      ru: ["Долгое чувство сытости", "Улучшает пищеварение", "Стабилизирует сахар в крови", "Белок для вегетарианцев"],
      en: ["Long-lasting fullness", "Improves digestion", "Stabilizes blood sugar", "Protein for vegetarians"],
    },
    forWhom: { uz: "Vegetarianlar, ozishni istaganlar", ru: "Вегетарианцы, худеющие", en: "Vegetarians, those losing weight" },
    notForWhom: { uz: "Saponinlarga sezgir oshqozon", ru: "Чувствительный к сапонинам желудок", en: "Saponin-sensitive stomachs" },
    whenEat: { uz: "Tushlik", ru: "Обед", en: "Lunch" },
    dailyRec: { uz: "Kuniga 1 porsiya (250g)", ru: "1 порция в день (250г)", en: "1 serving per day (250g)" },
    storage: { uz: "Muzlatgichda 2–3 kun", ru: "В холодильнике 2–3 дня", en: "2–3 days in the fridge" },
    ingredients: { uz: ["Kinoa 100g", "Nut", "Avokado", "Ko'katlar", "Limon sousi"], ru: ["Киноа 100г", "Нут", "Авокадо", "Зелень", "Лимонный соус"], en: ["Quinoa 100g", "Chickpeas", "Avocado", "Greens", "Lemon dressing"] },
    recipe: { uz: ["Kinoani yuvib 20 daqiqa namlang", "Tuz bilan 15 daqiqa qaynating", "Nutni pishiring", "Sabzavotlarni to'g'rang", "Hammasini bowlga joylang va sous bilan bezang"], ru: ["Промойте и замочите киноа на 20 минут", "Варите 15 минут с солью", "Отварите нут", "Нарежьте овощи", "Соберите в боул и полейте соусом"], en: ["Rinse and soak quinoa 20 minutes", "Boil 15 minutes with salt", "Cook chickpeas", "Chop vegetables", "Assemble in a bowl and drizzle dressing"] },
  },
  {
    id: "grilled-chicken",
    recommendedSaladId: "spring-salad", recommendedSideId: "qora-non",
    image: "/food-chicken.jpg",
    categories: ["protein", "sport", "weightloss", "lunch"],
    name: { uz: "Grildagi tovuq", ru: "Курица на гриле", en: "Grilled Chicken" },
    short: { uz: "Kam yog'li protein manbai", ru: "Низкожировой источник белка", en: "Lean protein source" },
    calories: 165, protein: 31, fat: 3.6, carbs: 0, prepTime: 18, price: 1, healthScore: 92, rating: 4.7,
    vitamins: ["B3", "B6", "B12"], minerals: ["Selen", "Fosfor", "Kaliy"],
    description: {
      uz: "Tovuq ko'kragi — sportchilar va ozishni istaganlar uchun oltin standart. Yuqori protein, kam yog'. Marinadlash uchun kamida 30 daqiqa kerak — bu go'shtni yumshoq va mazali qiladi.",
      ru: "Куриная грудка — золотой стандарт для спортсменов и худеющих. Много белка, мало жира. Для маринования нужно минимум 30 минут — это делает мясо мягким.",
      en: "Chicken breast is the gold standard for athletes and dieters. High protein, low fat. Marinate at least 30 minutes for tender, juicy results.",
    },
    benefits: { uz: ["Mushak o'sishiga yordam", "To'qlik hissi", "Metabolizmni tezlashtiradi", "Arzon va foydali"], ru: ["Помогает росту мышц", "Чувство сытости", "Ускоряет метаболизм", "Доступно и полезно"], en: ["Supports muscle growth", "Keeps you full", "Boosts metabolism", "Affordable and healthy"] },
    forWhom: { uz: "Sportchilar, fitness ishqibozlari", ru: "Спортсмены, любители фитнеса", en: "Athletes, fitness lovers" },
    notForWhom: { uz: "Buyrak kasalligida ehtiyot bo'ling", ru: "Осторожно при болезнях почек", en: "Caution with kidney disease" },
    whenEat: { uz: "Tushlik yoki mashg'ulotdan keyin", ru: "Обед или после тренировки", en: "Lunch or post-workout" },
    dailyRec: { uz: "Kuniga 150–200g", ru: "150–200г в день", en: "150–200g per day" },
    storage: { uz: "Muzlatgichda 2 kun", ru: "В холодильнике 2 дня", en: "2 days in the fridge" },
    ingredients: { uz: ["Tovuq ko'kragi 200g", "Ziravorlar", "Zaytun moyi", "Broccoli", "Sarimsoq"], ru: ["Куриная грудка 200г", "Специи", "Оливковое масло", "Брокколи", "Чеснок"], en: ["Chicken breast 200g", "Spices", "Olive oil", "Broccoli", "Garlic"] },
    recipe: { uz: ["Tovuqni marinadlang", "Kamida 30 daqiqa ushlab turing", "Grilda 180°C da pishiring", "Broccolini bug'lang", "Birga tortib bering"], ru: ["Замаринуйте курицу", "Оставьте минимум на 30 минут", "Готовьте на гриле при 180°C", "Приготовьте брокколи на пару", "Подавайте вместе"], en: ["Marinate the chicken", "Rest for at least 30 minutes", "Grill at 180°C until cooked", "Steam the broccoli", "Serve together"] },
  },
  {
    id: "berry-oatmeal",
    image: "/food-oatmeal.jpg",
    categories: ["breakfast", "healthy"],
    name: { uz: "Rezavorli suli bo'tqasi", ru: "Овсянка с ягодами", en: "Berry Oatmeal" },
    short: { uz: "Ideal energiyali nonushta", ru: "Идеальный энергичный завтрак", en: "Ideal energizing breakfast" },
    calories: 220, protein: 8, fat: 5, carbs: 38, prepTime: 10, price: 1, healthScore: 90, rating: 4.8,
    vitamins: ["B1", "C", "E"], minerals: ["Magniy", "Temir", "Marganes"],
    description: {
      uz: "Suli bo'tqasi rezavorlar bilan — sekin uglevodlar va antioksidantlarga boy. Kun boshlash uchun mukammal. Eski suli donlarini kechasi suvda namlab qo'ying — nonushtani 5 daqiqada tayyorlay olasiz.",
      ru: "Овсянка с ягодами богата медленными углеводами и антиоксидантами. Идеальна для старта дня. Замочите хлопья с вечера — и завтрак готов за 5 минут.",
      en: "Oatmeal with berries is rich in slow carbs and antioxidants. Perfect to start the day. Soak oats overnight for a 5-minute morning breakfast.",
    },
    benefits: { uz: ["Uzoq energiya beradi", "Xolesterinni kamaytiradi", "Ichak salomatligi", "Diqqatni yaxshilaydi"], ru: ["Даёт долгую энергию", "Снижает холестерин", "Здоровье кишечника", "Улучшает концентрацию"], en: ["Long-lasting energy", "Lowers cholesterol", "Gut health", "Improves focus"] },
    forWhom: { uz: "Studentlar, bolalar, hamma", ru: "Студенты, дети, все", en: "Students, kids, everyone" },
    notForWhom: { uz: "Glyutenga chidamsizlar (bezovtalik)", ru: "Непереносимость глютена", en: "Gluten intolerance" },
    whenEat: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast" },
    dailyRec: { uz: "Ertalab 1 porsiya (250g)", ru: "Утром 1 порция (250г)", en: "1 morning serving (250g)" },
    storage: { uz: "Tayyorlab darhol iste'mol qiling", ru: "Употреблять сразу", en: "Best served fresh" },
    ingredients: { uz: ["Suli 60g", "Sut yoki suv", "Rezavorlar", "Asal", "Yong'oq"], ru: ["Овсянка 60г", "Молоко или вода", "Ягоды", "Мёд", "Орехи"], en: ["Oats 60g", "Milk or water", "Berries", "Honey", "Nuts"] },
    recipe: { uz: ["Sulini suyuqlikda qaynating", "5 daqiqa pishiring", "Asal qo'shing", "Rezavor va yong'oq soling", "Issiq holda bering"], ru: ["Отварите овсянку в жидкости", "Варите 5 минут", "Добавьте мёд", "Положите ягоды и орехи", "Подавайте горячей"], en: ["Boil oats in liquid", "Cook for 5 minutes", "Add honey", "Top with berries and nuts", "Serve warm"] },
  },
  {
    id: "green-salad",
    image: "/food-salad.jpg",
    categories: ["weightloss", "vegetarian", "healthy", "dinner"],
    name: { uz: "Yashil salat", ru: "Зелёный салат", en: "Green Salad" },
    short: { uz: "Yengil va vitaminga boy", ru: "Лёгкий и богатый витаминами", en: "Light and vitamin-rich" },
    calories: 95, protein: 3, fat: 6, carbs: 8, prepTime: 8, price: 1, healthScore: 98, rating: 4.6,
    vitamins: ["A", "C", "K"], minerals: ["Kaliy", "Folat", "Kaltsiy"],
    description: {
      uz: "Yangi ko'katlar, pomidor va urug'lardan tayyorlangan salat — minimal kaloriya, maksimal foyda. Salatni ovqatdan 20 daqiqa oldin yesangiz, asosiy taomni kamroq yeyisiz.",
      ru: "Салат из свежей зелени, томатов и семян — минимум калорий, максимум пользы. Если съесть за 20 минут до основного блюда — съедите меньше.",
      en: "A salad of fresh greens, tomatoes and seeds — minimum calories, maximum benefit. Eating 20 minutes before the main course reduces overall intake.",
    },
    benefits: { uz: ["Ozishga yordam beradi", "Terini yaxshilaydi", "Detoksikatsiya", "Suvni ushlab turadi"], ru: ["Помогает похудеть", "Улучшает кожу", "Детокс", "Удерживает воду"], en: ["Aids weight loss", "Improves skin", "Detox", "Keeps you hydrated"] },
    forWhom: { uz: "Ozishni istaganlar, vegetarianlar", ru: "Худеющие, вегетарианцы", en: "Dieters, vegetarians" },
    notForWhom: { uz: "Yolg'iz asosiy ovqat sifatida emas", ru: "Не как единственное блюдо", en: "Not as a sole main meal" },
    whenEat: { uz: "Kechki ovqat yoki garnir", ru: "Ужин или гарнир", en: "Dinner or side dish" },
    dailyRec: { uz: "Har kuni 1–2 porsiya", ru: "1–2 порции ежедневно", en: "1–2 servings daily" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat immediately" },
    ingredients: { uz: ["Salat bargi", "Pomidor", "Bodring", "Kungaboqar urug'i", "Zaytun moyi"], ru: ["Листья салата", "Томаты", "Огурец", "Семечки", "Оливковое масло"], en: ["Lettuce", "Tomatoes", "Cucumber", "Sunflower seeds", "Olive oil"] },
    recipe: { uz: ["Ko'katlarni yuving", "Sabzavotlarni to'g'rang", "Aralashtiring", "Urug' soling", "Moy va limon quying"], ru: ["Промойте зелень", "Нарежьте овощи", "Перемешайте", "Добавьте семечки", "Полейте маслом и лимоном"], en: ["Wash the greens", "Chop vegetables", "Mix together", "Add seeds", "Drizzle oil and lemon"] },
  },
  {
    id: "berry-smoothie",
    image: "/food-smoothie.jpg",
    categories: ["breakfast", "sport", "protein", "weightgain"],
    name: { uz: "Rezavor smoothie", ru: "Ягодный смузи", en: "Berry Smoothie" },
    short: { uz: "Tez va to'yimli energiya", ru: "Быстрая и сытная энергия", en: "Quick, filling energy" },
    calories: 280, protein: 15, fat: 6, carbs: 42, prepTime: 5, price: 2, healthScore: 88, rating: 4.9,
    vitamins: ["C", "B6", "K"], minerals: ["Kaliy", "Kaltsiy", "Magniy"],
    description: {
      uz: "Rezavorlar, banan va protein qo'shilgan smoothie — mashg'ulotdan oldin yoki keyin ajoyib tanlov. Smuzini 30 soniya blenderda aylantiring — uzog'rog'i yaxshi emas, havo pufaklari kiradi.",
      ru: "Смузи из ягод, банана и протеина — отличный выбор до или после тренировки. Взбивайте ровно 30 секунд — дольше — и появятся воздушные пузырьки.",
      en: "A smoothie of berries, banana and protein — great before or after a workout. Blend exactly 30 seconds — longer and you get air bubbles.",
    },
    benefits: { uz: ["Tez tiklanish", "Immunitetni kuchaytiradi", "Vazn olishga yordam", "Antioksidantlar"], ru: ["Быстрое восстановление", "Укрепляет иммунитет", "Помогает набрать вес", "Антиоксиданты"], en: ["Fast recovery", "Boosts immunity", "Supports weight gain", "Antioxidants"] },
    forWhom: { uz: "Sportchilar, studentlar", ru: "Спортсмены, студенты", en: "Athletes, students" },
    notForWhom: { uz: "Diabetda cheklang", ru: "Ограничить при диабете", en: "Limit if diabetic" },
    whenEat: { uz: "Nonushta yoki mashg'ulotdan keyin", ru: "Завтрак или после тренировки", en: "Breakfast or post-workout" },
    dailyRec: { uz: "Kuniga 1 stakan (300ml)", ru: "1 стакан в день (300мл)", en: "1 glass per day (300ml)" },
    storage: { uz: "Darhol iching", ru: "Пейте сразу", en: "Drink immediately" },
    ingredients: { uz: ["Rezavorlar", "Banan", "Yogurt", "Protein kukuni", "Asal"], ru: ["Ягоды", "Банан", "Йогурт", "Протеин", "Мёд"], en: ["Berries", "Banana", "Yogurt", "Protein powder", "Honey"] },
    recipe: { uz: ["Barcha masalliqni blenderga soling", "30 soniya aralashtiring", "Stakanga quying", "Rezavor bilan bezang", "Darhol iching"], ru: ["Сложите всё в блендер", "Взбивайте 30 секунд", "Налейте в стакан", "Украсьте ягодами", "Пейте сразу"], en: ["Add everything to a blender", "Blend for 30 seconds", "Pour into a glass", "Top with berries", "Drink immediately"] },
  },
  {
    id: "grilled-steak",
    recommendedSaladId: "achchiq-chuchuk", recommendedSideId: "garlic-bread",
    image: "/food-steak.jpg",
    categories: ["protein", "sport", "weightgain", "dinner"],
    name: { uz: "Grildagi bifshteks", ru: "Стейк на гриле", en: "Grilled Steak" },
    short: { uz: "Temir va proteinga boy premium go'sht", ru: "Премиальное мясо, богатое железом и белком", en: "Premium meat rich in iron and protein" },
    calories: 271, protein: 25, fat: 19, carbs: 2, prepTime: 22, price: 3, healthScore: 82, rating: 4.9,
    vitamins: ["B12", "B6", "B3"], minerals: ["Temir", "Rux", "Selen"],
    description: {
      uz: "Yumshoq mol go'shti bifshteks — mushak massasi va energiya uchun ideal. Grilda pishirilgan sabzavotlar bilan beriladi. Go'shtni pishirish oldidan xona haroratida 30 daqiqa ushlab turing — bu tashqi va ichki harorat farqini kamaytiradi.",
      ru: "Нежный говяжий стейк — идеален для набора мышечной массы и энергии. Подаётся с овощами на гриле. Перед приготовлением выдержите мясо 30 минут при комнатной температуре.",
      en: "Tender beef steak — ideal for muscle mass and energy. Served with grilled vegetables. Let meat rest 30 minutes at room temperature before cooking.",
    },
    benefits: { uz: ["Mushak o'sishi", "Qonsizlikka qarshi", "Energiya beradi", "Immunitetni mustahkamlaydi"], ru: ["Рост мышц", "Против анемии", "Даёт энергию", "Укрепляет иммунитет"], en: ["Muscle growth", "Fights anemia", "Boosts energy", "Strengthens immunity"] },
    forWhom: { uz: "Sportchilar, vazn olmoqchilar", ru: "Спортсмены, набирающие вес", en: "Athletes, those gaining weight" },
    notForWhom: { uz: "Podagra va yurak kasalliklarida cheklang", ru: "Ограничить при подагре и болезнях сердца", en: "Limit with gout and heart disease" },
    whenEat: { uz: "Kechki ovqat", ru: "Ужин", en: "Dinner" },
    dailyRec: { uz: "Haftasiga 2 marta, 200g", ru: "2 раза в неделю, 200г", en: "2 times a week, 200g" },
    storage: { uz: "Muzlatgichda 2 kun", ru: "В холодильнике 2 дня", en: "2 days in the fridge" },
    ingredients: { uz: ["Mol go'shti 250g", "Rozmarin", "Sarimsoq", "Zaytun moyi", "Sabzavotlar"], ru: ["Говядина 250г", "Розмарин", "Чеснок", "Оливковое масло", "Овощи"], en: ["Beef 250g", "Rosemary", "Garlic", "Olive oil", "Vegetables"] },
    recipe: { uz: ["Go'shtni xona haroratida 30 daqiqa ushlab turing", "Tuz va qalampir seping", "Qaynoq grilda pishiring", "5 daqiqa dam bering", "Sabzavot bilan bering"], ru: ["Выдержите мясо 30 минут при комнатной температуре", "Посолите и поперчите", "Обжарьте на горячем гриле", "Дайте отдохнуть 5 минут", "Подавайте с овощами"], en: ["Rest meat 30 minutes at room temperature", "Season with salt and pepper", "Sear on a hot grill", "Rest for 5 minutes", "Serve with vegetables"] },
  },
  {
    id: "sushi-platter",
    image: "/food-sushi.jpg",
    categories: ["healthy", "protein", "lunch", "dinner"],
    name: { uz: "Sushi to'plami", ru: "Сет суши", en: "Sushi Platter" },
    short: { uz: "Yengil va nafis premium taom", ru: "Лёгкое и изысканное премиум блюдо", en: "Light and refined premium dish" },
    calories: 190, protein: 9, fat: 5, carbs: 28, prepTime: 30, price: 3, healthScore: 89, rating: 4.9,
    vitamins: ["B12", "D", "A"], minerals: ["Yod", "Omega-3", "Magniy"],
    description: {
      uz: "Yangi losos, avokado va guruch bilan tayyorlangan sushi to'plami — dengiz mahsulotlarining nafis uyg'unligi. Guruchni pishirishda bir oz sirke va shakar qo'shsangiz — sushi guruchi kerakli ta'mni oladi.",
      ru: "Сет суши со свежим лососем, авокадо и рисом — изысканное сочетание морепродуктов. Добавьте немного уксуса и сахара при варке риса для правильного вкуса.",
      en: "A sushi set with fresh salmon, avocado and rice — a refined seafood combination. Add a little rice vinegar and sugar during cooking for the right flavour.",
    },
    benefits: { uz: ["Omega-3 manbai", "Kam kaloriyali", "Miya uchun foydali", "Yengil hazm bo'ladi"], ru: ["Источник Omega-3", "Низкокалорийно", "Полезно для мозга", "Легко усваивается"], en: ["Source of Omega-3", "Low calorie", "Good for the brain", "Easy to digest"] },
    forWhom: { uz: "Sog'lom ovqatlanuvchilar", ru: "Приверженцы ЗОЖ", en: "Healthy-eating fans" },
    notForWhom: { uz: "Homilador ayollar (xom baliq)", ru: "Беременные (сырая рыба)", en: "Pregnant women (raw fish)" },
    whenEat: { uz: "Tushlik yoki kechki ovqat", ru: "Обед или ужин", en: "Lunch or dinner" },
    dailyRec: { uz: "Haftasiga 1–2 marta", ru: "1–2 раза в неделю", en: "1–2 times a week" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat fresh" },
    ingredients: { uz: ["Losos", "Guruch", "Avokado", "Nori", "Soya sousi"], ru: ["Лосось", "Рис", "Авокадо", "Нори", "Соевый соус"], en: ["Salmon", "Rice", "Avocado", "Nori", "Soy sauce"] },
    recipe: { uz: ["Guruchni pishiring va sirke bilan aralashtiring", "Nori ustiga yoying", "Masalliqni joylang", "Rulon qiling", "Bo'laklarga kesing"], ru: ["Отварите рис и смешайте с уксусом", "Разложите на нори", "Выложите начинку", "Сверните рулет", "Нарежьте на кусочки"], en: ["Cook rice and mix with vinegar", "Spread over nori", "Add filling", "Roll it up", "Cut into pieces"] },
  },
  {
    id: "avocado-toast",
    image: "/food-avocado-toast.jpg",
    categories: ["breakfast", "vegetarian", "healthy"],
    name: { uz: "Avokadoli tost", ru: "Тост с авокадо", en: "Avocado Toast" },
    short: { uz: "Foydali yog'larga boy nonushta", ru: "Завтрак, богатый полезными жирами", en: "Breakfast rich in healthy fats" },
    calories: 250, protein: 10, fat: 15, carbs: 22, prepTime: 10, price: 2, healthScore: 91, rating: 4.8,
    vitamins: ["E", "K", "B9"], minerals: ["Kaliy", "Magniy", "Folat"],
    description: {
      uz: "Bug'doy nonidagi avokado va qaynatilgan tuxum — sog'lom yog'lar va protein bilan kuchli nonushta. Avokadoni limon suvida ezib qo'ying — rangi to'q bo'lmaydi va ta'mi yanada yaxshi bo'ladi.",
      ru: "Авокадо и яйцо-пашот на цельнозерновом хлебе — мощный завтрак. Разомните авокадо с лимонным соком — не потемнеет и вкус лучше.",
      en: "Avocado and poached egg on whole-grain bread — a powerful breakfast. Mash avocado with lemon juice — stays green and tastes better.",
    },
    benefits: { uz: ["Uzoq to'qlik", "Yurak salomatligi", "Terini yaxshilaydi", "Energiya beradi"], ru: ["Долгая сытость", "Здоровье сердца", "Улучшает кожу", "Даёт энергию"], en: ["Long fullness", "Heart health", "Improves skin", "Gives energy"] },
    forWhom: { uz: "Hamma, studentlar", ru: "Все, студенты", en: "Everyone, students" },
    notForWhom: { uz: "Glyutenga chidamsizlar", ru: "Непереносимость глютена", en: "Gluten intolerance" },
    whenEat: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast" },
    dailyRec: { uz: "Ertalab 1 porsiya", ru: "1 порция утром", en: "1 morning serving" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat fresh" },
    ingredients: { uz: ["Bug'doy noni", "Avokado", "Tuxum", "Urug'lar", "Limon"], ru: ["Цельнозерновой хлеб", "Авокадо", "Яйцо", "Семена", "Лимон"], en: ["Whole-grain bread", "Avocado", "Egg", "Seeds", "Lemon"] },
    recipe: { uz: ["Nonni qizdiring", "Avokadoni limon bilan ezing", "Non ustiga yoying", "Tuxumni qaynating", "Urug' seping"], ru: ["Подрумяньте хлеб", "Разомните авокадо с лимоном", "Намажьте на хлеб", "Приготовьте яйцо", "Посыпьте семенами"], en: ["Toast the bread", "Mash avocado with lemon", "Spread on bread", "Poach the egg", "Sprinkle seeds"] },
  },
  {
    id: "lentil-soup",
    recommendedSideId: "qora-non",
    prepMethod: { uz: "Qaynatib pishirilgan", ru: "Вареный", en: "Boiled" },
    image: "/food-soup.jpg",
    categories: ["healthy", "vegetarian", "weightloss", "lunch", "dinner"],
    name: { uz: "Yasmiq sho'rvasi", ru: "Чечевичный суп", en: "Lentil Soup" },
    short: { uz: "Isituvchi va to'yimli sho'rva", ru: "Согревающий и сытный суп", en: "Warming and filling soup" },
    calories: 180, protein: 12, fat: 4, carbs: 28, prepTime: 35, price: 1, healthScore: 95, rating: 4.7,
    vitamins: ["B1", "B6", "B9"], minerals: ["Temir", "Magniy", "Kaliy"],
    description: {
      uz: "Yasmiq va sabzavotlardan tayyorlangan sho'rva — o'simlik proteini va tolaga juda boy. Yasmiqni oldindan ivitib qo'yish shart emas — lekin ivitsangiz, 25 daqiqa o'rniga 15 daqiqada pishadi.",
      ru: "Суп из чечевицы и овощей — очень богат растительным белком и клетчаткой. Замачивать не обязательно, но если замочить — варится 15 минут вместо 25.",
      en: "A soup of lentils and vegetables — very rich in plant protein and fiber. No soaking needed, but if soaked it cooks in 15 minutes instead of 25.",
    },
    benefits: { uz: ["Uzoq to'qlik", "Hazmni yaxshilaydi", "Qonsizlikka qarshi", "Ozishga yordam"], ru: ["Долгая сытость", "Улучшает пищеварение", "Против анемии", "Помогает похудеть"], en: ["Long fullness", "Improves digestion", "Fights anemia", "Aids weight loss"] },
    forWhom: { uz: "Vegetarianlar, ozuvchilar", ru: "Вегетарианцы, худеющие", en: "Vegetarians, dieters" },
    notForWhom: { uz: "Meteorizmga moyillar (ehtiyot)", ru: "Склонные к метеоризму (осторожно)", en: "Prone to bloating (caution)" },
    whenEat: { uz: "Tushlik yoki kechki ovqat", ru: "Обед или ужин", en: "Lunch or dinner" },
    dailyRec: { uz: "Kuniga 1 kosa (300ml)", ru: "1 миска в день (300мл)", en: "1 bowl per day (300ml)" },
    storage: { uz: "Muzlatgichda 3 kun", ru: "В холодильнике 3 дня", en: "3 days in the fridge" },
    ingredients: { uz: ["Yasmiq 150g", "Sabzi", "Piyoz", "Sarimsoq", "Ko'katlar"], ru: ["Чечевица 150г", "Морковь", "Лук", "Чеснок", "Зелень"], en: ["Lentils 150g", "Carrot", "Onion", "Garlic", "Greens"] },
    recipe: { uz: ["Sabzavotlarni qovuring", "Yasmiq va suv qo'shing", "25 daqiqa qaynating", "Ziravor soling", "Ko'kat bilan bering"], ru: ["Обжарьте овощи", "Добавьте чечевицу и воду", "Варите 25 минут", "Добавьте специи", "Подавайте с зеленью"], en: ["Sauté the vegetables", "Add lentils and water", "Simmer for 25 minutes", "Add spices", "Serve with greens"] },
  },
  {
    id: "chicken-wrap",
    image: "/food-wrap.jpg",
    categories: ["fast", "protein", "lunch"],
    name: { uz: "Tovuqli wrap", ru: "Ролл с курицей", en: "Chicken Wrap" },
    short: { uz: "Tez va to'yimli protein taom", ru: "Быстрое и сытное белковое блюдо", en: "Quick and filling protein meal" },
    calories: 320, protein: 24, fat: 11, carbs: 32, prepTime: 12, price: 2, healthScore: 84, rating: 4.7,
    vitamins: ["B3", "B6", "C"], minerals: ["Fosfor", "Kaliy", "Selen"],
    description: {
      uz: "Grilda pishirilgan tovuq, yangi sabzavotlar va sous bilan lavash roll — tez tushlik uchun ideal. Lavashni 30 soniya mikroto'lqinli pechda qizdiring — o'rash osonroq bo'ladi va yirtilmaydi.",
      ru: "Ролл из лаваша с курицей на гриле, свежими овощами и соусом. Подогрейте лаваш 30 секунд в микроволновке — легче свернуть и не порвётся.",
      en: "A flatbread wrap with fresh vegetables and sauce. Microwave lavash 30 seconds — easier to roll without tearing.",
    },
    benefits: { uz: ["Tez energiya", "Protein manbai", "To'yimli", "Qulay"], ru: ["Быстрая энергия", "Источник белка", "Сытно", "Удобно"], en: ["Quick energy", "Protein source", "Filling", "Convenient"] },
    forWhom: { uz: "Studentlar, band odamlar", ru: "Студенты, занятые люди", en: "Students, busy people" },
    notForWhom: { uz: "Qattiq dieta ustidagilar", ru: "На строгой диете", en: "Those on a strict diet" },
    whenEat: { uz: "Tushlik", ru: "Обед", en: "Lunch" },
    dailyRec: { uz: "Kuniga 1 dona", ru: "1 штука в день", en: "1 piece per day" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat fresh" },
    ingredients: { uz: ["Lavash", "Tovuq filesi", "Salat", "Pomidor", "Yogurt sousi"], ru: ["Лаваш", "Куриное филе", "Салат", "Помидор", "Йогуртовый соус"], en: ["Flatbread", "Chicken fillet", "Lettuce", "Tomato", "Yogurt sauce"] },
    recipe: { uz: ["Tovuqni pishiring", "Lavashni issiq qiling", "Sabzavot joylang", "Sous quying", "Rulon qilib o'rang"], ru: ["Приготовьте курицу", "Подогрейте лаваш", "Выложите овощи", "Полейте соусом", "Сверните ролл"], en: ["Cook the chicken", "Warm the flatbread", "Add vegetables", "Drizzle sauce", "Roll it up"] },
  },
  {
    id: "berry-parfait",
    image: "/food-parfait.jpg",
    categories: ["breakfast", "healthy"],
    name: { uz: "Rezavor parfe", ru: "Ягодный парфе", en: "Berry Parfait" },
    short: { uz: "Yogurt, granola va rezavor", ru: "Йогурт, гранола и ягоды", en: "Yogurt, granola and berries" },
    calories: 210, protein: 11, fat: 6, carbs: 30, prepTime: 5, price: 1, healthScore: 90, rating: 4.8,
    vitamins: ["C", "B2", "D"], minerals: ["Kaltsiy", "Kaliy", "Fosfor"],
    description: {
      uz: "Grek yogurti, xrustli granola, yangi rezavor va asal qatlamlari — mazali va foydali nonushta. Granolani yogurt ustiga joylashdan oldin sal qizdiring — xrustlilik uzoq saqlanadi.",
      ru: "Слои греческого йогурта, хрустящей гранолы, свежих ягод и мёда. Слегка обжарьте гранолу перед укладкой — хруст дольше сохранится.",
      en: "Layers of Greek yogurt, crunchy granola, fresh berries and honey. Lightly toast granola before layering — crunchiness lasts longer.",
    },
    benefits: { uz: ["Ichak salomatligi", "Kaltsiy manbai", "Antioksidantlar", "Yengil energiya"], ru: ["Здоровье кишечника", "Источник кальция", "Антиоксиданты", "Лёгкая энергия"], en: ["Gut health", "Calcium source", "Antioxidants", "Light energy"] },
    forWhom: { uz: "Bolalar, studentlar", ru: "Дети, студенты", en: "Kids, students" },
    notForWhom: { uz: "Laktozaga chidamsizlar", ru: "Непереносимость лактозы", en: "Lactose intolerance" },
    whenEat: { uz: "Nonushta yoki gazak", ru: "Завтрак или перекус", en: "Breakfast or snack" },
    dailyRec: { uz: "Kuniga 1 stakan", ru: "1 стакан в день", en: "1 glass per day" },
    storage: { uz: "Muzlatgichda 1 kun", ru: "В холодильнике 1 день", en: "1 day in the fridge" },
    ingredients: { uz: ["Grek yogurti", "Granola", "Rezavorlar", "Asal", "Yong'oq"], ru: ["Греческий йогурт", "Гранола", "Ягоды", "Мёд", "Орехи"], en: ["Greek yogurt", "Granola", "Berries", "Honey", "Nuts"] },
    recipe: { uz: ["Stakan tubiga yogurt soling", "Granola qo'shing", "Rezavor joylang", "Qatlamlarni takrorlang", "Asal quying"], ru: ["Налейте йогурт на дно стакана", "Добавьте гранолу", "Выложите ягоды", "Повторите слои", "Полейте мёдом"], en: ["Add yogurt to the bottom", "Add granola", "Layer berries", "Repeat layers", "Drizzle honey"] },
  },

  // ─── O'ZBEK MILLIY TAOMLAR ────────────────────────────────────────────────
  {
    id: "uzbek-plov",
    recommendedSaladId: "achchiq-chuchuk", recommendedSideId: "qora-non",
    prepMethod: { uz: "Qovurib pishirilgan", ru: "Жареный и тушеный", en: "Fried and stewed" },
    image: "/food-plov.jpg",
    categories: ["uzbek", "protein", "lunch", "dinner"],
    name: { uz: "O'zbek plovi", ru: "Узбекский плов", en: "Uzbek Plov (Pilaf)" },
    short: { uz: "An'anaviy o'zbek milliy taomi", ru: "Традиционное узбекское национальное блюдо", en: "Traditional Uzbek national dish" },
    calories: 480, protein: 22, fat: 18, carbs: 58, prepTime: 90, price: 2, healthScore: 78, rating: 5.0,
    vitamins: ["B1", "B6", "B12"], minerals: ["Temir", "Rux", "Magniy"],
    description: {
      uz: "O'zbek plovi — guruch, qo'y go'shti, sabzi va piyozdan tayyorlangan milliy taom. Qazonning pastida dev'zira guruchini 20 daqiqa suvda namlab, keyin zirvakning ustida bug'da pishiring — donlar bir-biridan ajralib turadi.",
      ru: "Узбекский плов из риса, баранины, моркови и лука. Замочите рис девзира на 20 минут, затем варите на пару над зирваком — зёрна получатся рассыпчатыми.",
      en: "Uzbek plov made with rice, lamb, carrots and onions. Soak devzira rice 20 minutes, then steam over the zirvak — grains stay separate and fluffy.",
    },
    benefits: {
      uz: ["Uzoq to'qlik", "Temir beradi", "Energiya manbai", "Milliy an'ana"],
      ru: ["Долгое чувство сытости", "Источник железа", "Даёт энергию", "Национальная традиция"],
      en: ["Long-lasting fullness", "Iron source", "Energy boost", "National tradition"],
    },
    forWhom: { uz: "Hamma, ayniqsa faol hayot kechiruvchilar", ru: "Все, особенно активные люди", en: "Everyone, especially active people" },
    notForWhom: { uz: "Dieta va semizlikda kamaytiring", ru: "Уменьшить при диете и ожирении", en: "Reduce portions when dieting" },
    whenEat: { uz: "Tushlik (juma va bayram kuni)", ru: "Обед (пятница и праздники)", en: "Lunch (Fridays and celebrations)" },
    dailyRec: { uz: "Haftasiga 1–2 marta, 300g", ru: "1–2 раза в неделю, 300г", en: "1–2 times a week, 300g" },
    storage: { uz: "Muzlatgichda 2 kun, qayta qizdiring", ru: "В холодильнике 2 дня, разогревать", en: "2 days refrigerated, reheat before serving" },
    ingredients: {
      uz: ["Dev'zira guruch 1 kg", "Qo'y go'shti 500g", "Sariq sabzi 500g", "Piyoz 3 dona", "Sarimsoq boshi", "Zira", "O'simlik moyi 200ml"],
      ru: ["Рис девзира 1 кг", "Баранина 500г", "Жёлтая морковь 500г", "Лук 3 шт.", "Головка чеснока", "Зира", "Растительное масло 200мл"],
      en: ["Devzira rice 1kg", "Lamb 500g", "Yellow carrot 500g", "Onions x3", "Garlic head", "Cumin", "Vegetable oil 200ml"],
    },
    recipe: {
      uz: ["Guruchni 20 daqiqa suvda namlang", "Qozonda moy qizdiring, piyoz qovuring", "Go'shtni qo'shing va qizilig'ini oling", "Sabzi va zira soling, qovuring", "Guruch va suv qo'shib, qopqoq ostida 40 daqiqa damlab pishiring", "Sarimsoq boshini o'rtasiga tiqing", "Donlarni aralashtirmasdan tortib bering"],
      ru: ["Замочите рис на 20 минут", "Раскалите масло в казане, обжарьте лук", "Добавьте мясо, жарьте до корочки", "Добавьте морковь и зиру, жарьте", "Добавьте рис и воду, томите под крышкой 40 минут", "Вставьте головку чеснока в середину", "Подавайте не перемешивая"],
      en: ["Soak rice 20 minutes", "Heat oil in kazan, fry onions", "Add lamb and brown it", "Add carrot and cumin, sauté", "Add rice and water, steam under lid 40 minutes", "Insert garlic head in center", "Serve without stirring"],
    },
  },
  {
    id: "uzbek-manti",
    recommendedSaladId: "spring-salad", recommendedSideId: "green-tea-lemon",
    image: "/food-manti.jpg",
    categories: ["uzbek", "protein", "lunch", "dinner"],
    name: { uz: "O'zbek mantisi", ru: "Узбекские манты", en: "Uzbek Manti (Dumplings)" },
    short: { uz: "Go'shtli bug'da pishirilgan hamirli taom", ru: "Мясные паровые пельмени", en: "Steamed meat dumplings" },
    calories: 350, protein: 18, fat: 14, carbs: 38, prepTime: 60, price: 2, healthScore: 75, rating: 4.9,
    vitamins: ["B1", "B3", "B6"], minerals: ["Fosfor", "Kaliy", "Selen"],
    description: {
      uz: "Manti — nozik xamirga o'ralgan go'sht va piyozdan iborat taom. Bug'da 45 daqiqa pishiriladi. Hamir qalinligi 2mm dan oshmasin — bug' osonroq kiradi va ichki go'shtni tez pishiradi. Piyozni ko'p soling — shira hosil bo'ladi.",
      ru: "Манты — тесто с мясом и луком, приготовленные на пару 45 минут. Тесто не толще 2мм — пар проникает лучше. Лука кладите больше — будет сочнее.",
      en: "Manti — thin dough filled with meat and onion, steamed 45 minutes. Keep dough under 2mm — steam penetrates better. Use plenty of onion for juiciness.",
    },
    benefits: {
      uz: ["Yuqori protein", "Bug'da pishiriladi — yog' kam", "To'yimli", "Hazm qilish uchun yengil"],
      ru: ["Высокий белок", "Приготовлено на пару — мало жира", "Сытно", "Легко усваивается"],
      en: ["High protein", "Steamed — low fat", "Very filling", "Easy to digest"],
    },
    forWhom: { uz: "Oila uchun, bolalar, hamma", ru: "Для семьи, детей, всех", en: "Family, kids, everyone" },
    notForWhom: { uz: "Gluten intoleransi bo'lganlar", ru: "Непереносимость глютена", en: "Gluten intolerance" },
    whenEat: { uz: "Tushlik yoki kechki ovqat", ru: "Обед или ужин", en: "Lunch or dinner" },
    dailyRec: { uz: "4–6 dona (1 porsiya)", ru: "4–6 штук (1 порция)", en: "4–6 pieces (1 serving)" },
    storage: { uz: "Muzlatgichda 3 kun yoki muzlatib 1 oy", ru: "В холодильнике 3 дня или заморозить на 1 месяц", en: "3 days refrigerated or freeze 1 month" },
    ingredients: {
      uz: ["Un 500g", "Suv 200ml", "Qo'y go'shti 400g", "Piyoz 3 dona", "Zira", "Tuz, qalampir", "Kaymak yoki qatiq (bering uchun)"],
      ru: ["Мука 500г", "Вода 200мл", "Баранина 400г", "Лук 3 шт.", "Зира", "Соль, перец", "Сметана или катык (для подачи)"],
      en: ["Flour 500g", "Water 200ml", "Lamb 400g", "Onion x3", "Cumin", "Salt, pepper", "Sour cream or katyk (to serve)"],
    },
    recipe: {
      uz: ["Hamirni yumshoq qorib 30 daqiqa dam bering", "Go'shtni mayda to'g'rang, piyoz va zira bilan aralashtiring", "Hamirni 2mm ga yozib to'g'ri burchakli bo'laklarga keling", "O'rtasiga go'sht solib, manty shakliga keltiring", "Moy bilan moylangan manti pechaga soling", "45 daqiqa bug'da pishiring", "Qatiq yoki kaymak bilan bering"],
      ru: ["Замесите мягкое тесто, дайте отдохнуть 30 минут", "Мелко нарежьте мясо, смешайте с луком и зирой", "Раскатайте тесто 2мм, нарежьте на квадраты", "Положите мясо, сформируйте манты", "Положите в смазанную маслом мантышницу", "Готовьте на пару 45 минут", "Подавайте с катыком или сметаной"],
      en: ["Knead soft dough, rest 30 minutes", "Finely chop meat, mix with onion and cumin", "Roll dough 2mm, cut into squares", "Fill with meat and shape the manti", "Place in oiled steamer", "Steam 45 minutes", "Serve with katyk or sour cream"],
    },
  },
  {
    id: "uzbek-lagman",
    recommendedSaladId: "achchiq-chuchuk", recommendedSideId: "qora-non",
    image: "/food-lagman.jpg",
    categories: ["uzbek", "protein", "lunch"],
    name: { uz: "Lag'mon", ru: "Лагман", en: "Lagman" },
    short: { uz: "Qo'lda cho'zilgan quyuq sho'rva", ru: "Густой суп с тянутой лапшой", en: "Thick pulled-noodle soup" },
    calories: 420, protein: 24, fat: 16, carbs: 48, prepTime: 50, price: 2, healthScore: 80, rating: 4.8,
    vitamins: ["B12", "C", "A"], minerals: ["Temir", "Kaliy", "Magniy"],
    description: {
      uz: "Lag'mon — qo'lda cho'zilgan makaron, go'sht va sabzavot sousidir. Masalliqni qovurishdan oldin barcha sabzavotlarni teng o'lchamda to'g'rang — bir xil pishadi. Vaja (sous) tayyor bo'lgach makaron ustiga quyiladi.",
      ru: "Лагман — тянутая лапша ручной работы с мясом и овощным соусом. Нарежьте все овощи одинакового размера — пропарятся равномерно. Ваджу наливают поверх лапши.",
      en: "Lagman — hand-pulled noodles with meat and vegetable sauce. Cut vegetables same size for even cooking. Pour vaja sauce over noodles when serving.",
    },
    benefits: {
      uz: ["Barcha ozuqa qiymatlari", "Vitamin kompleksi", "Uzoq to'qlik", "Kuch beradi"],
      ru: ["Полный набор питательных веществ", "Витаминный комплекс", "Долгая сытость", "Даёт силы"],
      en: ["Complete nutrition", "Vitamin complex", "Long-lasting fullness", "Energising"],
    },
    forWhom: { uz: "Hamma, ayniqsa sport bilan shug'ullanuvchilar", ru: "Все, особенно занимающиеся спортом", en: "Everyone, especially athletes" },
    notForWhom: { uz: "Glyutenga chidamsizlar", ru: "Непереносимость глютена", en: "Gluten intolerance" },
    whenEat: { uz: "Tushlik", ru: "Обед", en: "Lunch" },
    dailyRec: { uz: "Haftasiga 2–3 marta, 1 kosa", ru: "2–3 раза в неделю, 1 миска", en: "2–3 times a week, 1 bowl" },
    storage: { uz: "Makaron va sous alohida saqlang, muzlatgichda 2 kun", ru: "Лапшу и соус храните отдельно, в холодильнике 2 дня", en: "Store noodles and sauce separately, refrigerated 2 days" },
    ingredients: {
      uz: ["Un 500g", "Qo'y go'shti 400g", "Bolgar qalampiri", "Pomidor 3 dona", "Piyoz", "Sabzi", "Baqlajon", "Sarimsoq", "Zira, tuz, qalampir"],
      ru: ["Мука 500г", "Баранина 400г", "Болгарский перец", "Томаты 3 шт.", "Лук", "Морковь", "Баклажан", "Чеснок", "Зира, соль, перец"],
      en: ["Flour 500g", "Lamb 400g", "Bell pepper", "Tomatoes x3", "Onion", "Carrot", "Eggplant", "Garlic", "Cumin, salt, pepper"],
    },
    recipe: {
      uz: ["Hamirni yoğib ipga cho'zing va 5–7 daqiqa qaynating", "Go'shtni kubikka keling va qovuring", "Piyoz, sabzi, qalampir qo'shing", "Pomidor va baqlajon soling", "Suv qo'shib 20 daqiqa qaynating (vaja tayyor)", "Makaron kosaga soling, ustidan vaja quying", "Ko'kat va sirke bilan bering"],
      ru: ["Замесите тесто, вытяните в нити и варите 5–7 минут", "Нарежьте мясо кубиком и обжарьте", "Добавьте лук, морковь, перец", "Добавьте томаты и баклажан", "Добавьте воду, тушите 20 минут (ваджа готова)", "Положите лапшу в миску, полейте ваджой", "Подавайте с зеленью и уксусом"],
      en: ["Knead dough, pull into noodles and boil 5–7 minutes", "Dice meat and fry", "Add onion, carrot, pepper", "Add tomatoes and eggplant", "Add water and simmer 20 minutes (vaja ready)", "Put noodles in bowl, pour vaja over", "Serve with greens and vinegar"],
    },
  },
  {
    id: "uzbek-samsa",
    recommendedSaladId: "achchiq-chuchuk", recommendedSideId: "green-tea-lemon",
    image: "/food-samsa.jpg",
    categories: ["uzbek", "fast", "breakfast"],
    name: { uz: "Tandirli samsa", ru: "Самса тандырная", en: "Tandoor Samsa" },
    short: { uz: "Krujkali tandir ko'machi", ru: "Слоёное тандырное тесто с мясом", en: "Flaky tandoor pastry with meat" },
    calories: 380, protein: 16, fat: 20, carbs: 36, prepTime: 45, price: 1, healthScore: 68, rating: 4.8,
    vitamins: ["B1", "B3", "B6"], minerals: ["Fosfor", "Temir", "Selen"],
    description: {
      uz: "Samsa — yupqa krujkali xamirga o'ralgan go'shtli pishiriq. Uchburchak shaklda yasaladi. Xamirni sovuq moy bilan qorib, muzlatgichda 20 daqiqa saqlasangiz — qatlamlar aniq ajraladi. Tandir issiqligida 20 daqiqada pishadi.",
      ru: "Самса — слоёное тесто с мясом треугольной формы. Замешайте тесто с холодным маслом, поставьте в холодильник на 20 минут — слои выйдут чёткими. В тандыре печётся 20 минут.",
      en: "Samsa — flaky pastry filled with meat, triangular shape. Mix dough with cold butter, refrigerate 20 minutes — layers become distinct. Bakes in tandoor 20 minutes.",
    },
    benefits: {
      uz: ["Tez to'yadi", "Ko'chma taom", "Issiq holda ta'mli", "Protein manbai"],
      ru: ["Быстро насыщает", "Портативная еда", "Вкусна горячей", "Источник белка"],
      en: ["Quick satiety", "Portable food", "Delicious hot", "Protein source"],
    },
    forWhom: { uz: "Studentlar, yoqimli gazak istovchilar", ru: "Студенты, любители вкусного перекуса", en: "Students, those wanting a tasty snack" },
    notForWhom: { uz: "Qovurilgan ovqatni cheklayotganlar", ru: "Ограничивающие жареную пищу", en: "Those limiting fried foods" },
    whenEat: { uz: "Nonushta yoki gazak", ru: "Завтрак или перекус", en: "Breakfast or snack" },
    dailyRec: { uz: "1–2 dona (kuniga), oz-oz iste'mol qiling", ru: "1–2 шт. в день, в меру", en: "1–2 pieces daily, in moderation" },
    storage: { uz: "Muzlatgichda 2 kun, qayta qizdiring", ru: "В холодильнике 2 дня, разогреть", en: "2 days refrigerated, reheat" },
    ingredients: {
      uz: ["Moy qatlamli xamir", "Qo'y go'shti 400g", "Piyoz 3 dona", "Zira, tuz, qalampir", "Tuxum (sirti uchun)", "Kunjut urug'i"],
      ru: ["Слоёное тесто", "Баранина 400г", "Лук 3 шт.", "Зира, соль, перец", "Яйцо (для смазки)", "Семена кунжута"],
      en: ["Flaky pastry dough", "Lamb 400g", "Onion x3", "Cumin, salt, pepper", "Egg (for glazing)", "Sesame seeds"],
    },
    recipe: {
      uz: ["Hamirni sovuq moy bilan qorib, 20 daqiqa sovuting", "Go'shtni mayda to'g'rang, piyoz va zira qo'shing", "Hamirni yupqa yozing, uchburchaklarga keling", "Har bir uchburchakka go'sht soling va yopib qo'ying", "Ustiga tuxum surtib kunjut seping", "220°C da 20 daqiqa pishiring yoki tandiriga yopishing"],
      ru: ["Замешайте тесто с холодным маслом, охладите 20 минут", "Мелко нарежьте мясо, смешайте с луком и зирой", "Раскатайте тесто, нарежьте треугольниками", "В каждый треугольник положите мясо, защипните", "Смажьте яйцом, посыпьте кунжутом", "Выпекайте при 220°C 20 минут или в тандыре"],
      en: ["Mix dough with cold butter, chill 20 minutes", "Finely chop meat with onion and cumin", "Roll dough, cut into triangles", "Fill each triangle, seal edges", "Brush with egg, sprinkle sesame", "Bake at 220°C for 20 minutes or in tandoor"],
    },
  },

  // ─── TURK TAOMLAR ────────────────────────────────────────────────────────
  {
    id: "adana-kebab",
    recommendedSaladId: "achchiq-chuchuk", recommendedSideId: "qora-non",
    image: "/food-adana-kebab.jpg",
    categories: ["protein", "dinner", "sport"],
    name: { uz: "Adana kebab", ru: "Адана кебаб", en: "Adana Kebab" },
    short: { uz: "O't-qo'shimchali turk kebabi", ru: "Турецкий кебаб с зеленью", en: "Spiced Turkish lamb kebab" },
    calories: 340, protein: 28, fat: 22, carbs: 8, prepTime: 25, price: 2, healthScore: 81, rating: 4.9,
    vitamins: ["B12", "B6", "B3"], minerals: ["Temir", "Rux", "Selen"],
    description: {
      uz: "Adana kebab — maydalangan qo'y go'shti va qo'ziqorindan tayyorlangan turk kebabi. Go'shtni 1 soat muzlatgichda ushlab turing — shashlikga yaxshiroq yopishadi. Grilda 180°C da 12–15 daqiqa pishiring.",
      ru: "Адана кебаб — турецкий кебаб из рубленой баранины и специй. Охладите мясо 1 час в холодильнике — лучше держится на шпажке. Готовьте на гриле при 180°C 12–15 минут.",
      en: "Adana kebab — Turkish kebab of minced lamb and spices. Chill meat 1 hour — holds better on the skewer. Grill at 180°C for 12–15 minutes.",
    },
    benefits: {
      uz: ["Yuqori protein", "Temir beradi", "Mushak uchun foydali", "Tez hazm bo'ladi"],
      ru: ["Высокий белок", "Источник железа", "Полезен для мышц", "Быстро усваивается"],
      en: ["High protein", "Iron source", "Great for muscles", "Digests quickly"],
    },
    forWhom: { uz: "Go'sht sevuvchilar, sportchilar", ru: "Любители мяса, спортсмены", en: "Meat lovers, athletes" },
    notForWhom: { uz: "Yuqori kolesterin bor odamlar", ru: "При высоком холестерине", en: "High cholesterol concerns" },
    whenEat: { uz: "Kechki ovqat", ru: "Ужин", en: "Dinner" },
    dailyRec: { uz: "Haftasiga 2 marta, 200g", ru: "2 раза в неделю, 200г", en: "2 times a week, 200g" },
    storage: { uz: "Muzlatgichda 2 kun", ru: "В холодильнике 2 дня", en: "2 days refrigerated" },
    ingredients: {
      uz: ["Qo'y go'shti (yog'li) 500g", "Piyoz", "Sarimsoq", "Qizil qalampir", "Zira", "Maydanoz", "Tuz", "Lavash va pomidor (bering uchun)"],
      ru: ["Жирная баранина 500г", "Лук", "Чеснок", "Красный перец", "Зира", "Петрушка", "Соль", "Лаваш и томаты (для подачи)"],
      en: ["Fatty lamb 500g", "Onion", "Garlic", "Red chilli", "Cumin", "Parsley", "Salt", "Lavash and tomatoes (to serve)"],
    },
    recipe: {
      uz: ["Go'shtni ikki marta maydang", "Barcha ziravor va o't-qo'shimchalar bilan yaxshi aralashtiring", "1 soat muzlatgichda ushlab turing", "Shashlikka o'rang va ixcham bosing", "Grilda har tomonini 6–7 daqiqadan pishiring", "Lavash, pomidor va maydanoz bilan bering"],
      ru: ["Прокрутите мясо дважды через мясорубку", "Хорошо перемешайте со специями и зеленью", "Охладите 1 час в холодильнике", "Нанизайте на шпажку, плотно прижмите", "Обжарьте по 6–7 минут с каждой стороны", "Подавайте с лавашем, томатами и петрушкой"],
      en: ["Mince meat twice", "Mix well with all spices and herbs", "Chill 1 hour in fridge", "Thread onto skewer, press firmly", "Grill 6–7 minutes per side", "Serve with lavash, tomatoes and parsley"],
    },
  },
  {
    id: "doner-kebab",
    recommendedSaladId: "spring-salad", recommendedSideId: "garlic-bread",
    image: "/food-doner.jpg",
    categories: ["fast", "protein", "lunch"],
    name: { uz: "Doner kebab", ru: "Донер кебаб", en: "Doner Kebab" },
    short: { uz: "Turk uslubidagi lavash bilan go'sht", ru: "Мясо в лаваше по-турецки", en: "Turkish-style meat in flatbread" },
    calories: 420, protein: 26, fat: 18, carbs: 40, prepTime: 15, price: 2, healthScore: 72, rating: 4.8,
    vitamins: ["B12", "C", "B6"], minerals: ["Fosfor", "Temir", "Kaliy"],
    description: {
      uz: "Doner kebab — ingichka to'g'ralgan go'sht, yangi sabzavotlar va maxsus sous bilan lavashga o'ralgan turk fast food. Pishirilgan go'shtni lavashga solib yopishdan oldin birin-ketin sabzavot va sous qatlaming — mazali bo'ladi.",
      ru: "Донер кебаб — тонко нарезанное мясо с овощами и соусом в лаваше. Укладывайте слоями мясо, овощи и соус перед заворачиванием — будет вкуснее.",
      en: "Doner kebab — thinly sliced meat with fresh vegetables and sauce in flatbread. Layer meat, vegetables and sauce before rolling — better flavour distribution.",
    },
    benefits: {
      uz: ["Tez to'yadi", "Protein manbai", "Ko'chma ovqat", "Lazzatli"],
      ru: ["Быстро насыщает", "Источник белка", "Портативная еда", "Вкусно"],
      en: ["Quick satiety", "Protein source", "Portable meal", "Delicious"],
    },
    forWhom: { uz: "Tez ovqat istovchilar, studentlar", ru: "Кто хочет быстро поесть, студенты", en: "Those wanting a quick meal, students" },
    notForWhom: { uz: "Dieta ustidagilar (yuqori kaloriya)", ru: "Те кто на диете (высококалорийно)", en: "Those dieting (high calorie)" },
    whenEat: { uz: "Tushlik yoki gazak", ru: "Обед или перекус", en: "Lunch or snack" },
    dailyRec: { uz: "Haftasiga 2–3 marta", ru: "2–3 раза в неделю", en: "2–3 times a week" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat fresh" },
    ingredients: {
      uz: ["Tovuq yoki mol go'shti 300g", "Lavash", "Salat", "Pomidor", "Piyoz", "Yogurt yoki chesnok sousi", "Qizil qalampir"],
      ru: ["Курица или говядина 300г", "Лаваш", "Салат", "Томаты", "Лук", "Йогуртовый или чесночный соус", "Красный перец"],
      en: ["Chicken or beef 300g", "Flatbread", "Lettuce", "Tomatoes", "Onion", "Yogurt or garlic sauce", "Red pepper"],
    },
    recipe: {
      uz: ["Go'shtni marinadlang va pishiring", "Ingichka bo'laklarga keling", "Lavashni issiq qiling", "Salat, pomidor va piyoz joylashtiring", "Go'sht va sous soling", "Mahkam o'rab, grilda 1–2 daqiqa qizdiring"],
      ru: ["Замаринуйте и приготовьте мясо", "Нарежьте тонкими ломтиками", "Подогрейте лаваш", "Выложите салат, томаты и лук", "Добавьте мясо и соус", "Плотно закройте, обжарьте 1–2 минуты на гриле"],
      en: ["Marinate and cook the meat", "Slice into thin pieces", "Warm the flatbread", "Layer lettuce, tomatoes and onion", "Add meat and sauce", "Roll tightly, grill 1–2 minutes"],
    },
  },
  {
    id: "turkish-menemen",
    recommendedSaladId: "spring-salad", recommendedSideId: "qora-non",
    image: "/food-menemen.jpg",
    categories: ["breakfast", "vegetarian", "fast"],
    name: { uz: "Menemen", ru: "Менемен", en: "Menemen" },
    short: { uz: "Pomidor va qalampirli turk tuxumi", ru: "Турецкая яичница с томатами и перцем", en: "Turkish scrambled eggs with tomato" },
    calories: 185, protein: 12, fat: 12, carbs: 10, prepTime: 15, price: 1, healthScore: 87, rating: 4.7,
    vitamins: ["A", "C", "B12"], minerals: ["Kaliy", "Magniy", "Selen"],
    description: {
      uz: "Menemen — pomidor, yashil qalampir va tuxumdan tayyorlangan turk nonushtasi. Mis yoki temir qozonda pishirilsa yanada mazali bo'ladi. Tuxumni qo'shgach, aralashtirib yubormang — yangi qatlamlar hosil bo'lsin.",
      ru: "Менемен — турецкий завтрак из томатов, зелёного перца и яиц. В медной или чугунной сковороде вкуснее. После добавления яиц не перемешивайте сразу — пусть образуются слои.",
      en: "Menemen — Turkish breakfast of tomatoes, green pepper and eggs. Best in a copper or cast-iron pan. After adding eggs, don't stir immediately — let layers form.",
    },
    benefits: {
      uz: ["Tez tayyorlanadi", "Vitaminlarga boy", "Kaloriyi past", "Miya uchun foydali"],
      ru: ["Готовится быстро", "Богат витаминами", "Малокалорийно", "Полезно для мозга"],
      en: ["Quick to make", "Vitamin-rich", "Low calorie", "Good for the brain"],
    },
    forWhom: { uz: "Hamma, vegetarianlar", ru: "Все, вегетарианцы", en: "Everyone, vegetarians" },
    notForWhom: { uz: "Tuxumga allergiyasi bo'lganlar", ru: "Аллергия на яйца", en: "Egg allergy" },
    whenEat: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast" },
    dailyRec: { uz: "Ertalab 1 porsiya (2–3 tuxum)", ru: "Утром 1 порция (2–3 яйца)", en: "1 morning serving (2–3 eggs)" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat immediately" },
    ingredients: {
      uz: ["Tuxum 3 dona", "Pomidor 2 dona", "Yashil qalampir 1 dona", "Piyoz", "Zaytun moyi", "Tuz, qalampir", "Maydanoz"],
      ru: ["Яйца 3 шт.", "Томаты 2 шт.", "Зелёный перец 1 шт.", "Лук", "Оливковое масло", "Соль, перец", "Петрушка"],
      en: ["Eggs x3", "Tomatoes x2", "Green pepper x1", "Onion", "Olive oil", "Salt, pepper", "Parsley"],
    },
    recipe: {
      uz: ["Qozonda moy qizdiring, piyoz qovuring", "Qalampir va pomidor solib 5 daqiqa qovuring", "Tuxumlarni ustiga sindering", "2 daqiqa dam bosing, engilgina aralashtiring", "Maydanoz seping va non bilan bering"],
      ru: ["Раскалите масло в сковороде, обжарьте лук", "Добавьте перец и томаты, обжарьте 5 минут", "Разбейте яйца сверху", "Подождите 2 минуты, слегка перемешайте", "Посыпьте петрушкой, подавайте с хлебом"],
      en: ["Heat oil, fry onion", "Add pepper and tomatoes, cook 5 minutes", "Break eggs over top", "Wait 2 minutes, stir gently", "Sprinkle parsley, serve with bread"],
    },
  },

  // ─── DETOKS / FOYDALI OZDIRUV TAOMLAR ───────────────────────────────────
  {
    id: "detox-green-bowl",
    image: "/food-detox-bowl.jpg",
    categories: ["weightloss", "vegetarian", "healthy", "breakfast"],
    name: { uz: "Detoks yashil bowl", ru: "Детокс-боул зелёный", en: "Detox Green Bowl" },
    short: { uz: "Organizmni tozalovchi superfood bowl", ru: "Суперфуд боул для очищения организма", en: "Superfood bowl to detoxify the body" },
    calories: 280, protein: 14, fat: 12, carbs: 32, prepTime: 10, price: 2, healthScore: 99, rating: 4.9,
    vitamins: ["C", "K", "E", "B9"], minerals: ["Kaliy", "Magniy", "Rux"],
    description: {
      uz: "Kinoa, avokado, bodring, ispanak va chia urug'laridan tayyorlangan detoks bowl. Limon sousi bilan yog' erigan vitaminlarni so'rilishini kuchaytiradi. Ertalab och qoringa yeseangiz — toksik moddalarni organizmdan chiqarishga yordam beradi.",
      ru: "Детокс-боул из киноа, авокадо, огурца, шпината и семян чиа. Лимонный соус усиливает усвоение жирорастворимых витаминов. Съешьте натощак утром — поможет вывести токсины.",
      en: "Detox bowl with quinoa, avocado, cucumber, spinach and chia seeds. Lemon dressing enhances fat-soluble vitamin absorption. Eat on an empty stomach for maximum detox effect.",
    },
    benefits: {
      uz: ["Organizmni tozalaydi", "Terini yaxshilaydi", "Energiya beradi", "Ozishga yordam beradi", "Immunitetni kuchaytiradi"],
      ru: ["Очищает организм", "Улучшает кожу", "Даёт энергию", "Помогает похудеть", "Укрепляет иммунитет"],
      en: ["Detoxifies body", "Improves skin", "Boosts energy", "Aids weight loss", "Strengthens immunity"],
    },
    forWhom: { uz: "Ozishni istaganlar, sog'lom ovqatlanuvchilar", ru: "Желающие похудеть, ЗОЖники", en: "Those wanting weight loss, healthy eaters" },
    notForWhom: { uz: "Alohida allergiya bo'lmasa hamma", ru: "Все без индивидуальной аллергии", en: "Everyone without specific allergies" },
    whenEat: { uz: "Nonushta (och qorin)", ru: "Завтрак (натощак)", en: "Breakfast (empty stomach)" },
    dailyRec: { uz: "Har kuni 1 porsiya", ru: "1 порция ежедневно", en: "1 serving daily" },
    storage: { uz: "Muzlatgichda 1 kun (sousis bilan)", ru: "1 день в холодильнике (с соусом)", en: "1 day refrigerated (with dressing)" },
    ingredients: {
      uz: ["Kinoa 80g", "Avokado yarmi", "Bodring", "Yangi ispanak", "Chia urug'i 2 osh q.", "Limon sousi", "Zaytun moyi"],
      ru: ["Киноа 80г", "Полавокадо", "Огурец", "Свежий шпинат", "Семена чиа 2 ст. л.", "Лимонный соус", "Оливковое масло"],
      en: ["Quinoa 80g", "Half avocado", "Cucumber", "Fresh spinach", "Chia seeds 2 tbsp", "Lemon dressing", "Olive oil"],
    },
    recipe: {
      uz: ["Kinoani pishiring va sovuting", "Barcha sabzavotlarni to'g'rang", "Bowlga kinoa soling", "Avokado, bodring va ispanak joylashtiring", "Chia urug'i seping", "Limon sousi va zaytun moyi quying"],
      ru: ["Сварите и остудите киноа", "Нарежьте все овощи", "Выложите киноа в боул", "Разложите авокадо, огурец и шпинат", "Посыпьте семенами чиа", "Полейте лимонным соусом и оливковым маслом"],
      en: ["Cook and cool quinoa", "Chop all vegetables", "Put quinoa in bowl", "Arrange avocado, cucumber and spinach", "Sprinkle chia seeds", "Drizzle lemon dressing and olive oil"],
    },
  },
  {
    id: "protein-detox-salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["weightloss", "protein", "healthy", "lunch"],
    name: { uz: "Protein detoks salati", ru: "Протеиновый детокс-салат", en: "Protein Detox Salad" },
    short: { uz: "Yuqori oqsil va tozalovchi ingredients", ru: "Высокий белок и очищающие ингредиенты", en: "High protein and cleansing ingredients" },
    calories: 245, protein: 22, fat: 10, carbs: 18, prepTime: 12, price: 2, healthScore: 96, rating: 4.7,
    vitamins: ["C", "K", "B6", "E"], minerals: ["Temir", "Magniy", "Kaltsiy"],
    description: {
      uz: "Ton baliq, tuxum, ispanak va turli ko'katlardan tayyorlangan detoks salati. Ozishda protein miqdorini kamaytirmaslik uchun ideal. Salatga siyrak siqilgan limon sousi yuqori kaloriva souslardan yaxshidir — kaloriyani keskin kamaytiradi.",
      ru: "Детокс-салат из тунца, яйца, шпината и зелени. Идеален при похудении без потери белка. Лёгкий лимонный соус лучше калорийных — резко снижает калорийность.",
      en: "Detox salad with tuna, egg, spinach and greens. Ideal for weight loss without losing protein. Light lemon dressing over calorie-heavy sauces — dramatically cuts calories.",
    },
    benefits: {
      uz: ["Tez to'yadi", "Ozishga yordam", "Metabolizmni tezlashtiradi", "Teri va soch uchun foydali"],
      ru: ["Быстро насыщает", "Помогает похудеть", "Ускоряет метаболизм", "Полезен для кожи и волос"],
      en: ["Quick satiety", "Aids weight loss", "Boosts metabolism", "Good for skin and hair"],
    },
    forWhom: { uz: "Ozishni istaganlar, sport kiluvchilar", ru: "Желающие похудеть, спортсмены", en: "Those wanting to lose weight, athletes" },
    notForWhom: { uz: "Baliqqa allergiyasi bo'lganlar", ru: "Аллергия на рыбу", en: "Fish allergy" },
    whenEat: { uz: "Tushlik", ru: "Обед", en: "Lunch" },
    dailyRec: { uz: "Har kuni 1 porsiya", ru: "1 порция ежедневно", en: "1 serving daily" },
    storage: { uz: "Sousis qo'shilmagan holda muzlatgichda 1 kun", ru: "Без соуса в холодильнике 1 день", en: "Without dressing, refrigerated 1 day" },
    ingredients: {
      uz: ["Ton baliq 150g", "Tuxum 2 dona", "Ispanak", "Pomidor", "Bodring", "Qizil piyoz", "Zaytun moyi", "Limon"],
      ru: ["Тунец 150г", "Яйца 2 шт.", "Шпинат", "Томаты", "Огурец", "Красный лук", "Оливковое масло", "Лимон"],
      en: ["Tuna 150g", "Eggs x2", "Spinach", "Tomatoes", "Cucumber", "Red onion", "Olive oil", "Lemon"],
    },
    recipe: {
      uz: ["Tuxumlarni qattiq qaynatib, ikkiga bo'ling", "Barcha sabzavotlarni to'g'rang", "Ispanak asosga yoying", "Sabzavot va tuxum joylashtiring", "Ton baliq soling", "Zaytun moyi va limon siqib quyib bering"],
      ru: ["Сварите яйца вкрутую, разрежьте пополам", "Нарежьте все овощи", "Выложите шпинат на дно", "Разложите овощи и яйца", "Добавьте тунца", "Полейте оливковым маслом и лимонным соком"],
      en: ["Hard-boil eggs, halve them", "Chop all vegetables", "Layer spinach on the base", "Arrange vegetables and eggs", "Add tuna", "Drizzle olive oil and lemon juice"],
    },
  },
  {
    id: "morning-detox-smoothie",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["weightloss", "breakfast", "vegetarian"],
    name: { uz: "Ertalabki detoks smoothie", ru: "Утренний детокс-смузи", en: "Morning Detox Smoothie" },
    short: { uz: "Uyqusizlik va toksinsizlantiruvchi ichimlik", ru: "Напиток от усталости и детокс", en: "Wake-up and detox drink" },
    calories: 145, protein: 4, fat: 3, carbs: 28, prepTime: 5, price: 1, healthScore: 97, rating: 4.8,
    vitamins: ["C", "K", "A", "B9"], minerals: ["Kaliy", "Magniy", "Kaltsiy"],
    description: {
      uz: "Tarvuz, zanjabil, limon va turp kabi toksinsizlantiruvchi ingredient smuzisi. Ertalab uyg'onganda och qoringa iching — jigar va buyrak faoliyatini yaxshilaydi. Sovuq suv yoki muz qo'shing — ta'mi yanada yaxshi bo'ladi.",
      ru: "Смузи из детоксифицирующих ингредиентов: имбирь, лимон, шпинат, яблоко. Пейте натощак утром — улучшает работу печени и почек. Добавьте холодную воду или лёд — вкуснее.",
      en: "Smoothie with detoxifying ingredients: ginger, lemon, spinach, apple. Drink on empty stomach in the morning — improves liver and kidney function. Add cold water or ice for better flavour.",
    },
    benefits: {
      uz: ["Jigarni tozalaydi", "Metabolizmni tezlashtiradi", "Energiya beradi", "Terini yaxshilaydi", "Uyqudan uyg'otadi"],
      ru: ["Очищает печень", "Ускоряет метаболизм", "Даёт энергию", "Улучшает кожу", "Бодрит после сна"],
      en: ["Cleanses liver", "Boosts metabolism", "Gives energy", "Improves skin", "Wakes you up"],
    },
    forWhom: { uz: "Sog'lom hayot kechiruvchilar, ozishni istaganlar", ru: "ЗОЖники, желающие похудеть", en: "Health-conscious people, those losing weight" },
    notForWhom: { uz: "Zanjabilga sezgirlar ehtiyot bo'lsin", ru: "Осторожно при чувствительности к имбирю", en: "Caution if sensitive to ginger" },
    whenEat: { uz: "Ertalab och qorin", ru: "Утром натощак", en: "Morning on empty stomach" },
    dailyRec: { uz: "Har kuni 1 stakan (250ml)", ru: "Каждый день 1 стакан (250мл)", en: "Daily 1 glass (250ml)" },
    storage: { uz: "Darhol iching yoki muzlatgichda 12 soat", ru: "Пейте сразу или храните 12 часов", en: "Drink immediately or store 12 hours max" },
    ingredients: {
      uz: ["Ispanak bir hovuch", "Olma 1 dona", "Zanjabil 1 sm", "Limon yarmi", "Asal 1 osh q.", "Suv 200ml", "Muz"],
      ru: ["Шпинат горсть", "Яблоко 1 шт.", "Имбирь 1 см", "Половина лимона", "Мёд 1 ст. л.", "Вода 200мл", "Лёд"],
      en: ["Spinach a handful", "Apple x1", "Ginger 1 cm", "Half lemon", "Honey 1 tbsp", "Water 200ml", "Ice"],
    },
    recipe: {
      uz: ["Barcha masalliqni blenderga soling", "30 soniya aralashtiring", "Muz va suv qo'shing", "Yana 10 soniya aylantiring", "Darhol iching"],
      ru: ["Положите все ингредиенты в блендер", "Взбивайте 30 секунд", "Добавьте лёд и воду", "Ещё 10 секунд", "Пейте сразу"],
      en: ["Add all ingredients to blender", "Blend 30 seconds", "Add ice and water", "Blend 10 more seconds", "Drink immediately"],
    },
  },
  {
    id: "green-detox-tea",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["healthy", "drinks", "breakfast"],
    name: { uz: "Limon va yalpizli yashil choy", ru: "Зеленый чай с лимоном и мятой", en: "Green Tea with Lemon & Mint" },
    short: { uz: "Tinchlantiruvchi va detoks ta'sirga ega choy", ru: "Успокаивающий и детокс зеленый чай", en: "Calming and detoxifying green tea" },
    calories: 5, protein: 0.2, fat: 0.1, carbs: 1.2, prepTime: 5, price: 1, healthScore: 98, rating: 4.8,
    vitamins: ["C", "B2", "E"], minerals: ["Kaliy", "Magniy", "Kaltsiy"],
    description: {
      uz: "Kokilli yashil choy limon va yalpiz barglari bilan. Jigar faoliyatini yaxshilaydi va ortiqcha suvni haydaydi. Choyni 80°C haroratdagi suvda 3 daqiqa damlang — qaynoq suv uning foydali xususiyatlarini yo'qotadi.",
      ru: "Зеленый чай с лимоном и листьями мяты. Улучшает работу печени и выводит лишнюю воду. Заваривайте чай при 80°C ровно 3 минуты.",
      en: "Green tea with lemon and mint leaves. Improves liver function and flushes out excess water. Steep at 80°C for exactly 3 minutes."
    },
    benefits: {
      uz: ["Moddalar almashinuvini tezlashtiradi", "Terini tozalaydi", "Tinchlantiradi", "Imunitetni oshiradi"],
      ru: ["Ускоряет метаболизм", "Очищает кожу", "Успокаивает", "Повышает иммунитет"],
      en: ["Speeds up metabolism", "Cleanses skin", "Calms the nerves", "Boosts immunity"]
    },
    forWhom: { uz: "Ortiqcha vazndan qutulmoqchi bo'lganlar, tinchlanishni xohlovchilar", ru: "Желающие похудеть, ищущие спокойствие", en: "Those wanting to lose weight, seeking calmness" },
    notForWhom: { uz: "Past qon bosimi bor odamlar", ru: "Люди с низким давлением", en: "People with low blood pressure" },
    whenEat: { uz: "Kun davomida yoki ovqatdan keyin", ru: "В течение дня или после еды", en: "During the day or after meals" },
    dailyRec: { uz: "Kuniga 2-3 stakan", ru: "2-3 чашки в день", en: "2-3 cups daily" },
    storage: { uz: "Yangi damlab ichish tavsiya etiladi", ru: "Рекомендуется пить свежезаваренным", en: "Best enjoyed freshly brewed" },
    ingredients: {
      uz: ["Yashil choy 1 choy qoshiq", "Yalpiz barglari 4-5 dona", "Limon tilimi 2 dona", "Suv 300ml"],
      ru: ["Зеленый чай 1 ч. л.", "Листья мяты 4-5 шт.", "Дольки лимона 2 шт.", "Вода 300мл"],
      en: ["Green tea 1 tsp", "Mint leaves 4-5 pcs", "Lemon slices x2", "Water 300ml"]
    },
    recipe: {
      uz: ["Choynakka yashil choy va yalpiz soling", "Ustidan 80 daraja haroratdagi qaynatilgan suv quying", "3 daqiqa dam bering", "Limon tilimlarini solib torting"],
      ru: ["Положите чай и мяту в чайник", "Залейте водой температуры 80 градусов", "Дайте настояться 3 минуты", "Добавьте дольки лимона и подавайте"],
      en: ["Add green tea and mint to teapot", "Pour 80°C boiled water over them", "Steep for 3 minutes", "Add lemon slices and serve"]
    }
  },
  {
    id: "ginger-lemon-tea",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["healthy", "drinks", "breakfast"],
    name: { uz: "Zanjabilli limon choyi", ru: "Имбирный чай с лимоном", en: "Ginger Lemon Tea" },
    short: { uz: "Immun tizimini mustahkamlovchi issiq ichimlik", ru: "Согревающий иммунный чай", en: "Warming immune-boosting tea" },
    calories: 12, protein: 0.3, fat: 0.1, carbs: 3.0, prepTime: 7, price: 1, healthScore: 97, rating: 4.9,
    vitamins: ["C", "B6", "A"], minerals: ["Kaliy", "Temir", "Magniy"],
    description: {
      uz: "Yangi zanjabil ildizi, limon va ozgina asal bilan tayyorlanadigan shifobaxsh choy. Zanjabilni ingichka qilib kesib, suvda 5 daqiqa qaynating, so'ngra limon va asal soling — zanjabil butun ta'mini chiqaradi.",
      ru: "Целебный чай со свежим корнем имбиря, лимоном и медом. Тонко нарежьте имбирь и проварите 5 минут, затем добавьте лимон и мед.",
      en: "Healing tea with fresh ginger root, lemon and honey. Thinly slice ginger and boil for 5 minutes, then add lemon and honey."
    },
    benefits: {
      uz: ["Shamollashning oldini oladi", "Hazm qilishni yaxshilaydi", "Qon aylanishini faollashtiradi", "Yog'larni parchalashga yordam beradi"],
      ru: ["Предотвращает простуду", "Улучшает пищеварение", "Активизирует кровообращение", "Помогает расщеплять жиры"],
      en: ["Prevents colds", "Improves digestion", "Boosts blood circulation", "Aids in fat burning"]
    },
    forWhom: { uz: "Tana a'zolarini tozalashni xohlovchilar, immuniteti past insonlar", ru: "Люди со слабым иммунитетом", en: "People with low immunity, detox seekers" },
    notForWhom: { uz: "Oshqozon yarasi bo'lganlar (zanjabil achchiqligi uchun)", ru: "Люди с язвой желудка", en: "People with stomach ulcers" },
    whenEat: { uz: "Ertalab nonushtada yoki shamollash alomatlarida", ru: "Утром на завтрак или при простуде", en: "Morning at breakfast or during cold symptoms" },
    dailyRec: { uz: "Kuniga 1-2 stakan, 250ml", ru: "1-2 чашки в день, 250мл", en: "1-2 cups daily, 250ml" },
    storage: { uz: "Faqat yangi tayyorlanganda ichish kerak", ru: "Пить только свежим", en: "Consume only when freshly made" },
    ingredients: {
      uz: ["Yangi zanjabil 1 sm", "Limon yarmi", "Tabiiy asal 1 choy qoshiq", "Suv 300ml"],
      ru: ["Свежий имбирь 1 см", "Половина лимона", "Натуральный мед 1 ч. л.", "Вода 300мл"],
      en: ["Fresh ginger 1 cm", "Half lemon", "Natural honey 1 tsp", "Water 300ml"]
    },
    recipe: {
      uz: ["Zanjabilni tozalang va yupqa to'g'rang", "Suvni qaynatib zanjabilni soling va 5 daqiqa davomida past olovda qaynating", "Olovdan olib, limon va asal qo'shing", "Aralashtirib, suzib oling"],
      ru: ["Очистите и тонко нарежьте имбирь", "Вскипятите воду, положите имбирь и варите на медленном огне 5 минут", "Снимите с огня, добавьте лимон и мед", "Перемешайте и процедите"],
      en: ["Peel and thinly slice ginger", "Boil water, add ginger and simmer for 5 minutes", "Remove from heat, add lemon and honey", "Stir and strain into a cup"]
    }
  },
  {
    id: "protein-banana-shake",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["protein", "sport", "drinks", "weightgain", "breakfast"],
    name: { uz: "Bananli proteinli kokteyl", ru: "Банановый протеиновый коктейль", en: "Banana Protein Shake" },
    short: { uz: "Mushaklarni tiklash va o'stirish uchun to'yimli kokteyl", ru: "Питательный коктейль для мышц", en: "Nutritious shake for muscle recovery and growth" },
    calories: 310, protein: 28, fat: 4.0, carbs: 38.0, prepTime: 5, price: 2, healthScore: 93, rating: 4.9,
    vitamins: ["B6", "B12", "C", "D"], minerals: ["Kaliy", "Kaltsiy", "Magniy"],
    description: {
      uz: "Banan, sifatli zardob proteini va kam yog'li sutdan tayyorlangan energiya manbai. Jismoniy mashg'ulotlardan keyin 30 daqiqa ichida iste'mol qiling — mushaklarni tezda oqsil bilan to'yintiradi.",
      ru: "Источник энергии из банана, качественного сывороточного протеина и нежирного молока. Выпейте в течение 30 минут после тренировки.",
      en: "Energy source from banana, high-quality whey protein and low-fat milk. Consume within 30 minutes post-workout for fast muscle nutrition."
    },
    benefits: {
      uz: ["Mushak massasini oshiradi", "Tez quvvat bag'ishlaydi", "Energiya zaxiralarini to'ldiradi", "Uzoq vaqt davomida to'q tutadi"],
      ru: ["Увеличивает мышечную массу", "Быстро восстанавливает силы", "Восполняет запасы энергии", "Надолго дает сытость"],
      en: ["Increases muscle mass", "Quickly restores strength", "Replenishes energy stores", "Keeps you full for a long time"]
    },
    forWhom: { uz: "Sportchilar, vazn olmoqchi bo'lganlar, faol yoshlar", ru: "Спортсмены, желающие набрать вес", en: "Athletes, those gaining weight, active people" },
    notForWhom: { uz: "Laktozaga chidamsizligi borlar", ru: "Люди с непереносимостью лактозы", en: "People with lactose intolerance" },
    whenEat: { uz: "Mashg'ulotdan keyin yoki nonushta o'rniga", ru: "После тренировки или вместо завтрака", en: "Post-workout or instead of breakfast" },
    dailyRec: { uz: "Kuniga 1 porsiya, 300ml", ru: "1 порция в день, 300мл", en: "1 serving daily, 300ml" },
    storage: { uz: "Tayyorlangach 2 soat ichida ichish kerak", ru: "Выпить в течение 2 часов после приготовления", en: "Best consumed within 2 hours of making" },
    ingredients: {
      uz: ["Banan 1 dona", "Protein kukuni (WPC) 30g", "Yog'siz sut 250ml", "Muz bo'laklari (xohishga ko'ra)"],
      ru: ["Банан 1 шт.", "Протеиновый порошок 30г", "Обезжиренное молоко 250мл", "Кубики льда (по желанию)"],
      en: ["Banana x1", "Protein powder 30g", "Low-fat milk 250ml", "Ice cubes (optional)"]
    },
    recipe: {
      uz: ["Bananni po'stidan tozalang va bo'laklang", "Blenderga sut, protein va bananlarni soling", "Barcha masalliqlar bir xil holatga kelguncha 45 soniya davomida blenderlang", "Stakanga quyib darhol iching"],
      ru: ["Очистите и нарежьте банан", "Положите банан, молоко и протеин в блендер", "Взбивайте 45 секунд до однородной массы", "Налейте в стакан и сразу выпейте"],
      en: ["Peel and slice the banana", "Put banana, milk and protein into blender", "Blend for 45 seconds until smooth", "Pour into a glass and drink immediately"]
    }
  },
  {
    id: "berry-protein-shake",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["protein", "sport", "drinks", "healthy", "weightloss"],
    name: { uz: "Rezavorli protein kokteyli", ru: "Ягодный протеиновый коктейль", en: "Berry Protein Shake" },
    short: { uz: "Antioksidantlar va proteinga boy rezavorli kokteyl", ru: "Ягодный протеиновый коктейль с антиоксидантами", en: "Antioxidant and protein-rich berry shake" },
    calories: 280, protein: 26, fat: 3.5, carbs: 34.0, prepTime: 5, price: 2, healthScore: 94, rating: 4.9,
    vitamins: ["C", "E", "K", "B6"], minerals: ["Magniy", "Kaliy", "Fosfor"],
    description: {
      uz: "Bodom suti, yangi qulupnay va malina aralashmasi, hamda oqsil kukuni. Yog'larni kamaytirish bilan birga terini yaxshilash va antioksidant yetkazib berishda juda foydali.",
      ru: "Микс миндального молока, свежей клубники, малины и протеина. Помогает худеть, улучшает кожу.",
      en: "Mix of almond milk, fresh strawberries, raspberries and protein powder. Helps burn fat, improves skin condition."
    },
    benefits: {
      uz: ["Qarish jarayonini sekinlashtiradi", "Mushaklarni tiklaydi", "Yengil hazm bo'ladi", "Yog'larni parchalashni tezlashtiradi"],
      ru: ["Замедляет процессы старения", "Восстанавливает мышцы", "Легко усваивается", "Ускоряет жиросжигание"],
      en: ["Slows aging processes", "Supports muscle recovery", "Easy on the stomach", "Boosts fat metabolism"]
    },
    forWhom: { uz: "Ozishni istaganlar, sport bilan shug'ullanuvchilar, vegetarianlar", ru: "Худеющие, спортсмены, вегетарианцы", en: "Dieters, athletes, vegetarians" },
    notForWhom: { uz: "Rezavor mevalarga allergiyasi borlar", ru: "Люди с аллергией на ягоды", en: "People allergic to berries" },
    whenEat: { uz: "Ertalab yoki jismoniy mashg'ulotdan oldin/keyin", ru: "Утром или до/после тренировки", en: "Morning or before/after workout" },
    dailyRec: { uz: "Kuniga 1-2 stakan", ru: "1-2 стакана в день", en: "1-2 glasses daily" },
    storage: { uz: "Muzlatgichda 4 soatgacha saqlash mumkin", ru: "Хранить в холодильнике до 4 часов", en: "Store in fridge up to 4 hours" },
    ingredients: {
      uz: ["Muzlatilgan yoki yangi rezavorlar 100g", "Protein kukuni 30g", "Bodom suti 200ml", "Asal 1 choy qoshiq"],
      ru: ["Свежие или замороженные ягоды 100г", "Протеин 30г", "Миндальное молоко 200мл", "Мед 1 ч. л."],
      en: ["Fresh or frozen berries 100g", "Protein powder 30g", "Almond milk 200ml", "Honey 1 tsp"]
    },
    recipe: {
      uz: ["Rezavorlarni yuving", "Blenderga rezavorlar, bodom suti, protein va asalni joylang", "Yumshoq va bir xil massa hosil bo'lgunicha blenderlang", "Sovuq holda torting"],
      ru: ["Промыйте ягоды", "Сложите ягоды, миндальное молоко, протеин и мед в блендер", "Взбивайте до однородной консистенции", "Подавайте прохладным"],
      en: ["Wash the berries", "Place berries, almond milk, protein and honey in blender", "Blend until smooth and uniform", "Serve chilled"]
    }
  },
  {
    id: "herbal-relax-tea",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["healthy", "drinks", "dinner"],
    name: { uz: "Moychechakli tinchlantiruvchi choy", ru: "Ромашковый успокаивающий чай", en: "Chamomile Relax Tea" },
    short: { uz: "Uyquni yaxshilovchi tabiiy o'tli choy", ru: "Натуральный травяной чай для улучшения сна", en: "Natural herbal tea for better sleep" },
    calories: 2, protein: 0.1, fat: 0.0, carbs: 0.5, prepTime: 8, price: 1, healthScore: 99, rating: 4.7,
    vitamins: ["A", "B1", "B5"], minerals: ["Kaltsiy", "Magniy", "Rux"],
    description: {
      uz: "Tabiiy moychechak gullari va yalpiz barglaridan damlanadigan xushbo'y choy. Asab tizimini tinchlantiradi, uyqusizlikni bartaraf etadi va ovqat hazm qilishga yordam beradi. Uyqudan 30-40 daqiqa oldin ichish tavsiya etiladi.",
      ru: "Ароматный чай из цветков ромашки и листьев мяты. Успокаивает нервную систему, избавляет от бессонницы. Рекомендуется пить за 30-40 минут до сна.",
      en: "Fragrant tea brewed from natural chamomile flowers and mint leaves. Calms the nervous system, cures insomnia and aids digestion. Best consumed 30-40 minutes before bedtime."
    },
    benefits: {
      uz: ["Uyqu sifatini yaxshilaydi", "Oshqozon spazmlarini yo'qotadi", "Stress va xavotirni kamaytiradi", "Yallig'lanishga qarshi kurashadi"],
      ru: ["Улучшает качество сна", "Снимает спазмы желудка", "Снижает стресс и тревожность", "Обладает противовоспалительным эффектом"],
      en: ["Improves sleep quality", "Relieves stomach cramps", "Reduces stress and anxiety", "Fights inflammation"]
    },
    forWhom: { uz: "Uyqusizlikdan aziyat chekuvchilar, kun oxirida dam olmoqchi bo'lganlar", ru: "Люди с бессонницей, желающие отдохнуть в конце дня", en: "Those suffering from insomnia, looking to unwind" },
    notForWhom: { uz: "Moychechakka allergiyasi bo'lganlar", ru: "Люди с аллергией на ромашку", en: "People allergic to chamomile" },
    whenEat: { uz: "Kechki payt, uyqudan oldin", ru: "Вечером, перед сном", en: "Evening, before sleep" },
    dailyRec: { uz: "Kuniga 1 stakan", ru: "1 чашка в день", en: "1 cup daily" },
    storage: { uz: "Tayyorlangach darhol ichish lozim", ru: "Пить сразу после заваривания", en: "Drink immediately after brewing" },
    ingredients: {
      uz: ["Moychechak gullari (quritilgan) 1 osh qoshiq", "Yalpiz 3-4 barg", "Suv 300ml"],
      ru: ["Сушеные цветки ромашки 1 ст. л.", "Мята 3-4 листика", "Вода 300мл"],
      en: ["Dried chamomile flowers 1 tbsp", "Mint 3-4 leaves", "Water 300ml"]
    },
    recipe: {
      uz: ["Choynakni issiq suv bilan chayqang", "Moychechak gullari va yalpizni soling", "Ustidan qaynoq suv quying va 8 daqiqa davomida dam bering", "Suzib olib, issiq holda iching"],
      ru: ["Ополосните чайник горячей водой", "Положите ромашку и мяту", "Залейте кипятком и настаивайте 8 минут", "Процедите и пейте теплым"],
      en: ["Rinse teapot with hot water", "Add chamomile flowers and mint", "Pour boiling water over them and steep for 8 minutes", "Strain and enjoy warm"]
    }
  },
  {
    id: "sedana-frittata",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["fast", "breakfast", "vegetarian", "healthy"],
    name: { uz: "Sedanali ismaloq frittata", ru: "Фриттата со шпинатом и седаной", en: "Spinach & Black Cumin Frittata" },
    short: { uz: "Sedana va yangi ismaloqli oqsilli nonushta", ru: "Белковый завтрак со шпинатом и седаной", en: "Protein breakfast with spinach and black cumin" },
    calories: 195, protein: 15, fat: 12, carbs: 3, prepTime: 10, price: 1, healthScore: 95, rating: 4.8,
    vitamins: ["A", "C", "D", "B12"], minerals: ["Temir", "Selen", "Kaltsiy"],
    description: {
      uz: "Tuxum, yangi ismaloq barglari va sedana urug'idan tayyorlangan mazali quymoq. Sedana (qora zira) immunitetni kuchaytirishda dunyoga mashhur. Ismaloq esa temir moddasi bilan boyitadi.",
      ru: "Пышный омлет из яиц, свежего шпината и семян седаны. Седана (черный тмин) известна своими свойствами для иммунитета.",
      en: "Fluffy frittata made with eggs, fresh spinach, and black cumin (black seed). Black seed is world-famous for boosting immunity."
    },
    benefits: {
      uz: ["Ko'p miqdorda temir", "Antioksidantlar manbai", "Kam kaloriya va to'yimli", "Immunitetni oshiradi"],
      ru: ["Много железа", "Источник антиоксидантов", "Мало калорий, сытно", "Повышает иммунитет"],
      en: ["Rich in iron", "Source of antioxidants", "Low calorie yet filling", "Boosts immunity"]
    },
    forWhom: { uz: "Sog'lom hayot tarafdorlari, vegetarianlar, sportchilar", ru: "Сторонники ЗОЖ, вегетарианцы, спортсмены", en: "Healthy lifestyle followers, vegetarians, athletes" },
    notForWhom: { uz: "Tuxumga allergiyasi bo'lganlar", ru: "Аллергики на яйца", en: "Egg allergy sufferers" },
    whenEat: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast" },
    dailyRec: { uz: "Haftasiga 3-4 marta, 1 porsiya", ru: "3-4 раза в неделю, 1 порция", en: "3-4 times a week, 1 serving" },
    storage: { uz: "Muzlatgichda 1 kundan ko'p saqlamang", ru: "Хранить в холодильнике не более 1 дня", en: "Store in fridge for max 1 day" },
    ingredients: {
      uz: ["Tuxum 3 dona", "Ismaloq 50g", "Sedana 0.5 choy qoshiq", "Pomidor 1 dona", "Zaytun moyi 1 osh qoshiq"],
      ru: ["Яйца 3 шт.", "Шпинат 50г", "Седана 0.5 ч.л.", "Помидор 1 шт.", "Оливковое масло 1 ст.л."],
      en: ["Eggs x3", "Spinach 50g", "Black seed 0.5 tsp", "Tomato x1", "Olive oil 1 tbsp"]
    },
    recipe: {
      uz: ["Tuxumlarni idishda ko'pirtiring", "Tavada zaytun moyida to'g'ralgan pomidor va ismaloqni 1 daqiqa qovuring", "Tuxumni quying va ustiga sedana seping", "Qopqoq ostida past olovda 5 daqiqa pishiring", "Issiq holda torting"],
      ru: ["Взбейте яйца в миске", "Обжарьте шпинат и помидоры на оливковом масле 1 минуту", "Вылейте яйца, посыпьте седаной", "Готовьте под крышкой 5 минут", "Подавайте горячим"],
      en: ["Whisk eggs in a bowl", "Sauté chopped spinach and tomatoes in olive oil for 1 minute", "Pour eggs over, sprinkle black seed", "Cook under lid for 5 minutes", "Serve warm"]
    },
    ingredientsList: ["tuxum", "ismaloq", "sedana", "pomidor", "zaytun moyi"]
  },
  {
    id: "chicken-avocado-salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["healthy", "protein", "weightloss", "lunch", "sport"],
    name: { uz: "Tovuq va avokado salati", ru: "Салат с курицей и авокадо", en: "Chicken & Avocado Salad" },
    short: { uz: "Parhezbop to'yimli oqsilli salat", ru: "Диетический сытный белковый салат", en: "Dietary, high-protein filling salad" },
    calories: 290, protein: 24, fat: 16, carbs: 8, prepTime: 12, price: 2, healthScore: 94, rating: 4.9,
    vitamins: ["B6", "C", "E", "K"], minerals: ["Kaliy", "Magniy", "Folat"],
    description: {
      uz: "Tovuq go'shti filesi, yumshoq avokado, shirin pomidor va bodringdan tayyorlanadigan yengil, lekin juda to'yimli salat. Zaytun moyi bilan aralashtiriladi. Sport va parhez uchun eng zo'r yechim.",
      ru: "Легкий, но сытный салат из куриного филе, мягкого авокадо, спелых томатов и огурцов с оливковым маслом.",
      en: "A light yet filling salad featuring chicken breast, soft avocado, sweet tomatoes and cucumbers dressed with olive oil."
    },
    benefits: {
      uz: ["Yuqori sifatli toza oqsil", "Avokadodagi foydali yog'lar", "Kam uglevod", "Yurak-qon tomir salomatligi"],
      ru: ["Высококачественный белок", "Полезные жиры из авокадо", "Мало углеводов", "Здоровье сердца"],
      en: ["High-quality pure protein", "Healthy fats from avocado", "Low carbohydrate content", "Supports heart health"]
    },
    forWhom: { uz: "Sportchilar, ozmoqchi bo'lganlar, diabeti borlar", ru: "Спортсмены, худеющие, люди с диабетом", en: "Athletes, dieters, people with diabetes" },
    notForWhom: { uz: "Tovuq go'shtiga allergiyasi borlar", ru: "Аллергия на курицу", en: "People allergic to chicken" },
    whenEat: { uz: "Tushlik yoki kechki ovqat", ru: "Обед или ужин", en: "Lunch or dinner" },
    dailyRec: { uz: "Kuniga 1 porsiya (200-250g)", ru: "1 порция в день (200-250г)", en: "1 serving daily (200-250g)" },
    storage: { uz: "Tayyorlangach darhol yeyish tavsiya qilinadi (avokado qorayadi)", ru: "Кушать сразу (авокадо темнеет)", en: "Consume immediately after preparing" },
    ingredients: {
      uz: ["Tovuq ko'kragi 150g (pishirilgan)", "Avokado 0.5 dona", "Pomidor 1 dona", "Bodring 1 dona", "Zaytun moyi 1 osh qoshiq", "Limon suvi"],
      ru: ["Куриная грудка 150г (готовая)", "Авокадо 0.5 шт.", "Помидор 1 шт.", "Огурец 1 шт.", "Оливковое масло 1 ст.л.", "Лимонный сок"],
      en: ["Chicken breast 150g (cooked)", "Avocado 0.5 pc", "Tomato x1", "Cucumber x1", "Olive oil 1 tbsp", "Lemon juice"]
    },
    recipe: {
      uz: ["Tovuq filesini kubik shaklida to'g'rang", "Avokadoni tozalang va to'g'rab ustidan limon suvi seping", "Pomidor va bodringni maydalang", "Barcha masalliqlarni idishda aralashtiring", "Zaytun moyi va tuz qo'shib torting"],
      ru: ["Нарежьте курицу кубиками", "Нарежьте авокадо, сбрызните лимоном", "Нарежьте овощи", "Смешайте все в миске", "Полейте оливковым маслом и посолите"],
      en: ["Cube the cooked chicken breast", "Dice avocado, drizzle with lemon juice to prevent browning", "Slice tomato and cucumber", "Mix all ingredients in a bowl", "Drizzle with olive oil, add salt and serve"]
    },
    ingredientsList: ["tovuq", "avokado", "pomidor", "bodring", "zaytun moyi", "limon"]
  },
  {
    id: "greek-feta-salad",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["vegetarian", "healthy", "weightloss", "dinner"],
    name: { uz: "Zaytun va pishloqli Grek salati", ru: "Греческий салат с фетой и маслинами", en: "Greek Salad with Feta & Olives" },
    short: { uz: "Klassik O'rta yer dengizi parhez salati", ru: "Классический средиземноморский диетический салат", en: "Classic Mediterranean dietary salad" },
    calories: 160, protein: 5, fat: 12, carbs: 6, prepTime: 8, price: 2, healthScore: 96, rating: 4.7,
    vitamins: ["C", "A", "E", "K"], minerals: ["Kaltsiy", "Temir", "Kaliy"],
    description: {
      uz: "Feta pishlog'i, qora zaytun (oliva), pomidor, bodring va shirin qalampirning o'zaro ajoyib mutanosibligi. Zaytun moyi bilan tayyorlanadigan bu salat ovqat hazm qilish tizimini mukammal tozalaydi.",
      ru: "Свежий салат с нежным сыром фета, черными маслинами, сочными помидорами, огурцами и оливковым маслом.",
      en: "Fresh salad featuring soft feta cheese, black olives, juicy tomatoes, cucumbers and olive oil dressing."
    },
    benefits: {
      uz: ["Kalsiy va minerallarga boy", "Hazmni yaxshilaydi", "Kam uglevod, parhezbop", "Terini yoshartiradi"],
      ru: ["Богат кальцием и минералами", "Улучшает пищеварение", "Мало углеводов", "Омолаживает кожу"],
      en: ["Rich in calcium and minerals", "Supports healthy digestion", "Low-carb and dietary", "Promotes youthful skin"]
    },
    forWhom: { uz: "Vegetarianlar, ozishni istaganlar, yosh bolalar", ru: "Вегетарианцы, худеющие, дети", en: "Vegetarians, weight-watchers, kids" },
    notForWhom: { uz: "Tuz iste'molini cheklaganlar (feta pishlog'i sho'r)", ru: "Люди на бессолевой диете", en: "People on a low-sodium diet" },
    whenEat: { uz: "Kechki ovqat yoki go'shtli taomlar yonida", ru: "Ужин или гарнир к мясу", en: "Dinner or side for meat dishes" },
    dailyRec: { uz: "Kuniga 1 porsiya (200g)", ru: "1 порция в день (200г)", en: "1 serving daily (200g)" },
    storage: { uz: "Muzlatgichda 1 kun saqlash mumkin", ru: "В холодильнике до 1 дня", en: "Store in fridge up to 1 day" },
    ingredients: {
      uz: ["Feta pishloq 80g", "Zaytun 10 dona", "Pomidor 1 dona", "Bodring 1 dona", "Bolg'or qalampiri 1 dona", "Zaytun moyi 1 osh qoshiq"],
      ru: ["Сыр фета 80г", "Маслины 10 шт.", "Помидор 1 шт.", "Огурец 1 шт.", "Болгарский перец 1 шт.", "Оливковое масло 1 ст.л."],
      en: ["Feta cheese 80g", "Olives x10", "Tomato x1", "Cucumber x1", "Bell pepper x1", "Olive oil 1 tbsp"]
    },
    recipe: {
      uz: ["Pomidor, bodring va bolg'or qalampirini yirikroq bo'laklang", "Ularni idishga solib zaytunlar va zaytun moyi bilan aralashtiring", "Feta pishlog'ini to'rtburchak kesib salat ustiga qo'ying", "Ustiga rayhon yoki oregano seping", "Aralashtirmasdan torting"],
      ru: ["Крупно нарежьте овощи", "Смешайте в миске с маслинами и оливковым маслом", "Нарежьте фету кубиками и выложите сверху", "Посыпьте орегано", "Подавайте не перемешивая"],
      en: ["Chop tomatoes, cucumbers and bell pepper into large pieces", "Mix in a bowl with olives and olive oil", "Cube feta cheese and place on top", "Sprinkle with oregano", "Serve without mixing"]
    },
    ingredientsList: ["pishloq", "zaytun", "pomidor", "bodring", "qalampir", "zaytun moyi"]
  },
  {
    id: "fit-rice-chicken",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["protein", "sport", "lunch", "weightgain"],
    name: { uz: "Fit-Osh (Tovuqli parhez guruch)", ru: "Фит-Плов (Диетический рис с курицей)", en: "Fit-Rice with Chicken & Veggies" },
    short: { uz: "Kam yog'li to'yimli oqsilli guruch", ru: "Низкожировой сытный рис с курицей", en: "Lean and filling chicken rice" },
    calories: 380, protein: 28, fat: 8, carbs: 48, prepTime: 25, price: 2, healthScore: 89, rating: 4.8,
    vitamins: ["B1", "B6", "B12"], minerals: ["Temir", "Magniy", "Rux"],
    description: {
      uz: "An'anaviy palovning yengillashtirilgan va parhezbop shakli. Qo'y go'shti o'rniga tovuq filesi, guruch va ko'p miqdorda sabzi, piyoz qo'shib juda kam zaytun moyida pishiriladi.",
      ru: "Облегченная и диетическая версия плова. Куриное филе вместо баранины, рис, обилие моркови и минимум оливкового масла.",
      en: "A lighter, diet-friendly version of pilaf. Uses chicken breast instead of lamb, cooked with rice, carrots, onions, and minimal olive oil."
    },
    benefits: {
      uz: ["Ozishga yordam beruvchi to'g'ri uglevod", "Mushak massasini oshiradi", "Hazm qilish juda oson", "Yog' miqdori minimal"],
      ru: ["Правильные углеводы для похудения", "Увеличивает мышечную массу", "Легко усваивается", "Минимум жира"],
      en: ["Complex carbs for clean energy", "Builds lean muscle", "Very easy to digest", "Minimal fat content"]
    },
    forWhom: { uz: "Sportchilar, vazn olmoqchilar yoki faol ishchilar", ru: "Спортсмены, набирающие вес, активные люди", en: "Athletes, muscle builders, active workers" },
    notForWhom: { uz: "Qat'iy kam uglevodli (keto) dietadagilar", ru: "Люди на строгой безуглеводной (кето) диете", en: "People on a strict low-carb (keto) diet" },
    whenEat: { uz: "Tushlik", ru: "Обед", en: "Lunch" },
    dailyRec: { uz: "Kuniga 1 porsiya (250-300g)", ru: "1 порция в день (250-300г)", en: "1 serving daily (250-300g)" },
    storage: { uz: "Muzlatgichda 2-3 kungacha saqlash mumkin", ru: "В холодильнике до 2-3 дней", en: "Store in fridge up to 2-3 days" },
    ingredients: {
      uz: ["Guruch (basmati/jigarrang) 100g", "Tovuq filesi 150g", "Sabzi 1 dona", "Piyoz 1 dona", "Bolg'or qalampiri", "Zaytun moyi 1 choy qoshiq"],
      ru: ["Рис (басмати/бурый) 100г", "Куриное филе 150г", "Морковь 1 шт.", "Лук 1 шт.", "Болгарский перец", "Оливковое масло 1 ч.л."],
      en: ["Rice 100g", "Chicken breast 150g", "Carrot x1", "Onion x1", "Bell pepper", "Olive oil 1 tsp"]
    },
    recipe: {
      uz: ["Tovuq filesi va sabzavotlarni to'g'rang", "Tavada zaytun moyida tovuqni 3 daqiqa qovuring", "Piyoz, sabzi va qalampir solib yana 3 daqiqa dimlang", "Guruchni yaxshilab yuvib idishga qo'shing", "Ustiga qaynoq suv quying (1:1.5) va past olovda 15 daqiqa pishiring"],
      ru: ["Нарежьте курицу и овощи", "Обжарьте курицу в масле 3 минуты", "Добавьте лук, морковь, перец, томите 3 минуты", "Промойте рис, засыпьте сверху", "Залейте кипятком (1:1.5) и варите под крышкой 15 минут"],
      en: ["Chop chicken breast and vegetables", "Sauté chicken in olive oil for 3 minutes", "Add onion, carrot, and pepper, cook for 3 minutes", "Wash rice, add to the pan", "Pour hot water (1:1.5 ratio) and cook covered on low heat for 15 minutes"]
    },
    ingredientsList: ["guruch", "tovuq", "sabzi", "piyoz", "qalampir"]
  },
  {
    id: "tuna-egg-toast",
    image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["breakfast", "protein", "fast"],
    name: { uz: "Proteinli tuxum va tuna tost", ru: "Тост с яйцом и тунцом", en: "High-Protein Egg & Tuna Toast" },
    short: { uz: "Tuna va qaynatilgan tuxumli ajoyib tost", ru: "Белковый тост с яйцом и тунцом", en: "Protein-rich egg and tuna toast" },
    calories: 280, protein: 21, fat: 11, carbs: 24, prepTime: 6, price: 1, healthScore: 92, rating: 4.8,
    vitamins: ["B12", "D", "A"], minerals: ["Selen", "Temir", "Omega-3"],
    description: {
      uz: "Tost nonga yer yong'oq yog'i yoki yengil yogurt surtib, ustiga konservadagi tuna go'shti hamda qaynatilgan tuxum bo'laklari joylanadi. Ertalabki oqsillar zaxirasi uchun juda tez nonushta.",
      ru: "Тост из цельнозернового хлеба с консервированным тунцом, вареным яйцом и ломтиками помидора.",
      en: "Whole-grain toast topped with canned tuna, sliced boiled egg and tomato. The perfect fast, protein-packed breakfast."
    },
    benefits: {
      uz: ["Tez tayyorlanadi (6 daqiqa)", "21 gramm toza oqsil", "Omega-3 ko'pligi", "Kun bo'yi to'qlik beradi"],
      ru: ["Быстро готовить (6 минут)", "21 грамм чистого белка", "Много Омега-3", "Дает сытость на весь день"],
      en: ["Ready in 6 minutes", "21g of clean protein", "Loaded with Omega-3", "Keeps you full all day"]
    },
    forWhom: { uz: "Studentlar, sportchilar, nonushtaga vaqti kam bo'lganlar", ru: "Студенты, спортсмены, занятые люди", en: "Students, athletes, busy people" },
    notForWhom: { uz: "Baliq yoki tuxumga allergiyasi bo'lganlar", ru: "Аллергики на рыбу или яйца", en: "People allergic to fish or eggs" },
    whenEat: { uz: "Nonushta yoki jismoniy mashg'ulotdan keyin", ru: "Завтрак или после тренировки", en: "Breakfast or post-workout" },
    dailyRec: { uz: "Nonushtada 1-2 dona", ru: "1-2 тоста утром", en: "1-2 toasts in the morning" },
    storage: { uz: "Tayyorlangach darhol yeng", ru: "Кушать сразу", en: "Eat fresh" },
    ingredients: {
      uz: ["Non 2 dilim", "Konservalangan tuna 60g", "Tuxum 1 dona", "Pomidor", "Muz salati"],
      ru: ["Хлеб 2 ломтика", "Консервированный тунец 60г", "Яйцо 1 шт.", "Помидор", "Салат"],
      en: ["Bread 2 slices", "Canned tuna 60g", "Egg x1", "Tomato", "Lettuce"]
    },
    recipe: {
      uz: ["Nonlarni toster yoki tovada qizdirib oling", "Non ustiga salat bargini qo'ying", "Tuna go'shtini ozgina maydalab nonga yoying", "Qaynatilgan tuxum va pomidor dilimlarini joylang", "Tuz va murch sepib bering"],
      ru: ["Подсушите хлеб на сковороде", "Положите салатные листья", "Разложите размятый тунец", "Сверху выложите ломтики вареного яйца и помидора", "Посолите, поперчите и подавайте"],
      en: ["Toast bread in a pan or toaster", "Place lettuce on the toast", "Spread mashed canned tuna evenly", "Top with sliced boiled egg and tomato", "Season with salt, pepper and serve"]
    },
    ingredientsList: ["non", "tuxum", "tuna", "pomidor", "salat"]
  },
  {
    id: "immune-detox-tea",
    image: "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["drinks", "healthy"],
    name: { uz: "Moychechak va sedana choyi", ru: "Чай с ромашкой и седаной", en: "Chamomile & Black Seed Tea" },
    short: { uz: "Immunitetni oshiruvchi shifobaxsh choy", ru: "Целебный чай для укрепления иммунитета", en: "Healing tea for immune support" },
    calories: 5, protein: 0.1, fat: 0.2, carbs: 1, prepTime: 7, price: 1, healthScore: 98, rating: 4.8,
    vitamins: ["C", "A", "E"], minerals: ["Rux", "Magniy", "Temir"],
    description: {
      uz: "Moychechak gullari, qora sedana urug'lari, limon bo'lagi va tabiiy tog' asali qo'shilgan tinchlantiruvchi, immunitetni faollashtiruvchi tabiiy ichimlik.",
      ru: "Натуральный успокаивающий чай из ромашки, черного тмина, дольки лимона и горного меда.",
      en: "A soothing, immune-boosting natural infusion of chamomile, black seed (cumin), lemon slices, and raw mountain honey."
    },
    benefits: {
      uz: ["Immunitetni juda kuchli qiladi", "Shamollashni oldini oladi", "Tinchlantiradi, uyquni yaxshilaydi", "Organizmni toksinlardan tozalaydi"],
      ru: ["Укрепляет иммунитет", "Предотвращает простуду", "Успокаивает и улучшает сон", "Очищает от токсинов"],
      en: ["Powerful immune support", "Prevents colds and flu", "Calms nerves and aids sleep", "Detoxifies the body"]
    },
    forWhom: { uz: "Tez-tez shamollaydiganlar, charchoq sezganlar", ru: "Часто простужающиеся люди, утомленные", en: "People prone to colds, feeling fatigued" },
    notForWhom: { uz: "Limon yoki asalga allergiyasi borlar", ru: "Аллергики на мед или лимон", en: "People allergic to honey or lemon" },
    whenEat: { uz: "Kechki payt yoki kun davomida", ru: "Вечером или в течение дня", en: "Evening or during the day" },
    dailyRec: { uz: "Kuniga 1-2 stakan", ru: "1-2 чашки в день", en: "1-2 cups daily" },
    storage: { uz: "Damlangach 2 soat ichida iching", ru: "Пить в течение 2 часов после заварки", en: "Drink within 2 hours of brewing" },
    ingredients: {
      uz: ["Moychechak gullari 1 osh qoshiq", "Qora sedana (urug'i) 0.5 choy qoshiq", "Limon 1 tilim", "Asal 1 choy qoshiq", "Suv 300ml"],
      ru: ["Цветки ромашки 1 ст.л.", "Черный тмин 0.5 ч.л.", "Лимон 1 долька", "Мед 1 ч.л.", "Вода 300мл"],
      en: ["Chamomile flowers 1 tbsp", "Black seed 0.5 tsp", "Lemon 1 slice", "Honey 1 tsp", "Water 300ml"]
    },
    recipe: {
      uz: ["Idishga moychechak va sedanani soling", "Ustidan 90-95°C dagi qaynoq suv quying", "5-7 daqiqa yopiq holda dam bering", "Choyni suzib oling, limon va asal qo'shib aralashtiring", "Issiq holda iching"],
      ru: ["Насыпьте ромашку и тмин в заварник", "Залейте горячей водой (90-95°C)", "Настаивайте 5-7 минут", "Процедите, добавьте лимон и мед", "Пейте теплым"],
      en: ["Put chamomile and black seed in a teapot", "Pour hot water (90-95°C) over them", "Steep covered for 5-7 minutes", "Strain, add lemon slice and honey, stir well", "Enjoy warm"]
    },
    ingredientsList: ["moychechak", "sedana", "limon", "asal"]
  },

  // ─── SALATLAR ────────────────────────────────────────────────────────────
  {
    id: "achchiq-chuchuk",
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&h=500&fit=crop&q=80&auto=format",
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
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=500&fit=crop&q=80&auto=format",
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
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=500&fit=crop&q=80&auto=format",
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
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=800&h=500&fit=crop&q=80&auto=format",
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
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=500&fit=crop&q=80&auto=format",
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
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=500&fit=crop&q=80&auto=format",
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
    image: "https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=800&h=500&fit=crop&q=80&auto=format",
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
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&h=500&fit=crop&q=80&auto=format",
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
  },
  {
    id: "ginger-turmeric-tea",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["drinks", "healthy", "immunity"],
    name: { uz: "Zanjabil-zarg'aldoq choy", ru: "Чай с имбирём и куркумой", en: "Ginger Turmeric Tea" },
    short: { uz: "Kuchli yallig'lanishga qarshi choy", ru: "Мощный противовоспалительный чай", en: "Powerful anti-inflammatory tea" },
    calories: 10, protein: 0, fat: 0, carbs: 2, prepTime: 8, price: 1, healthScore: 98, rating: 4.9,
    vitamins: ["C", "B6"], minerals: ["Kaliy", "Magniy", "Temir"],
    description: {
      uz: "Zanjabil va zarg'aldoq dunyodagi eng kuchli tabiiy yallig'lanishga qarshi moddalar hisoblanadi. Bu choy bugungi kunda onkologlar tomonidan saraton profilaktikasi sifatida tavsiya etiladi. Qon aylanishini yaxshilaydi, bo'g'imlarni asraydi.",
      ru: "Имбирь и куркума — самые мощные природные противовоспалительные компоненты в мире. Онкологи рекомендуют этот чай для профилактики рака. Улучшает кровообращение и защищает суставы.",
      en: "Ginger and turmeric are the world's most powerful natural anti-inflammatory agents. Oncologists recommend this tea for cancer prevention. Improves circulation and protects joints."
    },
    benefits: {
      uz: ["Yallig'lanishni kamaytiradi", "Bo'g'im og'rig'ini yengillатади", "Saraton profilaktikasi", "Qon aylanishini tezlashtiradi"],
      ru: ["Снижает воспаление", "Облегчает боль в суставах", "Профилактика рака", "Улучшает кровообращение"],
      en: ["Reduces inflammation", "Relieves joint pain", "Cancer prevention", "Improves blood circulation"]
    },
    healthBenefitsInfo: {
      uz: "Zarg'aldoqdagi kurkumin moddasi TNF-alfa va IL-6 kabi yallig'lanish gormonlarini bloklaydi. Bu ta'sir nuro'tkazgich (antibiotik)lardan ham kuchliroq bo'lishi aniqlangan.",
      ru: "Куркумин в куркуме блокирует воспалительные гормоны TNF-alfa и IL-6. Этот эффект оказался сильнее некоторых антибиотиков.",
      en: "Curcumin in turmeric blocks inflammatory hormones TNF-alfa and IL-6. This effect has been found to be stronger than some antibiotics."
    },
    forWhom: { uz: "Bo'g'im og'rig'i, immunitet pastligi", ru: "Боли в суставах, слабый иммунитет", en: "Joint pain, weak immunity" },
    notForWhom: { uz: "Qon suyultiruvchi dori ichayotganlar", ru: "Принимающие антикоагулянты", en: "Taking blood thinners" },
    whenEat: { uz: "Ertalab yoki kechqurun", ru: "Утром или вечером", en: "Morning or evening" },
    dailyRec: { uz: "Kuniga 1-2 stakan", ru: "1-2 стакана в день", en: "1-2 cups per day" },
    storage: { uz: "Yangi damlangan holda", ru: "Свежезаваренным", en: "Freshly brewed" },
    ingredients: { uz: ["Yangi zanjabil 1 sm", "Zarg'aldoq 0.5 choy qoshiq", "Limon 1 tilim", "Asal 1 choy qoshiq", "Suv 300ml"], ru: ["Свежий имбирь 1 см", "Куркума 0.5 ч.л.", "Лимон 1 долька", "Мёд 1 ч.л.", "Вода 300мл"], en: ["Fresh ginger 1cm", "Turmeric 0.5 tsp", "Lemon 1 slice", "Honey 1 tsp", "Water 300ml"] },
    recipe: { uz: ["Suvni qaynatib turing", "Zanjabilni mayda to'g'rang", "Zanjabil va zarg'aldoqni stakanga soling", "Qaynoq suv quying, 5-7 daqiqa turing", "Asal va limon qo'shib aralashtiring"], ru: ["Вскипятите воду", "Мелко нарежьте имбирь", "Положите имбирь и куркуму в стакан", "Залейте кипятком, подождите 5-7 минут", "Добавьте мед и лимон"], en: ["Boil water", "Finely chop ginger", "Place ginger and turmeric in a cup", "Pour boiling water, wait 5-7 minutes", "Add honey and lemon, stir"] },
    prepMethod: { uz: "Damlangan choy", ru: "Заваренный чай", en: "Brewed tea" },
  },
  {
    id: "berry-antioxidant-smoothie",
    image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["drinks", "healthy", "breakfast", "sport"],
    name: { uz: "Rezavorli antioxidant koktey", ru: "Антиоксидантный ягодный смузи", en: "Berry Antioxidant Smoothie" },
    short: { uz: "Yosharish va charchoqni qochiruvchi", ru: "Омолаживающий и энергизирующий", en: "Rejuvenating and energizing" },
    calories: 145, protein: 4, fat: 2, carbs: 28, prepTime: 5, price: 2, healthScore: 97, rating: 4.9,
    vitamins: ["C", "E", "K", "B9"], minerals: ["Magniy", "Kaliy", "Marganes"],
    description: {
      uz: "Ko'k, qizil va qora rezavorlar — antioksidantlarning eng boy manbai. Ular hujayra qarishini sekinlashtiradi va DNK ni radikallardan himoya qiladi. Bir stakanda butun kunlik antioxidant ehtiyojini qoplaydi.",
      ru: "Голубика, клубника и ежевика — богатейший источник антиоксидантов. Они замедляют клеточное старение и защищают ДНК от радикалов. Один стакан покрывает дневную потребность в антиоксидантах.",
      en: "Blueberries, strawberries and blackberries are the richest source of antioxidants. They slow cellular aging and protect DNA from radicals. One glass covers the daily antioxidant requirement."
    },
    benefits: {
      uz: ["Qarishni sekinlashtiradi", "Ko'rish keskinligini oshiradi", "Xotirani yaxshilaydi", "Saraton hujayralariga qarshi"],
      ru: ["Замедляет старение", "Улучшает остроту зрения", "Улучшает память", "Противодействует раковым клеткам"],
      en: ["Slows aging", "Improves vision sharpness", "Enhances memory", "Counters cancer cells"]
    },
    healthBenefitsInfo: {
      uz: "Ko'k rezavordagi antotsianlar miyaning gippocamp qismini himoya qiladi — bu xotira va o'qish qobiliyatiga bevosita javob beruvchi mintaqa.",
      ru: "Антоцианы черники защищают гиппокамп мозга — регион, напрямую отвечающий за память и обучение.",
      en: "Anthocyanins in blueberries protect the brain's hippocampus — the region directly responsible for memory and learning."
    },
    forWhom: { uz: "Hammaga, ayniqsa keksalarga", ru: "Всем, особенно пожилым", en: "Everyone, especially elderly" },
    notForWhom: { uz: "Qon suyultirgich ichayotganlar", ru: "Принимающие разжижители крови", en: "On blood thinners" },
    whenEat: { uz: "Ertalab nonushtaga", ru: "На завтрак", en: "For breakfast" },
    dailyRec: { uz: "Kuniga 1 stakan", ru: "1 стакан в день", en: "1 glass per day" },
    storage: { uz: "Tayyorlangach 30 daqiqa ichida", ru: "В течение 30 минут после приготовления", en: "Within 30 mins of making" },
    ingredients: { uz: ["Ko'k rezavor 50g", "Qulupnay 50g", "Yog'siz qatiq 100ml", "Banan 0.5 dona", "Asal 1 choy qoshiq"], ru: ["Черника 50г", "Клубника 50г", "Нежирный йогурт 100мл", "Банан 0.5 шт.", "Мёд 1 ч.л."], en: ["Blueberries 50g", "Strawberries 50g", "Low-fat yogurt 100ml", "Banana 0.5 pc.", "Honey 1 tsp"] },
    recipe: { uz: ["Barcha mahsulotlarni blenderga soling", "30 sekund aralashtiring", "Darhol iching"], ru: ["Поместите все ингредиенты в блендер", "Смешивайте 30 секунд", "Пейте сразу"], en: ["Put all ingredients in blender", "Blend for 30 seconds", "Drink immediately"] },
    prepMethod: { uz: "Blenderlashtirilgan", ru: "Блендированный", en: "Blended" },
  },
  {
    id: "chamomile-honey-tea",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["drinks", "healthy", "sleep"],
    name: { uz: "Moychechak-asalli choy", ru: "Ромашковый чай с мёдом", en: "Chamomile Honey Tea" },
    short: { uz: "Uyqu va asab tinchligi uchun", ru: "Для сна и нервного спокойствия", en: "For sleep and nervous calm" },
    calories: 15, protein: 0, fat: 0, carbs: 4, prepTime: 7, price: 1, healthScore: 97, rating: 4.8,
    vitamins: ["A", "E"], minerals: ["Kaltsiy", "Magniy", "Kaliy"],
    description: {
      uz: "Moychechak — tabiatning eng kuchli tabiiy soporifiki (uyqu keltirgich). Uning apigenin moddasi miyaning GABA retseptorlariga ta'sir etib, tashvishni kamaytiradi va chuqur uyquni ta'minlaydi. Kechqurun uxlashdan 30-40 daqiqa oldin ichish optimal vaqt.",
      ru: "Ромашка — сильнейший натуральный снотворный. Апигенин связывается с GABA-рецепторами мозга, уменьшает тревогу и обеспечивает глубокий сон. Оптимальное время — за 30-40 минут до сна.",
      en: "Chamomile is nature's most powerful natural soporific. Its apigenin binds to GABA receptors in the brain, reducing anxiety and ensuring deep sleep. Optimal time is 30-40 minutes before bedtime."
    },
    benefits: {
      uz: ["Uyquni chuqurlаshtiradi", "Tashvish va stressni kamaytiradi", "Oshqozonni tinchlantiradi", "Asab tizimini mustahkamlaydi"],
      ru: ["Углубляет сон", "Снижает тревогу и стресс", "Успокаивает желудок", "Укрепляет нервную систему"],
      en: ["Deepens sleep", "Reduces anxiety and stress", "Soothes stomach", "Strengthens nervous system"]
    },
    healthBenefitsInfo: {
      uz: "Tadqiqotlar shuni ko'rsatadiki, 28 kun davomida moychechak choy ichgan kishilar uxlash vaqtini o'rtacha 15 minutga qisqartiradi va tunda uyg'onish sonini kamayтирadi.",
      ru: "Исследования показали, что люди, пьющие ромашковый чай 28 дней, сокращают время засыпания в среднем на 15 минут и уменьшают ночные пробуждения.",
      en: "Research shows that people who drink chamomile tea for 28 days reduce their time to fall asleep by 15 minutes on average and decrease night awakenings."
    },
    forWhom: { uz: "Uyqusizlik, stressdagilar", ru: "Страдающие бессонницей, в стрессе", en: "Those with insomnia, under stress" },
    notForWhom: { uz: "Moychechakka allergiyasi borlar", ru: "Аллергия на ромашку", en: "Chamomile allergy" },
    whenEat: { uz: "Uxlashdan 30 daqiqa oldin", ru: "За 30 минут до сна", en: "30 minutes before sleep" },
    dailyRec: { uz: "Kechqurun 1 stakan", ru: "1 стакан вечером", en: "1 cup in the evening" },
    storage: { uz: "Damlangach 1 soat ichida iching", ru: "Выпить в течение 1 часа после заварки", en: "Drink within 1 hour of brewing" },
    ingredients: { uz: ["Quritilgan moychechak 2 choy qoshiq", "Asal 1 choy qoshiq", "Qaynoq suv 250ml", "Lavanda (ixtiyoriy)"], ru: ["Сухая ромашка 2 ч.л.", "Мёд 1 ч.л.", "Кипяток 250мл", "Лаванда (по желанию)"], en: ["Dried chamomile 2 tsp", "Honey 1 tsp", "Boiling water 250ml", "Lavender (optional)"] },
    recipe: { uz: ["Moychechakni stakanga soling", "80-90°C suv quying", "5 daqiqa yopiq holda turing", "Suzib, asal qo'shing"], ru: ["Положите ромашку в стакан", "Залейте водой 80-90°C", "Накройте и подождите 5 минут", "Процедите, добавьте мёд"], en: ["Place chamomile in cup", "Pour 80-90°C water", "Cover and steep 5 minutes", "Strain and add honey"] },
    prepMethod: { uz: "Damlangan", ru: "Заваренный", en: "Steeped" },
  },
  {
    id: "mint-lemon-cold",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&h=500&fit=crop&q=80&auto=format",
    categories: ["drinks", "healthy", "summer", "refreshing"],
    name: { uz: "Sovuq limonad (Nana-limon)", ru: "Холодный лимонад (Мята-лимон)", en: "Cold Mint Lemonade" },
    short: { uz: "Issiq kunlar uchun sog'lom sovutuvchi", ru: "Полезный охлаждающий напиток для жары", en: "Healthy cooling drink for hot days" },
    calories: 35, protein: 0, fat: 0, carbs: 9, prepTime: 10, price: 1, healthScore: 92, rating: 4.8,
    vitamins: ["C", "B1"], minerals: ["Kaliy", "Kaltsiy"],
    description: {
      uz: "Nana (yalpiz) va limon kombinatsiyasi oshqozonni tinchlantiradi, ishtahani yaxshilaydi va terini nafas oldirishga yordam beradi. Gazli suvlarga eng yaxshi alternativa — shakar yo'q, faqat tabiiy tatlar.",
      ru: "Сочетание мяты и лимона успокаивает желудок, улучшает аппетит и помогает коже дышать. Лучшая альтернатива газированным напиткам — без сахара, только натуральные вкусы.",
      en: "The combination of mint and lemon soothes the stomach, improves appetite, and helps the skin breathe. Best alternative to soft drinks — no sugar, just natural flavors."
    },
    benefits: {
      uz: ["Issiqda sovutadi", "Oshqozonni tinchlantiradi", "Yangilanish beradi", "Shakar yo'q — parhez uchun ideal"],
      ru: ["Охлаждает в жару", "Успокаивает желудок", "Освежает", "Без сахара — идеально для диеты"],
      en: ["Cools in the heat", "Soothes stomach", "Refreshes", "No sugar — ideal for diets"]
    },
    healthBenefitsInfo: {
      uz: "Nana barglaridagi mentol moddasi ichak harakatini rag'batlantiradi va meteorizm (shamollash)ni 40% ga kamaytiradi.",
      ru: "Ментол в листьях мяты стимулирует работу кишечника и снижает метеоризм на 40%.",
      en: "Menthol in mint leaves stimulates bowel movement and reduces flatulence by 40%."
    },
    forWhom: { uz: "Hammaga, parhez tutayotganlar", ru: "Всем, соблюдающим диету", en: "Everyone, especially dieters" },
    notForWhom: { uz: "Limon allergiyasi", ru: "Аллергия на лимон", en: "Lemon allergy" },
    whenEat: { uz: "Issiq vaqtda, ovqatdan 30 daqiqa oldin", ru: "В жару, за 30 минут до еды", en: "In the heat, 30 min before meals" },
    dailyRec: { uz: "Xohishga ko'ra", ru: "По желанию", en: "As desired" },
    storage: { uz: "Muzlatgichda 1 kun", ru: "В холодильнике 1 день", en: "1 day in fridge" },
    ingredients: { uz: ["Toza suv 1 litr", "Limon 2 dona", "Yangi nana 10-12 barg", "Asal 2 osh qoshiq", "Muz"], ru: ["Вода 1 литр", "Лимон 2 шт.", "Свежая мята 10-12 листьев", "Мёд 2 ст.л.", "Лёд"], en: ["Water 1 liter", "Lemon x2", "Fresh mint 10-12 leaves", "Honey 2 tbsp", "Ice"] },
    recipe: { uz: ["Limonni siqib sharbatini oling", "Suvga sharbat va asal qo'shing", "Nanani qo'l bilan yanchib stakanga soling", "Muz qo'shib muzdek serving qiling"], ru: ["Выжмите лимонный сок", "Смешайте сок и мёд с водой", "Мяту разомните руками, добавьте", "Добавьте лёд, подайте холодным"], en: ["Squeeze lemon juice", "Mix juice and honey with water", "Crush mint by hand, add it", "Add ice and serve cold"] },
    prepMethod: { uz: "Sovuq tayyorlangan, muzlatilgan", ru: "Холодного приготовления", en: "Cold-prepared, iced" },
  }

];

// Load from localStorage if on client

if (typeof window !== "undefined") {
  try {
    const storedFoods = localStorage.getItem("vitality_custom_foods");
    if (storedFoods) {
      foods = JSON.parse(storedFoods);
    }
  } catch (e) {
    console.error("Error loading customized foods:", e);
  }
}

// Real sale prices in Uzbek so'm (prepared, ready-to-order meals)
export let FOOD_PRICES: Record<string, number> = {
  // Fast-prep new items
  "avocado-salmon-toast": 38000,
  "scrambled-eggs": 18000,
  "omelette-veggie": 22000,
  "egg-toast": 20000,
  "quick-sandwich": 28000,
  "instant-oatmeal-cup": 18000,
  "egg-salad-cup": 22000,
  "peanut-butter-banana": 20000,
  "yogurt-fruit-cup": 22000,
  "tuna-rice-bowl": 35000,
  // New local healthy foods
  "sedana-frittata": 24000,
  "chicken-avocado-salad": 45000,
  "greek-feta-salad": 38000,
  "fit-rice-chicken": 42000,
  "tuna-egg-toast": 32000,
  "immune-detox-tea": 18000,
  // Existing items
  "grilled-salmon": 95000,
  "quinoa-bowl": 55000,
  "grilled-chicken": 48000,
  "berry-oatmeal": 28000,
  "green-salad": 32000,
  "berry-smoothie": 30000,
  "grilled-steak": 89000,
  "sushi-platter": 78000,
  "avocado-toast": 42000,
  "lentil-soup": 35000,
  "chicken-wrap": 39000,
  "berry-parfait": 32000,
  // Uzbek
  "uzbek-plov": 65000,
  "uzbek-manti": 58000,
  "uzbek-lagman": 52000,
  "uzbek-samsa": 18000,
  // Turkish
  "adana-kebab": 72000,
  "doner-kebab": 45000,
  "turkish-menemen": 25000,
  // Detox
  "detox-green-bowl": 48000,
  "protein-detox-salad": 52000,
  "morning-detox-smoothie": 22000,
  // Drinks
  "green-detox-tea": 15000,
  "ginger-lemon-tea": 18000,
  "protein-banana-shake": 32000,
  "berry-protein-shake": 30000,
  "herbal-relax-tea": 15000,
  // New drinks & teas
  "ginger-turmeric-tea": 18000,
  "berry-antioxidant-smoothie": 28000,
  "chamomile-honey-tea": 16000,
  "mint-lemon-cold": 14000,
  "achchiq-chuchuk": 22000,
  "spring-salad": 25000,
  "qora-non": 8000,
  "garlic-bread": 12000,
  "water-still": 6000,
  "green-tea-lemon": 12000,
  "protein-shake": 32000,
  "fresh-orange-juice": 24000,
};

// Load custom prices from localStorage if on client
if (typeof window !== "undefined") {
  try {
    const storedPrices = localStorage.getItem("vitality_custom_prices");
    if (storedPrices) {
      FOOD_PRICES = JSON.parse(storedPrices);
    }
  } catch (e) {
    console.error("Error loading customized prices:", e);
  }
}

export function getPrice(id: string): number {
  return FOOD_PRICES[id] ?? 40000;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value) + " so'm";
}

export function getFood(id: string) {
  return foods.find((f) => f.id === id);
}

export function foodsByCategory(catId: string) {
  return foods.filter((f) => f.categories.includes(catId));
}

// Storage helpers for Admin editing
export function getIngredientsList(food: Food): string[] {
  if (food.ingredientsList && food.ingredientsList.length > 0) {
    return food.ingredientsList;
  }
  // Fallback parser to automatically extract from raw text lists
  if (!food.ingredients || !food.ingredients.uz) return [];
  return food.ingredients.uz.map((ing) => {
    let name = ing.toLowerCase()
      .replace(/\d+/g, "")
      .replace(/(g|ml|dona|osh qoshiq|q\/qoshiq|choy qoshiq|dona|stakan|dilim|boshi|tuxum|kg|ta|dona|foydali|ixtiyoriy|muzlatilgan|yangi|kesilgan|ezilgan|quritilgan|barg)/g, "")
      .replace(/[\(\)\[\]\.,\/#!$%\^&\*;:{}=\-_`~]/g, "")
      .trim();

    if (name.includes("tuxum")) return "tuxum";
    if (name.includes("pomidor")) return "pomidor";
    if (name.includes("bodring")) return "bodring";
    if (name.includes("non")) return "non";
    if (name.includes("sut")) return "sut";
    if (name.includes("pishloq")) return "pishloq";
    if (name.includes("tovuq")) return "tovuq";
    if (name.includes("go'sht")) return "go'sht";
    if (name.includes("guruch")) return "guruch";
    if (name.includes("avokado")) return "avokado";
    if (name.includes("sedana")) return "sedana";
    if (name.includes("limon")) return "limon";
    if (name.includes("asal")) return "asal";
    return name;
  }).filter(Boolean);
}

export function updateFoodInStorage(updatedFood: Food) {
  foods = foods.map((f) => (f.id === updatedFood.id ? updatedFood : f));
  if (typeof window !== "undefined") {
    localStorage.setItem("vitality_custom_foods", JSON.stringify(foods));
  }
}

export function updatePriceInStorage(foodId: string, newPrice: number) {
  FOOD_PRICES[foodId] = newPrice;
  if (typeof window !== "undefined") {
    localStorage.setItem("vitality_custom_prices", JSON.stringify(FOOD_PRICES));
  }
}

export function resetFoodsAndPrices() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("vitality_custom_foods");
    localStorage.removeItem("vitality_custom_prices");
    window.location.reload();
  }
}



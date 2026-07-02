import heroImg from "@/assets/hero.jpg";
import salmonImg from "@/assets/food-salmon.jpg";
import bowlImg from "@/assets/food-bowl.jpg";
import chickenImg from "@/assets/food-chicken.jpg";
import oatmealImg from "@/assets/food-oatmeal.jpg";
import saladImg from "@/assets/food-salad.jpg";
import smoothieImg from "@/assets/food-smoothie.jpg";
import steakImg from "@/assets/food-steak.jpg";
import sushiImg from "@/assets/food-sushi.jpg";
import avocadoToastImg from "@/assets/food-avocado-toast.jpg";
import soupImg from "@/assets/food-soup.jpg";
import wrapImg from "@/assets/food-wrap.jpg";
import parfaitImg from "@/assets/food-parfait.jpg";
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
}

export const HERO_IMAGE = heroImg;

export const categories: Category[] = [
  { id: "fast", name: { uz: "Tez tayyor", ru: "Быстрые", en: "Fast" }, icon: "⚡", color: "chart-2" },
  { id: "healthy", name: { uz: "Foydali", ru: "Полезные", en: "Healthy" }, icon: "🥗", color: "primary" },
  { id: "protein", name: { uz: "Protein", ru: "Белковые", en: "Protein" }, icon: "💪", color: "chart-3" },
  { id: "weightloss", name: { uz: "Ozish", ru: "Похудение", en: "Weight loss" }, icon: "🔥", color: "chart-5" },
  { id: "weightgain", name: { uz: "Vazn olish", ru: "Набор веса", en: "Weight gain" }, icon: "📈", color: "gold" },
  { id: "student", name: { uz: "Student", ru: "Студентам", en: "Student" }, icon: "🎓", color: "chart-4" },
  { id: "vegetarian", name: { uz: "Vegetarian", ru: "Вегетарианские", en: "Vegetarian" }, icon: "🌱", color: "primary" },
  { id: "sport", name: { uz: "Sport", ru: "Спорт", en: "Sport" }, icon: "🏋️", color: "chart-3" },
  { id: "kids", name: { uz: "Bolalar", ru: "Детям", en: "Kids" }, icon: "🧒", color: "chart-2" },
  { id: "breakfast", name: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast" }, icon: "🍳", color: "gold" },
  { id: "lunch", name: { uz: "Tushlik", ru: "Обед", en: "Lunch" }, icon: "🍽️", color: "primary" },
  { id: "dinner", name: { uz: "Kechki", ru: "Ужин", en: "Dinner" }, icon: "🌙", color: "chart-4" },
];

export const foods: Food[] = [
  {
    id: "grilled-salmon",
    image: salmonImg,
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
      uz: "Losos — Omega-3 yog' kislotalari, sifatli protein va D vitaminining eng yaxshi manbalaridan biri. Yurak va miya salomatligi uchun ideal.",
      ru: "Лосось — один из лучших источников Omega-3, качественного белка и витамина D. Идеален для здоровья сердца и мозга.",
      en: "Salmon is one of the best sources of Omega-3, high-quality protein and vitamin D. Ideal for heart and brain health.",
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
      uz: ["Fileni tuz va qalampir bilan ishqalang", "Zaytun moyi va limon suvini qo'shing", "Grilni qizdiring", "Har tomonini 4–5 daqiqa pishiring", "Rayhon bilan bezang"],
      ru: ["Натрите филе солью и перцем", "Добавьте оливковое масло и сок лимона", "Разогрейте гриль", "Обжарьте по 4–5 минут с каждой стороны", "Украсьте базиликом"],
      en: ["Rub fillet with salt and pepper", "Add olive oil and lemon juice", "Preheat the grill", "Cook 4–5 minutes per side", "Garnish with basil"],
    },
  },
  {
    id: "quinoa-bowl",
    image: bowlImg,
    categories: ["healthy", "vegetarian", "weightloss", "lunch"],
    name: { uz: "Kinoa bowl", ru: "Боул с киноа", en: "Quinoa Bowl" },
    short: { uz: "To'yimli vegetarian taom", ru: "Сытное вегетарианское блюдо", en: "Filling vegetarian meal" },
    calories: 320, protein: 12, fat: 10, carbs: 45, prepTime: 25, price: 2, healthScore: 94, rating: 4.8,
    vitamins: ["B1", "B9", "E"], minerals: ["Magniy", "Temir", "Rux"],
    description: {
      uz: "Kinoa — to'liq protein manbai bo'lgan noyob don. Nut, avokado va ko'katlar bilan birga bu bowl kun bo'yi energiya beradi.",
      ru: "Киноа — уникальное зерно с полноценным белком. Вместе с нутом, авокадо и зеленью боул заряжает энергией на весь день.",
      en: "Quinoa is a rare grain with complete protein. With chickpeas, avocado and greens this bowl fuels your whole day.",
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
    recipe: { uz: ["Kinoani yuvib qaynating", "Nutni pishiring", "Sabzavotlarni to'g'rang", "Hammasini bowlga joylang", "Sous bilan bezang"], ru: ["Промойте и отварите киноа", "Отварите нут", "Нарежьте овощи", "Соберите в боул", "Полейте соусом"], en: ["Rinse and boil quinoa", "Cook chickpeas", "Chop vegetables", "Assemble in a bowl", "Drizzle with dressing"] },
  },
  {
    id: "grilled-chicken",
    image: chickenImg,
    categories: ["protein", "sport", "weightloss", "lunch"],
    name: { uz: "Grildagi tovuq", ru: "Курица на гриле", en: "Grilled Chicken" },
    short: { uz: "Kam yog'li protein manbai", ru: "Низкожировой источник белка", en: "Lean protein source" },
    calories: 165, protein: 31, fat: 3.6, carbs: 0, prepTime: 18, price: 1, healthScore: 92, rating: 4.7,
    vitamins: ["B3", "B6", "B12"], minerals: ["Selen", "Fosfor", "Kaliy"],
    description: {
      uz: "Tovuq ko'kragi — sportchilar va ozishni istaganlar uchun oltin standart. Yuqori protein, kam yog'.",
      ru: "Куриная грудка — золотой стандарт для спортсменов и худеющих. Много белка, мало жира.",
      en: "Chicken breast is the gold standard for athletes and dieters. High protein, low fat.",
    },
    benefits: { uz: ["Mushak o'sishiga yordam", "To'qlik hissi", "Metabolizmni tezlashtiradi", "Arzon va foydali"], ru: ["Помогает росту мышц", "Чувство сытости", "Ускоряет метаболизм", "Доступно и полезно"], en: ["Supports muscle growth", "Keeps you full", "Boosts metabolism", "Affordable and healthy"] },
    forWhom: { uz: "Sportchilar, fitness ishqibozlari", ru: "Спортсмены, любители фитнеса", en: "Athletes, fitness lovers" },
    notForWhom: { uz: "Buyrak kasalligida ehtiyot bo'ling", ru: "Осторожно при болезнях почек", en: "Caution with kidney disease" },
    whenEat: { uz: "Tushlik yoki mashg'ulotdan keyin", ru: "Обед или после тренировки", en: "Lunch or post-workout" },
    dailyRec: { uz: "Kuniga 150–200g", ru: "150–200г в день", en: "150–200g per day" },
    storage: { uz: "Muzlatgichda 2 kun", ru: "В холодильнике 2 дня", en: "2 days in the fridge" },
    ingredients: { uz: ["Tovuq ko'kragi 200g", "Ziravorlar", "Zaytun moyi", "Broccoli", "Sarimsoq"], ru: ["Куриная грудка 200г", "Специи", "Оливковое масло", "Брокколи", "Чеснок"], en: ["Chicken breast 200g", "Spices", "Olive oil", "Broccoli", "Garlic"] },
    recipe: { uz: ["Tovuqni marinadlang", "30 daqiqa ushlab turing", "Grilda pishiring", "Broccolini bug'lang", "Birga tortib bering"], ru: ["Замаринуйте курицу", "Оставьте на 30 минут", "Обжарьте на гриле", "Приготовьте брокколи на пару", "Подавайте вместе"], en: ["Marinate the chicken", "Rest for 30 minutes", "Grill until cooked", "Steam the broccoli", "Serve together"] },
  },
  {
    id: "berry-oatmeal",
    image: oatmealImg,
    categories: ["breakfast", "healthy", "student", "kids"],
    name: { uz: "Rezavorli suli bo'tqasi", ru: "Овсянка с ягодами", en: "Berry Oatmeal" },
    short: { uz: "Ideal energiyali nonushta", ru: "Идеальный энергичный завтрак", en: "Ideal energizing breakfast" },
    calories: 220, protein: 8, fat: 5, carbs: 38, prepTime: 10, price: 1, healthScore: 90, rating: 4.8,
    vitamins: ["B1", "C", "E"], minerals: ["Magniy", "Temir", "Marganes"],
    description: {
      uz: "Suli bo'tqasi rezavorlar bilan — sekin uglevodlar va antioksidantlarga boy. Kun boshlash uchun mukammal.",
      ru: "Овсянка с ягодами богата медленными углеводами и антиоксидантами. Идеальна для старта дня.",
      en: "Oatmeal with berries is rich in slow carbs and antioxidants. Perfect to start the day.",
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
    image: saladImg,
    categories: ["weightloss", "vegetarian", "healthy", "dinner"],
    name: { uz: "Yashil salat", ru: "Зелёный салат", en: "Green Salad" },
    short: { uz: "Yengil va vitaminga boy", ru: "Лёгкий и богатый витаминами", en: "Light and vitamin-rich" },
    calories: 95, protein: 3, fat: 6, carbs: 8, prepTime: 8, price: 1, healthScore: 98, rating: 4.6,
    vitamins: ["A", "C", "K"], minerals: ["Kaliy", "Folat", "Kaltsiy"],
    description: {
      uz: "Yangi ko'katlar, pomidor va urug'lardan tayyorlangan salat — minimal kaloriya, maksimal foyda.",
      ru: "Салат из свежей зелени, томатов и семян — минимум калорий, максимум пользы.",
      en: "A salad of fresh greens, tomatoes and seeds — minimum calories, maximum benefit.",
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
    image: smoothieImg,
    categories: ["breakfast", "sport", "protein", "weightgain", "student"],
    name: { uz: "Rezavor smoothie", ru: "Ягодный смузи", en: "Berry Smoothie" },
    short: { uz: "Tez va to'yimli energiya", ru: "Быстрая и сытная энергия", en: "Quick, filling energy" },
    calories: 280, protein: 15, fat: 6, carbs: 42, prepTime: 5, price: 2, healthScore: 88, rating: 4.9,
    vitamins: ["C", "B6", "K"], minerals: ["Kaliy", "Kaltsiy", "Magniy"],
    description: {
      uz: "Rezavorlar, banan va protein qo'shilgan smoothie — mashg'ulotdan oldin yoki keyin ajoyib tanlov.",
      ru: "Смузи из ягод, банана и протеина — отличный выбор до или после тренировки.",
      en: "A smoothie of berries, banana and protein — great before or after a workout.",
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
    image: steakImg,
    categories: ["protein", "sport", "weightgain", "dinner"],
    name: { uz: "Grildagi bifshteks", ru: "Стейк на гриле", en: "Grilled Steak" },
    short: { uz: "Temir va proteinga boy premium go'sht", ru: "Премиальное мясо, богатое железом и белком", en: "Premium meat rich in iron and protein" },
    calories: 271, protein: 25, fat: 19, carbs: 2, prepTime: 22, price: 3, healthScore: 82, rating: 4.9,
    vitamins: ["B12", "B6", "B3"], minerals: ["Temir", "Rux", "Selen"],
    description: {
      uz: "Yumshoq mol go'shti bifshteks — mushak massasi va energiya uchun ideal. Grilda pishirilgan sabzavotlar bilan beriladi.",
      ru: "Нежный говяжий стейк — идеален для набора мышечной массы и энергии. Подаётся с овощами на гриле.",
      en: "Tender beef steak — ideal for muscle mass and energy. Served with grilled vegetables.",
    },
    benefits: { uz: ["Mushak o'sishi", "Qonsizlikka qarshi", "Energiya beradi", "Immunitetni mustahkamlaydi"], ru: ["Рост мышц", "Против анемии", "Даёт энергию", "Укрепляет иммунитет"], en: ["Muscle growth", "Fights anemia", "Boosts energy", "Strengthens immunity"] },
    forWhom: { uz: "Sportchilar, vazn olmoqchilar", ru: "Спортсмены, набирающие вес", en: "Athletes, those gaining weight" },
    notForWhom: { uz: "Podagra va yurak kasalliklarida cheklang", ru: "Ограничить при подагре и болезнях сердца", en: "Limit with gout and heart disease" },
    whenEat: { uz: "Kechki ovqat", ru: "Ужин", en: "Dinner" },
    dailyRec: { uz: "Haftasiga 2 marta, 200g", ru: "2 раза в неделю, 200г", en: "2 times a week, 200g" },
    storage: { uz: "Muzlatgichda 2 kun", ru: "В холодильнике 2 дня", en: "2 days in the fridge" },
    ingredients: { uz: ["Mol go'shti 250g", "Rozmarin", "Sarimsoq", "Zaytun moyi", "Sabzavotlar"], ru: ["Говядина 250г", "Розмарин", "Чеснок", "Оливковое масло", "Овощи"], en: ["Beef 250g", "Rosemary", "Garlic", "Olive oil", "Vegetables"] },
    recipe: { uz: ["Go'shtni xona haroratiga keltiring", "Tuz va qalampir seping", "Qaynoq grilda pishiring", "5 daqiqa dam bering", "Sabzavot bilan bering"], ru: ["Доведите мясо до комнатной температуры", "Посолите и поперчите", "Обжарьте на горячем гриле", "Дайте отдохнуть 5 минут", "Подавайте с овощами"], en: ["Bring meat to room temperature", "Season with salt and pepper", "Sear on a hot grill", "Rest for 5 minutes", "Serve with vegetables"] },
  },
  {
    id: "sushi-platter",
    image: sushiImg,
    categories: ["healthy", "protein", "lunch", "dinner"],
    name: { uz: "Sushi to'plami", ru: "Сет суши", en: "Sushi Platter" },
    short: { uz: "Yengil va nafis premium taom", ru: "Лёгкое и изысканное премиум блюдо", en: "Light and refined premium dish" },
    calories: 190, protein: 9, fat: 5, carbs: 28, prepTime: 30, price: 3, healthScore: 89, rating: 4.9,
    vitamins: ["B12", "D", "A"], minerals: ["Yod", "Omega-3", "Magniy"],
    description: {
      uz: "Yangi losos, avokado va guruch bilan tayyorlangan sushi to'plami — dengiz mahsulotlarining nafis uyg'unligi.",
      ru: "Сет суши со свежим лососем, авокадо и рисом — изысканное сочетание морепродуктов.",
      en: "A sushi set with fresh salmon, avocado and rice — a refined seafood combination.",
    },
    benefits: { uz: ["Omega-3 manbai", "Kam kaloriyali", "Miya uchun foydali", "Yengil hazm bo'ladi"], ru: ["Источник Omega-3", "Низкокалорийно", "Полезно для мозга", "Легко усваивается"], en: ["Source of Omega-3", "Low calorie", "Good for the brain", "Easy to digest"] },
    forWhom: { uz: "Sog'lom ovqatlanuvchilar", ru: "Приверженцы ЗОЖ", en: "Healthy-eating fans" },
    notForWhom: { uz: "Homilador ayollar (xom baliq)", ru: "Беременные (сырая рыба)", en: "Pregnant women (raw fish)" },
    whenEat: { uz: "Tushlik yoki kechki ovqat", ru: "Обед или ужин", en: "Lunch or dinner" },
    dailyRec: { uz: "Haftasiga 1–2 marta", ru: "1–2 раза в неделю", en: "1–2 times a week" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat fresh" },
    ingredients: { uz: ["Losos", "Guruch", "Avokado", "Nori", "Soya sousi"], ru: ["Лосось", "Рис", "Авокадо", "Нори", "Соевый соус"], en: ["Salmon", "Rice", "Avocado", "Nori", "Soy sauce"] },
    recipe: { uz: ["Guruchni pishiring", "Nori ustiga yoying", "Masalliqni joylang", "Rulon qiling", "Bo'laklarga kesing"], ru: ["Отварите рис", "Разложите на нори", "Выложите начинку", "Сверните рулет", "Нарежьте на кусочки"], en: ["Cook the rice", "Spread over nori", "Add filling", "Roll it up", "Cut into pieces"] },
  },
  {
    id: "avocado-toast",
    image: avocadoToastImg,
    categories: ["breakfast", "vegetarian", "healthy", "student"],
    name: { uz: "Avokadoli tost", ru: "Тост с авокадо", en: "Avocado Toast" },
    short: { uz: "Foydali yog'larga boy nonushta", ru: "Завтрак, богатый полезными жирами", en: "Breakfast rich in healthy fats" },
    calories: 250, protein: 10, fat: 15, carbs: 22, prepTime: 10, price: 2, healthScore: 91, rating: 4.8,
    vitamins: ["E", "K", "B9"], minerals: ["Kaliy", "Magniy", "Folat"],
    description: {
      uz: "Bug'doy nonidagi avokado va qaynatilgan tuxum — sog'lom yog'lar va protein bilan kuchli nonushta.",
      ru: "Авокадо и яйцо-пашот на цельнозерновом хлебе — мощный завтрак с полезными жирами и белком.",
      en: "Avocado and poached egg on whole-grain bread — a powerful breakfast with healthy fats and protein.",
    },
    benefits: { uz: ["Uzoq to'qlik", "Yurak salomatligi", "Terini yaxshilaydi", "Energiya beradi"], ru: ["Долгая сытость", "Здоровье сердца", "Улучшает кожу", "Даёт энергию"], en: ["Long fullness", "Heart health", "Improves skin", "Gives energy"] },
    forWhom: { uz: "Hamma, studentlar", ru: "Все, студенты", en: "Everyone, students" },
    notForWhom: { uz: "Glyutenga chidamsizlar", ru: "Непереносимость глютена", en: "Gluten intolerance" },
    whenEat: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast" },
    dailyRec: { uz: "Ertalab 1 porsiya", ru: "1 порция утром", en: "1 morning serving" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat fresh" },
    ingredients: { uz: ["Bug'doy noni", "Avokado", "Tuxum", "Urug'lar", "Limon"], ru: ["Цельнозерновой хлеб", "Авокадо", "Яйцо", "Семена", "Лимон"], en: ["Whole-grain bread", "Avocado", "Egg", "Seeds", "Lemon"] },
    recipe: { uz: ["Nonni qizdiring", "Avokadoni ezing", "Non ustiga yoying", "Tuxumni qaynating", "Urug' seping"], ru: ["Подрумяньте хлеб", "Разомните авокадо", "Намажьте на хлеб", "Приготовьте яйцо", "Посыпьте семенами"], en: ["Toast the bread", "Mash the avocado", "Spread on bread", "Poach the egg", "Sprinkle seeds"] },
  },
  {
    id: "lentil-soup",
    image: soupImg,
    categories: ["healthy", "vegetarian", "weightloss", "lunch", "dinner"],
    name: { uz: "Yasmiq sho'rvasi", ru: "Чечевичный суп", en: "Lentil Soup" },
    short: { uz: "Isituvchi va to'yimli sho'rva", ru: "Согревающий и сытный суп", en: "Warming and filling soup" },
    calories: 180, protein: 12, fat: 4, carbs: 28, prepTime: 35, price: 1, healthScore: 95, rating: 4.7,
    vitamins: ["B1", "B6", "B9"], minerals: ["Temir", "Magniy", "Kaliy"],
    description: {
      uz: "Yasmiq va sabzavotlardan tayyorlangan sho'rva — o'simlik proteini va tolaga juda boy.",
      ru: "Суп из чечевицы и овощей — очень богат растительным белком и клетчаткой.",
      en: "A soup of lentils and vegetables — very rich in plant protein and fiber.",
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
    image: wrapImg,
    categories: ["fast", "protein", "lunch", "student"],
    name: { uz: "Tovuqli wrap", ru: "Ролл с курицей", en: "Chicken Wrap" },
    short: { uz: "Tez va to'yimli protein taom", ru: "Быстрое и сытное белковое блюдо", en: "Quick and filling protein meal" },
    calories: 320, protein: 24, fat: 11, carbs: 32, prepTime: 12, price: 2, healthScore: 84, rating: 4.7,
    vitamins: ["B3", "B6", "C"], minerals: ["Fosfor", "Kaliy", "Selen"],
    description: {
      uz: "Grilda pishirilgan tovuq, yangi sabzavotlar va sous bilan lavash roll — tez tushlik uchun ideal.",
      ru: "Ролл из лаваша с курицей на гриле, свежими овощами и соусом — идеален для быстрого обеда.",
      en: "A flatbread wrap with grilled chicken, fresh vegetables and sauce — ideal for a quick lunch.",
    },
    benefits: { uz: ["Tez energiya", "Protein manbai", "To'yimli", "Qulay"], ru: ["Быстрая энергия", "Источник белка", "Сытно", "Удобно"], en: ["Quick energy", "Protein source", "Filling", "Convenient"] },
    forWhom: { uz: "Studentlar, band odamlar", ru: "Студенты, занятые люди", en: "Students, busy people" },
    notForWhom: { uz: "Qattiq dieta ustidagilar", ru: "На строгой диете", en: "Those on a strict diet" },
    whenEat: { uz: "Tushlik", ru: "Обед", en: "Lunch" },
    dailyRec: { uz: "Kuniga 1 dona", ru: "1 штука в день", en: "1 piece per day" },
    storage: { uz: "Tayyorlab darhol yeng", ru: "Есть сразу", en: "Eat fresh" },
    ingredients: { uz: ["Lavash", "Tovuq filesi", "Salat", "Pomidor", "Yogurt sousi"], ru: ["Лаваш", "Куриное филе", "Салат", "Помидор", "Йогуртовый соус"], en: ["Flatbread", "Chicken fillet", "Lettuce", "Tomato", "Yogurt sauce"] },
    recipe: { uz: ["Tovuqni pishiring", "Lavashni yoying", "Sabzavot joylang", "Sous quying", "Rulon qilib o'rang"], ru: ["Приготовьте курицу", "Разложите лаваш", "Выложите овощи", "Полейте соусом", "Сверните ролл"], en: ["Cook the chicken", "Lay out the flatbread", "Add vegetables", "Drizzle sauce", "Roll it up"] },
  },
  {
    id: "berry-parfait",
    image: parfaitImg,
    categories: ["breakfast", "healthy", "kids", "student"],
    name: { uz: "Rezavor parfe", ru: "Ягодный парфе", en: "Berry Parfait" },
    short: { uz: "Yogurt, granola va rezavor", ru: "Йогурт, гранола и ягоды", en: "Yogurt, granola and berries" },
    calories: 210, protein: 11, fat: 6, carbs: 30, prepTime: 5, price: 1, healthScore: 90, rating: 4.8,
    vitamins: ["C", "B2", "D"], minerals: ["Kaltsiy", "Kaliy", "Fosfor"],
    description: {
      uz: "Grek yogurti, xrustli granola, yangi rezavor va asal qatlamlari — mazali va foydali nonushta.",
      ru: "Слои греческого йогурта, хрустящей гранолы, свежих ягод и мёда — вкусный и полезный завтрак.",
      en: "Layers of Greek yogurt, crunchy granola, fresh berries and honey — a tasty and healthy breakfast.",
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
];

// Real sale prices in Uzbek so'm (prepared, ready-to-order meals)
export const FOOD_PRICES: Record<string, number> = {
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
};

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


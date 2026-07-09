import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Search, Plus, X, RotateCcw, CheckCircle2, 
  AlertCircle, ChefHat, ShoppingCart, Clock, Star, Flame, Sparkles
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { foods, getIngredientsList, getPrice, formatPrice, type Food } from "@/lib/foods";

export const Route = createFileRoute("/fridge")({
  head: () => ({
    meta: [
      { title: "Mening Muzlatgichim — To'g'ri Ovqatlanish Siri" },
      { name: "description", content: "Muzlatgichingizdagi mahsulotlarni tanlang va mos keladigan sog'lom taomlarni oling." }
    ],
  }),
  component: MyFridge,
});

const INGREDIENT_CATEGORIES = [
  {
    id: "proteins",
    name: { uz: "Go'sht va Oqsil 🥩", ru: "Мясо и белки 🥩", en: "Meats & Proteins 🥩" },
    items: [
      { id: "tovuq", name: "Tovuq filesi 🍗" },
      { id: "go'sht", name: "Mol go'shti 🥩" },
      { id: "tuna", name: "Tuna (konserva) 🐟" },
      { id: "tuxum", name: "Tuxum 🥚" },
    ]
  },
  {
    id: "dairy",
    name: { uz: "Sut mahsulotlari 🥛", ru: "Молочные продукты 🥛", en: "Dairy & Cheese 🥛" },
    items: [
      { id: "pishloq", name: "Pishloq / Feta 🧀" },
      { id: "sut", name: "Sut / Qaymoq 🥛" },
    ]
  },
  {
    id: "veggies",
    name: { uz: "Sabzavotlar 🥬", ru: "Овощи и зелень 🥬", en: "Veggies & Greens 🥬" },
    items: [
      { id: "pomidor", name: "Pomidor 🍅" },
      { id: "bodring", name: "Bodring 🥒" },
      { id: "ismaloq", name: "Ismaloq 🥬" },
      { id: "avokado", name: "Avokado 🥑" },
    ]
  },
  {
    id: "grains",
    name: { uz: "Donlar va Non 🍞", ru: "Злаки и хлеб 🍞", en: "Grains & Bakery 🍞" },
    items: [
      { id: "non", name: "Non / Tost 🍞" },
      { id: "guruch", name: "Guruch 🌾" },
    ]
  },
  {
    id: "spices",
    name: { uz: "Moy va Qo'shimchalar 🍯", ru: "Масла и специи 🍯", en: "Oils & Spices 🍯" },
    items: [
      { id: "limon", name: "Limon 🍋" },
      { id: "zaytun moyi", name: "Zaytun moyi 🫒" },
      { id: "asal", name: "Asal 🍯" },
      { id: "sedana", name: "Sedana 🌿" },
    ]
  }
];

function VirtualFridge({ selected, lang }: { selected: string[]; lang: "uz" | "ru" | "en" }) {
  return (
    <div className="relative border border-primary/20 bg-black/40 rounded-3xl p-5 shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-between">
      {/* Laser Reflection sweep */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Fridge Top Grill */}
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <span className="text-[10px] font-extrabold text-primary tracking-widest flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" /> SMART FRIDGE CONSOLE v3.0
        </span>
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
      </div>

      {/* Grid of Shelves */}
      <div className="flex-1 py-4 space-y-5 flex flex-col justify-around">
        {INGREDIENT_CATEGORIES.map((cat, idx) => {
          const shelfItems = cat.items.map(i => i.id);
          const selectedOnShelf = shelfItems.filter(item => selected.includes(item));
          
          return (
            <div key={cat.id} className="relative pb-2">
              <span className="text-[9px] text-white/30 font-bold uppercase tracking-wider block mb-1.5">
                {cat.name[lang]}
              </span>
              <div className="flex flex-wrap gap-1.5 min-h-[44px] items-center px-2 py-1 rounded-xl bg-white/[0.01] border border-white/[0.02]">
                {selectedOnShelf.length === 0 ? (
                  <span className="text-[10px] text-white/10 italic px-1">
                    {lang === "uz" ? "Bo'sh..." : lang === "ru" ? "Пусто..." : "Empty..."}
                  </span>
                ) : (
                  <AnimatePresence>
                    {selectedOnShelf.map(itemId => {
                      const itemObj = cat.items.find(i => i.id === itemId);
                      return (
                        <motion.span
                          key={itemId}
                          initial={{ scale: 0.8, y: 5, opacity: 0 }}
                          animate={{ scale: 1, y: 0, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="inline-flex items-center gap-1 rounded-lg bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs text-primary font-bold shadow-glow"
                        >
                          {itemObj?.name}
                        </motion.span>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>
              {/* Shelf physical line */}
              <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Fridge bottom drawer */}
      <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[10px] text-white/40 font-mono">
        <span>SYSTEM_COOLING: ACTIVE</span>
        <span className="text-primary font-bold">TEMP: +3.2 °C</span>
      </div>
    </div>
  );
}

function MyFridge() {
  const { t, lang } = useI18n();
  const { add } = useCart();
  
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const toggleIngredient = (id: string) => {
    setIsScanning(true);
    setSelectedIngredients(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    setTimeout(() => setIsScanning(false), 900);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const val = customInput.trim().toLowerCase();
    if (!val) return;
    setIsScanning(true);
    if (!selectedIngredients.includes(val)) {
      setSelectedIngredients(prev => [...prev, val]);
    }
    setCustomInput("");
    setTimeout(() => setIsScanning(false), 900);
  };

  const removeIngredient = (id: string) => {
    setIsScanning(true);
    setSelectedIngredients(prev => prev.filter(i => i !== id));
    setTimeout(() => setIsScanning(false), 900);
  };

  const resetAll = () => {
    setIsScanning(true);
    setSelectedIngredients([]);
    toast.success("Muzlatgich tozalandi!");
    setTimeout(() => setIsScanning(false), 900);
  };

  const handleAddToCart = (id: string, name: string) => {
    add(id);
    toast.success(`"${name}" ${lang === "uz" ? "savatchaga qo'shildi!" : "добавлен в корзину!"}`);
  };

  const handleAddMissingToCart = (missing: string[]) => {
    let addedCount = 0;
    missing.forEach(m => {
      // Find clean matching ID from popular ingredients
      const cleanM = m.replace(/[^\w\s']/g, "").trim().toLowerCase();
      // Look for a close match
      const allItems = INGREDIENT_CATEGORIES.flatMap(c => c.items);
      const found = allItems.find(item => cleanM.includes(item.id) || item.id.includes(cleanM));
      if (found) {
        add(found.id);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      toast.success(
        lang === "uz" 
          ? "Kamchilik bo'lgan mahsulotlar savatga qo'shildi!" 
          : "Недостающие ингредиенты добавлены в корзину!"
      );
    } else {
      toast.info(
        lang === "uz"
          ? "Retsept bo'yicha buyurtma bering yoki taomni to'g'ridan-to'g'ri zakaz qiling"
          : "Закажите готовое блюдо или добавьте ингредиенты вручную"
      );
    }
  };

  // Match calculations
  const matches = foods.map(food => {
    const foodIngs = getIngredientsList(food);
    const userHas = foodIngs.filter(ing => selectedIngredients.includes(ing.toLowerCase()));
    const missing = foodIngs.filter(ing => !selectedIngredients.includes(ing.toLowerCase()));
    const percentage = foodIngs.length > 0 ? Math.round((userHas.length / foodIngs.length) * 100) : 0;
    
    return {
      food,
      totalCount: foodIngs.length,
      userHasCount: userHas.length,
      missing,
      percentage
    };
  });

  // Filters
  const readyMatches = matches.filter(m => m.percentage === 100 && m.totalCount > 0);
  const partialMatches = matches.filter(m => m.percentage >= 40 && m.percentage < 100 && m.missing.length <= 2).sort((a,b) => b.percentage - a.percentage);

  return (
    <div className="px-4 pb-24 pt-32 md:pt-40 relative">
      {/* Styles for scanning laser animation */}
      <style>{`
        @keyframes laser-sweep {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .laser-scanner-line {
          animation: laser-sweep 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> {t("nav.home")}
          </Link>
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold md:text-5xl flex items-center gap-3">
                Mening <span className="text-gradient">Muzlatgichim</span> ❄️
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground text-sm md:text-base">
                Muzlatgichingizdagi mavjud mahsulotlarni tanlang. Biz sizga nima pishirish mumkinligi va yetishmayotgan mahsulotlarni ko'rsatamiz.
              </p>
            </div>
            {selectedIngredients.length > 0 && (
              <button 
                onClick={resetAll}
                className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Tozalash
              </button>
            )}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Left panel: Virtual Fridge & Selector */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <VirtualFridge selected={selectedIngredients} lang={lang} />
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass rounded-[2rem] p-5 border border-white/5 bg-[#0a0f0d]/40">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
                  {lang === "uz" ? "Mahsulotlarni tanlang" : "Выберите ингредиенты"}
                </h3>
                
                {/* Categorized Selector Panels */}
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {INGREDIENT_CATEGORIES.map(category => (
                    <div key={category.id} className="space-y-2">
                      <span className="text-[10px] text-primary/70 font-bold uppercase tracking-wider block px-1">
                        {category.name[lang]}
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {category.items.map(item => {
                          const isSelected = selectedIngredients.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              onClick={() => toggleIngredient(item.id)}
                              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold border transition-all text-left cursor-pointer ${
                                isSelected 
                                  ? "border-primary bg-primary/10 text-white shadow-lg shadow-primary/5" 
                                  : "border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <span className="truncate">{item.name}</span>
                              {isSelected && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Input */}
                <form onSubmit={handleAddCustom} className="mt-5 pt-4 border-t border-white/5 flex gap-2">
                  <div className="flex-1 relative flex items-center bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs">
                    <Search className="h-3.5 w-3.5 text-white/30 mr-2 shrink-0" />
                    <input
                      value={customInput}
                      onChange={e => setCustomInput(e.target.value)}
                      placeholder={lang === "uz" ? "Boshqa mahsulot..." : "Другой ингредиент..."}
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/20"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shrink-0 active:scale-95 shadow-lg shadow-primary/10 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Selected List */}
            {selectedIngredients.length > 0 && (
              <Reveal delay={0.2}>
                <div className="glass rounded-[2rem] p-5 border border-white/5 bg-[#0a0f0d]/40">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                    {lang === "uz" ? "Siz tanlaganlar" : "Выбранные"} ({selectedIngredients.length})
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedIngredients.map(ing => (
                      <span 
                        key={ing} 
                        className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs text-primary font-medium"
                      >
                        {ing}
                        <button 
                          onClick={() => removeIngredient(ing)}
                          className="hover:bg-primary/10 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Right panel: Suggested Recipes */}
          <div className="space-y-8 relative min-h-[500px]">
            {/* Holographic Radar Scanner overlay when scanning */}
            <AnimatePresence>
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#070c0a]/70 backdrop-blur-md rounded-[2.5rem] border border-primary/10 overflow-hidden"
                >
                  {/* Laser green sweeping line */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_#10b981] laser-scanner-line" />
                  
                  <motion.div
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="flex flex-col items-center p-8 rounded-full border border-primary/20 bg-primary/5 relative"
                  >
                    <ChefHat className="h-16 w-16 text-primary animate-pulse" />
                    <span className="text-xs font-extrabold text-primary tracking-widest uppercase mt-4 block">
                      AI SCANNING INGREDIENTS...
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {selectedIngredients.length === 0 ? (
              <div className="glass rounded-[2rem] p-16 text-center border border-white/5 bg-[#0a0f0d]/30 flex flex-col items-center justify-center h-full min-h-[450px]">
                <ChefHat className="h-16 w-16 text-white/20 mb-4 animate-bounce" style={{ animationDuration: "3s" }} />
                <h3 className="text-xl font-bold text-white/80">
                  {lang === "uz" ? "Muzlatgichingiz bo'sh" : "Ваш холодильник пуст"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm leading-relaxed">
                  {lang === "uz" 
                    ? "Chap tomondagi ro'yxatdan muzlatgichingizda bor mahsulotlarni tanlang. Biz sizga tayyorlash mumkin bo'lgan professional retseptlarni skanerlab chiqamiz!"
                    : "Выберите продукты из разделов слева. Мы просканируем рецепты и предложим подходящие варианты!"}
                </p>
              </div>
            ) : (
              <>
                {/* 100% Match */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 px-1">
                    <CheckCircle2 className="h-5 w-5 text-primary animate-pulse" />
                    {lang === "uz" ? "Tayyorlash mumkin bo'lgan taomlar" : "Можно приготовить"} ({readyMatches.length})
                  </h2>
                  
                  {readyMatches.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2">
                      {readyMatches.map(({ food }) => (
                        <FridgeFoodCard 
                          key={food.id} 
                          food={food} 
                          percent={100} 
                          missing={[]} 
                          onOrder={() => handleAddToCart(food.id, food.name[lang])}
                          onAddMissing={handleAddMissingToCart}
                          lang={lang}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="glass rounded-2xl p-6 text-center border border-white/5 text-xs text-white/40">
                      {lang === "uz" 
                        ? "Hozircha 100% mos keluvchi taom topilmadi. Boshqa mahsulotlarni ham belgilab ko'ring." 
                        : "Пока нет блюд со 100% соответствием. Попробуйте выбрать дополнительные ингредиенты."}
                    </div>
                  )}
                </div>

                {/* Partial Match */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 px-1">
                    <AlertCircle className="h-5 w-5 text-gold" />
                    {lang === "uz" ? "Deyarli tayyor (Kamchilik bor)" : "Почти готово (Не хватает продуктов)"} ({partialMatches.length})
                  </h2>

                  {partialMatches.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2">
                      {partialMatches.map(({ food, percentage, missing }) => (
                        <FridgeFoodCard 
                          key={food.id} 
                          food={food} 
                          percent={percentage} 
                          missing={missing} 
                          onOrder={() => handleAddToCart(food.id, food.name[lang])}
                          onAddMissing={handleAddMissingToCart}
                          lang={lang}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="glass rounded-2xl p-6 text-center border border-white/5 text-xs text-white/40">
                      {lang === "uz"
                        ? "Mavjud mahsulotlarga yaqin boshqa taomlar topilmadi."
                        : "Блюд с частичным совпадением не найдено."}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub Card Component ────────────────────────────────────────────────────────

function FridgeFoodCard({ 
  food, percent, missing, onOrder, onAddMissing, lang 
}: { 
  food: Food; percent: number; missing: string[]; onOrder: () => void; onAddMissing: (missing: string[]) => void; lang: "uz" | "ru" | "en";
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="glass rounded-3xl p-4.5 border border-white/5 relative overflow-hidden flex flex-col justify-between hover:border-primary/20 hover:shadow-[0_15px_30px_rgba(16,185,129,0.06)] transition-all duration-300"
    >
      <div>
        {/* Top Cover */}
        <div className="relative h-44 w-full overflow-hidden rounded-2xl">
          <img src={food.image} alt={food.name[lang]} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
          <div className="absolute top-2 left-2 bg-black/60 border border-white/10 rounded-lg px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-1 backdrop-blur-md">
            <Clock className="h-3 w-3 text-primary" /> {food.prepTime} min
          </div>
          <div className="absolute top-2 right-2 bg-black/60 border border-white/10 rounded-lg px-2 py-0.5 text-[10px] font-bold text-yellow-400 flex items-center gap-1 backdrop-blur-md">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" /> {food.rating}
          </div>
        </div>

        {/* Content */}
        <div className="mt-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-white text-base leading-snug">{food.name[lang]}</h3>
            <span className="text-xs font-extrabold text-primary shrink-0">{formatPrice(getPrice(food.id))}</span>
          </div>
          <p className="text-xs text-white/40 mt-1 line-clamp-2">{food.short[lang]}</p>
        </div>

        {/* Macros */}
        <div className="mt-3 grid grid-cols-4 gap-1.5 py-2 border-y border-white/5 text-center text-[10px] font-bold">
          <div className="text-gold">🔥 {food.calories} <span className="text-[8px] block font-medium text-white/30">kcal</span></div>
          <div className="text-chart-3">💪 {food.protein}g <span className="text-[8px] block font-medium text-white/30">protein</span></div>
          <div className="text-chart-5">💧 {food.fat}g <span className="text-[8px] block font-medium text-white/30">fat</span></div>
          <div className="text-primary">🌾 {food.carbs}g <span className="text-[8px] block font-medium text-white/30">carbs</span></div>
        </div>

        {/* Matching status */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-white/40">{lang === "uz" ? "Tarkib mosligi:" : "Совпадение:"}</span>
            <span style={{ color: percent === 100 ? "var(--color-primary)" : "var(--color-gold)" }}>{percent}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${percent}%`,
                background: percent === 100 ? "var(--gradient-primary)" : "linear-gradient(90deg, #f59e0b, #d97706)"
              }}
            />
          </div>
        </div>

        {/* Missing products notification */}
        {missing.length > 0 && (
          <div className="mt-3 rounded-xl bg-red-500/5 border border-red-500/10 p-2 text-[10px] text-red-300 leading-normal">
            ⚠️ <strong>{lang === "uz" ? "Sizda yo'q ingredientlar:" : "Не хватает:"}</strong>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {missing.map(m => (
                <span key={m} className="bg-red-500/10 border border-red-500/20 text-red-300 px-1.5 py-0.5 rounded-md font-semibold">
                  ✖ {m}
                </span>
              ))}
            </div>
            
            <button
              type="button"
              onClick={() => onAddMissing(missing)}
              className="mt-2 w-full flex items-center justify-center gap-1 rounded-lg bg-gold/10 border border-gold/20 py-1.5 text-[9px] font-bold text-gold hover:bg-gold/20 transition-all cursor-pointer"
            >
              <ShoppingCart className="h-3 w-3" />
              {lang === "uz" ? "Kamchiliklarni savatga solish" : "Купить недостающие"}
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-2">
        <Link
          to="/food/$foodId"
          params={{ foodId: food.id }}
          className="flex items-center justify-center gap-1 rounded-xl border border-white/10 hover:border-white/20 py-2.5 text-xs font-bold text-white/70 hover:text-white transition-all text-center"
        >
          <ChefHat className="h-3.5 w-3.5" /> {lang === "uz" ? "Retsept" : "Рецепт"}
        </Link>
        <button
          onClick={onOrder}
          className="flex items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-bold text-white shadow-lg active:scale-95 transition-all text-center cursor-pointer"
          style={{ background: "var(--gradient-primary)" }}
        >
          <ShoppingCart className="h-3.5 w-3.5" /> {lang === "uz" ? "Zakaz" : "Заказать"}
        </button>
      </div>
    </motion.div>
  );
}

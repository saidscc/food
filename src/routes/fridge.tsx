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

const POPULAR_INGREDIENTS = [
  { id: "tuxum", name: "Tuxum 🥚", color: "from-amber-400/10 to-amber-500/5 border-amber-500/20 text-amber-300 hover:border-amber-500/40" },
  { id: "pomidor", name: "Pomidor 🍅", color: "from-red-500/10 to-red-600/5 border-red-500/20 text-red-300 hover:border-red-500/40" },
  { id: "bodring", name: "Bodring 🥒", color: "from-green-500/10 to-green-600/5 border-green-500/20 text-green-300 hover:border-green-500/40" },
  { id: "sedana", name: "Sedana 🌿", color: "from-slate-600/20 to-slate-700/10 border-slate-500/20 text-slate-300 hover:border-slate-500/40" },
  { id: "tovuq", name: "Tovuq filesi 🍗", color: "from-orange-400/10 to-orange-500/5 border-orange-500/20 text-orange-300 hover:border-orange-500/40" },
  { id: "go'sht", name: "Mol go'shti 🥩", color: "from-rose-600/10 to-rose-700/5 border-rose-500/20 text-rose-300 hover:border-rose-500/40" },
  { id: "pishloq", name: "Feta / Pishloq 🧀", color: "from-yellow-400/10 to-yellow-500/5 border-yellow-500/20 text-yellow-300 hover:border-yellow-500/40" },
  { id: "non", name: "Non / Tost 🍞", color: "from-amber-600/10 to-amber-700/5 border-amber-600/20 text-amber-200 hover:border-amber-600/40" },
  { id: "avokado", name: "Avokado 🥑", color: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-300 hover:border-emerald-500/40" },
  { id: "limon", name: "Limon 🍋", color: "from-yellow-300/10 to-yellow-400/5 border-yellow-400/20 text-yellow-200 hover:border-yellow-400/40" },
  { id: "guruch", name: "Guruch 🌾", color: "from-zinc-100/10 to-zinc-200/5 border-zinc-500/20 text-zinc-300 hover:border-zinc-500/40" },
  { id: "sut", name: "Sut / Qaymoq 🥛", color: "from-blue-200/10 to-blue-300/5 border-blue-400/20 text-blue-200 hover:border-blue-400/40" },
  { id: "zaytun moyi", name: "Zaytun moyi 🫒", color: "from-lime-600/10 to-lime-700/5 border-lime-500/20 text-lime-300 hover:border-lime-500/40" },
  { id: "ismaloq", name: "Ismaloq 🥬", color: "from-emerald-600/10 to-emerald-700/5 border-emerald-500/20 text-emerald-300 hover:border-emerald-500/40" },
  { id: "asal", name: "Asal 🍯", color: "from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-300 hover:border-amber-500/40" },
  { id: "tuna", name: "Tuna (konserva) 🐟", color: "from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 text-cyan-300 hover:border-cyan-500/40" },
];

function MyFridge() {
  const { t, lang } = useI18n();
  const { add } = useCart();
  
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");

  const toggleIngredient = (id: string) => {
    setSelectedIngredients(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const val = customInput.trim().toLowerCase();
    if (!val) return;
    if (!selectedIngredients.includes(val)) {
      setSelectedIngredients(prev => [...prev, val]);
    }
    setCustomInput("");
  };

  const removeIngredient = (id: string) => {
    setSelectedIngredients(prev => prev.filter(i => i !== id));
  };

  const resetAll = () => {
    setSelectedIngredients([]);
    toast.success("Muzlatgich tozalandi!");
  };

  const handleAddToCart = (id: string, name: string) => {
    add(id);
    toast.success(`"${name}" savatchaga qo'shildi!`);
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
    <div className="px-4 pb-24 pt-32 md:pt-40">
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
                className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-95"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Tozalash
              </button>
            )}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* Left panel: Ingredient selector */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="glass rounded-[2rem] p-5 border border-white/5 bg-[#0a0f0d]/40">
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Mahsulotlarni tanlang</h3>
                
                {/* Popular Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {POPULAR_INGREDIENTS.map(item => {
                    const isSelected = selectedIngredients.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleIngredient(item.id)}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold border transition-all text-left bg-gradient-to-br ${item.color} ${
                          isSelected ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/5" : ""
                        }`}
                      >
                        <span className="truncate">{item.name}</span>
                        {isSelected && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary ml-1" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Input */}
                <form onSubmit={handleAddCustom} className="mt-5 pt-4 border-t border-white/5 flex gap-2">
                  <div className="flex-1 relative flex items-center bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs">
                    <Search className="h-3.5 w-3.5 text-white/30 mr-2 shrink-0" />
                    <input
                      value={customInput}
                      onChange={e => setCustomInput(e.target.value)}
                      placeholder="Boshqa mahsulot..."
                      className="w-full bg-transparent text-white outline-none placeholder:text-white/20"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shrink-0 active:scale-95 shadow-lg shadow-primary/10"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Selected Ingredients List */}
            {selectedIngredients.length > 0 && (
              <Reveal delay={0.2}>
                <div className="glass rounded-[2rem] p-5 border border-white/5 bg-[#0a0f0d]/40">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Muzlatgichdagi narsalar ({selectedIngredients.length})</h3>
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
          <div className="space-y-8">
            {selectedIngredients.length === 0 ? (
              <div className="glass rounded-[2rem] p-16 text-center border border-white/5 bg-[#0a0f0d]/30 flex flex-col items-center justify-center">
                <ChefHat className="h-16 w-16 text-white/20 mb-4 animate-bounce" style={{ animationDuration: "3s" }} />
                <h3 className="text-xl font-bold text-white/80">Muzlatgichingiz bo'sh</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Chap tomondagi ro'yxatdan do'kondagi mahsulotlarni tanlang yoki o'zingizda bor narsani kiriting. Biz sizga pishirish uchun retseptlar taklif qilamiz!
                </p>
              </div>
            ) : (
              <>
                {/* 100% Match: Ready to cook */}
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Tayyorlash mumkin bo'lgan taomlar ({readyMatches.length})
                  </h2>
                  
                  {readyMatches.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <AnimatePresence>
                        {readyMatches.map(({ food }) => (
                          <FridgeFoodCard 
                            key={food.id} 
                            food={food} 
                            percent={100} 
                            missing={[]} 
                            onOrder={() => handleAddToCart(food.id, food.name[lang])}
                            lang={lang}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="glass rounded-2xl p-6 text-center border border-white/5 text-xs text-white/40">
                      Sizda bor barcha mahsulotlar bilan 100% mos keladigan taom topilmadi. Qo'shimcha narsalar tanlab ko'ring.
                    </div>
                  )}
                </div>

                {/* Partial Match: Almost ready */}
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-gold" />
                    Deyarli tayyor (Kamchilik bor) ({partialMatches.length})
                  </h2>

                  {partialMatches.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <AnimatePresence>
                        {partialMatches.map(({ food, percentage, missing }) => (
                          <FridgeFoodCard 
                            key={food.id} 
                            food={food} 
                            percent={percentage} 
                            missing={missing} 
                            onOrder={() => handleAddToCart(food.id, food.name[lang])}
                            lang={lang}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="glass rounded-2xl p-6 text-center border border-white/5 text-xs text-white/40">
                      Mavjud mahsulotlarga yaqin boshqa taomlar topilmadi.
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
  food, percent, missing, onOrder, lang 
}: { 
  food: Food; percent: number; missing: string[]; onOrder: () => void; lang: "uz" | "ru" | "en";
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="glass rounded-3xl p-4 border border-white/5 relative overflow-hidden flex flex-col justify-between hover:border-white/10 hover:shadow-2xl transition-all"
    >
      <div>
        {/* Top Cover */}
        <div className="relative h-40 w-full overflow-hidden rounded-2xl">
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
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-primary">{formatPrice(getPrice(food.id))}</span>
            </div>
          </div>
          <p className="text-xs text-white/40 mt-1 line-clamp-2">{food.short[lang]}</p>
        </div>

        {/* Macros */}
        <div className="mt-3 grid grid-cols-4 gap-1.5 py-1.5 border-y border-white/5 text-center text-[10px] font-bold">
          <div className="text-gold">🔥 {food.calories} <span className="text-[8px] block font-medium text-white/30">kcal</span></div>
          <div className="text-chart-3">💪 {food.protein}g <span className="text-[8px] block font-medium text-white/30">protein</span></div>
          <div className="text-chart-5">💧 {food.fat}g <span className="text-[8px] block font-medium text-white/30">fat</span></div>
          <div className="text-primary">🌾 {food.carbs}g <span className="text-[8px] block font-medium text-white/30">carbs</span></div>
        </div>

        {/* Matching status */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-white/40">Mahsulotlar mosligi:</span>
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
            ⚠️ <strong>Ushbu taomni pishira olasiz, lekin sizda yo'q:</strong>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {missing.map(m => (
                <span key={m} className="bg-red-500/10 border border-red-500/20 text-red-300 px-1.5 py-0.5 rounded-md font-semibold">
                  ✖ {m}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3.5 border-t border-white/5 grid grid-cols-2 gap-2">
        <Link
          to="/food/$foodId"
          params={{ foodId: food.id }}
          className="flex items-center justify-center gap-1 rounded-xl border border-white/10 hover:border-white/20 py-2.5 text-xs font-bold text-white/70 hover:text-white transition-all text-center"
        >
          <ChefHat className="h-3.5 w-3.5" /> Retsept
        </Link>
        <button
          onClick={onOrder}
          className="flex items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-bold text-white shadow-lg active:scale-95 transition-all text-center"
          style={{ background: "var(--gradient-primary)" }}
        >
          <ShoppingCart className="h-3.5 w-3.5" /> Zakaz
        </button>
      </div>
    </motion.div>
  );
}

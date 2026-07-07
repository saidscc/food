import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Send, X, Minimize2, Maximize2, Sparkles, ChefHat,
  ShoppingCart, Clock, Star, Zap, MessageCircle
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { foods, categories, getIngredientsList, type Food } from "@/lib/foods";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

// ── AI response logic ───────────────────────────────────────────────────────

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
  foods?: Food[];
  recipe?: { food: Food; steps: string[] } | null;
  timestamp: Date;
};

function matchFoods(query: string): Food[] {
  const q = query.toLowerCase();
  return foods.filter((f) => {
    const name = f.name.uz.toLowerCase() + " " + f.name.ru.toLowerCase() + " " + f.name.en.toLowerCase();
    const cats = f.categories.join(" ");
    const desc = f.description.uz.toLowerCase();
    const ingr = f.ingredients.uz.join(" ").toLowerCase();
    return (
      name.includes(q) ||
      cats.includes(q) ||
      desc.includes(q) ||
      ingr.includes(q)
    );
  }).slice(0, 4);
}

const KEYWORDS: Record<string, string[]> = {
  tez: ["fast", "tez", "quick", "tezkor"],
  protein: ["protein", "oqsil", "белок", "mushak"],
  breakfast: ["nonushta", "ertalab", "завтрак", "breakfast"],
  diet: ["dieta", "ozish", "похудение", "diet", "vazn"],
  vegetarian: ["vegetarian", "vegan", "o'simlik"],
  kids: ["bola", "детям", "kids", "children"],
  tuxum: ["tuxum", "яйц", "egg", "omlet", "omelette", "scramble"],
  student: ["student", "арзон", "arzon", "cheap", "tez"],
  sport: ["sport", "mashg'ulot", "тренировка", "workout", "mashq"],
};

function generateAIResponse(userMsg: string): {
  text: string;
  foods?: Food[];
  recipe?: { food: Food; steps: string[] } | null;
} {
  const msg = userMsg.toLowerCase().trim();

  // Fridge / ingredients search
  const hasFridgeKeywords = /(bor|muzlatgich|muzlatkich|mahsulot|uydagi|ingredient|холодильник|имеются)/i.test(msg);
  if (hasFridgeKeywords) {
    const knownIngs = ["tuxum", "pomidor", "bodring", "sedana", "tovuq", "go'sht", "pishloq", "non", "avokado", "limon", "guruch", "sut", "zaytun moyi", "ismaloq", "asal", "tuna"];
    const userIngredients = knownIngs.filter(ing => msg.includes(ing));

    if (userIngredients.length > 0) {
      // Find food matches
      const matched = foods.map(food => {
        const foodIngs = getIngredientsList(food).map(i => i.toLowerCase());
        const userHas = foodIngs.filter(ing => userIngredients.includes(ing));
        const missing = foodIngs.filter(ing => !userIngredients.includes(ing));
        const percentage = foodIngs.length > 0 ? (userHas.length / foodIngs.length) * 100 : 0;
        return { food, percentage, missing };
      }).filter(m => m.percentage >= 40)
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 4);

      if (matched.length > 0) {
        let text = `❄️ Muzlatgichingizdagi narsalar (${userIngredients.join(", ")}) asosida quyidagilarni taklif qilaman:\n\n`;
        
        matched.forEach(m => {
          const percentRound = Math.round(m.percentage);
          if (m.missing.length === 0) {
            text += `✅ **${m.food.name.uz}** (100% mos keldi - barcha mahsulotlar bor!)\n`;
          } else {
            text += `⚠️ **${m.food.name.uz}** (${percentRound}% mos keldi). Sizga yana **${m.missing.join(", ")}** kerak.\n`;
          }
        });
        
        text += `\nUshbu taomlarni savatchaga qo'shishingiz yoki to'liq retseptini ko'rishingiz mumkin. Barcha mahsulotlarni boshqarish uchun **[Muzlatgichim ❄️](/fridge)** sahifasiga o'ting.`;

        return {
          text,
          foods: matched.map(m => m.food),
        };
      } else {
        return {
          text: `🔍 Siz aytgan mahsulotlar (${userIngredients.join(", ")}) bo'yicha mos keladigan retsept topilmadi. Yana boshqa mahsulotlarni qo'shib yozing yoki **[Muzlatgichim ❄️](/fridge)** sahifasiga o'ting.`,
        };
      }
    }
  }

  // Greeting detection
  if (/^(salom|assalom|hi|hello|hey|привет|здравствуй)/i.test(msg)) {
    return {
      text: "Salom! 👋 Men Vitality AI — sog'lom ovqatlanish bo'yicha yordamchingizman.\n\n🍽️ Men sizga quyidagilarda yordam bera olaman:\n• Qaysi ovqatni yeyishni maslahat beraman\n• Retseplarni ko'rsataman\n• Buyurtma berishga yo'naltiraman\n\nNima yegingiz kelmoqda? 😊",
    };
  }

  // Recipe request
  const recipeMatch = msg.match(/(retsep|qanday pishir|рецепт|recipe|tayyorlash|how to make)/i);
  if (recipeMatch) {
    const foundFoods = matchFoods(msg);
    if (foundFoods.length > 0) {
      const f = foundFoods[0];
      return {
        text: `📖 **${f.name.uz}** — Retsept:\n\n⏱️ Tayyorlash vaqti: ${f.prepTime} daqiqa\n🔥 Kaloriya: ${f.calories} kcal\n💪 Protein: ${f.protein}g`,
        recipe: { food: f, steps: f.recipe.uz },
      };
    }
    return {
      text: "Qaysi taom retsepini ko'rishni xohlaysiz? Masalan: \"tuxum retsepini ko'rsating\" yoki \"omlet qanday pishiriladi?\"",
    };
  }

  // Order request
  if (/(zakaz|buyurtma|order|sotib ol|карзина|savat|cart)/i.test(msg)) {
    const foundFoods = matchFoods(msg);
    if (foundFoods.length > 0) {
      return {
        text: `🛒 Quyidagi taomlarni zakaz qilishingiz mumkin. \"Savatchaga qo'shish\" tugmasini bosing va savatga o'ting. Buyurtma berish uchun ro'yxatdan o'tish kerak!`,
        foods: foundFoods,
      };
    }
    return {
      text: "Qaysi taomni zakaz qilmoqchisiz? Nom yoki kategoriyani ayting — men tavsiya qilaman!\n\n📦 Yetkazib berish vaqti: 30-45 daqiqa\n🚚 Toshkent shahri bo'yicha yetkazib beramiz",
    };
  }

  // Egg / tuxum specific
  if (/(tuxum|яйц|egg|omlet|scramble|qaynatil)/i.test(msg)) {
    const eggFoods = foods.filter((f) =>
      f.categories.includes("fast") &&
      (f.id.includes("egg") || f.id.includes("omelette") || f.id.includes("scramble") || f.id.includes("toast"))
    ).slice(0, 4);
    return {
      text: "🥚 Tuxum asosidagi tez taomlar — eng tez va oson nonushta! Quyida variantlarni ko'ring:",
      foods: eggFoods.length ? eggFoods : matchFoods("egg"),
    };
  }

  // Fast food / tez
  if (/(tez|fast|quick|tezkor|shoshilaman|vaqtim yo'q|быстро)/i.test(msg)) {
    const fastFoods = foods.filter((f) => f.categories.includes("fast") && f.prepTime <= 10).slice(0, 4);
    return {
      text: `⚡ Eng tez tayyor bo'ladigan taomlar (10 daqiqadan kam):\n\nBular hammasi ${fastFoods.length} daqiqa va undan kamroq vaqtda tayyorlanadi!`,
      foods: fastFoods,
    };
  }

  // Protein
  if (/(protein|oqsil|mushak|sport|белок|тренировка|workout)/i.test(msg)) {
    const proteinFoods = foods.filter((f) => f.categories.includes("protein") && f.protein > 15).slice(0, 4);
    return {
      text: "💪 Proteinli taomlar — mushak o'sishi va tiklanishi uchun ideal:",
      foods: proteinFoods,
    };
  }

  // Breakfast
  if (/(nonushta|ertalab|breakfast|завтрак|uyg'ondim)/i.test(msg)) {
    const bFoods = foods.filter((f) => f.categories.includes("breakfast")).slice(0, 4);
    return {
      text: "🌅 Nonushta uchun eng yaxshi variantlar:",
      foods: bFoods,
    };
  }

  // Diet / weight loss
  if (/(dieta|ozish|худеть|diet|vazn|kaloriya|칼로리)/i.test(msg)) {
    const dietFoods = foods.filter((f) => f.categories.includes("weightloss") && f.calories < 250).slice(0, 4);
    return {
      text: "🔥 Ozish uchun ideal past kaloriyali taomlar:",
      foods: dietFoods,
    };
  }

  // Vegetarian
  if (/(vegetar|vegan|go'shtsiz|etсiz)/i.test(msg)) {
    const vegFoods = foods.filter((f) => f.categories.includes("vegetarian")).slice(0, 4);
    return {
      text: "🌱 Vegetarian taomlar — o'simlik proteiniga boy va sog'lom:",
      foods: vegFoods,
    };
  }

  // Uzbek food
  if (/(o'zbek|plov|manti|lagman|samsa|uzbek)/i.test(msg)) {
    const uzFoods = foods.filter((f) => f.categories.includes("uzbek")).slice(0, 4);
    return {
      text: "🏺 O'zbek milliy taomlarimiz — an'anaviy va mazali:",
      foods: uzFoods,
    };
  }

  // Student / cheap
  if (/(student|talaba|arzon|deshev|cheap)/i.test(msg)) {
    const stuFoods = foods.filter((f) => f.categories.includes("student") || f.price === 1).slice(0, 4);
    return {
      text: "🎓 Studentlar uchun arzon va sog'lom taomlar:",
      foods: stuFoods,
    };
  }

  // Health score question
  if (/(eng foydali|most healthy|самый полезный|healthiest)/i.test(msg)) {
    const topFoods = [...foods].sort((a, b) => b.healthScore - a.healthScore).slice(0, 4);
    return {
      text: "⭐ Eng sog'lom taomlar (Health Score bo'yicha):",
      foods: topFoods,
    };
  }

  // Generic search
  const found = matchFoods(msg);
  if (found.length > 0) {
    return {
      text: `🔍 "${userMsg}" bo'yicha topilgan taomlar:`,
      foods: found,
    };
  }

  // Fallback
  return {
    text: `Hmm, tushunmadim 🤔 Quyidagilardan birini so'rang:\n\n• "Tez tayyor taomlar ko'rsat"\n• "Nonushta uchun nima tavsiya qilasiz?"\n• "Tuxumli omlet retsepini ko'rsating"\n• "Protein taomlar"\n• "Ozish uchun taomlar"\n• "O'zbek taomlar"\n• "Zakaz qilmoqchiman"`,
  };
}

// ── Sub-components ───────────────────────────────────────────────────────────

function FoodChip({ food, onAddToCart }: { food: Food; onAddToCart: (id: string) => void }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 hover:bg-white/10 hover:border-white/20 transition-all group">
      <img src={food.image} alt={food.name.uz} className="h-10 w-10 rounded-lg object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-white truncate">{food.name.uz}</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Clock className="h-2.5 w-2.5 text-white/40" />
          <span className="text-[9px] text-white/40">{food.prepTime} min</span>
          <Star className="h-2.5 w-2.5 text-yellow-400 fill-yellow-400" />
          <span className="text-[9px] text-yellow-400">{food.rating}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <Link
          to="/food/$foodId"
          params={{ foodId: food.id }}
          className="text-[9px] font-bold text-primary hover:underline"
        >
          Ko'rish
        </Link>
        <button
          onClick={() => onAddToCart(food.id)}
          className="flex items-center gap-0.5 rounded-md bg-primary/20 border border-primary/30 px-1.5 py-0.5 text-[9px] font-bold text-primary hover:bg-primary/30 transition-all"
        >
          <ShoppingCart className="h-2.5 w-2.5" />
          Qo'sh
        </button>
      </div>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: { food: Food; steps: string[] } }) {
  return (
    <div className="mt-2 rounded-xl border border-primary/20 bg-primary/5 p-3">
      <div className="flex items-center gap-2 mb-2">
        <ChefHat className="h-4 w-4 text-primary" />
        <span className="text-xs font-bold text-primary">Retsept</span>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <img src={recipe.food.image} alt={recipe.food.name.uz} className="h-12 w-12 rounded-lg object-cover" />
        <div>
          <div className="text-xs font-bold text-white">{recipe.food.name.uz}</div>
          <div className="flex gap-2 mt-1">
            <span className="text-[10px] text-white/50">⏱ {recipe.food.prepTime} min</span>
            <span className="text-[10px] text-white/50">🔥 {recipe.food.calories} kcal</span>
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-wide mb-1">Tayyorlash bosqichlari:</p>
        {recipe.steps.map((step, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[9px] font-bold text-primary">
              {i + 1}
            </span>
            <span className="text-[11px] text-white/70">{step}</span>
          </div>
        ))}
      </div>
      <Link
        to="/food/$foodId"
        params={{ foodId: recipe.food.id }}
        className="mt-2 flex items-center gap-1 text-[10px] font-bold text-primary hover:underline"
      >
        To'liq ko'rish →
      </Link>
    </div>
  );
}

// ── Main AIChatbot component ─────────────────────────────────────────────────

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Salom! 👋 Men **Vitality AI** — sizning sog'lom ovqatlanish yordamchingizman!\n\n🍽️ Menga quyidagilarni so'rang:\n• Qaysi taom yeyishni maslahat beraman\n• Retseplarni ko'rsataman\n• Buyurtma berishga yo'naltiraman\n\nNima yegingiz kelmoqda?",
      timestamp: new Date(),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { add } = useCart();

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, minimized]);

  const handleAddToCart = (foodId: string) => {
    add(foodId);
    toast.success("Savatchaga qo'shildi!", {
      description: "Savatni ko'rish uchun savat belgisini bosing.",
    });
  };

  const sendMessage = async () => {
    if (!input.trim() || thinking) return;
    const userText = input.trim();
    setInput("");

    const userMsg: Message = {
      id: Date.now() + "-u",
      role: "user",
      text: userText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setThinking(true);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    const response = generateAIResponse(userText);
    const aiMsg: Message = {
      id: Date.now() + "-ai",
      role: "ai",
      text: response.text,
      foods: response.foods,
      recipe: response.recipe ?? null,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setThinking(false);
  };

  const quickSuggestions = [
    { icon: "⚡", label: "Tez taomlar" },
    { icon: "🥚", label: "Tuxum taomlar" },
    { icon: "💪", label: "Protein taomlar" },
    { icon: "🔥", label: "Ozish uchun" },
  ];

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => { setOpen(true); setMinimized(false); }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl"
        style={{
          background: "linear-gradient(135deg, oklch(0.78 0.15 165), oklch(0.7 0.14 195))",
          boxShadow: "0 8px 32px oklch(0.78 0.15 165 / 0.4)",
          display: open ? "none" : "flex",
        }}
        aria-label="AI Yordamchi"
      >
        <Bot className="h-6 w-6 text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: "oklch(0.78 0.15 165)" }} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col rounded-[1.8rem] overflow-hidden shadow-2xl"
            style={{
              width: 380,
              maxHeight: minimized ? 64 : "80vh",
              height: minimized ? 64 : 620,
              background: "linear-gradient(145deg, oklch(0.14 0.018 165), oklch(0.12 0.016 170))",
              border: "1px solid oklch(0.98 0.01 165 / 10%)",
              boxShadow: "0 25px 80px rgba(0,0,0,0.7), 0 0 50px oklch(0.78 0.15 165 / 0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3.5 shrink-0"
              style={{
                background: "linear-gradient(135deg, oklch(0.78 0.15 165 / 0.12), oklch(0.7 0.14 195 / 0.08))",
                borderBottom: "1px solid oklch(0.98 0.01 165 / 8%)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 border border-primary/30">
                  <Bot className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    Vitality AI
                    <Sparkles className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-medium">Online · Yordam berish uchun tayyor</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMinimized((m) => !m)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  {minimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                      >
                        {msg.role === "ai" && (
                          <div className="h-6 w-6 shrink-0 flex items-center justify-center rounded-full bg-primary/20 border border-primary/30 mt-1">
                            <Bot className="h-3 w-3 text-primary" />
                          </div>
                        )}
                        <div className={`max-w-[85%] space-y-2 ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                          <div
                            className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                              msg.role === "user"
                                ? "bg-primary text-white rounded-tr-sm"
                                : "bg-white/[0.06] border border-white/[0.07] text-white/85 rounded-tl-sm"
                            }`}
                          >
                            {msg.text}
                          </div>
                          {/* Food cards */}
                          {msg.foods && msg.foods.length > 0 && (
                            <div className="w-full space-y-1.5">
                              {msg.foods.map((food) => (
                                <FoodChip key={food.id} food={food} onAddToCart={handleAddToCart} />
                              ))}
                              <Link
                                to="/cart"
                                className="mt-1 flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-all"
                              >
                                <ShoppingCart className="h-3.5 w-3.5" />
                                Savat va Zakaz →
                              </Link>
                            </div>
                          )}
                          {/* Recipe */}
                          {msg.recipe && <RecipeCard recipe={msg.recipe} />}
                          <span className="text-[9px] text-white/20">
                            {msg.timestamp.toLocaleTimeString("uz", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {/* Thinking indicator */}
                    {thinking && (
                      <motion.div
                        key="thinking"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2 justify-start"
                      >
                        <div className="h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 border border-primary/30">
                          <Bot className="h-3 w-3 text-primary" />
                        </div>
                        <div className="rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/[0.07] px-4 py-3 flex items-center gap-1.5">
                          {[0, 0.15, 0.3].map((delay, i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay }}
                              className="h-1.5 w-1.5 rounded-full bg-primary"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={bottomRef} />
                </div>

                {/* Quick suggestions */}
                {messages.length <= 1 && (
                  <div className="px-3 pb-1 flex flex-wrap gap-1.5">
                    {quickSuggestions.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => {
                          setInput(s.label);
                          setTimeout(() => {
                            setInput("");
                            const userMsg: Message = {
                              id: Date.now() + "-u",
                              role: "user",
                              text: s.label,
                              timestamp: new Date(),
                            };
                            setMessages((prev) => [...prev, userMsg]);
                            setThinking(true);
                            setTimeout(() => {
                              const response = generateAIResponse(s.label);
                              setMessages((prev) => [...prev, {
                                id: Date.now() + "-ai",
                                role: "ai",
                                text: response.text,
                                foods: response.foods,
                                recipe: response.recipe ?? null,
                                timestamp: new Date(),
                              }]);
                              setThinking(false);
                            }, 700);
                          }, 50);
                        }}
                        className="text-[10px] font-bold rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/60 hover:border-primary/30 hover:text-primary hover:bg-primary/10 transition-all"
                      >
                        {s.icon} {s.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input area */}
                <div
                  className="p-3 shrink-0"
                  style={{ borderTop: "1px solid oklch(0.98 0.01 165 / 8%)" }}
                >
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 focus-within:border-primary/40 transition-all">
                    <MessageCircle className="h-4 w-4 text-white/30 shrink-0" />
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                      placeholder="Nima yeyishni xohlaysiz?..."
                      className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/30"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || thinking}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary disabled:opacity-40 hover:bg-primary/80 transition-all"
                    >
                      <Send className="h-3.5 w-3.5 text-white" />
                    </button>
                  </div>
                  <p className="mt-1.5 text-center text-[9px] text-white/20">
                    Vitality AI · Sog'lom hayot uchun sun'iy intellekt
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, ArrowRight, Clock, Flame, Star,
  Sparkles, TrendingUp, Hash
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { foods, formatPrice, getPrice, categories } from "@/lib/foods";

const RECENT_KEY = "search_recent";

function getRecent(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]").slice(0, 5); }
  catch { return []; }
}
function saveRecent(id: string) {
  if (typeof window === "undefined") return;
  const prev = getRecent().filter((x) => x !== id);
  localStorage.setItem(RECENT_KEY, JSON.stringify([id, ...prev].slice(0, 5)));
}

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedCat("all");
      setRecent(getRecent());
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = foods;
    if (selectedCat !== "all") {
      list = list.filter((f) => f.categories.includes(selectedCat));
    }
    if (!q) return list.slice(0, 9);
    return list.filter((f) => {
      const hay = [
        f.name.uz, f.name.ru, f.name.en,
        f.short.uz, f.short.ru, f.short.en,
        ...f.vitamins, ...f.minerals, ...f.categories,
      ].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [query, selectedCat]);

  const recentFoods = useMemo(() => {
    return recent.map((id) => foods.find((f) => f.id === id)).filter(Boolean) as typeof foods;
  }, [recent]);

  const go = (id: string) => {
    saveRecent(id);
    onOpenChange(false);
    setQuery("");
    navigate({ to: "/food/$foodId", params: { foodId: id } });
  };

  const highlightCats = ["uzbek", "turkish", "detox", "protein", "healthy"];
  const catBtns = [
    { id: "all", label: "Barchasi", icon: "🔍" },
    ...categories.filter((c) => highlightCats.includes(c.id)).map((c) => ({ id: c.id, label: c.name.uz, icon: c.icon })),
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-start justify-center pt-16 px-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(16px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onOpenChange(false); }}
        >
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-full max-w-2xl overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(145deg, rgba(12,18,12,0.98), rgba(8,12,8,0.98))",
              border: "1px solid rgba(16,185,129,0.25)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* Glow top border */}
            <div className="h-[1.5px] w-full"
              style={{ background: "linear-gradient(90deg, transparent, #10b981 30%, #a855f7 70%, transparent)" }}
            />

            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <motion.div
                animate={{ rotate: query ? [0, 15, -15, 0] : 0 }}
                transition={{ duration: 0.4 }}
              >
                <Search className="h-5 w-5 text-primary shrink-0" />
              </motion.div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Taom qidirish... (masalan: plov, kebab, detoks)"
                className="flex-1 bg-transparent text-base text-white placeholder:text-white/30 outline-none"
              />
              <div className="flex items-center gap-2">
                <AnimatePresence>
                  {query && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      onClick={() => setQuery("")}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                    >
                      <X className="h-3.5 w-3.5" />
                    </motion.button>
                  )}
                </AnimatePresence>
                <kbd className="hidden sm:flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-[10px] text-white/30 border border-white/10">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-none border-b border-white/5">
              {catBtns.map((c) => (
                <motion.button
                  key={c.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCat(c.id)}
                  className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    selectedCat === c.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{c.icon}</span> {c.label}
                </motion.button>
              ))}
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* Recent searches */}
              {!query && recentFoods.length > 0 && (
                <div className="px-5 pt-4 pb-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-3.5 w-3.5 text-white/30" />
                    <span className="text-xs text-white/30 uppercase tracking-wider font-semibold">So'nggi ko'rilganlar</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentFoods.map((f) => (
                      <motion.button
                        key={f.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => go(f.id)}
                        className="flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white transition-all"
                      >
                        <img src={f.image} alt="" className="h-5 w-5 rounded object-cover" />
                        {f.name[lang]}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending heading */}
              {!query && (
                <div className="flex items-center gap-2 px-5 pt-4 pb-2">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">
                    {selectedCat === "all" ? "Mashhur taomlar" : categories.find(c => c.id === selectedCat)?.name.uz ?? ""}
                  </span>
                </div>
              )}

              {/* No results */}
              {query && results.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-sm text-white/40">Hech narsa topilmadi</p>
                  <p className="text-xs text-white/20 mt-1">Boshqa so'z bilan qidiring</p>
                </motion.div>
              )}

              {/* Food results */}
              <div className="p-3 grid gap-1">
                <AnimatePresence mode="popLayout">
                  {results.map((f, idx) => (
                    <motion.button
                      key={f.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: idx * 0.025, duration: 0.2 }}
                      whileHover={{ backgroundColor: "rgba(16,185,129,0.08)", x: 4 }}
                      onClick={() => go(f.id)}
                      className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all"
                    >
                      {/* Image */}
                      <div className="relative shrink-0">
                        <img
                          src={f.image}
                          alt={f.name[lang]}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                          {f.healthScore}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-sm truncate">{f.name[lang]}</span>
                          {f.categories.includes("uzbek") && <span className="text-[9px] bg-amber-500/20 text-amber-400 rounded px-1.5 py-0.5 font-bold">O'zbek</span>}
                          {f.categories.includes("turkish") && <span className="text-[9px] bg-red-500/20 text-red-400 rounded px-1.5 py-0.5 font-bold">Turk</span>}
                          {f.categories.includes("detox") && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 rounded px-1.5 py-0.5 font-bold">Detoks</span>}
                        </div>
                        <p className="text-xs text-white/40 mt-0.5 truncate">{f.short[lang]}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1 text-[10px] text-white/30">
                            <Flame className="h-3 w-3 text-orange-400" /> {f.calories} kcal
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-white/30">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" /> {f.rating}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-white/30">
                            <Clock className="h-3 w-3" /> {f.prepTime} daq
                          </span>
                        </div>
                      </div>

                      {/* Price + arrow */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-sm font-bold text-primary">{formatPrice(getPrice(f.id))}</span>
                        <motion.div
                          initial={{ x: 0, opacity: 0 }}
                          whileHover={{ x: 3, opacity: 1 }}
                          className="text-primary/60"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>

              {/* Results count */}
              {results.length > 0 && (
                <div className="px-5 pb-4 pt-1 flex items-center gap-2">
                  <Hash className="h-3 w-3 text-white/20" />
                  <span className="text-xs text-white/20">{results.length} ta taom topildi</span>
                </div>
              )}
            </div>

            {/* Bottom shortcuts bar */}
            <div className="flex items-center justify-between gap-4 border-t border-white/5 px-5 py-3">
              <div className="flex items-center gap-4 text-[10px] text-white/20">
                <span className="flex items-center gap-1"><kbd className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10">↑↓</kbd> Harakatlanish</span>
                <span className="flex items-center gap-1"><kbd className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10">↵</kbd> Ochish</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/20">
                <Sparkles className="h-3 w-3 text-primary/50" />
                <span>{foods.length} ta taom</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  const { t } = useI18n();
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="glass group flex h-10 items-center gap-2.5 rounded-full px-4 text-sm text-muted-foreground transition-all hover:text-foreground hover:border-primary/30"
      aria-label={t("search.title")}
    >
      <motion.div
        animate={{ rotate: [0, 0, 15, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
      >
        <Search className="h-4 w-4 text-primary" />
      </motion.div>
      <span className="hidden lg:inline text-sm">Qidirish...</span>
      <kbd className="hidden lg:flex items-center gap-0.5 rounded-md bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary border border-primary/20">
        ⌘K
      </kbd>
    </motion.button>
  );
}

import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft, Flame, Beef, Droplet, Wheat, Clock, DollarSign, HeartPulse,
  Bookmark, Share2, Check, X, CalendarClock, Package, Star, ChevronRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { FoodCard } from "@/components/FoodCard";
import { getFood, foods } from "@/lib/foods";

export const Route = createFileRoute("/food/$foodId")({
  loader: ({ params }) => {
    const food = getFood(params.foodId);
    if (!food) throw notFound();
    return { food };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.food.name.uz} — To'g'ri Ovqatlanish Siri` },
          { name: "description", content: loaderData.food.short.uz },
          { property: "og:title", content: loaderData.food.name.uz },
          { property: "og:description", content: loaderData.food.short.uz },
          { property: "og:image", content: loaderData.food.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24 text-center">
      <div>
        <h1 className="text-3xl font-bold">404</h1>
        <Link to="/catalog" className="mt-4 inline-block text-primary">← Catalog</Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <Link to="/catalog" className="text-primary">← Catalog</Link>
    </div>
  ),
  component: FoodDetail,
});

const TABS = ["overview", "nutrition", "benefits", "recipe"] as const;
type Tab = (typeof TABS)[number];

function FoodDetail() {
  const { food } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const [tab, setTab] = useState<Tab>("overview");
  const [saved, setSaved] = useState(false);

  const related = foods.filter((f) => f.id !== food.id && f.categories.some((c) => food.categories.includes(c))).slice(0, 3);

  const macros = [
    { icon: Flame, label: t("food.calories"), value: `${food.calories}`, unit: "kcal", color: "gold" },
    { icon: Beef, label: t("food.protein"), value: `${food.protein}`, unit: "g", color: "chart-3" },
    { icon: Droplet, label: t("food.fat"), value: `${food.fat}`, unit: "g", color: "chart-5" },
    { icon: Wheat, label: t("food.carbs"), value: `${food.carbs}`, unit: "g", color: "primary" },
  ];

  const meta = [
    { icon: Clock, label: t("food.prepTime"), value: `${food.prepTime} ${t("food.min")}` },
    { icon: DollarSign, label: t("food.price"), value: "$".repeat(food.price) },
    { icon: HeartPulse, label: t("food.healthScore"), value: `${food.healthScore}/100` },
    { icon: Star, label: t("hero.stat4"), value: `${food.rating}` },
  ];

  const handleSave = () => {
    setSaved((s) => !s);
    toast.success(saved ? t("food.save") : t("food.saved"));
  };
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(window.location.href);
    toast.success(t("food.share"));
  };

  return (
    <div className="px-4 pb-16 pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <Link to="/catalog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> {t("food.back")}
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Cinematic image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:sticky lg:top-28 lg:self-start"
          >
            <div className="glass card-glow group overflow-hidden rounded-[2rem] p-2">
              <div className="overflow-hidden rounded-[1.6rem]">
                <img src={food.image} alt={food.name[lang]} width={1024} height={1024} className="aspect-square w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              </div>
            </div>
            <div className="absolute left-6 top-6 flex items-center gap-1.5 rounded-full bg-gold/90 px-3 py-1.5 text-sm font-bold text-gold-foreground backdrop-blur">
              <Star className="h-4 w-4 fill-current" /> {food.rating}
            </div>
          </motion.div>

          {/* Info */}
          <div>
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {food.categories.map((c) => (
                  <span key={c} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{c}</span>
                ))}
              </div>
              <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">{food.name[lang]}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{food.short[lang]}</p>
            </Reveal>

            {/* Macros */}
            <Reveal delay={0.1}>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {macros.map((m) => (
                  <div key={m.label} className="glass card-glow rounded-2xl p-4 text-center">
                    <m.icon className={`mx-auto h-5 w-5 text-${m.color}`} />
                    <div className="mt-2 text-xl font-extrabold">{m.value}<span className="text-xs font-medium text-muted-foreground">{m.unit}</span></div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">{t("food.per100")}</p>
            </Reveal>

            {/* Actions */}
            <Reveal delay={0.15}>
              <div className="mt-5 flex gap-3">
                <button onClick={handleSave} className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 font-semibold transition-all ${saved ? "text-primary-foreground" : "glass hover:bg-accent"}`} style={saved ? { background: "var(--gradient-primary)" } : undefined}>
                  <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} /> {saved ? t("food.saved") : t("food.save")}
                </button>
                <button onClick={handleShare} className="glass flex flex-1 items-center justify-center gap-2 rounded-full py-3 font-semibold transition-colors hover:bg-accent">
                  <Share2 className="h-4 w-4" /> {t("food.share")}
                </button>
              </div>
            </Reveal>

            {/* Tabs */}
            <div className="mt-8">
              <div className="glass flex gap-1 rounded-full p-1">
                {TABS.map((tb) => (
                  <button key={tb} onClick={() => setTab(tb)} className={`flex-1 rounded-full px-3 py-2.5 text-sm font-semibold transition-all ${tab === tb ? "text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`} style={tab === tb ? { background: "var(--gradient-primary)" } : undefined}>
                    {t(`food.${tb}`)}
                  </button>
                ))}
              </div>

              <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-6">
                {tab === "overview" && (
                  <div className="space-y-5">
                    <p className="text-foreground/90">{food.description[lang]}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {meta.map((m) => (
                        <div key={m.label} className="glass card-glow flex items-center gap-3 rounded-2xl p-4">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15"><m.icon className="h-5 w-5 text-primary" /></span>
                          <div>
                            <div className="text-xs text-muted-foreground">{m.label}</div>
                            <div className="font-bold">{m.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <InfoRow icon={CalendarClock} label={t("food.whenEat")} value={food.whenEat[lang]} />
                    <InfoRow icon={HeartPulse} label={t("food.dailyRec")} value={food.dailyRec[lang]} />
                    <InfoRow icon={Package} label={t("food.storage")} value={food.storage[lang]} />
                  </div>
                )}

                {tab === "nutrition" && (
                  <div className="space-y-5">
                    <MacroBars food={food} t={t} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <TagBlock title={t("food.vitamins")} tags={food.vitamins} />
                      <TagBlock title={t("food.minerals")} tags={food.minerals} />
                    </div>
                  </div>
                )}

                {tab === "benefits" && (
                  <div className="space-y-5">
                    <ul className="space-y-3">
                      {food.benefits[lang].map((b, i) => (
                        <li key={i} className="glass card-glow flex items-start gap-3 rounded-2xl p-4">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15"><Check className="h-4 w-4 text-primary" /></span>
                          <span className="text-foreground/90">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="glass card-glow rounded-2xl p-5">
                        <div className="mb-2 flex items-center gap-2 font-semibold text-primary"><Check className="h-4 w-4" /> {t("food.forWhom")}</div>
                        <p className="text-sm text-foreground/90">{food.forWhom[lang]}</p>
                      </div>
                      <div className="glass card-glow rounded-2xl p-5">
                        <div className="mb-2 flex items-center gap-2 font-semibold text-destructive"><X className="h-4 w-4" /> {t("food.notForWhom")}</div>
                        <p className="text-sm text-foreground/90">{food.notForWhom[lang]}</p>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "recipe" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-3 font-semibold">{t("food.ingredients")}</h4>
                      <div className="flex flex-wrap gap-2">
                        {food.ingredients[lang].map((ing, i) => (
                          <span key={i} className="glass rounded-full px-3 py-1.5 text-sm">{ing}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-3 font-semibold">{t("food.recipe")}</h4>
                      <ol className="space-y-3">
                        {food.recipe[lang].map((step, i) => (
                          <li key={i} className="glass card-glow flex items-start gap-3 rounded-2xl p-4">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>{i + 1}</span>
                            <span className="text-foreground/90">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-extrabold">{t("food.related")}</h2>
              <Link to="/catalog" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                {t("common.viewAll")} <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((f, i) => <FoodCard key={f.id} food={f} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="glass card-glow flex items-center gap-3 rounded-2xl p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15"><Icon className="h-5 w-5 text-gold" /></span>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

function TagBlock({ title, tags }: { title: string; tags: string[] }) {
  return (
    <div className="glass card-glow rounded-2xl p-5">
      <h4 className="mb-3 text-sm font-semibold text-muted-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tg) => (
          <span key={tg} className="rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary">{tg}</span>
        ))}
      </div>
    </div>
  );
}

function MacroBars({ food, t }: { food: ReturnType<typeof getFood> & object; t: (k: string) => string }) {
  const total = food.protein + food.fat + food.carbs || 1;
  const bars = [
    { label: t("food.protein"), value: food.protein, color: "var(--chart-3)" },
    { label: t("food.fat"), value: food.fat, color: "var(--chart-5)" },
    { label: t("food.carbs"), value: food.carbs, color: "var(--primary)" },
  ];
  return (
    <div className="glass card-glow space-y-4 rounded-2xl p-5">
      {bars.map((b) => (
        <div key={b.label}>
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="font-medium">{b.label}</span>
            <span className="text-muted-foreground">{b.value}g</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(b.value / total) * 100}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-full rounded-full" style={{ background: b.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

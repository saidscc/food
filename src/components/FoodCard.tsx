import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, Clock, Star, Plus } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { getPrice, formatPrice, type Food } from "@/lib/foods";

export function FoodCard({ food, index = 0 }: { food: Food; index?: number }) {
  const { t, lang } = useI18n();
  const { add } = useCart();

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(food.id);
    toast.success(t("food.added"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/food/$foodId"
        params={{ foodId: food.id }}
        className="group glass card-glow relative block overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={food.image}
            alt={food.name[lang]}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-gold/90 px-3 py-1 text-xs font-bold text-gold-foreground backdrop-blur">
            <Star className="h-3 w-3 fill-current" /> {food.rating}
          </div>
          <button
            onClick={addToCart}
            aria-label={t("food.addToCart")}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Plus className="h-4 w-4 text-primary-foreground" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3 text-xs font-medium text-white/90">
            <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-gold" /> {food.calories} kcal</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-primary" /> {food.prepTime} {t("food.min")}</span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold leading-tight transition-colors group-hover:text-primary">{food.name[lang]}</h3>
            <span className="shrink-0 text-sm font-extrabold text-gradient">{formatPrice(getPrice(food.id))}</span>
          </div>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{food.short[lang]}</p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: t("food.protein"), value: `${food.protein}g` },
              { label: t("food.fat"), value: `${food.fat}g` },
              { label: t("food.carbs"), value: `${food.carbs}g` },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-secondary/60 px-2 py-2 text-center">
                <div className="text-sm font-bold">{m.value}</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useSavedStore } from "@/lib/useSavedStore";
import { foods } from "@/lib/foods";
import { FoodCard } from "@/components/FoodCard";
import { useI18n } from "@/lib/i18n";
import { Bookmark, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saqlanganlar — To'g'ri Ovqatlanish Siri" },
      { name: "description", content: "Siz saqlagan foydali taomlar ro'yxati" },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { t, lang } = useI18n();
  const savedFoodIds = useSavedStore((state) => state.savedFoodIds);
  const savedFoods = foods.filter((f) => savedFoodIds.includes(f.id));

  return (
    <div className="min-h-screen px-4 pb-20 pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <Link to="/catalog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Ortga qaytish
        </Link>
        
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30">
            <Bookmark className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Saqlanganlar</h1>
            <p className="text-muted-foreground mt-1">Siz saqlagan barcha sevimli va foydali taomlar</p>
          </div>
        </div>

        {savedFoods.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-[2rem] border border-white/5 bg-white/[0.02] py-32 text-center"
          >
            <Bookmark className="h-16 w-16 text-white/10 mb-4" />
            <h3 className="text-xl font-bold">Hozircha hech narsa saqlanmagan</h3>
            <p className="text-muted-foreground mt-2 max-w-md">Katalogga o'tib o'zingizga yoqqan taomlarni saqlang. Ular shu yerda paydo bo'ladi.</p>
            <Link 
              to="/catalog" 
              className="mt-8 rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-1"
            >
              Katalogni ko'rish
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {savedFoods.map((f, i) => (
              <FoodCard key={f.id} food={f} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

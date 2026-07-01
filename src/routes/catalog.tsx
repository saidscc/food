import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { FoodCard } from "@/components/FoodCard";
import { categories, foods } from "@/lib/foods";

interface CatalogSearch {
  cat?: string;
  q?: string;
}

export const Route = createFileRoute("/catalog")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    cat: typeof search.cat === "string" ? search.cat : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Ovqatlar katalogi — To'g'ri Ovqatlanish Siri" },
      { name: "description", content: "150+ sog'lom taom: kaloriya, protein, foyda va tayyorlash usullari bilan." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { t, lang } = useI18n();
  const navigate = useNavigate({ from: "/catalog" });
  const { cat, q } = Route.useSearch();

  const query = (q ?? "").toLowerCase();
  const filtered = foods.filter((f) => {
    const matchCat = !cat || f.categories.includes(cat);
    const matchQ = !query || f.name[lang].toLowerCase().includes(query) || f.short[lang].toLowerCase().includes(query);
    return matchCat && matchQ;
  });

  const setCat = (c?: string) => navigate({ search: (p: CatalogSearch) => ({ ...p, cat: c }) });
  const setQ = (v: string) => navigate({ search: (p: CatalogSearch) => ({ ...p, q: v || undefined }) });

  return (
    <div className="px-4 pb-16 pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> {t("nav.home")}
          </Link>
          <h1 className="text-4xl font-extrabold md:text-5xl">{t("catalog.title")}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t("catalog.subtitle")}</p>
        </Reveal>

        {/* Search */}
        <Reveal delay={0.1}>
          <div className="glass card-glow mt-8 flex items-center gap-3 rounded-2xl px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              value={q ?? ""}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("catalog.search")}
              className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
          </div>
        </Reveal>

        {/* Category chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Chip active={!cat} onClick={() => setCat(undefined)}>{t("catalog.all")}</Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              <span className="mr-1">{c.icon}</span>
              {c.name[lang]}
            </Chip>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length} {t("catalog.results")}
        </p>

        {/* Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((f, i) => (
              <motion.div key={f.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                <FoodCard food={f} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="glass card-glow mt-6 rounded-3xl p-16 text-center text-muted-foreground">
            {t("catalog.empty")}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
        active ? "text-primary-foreground shadow-lg" : "glass hover:bg-accent"
      }`}
      style={active ? { background: "var(--gradient-primary)" } : undefined}
    >
      {children}
    </button>
  );
}

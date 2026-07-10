import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Play,
  Star,
  Flame,
  Droplets,
  HeartPulse,
  Clock,
  Salad,
  Quote,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { FoodCard } from "@/components/FoodCard";
import { TipsSection } from "@/components/TipsSection";
import { categories, foods, HERO_IMAGE } from "@/lib/foods";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "To'g'ri Ovqatlanish Siri — Premium sog'lom hayot platformasi" },
      { name: "description", content: "Sog'lom ovqatlanishni professional darajada o'rganing: kaloriya, tarkib, foyda va to'g'ri iste'mol vaqtlari." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const popular = foods.slice(0, 3);
  const recommend = foods.slice(3, 6);

  const stats = [
    { value: "150+", label: t("hero.stat1"), icon: Salad },
    { value: "12", label: t("hero.stat2"), icon: Sparkles },
    { value: "25K+", label: t("hero.stat3"), icon: HeartPulse },
    { value: "4.9", label: t("hero.stat4"), icon: Star },
  ];

  const reviews = [
    { name: "Dilnoza A.", role: { uz: "Talaba", ru: "Студентка", en: "Student" }, text: { uz: "Bu platforma menga sog'lom ovqatlanishni o'rgatdi. Endi har bir taomning foydasini bilaman!", ru: "Платформа научила меня питаться правильно. Теперь я знаю пользу каждого блюда!", en: "This platform taught me to eat right. Now I know the benefit of every meal!" } },
    { name: "Jasur K.", role: { uz: "Sportchi", ru: "Спортсмен", en: "Athlete" }, text: { uz: "Protein va kaloriya ma'lumotlari juda aniq. Mashg'ulot natijalarim yaxshilandi.", ru: "Данные по белку и калориям очень точные. Мои результаты улучшились.", en: "Protein and calorie data are spot on. My training results improved." } },
    { name: "Malika R.", role: { uz: "Ona", ru: "Мама", en: "Mother" }, text: { uz: "Bolalarim uchun sog'lom retseptlar topaman. Dizayn ham juda chiroyli!", ru: "Нахожу здоровые рецепты для детей. И дизайн очень красивый!", en: "I find healthy recipes for my kids. The design is beautiful too!" } },
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative px-4 pb-16 pt-32 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-5xl font-extrabold leading-[1.05] md:text-6xl lg:text-7xl"
            >
              {t("hero.title1")} <br />
              <span className="text-gradient">{t("hero.title2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/catalog"
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
                style={{ background: "var(--gradient-primary)" }}
              >
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#tips" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-colors hover:bg-accent">
                {t("hero.cta2")}
              </a>
            </motion.div>

            <div className="mt-12 grid max-w-lg grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                >
                  <div className="text-2xl font-extrabold text-gradient md:text-3xl">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="glass card-glow animate-float-slow overflow-hidden rounded-[2rem] p-2">
              <img src={HERO_IMAGE} alt="Healthy premium meal" width={1536} height={1024} className="h-full w-full rounded-[1.6rem] object-cover" />
            </div>
            <div className="glass card-glow absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl p-3 md:-left-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/20"><HeartPulse className="h-5 w-5 text-gold" /></span>
              <div>
                <div className="text-sm font-bold">Health Score 96</div>
                <div className="text-xs text-muted-foreground">Omega-3 rich</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHead title={t("section.categories")} sub={t("section.categoriesSub")} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              >
                <Link
                  to="/catalog"
                  search={{ cat: c.id }}
                  className="glass card-glow group flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
                >
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-125">{c.icon}</span>
                  <span className="text-sm font-semibold">{c.name[lang]}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHead title={t("section.popular")} sub={t("section.popularSub")} action />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((f, i) => <FoodCard key={f.id} food={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* TIPS */}
      <TipsSection />

      {/* RECOMMEND */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHead title={t("section.recommend")} sub={t("section.recommendSub")} action />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommend.map((f, i) => <FoodCard key={f.id} food={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="videos" className="scroll-mt-24 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHead title={t("section.video")} sub={t("section.videoSub")} />
          <Reveal>
            <div className="glass card-glow group relative overflow-hidden rounded-[2rem] w-full h-[360px] md:h-[460px]">
              <iframe 
                src="https://www.youtube.com/embed/9_5wHw6l11o" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="glass card-glow grid gap-8 rounded-[2rem] p-10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-primary)" }}>
                    <s.icon className="h-7 w-7 text-primary-foreground" />
                  </span>
                  <div className="text-4xl font-extrabold text-gradient">{s.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHead title={t("section.reviews")} sub={t("section.reviewsSub")} />
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass card-glow h-full rounded-3xl p-7">
                  <Quote className="h-8 w-8 text-primary/40" />
                  <p className="mt-4 text-foreground/90">{r.text[lang]}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full text-primary-foreground font-bold" style={{ background: "var(--gradient-primary)" }}>
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.role[lang]}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="glass card-glow relative overflow-hidden rounded-[2.5rem] p-10 text-center md:p-16">
              <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "var(--gradient-hero)" }} />
              <h2 className="text-3xl font-extrabold md:text-4xl">{t("cta.title")}</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("cta.subtitle")}</p>
              <Link
                to="/catalog"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 font-semibold text-background transition-transform hover:scale-105"
              >
                {t("cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ title, sub, action }: { title: string; sub: string; action?: boolean }) {
  const { t } = useI18n();
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <Reveal>
        <div>
          <h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2>
          <p className="mt-2 text-muted-foreground">{sub}</p>
        </div>
      </Reveal>
      {action && (
        <Link to="/catalog" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold">
          {t("common.viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

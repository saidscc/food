import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Clock, Salad, Flame, X, Info, CheckCircle2, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const TIPS_DATA = [
  {
    id: "water",
    icon: Droplets,
    color: "chart-3",
    title: { uz: "Kuniga 2 litr suv iching", ru: "Пейте 2 литра воды в день", en: "Drink 2 litres of water daily" },
    subtitle: { uz: "Tananing 60% qismi suvdan iborat", ru: "60% тела состоит из воды", en: "60% of the body is water" },
    details: {
      uz: "Olimlarning fikriga ko'ra, har kuni yetarli miqdorda suv ichish inson organizmidagi metabolizmni (moddalar almashinuvi) 30% gacha tezlashtiradi. \n\nSuv miya faoliyatini yaxshilaydi, terini yoshartiradi va organizmdagi zararli toksinlarni tozalaydi. Ertalab och qoringa 1 stakan suv ichish ichaklarni uyg'otib, ovqat hazm qilish tizimini ishga tushiradi.",
      ru: "По мнению ученых, ежедневное потребление достаточного количества воды ускоряет метаболизм (обмен веществ) до 30%. \n\nВода улучшает работу мозга, омолаживает кожу и очищает организм от вредных токсинов. Стакан воды натощак утром пробуждает кишечник и запускает пищеварительную систему.",
      en: "According to scientists, drinking enough water every day speeds up metabolism by up to 30%. \n\nWater improves brain function, rejuvenates the skin, and flushes out harmful toxins from the body. Drinking a glass of water on an empty stomach in the morning wakes up the intestines and kickstarts the digestive system."
    },
    bullets: {
      uz: ["Ertalab och qoringa 1 stakan", "Ovqatdan 30 daqiqa oldin", "Mashg'ulotlar paytida"],
      ru: ["Утром натощак 1 стакан", "За 30 минут до еды", "Во время тренировок"],
      en: ["1 glass in the morning on empty stomach", "30 mins before a meal", "During workouts"]
    }
  },
  {
    id: "time",
    icon: Clock,
    color: "gold",
    title: { uz: "Ovqatni bir vaqtda yeng", ru: "Ешьте в одно и то же время", en: "Eat at consistent times" },
    subtitle: { uz: "Biologik soatni to'g'rilaydi", ru: "Регулирует биологические часы", en: "Regulates biological clock" },
    details: {
      uz: "Sizning oshqozoningiz va hazm qilish tizimingiz 'biologik soat' asosida ishlaydi. Har kuni bir xil vaqtda ovqatlanish hazm shirasi o'z vaqtida va yetarli miqdorda ishlab chiqarilishiga yordam beradi.\n\nBu orqali oshqozon yarasi, qorin ovushi va qabziyat kabi muammolarning oldini olasiz. Ayniqsa kechki ovqatni uxlashdan 3 soat oldin yeyish juda muhim.",
      ru: "Ваш желудок и пищеварительная система работают на основе 'биологических часов'. Прием пищи в одно и то же время помогает вовремя и в достаточном количестве вырабатывать пищеварительные соки.\n\nЭто предотвращает язвы желудка, вздутие и запоры. Особенно важно ужинать за 3 часа до сна.",
      en: "Your stomach and digestive system run on a 'biological clock'. Eating at the same time every day helps produce digestive juices on time and in sufficient quantities.\n\nThis prevents stomach ulcers, bloating, and constipation. It is especially important to eat dinner 3 hours before sleep."
    },
    bullets: {
      uz: ["Nonushta: 07:00 - 08:30", "Tushlik: 12:30 - 14:00", "Kechki ovqat: 18:00 - 19:30"],
      ru: ["Завтрак: 07:00 - 08:30", "Обед: 12:30 - 14:00", "Ужин: 18:00 - 19:30"],
      en: ["Breakfast: 07:00 - 08:30", "Lunch: 12:30 - 14:00", "Dinner: 18:00 - 19:30"]
    }
  },
  {
    id: "greens",
    icon: Salad,
    color: "primary",
    title: { uz: "Har kuni yashil sabzavot", ru: "Зелень каждый день", en: "Greens every single day" },
    subtitle: { uz: "Kletchatka va vitaminlar makoni", ru: "Источник клетчатки и витаминов", en: "Source of fiber and vitamins" },
    details: {
      uz: "Yashil sabzavotlar (ismaloq, kashnich, brokkoli, bodring) antioksidantlar va kletchatkaga eng boy mahsulotlardir. Ular saraton kasalligining oldini oladi va ko'rish qobiliyatini yaxshilaydi.\n\nHar kuni 1 likopcha yangi salat iste'mol qilish ovqatdagi yog'larning qonga so'rilishini kamaytiradi va yurak qon-tomir tizimini asraydi.",
      ru: "Зеленые овощи (шпинат, кинза, брокколи, огурцы) богаты антиоксидантами и клетчаткой. Они предотвращают рак и улучшают зрение.\n\nЕжедневное употребление 1 тарелки свежего салата снижает всасывание жиров в кровь и защищает сердечно-сосудистую систему.",
      en: "Green vegetables (spinach, cilantro, broccoli, cucumbers) are richest in antioxidants and fiber. They prevent cancer and improve vision.\n\nEating 1 bowl of fresh salad every day reduces the absorption of fats into the blood and protects the cardiovascular system."
    },
    bullets: {
      uz: ["Kuchli immunitet yaratadi", "Qonni tozalaydi", "Qarishni sekinlashtiradi"],
      ru: ["Создает сильный иммунитет", "Очищает кровь", "Замедляет старение"],
      en: ["Builds strong immunity", "Cleanses blood", "Slows down aging"]
    }
  },
  {
    id: "sugar",
    icon: Flame,
    color: "chart-5",
    title: { uz: "Shakarni cheklang", ru: "Ограничьте сахар", en: "Limit added sugar" },
    subtitle: { uz: "Eng zararli 'oq o'lim'", ru: "Самая вредная 'белая смерть'", en: "The most harmful 'white death'" },
    details: {
      uz: "Sun'iy qo'shilgan shakar (shirinliklar, gazli suvlar) insulini keskin oshirib, organizmda yog' to'planishiga sabab bo'ladi. U qandli diabet va yurak kasalliklarining birinchi raqamli sababchisi hisoblanadi.\n\nShakar o'rniga tabiiy fruktoza (mevalar, asal) iste'mol qilish tavsiya etiladi. Shakar iste'molini 2 haftaga to'xtatsangiz energiya darajangiz keskin oshganini sezasiz.",
      ru: "Искусственно добавленный сахар (сладости, газировки) резко повышает инсулин, вызывая накопление жира. Это причина номер один диабета и болезней сердца.\n\nВместо сахара рекомендуется натуральная фруктоза (фрукты, мед). Если вы откажетесь от сахара на 2 недели, вы заметите резкое повышение уровня энергии.",
      en: "Artificially added sugar (sweets, sodas) sharply spikes insulin, causing fat accumulation. It is the number one cause of diabetes and heart disease.\n\nInstead of sugar, natural fructose (fruits, honey) is recommended. If you stop consuming sugar for 2 weeks, you will notice a drastic increase in your energy levels."
    },
    bullets: {
      uz: ["Vazn yo'qotish osonlashadi", "Tishlar sog'lom bo'ladi", "Uyqu sifati oshadi"],
      ru: ["Похудение становится легче", "Здоровые зубы", "Качество сна повышается"],
      en: ["Easier weight loss", "Healthy teeth", "Improved sleep quality"]
    }
  }
];

export function TipsSection() {
  const { t, lang } = useI18n();
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const selectedTip = TIPS_DATA.find(t => t.id === activeTip);

  return (
    <section id="tips" className="scroll-mt-24 px-4 py-16 relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider"
          >
            <Info className="h-4 w-4" /> Professional Maslahatlar
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold md:text-5xl tracking-tight"
          >
            Sog'lom Hayot <span className="text-gradient">Qoidalari</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Batafsil ilmiy faktlar bilan tanishish uchun maslahatlar ustiga bosing
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIPS_DATA.map((tip, i) => (
            <Reveal key={tip.id} delay={i * 0.08}>
              <motion.button
                onClick={() => setActiveTip(tip.id)}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-left glass card-glow group h-full rounded-3xl p-6 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <span className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-${tip.color}/15 shadow-inner`}>
                  <tip.icon className={`h-7 w-7 text-${tip.color}`} />
                </span>
                
                <h3 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
                  {tip.title[lang]}
                </h3>
                
                <p className="text-sm text-muted-foreground font-medium flex items-center justify-between">
                  {tip.subtitle[lang]}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                </p>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {activeTip && selectedTip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTip(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass relative z-10 w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-background/95 shadow-2xl"
            >
              {/* Header Gradient */}
              <div className={`h-3 w-full bg-${selectedTip.color}`} />
              
              <div className="p-8 md:p-10">
                <button
                  onClick={() => setActiveTip(null)}
                  className="absolute right-6 top-8 rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="flex items-center gap-5 mb-8">
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-${selectedTip.color}/15`}>
                    <selectedTip.icon className={`h-8 w-8 text-${selectedTip.color}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold md:text-3xl">{selectedTip.title[lang]}</h2>
                    <p className={`text-sm font-bold text-${selectedTip.color} uppercase tracking-wider mt-1`}>
                      {selectedTip.subtitle[lang]}
                    </p>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">
                    {selectedTip.details[lang]}
                  </p>
                </div>

                <div className="mt-8 rounded-2xl bg-white/5 p-6 border border-white/5">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" /> 
                    Amaliy Qadamlar:
                  </h4>
                  <ul className="space-y-3">
                    {selectedTip.bullets[lang].map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

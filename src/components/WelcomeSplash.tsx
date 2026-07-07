import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sparkles, Heart, Salad, Flame, Star } from "lucide-react";

export function WelcomeSplash({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0); // 0=entering, 1=main, 2=fading

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);  // show main text
    const t2 = setTimeout(() => setPhase(2), 4500); // start fade out
    const t3 = setTimeout(() => onDone(), 5200);    // done (5 sec total)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const floatingItems = [
    { icon: "🥗", x: "8%", y: "18%", delay: 0.3, rotate: -15 },
    { icon: "✨", x: "88%", y: "12%", delay: 0.5, rotate: 10 },
    { icon: "🫐", x: "78%", y: "76%", delay: 0.7, rotate: -8 },
    { icon: "🥑", x: "10%", y: "70%", delay: 0.9, rotate: 12 },
    { icon: "🍋", x: "50%", y: "88%", delay: 1.1, rotate: -5 },
    { icon: "🌿", x: "92%", y: "44%", delay: 0.6, rotate: 20 },
    { icon: "🫚", x: "22%", y: "38%", delay: 1.3, rotate: -18 },
    { icon: "🥦", x: "72%", y: "32%", delay: 0.4, rotate: 8 },
  ];

  const words = [
    { text: "Xush kelibsiz", color: "from-emerald-400 to-teal-300" },
    { text: "Добро пожаловать", color: "from-purple-400 to-pink-300" },
    { text: "Welcome", color: "from-amber-400 to-orange-300" },
  ];

  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    if (phase < 1) return;
    const iv = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 1200);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #050c08 0%, #0a1a10 40%, #080f06 100%)" }}
        >
          {/* Animated mesh background */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-[140px]"
                style={{ background: "radial-gradient(circle, rgba(16,185,129,0.45), transparent)" }}
              />
              <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-[140px]"
                style={{ background: "radial-gradient(circle, rgba(168,85,247,0.35), transparent)" }}
              />
              <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
                style={{ background: "radial-gradient(circle, rgba(250,204,21,0.2), transparent)" }}
              />
            </motion.div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Floating food emojis */}
          {phase >= 1 && floatingItems.map((item, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute select-none text-3xl"
              style={{ left: item.x, top: item.y, rotate: item.rotate }}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{
                opacity: [0, 0.8, 0.5, 0.8],
                scale: [0, 1.1, 0.95, 1],
                y: [20, 0, -10, 0],
              }}
              transition={{ delay: item.delay, duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
            >
              {item.icon}
            </motion.div>
          ))}

          {/* Particles */}
          {phase >= 1 && Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`p-${i}`}
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-primary"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${15 + (i * 11) % 70}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                y: [0, -30 - i * 5],
              }}
              transition={{
                delay: 0.5 + i * 0.2,
                duration: 2 + (i % 3) * 0.5,
                repeat: Infinity,
                repeatDelay: 1 + (i % 4) * 0.3,
              }}
            />
          ))}

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg">

            {/* Logo with pulsing rings */}
            <div className="relative mb-8">
              {/* Outer ring */}
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl border-2 border-primary/40"
                style={{ margin: "-8px" }}
              />
              {/* Middle ring */}
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="absolute inset-0 rounded-3xl border border-emerald-300/30"
                style={{ margin: "-4px" }}
              />

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, type: "spring", stiffness: 180, damping: 14 }}
                className="relative flex h-24 w-24 items-center justify-center rounded-3xl shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  boxShadow: "0 0 40px rgba(16,185,129,0.5), 0 20px 60px rgba(0,0,0,0.4)",
                }}
              >
                <Leaf className="h-12 w-12 text-white" />
              </motion.div>
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary/60"
            >
              To'g'ri Ovqatlanish Siri
            </motion.div>

            {/* Animated welcome text */}
            <div className="relative min-h-[8rem] h-auto flex items-center justify-center mb-2">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={wordIdx}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -25, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl font-extrabold md:text-6xl bg-gradient-to-r bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${
                      wordIdx === 0 ? "#10b981, #34d399" :
                      wordIdx === 1 ? "#a855f7, #ec4899" :
                      "#f59e0b, #f97316"
                    })`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {words[wordIdx].text}!
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-base text-white/50 font-medium"
            >
              Sog'lom ovqat — baxtli hayot 🌿
            </motion.p>

            {/* Feature badges */}
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-6 flex flex-wrap justify-center gap-2"
              >
                {["150+ taom", "Premium retseptlar", "Kaloriya hisobi", "Sog'lom hayot"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + i * 0.1 }}
                    className="rounded-full px-3 py-1 text-xs font-medium text-white/60 border border-white/10 bg-white/5"
                  >
                    ✦ {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-8 h-[3px] w-56 overflow-hidden rounded-full bg-white/10"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.0, ease: "linear", delay: 0.4 }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #10b981, #a855f7, #f59e0b)" }}
              />
            </motion.div>

            {/* Skip button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={onDone}
              className="mt-5 text-xs text-white/20 hover:text-white/50 transition-colors"
            >
              O'tkazib yuborish →
            </motion.button>
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 text-[10px] text-white/20 tracking-[0.4em] uppercase"
          >
            Sog'lom ovqat • Baxtli hayot • Premium Platform
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

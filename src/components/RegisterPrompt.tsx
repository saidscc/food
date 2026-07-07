import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { UserPlus, X, Leaf, ArrowRight, CheckCircle, Gift, Shield, Zap } from "lucide-react";

interface RegisterPromptProps {
  onDismiss: () => void;
}

export function RegisterPrompt({ onDismiss }: RegisterPromptProps) {
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  const benefits = [
    { icon: CheckCircle, text: "Buyurtmalaringiz tarixini ko'rish", color: "text-emerald-400" },
    { icon: Shield, text: "Savatchangizni saqlash", color: "text-blue-400" },
    { icon: Zap, text: "Holat o'zgarishlaridan xabar olish", color: "text-yellow-400" },
    { icon: Gift, text: "Maxsus takliflar va chegirmalar", color: "text-purple-400" },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="register-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9000] flex items-end justify-center p-4 sm:items-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) { setVisible(false); onDismiss(); } }}
        >
          {/* Background particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-primary/50"
              style={{ left: `${15 + i * 10}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{
                opacity: [0, 0.7, 0],
                y: [0, -40 - i * 8],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative w-full max-w-[420px] overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(145deg, rgba(10,20,12,0.99), rgba(6,12,8,0.99))",
              border: "1px solid rgba(16,185,129,0.3)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03), 0 0 60px rgba(16,185,129,0.08)",
            }}
          >
            {/* Top animated gradient border */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[2px]"
              animate={{ backgroundPosition: hovered ? "100% 0" : "0% 0" }}
              transition={{ duration: 0.8 }}
              style={{
                background: "linear-gradient(90deg, transparent, #10b981, #a855f7, #f59e0b, #10b981, transparent)",
                backgroundSize: "200% 100%",
              }}
            />

            {/* Glow blob */}
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full blur-[60px]"
              style={{ background: "radial-gradient(circle, rgba(16,185,129,0.3), transparent)" }}
            />

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setVisible(false); onDismiss(); }}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/30 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </motion.button>

            <div className="relative p-7">
              {/* Header */}
              <div className="mb-6 flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 0.98, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    boxShadow: "0 8px 32px rgba(16,185,129,0.35)",
                  }}
                >
                  <UserPlus className="h-8 w-8 text-white" />
                </motion.div>
                <div>
                  <motion.h2
                    className="text-xl font-extrabold text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    Ro'yxatdan o'ting! 🎉
                  </motion.h2>
                  <motion.p
                    className="mt-1 text-sm text-white/45"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    Barcha imkoniyatlardan to'liq foydalaning
                  </motion.p>
                </div>
              </div>

              {/* Benefits list */}
              <div className="mb-6 space-y-3">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3.5 py-2.5"
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 ${b.color}`}>
                      <b.icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-white/65">{b.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <Link
                    to="/auth"
                    onClick={() => { setVisible(false); onDismiss(); }}
                    className="group flex w-full items-center justify-center gap-2.5 rounded-2xl py-3.5 text-sm font-bold text-white shadow-lg relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{ x: ["100%", "-100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", width: "50%" }}
                    />
                    <Leaf className="h-4 w-4" />
                    Ro'yxatdan o'tish
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => { setVisible(false); onDismiss(); }}
                  className="w-full rounded-2xl py-2.5 text-sm text-white/30 transition-colors hover:text-white/60"
                >
                  Keyinroq ro'yxatdan o'taman
                </motion.button>
              </div>

              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/20"
              >
                <Shield className="h-3 w-3" />
                <span>Ma'lumotlaringiz xavfsiz va himoyalangan</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

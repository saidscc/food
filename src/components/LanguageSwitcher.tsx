import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LANGS, useI18n } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="glass flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
        aria-label="Language"
      >
        <Globe className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">{current.flag}</span>
        <span className="uppercase">{current.code}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="glass card-glow absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl p-1.5"
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-accent"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">{l.flag}</span>
                  {l.label}
                </span>
                {l.code === lang && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

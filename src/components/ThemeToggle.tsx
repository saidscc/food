import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="glass relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition-colors hover:bg-accent"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="text-foreground"
      >
        {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-gold" />}
      </motion.span>
    </button>
  );
}

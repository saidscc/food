import { Link } from "@tanstack/react-router";
import { Leaf, Send, Instagram, Mail, ShieldCheck, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { categories } from "@/lib/foods";
import { motion } from "framer-motion";

export function Footer() {
  const { t, lang } = useI18n();

  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="text-lg font-bold">
                <span className="text-gradient">To'g'ri</span> Ovqatlanish
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t("footer.tagline")}</p>
            <div className="mt-5 flex gap-3">
              <a href="https://t.me/youtings_bot" target="_blank" rel="noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent">
                <Send className="h-4 w-4 text-primary" />
              </a>
              <a href="https://instagram.com/_SAIDUSMON_9" target="_blank" rel="noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent">
                <Instagram className="h-4 w-4 text-primary" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("footer.nav")}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-foreground/80 transition-colors hover:text-primary">{t("nav.home")}</Link></li>
              <li><Link to="/catalog" className="text-foreground/80 transition-colors hover:text-primary">{t("nav.catalog")}</Link></li>
              <li><a href="/#tips" className="text-foreground/80 transition-colors hover:text-primary">{t("nav.tips")}</a></li>
              <li><a href="/#videos" className="text-foreground/80 transition-colors hover:text-primary">{t("nav.videos")}</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("footer.categories")}</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {categories.slice(0, 8).map((c) => (
                <li key={c.id}>
                  <Link to="/catalog" search={{ cat: c.id }} className="text-foreground/80 transition-colors hover:text-primary">
                    {c.name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5 text-foreground/80"><Send className="h-4 w-4 text-primary" /> @youtings_bot</li>
              <li className="flex items-center gap-2.5 text-foreground/80"><Instagram className="h-4 w-4 text-primary" /> @_SAIDUSMON_9</li>
              <li className="flex items-center gap-2.5 text-foreground/80"><Mail className="h-4 w-4 text-primary" /> info@ovqatlanish.uz</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} To'g'ri Ovqatlanish Siri. {t("footer.rights")}.
          </p>

          {/* Admin Panel Button */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              to="/admin"
              className="group relative flex items-center gap-2.5 overflow-hidden rounded-full px-5 py-2.5 text-xs font-semibold transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(168,85,247,0.08))",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 -translate-x-full"
                animate={{ translateX: ["−100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.12), transparent)" }}
              />
              <Lock className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary/80 group-hover:text-primary transition-colors">Admin Panel</span>
              <ShieldCheck className="h-3.5 w-3.5 text-primary/50 group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

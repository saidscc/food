import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Leaf, ShoppingBag, User, LogOut, LayoutDashboard, Package, Bookmark } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useSavedStore } from "@/lib/useSavedStore";
import { useAuth } from "@/lib/useAuth";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog, SearchTrigger } from "./SearchDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { t } = useI18n();
  const { count } = useCart();
  const savedCount = useSavedStore((state) => state.savedFoodIds.length);
  const { user, isAdmin, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/catalog", label: t("nav.catalog") },
    { to: "/fridge", label: t("nav.fridge") },
    { to: "/#tips", label: t("nav.tips") },
    { to: "/#videos", label: t("nav.videos") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "glass card-glow" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="hidden text-lg font-bold sm:block">
              <span className="text-gradient">To'g'ri</span> Ovqatlanish
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SearchTrigger onClick={() => setSearchOpen(true)} />
            <ThemeToggle />
            <LanguageSwitcher />

            <Link
              to="/saved"
              className="glass relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-accent"
              aria-label="Saqlanganlar"
            >
              <Bookmark className="h-4 w-4" />
              {savedCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {savedCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="glass relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-accent"
              aria-label={t("nav.cart")}
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-gold-foreground">
                  {count}
                </span>
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="glass flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-accent"
                    aria-label={t("nav.profile")}
                  >
                    <User className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" /> {t("nav.orders")}
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> {t("nav.admin")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/auth"
                className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] sm:block"
                style={{ background: "var(--gradient-primary)" }}
              >
                {t("nav.login")}
              </Link>
            )}

            <button
              className="glass flex h-9 w-9 items-center justify-center rounded-full md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="glass card-glow mt-2 overflow-hidden rounded-2xl p-2 md:hidden"
            >
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  {l.label}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/auth"
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-primary"
                >
                  {t("nav.login")}
                </Link>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

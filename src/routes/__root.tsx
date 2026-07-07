import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "../lib/theme";
import { I18nProvider } from "../lib/i18n";
import { AuthProvider, useAuth } from "../lib/useAuth";
import { CartProvider } from "../lib/cart";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { Toaster } from "../components/ui/sonner";
import { WelcomeSplash } from "../components/WelcomeSplash";
import { RegisterPrompt } from "../components/RegisterPrompt";
import { LocationsSection } from "../components/LocationsSection";
import { AIChatbot } from "../components/AIChatbot";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "To'g'ri Ovqatlanish Siri — Premium sog'lom hayot platformasi" },
      {
        name: "description",
        content:
          "Ovqatlar tarkibi, kaloriyasi, foydasi va to'g'ri iste'mol vaqtlarini professional darajada o'rganing. O'zbek, rus va ingliz tillarida.",
      },
      { name: "author", content: "To'g'ri Ovqatlanish Siri" },
      { property: "og:title", content: "To'g'ri Ovqatlanish Siri" },
      { property: "og:description", content: "Premium sog'lom ovqatlanish platformasi" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Telegram Bot Banner
function TelegramBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mx-4 mb-8 overflow-hidden rounded-3xl"
      style={{ background: "linear-gradient(135deg, #0088cc15, #a855f715)", border: "1px solid #0088cc30" }}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #0088cc, transparent)" }}
      />

      {/* Animated telegram icon */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(0,136,204,0.2), transparent)" }}
      />

      <div className="flex flex-col items-center justify-between gap-6 px-6 py-8 text-center sm:flex-row sm:text-left md:px-10">
        {/* Icon + Text */}
        <div className="flex items-center gap-5">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: "linear-gradient(135deg, #0088cc, #006bb3)" }}
          >
            <Send className="h-8 w-8 text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-extrabold text-foreground">
              Telegram botimizga o'ting! 🤖
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Buyurtma bering, maslahat oling, menyuni ko'ring — barchasi bir joyda!
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["🛒 Buyurtma", "💬 Maslahat", "🥗 Menyu", "📍 Do'konlar"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-medium text-foreground/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href="https://t.me/youtings_bot"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0 flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all"
          style={{ background: "linear-gradient(135deg, #0088cc, #006bb3)" }}
        >
          <Send className="h-4 w-4" /> Botga o'tish
        </motion.a>
      </div>
    </motion.div>
  );
}

// Inner app content with auth-aware prompts
function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth" || location.pathname === "/admin";
  const [splashDone, setSplashDone] = useState(false);
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);

  // Check sessionStorage to only show once per session
  useEffect(() => {
    if (typeof window === "undefined") return;
    const splashShown = sessionStorage.getItem("splash_shown");
    if (splashShown) {
      setSplashDone(true);
    }
  }, []);

  // When splash finishes, mark it done and potentially show register prompt
  const handleSplashDone = () => {
    setSplashDone(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("splash_shown", "1");
    }
  };

  // Show register prompt also to unauthenticated users who already dismissed the splash
  useEffect(() => {
    if (!loading && !user && splashDone) {
      const dismissed = sessionStorage.getItem("register_prompt_dismissed");
      const splashJustFinished = sessionStorage.getItem("splash_shown");
      if (!dismissed && splashJustFinished) {
        const timer = setTimeout(() => {
          setShowRegisterPrompt(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, user, splashDone]);

  const handleDismissRegister = () => {
    setShowRegisterPrompt(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("register_prompt_dismissed", "1");
    }
  };

  return (
    <>
      {/* Welcome Splash — not shown on auth/admin pages */}
      {!splashDone && !isAuthPage && <WelcomeSplash onDone={handleSplashDone} />}

      {/* Register Prompt — not shown on auth/admin pages */}
      <AnimatePresence>
        {showRegisterPrompt && !user && !isAuthPage && (
          <RegisterPrompt onDismiss={handleDismissRegister} />
        )}
      </AnimatePresence>

      <AnimatedBackground />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Locations Section */}
      <LocationsSection />

      {/* Telegram Bot Banner */}
      <TelegramBanner />

      <Footer />
      <Toaster position="top-center" />

      {/* AI Chatbot floating button */}
      <AIChatbot />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <AuthProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

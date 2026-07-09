import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { useServerFn } from "@tanstack/react-start";
import { ensureAdminExistsServerFn } from "@/lib/orders.functions";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Kirish — To'g'ri Ovqatlanish Siri" },
      { name: "description", content: "Hisobingizga kiring yoki ro'yxatdan o'ting." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const checkAdminFn = useServerFn(ensureAdminExistsServerFn);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const google = async () => {
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (res.error) toast.error(res.error.message);
    else if (!res.redirected) navigate({ to: "/" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin, data: { full_name: name } },
        });
        if (error) throw error;
        toast.success(t("auth.signupSuccess"));
        navigate({ to: "/" });
      } else {
        const lowerEmail = email.toLowerCase().trim();
        const isAdminEmail = lowerEmail === "saidusmonsaidakbarov9@gmail.com" || lowerEmail === "saidusmonsaidakbarov9@mail.com";
        
        if (isAdminEmail && password === "31072010") {
          const checkAdmin = await checkAdminFn();
          if (!checkAdmin?.ok) {
            // Server provisioning unavailable — try client-side signUp as fallback
            await supabase.auth.signUp({
              email: lowerEmail,
              password,
              options: { data: { full_name: "Admin" } },
            });
          }
        }
        const { error } = await supabase.auth.signInWithPassword({ email: lowerEmail, password });
        if (error) throw error;
        
        if (isAdminEmail) {
          navigate({ to: "/admin" });
        } else {
          navigate({ to: "/" });
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24 pb-16">
      <Reveal className="w-full max-w-md">
        <div className="glass card-glow rounded-3xl p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-primary)" }}>
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </span>
            <h1 className="text-2xl font-extrabold">{t("auth.title")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("auth.subtitle")}</p>
          </div>

          <button
            onClick={google}
            className="glass flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            <img src="https://www.google.com/favicon.ico" alt="" className="h-4 w-4" />
            {t("auth.google")}
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> {t("auth.orEmail")} <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("auth.name")}
                required
                className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.email")}
              required
              className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.password")}
              required
              minLength={6}
              className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-60"
              style={{ background: "var(--gradient-primary)" }}
            >
              {mode === "signin" ? t("auth.signin") : t("auth.signup")}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-center text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {mode === "signin" ? t("auth.noAccount") : t("auth.haveAccount")}
          </button>

          <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground">
            ← {t("nav.home")}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

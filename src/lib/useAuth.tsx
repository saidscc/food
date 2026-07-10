import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const LOCAL_ADMIN_KEY = "local_admin";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [localAdmin, setLocalAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLocalAdmin(localStorage.getItem(LOCAL_ADMIN_KEY) === "1");
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => {
          supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", s.user.id)
            .eq("role", "admin")
            .maybeSingle()
            .then(({ data }) => {
              const email = s.user?.email || "";
              const isForceAdmin = email === "test@gmail.com" || email === "saidusmonsaidakbarov9@mail.com" || email === "saidusmonsaidakbarov9@gmail.com";
              setIsAdmin(isForceAdmin || !!data);
            });
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.session.user.id)
          .eq("role", "admin")
          .maybeSingle()
          .then(({ data: r }) => {
            const email = data.session?.user?.email || "";
            const isForceAdmin = email === "test@gmail.com" || email === "saidusmonsaidakbarov9@mail.com" || email === "saidusmonsaidakbarov9@gmail.com";
            setIsAdmin(isForceAdmin || !!r);
          });
      }
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setLocalAdmin(false);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin: isAdmin || localAdmin, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

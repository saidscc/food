import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, ShoppingBag, Clock, CheckCircle, Lock, Eye, EyeOff,
  Shield, LogIn, Phone, MapPin, User, Search, Filter, Calendar,
  RefreshCw, Activity, PieChart as PieIcon, Layers, Edit, Save, Trash2, Settings, Plus, DollarSign, X
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useAuth, LOCAL_ADMIN_KEY } from "@/lib/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  adminListOrders, adminUpdateStatus, adminStats,
  ensureAdminExistsServerFn
} from "@/lib/orders.functions";
import { formatPrice, foods, getPrice, updateFoodInStorage, updatePriceInStorage, resetFoodsAndPrices, type Food } from "@/lib/foods";
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip as ChartTooltip,
  PieChart, Pie, Cell
} from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin panel — To'g'ri Ovqatlanish Siri" }] }),
  component: AdminPage,
});

const STATUSES = ["new", "confirmed", "preparing", "delivering", "delivered", "cancelled"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "#6366f1",
  confirmed: "#10b981",
  preparing: "#f59e0b",
  delivering: "#3b82f6",
  delivered: "#22c55e",
  cancelled: "#ef4444",
};

function AdminPage() {
  const { t } = useI18n();
  const { user, isAdmin, loading } = useAuth();
  const qc = useQueryClient();

  const listFn = useServerFn(adminListOrders);
  const statsFn = useServerFn(adminStats);
  const updateFn = useServerFn(adminUpdateStatus);
  const ensureAdminFn = useServerFn(ensureAdminExistsServerFn);

  const [loginEmail, setLoginEmail] = useState("test@gmail.com");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [adminTab, setAdminTab] = useState<"orders" | "products" | "prices">("orders");
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [priceInput, setPriceInput] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialPrices: Record<string, string> = {};
    foods.forEach((f) => {
      initialPrices[f.id] = String(getPrice(f.id));
    });
    setPriceInput(initialPrices);
  }, []);

  const { data: orders, refetch: refetchOrders } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => listFn(),
    enabled: !!user && isAdmin
  });
  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => statsFn(),
    enabled: !!user && isAdmin
  });

  const update = useMutation({
    mutationFn: (v: { id: string; status: (typeof STATUSES)[number] }) => updateFn({ data: v }),
    onSuccess: () => {
      toast.success(t("admin.updated"));
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Error"),
  });

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const trimmedEmail = loginEmail.trim().toLowerCase();

      // Built-in local admin — works without any Supabase account
      if (trimmedEmail === "test@gmail.com" && loginPassword === "11223344") {
        localStorage.setItem(LOCAL_ADMIN_KEY, "1");
        toast.success("✅ Admin panelga xush kelibsiz!");
        window.location.reload();
        return;
      }

      // Try to provision admin on server first
      if (trimmedEmail === "saidusmonsaidakbarov9@gmail.com" || trimmedEmail === "saidusmonsaidakbarov9@mail.com") {
        const result = await ensureAdminFn();
        if (!result?.ok) {
          // Server provisioning unavailable — try client-side signUp as fallback
          await supabase.auth.signUp({
            email: trimmedEmail,
            password: loginPassword,
            options: { data: { full_name: "Admin" } },
          });
        }
      }
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: loginPassword,
      });
      if (error) throw error;
      toast.success("✅ Admin panelga xush kelibsiz!");
      window.location.reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login xatosi");
    } finally {
      setLoginLoading(false);
    }
  };

  // If loading — show spinner
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <RefreshCw className="h-8 w-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  // If not logged in — show premium admin login form
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Glow blobs */}
          <div className="pointer-events-none absolute -inset-40 z-0">
            <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-chart-4/20 blur-[120px]" />
          </div>

          <div className="glass card-glow relative z-10 overflow-hidden rounded-3xl p-8">
            {/* Header */}
            <div className="mb-8 flex flex-col items-center text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Shield className="h-8 w-8 text-primary-foreground" />
              </motion.div>
              <h1 className="text-2xl font-extrabold">
                <span className="text-gradient">Admin Panel</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Boshqaruv paneliga kirish uchun ma'lumotlaringizni kiriting
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full rounded-xl border border-input bg-background/50 py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Parol"
                  required
                  className="w-full rounded-xl border border-input bg-background/50 py-3.5 pl-11 pr-12 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <motion.button
                type="submit"
                disabled={loginLoading}
                whileHover={{ scale: loginLoading ? 1 : 1.02 }}
                whileTap={{ scale: loginLoading ? 1 : 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all disabled:opacity-60"
                style={{ background: "var(--gradient-primary)" }}
              >
                {loginLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <RefreshCw className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" /> Kirish
                  </>
                )}
              </motion.button>
            </form>


          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Statistics cards
  const cards = [
    { icon: ShoppingBag, label: t("admin.orders"), value: stats?.count ?? 0, color: "primary", desc: "Jami buyurtmalar" },
    { icon: TrendingUp, label: t("admin.revenue"), value: stats ? formatPrice(stats.revenue) : "—", color: "chart-3", desc: "Umumiy daromad" },
    { icon: Clock, label: t("admin.pending"), value: stats?.pending ?? 0, color: "gold", desc: "Kutilmoqda" },
    { icon: CheckCircle, label: t("admin.delivered"), value: stats?.delivered ?? 0, color: "chart-4", desc: "Yetkazilgan" },
  ];

  // Last 7 days sales chart data
  const last7DaysData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      date: d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }),
      dateStr: d.toDateString(),
      Sotuvlar: 0,
      Buyurtmalar: 0,
    };
  });

  orders?.forEach((o: any) => {
    if (o.status === "cancelled") return;
    const oDateStr = new Date(o.created_at).toDateString();
    const match = last7DaysData.find((d) => d.dateStr === oDateStr);
    if (match) {
      match.Sotuvlar += Number(o.total);
      match.Buyurtmalar += 1;
    }
  });

  const sourceData = [
    { name: "Web sayt", value: 0, color: "#10b981" },
    { name: "Telegram Bot", value: 0, color: "#a855f7" },
  ];
  orders?.forEach((o: any) => {
    if (o.status === "cancelled") return;
    if (o.source === "telegram") sourceData[1].value += Number(o.total);
    else sourceData[0].value += Number(o.total);
  });

  // Filtered orders
  const filteredOrders = orders?.filter((o: any) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      o.customer_name?.toLowerCase().includes(q) ||
      o.phone?.includes(q) ||
      String(o.order_number).includes(q);
    const matchStatus = selectedStatus === "all" || o.status === selectedStatus;
    const matchSource = selectedSource === "all" || o.source === selectedSource;
    return matchSearch && matchStatus && matchSource;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 pb-16 pt-32 md:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-extrabold md:text-4xl text-gradient"
            >
              🛡️ {t("admin.title")}
            </motion.h1>
            <p className="mt-2 text-muted-foreground">{t("admin.subtitle")}</p>
          </div>
          <button
            onClick={() => { refetchOrders(); refetchStats(); toast.success("Yangilandi!"); }}
            className="glass flex items-center gap-2 self-start rounded-full px-4 py-2 text-xs font-semibold hover:bg-accent transition-all"
          >
            <RefreshCw className="h-3 w-3" /> Yangilash
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex gap-2 border-b border-white/5 pb-px overflow-x-auto scrollbar-none">
          {[
            { id: "orders", label: "Buyurtmalar", icon: ShoppingBag },
            { id: "products", label: "Mahsulotlar", icon: Layers },
            { id: "prices", label: "Narxlar", icon: DollarSign },
          ].map((tb) => {
            const Icon = tb.icon;
            const isActive = adminTab === tb.id;
            return (
              <button
                key={tb.id}
                onClick={() => setAdminTab(tb.id as any)}
                className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-all relative ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tb.label}
                {isActive && (
                  <motion.div
                    layoutId="admin-active-tab-glow"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {adminTab === "orders" && (
          <>
            {/* Stat Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((c, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ translateY: -4 }}
                  className="glass card-glow rounded-2xl p-5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">{c.desc}</span>
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-4 text-2xl font-extrabold">{c.value}</div>
                  <div className="mt-1 text-sm font-semibold text-muted-foreground">{c.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="glass card-glow rounded-3xl p-6 lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-4 w-4 text-primary" />
                  <h3 className="font-bold">Haftalik savdo dinamikasi</h3>
                </div>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={last7DaysData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <ChartTooltip
                        contentStyle={{ background: "rgba(10,10,10,0.85)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }}
                        formatter={(v) => [formatPrice(Number(v)), "Sotuv"]}
                      />
                      <Area type="monotone" dataKey="Sotuvlar" stroke="#10b981" strokeWidth={2} fill="url(#salesGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass card-glow rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <PieIcon className="h-4 w-4 text-primary" />
                  <h3 className="font-bold">Web vs Telegram</h3>
                </div>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData.some((d) => d.value > 0) ? sourceData : [{ name: "Ma'lumot yo'q", value: 1, color: "#444" }]}
                        cx="50%" cy="50%"
                        innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value"
                      >
                        {sourceData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        contentStyle={{ background: "rgba(10,10,10,0.85)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }}
                        formatter={(v) => [formatPrice(Number(v)), "Daromad"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 space-y-1.5">
                  {sourceData.map((d) => (
                    <div key={d.name} className="flex items-center gap-2 text-xs">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-muted-foreground">{d.name}</span>
                      <span className="ml-auto font-semibold">{formatPrice(d.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="mt-10 glass card-glow rounded-3xl p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" /> {t("admin.allOrders")}
                  <span className="ml-2 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-bold text-primary">
                    {filteredOrders?.length ?? 0}
                  </span>
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[180px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Qidirish..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-full border border-input bg-background/50 py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="rounded-full border border-input bg-background/50 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      <option value="all">Barcha holatlar</option>
                      {STATUSES.map((s) => <option key={s} value={s}>{t(`status.${s}`)}</option>)}
                    </select>
                  </div>
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="rounded-full border border-input bg-background/50 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="all">Barcha manbalar</option>
                    <option value="web">Web sayt</option>
                    <option value="telegram">Telegram Bot</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <AnimatePresence>
                  {filteredOrders && filteredOrders.length > 0 ? (
                    filteredOrders.map((o: any, idx: number) => (
                      <motion.div
                        key={o.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ delay: idx * 0.03 }}
                        className="glass card-glow rounded-2xl p-5 hover:border-primary/20 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-extrabold text-primary">#{o.order_number}</span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <User className="h-3.5 w-3.5" /> {o.customer_name}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" /> {o.phone}
                            </span>
                            {o.source === "telegram" ? (
                              <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold text-purple-400">Telegram</span>
                            ) : (
                              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">Web</span>
                            )}
                          </div>
                          <span className="font-bold text-gradient text-base">{formatPrice(Number(o.total))}</span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {o.items.map((it: any, i: number) => (
                            <span key={i} className="rounded-lg bg-accent/50 border border-border/30 px-2.5 py-1 text-xs font-medium">
                              {it.name} <span className="text-primary font-bold">×{it.qty}</span>
                            </span>
                          ))}
                        </div>

                        {o.address && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-primary" /> {o.address}
                          </div>
                        )}

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" /> {new Date(o.created_at).toLocaleString("ru-RU")}
                        </div>

                        <div className="mt-4 border-t border-border/30 pt-3 flex flex-wrap gap-2">
                          {STATUSES.map((s) => (
                            <button
                              key={s}
                              onClick={() => update.mutate({ id: o.id, status: s })}
                              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${o.status === s ? "text-primary-foreground shadow-md scale-105" : "glass hover:bg-accent"}`}
                              style={o.status === s ? { background: STATUS_COLORS[s] || "var(--gradient-primary)" } : undefined}
                            >
                              {t(`status.${s}`)}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mb-3" />
                      <p className="text-sm text-muted-foreground">Buyurtmalar topilmadi</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}

        {adminTab === "products" && (
          <div className="mt-8 glass card-glow rounded-3xl p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" /> Mahsulotlar Ro'yxati
                  <span className="ml-2 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-bold text-primary">
                    {foods.length}
                  </span>
                </h2>
                <p className="text-xs text-muted-foreground mt-1">Sog'lom hayot va to'g'ri ovqatlanish taomlarini tahrirlash</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-full max-w-[240px]">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Mahsulot qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-input bg-background/50 py-1.5 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <button
                  onClick={resetFoodsAndPrices}
                  className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/20 hover:bg-amber-500/10 transition-colors"
                >
                  <RefreshCw className="h-3 w-3" /> Asliga qaytarish
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {foods
                .filter((f) => {
                  const q = searchQuery.toLowerCase();
                  return (
                    !q ||
                    f.name.uz.toLowerCase().includes(q) ||
                    f.name.ru.toLowerCase().includes(q) ||
                    f.name.en.toLowerCase().includes(q) ||
                    f.id.toLowerCase().includes(q)
                  );
                })
                .map((food) => (
                  <div key={food.id} className="glass card-glow rounded-2xl overflow-hidden border border-white/5 flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={food.image} alt="" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <span className="absolute top-3 left-3 rounded-full bg-primary/95 text-white text-[10px] font-extrabold px-2.5 py-1">
                        Health Score: {food.healthScore}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-white text-base leading-tight">{food.name.uz}</h3>
                        <p className="text-xs text-white/50 mt-1 line-clamp-2">{food.short.uz}</p>

                        <div className="mt-3.5 grid grid-cols-4 gap-1.5 text-center">
                          {[
                            { label: "Kkal", value: food.calories },
                            { label: "Prot", value: food.protein },
                            { label: "Yog'", value: food.fat },
                            { label: "Ugl", value: food.carbs },
                          ].map((it) => (
                            <div key={it.label} className="bg-white/5 rounded-lg py-1.5">
                              <div className="text-xs font-bold text-white">{it.value}</div>
                              <div className="text-[9px] text-muted-foreground uppercase">{it.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm font-extrabold text-primary">{formatPrice(getPrice(food.id))}</span>
                        <button
                          onClick={() => setEditingFood({ ...food })}
                          className="glass flex items-center gap-1.5 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary px-3 py-1.5 text-xs font-bold transition-all"
                        >
                          <Edit className="h-3.5 w-3.5" /> Tahrirlash
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {adminTab === "prices" && (
          <div className="mt-8 glass card-glow rounded-3xl p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" /> Narxlar Boshqaruvi
                </h2>
                <p className="text-xs text-muted-foreground mt-1">Barcha mahsulotlar narxlarini o'zgartirish va saqlash</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetFoodsAndPrices}
                  className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/20 hover:bg-amber-500/10 transition-colors"
                >
                  <RefreshCw className="h-3 w-3" /> Narxlarni asliga qaytarish
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Rasm & Nomi</th>
                    <th className="py-3.5 px-4">Kategoriya</th>
                    <th className="py-3.5 px-4 w-[180px]">Narxi (so'm)</th>
                    <th className="py-3.5 px-4 text-right">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {foods.map((food) => (
                    <tr key={food.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 flex items-center gap-3">
                        <img src={food.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-white text-sm">{food.name.uz}</div>
                          <div className="text-[10px] text-white/30 font-semibold">{food.id}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {food.categories.slice(0, 2).map((cat) => (
                            <span key={cat} className="text-[9px] bg-white/5 border border-white/10 text-white/50 rounded-full px-2 py-0.5">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="relative">
                          <input
                            type="number"
                            value={priceInput[food.id] ?? ""}
                            onChange={(e) => {
                              setPriceInput({ ...priceInput, [food.id]: e.target.value });
                            }}
                            className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-sm text-white font-bold outline-none focus:border-primary transition-all pr-12"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">so'm</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => {
                            const newPrice = Number(priceInput[food.id]);
                            if (isNaN(newPrice) || newPrice <= 0) {
                              toast.error("Iltimos, to'g'ri narx kiriting!");
                              return;
                            }
                            updatePriceInStorage(food.id, newPrice);
                            toast.success("✅ Narx muvaffaqiyatli saqlandi!");
                          }}
                          className="inline-flex items-center gap-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 text-xs font-bold transition-all"
                        >
                          <Save className="h-3.5 w-3.5" /> Saqlash
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Edit Modal */}
        <AnimatePresence>
          {editingFood && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) setEditingFood(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-[#090f0c] border border-white/10 rounded-3xl p-6 relative z-[10000]"
                style={{
                  boxShadow: "0 30px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
              >
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-primary to-chart-3" />

                <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Edit className="h-5 w-5 text-primary" /> {editingFood.name.uz} tahrirlash
                  </h3>
                  <button
                    onClick={() => setEditingFood(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 scrollbar-thin">
                  {/* Name translations */}
                  <div>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Taom Nomi (Tillar bo'yicha)</span>
                    <div className="grid gap-3 sm:grid-cols-3 mt-1.5">
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">O'zbekcha</label>
                        <input
                          type="text"
                          value={editingFood.name.uz}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            name: { ...editingFood.name, uz: e.target.value }
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Ruscha</label>
                        <input
                          type="text"
                          value={editingFood.name.ru}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            name: { ...editingFood.name, ru: e.target.value }
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Inglizcha</label>
                        <input
                          type="text"
                          value={editingFood.name.en}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            name: { ...editingFood.name, en: e.target.value }
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Short descriptions */}
                  <div>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Qisqa Tavsif (Tillar bo'yicha)</span>
                    <div className="grid gap-3 sm:grid-cols-3 mt-1.5">
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">O'zbekcha</label>
                        <input
                          type="text"
                          value={editingFood.short.uz}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            short: { ...editingFood.short, uz: e.target.value }
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Ruscha</label>
                        <input
                          type="text"
                          value={editingFood.short.ru}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            short: { ...editingFood.short, ru: e.target.value }
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Inglizcha</label>
                        <input
                          type="text"
                          value={editingFood.short.en}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            short: { ...editingFood.short, en: e.target.value }
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Macros (Kkal, Prot, Fat, Carbs) & Health Parameters */}
                  <div>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Ozuqaviy Qiymat & Sog'lomlik</span>
                    <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 mt-1.5">
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Kaloriya (kkal)</label>
                        <input
                          type="number"
                          value={editingFood.calories}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            calories: Number(e.target.value)
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Protein (g)</label>
                        <input
                          type="number"
                          value={editingFood.protein}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            protein: Number(e.target.value)
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Yog' (g)</label>
                        <input
                          type="number"
                          value={editingFood.fat}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            fat: Number(e.target.value)
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Uglevod (g)</label>
                        <input
                          type="number"
                          value={editingFood.carbs}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            carbs: Number(e.target.value)
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 grid-cols-2 mt-3">
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Tayyorlash vaqti (daqiqa)</label>
                        <input
                          type="number"
                          value={editingFood.prepTime}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            prepTime: Number(e.target.value)
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Health Score (1-100)</label>
                        <input
                          type="number"
                          value={editingFood.healthScore}
                          onChange={(e) => setEditingFood({
                            ...editingFood,
                            healthScore: Number(e.target.value)
                          })}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setEditingFood(null)}
                    className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 text-xs font-bold transition-all"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={() => {
                      if (!editingFood) return;
                      updateFoodInStorage(editingFood);
                      toast.success("✅ Mahsulot muvaffaqiyatli yangilandi!");
                      setEditingFood(null);
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground px-4 py-2 text-xs font-bold transition-all"
                  >
                    <Save className="h-4 w-4" /> Saqlash
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

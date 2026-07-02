import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { TrendingUp, ShoppingBag, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/useAuth";
import { adminListOrders, adminUpdateStatus, adminStats, claimAdmin } from "@/lib/orders.functions";
import { formatPrice } from "@/lib/foods";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin panel — To'g'ri Ovqatlanish Siri" }] }),
  component: AdminPage,
});

const STATUSES = ["new", "confirmed", "preparing", "delivering", "delivered", "cancelled"] as const;

function AdminPage() {
  const { t } = useI18n();
  const { user, isAdmin, loading } = useAuth();
  const qc = useQueryClient();
  const listFn = useServerFn(adminListOrders);
  const statsFn = useServerFn(adminStats);
  const updateFn = useServerFn(adminUpdateStatus);
  const claimFn = useServerFn(claimAdmin);

  const { data: orders } = useQuery({ queryKey: ["admin-orders"], queryFn: () => listFn(), enabled: !!user && isAdmin });
  const { data: stats } = useQuery({ queryKey: ["admin-stats"], queryFn: () => statsFn(), enabled: !!user && isAdmin });

  const update = useMutation({
    mutationFn: (v: { id: string; status: (typeof STATUSES)[number] }) => updateFn({ data: v }),
    onSuccess: () => {
      toast.success(t("admin.updated"));
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Error"),
  });

  const claim = useMutation({
    mutationFn: () => claimFn(),
    onSuccess: () => {
      toast.success("✅ Admin");
      window.location.reload();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Error"),
  });

  if (!loading && !user) {
    return (
      <div className="px-4 pb-16 pt-32 md:pt-40">
        <div className="mx-auto max-w-md text-center">
          <div className="glass card-glow rounded-3xl p-12">
            <h1 className="text-2xl font-bold">{t("checkout.loginRequired")}</h1>
            <Link to="/auth" className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg" style={{ background: "var(--gradient-primary)" }}>
              {t("nav.login")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="px-4 pb-16 pt-32 md:pt-40">
        <div className="mx-auto max-w-md text-center">
          <div className="glass card-glow rounded-3xl p-12">
            <h1 className="text-xl font-bold">{t("admin.noAccess")}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t("admin.claimHint")}</p>
            <button
              onClick={() => claim.mutate()}
              disabled={claim.isPending}
              className="mt-6 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg disabled:opacity-60"
              style={{ background: "var(--gradient-primary)" }}
            >
              {t("admin.claim")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    { icon: ShoppingBag, label: t("admin.orders"), value: stats?.count ?? 0 },
    { icon: TrendingUp, label: t("admin.revenue"), value: stats ? formatPrice(stats.revenue) : "—" },
    { icon: Clock, label: t("admin.pending"), value: stats?.pending ?? 0 },
    { icon: CheckCircle, label: t("admin.delivered"), value: stats?.delivered ?? 0 },
  ];

  return (
    <div className="px-4 pb-16 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold md:text-4xl">{t("admin.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("admin.subtitle")}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="glass card-glow rounded-2xl p-5">
              <c.icon className="h-6 w-6 text-primary" />
              <div className="mt-3 text-2xl font-extrabold">{c.value}</div>
              <div className="text-sm text-muted-foreground">{c.label}</div>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-xl font-bold">{t("admin.allOrders")}</h2>
        <div className="mt-4 space-y-4">
          {orders?.map((o: any) => (
            <div key={o.id} className="glass card-glow rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-bold">#{o.order_number}</span>
                  <span className="ml-3 text-sm text-muted-foreground">{o.customer_name} · {o.phone}</span>
                  {o.source === "telegram" && <span className="ml-2 rounded-full bg-chart-4/20 px-2 py-0.5 text-[10px] font-semibold text-chart-4">Telegram</span>}
                </div>
                <span className="font-bold text-gradient">{formatPrice(Number(o.total))}</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {o.items.map((it: any, i: number) => `${it.name} ×${it.qty}`).join(", ")}
              </div>
              {o.address && <div className="mt-1 text-xs text-muted-foreground">📍 {o.address}</div>}
              <div className="mt-3 flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => update.mutate({ id: o.id, status: s })}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                      o.status === s ? "text-primary-foreground shadow" : "glass hover:bg-accent"
                    }`}
                    style={o.status === s ? { background: "var(--gradient-primary)" } : undefined}
                  >
                    {t(`status.${s}`)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

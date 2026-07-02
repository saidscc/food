import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/useAuth";
import { listMyOrders, cancelMyOrder } from "@/lib/orders.functions";
import { formatPrice } from "@/lib/foods";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Buyurtmalarim — To'g'ri Ovqatlanish Siri" }] }),
  component: OrdersPage,
});

const STATUS_COLORS: Record<string, string> = {
  new: "bg-chart-2/20 text-chart-2",
  confirmed: "bg-primary/20 text-primary",
  preparing: "bg-gold/20 text-gold",
  delivering: "bg-chart-4/20 text-chart-4",
  delivered: "bg-primary/20 text-primary",
  cancelled: "bg-destructive/20 text-destructive",
};

function OrdersPage() {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const fetchOrders = useServerFn(listMyOrders);
  const cancelFn = useServerFn(cancelMyOrder);
  const qc = useQueryClient();

  const { data: orders } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => fetchOrders(),
    enabled: !!user,
  });

  const cancel = useMutation({
    mutationFn: (id: string) => cancelFn({ data: { id } }),
    onSuccess: () => {
      toast.success(t("orders.cancelled"));
      qc.invalidateQueries({ queryKey: ["my-orders"] });
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

  return (
    <div className="px-4 pb-16 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold md:text-4xl">{t("orders.title")}</h1>

        {orders && orders.length === 0 && (
          <div className="glass card-glow mt-8 rounded-3xl p-16 text-center text-muted-foreground">
            <Package className="mx-auto h-12 w-12" />
            <p className="mt-3">{t("orders.empty")}</p>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {orders?.map((o: any, idx: number) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass card-glow rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">{t("orders.number")} #{o.order_number}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[o.status]}`}>
                  {t(`status.${o.status}`)}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                {o.items.map((it: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span>{it.name} × {it.qty}</span>
                    <span>{formatPrice(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="font-bold text-gradient">{formatPrice(Number(o.total))}</span>
                {["new", "confirmed", "preparing"].includes(o.status) && (
                  <button
                    onClick={() => cancel.mutate(o.id)}
                    disabled={cancel.isPending}
                    className="rounded-full border border-destructive/40 px-4 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
                  >
                    {t("orders.cancel")}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

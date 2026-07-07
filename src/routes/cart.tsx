import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/useAuth";
import { useServerFn } from "@tanstack/react-start";
import { createOrder } from "@/lib/orders.functions";
import { getFood, getPrice, formatPrice } from "@/lib/foods";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Savat — To'g'ri Ovqatlanish Siri" }] }),
  component: CartPage,
});

function CartPage() {
  const { t, lang } = useI18n();
  const { items, setQty, remove, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const placeOrder = useServerFn(createOrder);

  const [checkout, setCheckout] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error(t("checkout.loginRequired"));
      navigate({ to: "/auth" });
      return;
    }
    setLoading(true);
    try {
      const orderItems = items.map((i) => {
        const f = getFood(i.id)!;
        return { id: i.id, name: f.name[lang], qty: i.qty, price: getPrice(i.id) };
      });
      const res = await placeOrder({
        data: { customer_name: name, phone, address, note, items: orderItems },
      });
      toast.success(`${t("checkout.success")} #${res.order_number}`);
      clear();
      navigate({ to: "/orders" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="px-4 pb-16 pt-32 md:pt-40">
        <div className="mx-auto max-w-2xl text-center">
          <div className="glass card-glow rounded-3xl p-16">
            <ShoppingBag className="mx-auto h-14 w-14 text-muted-foreground" />
            <h1 className="mt-4 text-2xl font-bold">{t("cart.empty")}</h1>
            <p className="mt-2 text-muted-foreground">{t("cart.emptyHint")}</p>
            <Link
              to="/catalog"
              className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
              style={{ background: "var(--gradient-primary)" }}
            >
              {t("cart.continue")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-16 pt-32 md:pt-40">
      <div className="mx-auto max-w-5xl">
        <Link to="/catalog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> {t("cart.continue")}
        </Link>
        <h1 className="text-3xl font-extrabold md:text-4xl">{t("cart.title")}</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {items.map((i) => {
                const f = getFood(i.id);
                if (!f) return null;
                return (
                  <motion.div
                    key={i.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass flex items-center gap-4 rounded-2xl p-3"
                  >
                    <img src={f.image} alt={f.name[lang]} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{f.name[lang]}</h3>
                      <p className="text-sm text-primary">{formatPrice(getPrice(i.id))}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="glass flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center font-semibold">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="glass flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button onClick={() => remove(i.id)} className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <Reveal className="h-fit">
            <div className="glass card-glow sticky top-28 rounded-3xl p-6">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>{t("cart.total")}</span>
                <span className="text-gradient">{formatPrice(total)}</span>
              </div>

              {!checkout ? (
                <button
                  onClick={() => {
                    if (!user) {
                      toast.error("Avval ro'yxatdan o'ting!", {
                        description: "Buyurtma berish uchun hisobingizga kiring.",
                        action: { label: "Kirish →", onClick: () => navigate({ to: "/auth" }) },
                        duration: 5000,
                      });
                      return;
                    }
                    setCheckout(true);
                  }}
                  className="mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {t("cart.checkout")}
                </button>
              ) : (
                <form onSubmit={submit} className="mt-5 space-y-3">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("checkout.name")} required className="w-full rounded-xl border border-input bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("checkout.phone")} required className="w-full rounded-xl border border-input bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary" />
                  <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t("checkout.address")} required className="w-full rounded-xl border border-input bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary" />
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={t("checkout.note")} rows={2} className="w-full rounded-xl border border-input bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary" />
                  <button type="submit" disabled={loading} className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg disabled:opacity-60" style={{ background: "var(--gradient-primary)" }}>
                    {t("checkout.submit")}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

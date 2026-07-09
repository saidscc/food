import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Truck, CreditCard, Coins, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/useAuth";
import { useServerFn } from "@tanstack/react-start";
import { createOrder } from "@/lib/orders.functions";
import { getFood, getPrice, formatPrice } from "@/lib/foods";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";

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
  
  // Structured address
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");
  const [floor, setFloor] = useState("");
  
  const [note, setNote] = useState("");
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "online">("cash");
  const [loading, setLoading] = useState(false);

  // Pre-populate details from profile if logged in
  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            if (data.full_name) setName(data.full_name);
            if (data.phone) setPhone(data.phone);
          }
        });
    }
  }, [user]);

  const deliveryFee = deliverySpeed === "express" ? 10000 : 0;
  const orderTotal = total + deliveryFee;

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

      if (deliverySpeed === "express") {
        orderItems.push({
          id: "delivery-express",
          name: lang === "uz" ? "Tezkor yetkazib berish (30-45 daqiqa)" : lang === "ru" ? "Экспресс доставка (30-45 мин)" : "Express Delivery (30-45 mins)",
          qty: 1,
          price: 10000
        });
      }

      const fullAddress = [
        street ? `${lang === "uz" ? "Ko'cha/Mahalla" : lang === "ru" ? "Улица/Махалля" : "Street"}: ${street}` : "",
        building ? `${lang === "uz" ? "Uy" : lang === "ru" ? "Дом" : "Building"}: ${building}` : "",
        entrance ? `${lang === "uz" ? "Podezd" : lang === "ru" ? "Подъезд" : "Entrance"}: ${entrance}` : "",
        floor ? `${lang === "uz" ? "Qavat" : lang === "ru" ? "Этаж" : "Floor"}: ${floor}` : "",
        apartment ? `${lang === "uz" ? "Xonadon" : lang === "ru" ? "Кв" : "Apt"}: ${apartment}` : ""
      ].filter(Boolean).join(", ");

      const paymentLabel = paymentMethod === "cash" 
        ? (lang === "uz" ? "Naqd pul" : "Наличные") 
        : paymentMethod === "card" 
        ? (lang === "uz" ? "Karta (Terminal)" : "Карта (Терминал)") 
        : "Click / Payme (Online)";

      const res = await placeOrder({
        data: { 
          customer_name: name, 
          phone, 
          address: fullAddress, 
          note: note ? `${note} | [To'lov: ${paymentLabel}]` : `[To'lov: ${paymentLabel}]`, 
          items: orderItems 
        },
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

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white/50 px-1 mb-2">
              {lang === "uz" ? "Savatdagi taomlar" : lang === "ru" ? "Блюда в корзине" : "Items in Cart"} ({items.length})
            </h2>
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
                    <img src={f.image} alt={f.name[lang]} className="h-20 w-20 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate text-white">{f.name[lang]}</h3>
                      <p className="text-sm text-primary font-bold">{formatPrice(getPrice(i.id))}</p>
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
                    <button onClick={() => remove(i.id)} className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-destructive shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <Reveal className="h-fit">
            <div className="glass card-glow rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-chart-3" />
              
              <h2 className="text-xl font-bold text-white mb-4">
                {lang === "uz" ? "Buyurtma hisobi" : lang === "ru" ? "Детали заказа" : "Order Summary"}
              </h2>

              <div className="space-y-2 text-sm text-white/70 pb-4 border-b border-white/5">
                <div className="flex justify-between">
                  <span>{lang === "uz" ? "Taomlar summasi" : lang === "ru" ? "Сумма блюд" : "Items Total"}</span>
                  <span className="text-white font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === "uz" ? "Yetkazib berish" : lang === "ru" ? "Доставка" : "Delivery"}</span>
                  <span className="text-white font-semibold">
                    {deliveryFee === 0 
                      ? (lang === "uz" ? "Bepul" : "Бесплатно") 
                      : formatPrice(deliveryFee)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-lg font-bold py-4">
                <span>{t("cart.total")}</span>
                <span className="text-gradient text-xl">{formatPrice(orderTotal)}</span>
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
                  className="mt-2 w-full rounded-xl px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {t("cart.checkout")}
                </button>
              ) : (
                <form onSubmit={submit} className="mt-4 space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <span className="text-xs text-white/40 font-bold uppercase tracking-wider block">
                      {lang === "uz" ? "Mijoz ma'lumotlari" : lang === "ru" ? "Данные клиента" : "Customer Details"}
                    </span>
                    <input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder={t("checkout.name")} 
                      required 
                      className="w-full rounded-xl border border-input bg-black/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary text-white" 
                    />
                    <input 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder={t("checkout.phone") + " (Masalan: +998901234567)"} 
                      required 
                      className="w-full rounded-xl border border-input bg-black/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary text-white" 
                    />
                  </div>

                  {/* Address Grid */}
                  <div className="space-y-2">
                    <span className="text-xs text-white/40 font-bold uppercase tracking-wider block">
                      {lang === "uz" ? "Yetkazish manzili" : lang === "ru" ? "Адрес доставки" : "Delivery Address"}
                    </span>
                    <input 
                      value={street} 
                      onChange={(e) => setStreet(e.target.value)} 
                      placeholder={lang === "uz" ? "Ko'cha / Mahalla va uy raqami *" : "Улица / Махалля, номер дома *"} 
                      required 
                      className="w-full rounded-xl border border-input bg-black/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary text-white" 
                    />
                    <div className="grid grid-cols-4 gap-2">
                      <input 
                        value={building} 
                        onChange={(e) => setBuilding(e.target.value)} 
                        placeholder={lang === "uz" ? "Blok" : "Блок"} 
                        className="col-span-1 text-center rounded-xl border border-input bg-black/20 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary text-white" 
                      />
                      <input 
                        value={entrance} 
                        onChange={(e) => setEntrance(e.target.value)} 
                        placeholder={lang === "uz" ? "Podezd" : "Подъезд"} 
                        className="col-span-1 text-center rounded-xl border border-input bg-black/20 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary text-white" 
                      />
                      <input 
                        value={floor} 
                        onChange={(e) => setFloor(e.target.value)} 
                        placeholder={lang === "uz" ? "Qavat" : "Этаж"} 
                        className="col-span-1 text-center rounded-xl border border-input bg-black/20 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary text-white" 
                      />
                      <input 
                        value={apartment} 
                        onChange={(e) => setApartment(e.target.value)} 
                        placeholder={lang === "uz" ? "Xonadon" : "Кв."} 
                        className="col-span-1 text-center rounded-xl border border-input bg-black/20 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary text-white" 
                      />
                    </div>
                  </div>

                  {/* Delivery Method Selection */}
                  <div className="space-y-2">
                    <span className="text-xs text-white/40 font-bold uppercase tracking-wider block">
                      {lang === "uz" ? "Yetkazish usuli" : lang === "ru" ? "Способ доставки" : "Delivery Method"}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliverySpeed("standard")}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                          deliverySpeed === "standard" 
                            ? "border-primary bg-primary/10 text-white" 
                            : "border-white/5 bg-black/10 text-white/60 hover:bg-white/[0.02]"
                        }`}
                      >
                        <Truck className="h-4 w-4 mb-1 text-primary" />
                        <span className="text-xs font-bold">{lang === "uz" ? "Oddiy" : "Стандарт"}</span>
                        <span className="text-[9px] opacity-75">{lang === "uz" ? "Bepul" : "Бесплатно"}</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setDeliverySpeed("express")}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                          deliverySpeed === "express" 
                            ? "border-gold bg-gold/10 text-white" 
                            : "border-white/5 bg-black/10 text-white/60 hover:bg-white/[0.02]"
                        }`}
                      >
                        <Clock className="h-4 w-4 mb-1 text-gold" />
                        <span className="text-xs font-bold">{lang === "uz" ? "Tezkor" : "Экспресс"}</span>
                        <span className="text-[9px] opacity-75">+10,000 so'm</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-2">
                    <span className="text-xs text-white/40 font-bold uppercase tracking-wider block">
                      {lang === "uz" ? "To'lov turi" : lang === "ru" ? "Способ оплаты" : "Payment Method"}
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cash")}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                          paymentMethod === "cash" 
                            ? "border-primary bg-primary/10 text-white" 
                            : "border-white/5 bg-black/10 text-white/60"
                        }`}
                      >
                        <Coins className="h-4 w-4 mb-1 text-primary" />
                        <span className="text-[10px] font-bold">{lang === "uz" ? "Naqd" : "Наличные"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                          paymentMethod === "card" 
                            ? "border-primary bg-primary/10 text-white" 
                            : "border-white/5 bg-black/10 text-white/60"
                        }`}
                      >
                        <CreditCard className="h-4 w-4 mb-1 text-primary" />
                        <span className="text-[10px] font-bold">{lang === "uz" ? "Terminal" : "Картой"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("online")}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                          paymentMethod === "online" 
                            ? "border-primary bg-primary/10 text-white" 
                            : "border-white/5 bg-black/10 text-white/60"
                        }`}
                      >
                        <CheckCircle className="h-4 w-4 mb-1 text-primary" />
                        <span className="text-[10px] font-bold">Payme/Click</span>
                      </button>
                    </div>
                  </div>

                  <textarea 
                    value={note} 
                    onChange={(e) => setNote(e.target.value)} 
                    placeholder={t("checkout.note")} 
                    rows={2} 
                    className="w-full rounded-xl border border-input bg-black/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary text-white" 
                  />

                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full rounded-xl px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-lg disabled:opacity-60 cursor-pointer" 
                    style={{ background: "var(--gradient-primary)" }}
                  >
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


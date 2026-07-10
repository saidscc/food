/**
 * Standalone Telegram ordering bot — long polling, no webhook/server needed.
 *
 * Run:  npm run bot   (requires TELEGRAM_API_KEY in .env)
 *
 * Flow: /start → language → phone registration (contact share) → main menu
 *       Menu → categories → dish card with photo → cart → checkout → order
 * Orders are saved to bot/orders.json and the admin chat is notified.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { categories, foods, getPrice, formatPrice, type Food } from "../src/lib/foods";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// ── env ──────────────────────────────────────────────────────────────────────
function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    for (const line of readFileSync(join(ROOT, ".env"), "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m) out[m[1]] = m[2];
    }
  } catch { /* no .env */ }
  return { ...out, ...process.env as Record<string, string> };
}
const env = loadEnv();
const TOKEN = env.TELEGRAM_API_KEY;
const ADMIN_CHAT = Number(env.ADMIN_TELEGRAM_CHAT_ID || "6409095342");
if (!TOKEN) {
  console.error("❌ TELEGRAM_API_KEY yo'q. .env fayliga qo'shing:\nTELEGRAM_API_KEY=\"123456:ABC-...\"  (@BotFather → /mybots → API Token)");
  process.exit(1);
}
const API = `https://api.telegram.org/bot${TOKEN}`;

// ── persistent state ─────────────────────────────────────────────────────────
type CartItem = { id: string; qty: number };
type User = {
  lang: "uz" | "ru";
  state: string;
  name?: string;
  phone?: string;
  address?: string;
  cart: CartItem[];
};
type Order = {
  number: number; chatId: number; name: string; phone: string; address: string;
  items: { id: string; name: string; qty: number; price: number }[];
  total: number; status: string; createdAt: string;
};
type DB = { users: Record<string, User>; orders: Order[]; nextOrder: number };

const DB_PATH = join(ROOT, "bot", "bot-data.json");
const db: DB = existsSync(DB_PATH)
  ? JSON.parse(readFileSync(DB_PATH, "utf8"))
  : { users: {}, orders: [], nextOrder: 1001 };
const save = () => writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
const user = (chatId: number): User =>
  (db.users[chatId] ??= { lang: "uz", state: "lang", cart: [] });

// ── i18n ─────────────────────────────────────────────────────────────────────
const D = {
  uz: {
    choose_lang: "🌍 <b>Tilni tanlang / Выберите язык</b>",
    ask_phone: "📱 <b>Ro'yxatdan o'tish</b>\n\nBuyurtma berish uchun telefon raqamingizni yuboring — pastdagi tugmani bosing 👇",
    share_contact: "📱 Raqamni ulashish",
    registered: "✅ <b>Ro'yxatdan o'tdingiz!</b>\n📞 {phone}\n\nEndi buyurtma berishingiz mumkin 🎉",
    main: "🏠 <b>Bosh menyu</b>\n\nKerakli bo'limni tanlang:",
    btn_menu: "🥗 Menyu", btn_cart: "🛒 Savatcha", btn_orders: "📦 Buyurtmalarim",
    btn_about: "ℹ️ Biz haqimizda", btn_lang: "🌍 Til / Язык",
    categories: "📂 <b>Kategoriyalar</b>\n\nQaysi turdagi taom istaysiz?",
    empty_cat: "😕 Bu kategoriyada hozircha taom yo'q.",
    add_cart: "🛒 Savatga qo'shish", back: "⬅️ Orqaga", added: "✅ Savatga qo'shildi!",
    cart_empty: "🛒 Savatchangiz bo'sh.\n\n🥗 Menyu orqali taom tanlang!",
    cart: "🛒 <b>Savatchangiz:</b>\n\n", total: "💰 <b>Jami: {total}</b>",
    checkout: "✅ Buyurtma berish", clear: "🗑️ Tozalash", cleared: "🗑️ Savatcha tozalandi.",
    ask_name: "👤 <b>Ismingizni kiriting:</b>", ask_address: "📍 <b>Yetkazib berish manzilini kiriting:</b>",
    confirm: "📝 <b>Buyurtmani tasdiqlang:</b>\n\n", btn_confirm: "✅ Tasdiqlash", btn_cancel: "❌ Bekor qilish",
    order_ok: "🎉 <b>Buyurtma #{n} qabul qilindi!</b>\n\nOperatorimiz tez orada siz bilan bog'lanadi. 🚀",
    cancelled: "❌ Bekor qilindi.", no_orders: "📦 Sizda hali buyurtmalar yo'q.",
    orders: "📦 <b>Buyurtmalaringiz:</b>\n\n",
    about: "🍏 <b>To'g'ri Ovqatlanish Siri</b>\n\nSog'lom hayot uchun premium taomlar:\n\n✅ 55+ sog'lom taom\n✅ Kaloriya va nutrient ma'lumotlari\n✅ Tez yetkazib berish\n✅ Professional sifat",
    kcal: "Kaloriya", prot: "Protein", price: "Narxi",
    status: { new: "🆕 Yangi", confirmed: "✅ Tasdiqlandi", preparing: "👨‍🍳 Tayyorlanmoqda", delivering: "🚚 Yetkazilmoqda", delivered: "📦 Yetkazildi", cancelled: "❌ Bekor" } as Record<string, string>,
  },
  ru: {
    choose_lang: "🌍 <b>Tilni tanlang / Выберите язык</b>",
    ask_phone: "📱 <b>Регистрация</b>\n\nЧтобы оформлять заказы, отправьте ваш номер телефона — нажмите кнопку ниже 👇",
    share_contact: "📱 Поделиться номером",
    registered: "✅ <b>Вы зарегистрированы!</b>\n📞 {phone}\n\nТеперь можно делать заказы 🎉",
    main: "🏠 <b>Главное меню</b>\n\nВыберите раздел:",
    btn_menu: "🥗 Меню", btn_cart: "🛒 Корзина", btn_orders: "📦 Мои заказы",
    btn_about: "ℹ️ О нас", btn_lang: "🌍 Til / Язык",
    categories: "📂 <b>Категории</b>\n\nКакую еду хотите?",
    empty_cat: "😕 В этой категории пока нет блюд.",
    add_cart: "🛒 В корзину", back: "⬅️ Назад", added: "✅ Добавлено в корзину!",
    cart_empty: "🛒 Ваша корзина пуста.\n\n🥗 Выберите блюда через Меню!",
    cart: "🛒 <b>Ваша корзина:</b>\n\n", total: "💰 <b>Итого: {total}</b>",
    checkout: "✅ Оформить заказ", clear: "🗑️ Очистить", cleared: "🗑️ Корзина очищена.",
    ask_name: "👤 <b>Введите ваше имя:</b>", ask_address: "📍 <b>Введите адрес доставки:</b>",
    confirm: "📝 <b>Подтвердите заказ:</b>\n\n", btn_confirm: "✅ Подтвердить", btn_cancel: "❌ Отмена",
    order_ok: "🎉 <b>Заказ #{n} принят!</b>\n\nОператор свяжется с вами в ближайшее время. 🚀",
    cancelled: "❌ Отменено.", no_orders: "📦 У вас ещё нет заказов.",
    orders: "📦 <b>Ваши заказы:</b>\n\n",
    about: "🍏 <b>Секрет Правильного Питания</b>\n\nПремиум блюда для здоровой жизни:\n\n✅ 55+ полезных блюд\n✅ Данные о калориях и нутриентах\n✅ Быстрая доставка\n✅ Профессиональное качество",
    kcal: "Калории", prot: "Белки", price: "Цена",
    status: { new: "🆕 Новый", confirmed: "✅ Подтверждён", preparing: "👨‍🍳 Готовится", delivering: "🚚 Доставляется", delivered: "📦 Доставлен", cancelled: "❌ Отменён" } as Record<string, string>,
  },
};

// ── telegram api ─────────────────────────────────────────────────────────────
async function tg(method: string, body: Record<string, unknown>) {
  try {
    const r = await fetch(`${API}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const j: any = await r.json();
    if (!j.ok) console.error(`[tg] ${method}:`, j.description);
    return j;
  } catch (e) {
    console.error(`[tg] ${method} failed:`, e);
    return null;
  }
}
const send = (chatId: number, text: string, extra: Record<string, unknown> = {}) =>
  tg("sendMessage", { chat_id: chatId, text, parse_mode: "HTML", ...extra });

// ── keyboards ────────────────────────────────────────────────────────────────
const mainKb = (t: (typeof D)["uz"]) => ({
  keyboard: [
    [{ text: t.btn_menu }, { text: t.btn_cart }],
    [{ text: t.btn_orders }, { text: t.btn_about }],
    [{ text: t.btn_lang }],
  ],
  resize_keyboard: true,
});

const langKb = {
  inline_keyboard: [[
    { text: "🇺🇿 O'zbekcha", callback_data: "lang_uz" },
    { text: "🇷🇺 Русский", callback_data: "lang_ru" },
  ]],
};

// Categories that actually contain foods
const usableCats = () => categories.filter((c) => foods.some((f) => f.categories.includes(c.id)));

function categoriesKb(lang: "uz" | "ru") {
  const cats = usableCats();
  const rows: { text: string; callback_data: string }[][] = [];
  for (let i = 0; i < cats.length; i += 2) {
    const row = [{ text: `${cats[i].icon} ${cats[i].name[lang]}`, callback_data: `cat_${cats[i].id}` }];
    if (cats[i + 1]) row.push({ text: `${cats[i + 1].icon} ${cats[i + 1].name[lang]}`, callback_data: `cat_${cats[i + 1].id}` });
    rows.push(row);
  }
  return { inline_keyboard: rows };
}

// ── views ────────────────────────────────────────────────────────────────────
async function showFood(chatId: number, f: Food, lang: "uz" | "ru", backTo: string) {
  const t = D[lang];
  const caption =
    `<b>${f.name[lang]}</b>\n<i>${f.short[lang]}</i>\n\n` +
    `🔥 ${t.kcal}: <b>${f.calories} kcal</b>\n💪 ${t.prot}: <b>${f.protein}g</b>\n` +
    `⏱ ${f.prepTime} min   ⭐ ${f.rating}\n\n💰 ${t.price}: <b>${formatPrice(getPrice(f.id))}</b>`;
  const reply_markup = {
    inline_keyboard: [
      [{ text: t.add_cart, callback_data: `add_${f.id}` }],
      [{ text: t.back, callback_data: backTo }],
    ],
  };
  const res = await tg("sendPhoto", { chat_id: chatId, photo: f.image, caption, parse_mode: "HTML", reply_markup });
  if (!res?.ok) await send(chatId, caption, { reply_markup }); // photo failed → text fallback
}

async function showCart(chatId: number) {
  const u = user(chatId);
  const t = D[u.lang];
  if (!u.cart.length) return send(chatId, t.cart_empty);
  let text = t.cart;
  let grand = 0;
  const kb: { text: string; callback_data: string }[][] = [];
  for (const item of u.cart) {
    const f = foods.find((x) => x.id === item.id);
    if (!f) continue;
    const line = getPrice(f.id) * item.qty;
    grand += line;
    text += `• <b>${f.name[u.lang]}</b>\n   ${item.qty} × ${formatPrice(getPrice(f.id))} = <b>${formatPrice(line)}</b>\n`;
    kb.push([
      { text: "➖", callback_data: `sub_${f.id}` },
      { text: `${f.name[u.lang].slice(0, 22)} (${item.qty})`, callback_data: `food_${f.id}` },
      { text: "➕", callback_data: `plus_${f.id}` },
    ]);
  }
  text += "\n" + t.total.replace("{total}", formatPrice(grand));
  kb.push([
    { text: t.clear, callback_data: "cart_clear" },
    { text: t.checkout, callback_data: "cart_checkout" },
  ]);
  return send(chatId, text, { reply_markup: { inline_keyboard: kb } });
}

function cartTotal(u: User) {
  return u.cart.reduce((s, i) => s + getPrice(i.id) * i.qty, 0);
}

async function confirmView(chatId: number) {
  const u = user(chatId);
  const t = D[u.lang];
  let lines = "";
  for (const item of u.cart) {
    const f = foods.find((x) => x.id === item.id);
    if (f) lines += `• ${f.name[u.lang]} × ${item.qty} = <b>${formatPrice(getPrice(f.id) * item.qty)}</b>\n`;
  }
  const text = t.confirm + lines +
    `\n👤 ${u.name}\n📞 ${u.phone}\n📍 ${u.address}\n\n` +
    t.total.replace("{total}", formatPrice(cartTotal(u)));
  u.state = "confirm"; save();
  return send(chatId, text, {
    reply_markup: { inline_keyboard: [[
      { text: t.btn_confirm, callback_data: "order_confirm" },
      { text: t.btn_cancel, callback_data: "order_cancel" },
    ]] },
  });
}

async function placeOrder(chatId: number) {
  const u = user(chatId);
  const t = D[u.lang];
  const items = u.cart.map((i) => {
    const f = foods.find((x) => x.id === i.id)!;
    return { id: i.id, name: f.name[u.lang], qty: i.qty, price: getPrice(i.id) };
  });
  const order: Order = {
    number: db.nextOrder++, chatId, name: u.name || "—", phone: u.phone || "—",
    address: u.address || "—", items, total: cartTotal(u), status: "new",
    createdAt: new Date().toISOString(),
  };
  db.orders.push(order);
  u.cart = []; u.state = "main"; save();

  await send(chatId, t.order_ok.replace("{n}", String(order.number)), { reply_markup: mainKb(t) });

  const lines = items.map((i) => `• ${i.name} × ${i.qty}`).join("\n");
  await send(ADMIN_CHAT,
    `🆕 <b>Yangi buyurtma #${order.number} (Telegram)</b>\n👤 ${order.name}\n📞 ${order.phone}\n📍 ${order.address}\n\n${lines}\n\n💰 <b>${formatPrice(order.total)}</b>`);
}

// ── update handler ───────────────────────────────────────────────────────────
async function onUpdate(update: any) {
  // callbacks
  if (update.callback_query) {
    const cb = update.callback_query;
    const chatId: number = cb.message.chat.id;
    const data: string = cb.data || "";
    const u = user(chatId);
    const t = D[u.lang];
    await tg("answerCallbackQuery", { callback_query_id: cb.id, text: data.startsWith("add_") ? t.added : "" });

    if (data.startsWith("lang_")) {
      u.lang = data === "lang_ru" ? "ru" : "uz";
      const nt = D[u.lang];
      if (!u.phone) {
        u.state = "phone"; save();
        return send(chatId, nt.ask_phone, {
          reply_markup: { keyboard: [[{ text: nt.share_contact, request_contact: true }]], resize_keyboard: true, one_time_keyboard: true },
        });
      }
      u.state = "main"; save();
      return send(chatId, nt.main, { reply_markup: mainKb(nt) });
    }
    if (data === "cats") return send(chatId, t.categories, { reply_markup: categoriesKb(u.lang) });
    if (data.startsWith("cat_")) {
      const catId = data.slice(4);
      const cat = categories.find((c) => c.id === catId);
      const list = foods.filter((f) => f.categories.includes(catId));
      if (!list.length) return send(chatId, t.empty_cat);
      const kb = list.map((f) => [{ text: `${f.name[u.lang]} — ${formatPrice(getPrice(f.id))}`, callback_data: `food_${f.id}` }]);
      kb.push([{ text: t.back, callback_data: "cats" }]);
      return send(chatId, `${cat?.icon || "📂"} <b>${cat?.name[u.lang] || ""}</b>`, { reply_markup: { inline_keyboard: kb } });
    }
    if (data.startsWith("food_")) {
      const f = foods.find((x) => x.id === data.slice(5));
      if (f) await showFood(chatId, f, u.lang, `cat_${f.categories[0]}`);
      return;
    }
    if (data.startsWith("add_")) {
      const id = data.slice(4);
      const ex = u.cart.find((i) => i.id === id);
      if (ex) ex.qty += 1; else u.cart.push({ id, qty: 1 });
      save();
      return;
    }
    if (data.startsWith("plus_") || data.startsWith("sub_")) {
      const plus = data.startsWith("plus_");
      const id = data.slice(plus ? 5 : 4);
      const ex = u.cart.find((i) => i.id === id);
      if (ex) {
        ex.qty += plus ? 1 : -1;
        if (ex.qty <= 0) u.cart = u.cart.filter((i) => i.id !== id);
        save();
      }
      return showCart(chatId);
    }
    if (data === "cart_clear") { u.cart = []; save(); return send(chatId, t.cleared, { reply_markup: mainKb(t) }); }
    if (data === "cart_checkout") {
      if (!u.cart.length) return send(chatId, t.cart_empty);
      if (!u.phone) {
        u.state = "phone"; save();
        return send(chatId, t.ask_phone, {
          reply_markup: { keyboard: [[{ text: t.share_contact, request_contact: true }]], resize_keyboard: true, one_time_keyboard: true },
        });
      }
      if (!u.name) { u.state = "ck_name"; save(); return send(chatId, t.ask_name); }
      u.state = "ck_address"; save();
      return send(chatId, t.ask_address);
    }
    if (data === "order_confirm") {
      if (!u.cart.length) return send(chatId, t.cart_empty);
      return placeOrder(chatId);
    }
    if (data === "order_cancel") { u.state = "main"; save(); return send(chatId, t.cancelled, { reply_markup: mainKb(t) }); }
    return;
  }

  // messages
  const msg = update.message;
  if (!msg?.chat) return;
  const chatId: number = msg.chat.id;
  const text: string = msg.text || "";
  const u = user(chatId);
  const t = D[u.lang];

  if (text === "/start") {
    u.state = "lang"; save();
    return send(chatId, D.uz.choose_lang, { reply_markup: langKb });
  }

  // phone registration (contact share or typed number)
  if (u.state === "phone") {
    const phone = msg.contact?.phone_number || (text.match(/^\+?[\d\s-]{7,15}$/) ? text : null);
    if (!phone) return send(chatId, t.ask_phone, {
      reply_markup: { keyboard: [[{ text: t.share_contact, request_contact: true }]], resize_keyboard: true, one_time_keyboard: true },
    });
    u.phone = phone.startsWith("+") ? phone : `+${phone}`;
    if (!u.name && msg.contact?.first_name) u.name = msg.contact.first_name;
    if (!u.name && msg.from?.first_name) u.name = msg.from.first_name;
    u.state = "main"; save();
    return send(chatId, t.registered.replace("{phone}", u.phone), { reply_markup: mainKb(t) });
  }

  if (u.state === "ck_name") {
    u.name = text.trim() || u.name || "—";
    u.state = "ck_address"; save();
    return send(chatId, t.ask_address);
  }
  if (u.state === "ck_address") {
    u.address = text.trim() || "—"; save();
    return confirmView(chatId);
  }

  // main menu buttons (accept either language)
  const anyT = [D.uz, D.ru];
  if (anyT.some((d) => text === d.btn_menu) || text === "/menu")
    return send(chatId, t.categories, { reply_markup: categoriesKb(u.lang) });
  if (anyT.some((d) => text === d.btn_cart) || text === "/cart") return showCart(chatId);
  if (anyT.some((d) => text === d.btn_orders) || text === "/orders") {
    const mine = db.orders.filter((o) => o.chatId === chatId).slice(-5).reverse();
    if (!mine.length) return send(chatId, t.no_orders);
    let out = t.orders;
    for (const o of mine) {
      out += `📦 <b>#${o.number}</b> (${new Date(o.createdAt).toLocaleDateString("ru-RU")})\n   ${t.status[o.status] || o.status} — <b>${formatPrice(o.total)}</b>\n\n`;
    }
    return send(chatId, out);
  }
  if (anyT.some((d) => text === d.btn_about) || text === "/about") return send(chatId, t.about);
  if (anyT.some((d) => text === d.btn_lang) || text === "/lang")
    return send(chatId, D.uz.choose_lang, { reply_markup: langKb });

  // default
  if (!u.phone) {
    u.state = "phone"; save();
    return send(chatId, t.ask_phone, {
      reply_markup: { keyboard: [[{ text: t.share_contact, request_contact: true }]], resize_keyboard: true, one_time_keyboard: true },
    });
  }
  return send(chatId, t.main, { reply_markup: mainKb(t) });
}

// ── polling loop ─────────────────────────────────────────────────────────────
async function main() {
  const me = await tg("getMe", {});
  if (!me?.ok) {
    console.error("❌ Token noto'g'ri yoki internet yo'q. TELEGRAM_API_KEY ni tekshiring.");
    process.exit(1);
  }
  // long polling requires webhook to be off
  await tg("deleteWebhook", { drop_pending_updates: false });
  await tg("setMyCommands", { commands: [
    { command: "start", description: "Boshlash / Начать" },
    { command: "menu", description: "Menyu / Меню" },
    { command: "cart", description: "Savatcha / Корзина" },
    { command: "orders", description: "Buyurtmalarim / Мои заказы" },
  ]});
  console.log(`🤖 @${me.result.username} ishga tushdi (long polling). Ctrl+C — to'xtatish.`);

  let offset = 0;
  while (true) {
    try {
      const r = await fetch(`${API}/getUpdates?timeout=50&offset=${offset}`, { signal: AbortSignal.timeout(60_000) });
      const j: any = await r.json();
      if (j.ok) {
        for (const upd of j.result) {
          offset = upd.update_id + 1;
          onUpdate(upd).catch((e) => console.error("[update]", e));
        }
      }
    } catch {
      await new Promise((res) => setTimeout(res, 3000)); // network hiccup — retry
    }
  }
}

main();

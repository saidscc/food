import { createFileRoute } from "@tanstack/react-router";

// ── helpers ──────────────────────────────────────────────────────────────────
const FOODS_STATIC = [
  { id: "grilled-salmon", name: { uz: "Grildagi losos", ru: "Лосось на гриле" }, cats: ["healthy","protein","dinner"], cal: 250, protein: 28, fat: 14, carbs: 0, price: 95000, taste: ["healthy","sweet"], emoji: "🐟" },
  { id: "quinoa-bowl", name: { uz: "Kinoa bowl", ru: "Киноа боул" }, cats: ["healthy","vegetarian","breakfast"], cal: 320, protein: 12, fat: 8, carbs: 50, price: 55000, taste: ["healthy","sweet"], emoji: "🥗" },
  { id: "grilled-chicken", name: { uz: "Grildagi tovuq", ru: "Курица на гриле" }, cats: ["protein","sport","lunch"], cal: 285, protein: 35, fat: 12, carbs: 5, price: 48000, taste: ["salty","savory"], emoji: "🍗" },
  { id: "berry-oatmeal", name: { uz: "Rezavorli jo'xori", ru: "Овсянка с ягодами" }, cats: ["breakfast","healthy","kids"], cal: 290, protein: 10, fat: 5, carbs: 52, price: 28000, taste: ["sweet"], emoji: "🫐" },
  { id: "green-salad", name: { uz: "Yashil salat", ru: "Зелёный салат" }, cats: ["weightloss","vegetarian","healthy"], cal: 120, protein: 5, fat: 6, carbs: 12, price: 32000, taste: ["healthy","bitter"], emoji: "🥬" },
  { id: "berry-smoothie", name: { uz: "Rezavor smoothie", ru: "Ягодный смузи" }, cats: ["breakfast","sport","protein"], cal: 280, protein: 15, fat: 6, carbs: 42, price: 30000, taste: ["sweet"], emoji: "🍓" },
  { id: "grilled-steak", name: { uz: "Grildagi bifshteks", ru: "Стейк на гриле" }, cats: ["protein","sport","dinner"], cal: 271, protein: 25, fat: 19, carbs: 2, price: 89000, taste: ["salty","savory"], emoji: "🥩" },
  { id: "sushi-platter", name: { uz: "Sushi to'plami", ru: "Сет суши" }, cats: ["healthy","protein","lunch","dinner"], cal: 190, protein: 9, fat: 5, carbs: 28, price: 78000, taste: ["salty","umami"], emoji: "🍣" },
  { id: "avocado-toast", name: { uz: "Avokadoli tost", ru: "Тост с авокадо" }, cats: ["breakfast","vegetarian","healthy"], cal: 250, protein: 10, fat: 15, carbs: 22, price: 42000, taste: ["healthy","savory"], emoji: "🥑" },
  { id: "lentil-soup", name: { uz: "Yasmiq sho'rvasi", ru: "Чечевичный суп" }, cats: ["healthy","vegetarian","weightloss"], cal: 180, protein: 12, fat: 4, carbs: 28, price: 35000, taste: ["savory","salty"], emoji: "🍲" },
  { id: "chicken-wrap", name: { uz: "Tovuqli wrap", ru: "Ролл с курицей" }, cats: ["fast","protein","lunch"], cal: 320, protein: 24, fat: 11, carbs: 32, price: 39000, taste: ["salty","savory"], emoji: "🌯" },
  { id: "berry-parfait", name: { uz: "Rezavor parfe", ru: "Ягодный парфе" }, cats: ["breakfast","healthy","kids"], cal: 210, protein: 11, fat: 6, carbs: 30, price: 32000, taste: ["sweet"], emoji: "🍨" },
];

const CATEGORIES = [
  { id: "healthy", uz: "Sog'lom ovqatlar", ru: "Здоровые блюда", emoji: "🌿" },
  { id: "breakfast", uz: "Nonushta", ru: "Завтрак", emoji: "🌅" },
  { id: "protein", uz: "Protein taomlar", ru: "Белковые блюда", emoji: "💪" },
  { id: "vegetarian", uz: "Vegetarian", ru: "Вегетарианские", emoji: "🥦" },
  { id: "weightloss", uz: "Vazn yo'qotish", ru: "Для похудения", emoji: "⚖️" },
  { id: "sport", uz: "Sportchilar uchun", ru: "Для спортсменов", emoji: "🏋️" },
  { id: "fast", uz: "Tez taomlar", ru: "Быстрые блюда", emoji: "⚡" },
  { id: "lunch", uz: "Tushlik", ru: "Обед", emoji: "🍽️" },
  { id: "dinner", uz: "Kechki ovqat", ru: "Ужин", emoji: "🌙" },
  { id: "kids", uz: "Bolalar uchun", ru: "Для детей", emoji: "👶" },
];


const STORES = [
  { name: "Korzinka supermarket", address: { uz: "Ko'p filiallari, Toshkent", ru: "Многочисленные филиалы, Ташкент" }, products: { uz: "Yangi mevalar, sabzavotlar, sut mahsulotlari", ru: "Свежие фрукты, овощи, молочные продукты" }, phone: "+998712001001", hours: "08:00–23:00", emoji: "🏬" },
  { name: "Oloy bozori", address: { uz: "Yunusobod tumani", ru: "Юнусабадский район" }, products: { uz: "Yangi sabzavot, meva, baharat", ru: "Свежие овощи, фрукты, специи" }, phone: "+998712375464", hours: "06:00–19:00", emoji: "🛒" },
  { name: "Sport & Protein Shop", address: { uz: "Chilonzor tumani", ru: "Чиланзарский район" }, products: { uz: "Protein kukuni, BCAA, vitaminar", ru: "Протеин, BCAA, витамины" }, phone: "+998901234567", hours: "09:00–21:00", emoji: "💊" },
  { name: "Healthy Bakery", address: { uz: "Mirzo Ulug'bek tumani", ru: "Мирзо Улугбекский район" }, products: { uz: "Tam donli non, granola, smoothie", ru: "Цельнозерновой хлеб, гранола, смузи" }, phone: "+998912345678", hours: "07:30–22:00", emoji: "🥖" },
  { name: "Makro supermarketi", address: { uz: "Shayxontohur tumani", ru: "Шайхантахурский район" }, products: { uz: "Baliq, go'sht, import mahsulotlar", ru: "Рыба, мясо, импортные продукты" }, phone: "+998711502020", hours: "09:00–22:00", emoji: "🏪" },
];

const TIPS = [
  { uz: "💧 Kuniga 2 litr suv iching — metabolizmni tezlashtiradi", ru: "💧 Пейте 2 литра воды в день — ускоряет метаболизм" },
  { uz: "⏰ Ovqatni bir vaqtda yeng — oshqozon soatini sozlaydi", ru: "⏰ Ешьте в одно и то же время — настраивает желудочные часы" },
  { uz: "🥬 Har kuni yashil sabzavot isteʼmol qiling", ru: "🥬 Употребляйте зелёные овощи каждый день" },
  { uz: "🚫 Shakar va tuz miqdorini cheklang", ru: "🚫 Ограничьте потребление сахара и соли" },
  { uz: "🏃 Kuniga 30 daqiqa harakatlanish sog'liq kaliti", ru: "🏃 30 минут движения в день — ключ к здоровью" },
  { uz: "😴 7-8 soat uyqu — oziq-ovqat intilishini kamaytiradi", ru: "😴 7-8 часов сна — снижает тягу к еде" },
  { uz: "🥗 Ovqat yeyishdan oldin salat yeng — kaloriya kamayadi", ru: "🥗 Перед едой ешьте салат — снижает калорийность" },
  { uz: "🌰 Gazak uchun yong'oq eng yaxshi tanlov", ru: "🌰 Орехи — лучший перекус" },
];

const formatPrice = (v: number) => new Intl.NumberFormat("ru-RU").format(v) + " so'm";

function getTL(obj: any, lang: string) {
  return obj[lang] ?? obj["uz"] ?? "";
}

export const Route = createFileRoute("/api/telegram")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const update = await request.json();

          const tgKey = process.env.TELEGRAM_API_KEY;
          if (!tgKey) return new Response("No bot key", { status: 200 });

          // ── Extract update info ──
          let chatId: number | null = null;
          let messageText = "";
          let isCallback = false;
          let callbackId = "";
          let callbackData = "";
          let contact: any = null;

          if (update.message) {
            chatId = update.message.chat.id;
            messageText = update.message.text || "";
            contact = update.message.contact || null;
          } else if (update.callback_query) {
            chatId = update.callback_query.message.chat.id;
            isCallback = true;
            callbackId = update.callback_query.id;
            callbackData = update.callback_query.data || "";
          }

          if (!chatId) return new Response("OK", { status: 200 });

          // ── Telegram API helpers ──
          const tg = async (method: string, body: any) => {
            try {
              const r = await fetch(`https://api.telegram.org/bot${tgKey}/${method}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });
              return r.json();
            } catch { return null; }
          };

          const answerCB = async (text = "", alert = false) => {
            if (isCallback && callbackId)
              await tg("answerCallbackQuery", { callback_query_id: callbackId, text, show_alert: alert });
          };

          const sendMsg = (text: string, opts: any = {}) =>
            tg("sendMessage", { chat_id: chatId, text, parse_mode: "HTML", ...opts });

          // ── Get or create user ──
          let { data: usr } = await supabaseAdmin
            .from("telegram_users")
            .select("*")
            .eq("chat_id", chatId)
            .maybeSingle();

          if (!usr) {
            const { data: nu } = await supabaseAdmin
              .from("telegram_users")
              .insert({ chat_id: chatId, state: "select_language", lang: "uz" })
              .select("*")
              .single();
            usr = nu;
          }

          const lang: string = usr?.lang || "uz";
          const state: string = usr?.state || "select_language";

          // ── i18n dict ──
          const D: any = {
            uz: {
              welcome: "👋 <b>Xush kelibsiz!</b>\n\n🍏 <i>To'g'ri Ovqatlanish Siri</i> — sog'lom hayot uchun professional ovqat platformasi!\n\nMen sizga yordam beraman: menyu, buyurtma, maslahat va ko'proq!",
              select_lang: "🌍 Iltimos, <b>muloqot tilini</b> tanlang:",
              main_menu: "🏠 <b>Bosh menyu</b>\n\nNima qilmoqchisiz?",
              btn_menu: "🥗 Menyu",
              btn_cart: "🛒 Savatcha",
              btn_orders: "📦 Buyurtmalarim",
              btn_tips: "💡 Maslahatlar",
              btn_stores: "📍 Do'konlar",
              btn_recommend: "✨ Tavsiya",
              btn_search: "🔍 Qidirish",
              btn_about: "ℹ️ Biz haqimizda",
              btn_settings: "⚙️ Sozlamalar",
              btn_back: "⬅️ Orqaga",
              categories: "📂 <b>Kategoriyalar</b>\n\nQaysi toifadagi ovqat istaysiz?",
              cart_empty: "🛒 Savatchangiz bo'sh.\n\n/menu buyrug'i orqali taomlar tanlang!",
              cart_title: "🛒 <b>Savatchangiz:</b>\n\n",
              cart_total: "\n💰 <b>Jami: {total}</b>",
              btn_checkout: "✅ Buyurtma berish",
              btn_clear: "🗑️ Tozalash",
              enter_name: "👤 <b>Ismingizni kiriting:</b>",
              enter_phone: "📞 <b>Telefon raqamingizni yuboring:</b>",
              send_contact: "📱 Kontaktni ulashish",
              enter_address: "📍 <b>Yetkazib berish manzilini kiriting:</b>",
              confirm_title: "📝 <b>Buyurtmani tasdiqlang:</b>\n\n",
              btn_confirm: "✅ Tasdiqlash",
              btn_cancel: "❌ Bekor qilish",
              order_ok: "🎉 <b>Buyurtma #%N qabul qilindi!</b>\n\nOperatorimiz tez orada siz bilan bog'lanadi. 🚀",
              order_cancelled: "❌ Buyurtma bekor qilindi.",
              no_orders: "📦 Sizda hali buyurtmalar yo'q.",
              orders_title: "📦 <b>So'nggi buyurtmalaringiz:</b>\n\n",
              recommend_q: "✨ <b>Nima istaysiz?</b>\n\nQaysi tur ovqat ichingizga maroq?",
              sweet: "🍬 Shirin",
              salty: "🧂 Sho'r",
              healthy: "🌿 Sog'lom",
              savory: "🍖 Qovurilgan/Go'shtli",
              recommend_result: "✨ <b>Siz uchun tavsiyalar:</b>\n\n",
              no_result: "😕 Hech narsa topilmadi. Boshqa kalit so'z sinab ko'ring.",
              search_prompt: "🔍 <b>Qidirish</b>\n\nOverqat nomini yozing:",
              tips_title: "💡 <b>Sog'lom ovqatlanish maslahatlari:</b>\n\n",
              stores_title: "📍 <b>Do'konlar va bozorlar</b>\n\nMahsulotlarni qayerdan topish mumkin:",
              about: "🍏 <b>To'g'ri Ovqatlanish Siri</b>\n\nSog'lom hayot uchun premium ovqat platformasi.\n\n🌐 Web sayt: @ovqatlanish_bot\n📲 Bizga ulaning!\n\n✅ 150+ sog'lom retsept\n✅ Kaloriya va nutrient ma'lumotlari\n✅ Tez buyurtma va yetkazib berish",
              change_lang: "🌍 Tilni o'zgartirish",
              settings: "⚙️ <b>Sozlamalar</b>",
              added: "✅ Savatga qo'shildi!",
              conv_ask: "💬 <b>Nima iste'mol qilmoqchisiz?</b>\n\nMenga ayting — achchiqmi, shirinmi, yoki boshqa bir narsa istaysizmi?",
            },
            ru: {
              welcome: "👋 <b>Добро пожаловать!</b>\n\n🍏 <i>Секрет Правильного Питания</i> — профессиональная платформа здорового питания!\n\nЯ помогу вам с меню, заказами и советами!",
              select_lang: "🌍 Пожалуйста, выберите <b>язык общения</b>:",
              main_menu: "🏠 <b>Главное меню</b>\n\nЧто хотите сделать?",
              btn_menu: "🥗 Меню",
              btn_cart: "🛒 Корзина",
              btn_orders: "📦 Мои заказы",
              btn_tips: "💡 Советы",
              btn_stores: "📍 Магазины",
              btn_recommend: "✨ Рекомендации",
              btn_search: "🔍 Поиск",
              btn_about: "ℹ️ О нас",
              btn_settings: "⚙️ Настройки",
              btn_back: "⬅️ Назад",
              categories: "📂 <b>Категории</b>\n\nКакую еду хотите?",
              cart_empty: "🛒 Ваша корзина пуста.\n\nИспользуйте /menu для выбора блюд!",
              cart_title: "🛒 <b>Ваша корзина:</b>\n\n",
              cart_total: "\n💰 <b>Итого: {total}</b>",
              btn_checkout: "✅ Оформить заказ",
              btn_clear: "🗑️ Очистить",
              enter_name: "👤 <b>Введите ваше имя:</b>",
              enter_phone: "📞 <b>Отправьте ваш номер телефона:</b>",
              send_contact: "📱 Поделиться контактом",
              enter_address: "📍 <b>Введите адрес доставки:</b>",
              confirm_title: "📝 <b>Подтвердите заказ:</b>\n\n",
              btn_confirm: "✅ Подтвердить",
              btn_cancel: "❌ Отмена",
              order_ok: "🎉 <b>Заказ #%N принят!</b>\n\nОператор свяжется с вами в ближайшее время. 🚀",
              order_cancelled: "❌ Заказ отменён.",
              no_orders: "📦 У вас ещё нет заказов.",
              orders_title: "📦 <b>Последние заказы:</b>\n\n",
              recommend_q: "✨ <b>Что хотите?</b>\n\nКакой вкус предпочитаете?",
              sweet: "🍬 Сладкое",
              salty: "🧂 Солёное",
              healthy: "🌿 Здоровое",
              savory: "🍖 Мясное/Жареное",
              recommend_result: "✨ <b>Рекомендации для вас:</b>\n\n",
              no_result: "😕 Ничего не найдено. Попробуйте другой запрос.",
              search_prompt: "🔍 <b>Поиск</b>\n\nНапишите название блюда:",
              tips_title: "💡 <b>Советы по правильному питанию:</b>\n\n",
              stores_title: "📍 <b>Магазины и рынки</b>\n\nГде купить продукты:",
              about: "🍏 <b>Секрет Правильного Питания</b>\n\nПремиум платформа здорового питания.\n\n🌐 Сайт: @ovqatlanish_bot\n📲 Подключайтесь!\n\n✅ 150+ здоровых рецептов\n✅ Данные о калориях и нутриентах\n✅ Быстрые заказы и доставка",
              change_lang: "🌍 Изменить язык",
              settings: "⚙️ <b>Настройки</b>",
              added: "✅ Добавлено в корзину!",
              conv_ask: "💬 <b>Что хотите съесть?</b>\n\nРасскажите мне — острое, сладкое или что-то другое?",
            },
          };
          const t = (k: string) => D[lang]?.[k] || D["uz"][k] || k;

          // ── Main keyboard ──
          const mainKeyboard = () => ({
            keyboard: [
              [{ text: t("btn_menu") }, { text: t("btn_cart") }],
              [{ text: t("btn_orders") }, { text: t("btn_recommend") }],
              [{ text: t("btn_tips") }, { text: t("btn_stores") }],
              [{ text: t("btn_search") }, { text: t("btn_settings") }],
              [{ text: t("btn_about") }],
            ],
            resize_keyboard: true,
          });

          const sendMain = async (text: string) => {
            await sendMsg(text, { reply_markup: mainKeyboard() });
            await supabaseAdmin.from("telegram_users").update({ state: "main_menu", state_data: null }).eq("chat_id", chatId);
          };

          // ── Cart helpers ──
          const getCart = async () => {
            const { data } = await supabaseAdmin.from("telegram_carts").select("*").eq("chat_id", chatId).maybeSingle();
            return (data?.items as any[]) ?? [];
          };

          const saveCart = async (items: any[]) => {
            await supabaseAdmin.from("telegram_carts").upsert({ chat_id: chatId, items, updated_at: new Date().toISOString() });
          };

          const showCart = async () => {
            const items = await getCart();
            if (!items.length) { await sendMsg(t("cart_empty")); return; }

            let text = t("cart_title");
            let grand = 0;
            const inlineKbd: any[] = [];

            for (const item of items) {
              const f = FOODS_STATIC.find((x) => x.id === item.id);
              if (f) {
                const price = f.price * item.qty;
                grand += price;
                text += `${f.emoji} <b>${getTL(f.name, lang)}</b>\n  ${item.qty} × ${formatPrice(f.price)} = <b>${formatPrice(price)}</b>\n\n`;
                inlineKbd.push([
                  { text: "➖", callback_data: `cartsub_${f.id}` },
                  { text: `${f.emoji} ${getTL(f.name, lang)} (${item.qty})`, callback_data: `food_${f.id}` },
                  { text: "➕", callback_data: `cartadd_${f.id}` },
                ]);
              }
            }
            text += t("cart_total").replace("{total}", formatPrice(grand));
            inlineKbd.push([
              { text: t("btn_clear"), callback_data: "cartclear" },
              { text: t("btn_checkout"), callback_data: "cartcheckout" },
            ]);
            await sendMsg(text, { reply_markup: { inline_keyboard: inlineKbd } });
          };

          // ── /start & language select ──
          if (!isCallback && (messageText === "/start" || state === "select_language")) {
            if (messageText === "/start" || state === "select_language") {
              await sendMsg(t("select_lang"), {
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: "🇺🇿 O'zbekcha", callback_data: "lang_uz" },
                      { text: "🇷🇺 Русский", callback_data: "lang_ru" },
                    ],
                  ],
                },
              });
              return new Response("OK", { status: 200 });
            }
          }

          // ── Callback queries ──
          if (isCallback) {
            await answerCB();

            // Language select
            if (callbackData.startsWith("lang_")) {
              const newLang = callbackData.split("_")[1];
              await supabaseAdmin.from("telegram_users").update({ lang: newLang, state: "main_menu" }).eq("chat_id", chatId);
              const nd = D[newLang] || D["uz"];
              await sendMsg(nd.welcome, { reply_markup: mainKeyboard() });
              return new Response("OK", { status: 200 });
            }

            // Category browse
            if (callbackData.startsWith("cat_")) {
              const catId = callbackData.split("_").slice(1).join("_");
              const catFoods = FOODS_STATIC.filter((f) => f.cats.includes(catId));
              const cat = CATEGORIES.find((c) => c.id === catId);
              if (!catFoods.length) { await sendMsg("😕 Bu kategoriyada taom topilmadi"); return new Response("OK", { status: 200 }); }
              const inl = catFoods.map((f) => [{ text: `${f.emoji} ${getTL(f.name, lang)} — ${formatPrice(f.price)}`, callback_data: `food_${f.id}` }]);
              inl.push([{ text: t("btn_back"), callback_data: "showCategories" }]);
              await sendMsg(`${cat?.emoji || "📂"} <b>${getTL(cat?.uz ? { uz: cat.uz, ru: (CATEGORIES.find(c=>c.id===catId) as any)?.ru } : {uz:"Kategoriya",ru:"Категория"}, lang)}</b>:`, { reply_markup: { inline_keyboard: inl } });
              return new Response("OK", { status: 200 });
            }

            // Show categories
            if (callbackData === "showCategories" || callbackData === "catback") {
              const uniqueCats = Array.from(new Set(CATEGORIES.map(c => c.id))).map(id => CATEGORIES.find(c => c.id === id)!).filter(Boolean);
              const rows: any[] = [];
              for (let i = 0; i < uniqueCats.length; i += 2) {
                const row = [{ text: `${uniqueCats[i].emoji} ${getTL({ uz: uniqueCats[i].uz, ru: (uniqueCats[i] as any).ru || uniqueCats[i].uz }, lang)}`, callback_data: `cat_${uniqueCats[i].id}` }];
                if (uniqueCats[i + 1]) row.push({ text: `${uniqueCats[i+1].emoji} ${getTL({ uz: uniqueCats[i+1].uz, ru: (uniqueCats[i+1] as any).ru || uniqueCats[i+1].uz }, lang)}`, callback_data: `cat_${uniqueCats[i+1].id}` });
                rows.push(row);
              }
              await sendMsg(t("categories"), { reply_markup: { inline_keyboard: rows } });
              return new Response("OK", { status: 200 });
            }

            // Food detail
            if (callbackData.startsWith("food_")) {
              const foodId = callbackData.split("_").slice(1).join("_");
              const food = FOODS_STATIC.find((f) => f.id === foodId);
              if (!food) return new Response("OK", { status: 200 });
              const text = `${food.emoji} <b>${getTL(food.name, lang)}</b>\n\n🔥 Kaloriya: <b>${food.cal} kcal</b>\n💪 Protein: <b>${food.protein}g</b>\n🥑 Yog': <b>${food.fat}g</b>\n🌾 Uglevodlar: <b>${food.carbs}g</b>\n\n💰 Narxi: <b>${formatPrice(food.price)}</b>`;
              await sendMsg(text, {
                reply_markup: {
                  inline_keyboard: [
                    [{ text: "🛒 Savatga qo'shish", callback_data: `add_${food.id}` }],
                    [{ text: t("btn_back"), callback_data: "showCategories" }],
                  ],
                },
              });
              return new Response("OK", { status: 200 });
            }

            // Add to cart
            if (callbackData.startsWith("add_")) {
              const foodId = callbackData.split("_").slice(1).join("_");
              const items = await getCart();
              const ex = items.find((i) => i.id === foodId);
              if (ex) ex.qty += 1;
              else items.push({ id: foodId, qty: 1 });
              await saveCart(items);
              await answerCB(t("added"), false);
              return new Response("OK", { status: 200 });
            }

            // Cart +/-
            if (callbackData.startsWith("cartadd_") || callbackData.startsWith("cartsub_")) {
              const isAdd = callbackData.startsWith("cartadd_");
              const foodId = (isAdd ? callbackData.slice(8) : callbackData.slice(8));
              let items = await getCart();
              const ex = items.find((i) => i.id === foodId);
              if (ex) {
                ex.qty += isAdd ? 1 : -1;
                if (ex.qty <= 0) items = items.filter((i) => i.id !== foodId);
              }
              await saveCart(items);
              await showCart();
              return new Response("OK", { status: 200 });
            }

            // Clear cart
            if (callbackData === "cartclear") {
              await saveCart([]);
              await sendMsg(t("cart_empty"));
              return new Response("OK", { status: 200 });
            }

            // Checkout
            if (callbackData === "cartcheckout") {
              const items = await getCart();
              if (!items.length) { await answerCB(t("cart_empty"), true); return new Response("OK", { status: 200 }); }
              if (usr?.name && usr?.phone) {
                await supabaseAdmin.from("telegram_users").update({ state: "checkout_address" }).eq("chat_id", chatId);
                await sendMsg(t("enter_address"), { reply_markup: { keyboard: [[{ text: t("btn_cancel") }]], resize_keyboard: true, one_time_keyboard: true } });
              } else {
                await supabaseAdmin.from("telegram_users").update({ state: "checkout_name" }).eq("chat_id", chatId);
                await sendMsg(t("enter_name"), { reply_markup: { keyboard: [[{ text: t("btn_cancel") }]], resize_keyboard: true } });
              }
              return new Response("OK", { status: 200 });
            }

            // Confirm order
            if (callbackData === "order_confirm") {
              const items = await getCart();
              if (!items.length) { await answerCB(t("cart_empty"), true); return new Response("OK", { status: 200 }); }
              let grand = 0;
              const orderItems = items.map((item) => {
                const f = FOODS_STATIC.find((x) => x.id === item.id)!;
                grand += f.price * item.qty;
                return { id: item.id, name: getTL(f.name, lang), qty: item.qty, price: f.price };
              });
              const { data: order } = await supabaseAdmin
                .from("orders")
                .insert({ customer_name: usr?.name || "Telegram User", phone: usr?.phone || "—", address: usr?.address || "—", items: orderItems, total: grand, status: "new", source: "telegram", telegram_chat_id: chatId })
                .select("order_number").single();
              await saveCart([]);
              await sendMain(t("order_ok").replace("%N", String(order?.order_number || "?")));
              // Notify admin
              const adminChat = process.env.ADMIN_TELEGRAM_CHAT_ID || "6409095342";
              const tgKey2 = process.env.TELEGRAM_API_KEY;
              if (tgKey2) {
                const lines = orderItems.map((i) => `• ${i.name} × ${i.qty}`).join("\n");
                await fetch(`https://api.telegram.org/bot${tgKey2}/sendMessage`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ chat_id: Number(adminChat), text: `🆕 <b>Yangi Buyurtma #${order?.order_number} (Telegram)</b>\n👤 ${usr?.name || "—"}\n📞 ${usr?.phone || "—"}\n📍 ${usr?.address || "—"}\n\n${lines}\n\n💰 Jami: ${formatPrice(grand)}`, parse_mode: "HTML" }),
                });
              }
              return new Response("OK", { status: 200 });
            }

            // Cancel order
            if (callbackData === "order_cancel") {
              await sendMain(t("order_cancelled"));
              return new Response("OK", { status: 200 });
            }

            // Taste recommendations
            if (callbackData.startsWith("taste_")) {
              const taste = callbackData.split("_")[1];
              const results = FOODS_STATIC.filter((f) => f.taste.includes(taste)).slice(0, 5);
              if (!results.length) { await sendMsg(t("no_result")); return new Response("OK", { status: 200 }); }
              let text = t("recommend_result");
              const inl: any[] = results.map((f) => [{ text: `${f.emoji} ${getTL(f.name, lang)} — ${formatPrice(f.price)}`, callback_data: `food_${f.id}` }]);
              inl.push([{ text: t("btn_back"), callback_data: "showCategories" }]);
              await sendMsg(text + results.map((f) => `${f.emoji} <b>${getTL(f.name, lang)}</b> — ${formatPrice(f.price)}`).join("\n"), {
                reply_markup: { inline_keyboard: inl }
              });
              return new Response("OK", { status: 200 });
            }

            return new Response("OK", { status: 200 });
          }

          // ── Text messages ──
          // Cancel
          if (messageText === t("btn_cancel") || messageText === "❌" || messageText === "/cancel") {
            await sendMain(t("order_cancelled"));
            return new Response("OK", { status: 200 });
          }

          // Checkout state machine
          if (state === "checkout_name") {
            await supabaseAdmin.from("telegram_users").update({ name: messageText, state: "checkout_phone" }).eq("chat_id", chatId);
            await sendMsg(t("enter_phone"), {
              reply_markup: {
                keyboard: [[{ text: t("send_contact"), request_contact: true }], [{ text: t("btn_cancel") }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            });
            return new Response("OK", { status: 200 });
          }

          if (state === "checkout_phone") {
            const phone = contact?.phone_number || messageText;
            await supabaseAdmin.from("telegram_users").update({ phone, state: "checkout_address" }).eq("chat_id", chatId);
            await sendMsg(t("enter_address"), { reply_markup: { keyboard: [[{ text: t("btn_cancel") }]], resize_keyboard: true } });
            return new Response("OK", { status: 200 });
          }

          if (state === "checkout_address") {
            await supabaseAdmin.from("telegram_users").update({ address: messageText, state: "checkout_confirm" }).eq("chat_id", chatId);
            const items = await getCart();
            let grand = 0;
            let itemLines = "";
            for (const item of items) {
              const f = FOODS_STATIC.find((x) => x.id === item.id);
              if (f) { grand += f.price * item.qty; itemLines += `${f.emoji} ${getTL(f.name, lang)} × ${item.qty} = <b>${formatPrice(f.price * item.qty)}</b>\n`; }
            }
            const confirmText = t("confirm_title") + itemLines + `\n👤 <b>Ism:</b> ${usr?.name || messageText}\n📞 <b>Tel:</b> ${usr?.phone || "—"}\n📍 <b>Manzil:</b> ${messageText}\n\n💰 <b>Jami: ${formatPrice(grand)}</b>`;
            await sendMsg(confirmText, {
              reply_markup: { inline_keyboard: [[{ text: t("btn_confirm"), callback_data: "order_confirm" }, { text: t("btn_cancel"), callback_data: "order_cancel" }]] },
            });
            return new Response("OK", { status: 200 });
          }

          // Search state
          if (state === "search_mode") {
            const q = messageText.toLowerCase();
            const results = FOODS_STATIC.filter((f) =>
              getTL(f.name, lang).toLowerCase().includes(q) || f.cats.some((c) => c.includes(q))
            ).slice(0, 6);
            await supabaseAdmin.from("telegram_users").update({ state: "main_menu" }).eq("chat_id", chatId);
            if (!results.length) {
              await sendMsg(t("no_result"), { reply_markup: mainKeyboard() });
            } else {
              const inl = results.map((f) => [{ text: `${f.emoji} ${getTL(f.name, lang)} — ${formatPrice(f.price)}`, callback_data: `food_${f.id}` }]);
              inl.push([{ text: t("btn_back"), callback_data: "showCategories" }]);
              await sendMsg(`🔍 <b>"${messageText}"</b> bo'yicha natijalar:\n\n` + results.map((f) => `${f.emoji} ${getTL(f.name, lang)}`).join("\n"), { reply_markup: { inline_keyboard: inl } });
            }
            return new Response("OK", { status: 200 });
          }

          // Conversational chat (NLP-like)
          const lc = messageText.toLowerCase();
          const isConv = !messageText.startsWith("/") && state === "main_menu" && messageText.length > 3;
          if (isConv) {
            // Detect taste from message
            let detected = "";
            if (/shirin|sweet|сладк/i.test(lc)) detected = "sweet";
            else if (/sho['']r|salty|sol[eё]/i.test(lc)) detected = "salty";
            else if (/sog'lom|health|здоров/i.test(lc)) detected = "healthy";
            else if (/go'sht|meat|мяс|qovur/i.test(lc)) detected = "savory";
            else if (/achchiq|spicy|остр/i.test(lc)) detected = "savory";
            else if (/protein|protin|белок/i.test(lc)) detected = "protein_search";

            if (detected === "protein_search") {
              const results = FOODS_STATIC.sort((a, b) => b.protein - a.protein).slice(0, 4);
              const inl = results.map((f) => [{ text: `${f.emoji} ${getTL(f.name, lang)} (${f.protein}g protein)`, callback_data: `food_${f.id}` }]);
              await sendMsg(`💪 <b>Eng ko'p proteinli taomlar:</b>\n\n` + results.map((f) => `${f.emoji} ${getTL(f.name, lang)} — ${f.protein}g protein`).join("\n"), { reply_markup: { inline_keyboard: inl } });
              return new Response("OK", { status: 200 });
            }

            if (detected) {
              const results = FOODS_STATIC.filter((f) => f.taste.includes(detected)).slice(0, 4);
              const inl = results.map((f) => [{ text: `${f.emoji} ${getTL(f.name, lang)} — ${formatPrice(f.price)}`, callback_data: `food_${f.id}` }]);
              await sendMsg(t("recommend_result") + results.map((f) => `${f.emoji} ${getTL(f.name, lang)}`).join("\n"), { reply_markup: { inline_keyboard: inl } });
              return new Response("OK", { status: 200 });
            }

            // General food search
            const searchResults = FOODS_STATIC.filter((f) => getTL(f.name, lang).toLowerCase().includes(lc)).slice(0, 4);
            if (searchResults.length) {
              const inl = searchResults.map((f) => [{ text: `${f.emoji} ${getTL(f.name, lang)} — ${formatPrice(f.price)}`, callback_data: `food_${f.id}` }]);
              await sendMsg(`🔍 Natijalar:\n\n` + searchResults.map((f) => `${f.emoji} ${getTL(f.name, lang)}`).join("\n"), { reply_markup: { inline_keyboard: inl } });
              return new Response("OK", { status: 200 });
            }
          }

          // ── Menu buttons ──
          if (messageText === t("btn_menu") || messageText === "/menu") {
            const rows: any[] = [];
            const uniqueCats = Array.from(new Set(CATEGORIES.map(c => c.id))).map(id => CATEGORIES.find(c => c.id === id)!).filter(Boolean);
            for (let i = 0; i < Math.min(uniqueCats.length, 8); i += 2) {
              const row = [{ text: `${uniqueCats[i].emoji} ${getTL({ uz: uniqueCats[i].uz, ru: uniqueCats[i].ru || uniqueCats[i].uz }, lang)}`, callback_data: `cat_${uniqueCats[i].id}` }];
              if (uniqueCats[i + 1]) row.push({ text: `${uniqueCats[i+1].emoji} ${getTL({ uz: uniqueCats[i+1].uz, ru: uniqueCats[i+1].ru || uniqueCats[i+1].uz }, lang)}`, callback_data: `cat_${uniqueCats[i+1].id}` });
              rows.push(row);
            }
            await sendMsg(t("categories"), { reply_markup: { inline_keyboard: rows } });
            return new Response("OK", { status: 200 });
          }

          if (messageText === t("btn_cart") || messageText === "/cart") {
            await showCart();
            return new Response("OK", { status: 200 });
          }

          if (messageText === t("btn_orders") || messageText === "/orders") {
            const { data: orders } = await supabaseAdmin.from("orders").select("*").eq("telegram_chat_id", chatId).order("created_at", { ascending: false }).limit(5);
            if (!orders?.length) { await sendMsg(t("no_orders")); return new Response("OK", { status: 200 }); }
            const statusLabels: any = { new: "🆕 Yangi", confirmed: "✅ Tasdiqlandi", preparing: "👨‍🍳 Tayyorlanmoqda", delivering: "🚴 Yetkazilmoqda", delivered: "✅ Yetkazildi", cancelled: "❌ Bekor" };
            let text = t("orders_title");
            orders.forEach((o) => {
              const d = new Date(o.created_at).toLocaleDateString("ru-RU");
              text += `📦 <b>Buyurtma #${o.order_number}</b> (${d})\n   Holati: ${statusLabels[o.status] || o.status}\n   Summa: <b>${formatPrice(Number(o.total))}</b>\n\n`;
            });
            await sendMsg(text);
            return new Response("OK", { status: 200 });
          }

          if (messageText === t("btn_recommend") || messageText === "/recommend") {
            await sendMsg(t("recommend_q"), {
              reply_markup: {
                inline_keyboard: [
                  [{ text: t("sweet"), callback_data: "taste_sweet" }, { text: t("salty"), callback_data: "taste_salty" }],
                  [{ text: t("healthy"), callback_data: "taste_healthy" }, { text: t("savory"), callback_data: "taste_savory" }],
                ],
              },
            });
            return new Response("OK", { status: 200 });
          }

          if (messageText === t("btn_tips") || messageText === "/tips") {
            const shuffled = [...TIPS].sort(() => Math.random() - 0.5).slice(0, 5);
            await sendMsg(t("tips_title") + shuffled.map((tip, i) => `${i + 1}. ${getTL(tip, lang)}`).join("\n\n"));
            return new Response("OK", { status: 200 });
          }

          if (messageText === t("btn_stores") || messageText === "/stores") {
            let text = t("stores_title") + "\n\n";
            STORES.forEach((s) => {
              text += `${s.emoji} <b>${s.name}</b>\n📍 ${getTL(s.address, lang)}\n🛒 ${getTL(s.products, lang)}\n📞 ${s.phone}\n⏰ ${s.hours}\n\n`;
            });
            await sendMsg(text);
            return new Response("OK", { status: 200 });
          }

          if (messageText === t("btn_search") || messageText === "/search") {
            await supabaseAdmin.from("telegram_users").update({ state: "search_mode" }).eq("chat_id", chatId);
            await sendMsg(t("search_prompt"), { reply_markup: { keyboard: [[{ text: t("btn_cancel") }]], resize_keyboard: true } });
            return new Response("OK", { status: 200 });
          }

          if (messageText === t("btn_about") || messageText === "/about") {
            await sendMsg(t("about"), { reply_markup: mainKeyboard() });
            return new Response("OK", { status: 200 });
          }

          if (messageText === t("btn_settings") || messageText === "/settings") {
            await sendMsg(t("settings"), {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "🇺🇿 O'zbekcha", callback_data: "lang_uz" }, { text: "🇷🇺 Русский", callback_data: "lang_ru" }],
                ],
              },
            });
            return new Response("OK", { status: 200 });
          }

          // Default: Show main menu
          await sendMain(t("main_menu"));
          return new Response("OK", { status: 200 });

        } catch (err: any) {
          console.error("[Telegram Bot] Error:", err);
          return new Response("OK", { status: 200 }); // Always return 200 to Telegram
        }
      },
    },
  },
});

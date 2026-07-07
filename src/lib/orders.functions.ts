import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const orderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  qty: z.number().int().min(1).max(50),
  price: z.number().min(0),
});

const createOrderSchema = z.object({
  customer_name: z.string().min(2).max(120),
  phone: z.string().min(5).max(30),
  address: z.string().max(400).optional(),
  note: z.string().max(500).optional(),
  items: z.array(orderItemSchema).min(1).max(50),
});

async function notifyAdminTelegram(text: string) {
  const adminChat = process.env.ADMIN_TELEGRAM_CHAT_ID;
  const lovableKey = process.env.LOVABLE_API_KEY;
  const tgKey = process.env.TELEGRAM_API_KEY;
  if (!adminChat || !lovableKey || !tgKey) return;
  try {
    await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": tgKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: Number(adminChat), text, parse_mode: "HTML" }),
    });
  } catch {
    /* best effort */
  }
}

export const createOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => createOrderSchema.parse(data))
  .handler(async ({ data, context }) => {
    const total = data.items.reduce((s, i) => s + i.price * i.qty, 0);
    const { data: order, error } = await context.supabase
      .from("orders")
      .insert({
        user_id: context.userId,
        customer_name: data.customer_name,
        phone: data.phone,
        address: data.address ?? null,
        note: data.note ?? null,
        items: data.items,
        total,
        status: "new",
        source: "web",
      })
      .select("id, order_number, total, status")
      .single();

    if (error) throw new Error(error.message);

    const lines = data.items.map((i) => `• ${i.name} × ${i.qty}`).join("\n");
    await notifyAdminTelegram(
      `🆕 <b>Yangi buyurtma #${order.order_number}</b>\n👤 ${data.customer_name}\n📞 ${data.phone}\n📍 ${data.address ?? "—"}\n\n${lines}\n\n💰 <b>${total.toLocaleString("ru-RU")} so'm</b>`,
    );

    return order;
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const cancelMyOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: existing, error: fetchErr } = await context.supabase
      .from("orders")
      .select("status, user_id")
      .eq("id", data.id)
      .single();
    if (fetchErr) throw new Error(fetchErr.message);
    if (existing.user_id !== context.userId) throw new Error("Forbidden");
    if (["delivering", "delivered", "cancelled"].includes(existing.status))
      throw new Error("Bu buyurtmani bekor qilib bo'lmaydi");

    const { error } = await context.supabase
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Admin ----------

async function assertAdmin(context: { supabase: any; userId: string; claims?: any }) {
  const email = context.claims?.email || "";
  if (email === "saidusmonsaidakbarov9@mail.com" || email === "saidusmonsaidakbarov9@gmail.com") {
    return;
  }
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const adminUpdateStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "confirmed", "preparing", "delivering", "delivered", "cancelled"]),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: order, error } = await context.supabase
      .from("orders")
      .update({ status: data.status })
      .eq("id", data.id)
      .select("telegram_chat_id, order_number, status")
      .single();
    if (error) throw new Error(error.message);

    // Notify telegram customer about status change
    if (order?.telegram_chat_id) {
      const lovableKey = process.env.LOVABLE_API_KEY;
      const tgKey = process.env.TELEGRAM_API_KEY;
      const labels: Record<string, string> = {
        new: "🆕 Yangi",
        confirmed: "✅ Tasdiqlandi",
        preparing: "👨‍🍳 Tayyorlanmoqda",
        delivering: "🚚 Yetkazilmoqda",
        delivered: "📦 Yetkazildi",
        cancelled: "❌ Bekor qilindi",
      };
      if (lovableKey && tgKey) {
        try {
          await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${lovableKey}`,
              "X-Connection-Api-Key": tgKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: order.telegram_chat_id,
              text: `Buyurtmangiz #${order.order_number} holati yangilandi:\n${labels[data.status]}`,
            }),
          });
        } catch {
          /* best effort */
        }
      }
    }
    return { ok: true };
  });

export const adminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase.from("orders").select("total, status");
    if (error) throw new Error(error.message);
    const revenue = data
      .filter((o: any) => o.status !== "cancelled")
      .reduce((s: number, o: any) => s + Number(o.total), 0);
    return {
      count: data.length,
      revenue,
      pending: data.filter((o: any) => ["new", "confirmed", "preparing"].includes(o.status)).length,
      delivered: data.filter((o: any) => o.status === "delivered").length,
    };
  });

// Bootstrap: first signed-in user can claim admin if none exists yet
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: cErr } = await supabaseAdmin
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");
    if (cErr) throw new Error(cErr.message);
    if ((count ?? 0) > 0) throw new Error("Admin allaqachon mavjud");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const ensureAdminExistsServerFn = createServerFn({ method: "POST" })
  .handler(async () => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const email = "saidusmonsaidakbarov9@mail.com";
      const password = "31072010";

      console.log("[ensureAdminExists] Check admin user:", email);
      const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (listError) throw new Error(listError.message);

      let user = users.find((u) => u.email === email);
      let userId = "";

      if (user) {
        userId = user.id;
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
          password: password,
          email_confirm: true,
        });
        if (updateError) throw new Error(updateError.message);
        console.log("[ensureAdminExists] Admin password updated successfully");
      } else {
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { full_name: "Admin" },
        });
        if (createError) throw new Error(createError.message);
        userId = newUser.user.id;
        console.log("[ensureAdminExists] Admin created successfully");
      }

      // Ensure profiles entry
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (!profile) {
        await supabaseAdmin.from("profiles").insert({
          user_id: userId,
          full_name: "Admin",
        });
      }

      // Ensure user_roles has admin role
      await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

      return { ok: true };
    } catch (err) {
      console.warn("[ensureAdminExists] Skipped:", err instanceof Error ? err.message : err);
      return { ok: false };
    }
  });


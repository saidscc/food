import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/setup-admin")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const urlObj = new URL(request.url);
          const appUrl = urlObj.searchParams.get("url");

          const email = "saidusmonsaidakbarov9@mail.com";
          const password = "31072010";

          const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
          if (listError) throw listError;

          let userId = "";
          const existing = users.find((u) => u.email === email);

          if (existing) {
            userId = existing.id;
            const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
              password,
              email_confirm: true,
            });
            if (updateError) throw updateError;
          } else {
            const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
              email,
              password,
              email_confirm: true,
              user_metadata: { full_name: "Admin" },
            });
            if (createError) throw createError;
            userId = newUser.user.id;
          }

          // Ensure profiles entry
          const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle();

          if (!profile) {
            await supabaseAdmin.from("profiles").insert({ user_id: userId, full_name: "Admin" });
          }

          // Upsert admin role
          await supabaseAdmin
            .from("user_roles")
            .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

          // Register Telegram webhook if URL provided
          let webhookResult: any = null;
          const tgKey = process.env.TELEGRAM_API_KEY;
          if (appUrl && tgKey) {
            const cleanUrl = appUrl.replace(/\/$/, "");
            const tgRes = await fetch(`https://api.telegram.org/bot${tgKey}/setWebhook`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: `${cleanUrl}/api/telegram` }),
            });
            webhookResult = await tgRes.json();
          }

          return new Response(
            JSON.stringify({ success: true, userId, webhook: webhookResult || "provide ?url= param" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: any) {
          return new Response(
            JSON.stringify({ success: false, error: err.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});

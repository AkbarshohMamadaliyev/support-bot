import { NextRequest, NextResponse } from "next/server";
import { TelegramUpdate } from "@/types/telegram";
import {
  getBot,
  getAdminIds,
  extractUserId,
  formatUserQuestion,
  formatAdminReply,
} from "@/lib/bot";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const bot = getBot();
    const adminIds = getAdminIds();
    const update: TelegramUpdate = await req.json();

    const message = update.message;

    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text;
    const firstName = message.from?.first_name ?? "Foydalanuvchi";

    // 1chi admin — reply qila oladi
    const isAdmin1 = chatId.toString() === adminIds[0];
    // 2chi admin — faqat savol oladi
    const isAdmin2 = !!adminIds[1] && chatId.toString() === adminIds[1];
    const isAnyAdmin = isAdmin1 || isAdmin2;

    // /start komandasi
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        isAnyAdmin
          ? "👋 Salom Admin!\n\nFoydalanuvchilar savollari sizga yuboriladi.\nJavob berish uchun xabarga Reply bosing."
          : "Assalomu alaykum! ✋\n\nSavolingizni yozing, tez orada javob beramiz!"
      );
      return NextResponse.json({ ok: true });
    }

    // Matn bo'lmasa — chiqib ketish
    if (!text) {
      return NextResponse.json({ ok: true });
    }

    // Faqat 1chi admin reply qila oladi
    if (isAdmin1 && message.reply_to_message) {
      const originalText = message.reply_to_message.text ?? "";
      const userId = extractUserId(originalText);

      if (userId) {
        await bot.sendMessage(userId, formatAdminReply(text));
        await bot.sendMessage(adminIds[0], "✅ Javob yuborildi!");
      } else {
        await bot.sendMessage(
          chatId,
          "⚠️ Foydalanuvchi ID topilmadi.\nFoydalanuvchi xabariga Reply qiling."
        );
      }

      return NextResponse.json({ ok: true });
    }

    // 2chi admin reply qilmoqchi bo'lsa — ruxsat yo'q
    if (isAdmin2 && message.reply_to_message) {
      await bot.sendMessage(chatId, "⚠️ Sizda javob berish huquqi yo'q.");
      return NextResponse.json({ ok: true });
    }

    // Foydalanuvchidan savol keldi — har bir adminga alohida try/catch bilan yuborish
    if (!isAnyAdmin) {
      for (const id of adminIds) {
        try {
          await bot.sendMessage(id, formatUserQuestion(firstName, chatId, text));
        } catch (err) {
          console.error(`Admin ${id} ga yuborishda xato:`, err);
        }
      }
      await bot.sendMessage(chatId, "✅ Savolingiz qabul qilindi! Tez orada javob beramiz.");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook xatosi:", error);
    return NextResponse.json({ error: "Ichki server xatosi" }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "ok",
    project: "Support Bot",
    version: "1.0.0",
  });
}

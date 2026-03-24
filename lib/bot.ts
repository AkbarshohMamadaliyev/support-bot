import TelegramBot from "node-telegram-bot-api";

let botInstance: TelegramBot | null = null;

export function getBot(): TelegramBot {
  if (!botInstance) {
    const token = process.env.BOT_TOKEN;
    if (!token) throw new Error("BOT_TOKEN topilmadi!");
    // polling: false — webhook ishlatamiz, polling emas!
    botInstance = new TelegramBot(token, { polling: false });
  }
  return botInstance;
}

export function getAdminIds(): string[] {
  const adminId1 = process.env.ADMIN_CHAT_ID;
  const adminId2 = process.env.ADMIN_CHAT_ID_2;
  if (!adminId1) throw new Error("ADMIN_CHAT_ID topilmadi!");
  return [adminId1, adminId2].filter(Boolean) as string[];
}

export function extractUserId(text: string): string | null {
  const match = text.match(/🆔 ID: (\d+)/);
  return match ? match[1] : null;
}

export function formatUserQuestion(
  firstName: string,
  chatId: number,
  text: string
): string {
  return (
    `📩 Yangi savol!\n\n` +
    `👤 Ism: ${firstName}\n` +
    `🆔 ID: ${chatId}\n\n` +
    `💬 Savol: ${text}`
  );
}

export function formatAdminReply(text: string): string {
  return `💬 Bot javobi:\n\n${text}`;
}

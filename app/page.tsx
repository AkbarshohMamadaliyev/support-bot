export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-black/8 bg-black/3 text-3xl dark:border-white/8 dark:bg-white/4">
          🤖
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Support Bot</h1>

        <p className="mt-2 text-sm text-black/55 dark:text-white/50">
          Telegram orqali savollaringizga tez javob oling
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/8 px-3 py-1 text-xs text-black/60 dark:border-white/10 dark:text-white/55">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Bot ishlayapti
        </div>

        <div className="mt-8">
          <a
            href="https://t.me/support_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            @support_bot ga yozish
          </a>
        </div>
      </div>
    </main>
  );
}

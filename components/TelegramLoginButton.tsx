import { useEffect } from 'react';

export default function TelegramLoginButton() {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.expand();
    }
  }, []);

  return (
    <div className="text-center mt-10">
      <p className="text-lg">Открытие анкеты через Telegram WebApp…</p>
    </div>
  );
}


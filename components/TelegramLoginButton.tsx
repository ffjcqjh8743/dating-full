
import { useEffect } from 'react';

declare global {
  interface Window {
    TelegramLoginWidget: {
      onAuth: (user: any) => void;
    };
  }
}

export default function TelegramLoginButton() {
  useEffect(() => {
    window.TelegramLoginWidget = {
      onAuth: function (user) {
        console.log('Телеграм авторизация:', user);
        localStorage.setItem('telegram_user', JSON.stringify(user));
        window.location.href = '/swipe';
      },
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.setAttribute('data-telegram-login', 'moondatingbot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-radius', '10');
    script.setAttribute('data-lang', 'ru');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'TelegramLoginWidget.onAuth(user)');
    script.async = true;
    document.getElementById('telegram-login')?.appendChild(script);
  }, []);

  return <div id="telegram-login" className="flex justify-center mt-10"></div>;
}

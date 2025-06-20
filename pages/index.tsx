import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.expand();
    }
  }, []);

  const openProfile = () => {
    const initData = (window as any).Telegram?.WebApp?.initData;
    fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData }),
    }).then(() => {
      window.location.href = '/profile';
    });
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>🚀 Добро пожаловать в дейтинг WebApp</h1>
      <p>Нажми кнопку ниже, чтобы войти через Telegram</p>
      <button onClick={openProfile} style={{
        padding: '12px 24px',
        backgroundColor: '#2AABEE',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '20px'
      }}>
        Войти через Telegram
      </button>
    </div>
  );
}

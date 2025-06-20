import { useEffect, useState } from 'react';

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initData = (window as any)?.Telegram?.WebApp?.initData;
    console.log('[initData]', initData);

    if (initData && initData.length > 0) {
      fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData }),
      })
        .then((res) => {
          if (res.ok) {
            window.location.href = '/profile';
          } else {
            setError('Ошибка авторизации через Telegram.');
          }
        })
        .catch(() => setError('Ошибка соединения с сервером.'));
    } else {
      setError('initData не передано. Открой через Telegram WebApp.');
    }
  }, []);

  return (
    <div style={{ padding: 20, color: '#fff', textAlign: 'center' }}>
      <h1>Авторизация через Telegram</h1>
      <p>⏳ Ожидаем передачу данных от Telegram WebApp…</p>
      {error && <p style={{ marginTop: 20, color: 'red' }}>{error}</p>}
    </div>
  );
}


import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const initData = (window as any)?.Telegram?.WebApp?.initData;
    if (!initData) {
      alert('Открывайте анкету через Telegram WebApp');
      return;
    }

    fetch('/api/user/exists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData }),
    })
      .then(res => res.json())
      .then(data => {
        setHasProfile(data.exists);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;

  if (hasProfile) {
    window.location.href = '/swipe';
  } else {
    window.location.href = '/register';
  }

  return null;
}


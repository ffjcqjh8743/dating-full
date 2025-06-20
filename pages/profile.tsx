import { GetServerSideProps } from 'next';
import { verifyToken } from '../lib/auth';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.token || '';
  const user = verifyToken(token);

  if (!user) {
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default function Profile({ user }: { user: any }) {
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const initData = (window as any)?.Telegram?.WebApp?.initData;

      console.log('⏳ Telegram initData:', initData);

      if (initData && initData.length > 0) {
        fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData }),
        })
          .then(res => {
            if (res.ok) {
              console.log('✅ Auth success, reloading...');
              window.location.reload();
            } else {
              console.warn('❌ Auth failed:', res.status);
            }
          })
          .catch(err => console.error('⚠️ Fetch error:', err));
      } else {
        console.warn('⚠️ No initData detected.');
      }
    }
  }, [user]);

  if (!user) return <div>Авторизация через Telegram...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Привет, {user.name} (@{user.username})</h1>
      <p>ID: {user.id}</p>
    </div>
  );
}


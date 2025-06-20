import { GetServerSideProps } from 'next';
import { verifyToken } from '../lib/auth';

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
  if (!user && typeof window !== 'undefined') {
    if ((window as any).Telegram?.WebApp?.initData) {
      fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData: (window as any).Telegram.WebApp.initData }),
      }).then(() => window.location.reload());
    }
  }

  if (!user) return <div>Авторизация через Telegram...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Привет, {user.name} (@{user.username})</h1>
      <p>ID: {user.id}</p>
    </div>
  );
}

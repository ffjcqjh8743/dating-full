import TelegramLoginButton from '../components/TelegramLoginButton';

export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Авторизация через Telegram</h1>
      <TelegramLoginButton />
    </div>
  );
}


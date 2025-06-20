interface Props {
  username: string;
  isMatched: boolean;
}

export default function TelegramLink({ username, isMatched }: Props) {
  return (
    <div className="mt-2 text-center">
      {isMatched ? (
        <a href={`https://t.me/${username}`} className="text-blue-500 underline">Открыть Telegram профиль</a>
      ) : (
        <span className="text-gray-500 text-sm">🔒 Профиль Telegram доступен только при взаимном лайке</span>
      )}
    </div>
  );
}

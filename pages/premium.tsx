import { useState } from 'react';

export default function Premium() {
  const [paid, setPaid] = useState(false);

  const simulateCryptoPay = async () => {
    // Здесь будет интеграция с CryptoBot API
    setTimeout(() => {
      setPaid(true);
    }, 1000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">💎 Premium</h1>
      <p className="mb-4">Подписка открывает доступ ко всем фотографиям и Telegram профилям.</p>
      {!paid ? (
        <button onClick={simulateCryptoPay} className="px-4 py-2 bg-purple-600 text-white rounded">Оплатить через CryptoBot</button>
      ) : (
        <p className="text-green-600 font-bold">Премиум активирован!</p>
      )}
    </div>
  );
}

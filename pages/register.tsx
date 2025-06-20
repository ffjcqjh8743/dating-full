import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [height, setHeight] = useState('');
  const [habits, setHabits] = useState('');
  const [bio, setBio] = useState('');
  const [verified, setVerified] = useState(false);
  const [premium, setPremium] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setBirthDate(date);
    const z = getZodiacSign(new Date(date));
    setZodiac(z);
  };

  const getZodiacSign = (date: Date) => {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return '♒ Водолей';
    if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) return '♓ Рыбы';
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return '♈ Овен';
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return '♉ Телец';
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return '♊ Близнецы';
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return '♋ Рак';
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return '♌ Лев';
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return '♍ Дева';
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return '♎ Весы';
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return '♏ Скорпион';
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return '♐ Стрелец';
    return '♑ Козерог';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, birthDate, zodiac, height, habits, bio, verified, premium }),
    });

    const result = await res.json();
    if (res.ok) {
      alert('Профиль сохранён!');
    } else {
      alert('Ошибка: ' + result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Регистрация</h1>

      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full mb-3 p-2 border"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        className="block w-full mb-3"
      />

      <input
        type="date"
        value={birthDate}
        onChange={handleDateChange}
        className="block w-full mb-3 p-2 border"
        required
      />

      {zodiac && <div className="mb-3">Знак зодиака: <strong>{zodiac}</strong></div>}

      <input
        type="number"
        placeholder="Рост (см)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="block w-full mb-3 p-2 border"
      />

      <input
        type="text"
        placeholder="Вредные привычки"
        value={habits}
        onChange={(e) => setHabits(e.target.value)}
        className="block w-full mb-3 p-2 border"
      />

      <textarea
        placeholder="О себе"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="block w-full mb-3 p-2 border"
        rows={4}
      />

      <label className="block mb-2">
        <input
          type="checkbox"
          checked={verified}
          onChange={(e) => setVerified(e.target.checked)}
        />{' '}
        Заявка на верификацию
      </label>

      <label className="block mb-4">
        <input
          type="checkbox"
          checked={premium}
          onChange={(e) => setPremium(e.target.checked)}
        />{' '}
        Хочу премиум (заглушка)
      </label>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Отправить
      </button>
    </form>
  );
}

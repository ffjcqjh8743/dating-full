import { useState } from 'react';
import { getZodiac } from '../utils/zodiac';

export default function Profile() {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [height, setHeight] = useState('');
  const [bio, setBio] = useState('');
  const [zodiac, setZodiac] = useState('');

  const handleDateChange = (e: any) => {
    const date = e.target.value;
    setBirthdate(date);
    setZodiac(getZodiac(date));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Мой профиль</h1>
      <input className="block mb-2 w-full p-2 border" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
      <input type="date" className="block mb-2 w-full p-2 border" value={birthdate} onChange={handleDateChange} />
      <input className="block mb-2 w-full p-2 border" placeholder="Рост (см)" value={height} onChange={e => setHeight(e.target.value)} />
      <textarea className="block mb-2 w-full p-2 border" placeholder="О себе" value={bio} onChange={e => setBio(e.target.value)} />
      {zodiac && <p>Знак зодиака: <b>{zodiac}</b></p>}
    </div>
  );
}

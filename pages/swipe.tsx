import { useState } from 'react';

const demoUsers = [
  { id: 1, name: 'Катя', age: 23, img: '/demo1.jpg' },
  { id: 2, name: 'Аня', age: 25, img: '/demo2.jpg' },
  { id: 3, name: 'Лена', age: 22, img: '/demo3.jpg' },
];

export default function Swipe() {
  const [index, setIndex] = useState(0);

  const handleSwipe = (like: boolean) => {
    console.log(like ? 'Лайк' : 'Свайп влево', demoUsers[index].name);
    setIndex((prev) => (prev + 1) % demoUsers.length);
  };

  const user = demoUsers[index];

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-72 h-96 bg-gray-200 rounded-xl mb-4 overflow-hidden">
        <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{user.name}, {user.age}</h2>
      <div className="flex gap-4">
        <button onClick={() => handleSwipe(false)} className="px-4 py-2 bg-red-500 text-white rounded-full">👎</button>
        <button onClick={() => handleSwipe(true)} className="px-4 py-2 bg-green-500 text-white rounded-full">❤️</button>
      </div>
    </div>
  );
}

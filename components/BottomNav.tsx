import Link from 'next/link';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full flex justify-around bg-gray-200 p-3">
      <Link href="/profile"><a>Профиль</a></Link>
      <Link href="/chat"><a>Чат</a></Link>
      <Link href="/premium"><a>Премиум</a></Link>
    </nav>
  );
}

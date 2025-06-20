import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-xl mx-auto py-6 px-4">
        <Component {...pageProps} />
      </div>
    </main>
  );
}

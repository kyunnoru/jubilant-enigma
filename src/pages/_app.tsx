import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Red_Hat_Display } from 'next/font/google';

const redhat = Red_Hat_Display({
  subsets: ['latin'],
  display: 'swap', 
  variable: '--font-redhat',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${redhat.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
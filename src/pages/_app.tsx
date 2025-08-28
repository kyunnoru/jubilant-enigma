// // src/pages/_app.tsx
// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";
// import { Red_Hat_Display } from 'next/font/google';

// const redhat = Red_Hat_Display({
//   subsets: ['latin'],
//   display: 'swap', 
//   variable: '--font-redhat',
// });

// export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <main className={`${redhat.variable} font-sans`}>
//         <Component {...pageProps} />
//       </main>
//     </SessionProvider>
//   );
// }


import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Red_Hat_Display } from 'next/font/google';

const redhat = Red_Hat_Display({
  subsets: ['latin'],
  display: 'swap', 
  variable: '--font-redhat',
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={`${redhat.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
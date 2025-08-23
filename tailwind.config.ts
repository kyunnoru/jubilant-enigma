// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Di sinilah kita melakukan modifikasi
    extend: {
      fontFamily: {
        // Kita mendefinisikan ulang 'font-sans' default dari Tailwind.
        // Sekarang, ia akan menggunakan CSS variable '--font-redhat' yang kita buat di _app.tsx.
        // Jika karena alasan tertentu font itu gagal dimuat, ia akan beralih ke font sans-serif standar browser.
        sans: ['var(--font-redhat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
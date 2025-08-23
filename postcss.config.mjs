// postcss.config.mjs - KODE BARU YANG BENAR

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // <- Ini adalah cara baru yang benar
    autoprefixer: {},
  },
};

export default config;
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tejas-raj01.vercel.app',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});

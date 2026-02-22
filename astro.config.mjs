// @ts-check
import { defineConfig } from 'astro/config';
import icon from "astro-icon";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [icon()],
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: {
      prefixDefaultLocale: false // pt fica na raiz '/', en fica em '/en/'
    }
  }
});
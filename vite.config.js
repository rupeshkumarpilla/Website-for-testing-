import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Website-for-testing-/',
  root: new URL('./src', import.meta.url).pathname,
  publicDir: new URL('./public', import.meta.url).pathname,
  plugins: [react()],
  build: {
    outDir: new URL('./dist', import.meta.url).pathname,
    emptyOutDir: true,
  },
});

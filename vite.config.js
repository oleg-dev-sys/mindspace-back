// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // или ваш порт
    open: true,
    allowedHosts: [
      'whimsically-composed-murre.cloudpub.ru',
      // Можно добавить другие хосты при необходимости
    ],
  },
  build: {
    outDir: 'build', // или 'dist'
  },
})
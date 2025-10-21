import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/drug-info',
  server: {
    host: true,
    strictPort: true,
    port: 8080,
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});

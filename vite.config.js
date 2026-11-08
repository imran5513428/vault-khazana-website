import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Custom domain serves from root
  base: '/',
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    sourcemap: false,
  },
})
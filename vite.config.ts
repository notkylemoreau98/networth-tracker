import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    extensions: ['.tsx', '.js', '.jsx', '.ts'],
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Ensure Vite development server runs on port 3000
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to backend server running on port 5000
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

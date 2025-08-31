import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'google-genai': ['@google/genai'],
          'react-vendor': ['react', 'react-dom'],
          'clerk': ['@clerk/clerk-react'],
          'markdown': ['markdown-it', 'dompurify'],
        }
      }
    }
  }
})

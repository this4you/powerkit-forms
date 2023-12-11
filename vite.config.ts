import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/powerkit-forms/',
  build: {
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: 'powerkitForms.js',
        assetFileNames: 'powerkitForms.css',
        chunkFileNames: "powerkitFormsChunk.js",
        manualChunks: undefined,
      }
    }
  },
  plugins: [react()],
})

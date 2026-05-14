import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('certs/localhost-key.pem'),
      cert: fs.readFileSync('certs/localhost.pem'),
    },
    proxy: {
      '/api': {
        target: 'https://blogex.test',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      },
      '/sanctum': {
        target: 'https://blogex.test',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      },
    },
  },
})

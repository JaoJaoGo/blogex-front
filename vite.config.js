import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
    plugins: [react()],
    server: {
        host: 'blogex.test',
        port: 5173,
        https: {
            key: fs.readFileSync('certs/blogex.test-key.pem'),
            cert: fs.readFileSync('certs/blogex.test.pem'),
        },
    },
})
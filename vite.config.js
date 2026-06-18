import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ command }) => {
    const isDev = command === 'serve'

    return {
        plugins: [react()],

        server: isDev
            ? {
                host: 'blogex.test',
                port: 5173,
                https: {
                    key: fs.readFileSync(
                        path.resolve(__dirname, 'certs/blogex.test-key.pem')
                    ),
                    cert: fs.readFileSync(
                        path.resolve(__dirname, 'certs/blogex.test.pem')
                    ),
                },
                proxy: {
                    '/api': {
                        target: 'https://blogex.test',
                        changeOrigin: true,
                        secure: false,
                    },
                    '/sanctum': {
                        target: 'https://blogex.test',
                        changeOrigin: true,
                        secure: false,
                    },
                },
            }
            : undefined,
    }
})
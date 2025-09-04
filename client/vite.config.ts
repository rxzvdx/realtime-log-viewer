import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig(({ mode }) => ({
    plugins: [react()],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
},
// expose VITE_WS_URL to the client; default to localhost for dev
define: {
    __WS_URL__: JSON.stringify(process.env.VITE_WS_URL || 'ws://localhost:8080')
    }
}))
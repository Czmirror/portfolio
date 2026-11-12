import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
    base: process.env.GITHUB_PAGES ? '/portfolio/' : './',
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                portfolio: resolve(__dirname, 'index.html'),
                typegunner: resolve(__dirname, 'games/typegunner/index.html')
            }
        }
    },
    resolve: {
        alias: {
            '@': '/src',
        },
        extensions: ['.js', '.jsx'],
    },
    server: {
        open: true // ブラウザを自動的に開く
    },
    define: {
        'process.env': {}
    }
});

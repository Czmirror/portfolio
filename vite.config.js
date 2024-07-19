import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
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

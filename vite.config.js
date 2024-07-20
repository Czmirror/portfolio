import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: process.env.GITHUB_PAGES ? 'REPOSITORY_NAME' : './',
    root: 'src',
    plugins: [react({ jsxImportSource: '@emotion/react' })]
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

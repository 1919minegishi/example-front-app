import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
// ★★★ この server オプションを追加/編集 ★★★
    server: {
        host: '0.0.0.0', // すべてのネットワークインターフェースからの接続を許可
        watch: {
            usePolling: true, // Docker環境でファイルの変更を検知しやすくするための設定
        },
    },
});

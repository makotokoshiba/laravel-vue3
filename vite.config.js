import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
      laravel({
        input: 'resources/js/app.js',
        refresh: true,
      }),
      vue({
        template: {
          transformAssetUrls: {
            base: null,
            includeAbsolute: false,
          },
        },
      }),
    ],
    server: {
      host: '0.0.0.0', // Docker 外部からアクセス可能にする
      port: 5173,
      hmr: {
        host: 'localhost', // ホスト側（あなたのMac）からアクセスするため
        protocol: 'ws',
        port: 5173,
      },
    },
  });
  
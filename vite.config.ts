import Vue from '@vitejs/plugin-vue2';
import { defineConfig } from 'vite';

defineConfig({
    plugins: [
      Vue(),
    ],
    build: {
        lib: {
            entry: ['src/index.ts'],
        },
        outDir: 'dist',
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            }
        }
    },
})
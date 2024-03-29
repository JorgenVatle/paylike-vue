import Vue from '@vitejs/plugin-vue2';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
      Vue(),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: ['src/index.ts'],
            fileName: 'index',
            formats: ['cjs', 'umd', 'es'],
            name: 'PaylikeVue'
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
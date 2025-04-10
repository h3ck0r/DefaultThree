import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import ViteRestart from 'vite-plugin-restart';

export default defineConfig({
    root: './',
    build: {
        outDir: './dist',
        rollupOptions: {
            input: {
                main: './index.html',
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    plugins: [
        ViteRestart({
            restart: ['./public/**'],
        }),
        glsl()
    ]
});

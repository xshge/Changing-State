import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
    },
    base: process.env.NODE_ENV === 'production' ? '/Changing-State/' : '',
    build: {
        outDir: 'dist',
    }
});
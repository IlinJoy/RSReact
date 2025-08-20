/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
  test: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTest.ts',
    coverage: {
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/App.{js,jsx,ts,tsx}',
        'src/constants/*',
        'src/main.{js,jsx,ts,tsx}',
        'src/**/*.d.ts',
        'src/**/*types*.{js,ts}',
      ],
    },
  },
});

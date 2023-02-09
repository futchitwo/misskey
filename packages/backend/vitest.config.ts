import { defineConfig } from "vitest/config";
import path from 'path'

export default defineConfig({
    test:{
        include: ['test/unit/**/*.ts'],
        globals: true,
    },
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
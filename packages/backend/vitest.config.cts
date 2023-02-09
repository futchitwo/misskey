import path from 'path';
import { defineConfig } from "vitest/config";
import swc from 'unplugin-swc';

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
	plugins: [
		swc.vite()
	],
});

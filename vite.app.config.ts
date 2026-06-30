import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// Builds the showcase as a standalone static site (index.html -> dist/app),
// separate from the library build in vite.config.ts.
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    outDir: 'dist/app',
    emptyOutDir: true,
    sourcemap: true,
  },
});

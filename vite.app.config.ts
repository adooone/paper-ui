import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { sharedCssConfig } from './vite.shared';

// Builds the showcase as a standalone static site (index.html -> dist/app),
// separate from the library build in vite.config.ts.
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  css: sharedCssConfig,
  build: {
    outDir: 'dist/app',
    emptyOutDir: true,
    sourcemap: true,
  },
});

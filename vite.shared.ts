import type { CSSOptions } from 'vite';

/**
 * CSS-module + SCSS options shared by the library build (vite.config.ts) and
 * the showcase build (vite.app.config.ts), so class hashing and the SCSS
 * compiler stay identical across both.
 */
export const sharedCssConfig = {
  modules: {
    localsConvention: 'camelCaseOnly',
    generateScopedName: '[name]__[local]___[hash:base64:5]',
  },
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler',
    },
  },
} satisfies CSSOptions;

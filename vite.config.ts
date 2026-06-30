import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [react()],
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
  };

  if (command === 'serve') {
    return {
      ...baseConfig,
      server: {
        host: '0.0.0.0',
        port: 3020,
      },
    };
  }

  return {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      dts({
        include: ['src/**/*'],
        exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/showcase/**/*'],
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'PaperUI',
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'clsx',
          'tailwind-merge',
          'framer-motion',
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'index.css';
            return assetInfo.name || '';
          },
        },
      },
      cssCodeSplit: false,
      sourcemap: true,
    },
  };
});

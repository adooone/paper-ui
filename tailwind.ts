/** @type {import('tailwindcss').Config} */
import { canvas, fontFamily, ink, paper } from './src/tokens';

export const paperPreset = {
  theme: {
    extend: {
      fontFamily: {
        display: [...fontFamily.display],
        'display-alt': [...fontFamily['display-alt']],
        'display-fantasy': [...fontFamily['display-fantasy']],
        'display-luminari': [...fontFamily['display-luminari']],
        serif: [...fontFamily.serif],
        handwritten: [...fontFamily.handwritten],
        mono: [...fontFamily.mono],
      },
      colors: {
        paper: { ...paper },
        ink: { ...ink },
        canvas: { ...canvas },
        watercolor: {
          blue: { DEFAULT: '#7C9CC0', light: '#AFC6E0', dark: '#51719B' },
          green: { DEFAULT: '#8FB996', light: '#B5D4BA', dark: '#5E8A66' },
          amber: { DEFAULT: '#D4A373', light: '#E4C9A8', dark: '#A67B4F' },
          rose: { DEFAULT: '#C98B8B', light: '#DEB5B5', dark: '#9E5E5E' },
          slate: { DEFAULT: '#8A9BA8', light: '#B0BEC8', dark: '#5E7080' },
        },
      },
      boxShadow: {
        'paper-sm': '0 1px 2px rgba(61, 53, 43, 0.08), 0 1px 1px rgba(61, 53, 43, 0.06)',
        'paper-md': '0 4px 6px rgba(61, 53, 43, 0.08), 0 2px 4px rgba(61, 53, 43, 0.06)',
        'paper-lg': '0 10px 15px rgba(61, 53, 43, 0.1), 0 4px 6px rgba(61, 53, 43, 0.08)',
        'paper-xl': '0 20px 25px rgba(61, 53, 43, 0.12), 0 8px 10px rgba(61, 53, 43, 0.08)',
        pressed: 'inset 0 2px 4px rgba(61, 53, 43, 0.15)',
        'ink-sm': '0 1px 2px rgba(26, 25, 23, 0.12)',
        'ink-md': '0 2px 8px rgba(26, 25, 23, 0.12)',
      },
      backgroundImage: {
        'paper-texture':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
        'speckle-texture':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='speckle'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23speckle)' opacity='0.14'/%3E%3C/svg%3E\")",
        'parchment-texture':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.55 0 0 0 0 0.48 0 0 0 0 0.35 0 0 0 0.45 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)' opacity='1'/%3E%3C/svg%3E\")",
        'canvas-weave':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cv'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.62 0 0 0 0 0.60 0 0 0 0 0.52 0 0 0 0.42 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cv)' opacity='1'/%3E%3C/svg%3E\")",
        'kraft-texture':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='k'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.50 0 0 0 0 0.35 0 0 0 0 0.20 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23k)' opacity='1'/%3E%3C/svg%3E\")",
        'marble-texture':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.02' numOctaves='3' seed='8'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='25'/%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.50 0 0 0 0 0.45 0 0 0 0 0.38 0 0 0 0.40 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23EDE7D6' filter='url(%23m)' opacity='1'/%3E%3C/svg%3E\")",
        'ruled-blue-lines':
          'repeating-linear-gradient(180deg, transparent, transparent 31px, rgba(168,200,216,0.35) 31px, rgba(168,200,216,0.35) 32px)',
        'ruled-brown-lines':
          'repeating-linear-gradient(180deg, transparent, transparent 31px, rgba(164,144,120,0.35) 31px, rgba(164,144,120,0.35) 32px)',
        'ruled-black-lines':
          'repeating-linear-gradient(180deg, transparent, transparent 31px, rgba(61,53,43,0.15) 31px, rgba(61,53,43,0.15) 32px)',
        'ruled-blue-grid':
          'repeating-linear-gradient(180deg, transparent, transparent 31px, rgba(168,200,216,0.35) 31px, rgba(168,200,216,0.35) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(168,200,216,0.35) 31px, rgba(168,200,216,0.35) 32px)',
        'ruled-brown-grid':
          'repeating-linear-gradient(180deg, transparent, transparent 31px, rgba(164,144,120,0.35) 31px, rgba(164,144,120,0.35) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(164,144,120,0.35) 31px, rgba(164,144,120,0.35) 32px)',
        'ruled-black-grid':
          'repeating-linear-gradient(180deg, transparent, transparent 31px, rgba(61,53,43,0.15) 31px, rgba(61,53,43,0.15) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(61,53,43,0.15) 31px, rgba(61,53,43,0.15) 32px)',
        'dot-grid': 'radial-gradient(circle, rgba(61, 53, 43, 0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        texture: '200px 200px',
        'ruled-lines': '100% 32px',
        'ruled-grid': '100% 32px, 32px 32px',
      },
    },
  },
};

export default paperPreset;

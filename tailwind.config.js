/** @type {import('tailwindcss').Config} */
import { paperPreset } from './tailwind.ts';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [paperPreset],
};

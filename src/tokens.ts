// Mirrors src/styles/_tokens.scss — that file is the canonical source.
// Exported so component code and consumers can use token values in JS/TS
// instead of hardcoding hex copies that drift.

export const colors = {
  bgBase: '#FDFCF8',
  bgSurface: '#FAF8F0',
  bgElevated: '#F5F1E6',
  bgSidebar: '#F7F3EA',
  bgInput: '#FBF9F4',

  textPrimary: '#1A1917',
  textSecondary: '#68635C',
  textTertiary: '#A8A399',

  accentBlue: '#7C9CC0',
  accentBlueLight: '#AFC6E0',
  accentBlueDark: '#51719B',
  accentGreen: '#8FB996',
  accentGreenLight: '#B5D4BA',
  accentGreenDark: '#5E8A66',
  accentAmber: '#D4A373',
  accentAmberLight: '#E4C9A8',
  accentAmberDark: '#A67B4F',
  accentRose: '#C98B8B',
  accentRoseLight: '#DEB5B5',
  accentRoseDark: '#9E5E5E',
  accentSlate: '#8A9BA8',
  accentSlateLight: '#B0BEC8',
  accentSlateDark: '#5E7080',

  canvasBase: '#F0EAD8',
  canvas300: '#E5DBC4',
  canvasDark: '#D6C9A8',
  canvas700: '#8C7D56',

  chalkboardBg: '#142e22',
  chalkboardSurface: '#1e3a2d',
  chalkboardLight: '#264a3a',
  chalkboardText: '#e8e4d9',
  chalkboardChalk: '#d4e8cb',
  chalkboardMuted: '#a8b5a0',
  chalkboardMutedDim: '#5e7a68',
  chalkboardAccent: '#a8c49a',
  chalkboardRose: '#e8a0a0',
  // Base of the rgba() $chalkboard-border-* / ring tokens (rgb 200, 210, 195).
  chalkboardBorderBase: '#C8D2C3',

  codeBg: '#2B2926',
} as const;

export type PaperColorToken = keyof typeof colors;

/** `withAlpha(colors.accentRose, 0.16)` → `"rgba(201, 139, 139, 0.16)"` */
export function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const space = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
} as const;

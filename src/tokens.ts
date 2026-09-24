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
  accentPurple: '#9B8AB8',
  accentPurpleLight: '#C2B5D8',
  accentPurpleDark: '#6E5F8E',

  canvasBase: '#F0EAD8',
  canvas300: '#E5DBC4',
  canvasDark: '#D6C9A8',
  canvas700: '#8C7D56',

  washBlue: '#DEE4E5',
  washGreen: '#E3EADC',
  washAmber: '#F2E5D5',
  washRose: '#EFE0DA',
  washSlate: '#E1E4E0',

  chalkboardBg: '#142e22',
  chalkboardSurface: '#1e3a2d',
  chalkboardLight: '#264a3a',
  chalkboardText: '#e8e4d9',
  chalkboardChalk: '#d4e8cb',
  chalkboardMuted: '#a8b5a0',
  chalkboardMutedDim: '#5e7a68',
  chalkboardAccent: '#a8c49a',
  chalkboardRose: '#e8a0a0',
  chalkboardBorderBase: '#C8D2C3',
  chalkboardToggleActive: '#3D5A42',

  chalkboardPassFill: '#2d5a3b',
  chalkboardFailFill: '#5a2d2d',
  chalkboardRunningFill: '#5a4a2d',
  chalkboardPassText: '#b5d6b5',
  chalkboardFailText: '#d6a0a0',
  chalkboardRunningText: '#d6c4a0',

  codeBg: '#2B2926',

  sketchInk: '#3D352B',

  borderSubtle: 'rgba(61, 53, 43, 0.08)',
  borderDefault: 'rgba(61, 53, 43, 0.12)',
  borderMedium: 'rgba(61, 53, 43, 0.15)',
  borderStrong: 'rgba(61, 53, 43, 0.2)',

  surfaceTint: 'rgba(61, 53, 43, 0.04)',
  surfaceOverlay: 'rgba(61, 53, 43, 0.06)',

  ghostHoverFill: 'rgba(143, 185, 150, 0.12)',
  ghostActiveFill: 'rgba(143, 185, 150, 0.2)',
  ghostActiveStrong: 'rgba(143, 185, 150, 0.25)',
  ghostActiveHover: 'rgba(143, 185, 150, 0.3)',
  ghostBorder: 'rgba(61, 53, 43, 0.22)',

  primaryWash: 'rgba(143, 185, 150, 0.25)',
  primaryWashHover: 'rgba(143, 185, 150, 0.3)',
  primaryWashActive: 'rgba(143, 185, 150, 0.3)',
  primaryHover: '#E8DEC8',
  primaryActive: '#DDD2B8',
  secondaryHover: '#F5F0E4',
  secondaryActive: '#EDE6D6',
  secondaryWash: 'rgba(61, 53, 43, 0.1)',
  secondaryWashHover: 'rgba(61, 53, 43, 0.14)',
  secondaryWashActive: 'rgba(61, 53, 43, 0.18)',
  dangerHover: '#E8D4D4',
  dangerActive: '#DEC4C4',

  buttonRingStroke: 'rgba(61, 53, 43, 0.35)',
  buttonRingStrokeActive: 'rgba(61, 53, 43, 0.55)',

  toggleActiveBg: 'rgba(143, 185, 150, 0.15)',
  inputFocusBorder: 'rgba(143, 185, 150, 0.5)',
  inputFocusShadow: 'rgba(143, 185, 150, 0.15)',

  overlayLight: 'rgba(255, 255, 255, 0.1)',
  overlayLightBorder: 'rgba(255, 255, 255, 0.15)',

  chalkboardBorder: 'rgba(200, 210, 195, 0.2)',
  chalkboardBorder06: 'rgba(200, 210, 195, 0.06)',
  chalkboardBorder08: 'rgba(200, 210, 195, 0.08)',
  chalkboardBorder12: 'rgba(200, 210, 195, 0.12)',
  chalkboardBorder15: 'rgba(200, 210, 195, 0.15)',
  chalkboardBorder25: 'rgba(200, 210, 195, 0.25)',
  chalkboardRingStroke: 'rgba(200, 210, 195, 0.45)',
  chalkboardRingStrokeActive: 'rgba(200, 210, 195, 0.65)',
  chalkboardRingGhost: 'rgba(200, 210, 195, 0.35)',

  sketchStroke: 'rgba(61, 53, 43, 0.32)',
  sketchStrokeStrong: 'rgba(61, 53, 43, 0.42)',
  sketchStrokeStronger: 'rgba(61, 53, 43, 0.6)',
  sketchStrokeActive: 'rgba(61, 53, 43, 0.7)',
  sketchStrokeMuted: 'rgba(61, 53, 43, 0.15)',
} as const;

export const color = {
  textPrimary: colors.textPrimary,
  textSecondary: colors.textSecondary,

  accentAmber: colors.accentAmber,
  accentAmberDark: colors.accentAmberDark,
  accentGreen: colors.accentGreen,
  accentGreenDark: colors.accentGreenDark,
  accentRose: colors.accentRose,
  accentRoseDark: colors.accentRoseDark,
  accentSlate: colors.accentSlate,
  accentSlateDark: colors.accentSlateDark,
  accentBlue: colors.accentBlue,
  accentBlueDark: colors.accentBlueDark,
  accentPurple: colors.accentPurple,
  accentPurpleDark: colors.accentPurpleDark,

  chalkPass: colors.chalkboardPassFill,
  chalkFail: colors.chalkboardFailFill,
  chalkRunning: colors.chalkboardRunningFill,
  chalkPassText: colors.chalkboardPassText,
  chalkFailText: colors.chalkboardFailText,
  chalkRunningText: colors.chalkboardRunningText,

  textureShade: colors.bgElevated,
} as const;

export const surface = {
  page: { texture: 'paper', shade: true },
  card: { texture: 'parchment', shade: true },
  nestedCard: { texture: 'canvas', shade: true },
} as const satisfies Record<string, { texture: string; shade?: boolean }>;

export const paper = {
  50: '#FDFCF8',
  100: '#FAF8F0',
  200: '#F5F1E6',
  300: '#EDE7D6',
  400: '#E0D6BF',
  500: '#D0C3A5',
  600: '#B8A98A',
  700: '#9A8B6E',
  800: '#7D7058',
  900: '#5E5343',
  950: '#3D352B',
} as const;

export const ink = {
  50: '#F5F4F2',
  100: '#E5E3DF',
  200: '#CBC8C1',
  300: '#A8A399',
  400: '#858077',
  500: '#68635C',
  600: '#504C46',
  700: '#3D3A35',
  800: '#2B2926',
  900: '#1A1917',
  950: '#0D0C0C',
} as const;

export const canvas = {
  50: '#FBF9F4',
  100: '#F7F3EA',
  200: '#F0EAD8',
  300: '#E5DBC4',
  400: '#D6C9A8',
  500: '#C4B48A',
  600: '#A8986E',
  700: '#8C7D56',
  800: '#736744',
  900: '#574E36',
  950: '#383224',
} as const;

export const fontFamily = {
  display: ['Luminari', 'Cormorant Garamond', 'Georgia', 'serif'],
  'display-alt': ['Cinzel Decorative', 'Cormorant Garamond', 'Georgia', 'serif'],
  'display-fantasy': ['Almendra Display', 'Cormorant Garamond', 'Georgia', 'serif'],
  'display-luminari': ['Luminari', 'Cormorant Garamond', 'Georgia', 'serif'],
  serif: ['Cormorant Garamond', 'Georgia', 'serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
  handwritten: ['Caveat', 'cursive'],
  mono: ['JetBrains Mono', 'monospace'],
} as const;

export const fontSize = {
  '3xs': '0.625rem',
  '2xs': '0.6875rem',
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  md: '1.125rem',
  lg: '1.25rem',
  xl: '1.5rem',
  '2xl': '1.875rem',
  '3xl': '2.5rem',
  '4xl': '3.5rem',
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.7,
  grid: '32px',
} as const;

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.03em',
  wider: '0.06em',
} as const;

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '20px',
  xl: '28px',
  full: '9999px',
} as const;

export const shadows = {
  'paper-sm': '0 1px 2px rgba(61, 53, 43, 0.08), 0 1px 1px rgba(61, 53, 43, 0.06)',
  'paper-md': '0 4px 6px rgba(61, 53, 43, 0.08), 0 2px 4px rgba(61, 53, 43, 0.06)',
  'paper-lg': '0 10px 15px rgba(61, 53, 43, 0.1), 0 4px 6px rgba(61, 53, 43, 0.08)',
  'paper-xl': '0 20px 25px rgba(61, 53, 43, 0.12), 0 8px 10px rgba(61, 53, 43, 0.08)',
  pressed: 'inset 0 2px 4px rgba(61, 53, 43, 0.15)',
  'ink-sm': '0 1px 2px rgba(26, 25, 23, 0.12)',
  'ink-md': '0 2px 8px rgba(26, 25, 23, 0.12)',
  'filter-sm': 'drop-shadow(0 1px 2px rgba(61, 53, 43, 0.09))',
  'filter-md':
    'drop-shadow(0 4px 6px rgba(61, 53, 43, 0.1)) drop-shadow(0 1px 2px rgba(61, 53, 43, 0.06))',
  'filter-lg': 'drop-shadow(0 8px 14px rgba(61, 53, 43, 0.14))',
} as const;

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

export type PaperColorToken = keyof typeof colors;

export function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  color,
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  radii,
  shadows,
  space,
  surface,
} from '../src/tokens.ts';

const here = dirname(fileURLToPath(import.meta.url));
const stylesDir = resolve(here, '../src/styles');
const target = resolve(stylesDir, '_tokens.scss');
const colorTarget = resolve(stylesDir, '_color.scss');
const surfaceTarget = resolve(stylesDir, '_surface.scss');

function hexToRgb(hex: string): string {
  const value = hex.replace('#', '');
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function fontStack(family: readonly string[]): string {
  const generics = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui']);
  return family.map((name) => (generics.has(name) ? name : `'${name}'`)).join(', ');
}

const chalkboardBaseRgb = hexToRgb(colors.chalkboardBorderBase);
const sketchInkRgb = hexToRgb(colors.sketchInk);

const out = `// Canonical source of truth for all design tokens.
// tailwind.ts and src/utils/textures.ts derive their values from here.

$color-bg-base: ${colors.bgBase};
$color-bg-surface: ${colors.bgSurface};
$color-bg-elevated: ${colors.bgElevated};
$color-bg-sidebar: ${colors.bgSidebar};
$color-bg-input: ${colors.bgInput};

$color-text-primary: ${colors.textPrimary};
$color-text-secondary: ${colors.textSecondary};
$color-text-tertiary: ${colors.textTertiary};

$color-focus-ring: $color-text-tertiary;

$color-accent-blue: ${colors.accentBlue};
$color-accent-blue-light: ${colors.accentBlueLight};
$color-accent-blue-dark: ${colors.accentBlueDark};
$color-accent-green: ${colors.accentGreen};
$color-accent-green-light: ${colors.accentGreenLight};
$color-accent-green-dark: ${colors.accentGreenDark};
$color-accent-amber: ${colors.accentAmber};
$color-accent-amber-light: ${colors.accentAmberLight};
$color-accent-amber-dark: ${colors.accentAmberDark};
$color-accent-rose: ${colors.accentRose};
$color-accent-rose-light: ${colors.accentRoseLight};
$color-accent-rose-dark: ${colors.accentRoseDark};
$color-accent-slate: ${colors.accentSlate};
$color-accent-slate-light: ${colors.accentSlateLight};
$color-accent-slate-dark: ${colors.accentSlateDark};
$color-accent-purple: ${colors.accentPurple};
$color-accent-purple-light: ${colors.accentPurpleLight};
$color-accent-purple-dark: ${colors.accentPurpleDark};

// Base for every translucent chalkboard border/ring below.
$chalkboard-border-base: ${chalkboardBaseRgb};

$color-chalkboard-bg: ${colors.chalkboardBg};
$color-chalkboard-surface: ${colors.chalkboardSurface};
$color-chalkboard-light: ${colors.chalkboardLight};
$color-chalkboard-text: ${colors.chalkboardText};
$color-chalkboard-chalk: ${colors.chalkboardChalk};
$color-chalkboard-muted: ${colors.chalkboardMuted};
$color-chalkboard-muted-dim: ${colors.chalkboardMutedDim}; // darker muted for code-block syntax (intentional, see N2)
$color-chalkboard-accent: ${colors.chalkboardAccent};
$color-chalkboard-rose: ${colors.chalkboardRose};
$color-chalkboard-border: rgba($chalkboard-border-base, 0.2);
$color-chalkboard-toggle-active: ${colors.chalkboardToggleActive};

$chalkboard-border-06: rgba($chalkboard-border-base, 0.06);
$chalkboard-border-08: rgba($chalkboard-border-base, 0.08);
$chalkboard-border-12: rgba($chalkboard-border-base, 0.12);
$chalkboard-border-15: rgba($chalkboard-border-base, 0.15);
$chalkboard-border-25: rgba($chalkboard-border-base, 0.25);

// Chalkboard button ring strokes
$chalkboard-ring-stroke: rgba($chalkboard-border-base, 0.45);
$chalkboard-ring-stroke-active: rgba($chalkboard-border-base, 0.65);
$chalkboard-ring-ghost: rgba($chalkboard-border-base, 0.35);

$color-canvas-base: ${colors.canvasBase};
$color-canvas-300: ${colors.canvas300};   // kraft texture / island bg (canvas.300 in tailwind) — see N1
$color-canvas-dark: ${colors.canvasDark};  // canvas.400 in tailwind
$color-canvas-700: ${colors.canvas700};   // canvas.700 in tailwind

// Soft accent washes — a pale tint of each accent, for a paper-toned coloured surface
// fill (Card \`fill="rose"\`, etc.). ~22% of the accent mixed over $color-bg-surface.
$color-wash-blue: ${colors.washBlue};
$color-wash-green: ${colors.washGreen};
$color-wash-amber: ${colors.washAmber};
$color-wash-rose: ${colors.washRose};
$color-wash-slate: ${colors.washSlate};

$color-code-bg: ${colors.codeBg};      // dark pre background (ink.800)

$color-border-subtle: ${colors.borderSubtle};
$color-border-default: ${colors.borderDefault};
$color-border-medium: ${colors.borderMedium};
$color-border-strong: ${colors.borderStrong};

$color-surface-tint: ${colors.surfaceTint};
$color-surface-overlay: ${colors.surfaceOverlay};

// Ghost button fills
$ghost-hover-fill: ${colors.ghostHoverFill};
$ghost-active-fill: ${colors.ghostActiveFill};
$ghost-active-strong: ${colors.ghostActiveStrong};
$ghost-active-hover: ${colors.ghostActiveHover};
$ghost-border: ${colors.ghostBorder};

// Button interaction states (primary / secondary / danger hover+active)
// Washes, not paint. An unthemed consumer used to fall back to opaque $color-canvas-base,
// which hides the paper grain the whole system is built on.
$color-primary-wash: ${colors.primaryWash};
$color-primary-wash-hover: ${colors.primaryWashHover};
$color-primary-wash-active: ${colors.primaryWashActive};
$color-primary-hover: ${colors.primaryHover};
$color-primary-active: ${colors.primaryActive};
$color-secondary-hover: ${colors.secondaryHover};
$color-secondary-active: ${colors.secondaryActive};

// Neutral button wash — the ink at low alpha, so the paper grain reads through it the
// way it does under every coloured variant. Replaces the opaque near-white fill.
$color-secondary-wash: ${colors.secondaryWash};
$color-secondary-wash-hover: ${colors.secondaryWashHover};
$color-secondary-wash-active: ${colors.secondaryWashActive};
$color-danger-hover: ${colors.dangerHover};
$color-danger-active: ${colors.dangerActive};

// Button ring strokes
$button-ring-stroke: ${colors.buttonRingStroke};
$button-ring-stroke-active: ${colors.buttonRingStrokeActive};

// Toggle / input cell interaction states
$color-toggle-active-bg: ${colors.toggleActiveBg};
$color-input-focus-border: ${colors.inputFocusBorder};
$color-input-focus-shadow: ${colors.inputFocusShadow};

// Overlay — light-on-dark (used by CopyButton dark variant)
$color-overlay-light: ${colors.overlayLight};
$color-overlay-light-border: ${colors.overlayLightBorder};

$font-family-serif: ${fontStack(fontFamily.serif)};
$font-family-sans: ${fontStack(fontFamily.sans)};
$font-family-display: ${fontStack(fontFamily.display)};
$font-family-handwritten: ${fontStack(fontFamily.handwritten)};
$font-family-mono: ${fontStack(fontFamily.mono)};

// Type scale — base = 1rem = 16px
$font-size-3xs: ${fontSize['3xs']}; // 10px
$font-size-2xs: ${fontSize['2xs']}; // 11px
$font-size-xs: ${fontSize.xs}; // 12px
$font-size-sm: ${fontSize.sm}; // 14px
$font-size-base: ${fontSize.base}; // 16px — body default
$font-size-md: ${fontSize.md}; // 18px
$font-size-lg: ${fontSize.lg}; // 20px
$font-size-xl: ${fontSize.xl}; // 24px
$font-size-2xl: ${fontSize['2xl']}; // 30px
$font-size-3xl: ${fontSize['3xl']}; // 40px
$font-size-4xl: ${fontSize['4xl']}; // 56px

$font-weight-normal: ${fontWeight.normal};
$font-weight-medium: ${fontWeight.medium};
$font-weight-semibold: ${fontWeight.semibold};
$font-weight-bold: ${fontWeight.bold};

$line-height-tight: ${lineHeight.tight};
$line-height-snug: ${lineHeight.snug};
$line-height-normal: ${lineHeight.normal};
$line-height-relaxed: ${lineHeight.relaxed};
$line-height-grid: ${lineHeight.grid};

$letter-spacing-tight: ${letterSpacing.tight};
$letter-spacing-normal: ${letterSpacing.normal};
$letter-spacing-wide: ${letterSpacing.wide};
$letter-spacing-wider: ${letterSpacing.wider};

$space-1: ${space[1]};
$space-2: ${space[2]};
$space-3: ${space[3]};
$space-4: ${space[4]};
$space-5: ${space[5]};
$space-6: ${space[6]};
$space-7: ${space[7]};
$space-8: ${space[8]};
$space-10: ${space[10]};
$space-12: ${space[12]};
$space-14: ${space[14]};
$space-16: ${space[16]};

$radius-sm: ${radii.sm};
$radius-md: ${radii.md};
$radius-lg: ${radii.lg};
$radius-xl: ${radii.xl};
$radius-full: ${radii.full};

$shadow-paper-sm: ${shadows['paper-sm']};
$shadow-paper-md: ${shadows['paper-md']};
$shadow-paper-lg: ${shadows['paper-lg']};
$shadow-pressed: ${shadows.pressed};

// ── Sketch outline (hand-drawn borders) ─────────────────────────────────────
// One place to re-tint every SketchBorder pencil line. All components set
// --sketch-stroke from these; accent-tinted states (focus/error/variant) layer
// their own accent colour on top. $color-sketch-stroke is also emitted as the
// runtime --pui-sketch-stroke in globals.scss for theming.
$color-sketch-ink: ${sketchInkRgb}; // pencil base (#3D352B)
$color-sketch-stroke: rgba($color-sketch-ink, 0.32); // resting (surfaces / fields)
$color-sketch-stroke-strong: rgba($color-sketch-ink, 0.42); // hover · control resting
$color-sketch-stroke-stronger: rgba($color-sketch-ink, 0.6); // control hover
$color-sketch-stroke-active: rgba($color-sketch-ink, 0.7); // checked / pressed
$color-sketch-stroke-muted: rgba($color-sketch-ink, 0.15); // disabled

// filter: drop-shadow equivalents — for sketch-clipped surfaces, where these
// hug the wobbly silhouette instead of the rectangular box-shadow border-box.
$filter-shadow-sm: ${shadows['filter-sm']};
$filter-shadow-md: ${shadows['filter-md']};
$filter-shadow-lg: ${shadows['filter-lg']};
$shadow-ink-sm: ${shadows['ink-sm']};

// Watercolor blob tokens
$watercolor-blur-sm: 40px;
$watercolor-blur-lg: 60px;

$transition-fast: 150ms ease-out;
$transition-base: 200ms ease-out;
$transition-slow: 300ms ease-out;

// Ordered lightest to darkest, matching PaperTextureKey in utils/textures.ts.
$paper-texture-data-uri: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E";
$speckle-texture-data-uri: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='speckle'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23speckle)' opacity='0.14'/%3E%3C/svg%3E";
$parchment-texture-data-uri: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='par'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.55 0 0 0 0 0.48 0 0 0 0 0.35 0 0 0 0.45 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23par)' opacity='1'/%3E%3C/svg%3E";
$canvas-texture-data-uri: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cv'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.62 0 0 0 0 0.60 0 0 0 0 0.52 0 0 0 0.42 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cv)' opacity='1'/%3E%3C/svg%3E";
$kraft-texture-data-uri: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='k'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.50 0 0 0 0 0.35 0 0 0 0 0.20 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23k)' opacity='1'/%3E%3C/svg%3E";
$chalkboard-texture-data-uri: "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.15 0 0 0 0 0.28 0 0 0 0 0.20 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)' opacity='1'/%3E%3C/svg%3E";

$z-base: 0;
$z-dropdown: 100;
$z-sticky: 200;
$z-overlay: 250;
$z-fixed: 300;
$z-modal-backdrop: 400;
$z-modal: 500;
$z-popover: 600;
$z-tooltip: 700;
$z-toast: 800;
`;

const colorOut = `// Runtime color mirrors — emitted from the \`color\` object in src/tokens.ts
// so SCSS consumers can reference the same semantic values as the runtime.

${Object.entries(color)
  .map(([key, value]) => `$color-${kebab(key)}: ${value};`)
  .join('\n')}
`;

const surfaceEntries = Object.entries(surface).map(([key, value]) => {
  const fields = Object.entries(value)
    .map(([k, v]) => `  ${kebab(k)}: ${typeof v === 'string' ? `'${v}'` : v},`)
    .join('\n');
  return `$surface-${kebab(key)}: (\n${fields}\n);`;
});
const surfaceOut = `// Named app surfaces — emitted from the \`surface\` object in src/tokens.ts
// so SCSS consumers can read the same page/card/nestedCard configs as the runtime.

${surfaceEntries.join('\n\n')}
`;

function kebab(s: string): string {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

const check = process.argv.includes('--check');

if (check) {
  const files: Array<[string, string, string]> = [
    [target, out, 'tokens'],
    [colorTarget, colorOut, 'color'],
    [surfaceTarget, surfaceOut, 'surface'],
  ];
  let failed = false;
  for (const [path, expected, name] of files) {
    if (!existsSync(path)) {
      console.error(`error: ${path} does not exist — run \`pnpm tokens\` first`);
      failed = true;
      continue;
    }
    const current = readFileSync(path, 'utf8');
    if (current !== expected) {
      console.error(`error: ${path} is out of date — run \`pnpm tokens\` to regenerate`);
      failed = true;
    }
  }
  if (failed) process.exit(1);
  console.log('tokens: in sync');
} else {
  writeFileSync(target, out);
  console.log(`tokens: wrote ${target}`);
  writeFileSync(colorTarget, colorOut);
  console.log(`tokens: wrote ${colorTarget}`);
  writeFileSync(surfaceTarget, surfaceOut);
  console.log(`tokens: wrote ${surfaceTarget}`);
}

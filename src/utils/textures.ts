import { colors } from '../tokens';

// Ordered lightest to darkest — this order drives the texture swatch pickers.
export type PaperTextureKey =
  | 'white'
  | 'paper'
  | 'speckle'
  | 'parchment'
  | 'canvas'
  | 'kraft'
  | 'chalkboard';

export type RuledType = 'none' | 'lines' | 'grid';
export type RuledColorKey = 'blue' | 'brown' | 'black';

export interface TextureConfig {
  texture?: PaperTextureKey;
  ruledType?: RuledType;
  ruledColor?: RuledColorKey;
}

/** A texture as a bare name (`"parchment"`) or a config object, which may also carry `fill`/`shade`. */
export type Texture = PaperTextureKey | SurfaceConfig;

/** The value a component's `texture` prop accepts: a texture, or `true`/`false` to toggle the default. */
export type TextureProp = boolean | Texture;

/** A surface: a texture grain plus an optional explicit fill colour / darker shade. */
export interface SurfaceConfig extends TextureConfig {
  /** Explicit palette fill; overrides the texture's own base colour. The grain stays. */
  fill?: SurfaceFillKey;
  /** Use the texture's darker step as the fill. Ignored when `fill` is set. */
  shade?: boolean;
}

export const textureMap: Record<PaperTextureKey, string> = {
  white:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.97 0 0 0 0 0.96 0 0 0 0 0.95 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)' opacity='1'/%3E%3C/svg%3E\")",
  paper:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
  speckle:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='speckle'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23speckle)' opacity='0.14'/%3E%3C/svg%3E\")",
  parchment:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='par'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.55 0 0 0 0 0.48 0 0 0 0 0.35 0 0 0 0.45 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23par)' opacity='1'/%3E%3C/svg%3E\")",
  canvas:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cv'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.62 0 0 0 0 0.60 0 0 0 0 0.52 0 0 0 0.42 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cv)' opacity='1'/%3E%3C/svg%3E\")",
  kraft:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='k'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.50 0 0 0 0 0.35 0 0 0 0 0.20 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23k)' opacity='1'/%3E%3C/svg%3E\")",
  chalkboard:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.15 0 0 0 0 0.28 0 0 0 0 0.20 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)' opacity='1'/%3E%3C/svg%3E\")",
};

export const textureColorMap: Record<PaperTextureKey, string> = {
  white: colors.bgBase,
  paper: colors.bgSurface,
  speckle: colors.bgSurface,
  parchment: colors.bgElevated,
  canvas: colors.canvasBase,
  kraft: colors.canvas300,
  chalkboard: colors.chalkboardBg,
};

// A shade darker than each texture's base colour, for supportive surfaces that
// should sit just below the body on the same paper — e.g. a table's header row.
export const textureShadeMap: Record<PaperTextureKey, string> = {
  white: colors.bgElevated,
  paper: colors.bgElevated,
  speckle: colors.bgElevated,
  parchment: colors.canvasBase,
  canvas: colors.canvas300,
  kraft: colors.canvasDark,
  // Chalkboard is already the darkest surface and has no darker token; keep its
  // base so headers stay on-palette rather than inventing an off-token shade.
  chalkboard: colors.chalkboardBg,
};

// Palette colours assignable as a surface fill, independent of the texture grain:
// paper neutrals, the canvas ramp, and the soft accent washes.
export const surfaceFillMap = {
  base: colors.bgBase,
  surface: colors.bgSurface,
  elevated: colors.bgElevated,
  canvas: colors.canvasBase,
  canvasDark: colors.canvasDark,
  blue: colors.washBlue,
  green: colors.washGreen,
  amber: colors.washAmber,
  rose: colors.washRose,
  slate: colors.washSlate,
} satisfies Record<string, string>;

export type SurfaceFillKey = keyof typeof surfaceFillMap;

export const ruledColorMap: Record<RuledColorKey, string> = {
  blue: 'rgba(168, 200, 216, 0.35)',
  brown: 'rgba(164, 144, 120, 0.35)',
  black: 'rgba(61, 53, 43, 0.15)',
};

/**
 * Resolves a surface (texture grain + optional fill / shade) to background styles.
 * The fill colour is chosen in priority order: explicit `fill`, then `shade` (the
 * texture's darker step), then the texture's own base colour.
 */
export function getSurfaceStyles(input: PaperTextureKey | SurfaceConfig): React.CSSProperties {
  const config: SurfaceConfig = typeof input === 'string' ? { texture: input } : input;
  const texture = config.texture ?? 'paper';
  const ruledType = config.ruledType ?? 'none';
  const ruledColor = config.ruledColor ?? 'blue';

  const bgImage = textureMap[texture];
  const bgColor = config.fill
    ? surfaceFillMap[config.fill]
    : config.shade
      ? textureShadeMap[texture]
      : textureColorMap[texture];
  const lineColor = ruledColorMap[ruledColor];

  // Published to the subtree so supportive surfaces (e.g. a table header) can sit a
  // shade below the body on this same texture without hardcoding a colour.
  const shadeVars = {
    '--pui-texture-shade': textureShadeMap[texture],
    '--pui-texture-image': bgImage,
  } as React.CSSProperties;

  if (ruledType === 'none') {
    return {
      ...shadeVars,
      backgroundColor: bgColor,
      backgroundImage: bgImage,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px',
    };
  }

  if (ruledType === 'lines') {
    return {
      ...shadeVars,
      backgroundColor: bgColor,
      backgroundImage: `${bgImage}, repeating-linear-gradient(180deg, transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px)`,
      backgroundRepeat: 'repeat, repeat',
      backgroundSize: '200px 200px, 100% 32px',
    };
  }

  return {
    ...shadeVars,
    backgroundColor: bgColor,
    backgroundImage: `${bgImage}, repeating-linear-gradient(180deg, transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px)`,
    backgroundRepeat: 'repeat, repeat, repeat',
    backgroundSize: '200px 200px, 100% 32px, 32px 32px',
  };
}

/** Texture-only surface styles. Thin alias over {@link getSurfaceStyles}. */
export function getTextureStyles(input: Texture): React.CSSProperties {
  return getSurfaceStyles(input);
}

/**
 * Resolves a component `texture` prop to background styles.
 * - `false` → no texture (`undefined`)
 * - `true` → the component's default texture (`fallback`)
 * - a name or config → that texture
 */
export function resolveTexture(
  value: TextureProp,
  fallback: Texture = 'paper',
): React.CSSProperties | undefined {
  if (value === false) return undefined;
  return getTextureStyles(value === true ? fallback : value);
}

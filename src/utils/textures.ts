export type PaperTextureKey =
  | 'white'
  | 'paper'
  | 'parchment'
  | 'kraft'
  | 'speckle'
  | 'canvas'
  | 'chalkboard';

export type RuledType = 'none' | 'lines' | 'grid';
export type RuledColorKey = 'blue' | 'brown' | 'black';

export interface TextureConfig {
  texture?: PaperTextureKey;
  ruledType?: RuledType;
  ruledColor?: RuledColorKey;
}

export const textureMap: Record<PaperTextureKey, string> = {
  paper:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
  parchment:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='par'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.55 0 0 0 0 0.48 0 0 0 0 0.35 0 0 0 0.45 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23par)' opacity='1'/%3E%3C/svg%3E\")",
  kraft:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='k'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.50 0 0 0 0 0.35 0 0 0 0 0.20 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23k)' opacity='1'/%3E%3C/svg%3E\")",
  white:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.97 0 0 0 0 0.96 0 0 0 0 0.95 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)' opacity='1'/%3E%3C/svg%3E\")",
  speckle:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='speckle'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23speckle)' opacity='0.06'/%3E%3C/svg%3E\")",
  canvas:
    'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(61, 53, 43, 0.06) 3px, rgba(61, 53, 43, 0.06) 3.8px, transparent 3.8px, transparent 6.5px, rgba(61, 53, 43, 0.035) 6.5px, rgba(61, 53, 43, 0.035) 7px), repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(61, 53, 43, 0.045) 4px, rgba(61, 53, 43, 0.045) 4.8px, transparent 4.8px, transparent 7.5px, rgba(61, 53, 43, 0.025) 7.5px, rgba(61, 53, 43, 0.025) 8px)',
  chalkboard:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.15 0 0 0 0 0.28 0 0 0 0 0.20 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)' opacity='1'/%3E%3C/svg%3E\")",
};

// Color values here must match _tokens.scss — that file is the canonical source.
export const textureColorMap: Record<PaperTextureKey, string> = {
  paper: '#FAF8F0',      // $color-bg-surface
  parchment: '#F5F1E6',  // $color-bg-elevated
  kraft: '#E5DBC4',      // $color-canvas-300
  white: '#FDFCF8',      // $color-bg-base (was #FDFCFA — corrected)
  speckle: '#FAF8F0',    // $color-bg-surface
  canvas: '#F0EAD8',     // $color-canvas-base
  chalkboard: '#142e22', // $color-chalkboard-bg
};

export const ruledColorMap: Record<RuledColorKey, string> = {
  blue: 'rgba(168, 200, 216, 0.35)',
  brown: 'rgba(164, 144, 120, 0.35)',
  black: 'rgba(61, 53, 43, 0.15)',
};

export function getTextureStyles(config: TextureConfig): React.CSSProperties {
  const texture = config.texture ?? 'paper';
  const ruledType = config.ruledType ?? 'none';
  const ruledColor = config.ruledColor ?? 'blue';

  const bgImage = textureMap[texture];
  const bgColor = textureColorMap[texture];
  const lineColor = ruledColorMap[ruledColor];

  if (ruledType === 'none') {
    return {
      backgroundColor: bgColor,
      backgroundImage: bgImage,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px',
    };
  }

  if (ruledType === 'lines') {
    return {
      backgroundColor: bgColor,
      backgroundImage: `${bgImage}, repeating-linear-gradient(180deg, transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px)`,
      backgroundRepeat: 'repeat, repeat',
      backgroundSize: '200px 200px, 100% 32px',
    };
  }

  return {
    backgroundColor: bgColor,
    backgroundImage: `${bgImage}, repeating-linear-gradient(180deg, transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px)`,
    backgroundRepeat: 'repeat, repeat, repeat',
    backgroundSize: '200px 200px, 100% 32px, 32px 32px',
  };
}

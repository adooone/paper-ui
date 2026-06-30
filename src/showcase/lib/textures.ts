import {
  type PaperTextureKey,
  type RuledColorKey,
  type RuledType,
  type TextureConfig,
  ruledColorMap,
  textureColorMap,
  textureMap,
} from '../../utils/textures';

export type { PaperTextureKey, RuledColorKey, RuledType, TextureConfig };

export interface PaperTexture {
  key: PaperTextureKey;
  name: string;
  bg: string;
  color: string;
}

const textureNames: Record<PaperTextureKey, string> = {
  white: 'White Paper',
  paper: 'Paper',
  parchment: 'Parchment',
  kraft: 'Kraft',
  speckle: 'Speckle',
  canvas: 'Canvas',
  chalkboard: 'Chalkboard',
};

export const textures: PaperTexture[] = (Object.keys(textureMap) as PaperTextureKey[]).map(
  (key) => ({
    key,
    name: textureNames[key],
    bg: textureMap[key],
    color: textureColorMap[key],
  }),
);

export interface RuledColor {
  key: RuledColorKey;
  name: string;
  value: string;
}

const ruledColorNames: Record<RuledColorKey, string> = {
  blue: 'Blue',
  brown: 'Brown',
  black: 'Black',
};

export const ruledColors: RuledColor[] = (Object.keys(ruledColorMap) as RuledColorKey[]).map(
  (key) => ({
    key,
    name: ruledColorNames[key],
    value: ruledColorMap[key],
  }),
);

export function getTextureByKey(key: string): PaperTexture | undefined {
  return textures.find((t) => t.key === key);
}

export function getRuledColorByKey(key: string): RuledColor | undefined {
  return ruledColors.find((c) => c.key === key);
}

export function buildTextureStyles(config: TextureConfig) {
  const texture = config.texture ? getTextureByKey(config.texture) : undefined;
  const color = config.ruledColor ? getRuledColorByKey(config.ruledColor) : undefined;
  if (!texture) return {};

  const lineColor = color?.value ?? 'rgba(168, 200, 216, 0.35)';

  if (config.ruledType === 'none') {
    return {
      backgroundColor: texture.color,
      backgroundImage: texture.bg,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px',
    };
  }

  if (config.ruledType === 'lines') {
    return {
      backgroundColor: texture.color,
      backgroundImage: `${texture.bg}, repeating-linear-gradient(180deg, transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px)`,
      backgroundRepeat: 'repeat, repeat',
      backgroundSize: '200px 200px, 100% 32px',
    };
  }

  return {
    backgroundColor: texture.color,
    backgroundImage: `${texture.bg}, repeating-linear-gradient(180deg, transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px)`,
    backgroundRepeat: 'repeat, repeat, repeat',
    backgroundSize: '200px 200px, 100% 32px, 32px 32px',
  };
}

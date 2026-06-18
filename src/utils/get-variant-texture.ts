import { getTextureStyles, type TextureConfig } from './textures';
import type React from 'react';

export function getVariantTexture(variant?: string, texture?: TextureConfig): React.CSSProperties {
  if (texture) return getTextureStyles(texture);
  if (variant === 'chalkboard') return getTextureStyles({ texture: 'chalkboard', ruledType: 'none' });
  return getTextureStyles({ texture: 'paper', ruledType: 'none' });
}

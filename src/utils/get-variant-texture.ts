import type React from 'react';
import { type TextureConfig, getTextureStyles } from './textures';

export function getVariantTexture(variant?: string, texture?: TextureConfig): React.CSSProperties {
  if (texture) return getTextureStyles(texture);
  if (variant === 'chalkboard')
    return getTextureStyles({ texture: 'chalkboard', ruledType: 'none' });
  return getTextureStyles({ texture: 'paper', ruledType: 'none' });
}

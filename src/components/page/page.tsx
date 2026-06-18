import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { createAccentClassMap } from '../../utils/accent-class-map';
import { getTextureStyles, type TextureConfig } from '../../utils/textures';
import styles from './page.module.scss';

export interface PageProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  withTexture?: boolean;
  texture?: TextureConfig;
  withAccent?: boolean;
  accentColor?: 'blue' | 'green' | 'amber' | 'rose' | 'slate';
}

const accentClassMap = createAccentClassMap(styles);

export function Page({
  children,
  className,
  style,
  withTexture = true,
  texture,
  withAccent = false,
  accentColor = 'blue',
}: PageProps) {
  const textureStyles = texture
    ? getTextureStyles(texture)
    : withTexture
      ? getTextureStyles({ texture: 'white', ruledType: 'lines', ruledColor: 'blue' })
      : { backgroundColor: 'var(--pui-bg-base)' };

  return (
    <div
      className={cn(
        styles.page,
        withAccent && styles.withAccent,
        withAccent && accentClassMap[accentColor],
        className,
      )}
      style={{ ...textureStyles, ...style }}
    >
      {children}
    </div>
  );
}

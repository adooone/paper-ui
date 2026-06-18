import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { createAccentClassMap } from '../../utils/accent-class-map';
import { textureMap, textureColorMap, type PaperTextureKey } from '../../utils/textures';
import styles from './card.module.scss';

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'chalkboard';
  texture?: PaperTextureKey;
  accent?: boolean;
  accentColor?: 'blue' | 'green' | 'amber' | 'rose' | 'slate';
  className?: string;
}

const accentClassMap = createAccentClassMap(styles);

export function Card({
  children,
  variant = 'default',
  texture = 'parchment',
  accent = false,
  accentColor = 'blue',
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        styles.borderLayer,
        styles[variant],
        accent && styles.withAccent,
        accent && accentClassMap[accentColor],
        className,
      )}
    >
      <div
        className={styles.textureLayer}
        style={variant === 'chalkboard' ? undefined : {
          backgroundColor: textureColorMap[texture],
          backgroundImage: textureMap[texture],
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      >
        {children}
      </div>
    </div>
  );
}
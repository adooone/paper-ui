import type { ReactNode } from 'react';
import { createAccentClassMap } from '../../utils/accent-class-map';
import { cn } from '../../utils/style-helpers';
import { type TextureProp, resolveTexture } from '../../utils/textures';
import { SketchBorder } from '../sketch-border';
import styles from './card.module.scss';

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated';
  surface?: 'paper' | 'chalkboard';
  size?: 'small' | 'medium';
  texture?: TextureProp;
  accent?: boolean;
  accentColor?: 'blue' | 'green' | 'amber' | 'rose' | 'slate';
  className?: string;
}

const accentClassMap = createAccentClassMap(styles);

export function Card({
  children,
  variant = 'default',
  surface = 'paper',
  size = 'medium',
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
        surface === 'chalkboard' && styles.chalkboard,
        styles[size],
        accent && styles.withAccent,
        accent && accentClassMap[accentColor],
        className,
      )}
    >
      <SketchBorder clip radius={12} inset={3} roughness={1.4} strokeWidth={1.4} />
      <div
        className={styles.textureLayer}
        style={surface === 'chalkboard' ? undefined : resolveTexture(texture)}
      >
        {children}
      </div>
    </div>
  );
}

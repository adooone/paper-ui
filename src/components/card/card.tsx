import type { ReactNode } from 'react';
import { createAccentClassMap } from '../../utils/accent-class-map';
import { cn } from '../../utils/style-helpers';
import { type TextureProp, resolveTexture } from '../../utils/textures';
import { SketchBorder, sketchOutline } from '../sketch-border';
import styles from './card.module.scss';

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated';
  surface?: 'paper' | 'chalkboard';
  size?: 'small' | 'medium';
  texture?: TextureProp;
  accent?: boolean;
  accentColor?: 'blue' | 'green' | 'amber' | 'rose' | 'slate';
  /** Draw the hand-drawn wobble outline. Off by default — a clean, flat-edged card. */
  sketch?: boolean;
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
  sketch = false,
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
        !sketch && styles.flat,
        className,
      )}
    >
      {sketch && <SketchBorder clip {...sketchOutline.surface} />}
      <div
        className={styles.textureLayer}
        style={surface === 'chalkboard' ? undefined : resolveTexture(texture)}
      >
        {children}
      </div>
    </div>
  );
}

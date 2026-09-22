import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { createAccentClassMap } from '../../utils/accent-class-map';
import { cn } from '../../utils/style-helpers';
import { type SurfaceFillKey, type TextureProp, getSurfaceStyles } from '../../utils/textures';
import { SketchBorder, sketchOutline } from '../sketch-border';
import styles from './card.module.scss';

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated';
  surface?: 'paper' | 'chalkboard';
  size?: 'small' | 'medium';
  texture?: TextureProp;
  /** Explicit palette fill for the surface; overrides the texture's own colour, grain stays. */
  fill?: SurfaceFillKey;
  /** Fill with the texture's darker step instead of its base. Ignored when `fill` is set. */
  shade?: boolean;
  accent?: boolean;
  accentColor?: 'blue' | 'green' | 'amber' | 'rose' | 'slate';
  /** Draw the hand-drawn wobble outline. Off by default — a clean, flat-edged card. */
  sketch?: boolean;
  /**
   * Render the surface as one hit target. The card keeps its look but gains
   * `role="button"`, Enter/Space activation and a focus ring; children may
   * still contain their own buttons (those stay inside the card and don't
   * bubble activation to the card click).
   */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  /** Tooltip / a11y label for the card when used as a single hit target. */
  ariaLabel?: string;
  className?: string;
}

const accentClassMap = createAccentClassMap(styles);

export function Card({
  children,
  variant = 'default',
  surface = 'paper',
  size = 'medium',
  texture = 'parchment',
  fill,
  shade = false,
  accent = false,
  accentColor = 'blue',
  sketch = false,
  onClick,
  ariaLabel,
  className,
}: CardProps) {
  const surfaceStyle =
    surface === 'chalkboard' || texture === false
      ? undefined
      : getSurfaceStyles({
          ...(texture === true || typeof texture === 'string'
            ? { texture: texture === true ? 'parchment' : texture }
            : texture),
          ...(fill ? { fill } : {}),
          ...(shade ? { shade } : {}),
        });

  const isPressable = !!onClick;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      role={isPressable ? 'button' : undefined}
      tabIndex={isPressable ? 0 : undefined}
      aria-label={isPressable ? ariaLabel : undefined}
      onClick={onClick}
      onKeyDown={isPressable ? handleKeyDown : undefined}
      className={cn(
        styles.borderLayer,
        styles[variant],
        surface === 'chalkboard' && styles.chalkboard,
        styles[size],
        accent && styles.withAccent,
        accent && accentClassMap[accentColor],
        !sketch && styles.flat,
        isPressable && styles.pressable,
        className,
      )}
    >
      <SketchBorder clip {...sketchOutline.surface} straight={!sketch} />
      <div className={styles.textureLayer} style={surfaceStyle}>
        {children}
      </div>
    </div>
  );
}

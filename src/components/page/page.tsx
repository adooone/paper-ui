import type { CSSProperties, ReactNode } from 'react';
import { createAccentClassMap } from '../../utils/accent-class-map';
import { cn } from '../../utils/style-helpers';
import { type TextureProp, resolveTexture } from '../../utils/textures';
import { SketchBorder, sketchOutline } from '../sketch-border';
import styles from './page.module.scss';

export interface PageProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  texture?: TextureProp;
  withAccent?: boolean;
  accentColor?: 'blue' | 'green' | 'amber' | 'rose' | 'slate';
  rounded?: 'all' | 'top' | 'none';
  /**
   * Draw a hand-drawn sketch outline around the page, like Card. The wobbly
   * silhouette shape (and its drop-shadow) is always applied; this just makes
   * the pencil line visible.
   */
  outline?: boolean;
}

const accentClassMap = createAccentClassMap(styles);

// The silhouette uses a single radius for all four corners, so `top`/`none`
// only trade a rounder edge for a sharper one — they can't square just the
// bottom the way the old CSS border-radius could.
const cornerRadius = { all: 14, top: 14, none: 2 } as const;

export function Page({
  children,
  className,
  style,
  texture = true,
  withAccent = false,
  accentColor = 'blue',
  rounded = 'all',
  outline = false,
}: PageProps) {
  const textureStyles = resolveTexture(texture, {
    texture: 'white',
    ruledType: 'lines',
    ruledColor: 'blue',
  }) ?? { backgroundColor: 'var(--pui-bg-base)' };

  return (
    // `style`/`className` apply to the frame — the element that owns the page's
    // box (max-width, margin, height), so consumers can override those (e.g. a
    // full-bleed dashboard setting `maxWidth: 'none'`). The texture belongs to
    // the inner surface, since that's the layer clipped to the sketchy edge.
    <div
      className={cn(
        styles.page,
        outline && styles.outlined,
        withAccent && styles.withAccent,
        withAccent && accentClassMap[accentColor],
        className,
      )}
      style={style}
    >
      {/* Keep the default strokeInset: on a full-bleed page the outline sits at
          the box edge, where straddling the clip silhouette (and any consumer
          overflow:hidden ancestor) eats parts of the thin stroke — the same
          reason Card keeps its outline safely inside. */}
      <SketchBorder clip {...sketchOutline.surface} radius={cornerRadius[rounded]} />
      <div className={styles.surface} style={textureStyles}>
        {children}
      </div>
    </div>
  );
}

import { cn } from '../../utils/style-helpers';
import { SketchBorder } from '../sketch-border';
import styles from './avatar.module.scss';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  shape?: 'circle' | 'square';
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

const accentPalette = ['blue', 'green', 'amber', 'rose', 'slate'] as const;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts.at(0) ?? '';
  const last = parts.length > 1 ? parts.at(-1) : undefined;
  return last ? `${first[0]}${last[0]}`.toUpperCase() : first.slice(0, 2).toUpperCase();
}

function getAccent(seed: string): (typeof accentPalette)[number] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return accentPalette[hash % accentPalette.length] ?? 'slate';
}

export function Avatar({
  src,
  alt,
  name = '',
  size = 'medium',
  shape = 'circle',
  surface = 'paper',
  className,
}: AvatarProps) {
  const initials = getInitials(name);
  const accent = getAccent(name || 'paper-ui');

  return (
    <span
      className={cn(
        styles.avatar,
        styles[size],
        styles[shape],
        !src && styles[accent],
        surface === 'chalkboard' && styles.chalkboard,
        className,
      )}
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : alt || name || undefined}
    >
      <SketchBorder
        smooth
        clip
        shape={shape === 'circle' ? 'circle' : 'rect'}
        radius={6}
        inset={2}
        roughness={0.5}
        bowing={0.6}
        strokeWidth={1.2}
      />
      <span className={styles.surface}>
        {src ? (
          <img className={styles.image} src={src} alt={alt ?? name} />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </span>
    </span>
  );
}

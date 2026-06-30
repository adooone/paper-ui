import type { ReactNode } from 'react';
import { useBlobPaths } from '../../hooks/use-blob-paths';
import { cn } from '../../utils/style-helpers';
import styles from './icon.module.scss';

export interface IconProps {
  icon: ReactNode;
  size?: 'small' | 'medium' | 'large';
  wobble?: number;
  fillColor?: string;
  className?: string;
}

const sizeMap = { small: 20, medium: 24, large: 28 };

export function Icon({ icon, size = 'medium', wobble = 0.5, fillColor, className }: IconProps) {
  const paths = useBlobPaths(wobble);
  const px = sizeMap[size];

  return (
    <span className={cn(styles.icon, styles[size], className)}>
      <svg
        className={styles.blobBg}
        viewBox="-10 -10 120 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={paths.blob}
          className={styles.blobFill}
          style={fillColor ? { fill: fillColor } : undefined}
        />
        <path d={paths.ring} className={styles.blobRing} />
      </svg>
      <span className={styles.content} style={{ width: px, height: px }}>
        {icon}
      </span>
    </span>
  );
}

import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './text.module.scss';

export type TextTone = 'primary' | 'secondary' | 'muted' | 'faint';
export type TextFace = 'serif' | 'sans' | 'handwritten' | 'mono' | 'display';
export type TextSize = '3xs' | '2xs' | 'xs' | 'sm' | 'base' | 'md' | 'lg';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TextProps {
  children?: ReactNode;
  tone?: TextTone;
  face?: TextFace;
  size?: TextSize;
  weight?: TextWeight;
  truncate?: boolean;
  noWrap?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function Text({
  children,
  tone = 'primary',
  face = 'serif',
  size = 'base',
  weight = 'normal',
  truncate = false,
  noWrap = false,
  as,
  className,
  style,
}: TextProps) {
  const Component = (as ?? 'span') as ElementType;

  return (
    <Component
      className={cn(
        styles.text,
        styles[`face-${face}`],
        styles[`size-${size}`],
        styles[`weight-${weight}`],
        styles[`tone-${tone}`],
        truncate && styles.truncate,
        noWrap && styles.noWrap,
        className,
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

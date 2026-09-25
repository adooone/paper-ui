import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './text.module.scss';

function key(prefix: string, value: string) {
  const words = `${prefix}-${value}`.match(/[a-zA-Z]+|[0-9]+/g) ?? [];
  return words
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('');
}

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
        styles[key('face', face)],
        styles[key('size', size)],
        styles[key('weight', weight)],
        styles[key('tone', tone)],
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

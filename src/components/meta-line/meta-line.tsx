import type { CSSProperties, ElementType } from 'react';
import { Text } from '../text';
import type { TextProps } from '../text';

export interface MetaLineProps {
  children?: TextProps['children'];
  size?: '2xs' | 'xs' | 'sm' | 'base';
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function MetaLine({ children, size = 'base', as, className, style }: MetaLineProps) {
  return (
    <Text
      as={as}
      face="handwritten"
      size={size}
      tone="faint"
      noWrap
      className={className}
      style={style}
    >
      {children}
    </Text>
  );
}

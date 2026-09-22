import type { CSSProperties, ElementType } from 'react';
import { Text } from '../text';
import type { TextProps } from '../text';

export interface MetaLineProps {
  children?: TextProps['children'];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function MetaLine({ children, as, className, style }: MetaLineProps) {
  return (
    <Text
      as={as}
      face="handwritten"
      size="sm"
      tone="faint"
      noWrap
      className={className}
      style={style}
    >
      {children}
    </Text>
  );
}

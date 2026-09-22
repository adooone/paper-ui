import type { CSSProperties, ElementType } from 'react';
import { Text } from '../text';
import type { TextProps } from '../text';

export interface LabelProps {
  children?: TextProps['children'];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function Label({ children, as, className, style }: LabelProps) {
  return (
    <Text
      as={as}
      face="handwritten"
      size="xs"
      weight="semibold"
      tone="faint"
      className={className}
      style={style}
    >
      {children}
    </Text>
  );
}

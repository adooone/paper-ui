import type { CSSProperties, ElementType } from 'react';
import { Text } from '../text';
import type { TextProps } from '../text';

export interface SectionHeadingProps {
  children?: TextProps['children'];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function SectionHeading({ children, as, className, style }: SectionHeadingProps) {
  return (
    <Text
      as={as}
      face="display"
      size="sm"
      weight="semibold"
      tone="muted"
      className={className}
      style={style}
    >
      {children}
    </Text>
  );
}

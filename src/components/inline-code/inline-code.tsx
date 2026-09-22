import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { Text } from '../text';
import styles from './inline-code.module.scss';

export interface InlineCodeProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function InlineCode({ children, className, style }: InlineCodeProps) {
  return (
    <Text
      as="code"
      face="mono"
      size="sm"
      className={cn(styles.inlineCode, className)}
      style={style}
    >
      {children}
    </Text>
  );
}

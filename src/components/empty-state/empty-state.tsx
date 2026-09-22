import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { Text } from '../text';
import styles from './empty-state.module.scss';

export interface EmptyStateProps {
  message: ReactNode;
  illustration?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function EmptyState({ message, illustration, className, style }: EmptyStateProps) {
  return (
    <div className={cn(styles.emptyState, className)} style={style}>
      {illustration != null && <div className={styles.illustration}>{illustration}</div>}
      <Text as="p" face="serif" size="md" tone="secondary">
        {message}
      </Text>
    </div>
  );
}

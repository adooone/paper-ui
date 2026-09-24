import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { Text } from '../text';
import styles from './empty-state.module.scss';

export interface EmptyStateProps {
  message: ReactNode;
  illustration?: ReactNode;
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function EmptyState({ message, illustration, action, className, style }: EmptyStateProps) {
  return (
    <div className={cn(styles.emptyState, className)} style={style}>
      {illustration != null && <div className={styles.illustration}>{illustration}</div>}
      <Text as="p" face="handwritten" size="base" style={{ opacity: 0.6 }}>
        {message}
      </Text>
      {action}
    </div>
  );
}

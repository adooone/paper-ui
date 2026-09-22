import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { Label } from '../label';
import { Text } from '../text';
import styles from './facts-grid.module.scss';

export interface FactItem {
  label: ReactNode;
  value: ReactNode;
}

export interface FactsGridProps {
  items: FactItem[];
  className?: string;
  style?: CSSProperties;
}

export function FactsGrid({ items, className, style }: FactsGridProps) {
  return (
    <div className={cn(styles.grid, className)} style={style}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <Label as="span">{item.label}</Label>
          <Text as="span">{item.value}</Text>
        </div>
      ))}
    </div>
  );
}

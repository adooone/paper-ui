import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { Button } from '../button';
import { Card } from '../card';
import styles from './tabs.module.scss';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeKey?: string;
  onSelect?: (id: string) => void;
  variant?: 'default' | 'chalkboard';
  className?: string;
}

export function Tabs({ items, activeKey, onSelect, variant = 'default', className }: TabsProps) {
  const activeItem = items.find((item) => item.id === activeKey);

  return (
    <div className={cn(styles.tabs, className)}>
      <div className={styles.tabBar} role="tablist">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            isActive={item.id === activeKey}
            icon={item.icon}
            onClick={() => onSelect?.(item.id)}
            className={styles.tabButton}
            aria-selected={item.id === activeKey}
            role="tab"
          >
            {item.label}
          </Button>
        ))}
      </div>
      {activeItem?.children && (
        <Card
          variant={variant === 'chalkboard' ? 'chalkboard' : 'default'}
          className={styles.content}
        >
          {activeItem.children}
        </Card>
      )}
    </div>
  );
}

import type { ReactNode } from 'react';
import { useOverflow } from '../../hooks/use-overflow';
import { MoreIcon } from '../../utils/icons';
import { cn } from '../../utils/style-helpers';
import { IconButton } from '../icon-button';
import type { MenuItem } from '../menu';
import { Menu } from '../menu';
import styles from './overflow-toolbar.module.scss';

export interface OverflowToolbarItem extends MenuItem {
  /** Lower folds first. */
  priority: number;
  content: ReactNode;
}

export interface OverflowToolbarProps {
  items: OverflowToolbarItem[];
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

export function OverflowToolbar({ items, surface = 'paper', className }: OverflowToolbarProps) {
  const candidates = items.map((item) => ({ key: item.id, priority: item.priority }));
  const { barRef, registerItem, hidden } = useOverflow(candidates);
  const visible = items.filter((item) => !hidden.has(item.id));
  const folded = items.filter((item) => hidden.has(item.id));

  return (
    <div ref={barRef} className={cn(styles.toolbar, className)}>
      {visible.map((item) => (
        <span key={item.id} ref={registerItem(item.id)} className={styles.item}>
          {item.content}
        </span>
      ))}
      {folded.length > 0 && (
        <Menu
          trigger={<IconButton icon={<MoreIcon />} label="More" size="small" />}
          items={folded}
          align="end"
          surface={surface}
        />
      )}
    </div>
  );
}

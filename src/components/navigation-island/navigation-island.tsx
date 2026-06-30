import type { ReactNode } from 'react';
import { buttonSizeCompact, cn } from '../../utils/style-helpers';
import { Button } from '../button';
import styles from './navigation-island.module.scss';

export interface NavigationIslandItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface NavigationIslandProps {
  items: NavigationIslandItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  position?: 'top' | 'bottom';
  surface?: 'paper' | 'chalkboard';
}

export function NavigationIsland({
  items,
  activeId,
  onSelect,
  position = 'bottom',
  surface = 'paper',
}: NavigationIslandProps) {
  return (
    <nav
      className={cn(
        styles.island,
        position === 'bottom' ? styles.positionBottom : styles.positionRelative,
        surface === 'chalkboard' && styles.chalkboard,
      )}
      aria-label="Navigation island"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <Button
            key={item.id}
            variant="ghost"
            surface={surface}
            size="small"
            isActive={isActive}
            onClick={() => onSelect?.(item.id)}
            aria-current={isActive ? 'page' : undefined}
            icon={item.icon}
            style={buttonSizeCompact}
          >
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}

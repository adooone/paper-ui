import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { Card } from '../card';
import styles from './sidebar-card.module.scss';

export interface SidebarCardProps {
  children: ReactNode;
  className?: string;
}

export function SidebarCard({ children, className }: SidebarCardProps) {
  return (
    <Card texture="parchment" shade size="small" className={cn(styles.sidebarCard, className)}>
      {children}
    </Card>
  );
}

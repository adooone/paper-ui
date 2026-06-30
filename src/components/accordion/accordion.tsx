import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './accordion.module.scss';

export interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function Accordion({
  title,
  children,
  expanded = false,
  onToggle,
  className,
}: AccordionProps) {
  return (
    <div className={cn(styles.accordion, expanded && styles.expanded, className)}>
      <button type="button" className={styles.header} onClick={onToggle} aria-expanded={expanded}>
        <span className={styles.icon} aria-hidden="true">
          {expanded ? '▼' : '▶'}
        </span>
        <span className={styles.title}>{title}</span>
      </button>
      {expanded && <div className={styles.content}>{children}</div>}
    </div>
  );
}

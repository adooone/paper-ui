import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './breadcrumb.module.scss';

export interface BreadcrumbItem {
  id: string;
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

export function Breadcrumb({ items, surface = 'paper', className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(styles.breadcrumb, surface === 'chalkboard' && styles.chalkboard, className)}
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.id} className={styles.item}>
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} className={styles.link} onClick={item.onClick}>
                  {item.label}
                </a>
              ) : item.onClick ? (
                <button
                  type="button"
                  className={cn(styles.link, styles.linkButton)}
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
              ) : (
                <span className={styles.static}>{item.label}</span>
              )}
              {!isLast && <ChevronIcon className={styles.separator} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

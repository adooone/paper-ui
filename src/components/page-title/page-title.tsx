import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './page-title.module.scss';

export interface PageTitleProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function PageTitle({ children, className, style }: PageTitleProps) {
  return (
    <h1 className={cn(styles.pageTitle, className)} style={style}>
      {children}
    </h1>
  );
}

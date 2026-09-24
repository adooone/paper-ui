import type { CSSProperties, ReactNode } from 'react';
import { ChevronRightIcon } from '../../utils/icons';
import { cn } from '../../utils/style-helpers';
import styles from './disclosure.module.scss';

export interface DisclosureProps {
  /** Toggle label, e.g. "Show more" / "Show less". */
  children: ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
  /** Optional label shown when collapsed. Defaults to `children`. */
  collapsedLabel?: ReactNode;
  /** Optional label shown when expanded. Defaults to `children`. */
  expandedLabel?: ReactNode;
  surface?: 'paper' | 'chalkboard';
  underline?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Disclosure({
  children,
  expanded = false,
  onToggle,
  collapsedLabel,
  expandedLabel,
  surface = 'paper',
  underline = false,
  className,
  style,
}: DisclosureProps) {
  const label =
    expanded && expandedLabel != null
      ? expandedLabel
      : !expanded && collapsedLabel != null
        ? collapsedLabel
        : children;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className={cn(
        styles.disclosure,
        expanded && styles.expanded,
        surface === 'chalkboard' && styles.chalkboard,
        underline && styles.underline,
        className,
      )}
      style={style}
    >
      <span className={styles.icon} aria-hidden="true">
        <ChevronRightIcon size={12} />
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}

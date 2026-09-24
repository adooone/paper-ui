import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { Text } from '../text';
import styles from './setting-group.module.scss';

export interface SettingGroupProps {
  /** Section title rendered above the rows. */
  title: ReactNode;
  /** Optional descriptive text under the title. */
  description?: ReactNode;
  /** Trailing slot in the header, next to the title (e.g. a button). */
  action?: ReactNode;
  /** SettingRows and other controls rendered as the section's body. */
  children: ReactNode;
  /** Heading level for the title. Defaults to `h3`. */
  titleAs?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function SettingGroup({
  title,
  description,
  action,
  children,
  titleAs,
  className,
  style,
}: SettingGroupProps) {
  return (
    <section className={cn(styles.settingGroup, className)} style={style}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <Text as={titleAs ?? 'h3'} face="handwritten" size="sm" weight="semibold" tone="muted">
            {title}
          </Text>
          {description != null && <p className={styles.description}>{description}</p>}
        </div>
        {action != null && <div className={styles.action}>{action}</div>}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

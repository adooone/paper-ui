import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { SectionHeading } from '../section-heading';
import styles from './setting-group.module.scss';

export interface SettingGroupProps {
  /** Section title rendered above the rows. */
  title: ReactNode;
  /** Optional descriptive text under the title. */
  description?: ReactNode;
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
  children,
  titleAs,
  className,
  style,
}: SettingGroupProps) {
  return (
    <section className={cn(styles.settingGroup, className)} style={style}>
      <header className={styles.header}>
        <SectionHeading as={titleAs}>{title}</SectionHeading>
        {description != null && <p className={styles.description}>{description}</p>}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

import type { CSSProperties } from 'react';
import { cn } from '../../utils/style-helpers';
import { CopyButton } from '../copy-button';
import { Text } from '../text';
import styles from './command-line.module.scss';

export interface CommandLineProps {
  command: string;
  prompt?: string;
  surface?: 'paper' | 'chalkboard';
  className?: string;
  style?: CSSProperties;
}

export function CommandLine({
  command,
  prompt = '$',
  surface = 'paper',
  className,
  style,
}: CommandLineProps) {
  return (
    <div
      className={cn(styles.commandLine, surface === 'chalkboard' && styles.chalkboard, className)}
      style={style}
    >
      <Text as="span" face="mono" size="sm" className={styles.prompt}>
        {prompt}
      </Text>
      <Text as="span" face="mono" size="sm" className={styles.command}>
        {command}
      </Text>
      <CopyButton text={command} variant="light" surface={surface} />
    </div>
  );
}

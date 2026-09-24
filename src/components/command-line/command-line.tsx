import type { CSSProperties } from 'react';
import { cn } from '../../utils/style-helpers';
import { CopyButton } from '../copy-button';
import { InlineCode } from '../inline-code';
import { Text } from '../text';
import styles from './command-line.module.scss';

export interface CommandLineProps {
  command: string;
  prompt?: string;
  boxed?: boolean;
  surface?: 'paper' | 'chalkboard';
  className?: string;
  style?: CSSProperties;
}

export function CommandLine({
  command,
  prompt = '$',
  boxed = false,
  surface = 'paper',
  className,
  style,
}: CommandLineProps) {
  return (
    <div
      className={cn(
        styles.commandLine,
        boxed && styles.boxed,
        boxed && surface === 'chalkboard' && styles.chalkboard,
        className,
      )}
      style={style}
    >
      {boxed && (
        <Text as="span" face="mono" size="sm" className={styles.prompt}>
          {prompt}
        </Text>
      )}
      <InlineCode className={styles.command}>{command}</InlineCode>
      <CopyButton text={command} surface={surface} />
    </div>
  );
}

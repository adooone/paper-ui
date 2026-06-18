import type { FC } from 'react';
import { CopyButton } from '../copy-button';
import { cn } from '../../utils/style-helpers';
import styles from './code-block.module.scss';

export interface CodeBlockProps {
  code: string;
  filename?: string;
  variant?: 'default' | 'chalkboard';
}

export function CodeBlock({ code, filename, variant = 'default' }: CodeBlockProps) {
  return (
    <div className={cn(styles.codeBlock, variant === 'chalkboard' && styles.chalkboard)}>
      {filename && (
        <div className={cn(styles.header, variant === 'chalkboard' && styles.chalkboardHeader)}>
          <span>{filename}</span>
          <CopyButton text={code} variant={variant === 'chalkboard' ? 'chalkboard' : 'light'} />
        </div>
      )}
      {!filename && (
        <div className={styles.relative}>
          <div className={styles.copyOverlay}>
            <CopyButton text={code} variant={variant === 'chalkboard' ? 'chalkboard' : 'dark'} />
          </div>
        </div>
      )}
      <pre className={cn(styles.pre, variant === 'chalkboard' && styles.chalkboardPre)}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
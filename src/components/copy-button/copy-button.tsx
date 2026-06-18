import { useState, useCallback } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './copy-button.module.scss';

export interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'light' | 'dark' | 'chalkboard';
}

export function CopyButton({
  text,
  variant = 'light',
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        styles.copyButton,
        variant === 'dark' && styles.dark,
        variant === 'chalkboard' && styles.chalkboard,
        copied && styles.copied,
        className,
      )}
      {...props}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

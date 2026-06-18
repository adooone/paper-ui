import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export const buttonSizeCompact = { height: 32, lineHeight: '32px', padding: '0 16px' } as const;

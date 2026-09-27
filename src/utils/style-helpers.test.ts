import { describe, expect, it } from 'vitest';
import styles from '../components/text/typography.module.scss';
import { cn } from './style-helpers';

describe('cn', () => {
  it('keeps every class from a full Text class set', () => {
    const classes = [
      styles.text,
      styles.faceSerif,
      styles.sizeBase,
      styles.weightNormal,
      styles.tonePrimary,
      styles.truncate,
      styles.noWrap,
    ];

    const joined = cn(...classes);

    for (const className of classes) {
      expect(joined).toContain(className);
    }
  });
});

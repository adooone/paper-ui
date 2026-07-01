import { cn } from '../../utils/style-helpers';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import styles from './pagination.module.scss';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

const DOTS = 'dots' as const;

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | typeof DOTS)[] {
  const totalNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalNumbers) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + siblingCount * 2), DOTS, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + siblingCount * 2;
    return [1, DOTS, ...range(totalPages - rightCount + 1, totalPages)];
  }

  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, totalPages];
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  surface = 'paper',
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPageRange(page, totalPages, siblingCount);

  return (
    <nav className={cn(styles.pagination, className)} aria-label="Pagination">
      <IconButton
        icon={<ChevronLeftIcon />}
        label="Previous page"
        variant="ghost"
        surface={surface}
        size="small"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      />
      <ul className={styles.list}>
        {items.map((item, index) =>
          item === DOTS ? (
            <li key={`dots-${index}`} className={styles.dots} aria-hidden="true">
              &hellip;
            </li>
          ) : (
            <li key={item}>
              <Button
                variant="ghost"
                size="small"
                surface={surface}
                isActive={item === page}
                className={styles.pageButton}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            </li>
          ),
        )}
      </ul>
      <IconButton
        icon={<ChevronRightIcon />}
        label="Next page"
        variant="ghost"
        surface={surface}
        size="small"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      />
    </nav>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

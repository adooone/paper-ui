import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { getVariantTexture } from '../../utils/get-variant-texture';
import type { TextureConfig } from '../../utils/textures';
import styles from './table.module.scss';

export type TableVariant = 'paper' | 'chalkboard';

export interface TableColumn<T = unknown> {
  key: string;
  header: ReactNode;
  cell: (row: T, index: number, variant: TableVariant) => ReactNode;
  width?: number;
}

export interface TableToolbar {
  search?: {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
  };
  actions?: ReactNode | ((variant: TableVariant) => ReactNode);
}

export interface TableProps<T = unknown> {
  data: T[];
  columns: TableColumn<T>[];
  variant?: 'paper' | 'chalkboard';
  texture?: TextureConfig;
  toolbar?: TableToolbar;
  className?: string;
}

export function Table<T = unknown>({
  data,
  columns,
  variant = 'paper',
  texture,
  toolbar,
  className,
}: TableProps<T>) {
  const textureStyles = getVariantTexture(variant, texture);

  const hasToolbar = !!toolbar;

  return (
    <div
      className={cn(styles.tableWrapper, variant === 'chalkboard' && styles.chalkboardWrapper, className)}
      style={textureStyles}
    >
      {hasToolbar && (
        <div className={styles.toolbar}>
          {toolbar.search && (
            <div className={styles.search}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={toolbar.search.placeholder ?? 'Search...'}
                value={toolbar.search.value ?? ''}
                onChange={(e) => toolbar.search?.onChange?.(e.target.value)}
              />
            </div>
          )}
          {toolbar.actions && (
            <div className={styles.toolbarActions}>
              {typeof toolbar.actions === 'function' ? toolbar.actions(variant) : toolbar.actions}
            </div>
          )}
        </div>
      )}

      <div className={styles.tableScroll}>
        <table className={cn(styles.table, variant === 'chalkboard' && styles.chalkboard)}>
          <colgroup>
            {columns.map((col) => (
              <col
                key={col.key}
                style={col.width ? { width: `${col.width * 32}px` } : undefined}
              />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={styles.th}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.tr}>
                {columns.map((col) => (
                  <td key={col.key} className={styles.td}>
                    {col.cell(row, rowIndex, variant)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

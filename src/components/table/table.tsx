import type { ReactNode } from 'react';
import { Fragment, useState } from 'react';
import { createAccentClassMap } from '../../utils/accent-class-map';
import { getVariantTexture } from '../../utils/get-variant-texture';
import { cn } from '../../utils/style-helpers';
import type { TextureConfig } from '../../utils/textures';
import styles from './table.module.scss';

export type TableVariant = 'paper' | 'chalkboard';
export type TableAccentColor = 'blue' | 'green' | 'amber' | 'rose' | 'slate';

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

export interface TableExpandableConfig<T = unknown> {
  render: (row: T, index: number, variant: TableVariant) => ReactNode;
}

// A board column is a lane of cards (e.g. a status), rendered side by side
// instead of the row-per-record layout `columns`/`data` produce.
export interface TableBoardColumn<T = unknown> {
  key: string;
  label: ReactNode;
  accent?: TableAccentColor;
  items: T[];
  getKey?: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number, variant: TableVariant) => ReactNode;
  emptyLabel?: ReactNode;
}

export interface TableProps<T = unknown> {
  data?: T[];
  columns?: TableColumn<T>[];
  // When set, renders lanes of cards instead of the rows layout; `data`/`columns`/
  // `expandable` are ignored.
  board?: TableBoardColumn<T>[];
  variant?: 'paper' | 'chalkboard';
  texture?: TextureConfig;
  toolbar?: TableToolbar;
  expandable?: TableExpandableConfig<T>;
  showExpandColumn?: boolean;
  rowClassName?: (row: T, index: number) => string | undefined;
  className?: string;
}

const accentClassMap = createAccentClassMap(styles);

export function Table<T = unknown>({
  data = [],
  columns = [],
  board,
  variant = 'paper',
  texture,
  toolbar,
  expandable,
  showExpandColumn = true,
  rowClassName,
  className,
}: TableProps<T>) {
  const textureStyles = getVariantTexture(variant, texture);
  const hasToolbar = !!toolbar;
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const hasExpandColumn = !!(expandable && showExpandColumn);
  const totalColumns = hasExpandColumn ? columns.length + 1 : columns.length;

  return (
    <div
      className={cn(
        styles.tableWrapper,
        variant === 'chalkboard' && styles.chalkboardWrapper,
        className,
      )}
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

      {board ? (
        <div className={styles.boardScroll}>
          <div className={styles.board}>
            {board.map((col) => (
              <div key={col.key} className={styles.boardColumn}>
                <div
                  className={cn(
                    styles.boardColumnHeader,
                    variant === 'chalkboard' && styles.chalkboard,
                    col.accent && accentClassMap[col.accent],
                  )}
                >
                  <span className={styles.boardColumnLabel}>{col.label}</span>
                  <span className={styles.boardColumnCount}>{col.items.length}</span>
                </div>
                <div className={styles.boardColumnBody}>
                  {col.items.length === 0 ? (
                    <div className={styles.boardEmpty}>{col.emptyLabel ?? 'empty'}</div>
                  ) : (
                    col.items.map((item, itemIndex) => (
                      <div
                        key={col.getKey ? col.getKey(item, itemIndex) : itemIndex}
                        className={cn(
                          styles.boardRow,
                          variant === 'chalkboard' && styles.chalkboard,
                        )}
                      >
                        {col.renderItem(item, itemIndex, variant)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.tableScroll}>
          <table className={cn(styles.table, variant === 'chalkboard' && styles.chalkboard)}>
            <colgroup>
              {hasExpandColumn && <col style={{ width: '48px' }} />}
              {columns.map((col) => (
                <col
                  key={col.key}
                  style={col.width ? { width: `${col.width * 32}px` } : undefined}
                />
              ))}
            </colgroup>
            <thead>
              <tr>
                {hasExpandColumn && (
                  <th className={cn(styles.th, styles.expandTh)} aria-label="Expand" />
                )}
                {columns.map((col) => (
                  <th key={col.key} className={styles.th}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => {
                const expansionContent = expandable?.render(row, rowIndex, variant);
                const canExpand = !!expansionContent;
                const isExpanded = canExpand && expandedRows.has(rowIndex);
                return (
                  <Fragment key={rowIndex}>
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: row click is a pointer-only convenience; keyboard users toggle expansion via the dedicated expand button in the first cell. */}
                    <tr
                      className={cn(
                        styles.tr,
                        canExpand && styles.expandable,
                        rowClassName?.(row, rowIndex),
                      )}
                      onClick={() => canExpand && toggleRow(rowIndex)}
                    >
                      {hasExpandColumn && (
                        <td className={cn(styles.td, styles.expandTd)}>
                          {canExpand && (
                            <button
                              type="button"
                              className={styles.expandIcon}
                              aria-expanded={isExpanded}
                              aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleRow(rowIndex);
                              }}
                            >
                              {isExpanded ? '▼' : '▶'}
                            </button>
                          )}
                        </td>
                      )}
                      {columns.map((col) => (
                        <td key={col.key} className={styles.td}>
                          {col.cell(row, rowIndex, variant)}
                        </td>
                      ))}
                    </tr>
                    {isExpanded && (
                      <tr className={styles.expandedRow}>
                        <td colSpan={totalColumns} className={styles.expandedCell}>
                          {expansionContent}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
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

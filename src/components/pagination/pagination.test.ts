import { describe, expect, it } from 'vitest';
import { getPageRange } from './pagination';

describe('getPageRange', () => {
  it('shows every page when they all fit without dots', () => {
    expect(getPageRange(3, 5, 1)).toEqual([1, 2, 3, 4, 5]);
  });

  it('shows dots on the right only when near the start', () => {
    expect(getPageRange(1, 10, 1)).toEqual([1, 2, 3, 4, 5, 'dots', 10]);
  });

  it('shows dots on the left only when near the end', () => {
    expect(getPageRange(10, 10, 1)).toEqual([1, 'dots', 6, 7, 8, 9, 10]);
  });

  it('shows dots on both sides when in the middle', () => {
    expect(getPageRange(5, 10, 1)).toEqual([1, 'dots', 4, 5, 6, 'dots', 10]);
  });

  it('clamps the left sibling to page 2 without leaving a lone gap page', () => {
    expect(getPageRange(3, 10, 1)).toEqual([1, 2, 3, 4, 5, 'dots', 10]);
  });

  it('clamps the right sibling to totalPages - 1 without leaving a lone gap page', () => {
    expect(getPageRange(8, 10, 1)).toEqual([1, 'dots', 6, 7, 8, 9, 10]);
  });

  it('respects a larger siblingCount', () => {
    expect(getPageRange(8, 15, 2)).toEqual([1, 'dots', 6, 7, 8, 9, 10, 'dots', 15]);
  });
});

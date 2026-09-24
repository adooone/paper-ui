---
id: IDEA-7
title: Drawer and overflow toolbar
type: feat
status: idea
created: 2026-09-22
tags:
  - layout
  - drawer
  - menu
subject: Components
order: 5
---

paper-camp's sidebar on a phone is a hand-built drawer: a fixed scrim, a
focus trap, Escape to close, a raw `<button>` as the backdrop because a
`Button` draws chrome. Its status bar folds items into a `Menu` when they
no longer fit, through a measured, tested hook that knows nothing about
status bars. Both are library shells.

**`Drawer`.** `open`, `onClose`, `side` (`left`, `right`), `width`; a
scrim at `--pui-ink-900` 40% with blur, a focus trap, Escape and scrim
click closing it, body scroll locked, and the panel painted parchment.
`Layout`'s sidebar uses it under its phone breakpoint, so an app gets the
drawer by rendering a sidebar.

**`OverflowToolbar`.** Children plus `priority` per child; the toolbar
measures its width, folds the lowest-priority items into a trailing
`Menu` of `MenuEntry`s until the rest fit, and re-measures on resize.
The `pickHidden` pure function and the hook move from paper-camp with
their tests.

### Out of scope

Nested drawers. A command palette.

### Source to port

Byte for byte as paper-camp runs them today. Port, do not redesign: the measuring hook's thresholds, the fold order, the scrim colour and blur, the focus trap and Escape handling stay exactly as written; only imports and file locations change.

#### `pickHidden + useStatusBarOverflow` — port verbatim

```tsx
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export interface OverflowCandidate {
  key: string;
  /** Lower hides first; the branch, counts, and bell are never candidates. */
  priority: number;
  width: number;
}

/** Which candidates to fold into the "more" menu so the rest fit `available`.
 *  Hides the lowest priority first, and pays for the menu button once anything hides. */
export function pickHidden(
  available: number,
  fixedWidth: number,
  candidates: OverflowCandidate[],
  moreWidth: number,
  gap: number,
): Set<string> {
  const hidden = new Set<string>();
  const order = [...candidates].sort((a, b) => a.priority - b.priority);
  const total = () =>
    fixedWidth +
    candidates.filter((c) => !hidden.has(c.key)).reduce((sum, c) => sum + c.width + gap, 0) +
    (hidden.size > 0 ? moreWidth + gap : 0);
  for (const candidate of order) {
    if (total() <= available) break;
    hidden.add(candidate.key);
  }
  return hidden;
}

const MORE_BUTTON_WIDTH = 28;
const ITEM_GAP = 12;

// Fixed refs must never wrap a candidate: measuring a group that contains foldable
// items counts them twice and makes the hide decision oscillate every layout.
export function useStatusBarOverflow(candidates: { key: string; priority: number }[]) {
  const barRef = useRef<HTMLDivElement>(null);
  const fixedRefs = useRef<Map<string, HTMLElement>>(new Map());
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const widths = useRef<Map<string, number>>(new Map());
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const registerFixed = useCallback(
    (key: string) => (el: HTMLElement | null) => {
      if (el) fixedRefs.current.set(key, el);
      else fixedRefs.current.delete(key);
    },
    [],
  );
  const registerItem = useCallback(
    (key: string) => (el: HTMLElement | null) => {
      if (el) itemRefs.current.set(key, el);
      else itemRefs.current.delete(key);
    },
    [],
  );

  const candidatesKey = candidates.map((c) => `${c.key}:${c.priority}`).join('|');
  const measure = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    const styles = getComputedStyle(bar);
    const available =
      bar.clientWidth -
      Number.parseFloat(styles.paddingLeft) -
      Number.parseFloat(styles.paddingRight);
    if (available <= 0) return;
    for (const [key, el] of itemRefs.current) widths.current.set(key, el.offsetWidth);
    let fixedWidth = 0;
    for (const el of fixedRefs.current.values()) fixedWidth += el.offsetWidth + ITEM_GAP;
    const measured = candidatesKey
      .split('|')
      .filter(Boolean)
      .map((entry) => {
        const [key, priority] = entry.split(':');
        return { key, priority: Number(priority) };
      })
      .filter((c) => widths.current.has(c.key))
      .map((c) => ({ ...c, width: widths.current.get(c.key) ?? 0 }));
    const next = pickHidden(available, fixedWidth, measured, MORE_BUTTON_WIDTH, ITEM_GAP);
    setHidden((prev) => {
      if (prev.size === next.size && [...prev].every((k) => next.has(k))) return prev;
      return next;
    });
  }, [candidatesKey]);

  useLayoutEffect(() => {
    measure();
    const bar = barRef.current;
    if (!bar || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(bar);
    return () => observer.disconnect();
  }, [measure]);

  return { barRef, registerFixed, registerItem, hidden };
}
```

#### `SidebarShell (the Drawer)` — port verbatim

```tsx
import { colors, withAlpha } from '@dendelion/paper-ui/tokens';
import { useEffect, useRef } from 'react';

const MOBILE_DRAWER_SHADOW = `2px 0 12px ${withAlpha(colors.sketchInk, 0.15)}`;

interface SidebarShellProps {
  routeKey: string;
  children: React.ReactNode;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const SidebarShell = ({
  routeKey,
  children,
  mobileOpen,
  onMobileClose,
}: SidebarShellProps) => {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMobileClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, onMobileClose]);

  // Move focus into the drawer on open (it acts as a modal below lg); restore
  // focus to the hamburger trigger on close.
  useEffect(() => {
    if (!mobileOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    asideRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, [mobileOpen]);

  return (
    <>
      {/* Raw <button>: invisible backdrop — a paper-ui Button draws its own visible chrome. */}
      {mobileOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 z-[290] cursor-default border-none p-0 bg-ink-900/[40%] backdrop-blur-sm"
          onClick={onMobileClose}
          aria-label="Close sidebar"
          tabIndex={-1}
        />
      )}
      <aside
        ref={asideRef}
        // Dialog semantics only as a mobile drawer — at lg+ it's an in-flow sidebar.
        role={mobileOpen ? 'dialog' : undefined}
        aria-modal={mobileOpen || undefined}
        aria-label="Sidebar navigation"
        tabIndex={-1}
        // `self-start`: a row-stretched flex item is already full height, so sticky can't
        // engage; sizing to content lets it pin while the page scrolls.
        className={`fixed inset-y-0 left-0 z-[300] w-[224px] shrink-0 overflow-y-auto lg:sticky lg:inset-auto lg:top-0 lg:z-auto lg:flex lg:max-h-[calc(100dvh-var(--pc-header-h)-32px)] lg:flex-col lg:self-start lg:overflow-visible lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${mobileOpen ? 'bg-[var(--pui-bg-base)]' : 'bg-transparent'}`}
        style={mobileOpen ? { boxShadow: MOBILE_DRAWER_SHADOW } : undefined}
      >
        <div key={routeKey} className="mt-8 mb-8 flex min-h-0 flex-col gap-8 overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  );
};
```

### Phases
- [ ] Build `Drawer`
      New `src/components/drawer/`, with `open`, `onClose`, `side` and `width`, the blurred `--pui-ink-900` scrim, the focus trap, `use-escape-key`, the body scroll lock and the parchment panel — reusing what `Modal` already does rather than a second copy.
- [ ] Render `Layout`'s sidebar in the `Drawer` under the phone breakpoint
      So an app gets the drawer by rendering a sidebar, with no new prop to opt in.
- [ ] Move `pickHidden` and its measuring hook over from paper-camp
      Bring the pure function, the hook and their tests in as library internals, named for widths and priorities rather than status bars.
- [ ] Build `OverflowToolbar` on top of them
      Children with a `priority`, a trailing `Menu` of `MenuEntry`s for the folded items, and a re-measure on resize.
- [ ] Export both components and show them
      `src/index.ts` gains the components and their props; the showcase gets a section with prop rows for each.

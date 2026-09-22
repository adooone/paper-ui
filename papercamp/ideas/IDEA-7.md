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

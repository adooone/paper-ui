---
id: IDEA-9
title: FactsGrid inline and Table auto columns
type: fix
status: done
created: 2026-09-25
updated: 2026-09-25
tags:
  - facts-grid
  - table
subject: Components
order: 1
---

paper-camp's chunk view puts its facts beside the title in a flex row and
its finding actions in a table column. `FactsGrid` is a `grid` with
`repeat(auto-fit, minmax(96px, 1fr))`, so inside a flex row it is
content-sized and collapses to one column — Date over Passes over Cost,
each label and value on its own line. `Table` columns take only a `width`
in 32px units, so an actions column is either too narrow and overlaps
the text or too wide and squeezes the message to half the row. Both
came from the app: its `FactsRow` was `flex flex-wrap gap-4 items-end`,
and its old actions cell simply took its content width.

**`FactsGrid` gains `layout="inline"`.** A `flex-wrap` row with
`gap: 1rem`, items aligned to the end, each item label over value as
now; `layout="grid"` stays the default. `align="end"` continues to
right-align text in either layout.

**`Table` columns take `width: 'auto'`.** An `auto` column emits no
`<col>` width and sets `white-space: nowrap` on its cells, so it is
exactly as wide as its widest content and the flexible columns share
the rest. Numbers keep the 32px unit.

### Out of scope

Any other Table sizing. FactsGrid's type, which IDEA-4 settled.

### Phases
- [x] Give `FactsGrid` a `layout` prop
      `layout="inline"` lays the items out as a `flex-wrap` row with `gap: 1rem` aligned to the end, `layout="grid"` stays the default, and `align="end"` still right-aligns text in both.
      run: 1m1s · 26 in · 2.1k out · sonnet-5 · sess:9d864b82-79ad-4b3f-9c08-fa7a9bb8cf7c
- [x] Let a `Table` column take `width: 'auto'`
      Widen the column `width` type to accept `'auto'` beside the 32px numbers, emit no `<col>` width for it, and set `white-space: nowrap` on its cells.
      run: 1m14s · 26 in · 2.1k out · sonnet-5 · sess:9d864b82-79ad-4b3f-9c08-fa7a9bb8cf7c
- [x] Show an inline facts row and an auto column in the showcase
      Both shapes on the page beside the defaults, so a collapsed row or a stretched column is visible.
      run: 4m12s · 80 in · 13.2k out · sonnet-5 · sess:9d864b82-79ad-4b3f-9c08-fa7a9bb8cf7c

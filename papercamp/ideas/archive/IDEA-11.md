---
id: IDEA-11
title: An auto column fits its content
type: fix
kind: fix
status: done
idea: IDEA-9
created: 2026-09-29
updated: 2026-09-29
tags:
  - table
subject: Components
order: 1
---

IDEA-9 gave `Table` columns `width: 'auto'`, meaning as wide as the
widest content. It does not do that. The table is `table-layout: fixed`
(`table.module.scss:198`), and under fixed layout a column with no width
does not size to content — every unsized column takes an equal share of
what is left. paper-camp's chunk view has one flexible column and one
`auto` column, so the three action buttons get half the table and the
finding's text is squeezed into the other half, wrapping into a tall
narrow column beside empty space.

**An `auto` column switches the table to auto layout.** When any column
is `auto`, the `<table>` gets `table-layout: auto` and that column's
`<col>` gets `width: 1%`: under auto layout a nowrap cell at 1% shrinks
to its content and the flexible columns share the rest, which is the
browser's own way to say fit-content. Numbered columns keep their pixel
widths, which auto layout honours as minimums. A table with no `auto`
column is untouched.

**The showcase proves it.** A table with a long prose column and an
`auto` column of three ghost buttons, next to the same table without
`auto`; the buttons sit in one line at their own width and the prose
takes everything else.

### Out of scope

Column resizing. The stacked phone layout, which already ignores widths.

### Phases
- [x] Switch the table to auto layout when any column is `auto`
      `table.tsx` flags an `auto` column, adds a class that sets `table-layout: auto`, emits `width: 1%` for that `<col>`, and keeps the numbered `<col>`s' pixel widths as their floor.
      run: 1m18s · 34 in · 2.9k out · sonnet-5 · sess:3078cb5a-c6d9-453a-91d3-683cdf49ab2c
- [x] Show a fit-content column in the showcase
      One prose-plus-ghost-buttons table with `auto` beside the same table without it, in the existing `table` section.
      run: 1m37s · 40 in · 5.5k out · sonnet-5 · sess:3078cb5a-c6d9-453a-91d3-683cdf49ab2c
- [x] [manual] Confirm the buttons stay on one line and the prose takes the rest

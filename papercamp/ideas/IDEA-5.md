---
id: IDEA-5
title: Rows, sidebars and settings
type: feat
status: in-progress
created: 2026-09-22
updated: 2026-09-23
tags:
  - row
  - list-item
  - sidebar
subject: Components
order: 3
---

paper-camp renders a list row eight different ways — plans, runs,
roadmap, findings, settings, git files, commits, sidebar entries — each
with its own grid template, because this library has nothing between a
`ListItem` that centres its content and a `Card` whose smallest padding
is still too tall. Eleven call sites pass `plan-row-card` to `Card` to
cut its padding through a hashed selector; eleven more pass `pc-row` to
`ListItem` to bottom-align it in a 32px ruled cell. The row paper-camp
converged on becomes the component.

**`Row` is the dense list row.** Named slots — `id` (mono), `title`
(truncating), `meta` (a `MetaLine`), `trailing` (stamps and actions) —
laid out by a `columns` template with a phone fallback that stacks
`title` over the rest. `surface` is `none` (ruled, the sketch `Divider`
between rows), `card` or `nestedCard`. `onClick` makes the whole row the
target. `highlighted` draws the amber outline paper-camp uses for a
deep-linked row. `RowSkeleton` mirrors it with `Skeleton` text at the
same columns, `boxless` for ruled lists.

**`Table` keeps up.** `rowStyle(row)` for a per-row inline style (the
running-phase fill) and `phoneLayout="stacked"` that reflows the table to
blocks under 640px, replacing the app's `phone-table` override.

**The sidebar kit.** `SidebarCard` (a parchment `Card` whose layers pass
`min-height: 0` so an inner list scrolls), `SidebarLabel` (a 32px ruled
label cell), `SidebarField` (label over a control), and `SidebarItem`, a
`ListItem` preset to the 32px bottom-aligned cell with `count`, `icon`,
`note`, `busy` and `tone` — what paper-camp's `SidebarCommand` and every
filter entry are.

**`SettingRow`.** Label and hint on the left, a 260px control column on
the right, no surface, a taller tap area on phones — the settings row
paper-camp's IDEA-267 arrived at. `SettingGroup` is its titled
section.

**`Disclosure`.** A bare "show more / show less" toggle with
`aria-expanded`, for text and logs; `Accordion` stays the boxed one.

### Out of scope

The data any row shows. Drag-to-reorder.

### Phases
- [x] Build `Row` and `RowSkeleton`
      New `src/components/row/`, with the `columns` template, the three `surface` values, `onClick`, `highlighted` and the phone stack, and a skeleton that reuses the same template.
- [ ] Add `rowStyle` and `phoneLayout` to `Table`
      Per-row inline style from the row datum, plus the under-640px reflow to blocks in `table.module.scss`.
- [ ] Build the sidebar kit
      `SidebarCard`, `SidebarLabel`, `SidebarField` and `SidebarItem` as their own components, with the `min-height: 0` chain that lets an inner list scroll.
- [ ] Build `SettingRow`, `SettingGroup` and `Disclosure`
      The two-column settings row with its phone tap area, its titled section, and the bare `aria-expanded` toggle that leaves `Accordion` alone.
- [ ] Export the new components and show them
      Add every new component and its props to `src/index.ts`, then a showcase page section with prop rows for each.

### Thread
- [x] 2026-09-22 [question] [agent] Run-all parked on phase 1 ("Build `Row` and `RowSkeleton`") — the agent needs a decision: read outside workspace: /home/ccroco/dev/paper-ui/paperplan/CODE_STYLE.md
- [x] 2026-09-23 [chat] Decision: nothing to decide, the path was mistyped. The file is paperplan/CODE_STYLE.md inside this repository (absolute: /home/croco/dev/paper-ui/paperplan/CODE_STYLE.md, one c in croco). Read it by its relative path and continue phase 1.
- [x] 2026-09-23 [chat] [agent] Got it — that was just a typo in the path (extra c, wrong /home root), nothing to decide. Continuing phase 1: Row and RowSkeleton.

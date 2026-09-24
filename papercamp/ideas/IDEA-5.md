---
id: IDEA-5
title: Rows, sidebars and settings
type: feat
status: review
created: 2026-09-22
updated: 2026-09-24
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

**The sidebar kit.** Four components, specified here in full so nothing
needs reading from paper-camp. `SidebarCard`: a parchment, shaded `Card`
whose border and texture layers are `display: flex; flex-direction:
column; min-height: 0`, so a scrolling list inside it is bounded by the
card. `SidebarLabel`: a 32px cell, `display: flex; align-items:
flex-end; padding-bottom: 4px; line-height: 1`, handwritten, xs,
semibold, opacity 0.45. `SidebarField`: a `SidebarLabel` over its
control, `gap 4px`. `SidebarItem`: a `ListItem` preset to the same 32px
bottom-aligned cell (`align-items: flex-end; padding-top: 0;
padding-bottom: 4px; line-height: 1`, xs text) with `icon`, `count`
(right-aligned, 2xs, tertiary), `note` (a mono 2xs line under the row),
`busy` (a string that replaces the label and disables the row), `tone`
(`danger` tints icon and label rose) and `disabled` at opacity 0.5.

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
- [x] Add `rowStyle` and `phoneLayout` to `Table`
      Per-row inline style from the row datum, plus the under-640px reflow to blocks in `table.module.scss`.
- [x] Build the sidebar kit
      `SidebarCard`, `SidebarLabel`, `SidebarField` and `SidebarItem` exactly as the body specifies — every measurement is there; read nothing outside this repository.
- [x] Build `SettingRow`, `SettingGroup` and `Disclosure`
      The two-column settings row with its phone tap area, its titled section, and the bare `aria-expanded` toggle that leaves `Accordion` alone.
- [x] Export the new components and show them
      Add every new component and its props to `src/index.ts`, then a showcase page section with prop rows for each.
      run: 2m8s · 74 in · 7.8k out · sonnet-5 · sess:54cd2641-49bc-45c0-9fa2-07bb8727c034
- [x] [manual] Export and showcase new row, sidebar and setting components
- [x] [manual] Match app's Row, SidebarItem, SettingRow and Table styling

### Fixes
- [x] Give `SidebarItem` `active` and `action`
      Every sidebar filter and nav list needs the current entry marked and a trailing slot for a count or a `Stamp`; the spec omitted both, so paper-camp cannot adopt it. `active` renders `aria-current="page"` and the same fill highlight `ListItem` draws for its `active`; `action` is a trailing `ReactNode` slot in the 32px cell, right-aligned after `count`, whose own buttons stay clickable. Both are shown in the showcase beside the existing props.
      run: 1m48s · 46 in · 6.5k out · sonnet-5 · sess:b6a01a10-b0ff-4c19-ab89-14fed762031a
- [x] `Row`'s card surfaces are `Card` surfaces
      `surface="card"` paints a flat `$color-bg-base` with an organic radius and `nestedCard` a flat `$color-bg-elevated`, so every list that moved from `Card size="small" texture={surface.card}` lost its parchment grain, its shade and its sketch border and now reads as a white slab. The two surfaces render through the same layers `Card` uses — the texture layer with `surface.card` (parchment, shaded) or `surface.nestedCard` (canvas, shaded) and the sketch border — at the row's padding, so a `Row surface="card"` is pixel-for-pixel the small card it replaced. Shown in the showcase beside a `Card` for comparison.
      run: 5m51s · 92 in · 22.1k out · sonnet-5 · sess:b6a01a10-b0ff-4c19-ab89-14fed762031a
- [x] `SidebarItem` centres its row
      The row keeps the 32px cell but aligns its icon, label, count and action to the vertical centre with symmetric padding, instead of `align-items: flex-end` and a 4px bottom pad; bottom alignment was the ruled label cell's convention and looks off-centre the moment a hover fill paints the whole row, as it does on every command. `SidebarLabel` alone keeps the bottom-aligned ruled cell. The `note` line under a row is unchanged.
      run: 27s · 16 in · 1.7k out · sonnet-5 · sess:be047753-f08d-4a77-b09f-cd298d9acc17
- [x] `Row` measures like the card row it replaced
      Gap 10px, padding .375rem .875rem, no min-height, no weight on the title, no colour on the id cell (inherits ink), phone stack at 480px with padding .75rem, plus a `hideBelow` per column (`lg` for the app's Updated column). `highlighted` is `outline: 2px solid rgba(200,154,90,.5)` at offset -2 on a 10px radius, on the whole row. `Row` gains `active` — the green wash blob and pencil ring `ListItem` draws — for the git file list. `RowSkeleton` takes per-row `widths` and stamp placeholders, and `boxless` has no gap.
      run: 5m4s · 100 in · 27.5k out · sonnet-5 · sess:be047753-f08d-4a77-b09f-cd298d9acc17
- [x] `SidebarItem` hovers like `ListItem`, and `busy` dims to .5
      The hover is the wobbly blob plus pencil ring `ListItem` paints, not a rounded rectangle, at the same 14px text and 12px note; `busy` dims to opacity .5.
      run: 1m6s · 18 in · 6.7k out · sonnet-5 · sess:be047753-f08d-4a77-b09f-cd298d9acc17
- [x] `SettingRow` and `SettingGroup` are the app's
      Row: `padding .375rem .875rem`, radius 10px, grid `minmax(0,1fr) 260px`, gap 12px, label weight 400 truncating with `nowrap`, hint 1rem inherited at .45, phone at 480px with .75rem padding and no min-height. Group: header row with an `action` slot, label handwritten .875rem 600 at .55, outer gap 4px, no horizontal header padding.
      run: 1m56s · 44 in · 9.3k out · sonnet-5 · sess:be047753-f08d-4a77-b09f-cd298d9acc17
- [x] `Table phoneLayout="stacked"` reflows as the app did
      Breakpoint 480px, header hidden, cells `padding .125rem 1rem` with no min-height, no per-cell uppercase label, and `overflow-x: visible` on the scroll wrapper.
      run: 2m28s · 40 in · 5.9k out · sonnet-5 · sess:6b5cedc5-456a-459e-a80f-8df99ba009a5

### Thread
- [x] 2026-09-22 [question] [agent] Run-all parked on phase 1 ("Build `Row` and `RowSkeleton`") — the agent needs a decision: read outside workspace: /home/ccroco/dev/paper-ui/paperplan/CODE_STYLE.md
- [x] 2026-09-23 [chat] Decision: nothing to decide, the path was mistyped. The file is paperplan/CODE_STYLE.md inside this repository (absolute: /home/croco/dev/paper-ui/paperplan/CODE_STYLE.md, one c in croco). Read it by its relative path and continue phase 1.
- [x] 2026-09-23 [chat] [agent] Got it — that was just a typo in the path (extra c, wrong /home root), nothing to decide. Continuing phase 1: Row and RowSkeleton.
- [x] 2026-09-23 [question] [agent] Run-all parked on phase 3 ("Build the sidebar kit") — the agent needs a decision: grep denied by permission ask
- [x] 2026-09-23 [chat] Decision: do not look at paper-camp. The sidebar kit paragraph in the idea now carries every measurement and prop: SidebarCard layers flex column with min-height 0; SidebarLabel and SidebarItem are 32px cells, align-items flex-end, padding-bottom 4px, line-height 1, xs text; SidebarItem takes icon, count, note, busy, tone and disabled as described there. Build from that text and continue phase 3.
- [x] 2026-09-23 [chat] [agent] Noted — phases 1 and 2 are done, phase 3 (sidebar kit) is next in line.
- [x] 2026-09-23 [question] [agent] Run-all parked on phase 5 ("Export the new components and show them") — the agent needs a decision: grep denied by permission ask
- [x] 2026-09-23 [chat] Decision: not a decision, a permission wall. This project has been switched to the claude-code agent with a full read allowlist, so shell searches and git show now work. Recover the missing Menu section of the showcase from git (git show HEAD:<path>), restore it, finish phase 5, and run the checks.
- [x] 2026-09-23 [chat] [agent] That's on the checklist — phase 5 (export + showcase) is the last item and it's still unchecked, so it's already queued. Nothing to add here.

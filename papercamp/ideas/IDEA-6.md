---
id: IDEA-6
title: Sketch charts
type: feat
status: idea
created: 2026-09-22
tags:
  - charts
  - rough
subject: Components
order: 4
---

This library already draws with rough.js — `Skeleton`, `Divider` and
`Spinner` share `utils/rough.ts` — but exports no chart, so paper-camp
built four on a copy of the same generator: an arc gauge and a bar chart
for the hub, a stacked bar for the status mix, a progress bar for the
roadmap that competes with this library's own `Progress`, and a commit
rail. They are the sketch data-viz of the system and belong here.

**Four components.** `ArcGauge` (`value`, `max`, `label`, a 280° track
and value arc, `roughness` 1.6, stroke 6), `BarChart` (`bars: [{ label,
value, failed? }]`, solid fill with a hachured failed portion, a fixed
viewBox stretched to width), `StackedBar` (`segments: [{ label, value,
variant }]`), and `CommitRail` (`pushed`, `isFirst`, `isLast`: a straight
stroke, dashed amber when unpushed, and a rough dot, filled when pushed).
Colours come from the exported `color` tokens of [[IDEA-3]]; every
drawing seeds with `useStableSeed`.

**`Progress` gains `sketch`.** A hachured track and a solid fill drawn by
the generator, so the roadmap bar and the capacity bar are one component.

### Out of scope

Axes, legends and tooltips. Animated transitions.

### Phases
- [ ] Add `ArcGauge`
      A 280° rough track with the value arc over it, seeded by `useStableSeed`.
- [ ] Add `BarChart` and `StackedBar`
      Both draw filled bars into a fixed viewBox stretched to width, so they share the drawing helper; `BarChart` hachures the failed portion.
- [ ] Add `CommitRail`
      A stroke plus a dot per row, dashed amber until `pushed`, with `isFirst`/`isLast` trimming the stroke.
- [ ] Give `Progress` a `sketch` prop
      Hachured track, solid fill, drawn by the generator rather than CSS.
- [ ] Export the charts and show them
      Add the four components to `src/index.ts` and give each a showcase example with prop rows, including the new `Progress` prop.

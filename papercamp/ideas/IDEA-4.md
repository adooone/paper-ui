---
id: IDEA-4
title: Text, links, clickable stamps, icons
type: feat
status: idea
created: 2026-09-22
tags:
  - typography
  - button
  - stamp
  - icons
subject: Components
order: 2
---

paper-camp writes its typography as Tailwind strings — sixty combinations
of `font-handwritten`, a size and an opacity, one section-heading class
copied verbatim into six files — and hand-rolls 36 raw `<button>`s in
three shapes because `Button` has no bare link, `Stamp` cannot be
clicked, and nothing wraps a row without nesting buttons. It also keeps
17 icons this library lacks. These are the primitives paper-camp proved
it needs, named as it uses them.

**Typography gets components.** `Text` with `tone` (`primary`, `secondary`
at 0.7, `muted` at 0.55, `faint` at 0.45), `face` (`serif`, `sans`,
`handwritten`, `mono`, `display`), `size` (`3xs` to `lg`), `weight`, and
`truncate`. `Label` is `Text` preset to handwritten, xs, semibold, faint
— the sidebar and section label. `SectionHeading` is display serif, sm,
semibold, muted. `MetaLine` is handwritten, sm, faint, nowrap — the row
timestamp. `FactsGrid` takes `[{ label, value }]` and renders the
label-over-value grid paper-camp has implemented twice. `InlineCode` and
`CommandLine` (one-line command with `CopyButton`) move over as they are.

**Button gets `variant="link"`.** No chrome, `font: inherit`, underline,
inherits colour; `size` still applies. `IconButton` gains `size="tiny"`
(28px) and every size keeps a 44px tap area on touch.

**Stamp becomes pressable.** `onClick` renders a `<button>` with the
stamp's look, a lift on hover, and `pressed` for the chip-toggle case.
`Stamp` also accepts `icon`.

**Card and ListItem take a click.** `onClick` on either renders the
surface as one hit target with `role="button"` semantics and keyboard
activation, and children may still contain buttons; the library handles
the nesting the app worked around with a `biome-ignore`.

**The icon set grows by 17.** Wand, Push, Pull, Merge, Refresh, More,
Shuffle, Run, Stop, Bell, Chat, GitBranch, Github, Note, CheckAll,
SidebarToggle and Undo, each 16px, stroke 2, `currentColor`, exported
beside the six existing ones. `LightbulbIcon` takes `size` so the app's
copy can go.

**EmptyState and PageTitle move over.** `EmptyState` takes `message` and
an optional `illustration` node — the doodle stays the app's asset.
`PageTitle` is the display-serif `h1` that survives Tailwind's preflight.

### Out of scope

Rows, sidebars and settings, which are [[IDEA-5]]. Charts, [[IDEA-6]].

### Phases
- [ ] Add the `Text` family
      `Text` carries `tone`, `face`, `size`, `weight` and `truncate`; `Label`, `SectionHeading`, `MetaLine` and `PageTitle` are presets over it, with `PageTitle` an `h1` that holds its own type against preflight.
- [ ] Add the composed text blocks
      `FactsGrid`, `InlineCode`, `CommandLine` (with `CopyButton`) and `EmptyState`, each built from `Text` rather than raw class strings.
- [ ] Give `Button` a `link` variant and `IconButton` a `tiny` size
      The link variant drops the chrome and inherits font and colour; every `IconButton` size keeps a 44px tap area on touch.
- [ ] Make `Stamp`, `Card` and `ListItem` pressable
      `onClick` turns each surface into one hit target — a `<button>` for `Stamp` (plus `pressed` and `icon`), `role="button"` with keyboard activation for the two surfaces — and nested buttons keep working.
- [ ] Draw the 17 icons, then export and show the new surface
      Add them to `src/utils/icons.tsx` beside the six existing ones, give `LightbulbIcon` a `size`, and list every new component and prop in `src/index.ts` and the showcase.

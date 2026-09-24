---
id: IDEA-4
title: Text, links, clickable stamps, icons
type: feat
status: review
created: 2026-09-22
updated: 2026-09-24
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
- [x] Add the `Text` family
      `Text` carries `tone`, `face`, `size`, `weight` and `truncate`; `Label`, `SectionHeading`, `MetaLine` and `PageTitle` are presets over it, with `PageTitle` an `h1` that holds its own type against preflight.
- [x] Add the composed text blocks
      `FactsGrid`, `InlineCode`, `CommandLine` (with `CopyButton`) and `EmptyState`, each built from `Text` rather than raw class strings.
- [x] Give `Button` a `link` variant and `IconButton` a `tiny` size
      The link variant drops the chrome and inherits font and colour; every `IconButton` size keeps a 44px tap area on touch.
- [x] Make `Stamp`, `Card` and `ListItem` pressable
      `onClick` turns each surface into one hit target — a `<button>` for `Stamp` (plus `pressed` and `icon`), `role="button"` with keyboard activation for the two surfaces — and nested buttons keep working.
- [x] Draw the 17 icons, then export and show the new surface
      Add them to `src/utils/icons.tsx` beside the six existing ones, give `LightbulbIcon` a `size`, and list every new component and prop in `src/index.ts` and the showcase.
- [x] [manual] Own the app's exact interaction feel across components

### Fixes
- [x] A pressable `Stamp` keeps the handwritten face
      `.pressable` sets `font: inherit` to strip the button's UA font, and the shorthand also resets `font-family`, so every clickable stamp — the check stamps on the deliver row, the status-bar stamps, the filter chips — falls back to the page serif while static stamps stay handwritten. Replace the shorthand with the individual resets (`font-size`, `line-height`, `letter-spacing: inherit`) and leave `font-family` and `font-weight` to `.stamp`; the showcase shows a pressed and a static stamp side by side so a regression is visible.
      run: 43s · 32 in · 2.9k out · sonnet-5 · sess:8d0eb324-9f11-438f-93b1-f2523fb7dcc9
- [x] `Button variant="link"` wins over its size class
      `.link` is emitted after the size classes, or `styles[size]` is skipped when `isLink`, so a link is `padding: 0; font: inherit` with no min-height; today the default `medium` class turns every text link into a 24px button with 12px/24px padding at 1.5rem. Hover goes to opacity 1 from 0.7, as the app's links did.
      run: 1m26s · 30 in · 5.1k out · sonnet-5 · sess:2ca58b71-ab68-4016-90a1-9c71c33b1b91
- [x] Text components carry the sizes and colours they replaced
      `SectionHeading` is display serif, 1rem, 600, inherited colour at opacity .65. `Label` is handwritten .875rem, 600, inherited at .45. `MetaLine` is handwritten 1rem, inherited at .45, nowrap, with `size` for the 2xs and xs uses. `FactsGrid` labels are `Label`, values handwritten 1.125rem 600 nowrap, the grid `repeat(auto-fit, minmax(96px, 1fr))` with `gap 8px 16px` and an `align="end"` option. None of them set `$color-text-secondary`; they inherit ink and dim with opacity, as the app did.
      run: 1m33s · 26 in · 9k out · sonnet-5 · sess:2ca58b71-ab68-4016-90a1-9c71c33b1b91
- [x] `PageTitle`, `EmptyState`, `InlineCode` and `CommandLine` are the app's
      `PageTitle`: display serif 2.25rem, 600, line-height 1.1, letter-spacing 0, `margin-bottom: 1.5rem` by default. `EmptyState`: gap 12px, padding 24px 0, message handwritten 1.125rem inherited at .60, illustration at full opacity, an `action` slot under the message at the same gap. `InlineCode`: radius 3px, `rgba(0,0,0,.06)` fill, no border, padding .1em .35em, size inherited, wraps. `CommandLine`: a bare flex row — `code` as `InlineCode` in mono .875rem that wraps, `CopyButton` default — with the boxed field, prompt glyph and horizontal scroll behind a `boxed` prop that defaults off.
      run: 2m11s · 36 in · 13.2k out · sonnet-5 · sess:2ca58b71-ab68-4016-90a1-9c71c33b1b91
- [x] Icons are the app's glyphs
      Every moved icon keeps its old path data, default size and stroke: strokeWidth 1.5 for Wand, Push, Pull, Merge, Refresh, Bell, Chat and GitBranch; size 12 for Run, Stop and Chevron; Github as the solid 16-viewBox mark; More as three horizontal dots; SidebarToggle as the 18px hamburger; Shuffle and CheckAll (1.5) as they were; Lightbulb and Note at size 14 with their `<title>`, and an `opacity` prop the app sets to .55 where it did.
      run: 3m5s · 40 in · 17k out · sonnet-5 · sess:2ca58b71-ab68-4016-90a1-9c71c33b1b91
- [x] `Disclosure` leads with the chevron and takes a surface
      Chevron first, gap 8px, colour inherited, `surface="chalkboard"` for the dark panel, `underline` option for the show-more case, `min-width: 0` on the label so it can truncate, and no stretch when it sits in a flex column.
      run: 1m19s · 40 in · 6.3k out · sonnet-5 · sess:622af6ea-a307-46d2-8667-9dd972ad1cdf
- [x] Pressable `Stamp` and `Card` keep the app's feel
      Pressable stamps hover to `brightness(1.15)` and press to `.95`, as the raw buttons did, and take `disabled` so a disabled stamp leaves the tab order; `pressed` darkens nothing. `Card onClick` does not lift or shadow on hover. `IconButton size="tiny"` is 20px with a 20px icon.
      run: 1m21s · 44 in · 6k out · sonnet-5 · sess:622af6ea-a307-46d2-8667-9dd972ad1cdf
- [ ] Last drifts on links, stamps, icons, code and text
      `Button variant="link"` loses the new resting `opacity: .7`; it rests at full opacity as the app's links did. `.pressable` on `Stamp` drops `line-height: inherit` so the stamp keeps 1.2 inside a row. `CheckAllIcon` defaults to size 14. `IconButton size="tiny"` goes back to a 28px box with a 16px icon; the 20px stop button is the app's own override. `CommandLine` bare mode is `gap 8px`, `align-items: flex-start`, `justify-content: space-between`, `overflow-wrap: anywhere` on the code, and `flex-shrink: 0` on the copy button. `Text` and its presets set no colour at all — `color: inherit` — so a heading on a chalkboard card is chalk, as the app's opacity-only classes were.

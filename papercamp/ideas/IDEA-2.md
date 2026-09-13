---
id: IDEA-2
title: A hand-drawn Divider
type: feat
status: idea
created: 2026-09-13
tags:
  - components
subject: Components
order: 1
---

`Divider` draws a flat 1px CSS line, the one piece of the system that looks
machine-ruled on a page whose cards, buttons, and inputs are all pencilled
through `SketchBorder`. paper-camp is about to make the rule its only
grouping device — its IDEA-267 replaces every in-page `Card` with a
divider — and a hairline between two groups of hand-drawn controls reads
as a seam in the design, not a line on paper.

**`sketch` on the existing component.** `Divider` gains `sketch?: boolean`.
Set, the horizontal rule is one rough.js stroke drawn edge to edge instead
of the CSS line, and the vertical rule likewise. The stroke is generated
from `roughGenerator` the way `SketchBorder` does, with `smooth`'s single
pass rather than rough.js's doubling — a rule is one pencil line, not a
sketched outline — and settings that match the border presets so a
divider and a card edge look drawn by the same hand.

**The wobble is stable.** The seed comes from React's `useId`, so a rule
keeps its shape across re-renders and its neighbours differ from it; it
never re-wobbles while the page updates. Width is read from the host with
a `ResizeObserver`, since a rule spans whatever it is placed in.

**Both surfaces, and the label.** `surface="chalkboard"` draws the stroke
in chalk, as the flat rule already does. A `label` keeps its behaviour:
the stroke is drawn as two runs, one either side of the label, not one
run behind it.

**The flat rule stays the default.** `sketch` is opt-in, so nothing that
uses `Divider` today changes, and a dense list of rows keeps the quiet
hairline it wants.

### Out of scope

A sketch variant of any other component. Changing `SketchBorder`.

### Phases
- [ ] Draw the horizontal rule as one sketch stroke
      Add `sketch?: boolean` to `Divider`, seed the wobble from `useId`, measure the host width with a `ResizeObserver`, and generate a single-pass `roughGenerator` stroke with settings matched to the `sketchOutline` presets, coloured by `surface`.
- [ ] Cover the vertical rule and the labelled rule
      The vertical orientation draws the same stroke down its length; a `label` splits it into two runs, one either side.
- [ ] Show `sketch` in the showcase
      A sketched example in the Divider section plus the new prop row in its prop table.

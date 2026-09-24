---
id: IDEA-3
title: Own what paper-camp overrides
type: feat
status: review
created: 2026-09-22
updated: 2026-09-22
tags:
  - tokens
  - stamp
  - layout
subject: Components
order: 1
---

paper-camp is this library's reference application, and after a year of
daily use it has settled every question this library left open — by
overriding it. Its one stylesheet defines `--pui-btn-primary` and the rest
of the button palette *for* paper-ui, flips `--paper-font-default` to
sans, forces weight 600 on every button and link, and reaches into hashed
class names to clear the header's speckle. `src/app/styles/tokens.ts`
there is a hand-kept mirror of `_tokens.scss` because `Stamp` needs a
runtime string and this package exports none. paper-camp's choices win:
this idea makes them the defaults and exports what the app copies.

**Colours are exported as runtime strings.** `src/tokens.ts` gains a
`color` object with every semantic value paper-camp mirrors —
`textPrimary`, `textSecondary`, `accentAmber(Dark)`, `accentGreen(Dark)`,
`accentRose(Dark)`, `accentSlate(Dark)`, `accentBlue(Dark)`,
`accentPurple(Dark)`, the three `chalk*` values and `textureShade` —
generated from `_tokens.scss` by the existing tokens script so the two
can never drift, and a `surface` object naming the three app surfaces:
`page` (paper, shaded), `card` (parchment, shaded), `nestedCard` (canvas,
shaded).

**Stamp covers the whole status palette.** `StampVariant` gains `review`
(purple), `dropped` (deep rose), `idea` (slate), `muted` (done: faint
ink) and `faint` (the `rgba(0,0,0,0.06)` chip), each a fill and a text
colour from the token set, plus `surface="chalkboard"` that swaps to the
chalk pass/fail/running set. `fillColor`/`textColor` stay for the rare
one-off.

**The defaults are paper-camp's.** Every `button`, `a`, `[role=button]`,
`[role=tab]` and `[role=menuitem]` inside a `Layout` is weight 600, and
`Layout` gains `headerBackground="none"`; `headerHeight` already exists
and paper-camp adopts it. The body font and the button washes need no
change: paper-camp's `--paper-font-default` is this library's own serif
and its `--pui-btn-*` values are `$color-*-wash` to the digit, so those
overrides simply go on the app side.

**What exists is exported.** `roughGenerator` from `utils/rough.ts`,
`useStableSeed` from `hooks/use-stable-seed.ts`, and `ChevronRightIcon`
from `utils/icons.tsx` join `src/index.ts`.

### Out of scope

New components; those are [[IDEA-4]] onward. Any change to a component's
markup.

### Phases
- [x] Generate the runtime `color` and `surface` objects
      Add the missing purple ramp to `src/tokens.ts`, emit the two objects through `scripts/tokens-scss.ts` so `_tokens.scss` stays the same source, and export them from the `./tokens` entry.
- [x] Widen `StampVariant` and add `surface="chalkboard"`
      Map each new variant to a fill and text colour from the runtime tokens, keeping `fillColor`/`textColor` as the override.
- [x] Give `Layout` weight 600 and `headerBackground="none"`
      The weight applies to `button`, `a`, `[role=button]`, `[role=tab]` and `[role=menuitem]` inside the layout; `none` clears the header speckle paper-camp currently strips by hashed class name.
- [x] Export the missing utilities and show the new props
      `roughGenerator`, `useStableSeed` and `ChevronRightIcon` from `src/index.ts`, plus showcase examples and prop rows for the Stamp variants and the Layout prop.
- [x] [manual] Rotate only the chevron of the expanded accordion itself

### Fixes
- [ ] Stamp variants match the fills paper-camp painted, and the ring stays opt-in
      Every variant fill is alpha 0.25 as paper-camp's maps were, not 0.10–0.20, and the text colours are the ones the app used: `review` rgba(155,122,181,.25)/#7B5E9E, `muted` rgba(168,155,168,.25)/#6E5E6E, `dropped` rgba(201,139,139,.25)/#6E3A3A, `idea`/`neutral` rgba(138,155,168,.25)/#5E7080, `success` rgba(143,185,150,.25)/#5E8A66, `warning` rgba(212,163,115,.25)/#A67B4F. The pencil `blobRing` is drawn only when a new `ring` prop is set, never because `variant` is; paper-camp's stamps had no ring. `faint` is rgba(0,0,0,.06) with text inherited, as the app's neutral chips were.
- [ ] Chalkboard colours are the app's plates, not washes
      `color.chalkPass/chalkFail/chalkRunning` are the opaque fills paper-camp used, #2d5a3b, #5a2d2d and #5a4a2d, with text #b5d6b5, #d6a0a0 and #d6c4a0; the chalkboard accent stays its own token. `surface="chalkboard"` on `Stamp` paints those plates.
- [ ] The 600 weight for clickables is global
      The `button, a, [role=button], [role=tab], [role=menuitem] { font-weight: 600 }` rule moves from `layout.module.scss` to `globals.scss`, since an app's header, status bar, panels and every portal (`Menu`, `Modal`, `Select`, `Toast`, `Tooltip`) render outside `Layout`. `$color-primary-wash-active` becomes rgba(143,185,150,.30), the value paper-camp shipped.
- [ ] The type scale is paper-camp's
      `_tokens.scss` font sizes become the app's: 3xs .6875rem, 2xs .75, xs .875, sm 1, base 1.125, md 1.25, and the showcase re-checks every component at the new scale. Every typography swap in paper-camp shrank one step because the two scales disagreed under the same names.

### Thread
- [x] 2026-09-22 [question] [agent] Run-all parked on phase 3 ("Default the body to sans and name the button palette") — the agent needs a decision: glob denied by permission ask
- [x] 2026-09-22 [question] [agent] Run-all parked on phase 3 ("Default the body to sans and name the button palette") — the agent needs a decision: grep denied by permission ask
- [x] 2026-09-22 [question] [agent] Run-all parked on phase 3 ("Default the body to sans and name the button palette") — the agent needs a decision: read outside workspace: /home/croco/dev/paper-camp/src/app/styles/utilities.css
- [x] 2026-09-22 [chat] Decision: the phase you parked on is removed. It rested on a wrong premise: paper-camp's --paper-font-default is this library's own serif and its --pui-btn-* values equal the $color-*-wash tokens to the digit, so there is nothing to move and nothing to read across repos. The idea body is corrected. Continue with the remaining phases: Layout weight 600 plus headerBackground="none", then the exports and showcase. Never read outside this repository; everything a phase needs is in the idea text.
- [x] 2026-09-22 [chat] [agent] Got it — continuing on phase 3: Layout weight 600 on interactive elements plus headerBackground="none".

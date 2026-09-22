---
id: IDEA-3
title: Own what paper-camp overrides
type: feat
status: in-progress
created: 2026-09-22
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

**The defaults are paper-camp's.** Body text defaults to the sans stack,
with `--paper-font-default` still honoured for anyone who wants serif.
Every `button`, `a`, `[role=button]`, `[role=tab]` and `[role=menuitem]`
inside a `Layout` is weight 600. The button palette lives in
`_tokens.scss` under the names paper-camp already uses. `Layout` gains
`headerBackground="none"`; `headerHeight` already exists and paper-camp
adopts it.

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
- [ ] Default the body to sans and name the button palette
      Flip the `--paper-font-default` fallback in `globals.scss` and move paper-camp's `--pui-btn-*` values into `_tokens.scss`.
- [ ] Give `Layout` weight 600 and `headerBackground="none"`
      The weight applies to `button`, `a`, `[role=button]`, `[role=tab]` and `[role=menuitem]` inside the layout; `none` clears the header speckle paper-camp currently strips by hashed class name.
- [ ] Export the missing utilities and show the new props
      `roughGenerator`, `useStableSeed` and `ChevronRightIcon` from `src/index.ts`, plus showcase examples and prop rows for the Stamp variants and the Layout prop.

### Thread
- [ ] 2026-09-22 [question] [agent] Run-all parked on phase 3 ("Default the body to sans and name the button palette") — the agent needs a decision: glob denied by permission ask
- [ ] 2026-09-22 [question] [agent] Run-all parked on phase 3 ("Default the body to sans and name the button palette") — the agent needs a decision: grep denied by permission ask

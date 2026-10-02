---
id: IDEA-12
title: Five rules the parity pass still found
type: fix
status: idea
created: 2026-10-02
tags:
  - stamp
  - button
  - text
  - setting-row
  - setting-group
subject: Components
order: 1
---

The migration is complete on both sides and a side-by-side of paper-camp's
production build against its last pre-migration deployment, measured
element by element in the browser, finds every font family, size, colour
and opacity identical on Settings, the idea page, the hub, the stack
panel and Git. What is left is five rules in this library, each of which
shows up on several pages at once.

**A pressable `Stamp` keeps `line-height: 1.2`.** `.pressable` still
ships `line-height: inherit`, so a clickable stamp inside a 32px row or a
toolbar becomes 32px tall: the log filters and the deliver checks are
32px where their static twins are 23px, and that pushes the commit field
8px down. The IDEA-4 fix said to drop this line and the build does not
have it; drop it, and add the rendered-height assertion to the stamp
test so a pressed and a static stamp of the same size measure the same.

**`Button variant="link"` is a clickable.** `.link` sets
`font-weight: inherit`, which beats the global 600 rule every other
clickable obeys, so *Mark all read*, *more*, *Clear filters* and *Show
more* render at 400 where the raw buttons they replaced were 600. Remove
`font-weight` from `.link`; the global rule supplies 600 as it does for
every button.

**`Text` does not set a weight it was not given.** The default
`weight="normal"` emits `font-weight: 400`, so a `MetaLine` or any `Text`
inside a clickable row — plan dates, log row meta, the roadmap progress
line — drops to 400 where the baseline's plain spans inherited the row's
600. `Text` adds a weight class only when `weight` is passed; the four
presets that want a weight (`Label`, `SectionHeading`, `FactsGrid`
values) pass it explicitly.

**`SettingGroup`'s header has no inset.** The header carries
`padding: 0 .875rem`, so a group title sits 14px right of where the
baseline drew it; the rows have their own inset and the title had none.
Header padding is 0.

**`SettingRow`'s label cell is 32px.** A row whose control is a toggle is
36px tall against the baseline's 45px, because the label column is sized
to its text; the baseline's label cell was 32px min. `.label` gets
`min-height: 2rem` with its content centred, so every row is at least
the control's height.

### Out of scope

Anything in paper-camp's own markup: the status bar's fold threshold and
Setup stamp, the roadmap row padding and the page-title margins are its
IDEA-288.

### Phases
- [ ] Drop `line-height: inherit` from the stamp's `.pressable`
      Add the rendered-height assertion so a pressed and a static stamp of the same size measure the same.
- [ ] Remove `font-weight` from the button's `.link`
- [ ] Make `Text` emit a weight class only when `weight` is passed
      Check the presets and in-repo callers that relied on the `normal` default and pass it where it is wanted.
- [ ] Zero the `SettingGroup` header padding
- [ ] Give `SettingRow`'s `.label` `min-height: 2rem` with centred content

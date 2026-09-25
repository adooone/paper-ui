---
id: IDEA-8
title: Text never applied its props
type: fix
status: idea
created: 2026-09-24
tags:
  - text
  - stamp
  - row
  - sidebar
subject: Components
order: 1
---

Every published build of `Text` drops every prop. The build camel-cases
CSS-module keys (`localsConvention: 'camelCaseOnly'` in `vite.shared.ts`),
so the map exports `faceDisplay`, `sizeSm`, `weightSemibold`, `tonePrimary`
— and `text.tsx` looks up `styles['face-display']`, which is `undefined`.
`Text` renders as a bare `.text`, and so does everything built on it:
`Label`, `MetaLine`, `SectionHeading`, `FactsGrid`, `EmptyState`'s
message, `SettingGroup`'s title, paper-camp's detail heading. A computed
style on paper-camp's idea page shows the display-face 600 heading as
Cormorant 400, and a list date meant to be handwritten as body serif.
Two source audits could not see it, because the source is right and the
bundle is wrong. This is why "fonts changed in many places".

**`Text` looks up the keys the build emits.** The four class names are
built by a small `key(prefix, value)` helper that camel-cases the value,
so `face="display"` reads `styles.faceDisplay`. A test renders `Text`
once per `face`, `size`, `weight` and `tone` and asserts the element's
class list contains the module's class for that value — through the real
module map, so a future build change fails the test, not the app. The
showcase's Text section shows every face at every size.

**The stamp ring is on where it always was.** A `Stamp` with one of the
five original variants — `neutral`, `info`, `success`, `warning`, `error`
— draws its pencil ring by default, as it did in 0.20; the variants added
for paper-camp's status maps (`review`, `dropped`, `idea`, `muted`,
`faint`) default to no ring, since they replaced ring-less
`fillColor` stamps. An explicit `ring` prop overrides either default.
Making the ring opt-in for all variants stripped it from the deliver
checks, the log filters and the status bar.

**Rows and sidebar items keep still.** `Row` paints no hover fill on any
surface — the card row and the ruled row it replaced had none; only
`active` paints. A `Row` whose `columns` omits `id` or `meta` renders no
cell and no gap for it, so a two-column row (the git file list) does not
wrap. `SidebarItem`'s `note` wraps to as many lines as it needs, as the
command note under *Create branch* did, instead of truncating.

### Out of scope

Anything in `Text`'s design. The type scale, which IDEA-3's last fix
already put back.

### Phases
- [ ] Look up the keys the build emits in `Text`
      Add the `key(prefix, value)` helper that camel-cases the value and use it for `face`, `size`, `weight` and `tone` in `text.tsx`.
- [ ] Test every `face`, `size`, `weight` and `tone` against the module map
      Assert the rendered class list contains `styles[...]` for each value, so a future `localsConvention` change fails the test.
- [ ] Turn the stamp ring back on for the five original variants
      `neutral`, `info`, `success`, `warning` and `error` ring by default, the paper-camp status variants do not, and `ring` overrides both.
- [ ] Keep `Row` and `SidebarItem` still
      Drop `Row`'s hover fill on every surface, render no cell or gap for a `columns` entry that omits `id` or `meta`, and let `SidebarItem`'s `note` wrap.
- [ ] Show every face at every size in the showcase
      Extend the Text section so a dropped prop is visible on the page.

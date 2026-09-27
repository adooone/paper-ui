---
id: IDEA-10
title: Text survives the class joiner, skeleton keeps its card
type: fix
status: idea
created: 2026-09-27
tags:
  - row
  - skeleton
  - text
subject: Components
order: 1
---

`Row` got its card surface back in 0.22.2 — the parchment texture, the
shade, the sketch border, the drop shadow — but `RowSkeleton` kept the
old flat `.surfaceCard` class, so a loading list is a stack of white
slabs that snap into textured cards when the data lands. paper-camp's
Plans page shows it on every load.

**`RowSkeleton` renders through `Row`'s surface.** For `card` and
`nestedCard` it uses the same texture layer, `SketchBorder` and shadow
`Row` draws, at the same padding and radius, so a skeleton row and the
row that replaces it are the same box with different contents. The flat
`.surfaceCard` and `.surfaceNestedCard` rules are deleted from
`row.module.scss`, since nothing else may use them. The showcase shows a
`RowSkeleton` above a `Row` of the same surface.

**`Text`'s classes never reach the page.** IDEA-8 fixed the key lookup,
and the bundle carries it, yet a `MetaLine` on paper-camp's Plans page
renders with only `text-module__noWrap` on it. `cn` runs `tailwind-merge`,
which reads any class starting with `text-` as a Tailwind text utility and
keeps only the last of a conflicting set — and every class in
`text.module.scss` is `text-module__…`. Rename the module to
`typography.module.scss`, whose classes no Tailwind group claims, and
give `cn` a test that joins a full set of `Text` classes and asserts all
of them survive, so a module name can never collide again. Audit the
other module names against Tailwind's group prefixes while there — `table`,
`divider`, `progress` — and rename any that match.

### Out of scope

The skeleton's bar widths and placeholders, which IDEA-5 settled.

### Phases
- [ ] Render `RowSkeleton` through `Row`'s surface
      Reuse `Row`'s texture class, `SketchBorder` wrapper and shadow for `card` and `nestedCard`, and delete the flat `.surfaceCard` and `.surfaceNestedCard` rules.
- [ ] Rename `text.module.scss` to `typography.module.scss`
- [ ] Audit the remaining module names against Tailwind's group prefixes
      Rename any module whose emitted classes a Tailwind group would claim, and its importers with it.
- [ ] Cover `cn` with a class-survival test
      `cn` is a pure function, so this needs a runner wired into the existing Vite config, not a DOM renderer.
- [ ] Show a `RowSkeleton` above a `Row` of the same surface in the showcase

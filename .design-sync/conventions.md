## Conventions

**No provider or theme wrapper required.** Paper UI has no `ThemeProvider` or context — every component is self-contained. Theming is per-component via the `surface` prop (`'paper' | 'chalkboard'`, default `'paper'`), not a global mode. Mix surfaces freely within one composition (e.g. a chalkboard `Card` on an otherwise paper page) if that's the intent.

**Styling idiom: component props, not utility classes.** Consumers style through a small, consistent prop vocabulary rather than className strings:

| Prop | Values | Where |
|---|---|---|
| `surface` | `'paper' \| 'chalkboard'` | almost every component |
| `variant` | semantic tone, varies per component — `Button`: `'primary'\|'secondary'\|'ghost'\|'danger'`; `Alert`/`Stamp`/`Toast`: `'info'\|'success'\|'warning'\|'error'` (`Stamp` adds `'neutral'`); `Card`: `'default'\|'elevated'` | Button, Alert, Stamp, Card, and others |
| `size` | `'small'\|'medium'\|'large'` (some components only support `'small'\|'medium'`) | form and interactive components |
| `texture` | `boolean \| 'white'\|'paper'\|'speckle'\|'parchment'\|'canvas'\|'kraft'\|'chalkboard' \| TextureConfig` | Alert, Card, Modal, Page, Select, Table, Tooltip |
| `wobble` | `number` 0–1, controls hand-drawn blob-shape randomness | Button, IconButton, Stamp, Checkbox, Switch |

`className` is accepted everywhere as an escape hatch, but the intended API surface is props, not classes.

**Where the truth lives.** `styles.css` is the full stylesheet closure (imports the compiled component CSS and every shipped `@font-face` rule) — read it before hand-writing any color or spacing value. Per-component API and usage live in each `<Name>.d.ts` and `<Name>.prompt.md`; treat those, not this file, as the prop-level source of truth.

**Build example** (real composition, verified against the shipped `.d.ts`):

```tsx
import { Card, Button, Stamp } from '@dendelion/paper-ui';

<Card variant="elevated" surface="paper">
  <Stamp variant="success" dot wobble={0}>Active</Stamp>
  <Button variant="primary" size="medium">Save changes</Button>
</Card>
```

**Optional companion preset.** `@dendelion/paper-ui/tailwind` exports a Tailwind preset with the raw design tokens (`paper-*`, `ink-*`, `canvas-*`, `watercolor-*` color scales, plus texture-class utilities like `bg-paper-texture`/`bg-kraft-texture`) for layout glue around the components — optional, and not how the components themselves are styled.

# @dendelion/paper-ui

<p align="center">
  <strong>Natural-material React component library — paper, ink, canvas, and watercolor.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@dendelion/paper-ui">
    <img src="https://img.shields.io/npm/v/@dendelion/paper-ui.svg?style=flat-square&color=%23D4A373" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white&color=%23D4A373" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB&color=%23D4A373" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white&color=%23D4A373" alt="Tailwind CSS" />
</p>

## Features

- **Natural Materials** — Textured paper backgrounds, ink borders, canvas weaves, watercolor washes
- **37 Components** — Layout primitives, form controls, data display, navigation, feedback, and overlays (see [Components](#components))
- **Tailwind CSS Preset** — `paperPreset` with warm color tokens (paper, ink, canvas, watercolor)
- **7 Paper Textures** — SVG-generated grain: white, paper, speckle, parchment, canvas, kraft, chalkboard
- **Ruled Overlays** — Notebook lines and grid patterns in blue, brown, or black
- **TypeScript** — Full type support with strict checking
- **SCSS Modules** — Scoped component styles with shared mixins and tokens
- **Self-Hosted Fonts** — Luminari (display), Cormorant Garamond (body), Caveat (handwritten)

## Installation

```bash
npm install @dendelion/paper-ui
# or
pnpm add @dendelion/paper-ui
```

### Peer Dependencies

```bash
npm install react react-dom tailwindcss
```

## Quick Start

### 1. Configure Tailwind CSS

```ts
// tailwind.config.ts
import { paperPreset } from '@dendelion/paper-ui/tailwind';

export default {
  presets: [paperPreset],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

### 2. Import Global Styles

```ts
// In your app entry (e.g., main.tsx)
import '@dendelion/paper-ui/dist/index.css';
```

This imports the bundled CSS including fonts, base styles, and Tailwind directives.

### 3. Use Components

```tsx
import { Layout, Page, Button, Checkbox, IconButton } from '@dendelion/paper-ui';

function App() {
  return (
    <Layout
      title="Dashboard"
      subtitle="Welcome back"
      navigationItems={[
        { id: 'home', label: 'Home', path: '/' },
        { id: 'plans', label: 'Plans', path: '/plans' },
      ]}
    >
      <Page>
        <Button variant="primary" size="medium">
          Create Plan
        </Button>
        <Checkbox label="Show completed" />
        <IconButton icon={<SettingsIcon />} label="Settings" />
      </Page>
    </Layout>
  );
}
```

## Components

The library exports 37 components. The core layout and form primitives are documented below; the full set is:

| Category | Components |
|----------|-----------|
| **Layout** | `Layout`, `Page`, `Card`, `Divider`, `Accordion` |
| **Navigation** | `Island`, `NavigationIsland`, `Tabs`, `Breadcrumb`, `Pagination` |
| **Forms** | `Button`, `IconButton`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Input`, `Select`, `Textarea` |
| **Data display** | `Table`, `ListItem`, `Stamp`, `Badge`, `Avatar`, `PropTable`, `Swatch`, `Icon` |
| **Feedback** | `Alert`, `ToastProvider`, `Progress`, `Spinner`, `Skeleton` |
| **Overlay** | `Modal`, `Tooltip`, `Menu` |
| **Code** | `CodeBlock`, `CopyButton` |

All components are documented with live demos and prop tables in the built-in showcase (`pnpm run dev`).

All components are named exports with a matching `{Component}Props` type.

Components that support the dark "chalkboard" theme accept a `surface` prop (`'paper' | 'chalkboard'`, default `'paper'`), kept separate from each component's semantic `variant`:

```tsx
<Button variant="primary" surface="chalkboard">Save</Button>
<Input label="Name" surface="chalkboard" />
```

### Layout

Page shell with configurable sidebar, header, footer, and content area.

```tsx
<Layout
  title="Page Title"
  subtitle="Optional subtitle"
  showHeader={true}
  showSidebar={true}
  showFooter={false}
  showPage={true}
  background="paper" // 'paper' | 'parchment' | 'kraft' | 'marble' | 'speckle' | 'canvas'
  navigationItems={[...]}
  headerActions={<><Button>Action</Button></>}
  navigationIsland={<NavigationIsland items={[...]} />}
>
  {children}
</Layout>
```

### Page

Content wrapper with paper texture background and optional watercolor accent.

```tsx
<Page withAccent accentColor="green">
  {children}
</Page>
```

The `texture` prop is shared across textured components (`Page`, `Card`, `Alert`, `Modal`, `Select`, `Table`). It accepts a **name**, a **config**, or a **boolean** to toggle the default:

```tsx
<Card texture="kraft" />                              {/* named texture */}
<Card texture={{ texture: 'paper', ruledType: 'lines' }} />  {/* full config */}
<Page texture={false} />                              {/* disable the default */}
```

### Button

Pressed paper button with ink stamp effect and watercolor wash on hover.

```tsx
<Button variant="primary" size="medium" icon={<PlusIcon />}>
  Click Me
</Button>
```

**Variants:** `primary` | `secondary` | `ghost` | `danger`
**Sizes:** `small` | `medium` | `large`

### Checkbox

Hand-drawn square with animated SVG ink checkmark.

```tsx
<Checkbox label="Enable feature" labelPosition="right" />
```

### IconButton

Circular canvas patch button with watercolor glow ring on hover.

```tsx
<IconButton icon={<SearchIcon />} variant="default" size="medium" label="Search" />
```

### NavigationIsland

Floating pill-style navigation bar with paper texture background.

```tsx
<NavigationIsland
  items={[
    { id: 'dash', label: 'Dashboard', icon: <HomeIcon /> },
    { id: 'plans', label: 'Plans', icon: <FolderIcon /> },
  ]}
  activeId={activeId}
  onSelect={setActiveId}
/>
```

## Design Tokens

### Colors

| Token | Usage |
|-------|-------|
| **paper** | Backgrounds, surfaces (warm off-white scale) |
| **ink** | Text, borders, shadows (deep charcoal scale) |
| **canvas** | Buttons, patches, sidebar (cream weave scale) |
| **watercolor** | Accents, hover states, focus rings (blue, green, amber, rose, slate) |

### Typography

| Role | Font | Usage |
|------|------|-------|
| **Display** | Luminari | Titles, buttons, navigation, logo |
| **Body** | Cormorant Garamond | Paragraphs, descriptions, labels |
| **Handwritten** | Caveat | Tags, annotations, special labels |
| **Mono** | JetBrains Mono | Code, data, timestamps |

### Textures

Available as Tailwind utilities:

- `bg-paper-texture` — Subtle grain noise
- `bg-speckle-texture` — Coarse speckled noise
- `bg-parchment-texture` — Warm aged paper
- `bg-canvas-weave` — Desaturated woven grain
- `bg-kraft-texture` — Brown craft paper
- `bg-marble-texture` — Cool stone grain

## Native / Dependency-Free Consumer

Paper UI ships three things a non-web client (such as the Paper Camp phone
app) can consume without pulling React, framer-motion, or roughjs:

| Path | Contents |
|------|----------|
| `@dendelion/paper-ui/tokens` | The full token objects (`colors`, `paper`, `ink`, `canvas`, `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `radii`, `shadows`, `space`) and the `withAlpha` helper — as `as const` objects with no imports. |
| `@dendelion/paper-ui/dist/fonts/` | The self-hosted display font (`Luminari-Regular.woff`). |
| `@dendelion/paper-ui/dist/img/` | Image assets bundled with the package (e.g. `logo.svg`). |

```ts
// From React Native, an Electron renderer, or any non-React host:
import {
  colors,
  paper,
  ink,
  canvas,
  fontFamily,
  space,
  radii,
  withAlpha,
} from '@dendelion/paper-ui/tokens';
```

The `./tokens` entry has no React dependency, so it works in any JS
runtime that resolves npm packages. Web consumers can keep importing
`colors`, `space`, and `withAlpha` from the package root — they are
re-exported there for backward compatibility.

## Development

```bash
# Install dependencies
pnpm install

# Start showcase dev server
pnpm run dev

# Build library
pnpm run build

# Type check
pnpm run check-types

# Lint and format (Biome)
pnpm run lint
pnpm run lint:fix
```

## License

MIT

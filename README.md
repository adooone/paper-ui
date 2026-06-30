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
- **24 Components** — Layout primitives, form controls, data display, and feedback (see [Components](#components))
- **Tailwind CSS Preset** — `paperPreset` with warm color tokens (paper, ink, canvas, watercolor)
- **6 Paper Textures** — SVG-generated grain: paper, parchment, kraft, marble, speckle, canvas
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
import '@dendelion/paper-ui';
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
      <Page withTexture>
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

The library exports 24 components. The core layout and form primitives are documented below; the full set is:

| Category | Components |
|----------|-----------|
| **Layout** | `Layout`, `Page`, `Island`, `NavigationIsland`, `Card` |
| **Forms** | `Button`, `IconButton`, `Checkbox`, `Input`, `Textarea`, `Select`, `Tabs` |
| **Data display** | `Table`, `ListItem`, `Accordion`, `PropTable`, `Swatch`, `Stamp`, `Icon` |
| **Feedback** | `Alert`, `Modal`, `Progress` |
| **Code** | `CodeBlock`, `CopyButton` |

All components are named exports with a matching `{Component}Props` type.

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
<Page withTexture withAccent accentColor="green">
  {children}
</Page>
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
    { id: 'dash', label: 'Dashboard', path: '/', icon: <HomeIcon /> },
    { id: 'plans', label: 'Plans', path: '/plans', icon: <FolderIcon /> },
  ]}
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
- `bg-parchment-texture` — Warm aged paper
- `bg-kraft-texture` — Brown craft paper
- `bg-marble-texture` — Cool stone grain
- `bg-speckle-texture` — Fine speckled noise
- `bg-canvas-texture` — Crosshatch weave

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

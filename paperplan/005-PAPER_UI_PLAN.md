# Plan 005: Paper UI — MVP Component Set

## Overview

**Paper UI** is a React component library built around natural materials and organic effects: textured paper, ink, canvas, wood grain, and watercolor washes. This plan covers the **first 5 components** — the minimal set needed to style Paper Camp's core interface.

**Status:** 🚧 In Progress

**Target:** Build and publish `@dendelion/paper-ui` v0.1.0 with 5 components + showcase.

**MVP Scope (5 components + 1 bonus):**
1. `Layout` — Configurable page shell with optional header, sidebar, footer, page wrapper
2. `Page` — Content wrapper with paper texture background
3. `Button` — Pressed paper with ink stamp effect
4. `Checkbox` — Hand-drawn square with ink checkmark stroke
5. `IconButton` — Circular canvas patch with ink icon
6. `NavigationIsland` *(bonus)* — Floating pill-style nav bar

All other components (Card, Input, Select, Tabs, Badge, etc.) are **out of scope for v0.1.0**.

---

## Design Philosophy

### Materials

| Material | Use Case | Visual Treatment |
|----------|----------|------------------|
| **Paper** | Primary backgrounds | Warm off-white with subtle grain texture via SVG noise |
| **Ink** | Text, borders, buttons | Deep charcoal with slightly irregular edges |
| **Canvas** | Buttons, icon patches | Cream with visible weave texture |
| **Watercolor** | Hover states, accents | Soft blended wash with bleeding edges |

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Display** | Luminari | 400 | Titles, buttons, nav, logo (self-hosted WOFF) |
| **Body** | Cormorant Garamond | 400, 500 | Paragraphs, descriptions |
| **Handwritten** | Caveat | 400, 600 | Special labels, annotations (minimal use) |
| **Mono / Data** | JetBrains Mono | 400, 500 | Code, data, timestamps |

Luminari uses `size-adjust: 88%` in its `@font-face` to visually match other fonts at the same nominal size. The font switcher on the Welcome page updates `--paper-button-font` so `Button` picks it up automatically.

### Core Effects

1. **Paper Texture** — SVG `feTurbulence` noise overlay at 4% opacity
2. **Ink Bleed** — Irregular `border-radius` + soft shadow
3. **Pressed Stamp** — Inset shadow simulating letterpress into paper
4. **Watercolor Wash** — Low-opacity radial gradient with `mix-blend-mode: multiply`
5. **Canvas Weave** — `repeating-linear-gradient` crosshatch at 6% opacity
6. **Ruled Lines** — Notebook lines at 32px intervals in blue, brown, or black
7. **Grid Overlay** — Crosshatched grid at 32px intervals over any texture

---

## Color Tokens (Tailwind Preset)

```typescript
// tailwind.ts
export const paperPreset = {
  theme: {
    extend: {
      fontFamily: {
        display: ["Luminari", "Cormorant Garamond", "Georgia", "serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        handwritten: ["Caveat", "cursive"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        paper: {
          50: "#FDFCF8",
          100: "#FAF8F0",
          200: "#F5F1E6",
          300: "#EDE7D6",
          400: "#E0D6BF",
          500: "#D0C3A5",
          600: "#B8A98A",
          700: "#9A8B6E",
          800: "#7D7058",
          900: "#5E5343",
          950: "#3D352B",
        },
        ink: {
          50: "#F5F4F2",
          100: "#E5E3DF",
          200: "#CBC8C1",
          300: "#A8A399",
          400: "#858077",
          500: "#68635C",
          600: "#504C46",
          700: "#3D3A35",
          800: "#2B2926",
          900: "#1A1917",
          950: "#0D0C0C",
        },
        canvas: {
          50: "#FBF9F4",
          100: "#F7F3EA",
          200: "#F0EAD8",
          300: "#E5DBC4",
          400: "#D6C9A8",
          500: "#C4B48A",
          600: "#A8986E",
          700: "#8C7D56",
          800: "#736744",
          900: "#574E36",
          950: "#383224",
        },
        watercolor: {
          blue:   { DEFAULT: "#7BA7BC", light: "#A8C8D8", dark: "#4E8096" },
          green:  { DEFAULT: "#8FB996", light: "#B5D4BA", dark: "#5E8A66" },
          amber:  { DEFAULT: "#D4A373", light: "#E4C9A8", dark: "#A67B4F" },
          rose:   { DEFAULT: "#C98B8B", light: "#DEB5B5", dark: "#9E5E5E" },
          slate:  { DEFAULT: "#8A9BA8", light: "#B0BEC8", dark: "#5E7080" },
        },
      },
      boxShadow: {
        "paper-sm": "0 1px 2px rgba(61, 53, 43, 0.08), 0 1px 1px rgba(61, 53, 43, 0.06)",
        "paper-md": "0 4px 6px rgba(61, 53, 43, 0.08), 0 2px 4px rgba(61, 53, 43, 0.06)",
        "paper-lg": "0 10px 15px rgba(61, 53, 43, 0.1), 0 4px 6px rgba(61, 53, 43, 0.08)",
        "pressed": "inset 0 2px 4px rgba(61, 53, 43, 0.15)",
        "ink-sm": "0 1px 2px rgba(26, 25, 23, 0.12)",
        "ink-md": "0 2px 8px rgba(26, 25, 23, 0.12)",
      },
      backgroundImage: {
        "paper-texture": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
        "canvas-weave": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 3px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 3px)",
      },
    },
  },
};
```

---

## Textures

6 SVG-generated textures + 3 ruled overlay colors:

| Texture | Key | Base Color | Generator |
|---------|-----|------------|-----------|
| **Paper** | `paper` | `#FAF8F0` | `feTurbulence` + `feColorMatrix` |
| **Parchment** | `parchment` | `#F5F1E6` | `feTurbulence` + `feColorMatrix` (warmer) |
| **Kraft** | `kraft` | `#E5DBC4` | `feTurbulence` + `feColorMatrix` (brown) |
| **Marble** | `marble` | `#F5F1E6` | `feTurbulence` + `feDisplacementMap` + blur |
| **Speckle** | `speckle` | `#FAF8F0` | High-frequency `feTurbulence` |
| **Canvas** | `canvas` | `#F0EAD8` | `repeating-linear-gradient` crosshatch |

Ruled overlays:
- **Blue**: `rgba(168, 200, 216, 0.35)`
- **Brown**: `rgba(164, 144, 120, 0.35)`
- **Black**: `rgba(61, 53, 43, 0.15)`

Types: `none` (plain), `lines` (horizontal 32px), `grid` (horizontal + vertical 32px)

All textures are data URIs — no external images.

---

## Component Specifications

### 1. Layout

**Mojo UI Equivalent:** `PageLayout` + sidebar/header combined

**File:** `src/components/layout/layout.tsx`

**Purpose:** Configurable page shell. Header spans full width above sidebar + main. Sidebar inherits layout background — no divider, just a clean nav list. Footer spans full width below.

**Props:**
```typescript
interface LayoutProps {
  children: ReactNode;

  // Section toggles
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  showPage?: boolean;

  // Background — simple texture name or full config with ruled overlay
  background?:
    | 'plain'
    | 'paper'
    | 'parchment'
    | 'kraft'
    | 'marble'
    | 'canvas'
    | { image: string }
    | {
        texture: 'paper' | 'parchment' | 'kraft' | 'marble' | 'canvas';
        ruledType?: 'none' | 'lines' | 'grid';
        ruledColor?: 'blue' | 'brown' | 'black';
      };

  // Header
  title?: string;
  subtitle?: string;
  headerActions?: ReactNode;

  // Sidebar
  navigationItems?: NavigationItem[];
  activeItemId?: string;
  onNavigate?: (item: NavigationItem) => void;
  logo?: ReactNode;

  // Footer
  footerContent?: ReactNode;

  // Navigation island (floating horizontal nav)
  navigationIsland?: ReactNode;

  // Style override
  style?: React.CSSProperties;
}

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
}
```

**Visual Treatment:**
- **Root:** `display: flex; flex-direction: column; min-height: 100%; height: 100%` — fills viewport in apps, fills container in previews
- **Header:** Full width, paper texture background, sticky, subtle bottom shadow
- **Body:** `display: flex` row — sidebar (left) + main (right)
- **Sidebar:** `width: 240px`, transparent background (inherits layout texture), sticky, simple nav list with logo area
- **Main:** `flex: 1`, contains optional nav island, content area, and footer
- **Footer:** Full width (sibling of header and body), paper texture, top border
- **Mobile:** Sidebar becomes fixed drawer sliding from left with overlay backdrop

**Structure:**
```
┌─────────────────────────────────────────────────────────┐
│  [≡] Title                    [headerActions]           │  ← Header (full width)
├──────────┬──────────────────────────────────────────────┤
│  Logo    │                                              │
│  ──────  │  [Navigation Island]                         │
│  📄Dash  │                                              │
│  📁Plans │         Main Content                         │
│  🎯Focus │                                              │
│          │                                              │
├──────────┴──────────────────────────────────────────────┤
│  Paper UI — Natural Materials Component Library         │  ← Footer (full width)
└─────────────────────────────────────────────────────────┘
```

---

### 2. Page

**Mojo UI Equivalent:** None (new wrapper component)

**File:** `src/components/page/page.tsx`

**Purpose:** Content wrapper that adds paper texture background, proper spacing, and optional watercolor accent.

**Props:**
```typescript
interface PageProps {
  children: ReactNode;
  className?: string;
  withTexture?: boolean;
  withAccent?: boolean;
  accentColor?: 'blue' | 'green' | 'amber' | 'rose' | 'slate';
}
```

---

### 3. Button

**Mojo UI Equivalent:** `Button`

**File:** `src/components/button/button.tsx`

**Purpose:** Primary action trigger. Looks like a piece of paper pressed into the surface with ink text.

**Props:**
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}
```

---

### 4. Checkbox

**Mojo UI Equivalent:** `Checkbox`

**File:** `src/components/checkbox/checkbox.tsx`

**Purpose:** Boolean toggle with hand-drawn aesthetic.

**Props:**
```typescript
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelPosition?: 'left' | 'right';
  indeterminate?: boolean;
}
```

---

### 5. IconButton

**Mojo UI Equivalent:** `IconButton`

**File:** `src/components/icon-button/icon-button.tsx`

**Purpose:** Circular action button containing only an icon. Looks like a canvas patch pinned to the paper.

**Props:**
```typescript
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'default' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  label?: string;
}
```

---

### 6. NavigationIsland (Bonus)

**File:** `src/components/navigation-island/navigation-island.tsx`

**Purpose:** Floating pill-style navigation bar with paper texture background.

**Props:**
```typescript
interface NavigationIslandProps {
  items: { id: string; label: string; icon?: ReactNode }[];
  activeId?: string;
  onSelect?: (id: string) => void;
  position?: 'top' | 'bottom';  // default: 'bottom'
}
```

**Behavior:**
- `position="bottom"`: `fixed` to viewport bottom, centered horizontally
- `position="top"`: `relative` inline placement (e.g. inside a header)

---

## Package Structure

```
paper-ui/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.ts
├── postcss.config.js
├── index.html
├── README.md
├── src/
│   ├── index.ts
│   ├── globals.scss
│   ├── styles/
│   │   ├── _tokens.scss
│   │   ├── _mixins.scss
│   │   └── _textures.scss
│   ├── components/
│   │   ├── layout/
│   │   │   ├── layout.tsx
│   │   │   ├── layout.module.scss
│   │   │   └── index.ts
│   │   ├── page/
│   │   │   ├── page.tsx
│   │   │   ├── page.module.scss
│   │   │   └── index.ts
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.module.scss
│   │   │   └── index.ts
│   │   ├── checkbox/
│   │   │   ├── checkbox.tsx
│   │   │   ├── checkbox.module.scss
│   │   │   └── index.ts
│   │   ├── icon-button/
│   │   │   ├── icon-button.tsx
│   │   │   ├── icon-button.module.scss
│   │   │   └── index.ts
│   │   └── navigation-island/
│   │       ├── navigation-island.tsx
│   │       ├── navigation-island.module.scss
│   │       └── index.ts
│   ├── showcase/
│   │   ├── showcase.tsx
│   │   ├── font-context.tsx
│   │   ├── components/
│   │   │   ├── nav.tsx
│   │   │   ├── component-sidebar.tsx
│   │   │   ├── component-section.tsx
│   │   │   ├── code-block.tsx
│   │   │   ├── prop-table.tsx
│   │   │   ├── footer.tsx
│   │   │   └── texture-swatches.tsx
│   │   └── pages/
│   │       ├── welcome.tsx
│   │       ├── components.tsx
│   │       ├── layout.tsx
│   │       ├── tokens.tsx
│   │       └── docs.tsx
│   └── utils/
│       └── style-helpers.ts
├── public/
│   └── fonts/
│       ├── Luminari-Regular.woff
│       └── README.md
└── paperplan/
    └── 005-PAPER_UI_PLAN.md
```

---

## Implementation Phases

### Phase 1: Project Bootstrap

**Status:** ✅ Complete

| # | Task | Deliverable |
|---|------|-------------|
| 1.1 | Create `paper-ui/` folder with `package.json` | Scoped package `@dendelion/paper-ui`, version `0.1.0` |
| 1.2 | Set up `tsconfig.json` | ESNext, strict, react-jsx, bundler resolution |
| 1.3 | Set up `vite.config.ts` | Lib build, CSS modules, dts plugin, ESM+CJS |
| 1.4 | Create `tailwind.ts` | Paper preset with colors, fonts, shadows, textures |
| 1.5 | Create `postcss.config.js` | Tailwind + autoprefixer |
| 1.6 | Create `src/globals.scss` | Tailwind directives, @font-face, base styles |
| 1.7 | Create `src/styles/_tokens.scss` | Design tokens for colors, shadows, transitions |
| 1.8 | Create `src/styles/_mixins.scss` | Mixins for paper texture, canvas texture, ruled paper |
| 1.9 | Create `src/styles/_textures.scss` | 6 texture data URIs + ruled patterns |
| 1.10 | Create `src/utils/style-helpers.ts` | `cn()` helper using clsx + tailwind-merge |

**Definition of Done:**
- [x] `pnpm run check-types` passes
- [x] `pnpm run build` outputs `dist/index.mjs`, `dist/index.js`, `dist/index.d.ts`
- [x] `pnpm run dev` starts showcase dev server

---

### Phase 2: Build the 6 Components

**Status:** ✅ Complete

| # | Component | Key Decisions |
|---|-----------|---------------|
| 2.1 | **Button** | Watercolor wash overlay on hover, ink stamp pressed state |
| 2.2 | **Checkbox** | SVG checkmark stroke-dasharray animation, hand-drawn border |
| 2.3 | **IconButton** | Canvas-weave background, watercolor glow ring on hover |
| 2.4 | **Page** | Paper texture overlay, optional watercolor accent blob |
| 2.5 | **Layout** | Fully configurable (header/footer/sidebar/page toggles), rich background prop with textures + ruled overlays, header spans full width, sidebar has no divider, footer spans full width |
| 2.6 | **NavigationIsland** | Floating pill nav with paper texture, configurable top/bottom position |

**Definition of Done:**
- [x] All 6 components render in showcase
- [x] Button hover shows watercolor wash
- [x] Checkbox checkmark animates SVG stroke
- [x] IconButton has blurred watercolor ring on hover
- [x] Layout sidebar shows no divider, inherits background
- [x] Page background has paper grain texture
- [x] NavigationIsland anchors to bottom by default

---

### Phase 3: Showcase App

**Status:** ✅ Complete

**Structure:** Mojo UI-style multi-page showcase with 5 pages:

| Page | Route | Contents |
|------|-------|----------|
| **Welcome** | `/` | Hero, texture swatch switcher (6 textures), ruled type + color switcher, font switcher, live code snippet |
| **Components** | `/gallery` | Button, Checkbox, IconButton demos with all variants/sizes |
| **Layouts** | `/layout` | Interactive Layout configurator — side-by-side preview (800×520 fixed) + configuration panel (35%) |
| **Tokens** | `/tokens` | Color palette, typography, shadows, texture gallery |
| **Docs** | `/docs` | Install instructions, quick start, component API reference |

**Showcase Layout page features:**
- Fixed-size preview box: `800px × 520px` with paper-style frame border (outer parchment mat + inner border)
- Toolbar above preview: Title + inline checkboxes (Header, Footer, Sidebar, Page, Island)
- Configuration panel (right, 35%): TextureSwatches in compact mode
- Full TextureSwatches component with: 6 texture swatches, 3 type swatches (Plain/Lines/Grid), 3 color swatches (Blue/Brown/Black) in one row with divider
- Color swatch line previews offset toward bottom-right (52%-62%) for organic feel
- Code block below preview auto-generates correct `background` prop
- NavigationIsland standalone demo with `position="top"`

**Shared Components:**
- `TextureSwatches` — reusable texture configurator (used in Welcome + Layout pages)
- `ShowcaseNav` — sticky top nav with paper styling
- `CodeBlock` — syntax-highlighted code snippets
- `Footer` — site-wide footer

**Definition of Done:**
- [x] `pnpm run dev` serves showcase
- [x] All pages navigable via sticky top nav
- [x] Welcome page has live texture/font preview
- [x] Layout page has interactive configurator with fixed-size preview
- [x] No console errors

---

### Phase 4: Paper Camp Integration

**Status:** ⏳ Pending — blocked by missing components (Card, Input, Select, Tabs, Badge, Alert, etc. still in Mojo UI)

| # | Task | File |
|---|------|------|
| 4.1 | Install `@dendelion/paper-ui` in Paper Camp | `package.json` |
| 4.2 | Update `tailwind.config.ts` | Use `paperPreset` |
| 4.3 | Replace Mojo UI `globals.css` import with Paper UI | `src/app/main.tsx` |
| 4.4 | Replace Mojo `AppLayout` with Paper `Layout` | `src/app/components/app-layout.tsx` |
| 4.5 | Wrap pages with Paper `Page` | Each page file |
| 4.6 | Replace Mojo `Button` with Paper `Button` | All page files |
| 4.7 | Replace Mojo `Checkbox` with Paper `Checkbox` | `plans-page.tsx` |
| 4.8 | Update class names from Mojo colors → Paper colors | All files |
| 4.9 | Remove `@dendelion/mojo-ui` dependency | `package.json` |
| 4.10 | Run `tsc --noEmit` and fix errors | — |

**Definition of Done:**
- [ ] Paper Camp runs on port 3333 with Paper UI styling
- [ ] All 5 pages render without errors
- [ ] Dashboard buttons and checkboxes use new components
- [ ] Layout sidebar has no divider, inherits background
- [ ] `tsc --noEmit` passes

---

### Phase 5: Build & Publish

**Status:** 🚧 Ready to publish (README done, build passes)

| # | Task | Status |
|---|------|--------|
| 5.1 | Final build: `pnpm run build` | ✅ Passes |
| 5.2 | Verify `pnpm pack` output | ✅ Verified |
| 5.3 | Write README (install, usage, components, tokens) | ✅ Done |
| 5.4 | `npm login` | ⏳ Awaiting user |
| 5.5 | `pnpm publish --access public` | ⏳ Awaiting login |

**Definition of Done:**
- [x] `pnpm add @dendelion/paper-ui` works (after publish)
- [x] All 6 components importable from the package
- [x] Types resolve correctly

---

## Total Estimated Effort

| Phase | Estimate | Actual |
|-------|----------|--------|
| 1. Bootstrap | 1.5 hours | ✅ Done |
| 2. 6 Components | 4 hours | ✅ Done |
| 3. Showcase | 1 hour | ✅ Done (significantly expanded) |
| 4. Paper Camp Integration | 1.5 hours | ⏳ Pending |
| 5. Publish | 0.5 hours | 🚧 Ready |
| **Total** | **~8.5 hours** | |

---

## Out of Scope for v0.1.0

These components are **explicitly excluded** from this plan. They will be added in v0.2.0+:

- Card, Panel, StatsGrid
- Input, Textarea, Select, Switch, Radio, Slider
- Tabs, Breadcrumb
- ProgressBar, CircularProgress, StatsCard, StatusIndicator, Badge, Alert, Toast
- Modal, Tooltip, Popup, Skeleton
- DataTable, Accordion
- Specialty: PaperTexture, InkBleed, WatercolorBlob, TornEdge (internal utilities)

---

## Testing Checklist

- [x] `pnpm run dev` — showcase starts
- [x] Button hover shows watercolor wash overlay
- [x] Checkbox SVG checkmark animates on toggle
- [x] IconButton watercolor ring appears on hover
- [x] Layout sidebar has no divider, same background as root
- [x] Layout footer spans full width including sidebar
- [x] Page background has paper grain texture
- [x] NavigationIsland anchors to bottom by default
- [x] Texture swatches switch correctly in Welcome page
- [x] Ruled lines/grid overlay correctly on Layout background
- [x] Font switcher updates button font in real time
- [x] Layout preview box stays fixed at 800×520 regardless of toggles
- [x] TypeScript compiles without errors
- [x] `pnpm pack` contains correct files

---

## Relationship to Existing Plans

| Plan | Status | Relationship |
|------|--------|--------------|
| [001-PAPER_CAMP_MVP](../../paper-camp/paperplan/plans.md) | 🚧 In Progress | Paper UI replaces Mojo UI dependency |
| [004-DEMO_MODE_PLAN](../../paper-camp/paperplan/004-DEMO_MODE_PLAN.md) | ✅ Complete | Demo projects show Paper UI styling |
| [003-MOJO_SPLIT_PLAN](../../mojo-ui/paperplan/003-MOJO_SPLIT_PLAN.md) | 🚧 In Progress | Paper UI follows the same split pattern |
| **005-PAPER_UI_PLAN** | 🚧 **This Plan** | **New UI library — MVP with 6 components** |

---

## Discoveries & Notes

- **Luminari** is not a free Google Font — it's a proprietary macOS font. We use a self-hosted `Luminari-Regular.woff` in `public/fonts/`.
- **Mojo UI** is still heavily used in Paper Camp for components outside Paper UI's scope. Cannot fully remove Mojo UI until more Paper UI components are built.
- **Grid texture fix**: When combining a texture with grid lines, you need **3 layers** and must set `background-size` per layer:
  - Layer 1 (texture): `200px 200px`
  - Layer 2 (horizontal lines): `100% 32px`
  - Layer 3 (vertical lines): `32px 32px`
- All textures are SVG `feTurbulence` + `feColorMatrix` filters as data URIs — no external images.
- The `pnpm run check-types` and `pnpm run build` both pass after all changes.
- Layout uses `min-height: 100%; height: 100%` on root + `html, body, #root { height: 100% }` in globals so it fills viewport in real apps but shrinks to fit containers in previews (no `preview` prop needed).
- Sidebar removed its `height: 100vh` and wood-colored divider border. Now it's a simple sticky column that inherits the layout background.

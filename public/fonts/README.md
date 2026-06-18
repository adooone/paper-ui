# Custom Fonts

Drop your font files here to use them in Paper UI.

## Supported Formats

- `.woff2` (preferred)
- `.woff`
- `.ttf`

## How to Use

1. Copy your font files into this folder (e.g., `public/fonts/Luminari.woff2`).
2. Import them in `src/globals.scss` via `@font-face`.
3. Add the font family to `tailwind.ts` under `fontFamily`.

## Example

```scss
@font-face {
  font-family: 'Luminari';
  src: url('/fonts/Luminari.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Then in `tailwind.ts`:

```ts
fontFamily: {
  display: ['Luminari', 'Cormorant Garamond', 'Georgia', 'serif'],
  // ...
}
```

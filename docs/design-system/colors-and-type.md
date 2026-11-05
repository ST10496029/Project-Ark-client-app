# Colours and type

## What it does
One place for all colours, spacing, font sizes and corner radius, so every screen looks the same.

## Key files
- `src/theme.ts`: `colors`, `spacing`, `fontSize`, `radius`

## How it works
| Token | Values |
|-------|--------|
| `colors.primary` / `primaryDark` | `#0A6EBD` (water blue) / `#08548F` (pressed) |
| `colors.text` / `muted` | `#1B1B1F` / `#6B7280` |
| `colors.background` / `surface` / `border` | `#FFFFFF` / `#F3F6FA` / `#D1D5DB` |
| `colors.error` / `white` | `#C62828` / `#FFFFFF` |
| `spacing` | `xs` 4 · `sm` 8 · `md` 16 · `lg` 24 · `xl` 32 |
| `fontSize` | `small` 14 · `body` 16 · `large` 20 · `title` 28 |
| `radius` | 10 |

Import what you need: `import { colors, spacing, fontSize, radius } from "../theme";`

## Rules and gotchas
- No hard-coded colours, sizes or spacing in screens. Add a new token here if one is missing.
- Light mode only (`userInterfaceStyle: "light"` in `app.json`). There are no dark-mode colours.
- Keep touch targets large: buttons are at least 52 px tall, link buttons at least 44 px.
- No custom fonts. The phone's system font is used.

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

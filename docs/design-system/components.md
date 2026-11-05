# Shared components

## What it does
Reusable UI pieces used across screens. Use these instead of building new buttons or inputs.

## Key files
- `src/components/PrimaryButton.tsx`: main button
- `src/components/TextField.tsx`: labelled text input
- `src/components/ErrorText.tsx`: red error message
- `src/components/AuthLayout.tsx`: frame for the sign-in screens
- `src/components/LanguageToggle.tsx`: English ↔ Arabic switch

## How it works
- **`PrimaryButton`** (`title`, `onPress`, `loading?`, `disabled?`, `variant?`):
  `"primary"` is a filled blue button (52 px tall). `"link"` is plain blue text (44 px tall).
  While `loading`, it shows a spinner and can't be pressed.
- **`TextField`**: a normal React Native `TextInput` plus an optional `label` above and an optional
  `error` below (red border). Supports `ref`.
- **`ErrorText`** (`message`): shows nothing when `message` is `null`. Screen readers announce it as an alert.
- **`AuthLayout`** (`title`, `subtitle?`, children): safe area, keyboard handling, scrolling,
  the language switch in the top corner, then title, subtitle and the screen's content.
- **`LanguageToggle`**: a link button showing the other language. Tapping it restarts the app
  (see `i18n-and-rtl.md`).

## Rules and gotchas
- Components take already-translated text. Call `t()` in the screen and pass the result in.
- Use `PrimaryButton`'s `loading` prop for anything that waits on the network, so it can't be double-tapped.
- Despite the name, `PrimaryButton` is also the link-style button (`variant="link"`).

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

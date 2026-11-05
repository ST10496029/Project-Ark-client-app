# Profile

## What it does
The Profile tab shows the customer's name and phone number, lets them switch language
(English ↔ Arabic), and log out.

## Key files
- `src/screens/customer/ProfileScreen.tsx`: the screen
- `src/components/LanguageToggle.tsx`: the language switch button
- `src/i18n/index.ts`: `setLanguage()`, `currentLanguage()`
- `src/auth/AuthContext.tsx`: `profile` and `logout()`

## How it works
1. Name and phone are read from the profile in `AuthContext` (live from `users/{uid}`).
2. The language button shows the *other* language. Tapping it restarts the app so the layout
   can flip direction (see `design-system/i18n-and-rtl.md`).
3. Logout signs out. The app returns to the phone screen by itself. If logout fails, an alert is shown.

## Rules and gotchas
- Switching language does **not** update `language` in the user's Firestore profile. The field
  keeps the language used at sign-up (Phase 2 task: "Remember language choice in profile").
- Name can't be edited yet (Phase 2 task).

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

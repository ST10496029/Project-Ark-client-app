# Ark — Customer App
"Uber for water tanks" for a rural African country with no street addresses. Customers request
a tank delivery to their GPS location; the first nearby driver to accept fills it. Cash on delivery.
This repo is the customer app only. The driver app is a separate repo (not started yet).
Expo SDK 57 dev build + TypeScript + React Native Firebase (phone auth, Firestore). English + Arabic (RTL).

## Project map
- `App.tsx` Root: providers + routing by auth state
- `src/auth/` AuthContext (user + Firestore profile), phone auth
- `src/components/` Shared UI (PrimaryButton, TextField, ...)
- `src/i18n/` i18n setup + `en.json` / `ar.json`
- `src/navigation/` Stacks/tabs + typed param lists (`types.ts`)
- `src/screens/auth/` Phone, Otp, Onboarding
- `src/screens/customer/` Home, Profile
- `src/theme.ts` Colours, spacing, font sizes
- `docs/` All project documentation (see below)
- `TODO.md` Current progress and next tasks

## Conventions
- No hard-coded user-facing text. Every string uses `t("...")` and exists in both `en.json` and `ar.json`.
- RTL-safe styles: `marginStart/End`, `paddingStart/End`, `start/end`. Never `left/right`.
- No hard-coded colours or sizes. Use `src/theme.ts`.
- Trusted logic (assigning drivers, changing request status) belongs in Cloud Functions, never in the app.
- Type navigation with `src/navigation/types.ts`. No `navigation: any`.
- Simple screens, large touch targets. Users are on cheap Android phones with weak data.

## Gotchas
- Runs in the Expo development build, not Expo Go (React Native Firebase has native code).
- No Android SDK/Java on this machine. Native builds run in the cloud with EAS.
  Rebuild only when native packages or `app.json` plugins change; JS changes just need Metro.
- Every user document has a `role`. This app only lets `customer` accounts in.
- `google-services.json` comes from the Firebase console (Android app `com.projectark.customer`).

## Documentation rules (IMPORTANT)
1. Do NOT read source code to get context. Start with `docs/`: read `docs/index.md`,
   then the relevant area index, then the topic doc.
2. Only read code when the docs don't answer the question, or when you are about to edit that specific file.
3. If documentation is missing, outdated or wrong, update it. No doc for the topic? Create one and add it to the area's index.
4. Before finishing, check: did I change behaviour the docs describe? If yes, update the docs in the same change.

## Testing rules
- Every new feature ships with tests (test tool not set up yet, see `TODO.md`).
- Before saying a task is done, run `npx tsc --noEmit` (and the tests, once they exist) and report the result.

## Workflow
- Ask clarifying questions first, then present a plan and wait for my approval before writing code.
- Explain choices in plain language. I'm not an expert developer.
- Work in stages from `TODO.md`: one branch per phase, one commit per finished stage. Update `TODO.md` when a task is done.

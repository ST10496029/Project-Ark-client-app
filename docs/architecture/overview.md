# Architecture overview

## What it does
Ark is "Uber for water tanks" for a rural African country with no street addresses.
A customer requests a delivery, nearby drivers are alerted, the first to accept drives to the
customer's GPS location and fills the tank. Payment is cash on delivery.

There are two separate apps sharing one Firebase project:
- **Customer app** (this repo): sign in, request water, track the delivery.
- **Driver app** (separate repo, not started yet): go online, accept jobs, navigate, mark delivered.

Trusted logic shared by both (matching drivers, changing request status) will live in
Cloud Functions (see `backend/cloud-functions.md`).

## Key files
- `index.ts`: entry point, registers `App`
- `App.tsx`: providers (safe area, auth, navigation) and the root navigator
- `src/config.ts`: app-wide constants (default country code, resend wait, code length)
- `src/firebase.ts`: Firebase Auth and Firestore instances
- `src/theme.ts`: colours, spacing, font sizes
- `src/auth/`: `AuthContext` (user + profile), `phoneAuth` (SMS sign-in)
- `src/components/`: shared UI
- `src/i18n/`: translations (`en.json`, `ar.json`) and language switching
- `src/navigation/`: stacks, tabs and route types
- `src/screens/auth/`: Phone, Otp, Onboarding
- `src/screens/customer/`: Home, Profile
- `app.json`: app name, bundle IDs, native plugins. `eas.json`: cloud build profiles
- `firestore.rules`: database security rules

## How it works
Tech stack:
- Expo SDK 57 (React Native 0.86, React 19.2), TypeScript in strict mode, New Architecture on
- React Navigation 7 (native stack + bottom tabs)
- React Native Firebase (`@react-native-firebase/app`, `auth`, `firestore`): phone sign-in, Firestore
- `i18next` + `react-i18next` + `expo-localization`: English and Arabic (RTL)
- Runs in an Expo development build (`expo-dev-client`), built in the cloud with EAS

On start, `App.tsx` loads translations, then `AuthProvider` checks who is signed in and
the root navigator picks which part of the app to show (see `navigation.md`).

## Rules and gotchas
- Not compatible with Expo Go, because React Native Firebase has native code. Use the dev build.
- Firebase config comes from `google-services.json` (Android), read natively. No API keys in the JS code.
- App ID on both platforms: `com.projectark.customer`.
- The app is portrait-only and light mode only (`app.json`).
- Changing native packages or `app.json` plugins needs a new EAS build (see `setup/dev-build.md`).

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

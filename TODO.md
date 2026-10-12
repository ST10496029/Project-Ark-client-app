# Ark Customer App — Roadmap & Progress

Legend: `[x]` done · `[ ]` to do · `[~]` in progress. One branch per phase, one commit per finished stage.

## Phase 0 — Setup
- [x] Expo project, TypeScript, React Navigation
- [x] Upgrade to Expo SDK 57
- [x] Project docs (`CLAUDE.md`, `TODO.md`)
- [x] Android package / iOS bundle id (`com.projectark.customer`)
- [x] `eas.json` build profiles
- [ ] First development build installed on a phone

## Phase 1 — Auth & onboarding  ← current
### 1a. Firebase migration (you do the console steps)
- [ ] Firebase console: add Android app `com.projectark.customer`, download `google-services.json` to project root
- [ ] Firebase console: enable **Phone** sign-in provider
- [ ] Firebase console: add test phone numbers (e.g. `+1 650-555-1234` / `123456`)
- [ ] Firebase console: add SHA-1 / SHA-256 of the build key (`npx eas-cli credentials`)
- [x] Switch from `firebase` JS SDK to `@react-native-firebase/{app,auth,firestore}` + `expo-dev-client`
### 1b. Phone login
- [ ] i18n base (English + Arabic, RTL switch)
- [ ] Shared UI: `theme.ts`, `PrimaryButton`, `TextField`
- [ ] `PhoneScreen` — country code + number, validation, loading state, friendly errors
- [ ] `OtpScreen` — 6-digit code, auto-submit, resend countdown, change number
- [ ] `OnboardingScreen` — ask name, create `users/{uid}` with `role: "customer"`
- [ ] `AuthContext` — auth state + profile, reject non-customer accounts
- [ ] Typed navigation; routing: loading → auth → onboarding → tabs
- [ ] Profile screen: name, phone, language toggle, logout
- [ ] Remove old email/password screens
- [ ] Tested on phone: login, restart stays logged in, logout, wrong code, Arabic layout
- [ ] Before release: Firebase **Blaze plan** + SMS region policy allows the target country

## Phase 2 — Profile & language polish
- [ ] Edit name
- [ ] Remember language choice in profile
- [ ] Review all Arabic translations with a native speaker

## Phase 3 — Request flow (customer)
- [ ] Live location (`expo-location`) + map with adjustable pin (`react-native-maps`)
- [ ] Location note ("blue gate behind the mosque")
- [ ] Tank size picker (Uber-style cards) from Firestore `tankSizes` (prices set by operator)
- [ ] Quantity stepper + total price
- [ ] Confirm "Cash on delivery" → create `requests/{id}` (status `pending`, geohash, price snapshot)

## Phase 4 — Backend (shared with driver app)
- [ ] Cloud Functions project (needs Blaze plan)
- [ ] On new request: find nearby online drivers (geohash) and send push notifications
- [ ] `acceptRequest`: transaction so the first driver to accept gets the job
- [ ] Timeout → `no_driver`
- [ ] Status lifecycle: `pending → accepted → en_route → arrived → delivered` (+ `cancelled`, `no_driver`)
- [ ] Firestore security rules + emulator tests

## Phase 5 — Tracking & history (customer)
- [ ] Request status screen (live), driver name + call button, amount to pay
- [ ] Cancel while `pending`
- [ ] Orders tab (history)
- [ ] Push notifications for status changes

## Phase 6 — Later
- [ ] Live driver location on the map
- [ ] Ratings
- [ ] Weak / no mobile data handling (found during field testing)
- [ ] iOS build

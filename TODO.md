# TODO — Ark Customer App
`[ ]` to do · `[~]` in progress · `[x]` done. Full history and finished tasks: `docs/roadmap-full.md`.

## Now — Phase 1: Auth & onboarding (code done; console setup + phone test left)
- [ ] First development build installed on a phone
- [ ] Debug "Something went wrong" on Send code (dev builds log the real Firebase error code)
- [ ] Firebase console: create the Firestore database (if not created yet)
- [ ] Firebase console: add SHA-1 / SHA-256 of the build key (`npx eas-cli credentials`)
- [ ] Publish `firestore.rules` in Firebase console (Firestore → Rules)
- [ ] Tested on phone: login, restart stays logged in, logout, wrong code, Arabic layout
- [ ] Set up a test tool (Jest) so new features can ship with tests
- [ ] Add a param list type for the root navigator in `App.tsx` (see `docs/architecture/navigation.md`)

## Before release
- [ ] Firebase Blaze plan + SMS region policy allows the target country

## Next phases
- **Phase 2 — Profile & language:** edit name, remember language in profile, Arabic review by a native speaker
- **Phase 3 — Request flow:** location + map pin, location note, tank size picker (from Firestore), quantity + total, confirm cash on delivery
- **Phase 4 — Backend (Cloud Functions):** alert nearby drivers, first-to-accept assignment, timeout, status lifecycle, security rules + tests
- **Phase 5 — Tracking & history:** live status screen, cancel while pending, orders tab, push notifications
- **Phase 6 — Later:** live driver location, ratings, weak-data handling, iOS build

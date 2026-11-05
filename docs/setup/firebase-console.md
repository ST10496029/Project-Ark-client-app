# Firebase console setup

## What it does
The steps done by hand in the Firebase console (console.firebase.google.com). The customer app
and the driver app share one Firebase project.

## Key files
- `google-services.json` (project root): Android config downloaded from the console.
  `app.json` points to it (`android.googleServicesFile`).
- `firestore.rules`: rules to paste into the console

## How it works
| Step | Status |
|------|--------|
| Add Android app `com.projectark.customer`, download `google-services.json` to the project root | Done |
| Enable the **Phone** sign-in provider (Google and Email/Password are off) | Done |
| Add test phone numbers (e.g. `+1 650-555-1234` / code `123456`) | Done |
| Create the Firestore database | To do |
| Add the build key's SHA-1 / SHA-256 (get them with `npx eas-cli credentials`) | To do |
| Publish `firestore.rules` (Firestore → Rules → paste → Publish) | To do |
| Upgrade to the **Blaze plan** and allow the target country in the SMS region policy | Before release |

## Rules and gotchas
- Without the SHA keys, phone sign-in on Android can fail. Each signing key (EAS dev, production)
  needs its own SHA entries.
- Test phone numbers never send a real SMS and don't use SMS quota. Use them during development.
- After editing `firestore.rules`, it must be pasted and published again. Nothing deploys automatically.
- If `google-services.json` changes (e.g. new SHA keys added), download it again and rebuild the app.
- Driver app: when it's built, it should also use phone sign-in. Revisit these settings then.

## Still to decide
- Whether `google-services.json` gets committed to git. It's currently untracked, not ignored.
  EAS still uploads it because it isn't in `.gitignore`.
- iOS: `GoogleService-Info.plist` isn't set up yet (iOS build is Phase 6).

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

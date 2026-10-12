# Ark — Customer App

Ark is "Uber for water tanks" for a rural African country with no street addresses.
A customer requests a water tank delivery, nearby drivers are alerted, the first driver
to accept is assigned, drives to the customer's GPS location and fills the tank.
Payment is **cash on delivery**.

There are **two separate apps** sharing one Firebase project:
- **This repo: customer app** — sign in, request water, track the delivery.
- **Driver app** (separate repo) — go online, accept jobs, navigate, mark delivered.

Progress and the build roadmap live in [TODO.md](TODO.md). Update it whenever a task is finished.

## Tech stack
- Expo SDK 57 (React Native 0.86, React 19.2), TypeScript `strict`
- React Navigation 7 (native-stack + bottom-tabs)
- Firebase via **React Native Firebase** (`@react-native-firebase/*`) — auth (phone/SMS), Firestore
- i18n: `i18next` + `react-i18next` + `expo-localization` — **English and Arabic (RTL)**
- Runs in an **Expo development build**, not Expo Go (React Native Firebase has native code)

## Layout
```
App.tsx                  root: providers + routing by auth state
index.ts                 entry (registerRootComponent)
src/
  config.ts              app-wide constants (default country code, etc.)
  firebase.ts            React Native Firebase instances (auth, firestore)
  theme.ts               colours, spacing, font sizes
  auth/                  AuthContext (user + Firestore profile)
  components/            shared UI (PrimaryButton, TextField, ...)
  i18n/                  i18n setup + en.json / ar.json
  navigation/            stacks/tabs + typed param lists (types.ts)
  screens/auth/          Phone, Otp, Onboarding
  screens/customer/      Home, Profile (+ request flow later)
```

## Conventions
- **No hard-coded user-facing text.** Every string goes through `t("...")` and must exist in both `en.json` and `ar.json`.
- **RTL-safe styles.** Use `marginStart/End`, `paddingStart/End`, `start/end` — never `left/right`.
- **Every user document has a `role`** (`"customer"` or `"driver"`). This app only lets `customer` accounts in.
- Firestore collections:
  - `users/{uid}`: `{ role, phone, name, language, createdAt }`
  - `tankSizes/{id}`: planned. Prices are set by the operator, not hard-coded.
  - `requests/{id}`: planned.
- Matching and other trusted logic (assigning drivers, changing request status) belongs in **Cloud Functions**, never in the client.
- Type navigation with the param lists in `src/navigation/types.ts`. Don't use `navigation: any`.
- Keep screens simple and large-touch-target. Many users are on cheap Android phones with weak data.

## Commands
```sh
npm install
npx tsc --noEmit                                         # type check (run before every commit)
npx expo start --dev-client                              # start Metro for the installed dev build
npx eas-cli build --profile development --platform android   # cloud build of the dev client APK
```
This machine has no Android SDK/Java, so native builds run in the cloud with EAS. Run JS-only changes through Metro without rebuilding.
Rebuild only when native dependencies or `app.json` plugins change.

## Workflow
- Work in stages from `TODO.md`. Use one feature branch per phase and one commit per finished stage.
- Before committing: `npx tsc --noEmit` passes, and `TODO.md` is updated.
- `google-services.json` comes from the Firebase console (Android app `com.projectark.customer`).

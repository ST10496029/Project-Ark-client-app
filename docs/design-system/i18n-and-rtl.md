# Translations and RTL (English / Arabic)

## What it does
The app runs in English or Arabic. Arabic mirrors the whole layout right-to-left (RTL).

## Key files
- `src/i18n/index.ts`: i18next setup, `currentLanguage()`, `setLanguage()`
- `src/i18n/en.json` / `src/i18n/ar.json`: all user-facing text
- `src/components/LanguageToggle.tsx`: the switch button
- `app.json`: `expo-localization` plugin with `supportsRTL: true` (Android + iOS)

## How it works
1. Text: every string is a key, e.g. `t("phone.title")`. Keys are grouped by screen:
   `common`, `language`, `phone`, `otp`, `onboarding`, `home`, `profile`, `errors`.
2. The current language comes from the layout direction: RTL means Arabic, otherwise English.
   There's no separate saved setting.
3. First launch follows the phone's language.
4. Switching language calls `I18nManager.forceRTL()` and restarts the app, because React Native
   can only flip the layout on start. The choice is remembered across restarts.

## Rules and gotchas
- No hard-coded user-facing text. Every new key goes in **both** `en.json` and `ar.json`
  (both currently have the same 39 keys).
- Use `marginStart/End`, `paddingStart/End`, `start/end` for layout. Never `marginLeft/Right` etc.
- Exception: `textAlign: "left"` is used on purpose. React Native flips it to the start side in RTL.
- Phone numbers and SMS codes are always left-to-right: those fields use `direction: "ltr"` /
  `writingDirection: "ltr"`, and phone numbers inside text are wrapped in Unicode LTR marks (`⁦…⁩`).
- The language switch doesn't update `language` in the Firestore profile yet (see `features/profile.md`).
- Arabic translations still need review by a native speaker (Phase 2).

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

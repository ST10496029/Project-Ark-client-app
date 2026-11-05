# Phone login

## What it does
The three sign-in screens: enter phone number, enter the SMS code, and (first time only)
enter your name. For the Firebase side, see `backend/auth-flow.md`.

## Key files
- `src/screens/auth/PhoneScreen.tsx`: country code + number, sends the code
- `src/screens/auth/OtpScreen.tsx`: 6-digit code, auto-submit, resend countdown, change number
- `src/screens/auth/OnboardingScreen.tsx`: asks for the name, creates the profile
- `src/auth/phoneAuth.ts`: send/confirm code, number formatting, error messages
- `src/config.ts`: `DEFAULT_COUNTRY_CODE` (`+211`), `RESEND_CODE_SECONDS` (60), `OTP_LENGTH` (6)

## How it works
1. **Phone screen:** country code is pre-filled with `+211` (still editable). The Send button is
   disabled until a number is typed. Invalid numbers show an error before anything is sent.
   On success, it opens the code screen with the phone number.
2. **Code screen:** submits automatically once all 6 digits are typed, pasted or auto-filled from
   the SMS. A wrong code clears the field and shows an error. "Send a new code" appears after a
   60-second countdown. "Change number" goes back to the phone screen.
3. **Onboarding screen:** shown only when the signed-in user has no profile. The name must be at
   least 2 characters (max 60). Continue creates the profile, and the app then switches to the main tabs.
4. Moving between screens after sign-in is automatic: `AuthContext` decides what to show
   (see `architecture/navigation.md`).

## Rules and gotchas
- Phone numbers and codes are always shown left-to-right, even in Arabic.
- If a driver account signs in, the phone screen shows an alert explaining why they were signed out.
- All error messages come from `authErrorKey()` and are translated. Never show raw Firebase errors.

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

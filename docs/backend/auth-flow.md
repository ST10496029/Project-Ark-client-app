# Auth flow (phone sign-in)

## What it does
Customers sign in with their phone number and a 6-digit SMS code. No passwords, no email.
New customers then enter their name, which creates their profile. Sign-in is remembered
across app restarts.

## Key files
- `src/auth/phoneAuth.ts`: send code, confirm code, phone number formatting, error messages
- `src/auth/AuthContext.tsx`: who is signed in, their profile, customers-only check, logout
- `src/config.ts`: default country code (`+211`), resend wait (60 s), code length (6)
- `src/screens/auth/`: the Phone, Otp and Onboarding screens (see `features/phone-login.md`)

## How it works
1. The customer types their number. `toE164()` joins country code + number, removing spaces,
   dashes and a leading `0`. `isValidE164()` checks it is 8–15 digits.
2. `sendCode()` asks Firebase to text a code. The pending confirmation is kept inside
   `phoneAuth.ts`, because it can't be passed between screens.
3. `confirmCode()` checks the code and signs the user in. On Android, Firebase can sometimes
   read the SMS itself and sign in without this step.
4. `AuthContext` notices the sign-in and listens to `users/{uid}`:
   - no profile → onboarding screen → `createProfile(name)` writes the profile
   - profile with `role: "customer"` → main app
   - any other role → signed out, login screen shows "driver account" message
5. Logout calls `signOut()`. The listener resets everything.

## Rules and gotchas
- Firebase error codes are turned into translated messages by `authErrorKey()`. Unknown codes show
  a generic message; in dev builds the real code is logged to the Metro terminal.
- The pending confirmation is lost if the app restarts between the two screens.
  `confirmCode()` then reports "code expired".
- If the profile can't be read (offline, rules), loading stops so the user isn't stuck on a spinner.
- Test phone numbers (set in the Firebase console) skip real SMS. The country code field stays
  editable so `+1` test numbers work.
- Real SMS needs the Firebase Blaze plan, and the SMS region policy must allow the target country.
- Android needs the build key's SHA-1/SHA-256 added in the Firebase console (see `setup/firebase-console.md`).

## Still to decide
- Open bug: "Something went wrong" on Send code (see `TODO.md`).

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

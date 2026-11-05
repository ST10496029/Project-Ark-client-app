# Security rules

## What it does
Firestore security rules decide who can read and write which documents. They run on
Firebase's servers, so they protect data even if someone modifies the app.

## Key files
- `firestore.rules`: the rules (shared with the future driver app)

## How it works
`users/{uid}`:
- **Read:** only the signed-in user whose ID matches.
- **Create:** only your own profile, and only if `role` is `"customer"`, `phone` equals the
  signed-in phone number, and `name` is a string of 2–60 characters.
- **Update:** only `name` and `language` may change.
- **Delete:** never.

No rules exist yet for `tankSizes` or `requests`, so all access to them is denied.

## Rules and gotchas
- Rules are **not deployed automatically**. Paste `firestore.rules` into Firebase console →
  Firestore → Rules after changing it. (Not published yet, see `TODO.md`.)
- Driver profiles can't be created by the customer app. They'll be created or approved
  separately (driver app or admin).
- Request status changes must come from Cloud Functions, not from the apps (see `cloud-functions.md`).

## Still to decide
- Rules for `tankSizes` (likely: anyone signed in can read, nobody can write from the app).
- Rules for `requests` (who can create, read, cancel).
- Deploying with the Firebase CLI instead of pasting into the console.

## Tests
None yet. Roadmap Phase 4: security rules + emulator tests.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

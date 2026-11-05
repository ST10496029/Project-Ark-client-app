# Database schema (Firestore)

## What it does
All app data lives in Cloud Firestore. The customer app and the future driver app share
the same Firebase project and the same collections.

## Key files
- `src/firebase.ts`: creates the Firestore instance (`db`)
- `src/auth/AuthContext.tsx`: the `UserProfile` type; reads and creates `users/{uid}`
- `firestore.rules`: which fields can be written (see `security-rules.md`)

## How it works
### `users/{uid}` (built)
The document ID is the Firebase Auth user ID.

| Field | Type | Notes |
|-------|------|-------|
| `role` | `"customer"` \| `"driver"` | This app only ever creates `"customer"` |
| `phone` | string | E.164 format, e.g. `+211912345678`. Copied from the signed-in phone number |
| `name` | string | 2–60 characters, trimmed |
| `language` | `"en"` \| `"ar"` | Language active when the profile was created |
| `createdAt` | timestamp | Server timestamp |

Created once, by `createProfile()` during onboarding. `AuthContext` listens to it live
while the user is signed in.

### `tankSizes/{id}` *(planned)*
Tank sizes and prices the customer picks from. Prices are set by the operator, never hard-coded in the app.

### `requests/{id}` *(planned)*
A water delivery request. From the roadmap: status (starts as `pending`), the customer's
location as a geohash, and a snapshot of the price at the time of ordering.
Status values: `pending → accepted → en_route → arrived → delivered`, plus `cancelled` and `no_driver`.

## Rules and gotchas
- Every user document must have a `role`. The customer app signs out anyone whose role isn't `customer`.
- After sign-in, a missing profile read from the local cache is ignored. The app waits for the
  server's answer before deciding the user is new (prevents showing onboarding to a returning user).
- `role` and `phone` can never change after creation. Only `name` and `language` can be updated.

## Still to decide
- `tankSizes`: exact fields (e.g. litres, price, display order, active/inactive) and who edits them.
- `requests`: full field list (customer ID, driver ID, quantity, location note, timestamps).
- Saving language changes to the profile (Phase 2: "Remember language choice in profile").

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

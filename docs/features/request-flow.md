# Request flow *(planned)*

## What it does
How a customer orders water: set their location, pick a tank size and quantity, and confirm
cash on delivery. Not started yet (roadmap Phase 3). The Home tab is a placeholder until then.

## Key files
- `src/screens/customer/HomeScreen.tsx`: placeholder for now

## How it works
Planned, from the roadmap:
1. Live location (`expo-location`) and a map with an adjustable pin (`react-native-maps`).
   There are no street addresses, so the GPS pin is the delivery address.
2. Optional location note, e.g. "blue gate behind the mosque".
3. Tank size picker (Uber-style cards), loaded from Firestore `tankSizes`. Prices are set by the operator.
4. Quantity stepper and total price.
5. Confirm "Cash on delivery". This creates `requests/{id}` with status `pending`, a geohash
   and a snapshot of the price.

## Rules and gotchas
- Never hard-code prices or tank sizes.
- After the request is created, only Cloud Functions change its status (see `backend/cloud-functions.md`).
- Adding `expo-location` / `react-native-maps` adds native code, so a new EAS dev build is needed.

## Still to decide
- Map provider and API key (Google Maps on Android needs one).
- What happens if location permission is denied.
- Whether the location note is required or optional.
- Maximum quantity per order.

## Tests
None yet.

## Last updated
Initial docs, Phase 1. Planned only.

# Tracking & history *(planned)*

## What it does
What the customer sees after ordering: live request status, the driver's details, cancelling,
and a history of past orders. Not started yet (roadmap Phase 5).

## Key files
None yet.

## How it works
Planned, from the roadmap:
1. Request status screen that updates live: driver name, a call button, and the amount to pay in cash.
2. Cancel button while the request is still `pending`.
3. Orders tab with the customer's past requests.
4. Push notifications when the status changes.
5. Later (Phase 6): the driver's live location on the map, and ratings.

Statuses shown: `pending → accepted → en_route → arrived → delivered`, plus `cancelled` and `no_driver`.

## Rules and gotchas
- The app only reads status. Changes come from Cloud Functions (see `backend/cloud-functions.md`).
- Users often have weak data. The screen must handle slow or missing updates (Phase 6: weak-data handling).

## Still to decide
- What the customer sees on `no_driver` (retry button?).
- Whether cancelling is a Cloud Function call or a restricted write.
- How many past orders the Orders tab shows.

## Tests
None yet.

## Last updated
Initial docs, Phase 1. Planned only.

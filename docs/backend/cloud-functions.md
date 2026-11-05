# Cloud Functions *(planned)*

## What it does
Server code for trusted logic that the apps must not do themselves: alerting drivers,
assigning a driver to a request and changing request status. Shared by both apps.
Not started yet (roadmap Phase 4).

## Key files
None yet.

## How it works
Planned, from the roadmap:
1. A new request is created (status `pending`).
2. A function finds nearby online drivers (using the request's geohash) and sends them push notifications.
3. `acceptRequest` runs in a transaction, so only the first driver to accept gets the job.
4. If nobody accepts in time, the request becomes `no_driver`.
5. Status lifecycle: `pending → accepted → en_route → arrived → delivered`, plus `cancelled` and `no_driver`.

## Rules and gotchas
- Needs the Firebase Blaze (pay-as-you-go) plan.
- Never assign drivers or change request status from the app. It must happen here.

## Still to decide
- How far away counts as "nearby".
- How long before a request times out to `no_driver`.
- Push notification service and how drivers' devices are registered.
- How a driver is marked "online".
- Where the functions code lives (this repo, the driver repo, or a separate one).

## Tests
None yet.

## Last updated
Initial docs, Phase 1. Planned only.

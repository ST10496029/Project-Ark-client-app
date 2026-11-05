# Testing conventions *(planned)*

## What it does
How tests are written and run. **No test tool is set up yet.** Setting up Jest is a task in `TODO.md`.
Until then, the only automatic check is the TypeScript type check.

## Key files
None yet.

## How it works
Today:
```sh
npx tsc --noEmit    # type check. Run before every commit and before saying a task is done
```
Planned:
- Every new feature ships with tests (rule in `CLAUDE.md`).
- Security rules get tested with the Firebase emulator (roadmap Phase 4).

## Rules and gotchas
- Report the result of the checks (pass or fail, with output) when finishing a task.
- Firebase code runs natively, so tests will need React Native Firebase mocked.

## Still to decide
- Test tool setup (Jest with the `jest-expo` preset is the usual choice for Expo).
- Where test files live (next to the code, or a separate `__tests__/` folder).
- What counts as enough testing per feature (unit tests only, or also screen tests).

## Tests
Not applicable.

## Last updated
Initial docs, Phase 1. Planned only.

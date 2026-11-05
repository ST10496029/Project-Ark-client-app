# Dev build, Metro and EAS

## What it does
How to run the app while developing. The app uses native code (React Native Firebase), so it runs
in an Expo **development build**, a custom version of the app installed on the phone. Not Expo Go.

## Key files
- `eas.json`: cloud build profiles
- `app.json`: native config and plugins (changing these needs a rebuild)
- `package.json`: dependencies and scripts

## How it works
```sh
npm install                                                   # install packages
npx tsc --noEmit                                              # type check (run before every commit)
npx expo start --dev-client                                   # start Metro for the installed dev build
npx eas-cli build --profile development --platform android    # cloud build of the dev client APK
```
1. Build the dev client once with EAS (cloud). Install the APK from the link EAS gives you.
2. Run `npx expo start --dev-client` on the computer and open the app on the phone. It loads
   the JavaScript from Metro.
3. JavaScript changes appear right away. No rebuild needed.

Build profiles in `eas.json`:
| Profile | Use |
|---------|-----|
| `development` | Dev client APK for testing with Metro |
| `preview` | Standalone APK to share for testing (no Metro) |
| `production` | Store build, version number goes up automatically |

## Rules and gotchas
- **No Android SDK or Java on this machine.** Native builds only run in the cloud with EAS.
  `npm run android` / `npm run ios` (`expo run:*`) need a local SDK, so they won't work here.
- **Rebuild only when** a package with native code is added or removed, or `app.json` plugins
  or native settings change. Everything else just needs Metro.
- `/android` and `/ios` are generated folders and are git-ignored. Don't edit them by hand.
- The phone and computer need to be on the same network for Metro (or use a tunnel).

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

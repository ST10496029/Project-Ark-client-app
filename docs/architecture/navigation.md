# Navigation

## What it does
Decides which screens the user sees, based on whether they're signed in and have a profile.
Uses React Navigation 7.

## Key files
- `App.tsx`: `RootNavigator`, picks Auth / Onboarding / Main
- `src/navigation/AuthStack.tsx`: Phone → Otp screens
- `src/navigation/CustomerTabs.tsx`: bottom tabs: Home, Profile
- `src/navigation/types.ts`: route names and their params

## How it works
```
loading?       → spinner
not signed in  → Auth stack:  Phone → Otp { phone }
no profile     → Onboarding
otherwise      → Main tabs:   Home | Profile
```
1. `RootNavigator` reads `user`, `profile` and `loading` from `useAuth()`.
2. Only one root screen exists at a time. When the auth state changes (sign-in, profile
   created, logout), the root screen swaps automatically. Screens never navigate there themselves.
3. Inside the Auth stack, `PhoneScreen` navigates to `Otp` and passes the phone number.
   "Change number" goes back.
4. Tab titles are translated with `t()`.

## Rules and gotchas
- Type every screen with the param lists in `types.ts` (`NativeStackScreenProps` /
  `BottomTabScreenProps`). Never use `navigation: any`.
- Only pass simple values in route params. The SMS confirmation object can't be passed,
  which is why it's kept inside `phoneAuth.ts`.
- To move between Auth / Onboarding / Main, change the auth state. Don't call `navigate()`.
- The root stack in `App.tsx` has no param list type yet (`createNativeStackNavigator()` is untyped).
- New screens: add the route to `types.ts` first, then register it in the right navigator.

## Tests
None yet.

## Last updated
Initial docs, Phase 1 (auth & onboarding).

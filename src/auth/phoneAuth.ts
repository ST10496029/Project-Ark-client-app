// Phone number sign-in in two steps:
//   1. sendCode(phone)  -> Firebase texts a 6-digit code to the phone
//   2. confirmCode(code) -> signs the user in
// On Android, Firebase can sometimes read the SMS by itself and sign the user in
// without step 2. AuthContext notices the sign-in and moves on automatically.
import {
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "@react-native-firebase/auth";
import { auth } from "../firebase";

// The pending confirmation can't be passed through navigation params
// (it isn't serialisable), so it lives here between the two screens.
let confirmation: ConfirmationResult | null = null;

// Joins country code + local number into E.164 format (+211912345678).
// Removes spaces/dashes and a leading 0 typed out of local habit.
export function toE164(countryCode: string, localNumber: string): string {
  const code = countryCode.replace(/[^\d]/g, "");
  const number = localNumber.replace(/[^\d]/g, "").replace(/^0+/, "");
  return `+${code}${number}`;
}

// E.164 numbers are at most 15 digits; anything under 8 can't be a real mobile number.
export function isValidE164(phone: string): boolean {
  return /^\+\d{8,15}$/.test(phone);
}

export async function sendCode(phone: string): Promise<void> {
  confirmation = await signInWithPhoneNumber(auth, phone);
}

export async function confirmCode(code: string): Promise<void> {
  if (!confirmation) {
    throw { code: "auth/session-expired" };
  }
  await confirmation.confirm(code);
  confirmation = null;
}

// Maps Firebase error codes to translation keys in src/i18n/*.json.
export function authErrorKey(error: unknown): string {
  const code = (error as { code?: string })?.code ?? "";
  switch (code) {
    case "auth/invalid-phone-number":
    case "auth/missing-phone-number":
      return "errors.invalidPhone";
    case "auth/invalid-verification-code":
    case "auth/missing-verification-code":
      return "errors.invalidCode";
    case "auth/session-expired":
    case "auth/code-expired":
      return "errors.codeExpired";
    case "auth/too-many-requests":
      return "errors.tooManyRequests";
    case "auth/network-request-failed":
    case "firestore/unavailable":
      return "errors.network";
    case "auth/quota-exceeded":
      return "errors.quotaExceeded";
    default:
      // Shows the real Firebase error in the Metro terminal and on the phone
      // (yellow box) during development. Release builds only see the generic text.
      if (__DEV__) console.warn("Unhandled auth error:", code, error);
      return "errors.generic";
  }
}

// Firebase services used by the app (React Native Firebase).
// The project config is read natively from google-services.json (Android) /
// GoogleService-Info.plist (iOS), so no API keys live in the JS code.
// Login is remembered across app restarts automatically.
import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";

export const auth = getAuth();
export const db = getFirestore();

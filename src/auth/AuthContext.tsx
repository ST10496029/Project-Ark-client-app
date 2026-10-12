// Keeps track of who is logged in and their Firestore profile (users/{uid}),
// so any screen can read it with useAuth().
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signOut, type User } from "@react-native-firebase/auth";
import { doc, onSnapshot, setDoc, serverTimestamp } from "@react-native-firebase/firestore";
import { auth, db } from "../firebase";
import { currentLanguage, type Language } from "../i18n";

export type Role = "customer" | "driver";

export type UserProfile = {
  role: Role;
  phone: string;
  name: string;
  language: Language;
};

type AuthState = {
  user: User | null;
  // null = logged in but no profile yet -> show onboarding
  profile: UserProfile | null;
  loading: boolean;
  // Set when a driver account tries to use the customer app; shown on the login screen.
  blockedReason: string | null;
  clearBlockedReason: () => void;
  createProfile: (name: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [blockedReason, setBlockedReason] = useState<string | null>(null);

  // 1. Listen for login / logout. Firebase restores the saved login on app start.
  useEffect(() => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setProfile(null);
      setProfileLoading(firebaseUser !== null);
      setAuthLoading(false);
    });
  }, []);

  // 2. While logged in, listen to the user's profile document.
  useEffect(() => {
    if (!user) return;

    return onSnapshot(
      doc(db, "users", user.uid),
      (snapshot) => {
        if (!snapshot.exists()) {
          // The cache may not have the doc yet; wait for the server before
          // deciding this is a brand new user.
          if (snapshot.metadata.fromCache) return;
          setProfile(null);
          setProfileLoading(false);
          return;
        }

        const data = snapshot.data() as UserProfile;
        if (data.role !== "customer") {
          // Same phone number registered in the driver app: keep them out of this one.
          setBlockedReason("errors.driverAccount");
          signOut(auth).catch(() => {});
          return;
        }

        setProfile(data);
        setProfileLoading(false);
      },
      () => {
        // Can't read the profile (offline / rules); don't trap the user on a spinner.
        setProfileLoading(false);
      }
    );
  }, [user]);

  const createProfile = async (name: string) => {
    if (!user) return;
    await setDoc(doc(db, "users", user.uid), {
      role: "customer",
      phone: user.phoneNumber ?? "",
      name: name.trim(),
      language: currentLanguage(),
      createdAt: serverTimestamp(),
    });
    // No need to set state: the onSnapshot listener above picks up the new doc.
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading: authLoading || profileLoading,
        blockedReason,
        clearBlockedReason: () => setBlockedReason(null),
        createProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}

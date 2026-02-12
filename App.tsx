import 'react-native-gesture-handler';
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./src/firebase";

import AuthStack from "./src/navigation/AuthStack";
import CustomerTabs from "./src/navigation/CustomerTabs";

import {View, ActivityIndicator } from "react-native";
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <CustomerTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
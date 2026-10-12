// Login flow for logged-out users: enter phone number -> enter SMS code.
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PhoneScreen from "../screens/auth/PhoneScreen";
import OtpScreen from "../screens/auth/OtpScreen";
import type { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
    </Stack.Navigator>
  );
}

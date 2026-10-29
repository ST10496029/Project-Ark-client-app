// Route names and the params each screen expects.
// Use these with NativeStackScreenProps / BottomTabScreenProps instead of `any`.
export type AuthStackParamList = {
  Phone: undefined;
  Otp: { phone: string };
};

export type CustomerTabParamList = {
  Home: undefined;
  Profile: undefined;
};

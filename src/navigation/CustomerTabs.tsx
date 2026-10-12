// Main app for logged-in customers: bottom tabs for Home and Profile.
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import HomeScreen from "../screens/customer/HomeScreen";
import ProfileScreen from "../screens/customer/ProfileScreen";
import { colors } from "../theme";
import type { CustomerTabParamList } from "./types";

const Tab = createBottomTabNavigator<CustomerTabParamList>();

export default function CustomerTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: colors.primary }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t("home.title") }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t("profile.title") }} />
    </Tab.Navigator>
  );
}

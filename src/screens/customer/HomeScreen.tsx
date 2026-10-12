import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { colors, fontSize, spacing } from "../../theme";

// Placeholder until the water request flow is built (TODO.md Phase 3).
export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t("home.placeholder")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: fontSize.large,
    color: colors.muted,
    textAlign: "center",
  },
});

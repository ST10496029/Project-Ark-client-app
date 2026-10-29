import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useTranslation } from "react-i18next";

import PrimaryButton from "../../components/PrimaryButton";
import LanguageToggle from "../../components/LanguageToggle";
import { useAuth } from "../../auth/AuthContext";
import { authErrorKey } from "../../auth/phoneAuth";
import { colors, fontSize, spacing, radius } from "../../theme";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { profile, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } catch (e) {
      Alert.alert(t("common.errorTitle"), t(authErrorKey(e)));
      setLoggingOut(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Row label={t("profile.name")} value={profile?.name ?? ""} />
        {/* Phone numbers always read left-to-right */}
        <Row label={t("profile.phone")} value={"⁦" + (profile?.phone ?? "") + "⁩"} />
        <View style={styles.row}>
          <Text style={styles.label}>{t("profile.language")}</Text>
          <LanguageToggle />
        </View>
      </View>

      <PrimaryButton title={t("profile.logout")} onPress={handleLogout} loading={loggingOut} />
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.lg,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius,
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: fontSize.body,
    color: colors.muted,
  },
  value: {
    fontSize: fontSize.body,
    color: colors.text,
    fontWeight: "500",
  },
});

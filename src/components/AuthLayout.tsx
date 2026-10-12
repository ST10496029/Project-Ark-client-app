// Shared frame for the login screens: safe area, keyboard handling,
// language switch in the top corner, then the title and the screen's content.
import type { ReactNode } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageToggle from "./LanguageToggle";
import { colors, spacing, fontSize } from "../theme";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function AuthLayout({ title, subtitle, children }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topBar}>
            <LanguageToggle />
          </View>

          <View style={styles.body}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  topBar: {
    alignItems: "flex-end", // "end" side: right in English, left in Arabic
  },
  body: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "left", // RN flips "left" to the start side in RTL
  },
  subtitle: {
    fontSize: fontSize.body,
    color: colors.muted,
    marginBottom: spacing.lg,
    textAlign: "left",
  },
});

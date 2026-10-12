import { Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "../theme";

// Red message shown under a form when something went wrong.
export default function ErrorText({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <Text style={styles.error} accessibilityRole="alert">
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.error,
    fontSize: fontSize.body,
    marginBottom: spacing.md,
    textAlign: "left",
  },
});

import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import { colors, spacing, fontSize, radius } from "../theme";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  // "primary" = filled blue button, "link" = plain text button
  variant?: "primary" | "link";
};

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
}: Props) {
  const isDisabled = disabled || loading;
  const isLink = variant === "link";

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        isLink ? styles.link : styles.button,
        !isLink && pressed && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isLink ? colors.primary : colors.white} />
      ) : (
        <Text style={isLink ? styles.linkText : styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius,
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.body,
    fontWeight: "600",
  },
  link: {
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  linkText: {
    color: colors.primary,
    fontSize: fontSize.body,
    fontWeight: "500",
  },
});

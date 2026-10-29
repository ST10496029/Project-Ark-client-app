import { forwardRef } from "react";
import { View, Text, TextInput, TextInputProps, StyleSheet } from "react-native";
import { colors, spacing, fontSize, radius } from "../theme";

type Props = TextInputProps & {
  label?: string;
  error?: string | null;
};

const TextField = forwardRef<TextInput, Props>(function TextField(
  { label, error, style, ...inputProps },
  ref
) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        ref={ref}
        placeholderTextColor={colors.muted}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

export default TextField;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.small,
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    minHeight: 52,
    fontSize: fontSize.large,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    color: colors.error,
    fontSize: fontSize.small,
    marginTop: spacing.xs,
  },
});

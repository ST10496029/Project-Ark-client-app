// Step 2 of login: the customer types the code from the SMS.
// When the code is right, AuthContext sees the login and the app moves on by itself.
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import AuthLayout from "../../components/AuthLayout";
import TextField from "../../components/TextField";
import PrimaryButton from "../../components/PrimaryButton";
import ErrorText from "../../components/ErrorText";
import { authErrorKey, confirmCode, sendCode } from "../../auth/phoneAuth";
import { OTP_LENGTH, RESEND_CODE_SECONDS } from "../../config";
import { colors, fontSize, spacing } from "../../theme";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Otp">;

export default function OtpScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { phone } = route.params;

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_CODE_SECONDS);

  // Countdown before "send a new code" becomes available.
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const verify = async (value: string) => {
    if (value.length !== OTP_LENGTH || verifying) return;
    setError(null);
    setVerifying(true);
    try {
      await confirmCode(value);
    } catch (e) {
      setError(t(authErrorKey(e)));
      setCode("");
    } finally {
      setVerifying(false);
    }
  };

  const handleChange = (text: string) => {
    const digits = text.replace(/[^\d]/g, "").slice(0, OTP_LENGTH);
    setCode(digits);
    if (error) setError(null);
    // Submit automatically once all digits are typed (or pasted / auto-filled).
    if (digits.length === OTP_LENGTH) verify(digits);
  };

  const handleResend = async () => {
    setError(null);
    setResending(true);
    try {
      await sendCode(phone);
      setCode("");
      setSecondsLeft(RESEND_CODE_SECONDS);
      Alert.alert(t("otp.resent"));
    } catch (e) {
      setError(t(authErrorKey(e)));
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout
      title={t("otp.title")}
      subtitle={t("otp.subtitle", { length: OTP_LENGTH, phone: "⁦" + phone + "⁩" })}
    >
      <TextField
        value={code}
        onChangeText={handleChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={OTP_LENGTH}
        autoFocus
        placeholder={"•".repeat(OTP_LENGTH)}
        style={styles.codeInput}
        editable={!verifying}
      />

      <ErrorText message={error} />

      <PrimaryButton
        title={t("otp.verify")}
        onPress={() => verify(code)}
        loading={verifying}
        disabled={code.length !== OTP_LENGTH}
      />

      <View style={styles.links}>
        {secondsLeft > 0 ? (
          <Text style={styles.countdown}>
            {t("otp.resendIn", { seconds: secondsLeft })}
          </Text>
        ) : (
          <PrimaryButton
            variant="link"
            title={t("otp.resend")}
            onPress={handleResend}
            loading={resending}
          />
        )}
        <PrimaryButton
          variant="link"
          title={t("otp.changeNumber")}
          onPress={() => navigation.goBack()}
          disabled={verifying}
        />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  codeInput: {
    textAlign: "center",
    letterSpacing: 12,
    fontSize: fontSize.title,
    writingDirection: "ltr",
  },
  links: {
    marginTop: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
  },
  countdown: {
    color: colors.muted,
    fontSize: fontSize.body,
    minHeight: 44,
    textAlignVertical: "center",
  },
});

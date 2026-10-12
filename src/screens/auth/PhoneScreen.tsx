// Step 1 of login: the customer types their phone number and we text them a code.
import { useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import AuthLayout from "../../components/AuthLayout";
import TextField from "../../components/TextField";
import PrimaryButton from "../../components/PrimaryButton";
import ErrorText from "../../components/ErrorText";
import { useAuth } from "../../auth/AuthContext";
import { authErrorKey, isValidE164, sendCode, toE164 } from "../../auth/phoneAuth";
import { DEFAULT_COUNTRY_CODE } from "../../config";
import { spacing } from "../../theme";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Phone">;

export default function PhoneScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { blockedReason, clearBlockedReason } = useAuth();

  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [number, setNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  // A driver account tried to log in here; explain why they were signed out.
  useEffect(() => {
    if (blockedReason) {
      Alert.alert(t("common.errorTitle"), t(blockedReason), [
        { text: t("common.ok"), onPress: clearBlockedReason },
      ]);
    }
  }, [blockedReason]);

  const handleSend = async () => {
    const phone = toE164(countryCode, number);
    if (!isValidE164(phone)) {
      setError(t("errors.invalidPhone"));
      return;
    }

    setError(null);
    setSending(true);
    try {
      await sendCode(phone);
      navigation.navigate("Otp", { phone });
    } catch (e) {
      setError(t(authErrorKey(e)));
    } finally {
      setSending(false);
    }
  };

  return (
    <AuthLayout title={t("phone.title")} subtitle={t("phone.subtitle")}>
      {/* Phone numbers are always written left-to-right, even in Arabic */}
      <View style={styles.row}>
        <View style={styles.code}>
          <TextField
            label={t("phone.codeLabel")}
            value={countryCode}
            onChangeText={(text) => setCountryCode("+" + text.replace(/[^\d]/g, ""))}
            keyboardType="phone-pad"
            maxLength={5}
            style={styles.ltr}
          />
        </View>
        <View style={styles.number}>
          <TextField
            label={t("phone.numberLabel")}
            placeholder={t("phone.numberPlaceholder")}
            value={number}
            onChangeText={(text) => {
              setNumber(text);
              if (error) setError(null);
            }}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoComplete="tel"
            maxLength={15}
            autoFocus
            style={styles.ltr}
            onSubmitEditing={handleSend}
          />
        </View>
      </View>

      <ErrorText message={error} />

      <PrimaryButton
        title={t("phone.send")}
        onPress={handleSend}
        loading={sending}
        disabled={number.trim().length === 0}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    direction: "ltr",
    gap: spacing.sm,
  },
  code: {
    width: 90,
  },
  number: {
    flex: 1,
  },
  ltr: {
    writingDirection: "ltr",
    textAlign: "left",
  },
});

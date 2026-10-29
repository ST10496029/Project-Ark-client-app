// Shown once, right after a new customer's first login: ask their name and
// create their profile (users/{uid}). Returning customers skip this screen.
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AuthLayout from "../../components/AuthLayout";
import TextField from "../../components/TextField";
import PrimaryButton from "../../components/PrimaryButton";
import ErrorText from "../../components/ErrorText";
import { useAuth } from "../../auth/AuthContext";
import { authErrorKey } from "../../auth/phoneAuth";

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const { createProfile } = useAuth();

  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (name.trim().length < 2) {
      setError(t("errors.nameRequired"));
      return;
    }

    setError(null);
    setSaving(true);
    try {
      await createProfile(name);
      // AuthContext sees the new profile and shows the main app.
    } catch (e) {
      setError(t(authErrorKey(e)));
      setSaving(false);
    }
  };

  return (
    <AuthLayout title={t("onboarding.title")} subtitle={t("onboarding.subtitle")}>
      <TextField
        label={t("onboarding.nameLabel")}
        placeholder={t("onboarding.namePlaceholder")}
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (error) setError(null);
        }}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        autoFocus
        maxLength={60}
        onSubmitEditing={handleContinue}
      />

      <ErrorText message={error} />

      <PrimaryButton
        title={t("onboarding.continue")}
        onPress={handleContinue}
        loading={saving}
      />
    </AuthLayout>
  );
}

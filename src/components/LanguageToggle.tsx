import { useTranslation } from "react-i18next";
import PrimaryButton from "./PrimaryButton";
import { currentLanguage, setLanguage } from "../i18n";

// Shows the *other* language ("عربي" while in English, "English" while in Arabic).
// Switching restarts the app so the layout can flip direction.
export default function LanguageToggle() {
  const { t } = useTranslation();
  const other = currentLanguage() === "ar" ? "en" : "ar";

  return (
    <PrimaryButton
      variant="link"
      title={t("language.switchTo")}
      onPress={() => setLanguage(other)}
    />
  );
}

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en.json";
import ja from "./ja.json";

export const initLocalization = () => {
  const translations = {
    en,
    ja,
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
};

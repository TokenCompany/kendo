import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en.json";
import ja from "./ja.json";

const i18n = new I18n({ en, ja });
// Set the locale once at the beginning of your app.
// i18n.locale = "en";
// i18n.locale = Localization.locale;
i18n.locale = i18n.locale ? i18n.locale : Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

export default i18n;

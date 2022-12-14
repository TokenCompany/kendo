import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";
import * as Updates from 'expo-updates'

type Props = NativeStackScreenProps<MainStackParamList, "Language">;

export const LanguageScreen: React.FC<Props> = () => {
  const { currentLang, onChangeLang } = useLang();
  const Restart = () => {
    Updates.reloadAsync()
  }

  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;

  const [locale, setLocale] = useState(i18n.locale);

  const langChengeJP = () => {
    i18n.locale = "ja-JP";
    setLocale(i18n.locale);
    onChangeLang(i18n.locale);
    setTimeout(() => {
      Restart()
    }, 3000);
  };

  const langChengeEN = () => {
    i18n.locale = "en";
    setLocale(i18n.locale);
    onChangeLang(i18n.locale);
    setTimeout(() => {
      Restart()
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.initEditButton}
          onPress={() => {
            langChengeJP();
          }}
        >
          <Text style={locale === "ja-JP" ? styles.selectedStyle : styles.notSelectedStyle}>
            日本語 / Japanese
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.initEditButton}
          onPress={() => {
            langChengeEN();
          }}
        >
          <Text style={locale === "en" ? styles.selectedStyle : styles.notSelectedStyle}>
            英語 / English
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: 40,
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 50,
  },
  initEditButton: {
    marginBottom: 3,
    width: "100%",
    height: 50,
    backgroundColor: "#FCCDCD",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedStyle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
  },
  notSelectedStyle: {
    color: "#000",
    fontSize: 20,
  },
});

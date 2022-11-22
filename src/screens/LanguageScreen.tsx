import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import i18n from "../lang/localization";

type Props = NativeStackScreenProps<MainStackParamList, "Language">;

export const LanguageScreen: React.FC<Props> = ({ navigation }: Props) => {
  // console.log(i18n.locale);

  const langChengeJP = () => {
    i18n.locale = "ja-JP";
    navigation.navigate("Setting");
  };

  const langChengeEN = () => {
    i18n.locale = "en";
    navigation.navigate("Setting");
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
          <Text style={i18n.locale === "ja-JP" ? styles.selectedStyle : styles.notSelectedStyle}>
            日本語
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.initEditButton}
          onPress={() => {
            langChengeEN();
          }}
        >
          <Text style={i18n.locale === "en" ? styles.selectedStyle : styles.notSelectedStyle}>
            英語
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

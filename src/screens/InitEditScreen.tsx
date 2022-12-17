import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { useInitText } from "../hooks/useInitText";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";
type Props = NativeStackScreenProps<MainStackParamList, "InitEdit">;

export const InitEditScreen: React.FC<Props> = ({}: Props) => {
  const { currentLang, onChangeLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;
  const initEditText = [
    `${i18n.t("InitEdit.InitEdit01")}`,
    `${i18n.t("InitEdit.InitEdit02")}`,
    `${i18n.t("InitEdit.InitEdit03")}`,
    `${i18n.t("InitEdit.InitEdit04")}`,
    `${i18n.t("InitEdit.InitEdit05")}`,
    `${i18n.t("InitEdit.InitEdit06")}`,
  ];

  const { currentText, onPressSave } = useInitText();
  const initTitle = currentText ? currentText : `${i18n.t("InitEdit.InitEdit01")}`;
  const [Selected, setSelected] = useState(initTitle);
  const renderItem = ({ item }: any) => {
    const SelectedStyle = item === Selected ? styles.selectedStyle : styles.notSelectedStyle;

    return (
      <TouchableOpacity
        style={styles.initEditButton}
        onPress={() => {
          setSelected(item);
          onPressSave(item);
        }}
      >
        <Text style={SelectedStyle}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <FlatList data={initEditText} renderItem={renderItem} />
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

import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, TextInput } from "react-native";
import { colors } from "../styles";
import i18n from "../lang/localization";

type Props = {
  visible: boolean; // 入力フォームの表示/非表示
  text: string; // 入力中の文字
  onChangeText: (text: string) => void;
  onPressSubmit: () => void;
};

export const ItemInputForm: React.FC<Props> = ({ visible, onPressSubmit, text, onChangeText }) => {
  return visible ? (
    <View style={styles.body}>
      <View style={styles.item}>
        <TextInput
          style={styles.input}
          placeholder={i18n.t("TrainingEdit.inputText")}
          value={text}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity style={styles.container} onPress={onPressSubmit}>
        <Text style={styles.text}>{i18n.t("ScheduleScreen.entry")}</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 25,
    borderColor: "#aaa",
    paddingHorizontal: 5,
    color: "#000",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    flexGrow: 1,
  },
  item: {
    position: "relative",
    marginBottom: 3,
    width: "75%",
    height: 50,
    backgroundColor: "#def3d7",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "25%",
    height: 50,
    marginBottom: 3,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    flexGrow: 1,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

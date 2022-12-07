import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { colors } from "../styles";
import i18n from "../lang/localization";
type Props = {
  visible: boolean; // 入力フォームの表示/非表示
  text: string; // 入力中の文字
  onPressSubmitKeiko: () => void;
};

export const ItemTextForm: React.FC<Props> = ({ visible, onPressSubmitKeiko, text }) => {
  return visible ? (
    <View style={styles.body}>
      <View style={styles.item}>
        <Text style={styles.category}>{i18n.t("ResultEdit.ari")}</Text>
      </View>
      <TouchableOpacity style={styles.container} onPress={onPressSubmitKeiko}>
        <Text style={styles.containerText}>{i18n.t("ScheduleScreen.entry")}</Text>
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
  containerText:{
    color:"#fff",
    fontWeight: "600",
  },
  category: {
    height: 25,
    borderColor: "#aaa",
    paddingHorizontal: 5,
    color: "#000",
    fontWeight: "600",
    fontSize: 20,
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
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

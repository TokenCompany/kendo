import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { colors } from "../styles";

type Props = {
  visible: boolean; // 入力フォームの表示/非表示
  text: string; // 入力中の文字
  onPressSubmitKeiko: () => void;
};

export const ItemTextForm: React.FC<Props> = ({ visible, onPressSubmitKeiko, text }) => {
  return visible ? (
    <View style={styles.item}>
      <Text style={styles.category}>あり</Text>
      <TouchableOpacity onPress={onPressSubmitKeiko}>
        <Text>登録</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
    width: "100%",
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

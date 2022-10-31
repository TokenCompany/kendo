import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, TextInput } from "react-native";
import { colors } from "../styles";

type Props = {
  visible: boolean; // 入力フォームの表示/非表示
  text: string; // 入力中の文字
  onChangeText: (text: string) => void;
  onPressSubmit: () => void;
};

export const ItemInputForm: React.FC<Props> = ({ visible, onPressSubmit, text, onChangeText }) => {
  return visible ? (
    <View style={styles.item}>
      <TextInput
        style={styles.input}
        placeholder={"テキスト入力"}
        value={text}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onPressSubmit}>
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
  input: {
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

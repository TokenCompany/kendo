import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, TextInput } from "react-native";
import { colors } from "../styles";

type Props = {
  visible: boolean;
  text: string;
  onPress: (text: string) => void;
};

export const ItemInputForm: React.FC<Props> = ({ visible, onPress, text }) => {
  return (
    <View style={styles.item} visible={visible}>
      <TextInput style={styles.input} onPress={onPress} placeholder={"テキスト入力"} />
      <TouchableOpacity>
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
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

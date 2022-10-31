import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, TextInput } from "react-native";
import { colors } from "../styles";
import { SwipeListView } from "react-native-swipe-list-view";

type Props = {
  text: string; // 入力中の文字
  data: string;
  renderItem: string;
  onPressdelete: () => void;
};

export const SwipeItem: React.FC<Props> = ({ onPressdelete, text, data, renderItem }) => {
  return (
    <SwipeListView
      data={data}
      renderItem={(renderItem) => (
        <View style={styles.item}>
          <Text style={styles.input}>{text}</Text>
        </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <TouchableOpacity style={styles.dalete} onPress={onPressdelete}>
          <Text>消去</Text>
        </TouchableOpacity>
      )}
      leftOpenValue={75}
    />
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
  dalete: {
    marginBottom: 3,
    width: 75,
    height: 50,
    fontSize: 20,
    backgroundColor: "#e4715d",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
};

export const MajorItem: React.FC<Props> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 3,
    width: "100%",
    height: 50,
    backgroundColor: "#FCCDCD",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontWeight: "600",
    fontSize: 20,
  },
});

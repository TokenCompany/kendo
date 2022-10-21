import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors } from "../styles";

type Props = {
  text: string;
  onPress: () => void;
};

export const Button: React.FC<Props> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
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
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

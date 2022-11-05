import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

type Props = {
  text01: string;
  text02: string;
};

export const TextButton: React.FC<Props> = ({ text01, text02 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText01}>{text01}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText02}>{text02}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexGrow: 1,
  },
  buttonText01: {
    color: "blue",
    textAlign: "center",
    fontSize: 16,
  },
  buttonText02: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});

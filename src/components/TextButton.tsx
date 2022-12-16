import React,{useState} from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

type Props = {
  text01: string;
  text02: string;
  onPress01: () => void;
  onPress02: () => void;
  judge:boolean;
};
export const TextButton: React.FC<Props> = ({ text01, text02, onPress01, onPress02, judge }) => {
  return (
    <View style={styles.container}>
      {judge && (
        <TouchableOpacity style={styles.button} onPress={onPress01}>
          <Text style={styles.buttonText01}>{text01}</Text>
        </TouchableOpacity>
      )}
         <TouchableOpacity style={styles.button} onPress={onPress02}>
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
    zIndex:-1,
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

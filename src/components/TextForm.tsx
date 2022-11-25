import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export const TextForm: React.FC<Props> = ({ label, value, onChangeText, placeholder = "" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        maxLength={60}
        multiline={true}
        blurOnSubmit={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
  },
  input: {
    minHeight: 40,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingHorizontal: 5,
  },
});

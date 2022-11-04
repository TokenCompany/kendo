import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangePassingDay: (text: string) => void;
  onChangeExamDay: (text: string) => void;
  placeholder?: string;
};

export const LevelForm: React.FC<Props> = ({
  label,
  value,
  onChangePassingDay,
  onChangeExamDay,
  placeholder = "",
}) => {
  return (
    <View style={styles.levelContainer}>
      <Text style={styles.levelLavel}>{label}</Text>
      <View style={styles.displayRow}>
        <Text style={styles.dayLavel}>合格日</Text>
        <TextInput
          style={styles.dayInput}
          onChangeText={onChangePassingDay}
          value={value}
          placeholder={placeholder}
        />
      </View>
      <View style={styles.displayRow}>
        <Text style={styles.dayLavel}>審査日</Text>
        <TextInput
          style={styles.dayInput}
          onChangeText={onChangeExamDay}
          value={value}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  levelContainer: {
    marginTop: 30,
  },
  displayRow: {
    flexDirection: "row",
  },
  levelLavel: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
  },
  dayLavel: {
    fontSize: 18,
    marginTop: 5,
  },
  dayInput: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    marginLeft: 15,
    marginBottom: 20,
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
  },
});

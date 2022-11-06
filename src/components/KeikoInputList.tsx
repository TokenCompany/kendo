import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Checkbox } from 'react-native-paper';

type Props = {
  textTeacher: string;
};

export const KeikoTeacherInput: React.FC<Props> = ({ textTeacher }) => {

  
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  return (
    <View style={styles.inputWrap}>
    <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
    {!!checked && <View style={styles.inputArea}>
      <Text style={styles.label}>{textTeacher}</Text>
      <View style={styles.inputGroup}>
      <TextInput style={styles.inputLarge}/>
      <Text style={styles.inputText}>先生</Text>
    </View>
    <View style={styles.inputGroup}>
      <TextInput style={styles.inputLarge}/>
      <Text style={styles.inputText}>先生</Text>
    </View>
    <View style={styles.inputGroup}>
      <View style={styles.inputGroup}>
        <Checkbox
        status={checked2 ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked2(!checked2);
        }}
      />
        <Text style={styles.inputText}>あり</Text>
      </View>
      <TextInput style={styles.input}/>
      <Text style={styles.inputText}>分</Text>
    </View>
    </View>}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },

  inputWrap: {
    margin: 10,
    flexDirection: "row",
  },

  inputArea: {
    flex: 1,
    marginTop: 6,
  },

  inputGroup: {
    flexDirection: "row",
  },

  inputText: {
    fontSize: 18,
    color: "#000",
    margin: 5,
    marginTop: 7,
    width: 108,
  },

  label: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
  },
  labelWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    height: 30,
    width: 54,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingHorizontal: 5,
    margin: 5,
  },

  inputLarge: {
    height: 30,
    width: 108,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingHorizontal: 5,
    margin: 5,
  },

  inputFull: {
    height: 30,
    width: "100%",
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingHorizontal: 5,
    margin: 5,
  },
});
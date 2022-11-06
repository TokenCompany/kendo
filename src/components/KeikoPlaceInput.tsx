import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Checkbox } from 'react-native-paper';

type Props = {
  textPlace: string;
};

export const KeikoPlaceInput: React.FC<Props> = ({ textPlace }) => {

  
  const [checked, setChecked] = React.useState(false);

  return (
  <View style={styles.inputWrap}>
    <Checkbox
    status={checked ? 'checked' : 'unchecked'}
    onPress={() => {
      setChecked(!checked);
    }}
  />
    <View style={styles.inputArea}>
      <Text style={styles.label}>{textPlace}</Text>
      {!!checked && <View>
      <View style={styles.inputGroup}>
        <TextInput style={styles.inputFull}/>
      </View>
      </View>}
    </View>

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
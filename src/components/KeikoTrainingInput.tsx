import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Checkbox } from "react-native-paper";

type Props = {
  textTraining: string;
  trainingKey: string;
};

export const KeikoTrainingInput: React.FC<Props> = ({ textTraining,trainingKey}) => {
  const [checked, setChecked] = React.useState(false);
  const subCategories = {
    ashiSabakiSubCategories: {
      unit: '分',
      subCategoryNames:["すり足","歩み足"],
    },
    kakarigeikoSubCategories: {
      unit: '分',
      subCategoryNames:["すり足","歩み足"],
    },
    kihonUchiSubCategories: {
      unit: '本',
      subCategoryNames:["切り返し","歩み足"],
    },
    oujiwazaSubCategories: {
      unit: '本',
      subCategoryNames:["すり足","歩み足"],
    },
    placeSubCategories: {
      subCategoryNames:["横浜アリーナ","与那国道場","アグレ体育館"],
    },
    suburiSubCategories: {
      unit: '本',
      subCategoryNames:["上下素振り","正面内","左右面","素振り"],
    },
    targetSubCategories: {
      unit: '回',
      subCategoryNames:["12","13"],
    },
    jigeikoSubCategories: {
      unit:"本",
      subCategoryNames:["あり"]
    },
  }
  // let subCategoriesArray = subCategories[trainingKey].subCategoryNames;
  // console.log(subCategories[trainingKey]);
  // console.log(subCategoriesArray);

  return (
    <View style={styles.inputWrap}>
      <View style={styles.check}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>

      <View style={styles.inputArea}>
        <Text style={styles.label}>{textTraining}</Text>
        {!!checked && (
          <View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputText}>{textSubTraining}</Text>
              <TextInput style={styles.input} />
              <Text style={styles.inputText}>{textTrainingUnit}</Text>
            </View>
          </View>
          // {subCategoriesArray.map((category,index)=> (<KeikoTrainingInput textTraining={category} trainingKey={mainCategorieskeys[index]}/>))}
        )}
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
  check: {
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 35,
    marginRight: 10,
    borderColor: "#aaa",
    borderWidth: 1,
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

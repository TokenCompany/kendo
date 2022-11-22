import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Checkbox } from "react-native-paper";
import { Picker } from "@react-native-community/picker";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type Props = {
  textTraining: string;
  textTrainingUnit: string;
  textTrainingCategories: string;
  reservedPlace: string;
  onChangeSendInput: (changedResults: SubCategories[], mainCategory: string) => void;
};

export type SubCategories = {
  id: string;
  text: string;
  result: number | boolean;
};

export type Results = {
  placeSubCategories: SubCategories[];
  trainingTime: SubCategories[];
  suburiSubCategories: SubCategories[];
  ashiSabakiSubCategories: SubCategories[];
  kihonUchiSubCategories: SubCategories[];
  oujiwazaSubCategories: SubCategories[];
  jigeikoSubCategories: SubCategories[];
  teacherSubCategories: SubCategories[];
  kakarigeikoSubCategories: SubCategories[];
};

export const KeikoTrainingInput: React.FC<Props> = ({
  textTraining,
  textTrainingUnit,
  textTrainingCategories,
  reservedPlace,
  onChangeSendInput,
}) => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [place, setPlace] = useState<string>(reservedPlace);
  const [value, setValue] = useState<number | boolean>();
  const subCategories = useSelector((state: RootState) => state.subCategory);
  const initResults: Results = {...subCategories};
  const [results, setResults] = useState<Results>(initResults);
  // 入力された実績をstateに保存するための関数
  const onChangeCountResults = (count: number, id: string, mainCategory: string) => {
    let newResults = { ...results };
    if (mainCategory in newResults) {
      for (const subCategory of newResults[mainCategory]) {
        if (subCategory.id === id) {
          subCategory.result = count;
        }
      }
    } else {
      newResults[mainCategory] = [
        {
          id: "none",
          text: "",
          result: count,
        },
      ];
    }

    setResults(newResults);
  };

  // サブカテゴリ―によって出すinput形式を変更
  let input1: boolean = false;
  let input2: boolean = false;
  let input3: boolean = false;


  if (textTraining === "稽古場所") {
    input3 = true;
  } else if (textTraining === "地稽古" || textTraining === "掛稽古") {
    input2 = true;
  } else {
    input1 = true;
  }

  let subCategoriesData: any = [];

  // subcategoriesに登録がない稽古時間の条件分岐
  if (textTrainingCategories in results) {
    for (const data of results[textTrainingCategories]) {
      subCategoriesData.push({
        id: data.id,
        text: data.text,
        mainCategory: textTrainingCategories,
      });
    }
  } else {
    // ここが稽古時間の表示
    subCategoriesData.push({
      id: "",
      text: "",
      mainCategory: textTrainingCategories,
    });
  }

  let inputSelected = true;
  if (place === "input") {
    inputSelected = true;
  } else {
    inputSelected = false;
  }

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
            {!!input1 && (
              <View>
                {subCategoriesData.map((data: any, index: number) => (
                  <View style={styles.inputGroup} key={index}>
                    <Text style={styles.inputText}>{data.text}</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        onChangeCountResults(Number(text), data.id, data.mainCategory);
                        onChangeSendInput(results[data.mainCategory], data.mainCategory);
                      }}
                    />
                    <Text style={styles.inputText}>{textTrainingUnit}</Text>
                  </View>
                ))}
              </View>
            )}
            {!!input2 && (
              <View>
                <View style={styles.inputGroup}>
                  <View style={styles.inputGroup}>
                    <Checkbox
                      status={checked2 ? "checked" : "unchecked"}
                      onPress={() => {
                        setChecked2(!checked2);
                      }}
                    />
                    <Text style={styles.inputText}>あり</Text>
                  </View>
                  {!!checked2 &&
                    subCategoriesData.map((data: any, index: number) => (
                      <View style={styles.inputGroup}>
                        <TextInput
                          style={styles.input}
                          keyboardType="numeric"
                          onChangeText={(text) => {
                            onChangeCountResults(Number(text), data.id, data.mainCategory);
                            onChangeSendInput(results[data.mainCategory], data.mainCategory);
                          }}
                        />
                        <Text style={styles.inputText}>{textTrainingUnit}</Text>
                      </View>
                    ))}
                </View>
              </View>
            )}
            {!!input3 && (
              <View>
                <View style={styles.inputpicker}>
                  <Picker
                    selectedValue={place}
                    onValueChange={(itemValue, itemIndex) => {
                      if (itemValue !== "input") {
                        let newResults = { ...results };
                        for (const place of newResults["placeSubCategories"]) {
                          if (place["result"]) {
                            place["result"] = false;
                          }
                        }
                        newResults["placeSubCategories"][itemIndex]["result"] = true;
                        setResults(newResults);
                        setPlace(newResults["placeSubCategories"][itemIndex]["text"]);
                      } else {
                        setPlace("input");
                      }
                      onChangeSendInput(results["placeSubCategories"], "placeSubCategories");
                    }}
                    itemStyle={{ height: 60 }}
                  >
                    {subCategoriesData.map((data: any, index: number) => (
                      <Picker.Item label={data.text} value={data.text} key={index} />
                    ))}
                    <Picker.Item label="直接入力" value="input" />
                  </Picker>
                  {!!inputSelected && <TextInput style={styles.inputFull} />}
                </View>
              </View>
            )}
          </View>
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
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  inputpicker: {
    flexGrow: 1,
  },
});

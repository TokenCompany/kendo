import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Checkbox } from "react-native-paper";
import { Picker } from "@react-native-community/picker";

type Props = {
  textTraining: string;
  textTrainingUnit: string;
  textTrainingCategories: string;
  reservedPlace: string;
};

export type SubCategories = [
  {
    id: string,
    text: string,
    result: number,
  }
] 

export type Results = {
  [date: string]:{
    place: string,
    time: number,
    suburiSubCategories:SubCategories[],
    ashiSabakiSubCategories:SubCategories[],
    kihonUchiSubCategories:SubCategories[],
    oujiwazaSubCategories:SubCategories[],
    jigeikoSubCategories:SubCategories[],
    teacherSubCategories:SubCategories[],
    kakarigeikoSubCategories:SubCategories[],
  }
};

export const KeikoTrainingInput: React.FC<Props> = ({ textTraining, textTrainingUnit, textTrainingCategories,reservedPlace }) => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [place, setPlace] = useState<string>(reservedPlace);
  const [results, setResults] = useState<Results>();

  let input1: boolean = false;
  let input2: boolean = false;
  let input3: boolean = false;
  const subCategories = {
    "ashiSabakiSubCategories": [
      {
        "id": "3c8dd78b-ad72-49e2-995c-9d6663af289b",
        "text": "足さばき",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "上下素振り",
      },
    ],
    "kihonUchiSubCategories": [
      {
        "id": "3c8dd78b-ad72-49e2-995c-9d6663af289b",
        "text": "test",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test2",
      },
    ],
    "oujiwazaSubCategories": [
      {
        "id": "3c8dd78b-ad72-49e2-995c-9d6663af289b",
        "text": "test3",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test4",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test5",
      },
    ],
    "suburiSubCategories": [
      {
        "id": "3c8dd78b-ad72-49e2-995c-9d6663af289b",
        "text": "test3",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test4",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test5",
      },
    ],
    "teacherSubCategories": [
      {
        "id": "3c8dd78b-ad72-49e2-995c-9d6663af289b",
        "text": "test3",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test4",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test5",
      },
    ],
    "placeSubCategories": [
      {
        "id": "3c8dd78b-ad72-49e2-995c-9d6663af289b",
        "text": "test3",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test4",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test5",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "横浜アリーナ",
      },
    ],
    "targetSubCategories": [
      {
        "id": "3c8dd78b-ad72-49e2-995c-9d6663af289b",
        "text": "test3",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test4",
      },
      {
        "id": "576b9c5d-46ce-4980-a90a-079a5083d80e",
        "text": "test5",
      },
    ]
  }

  if (textTraining === "稽古場所") {
    input3 = true;
  } else if (textTraining === "地稽古" || textTraining === "掛稽古") {
    input2 = true;
  } else {
    input1 = true;
  }

  let subCategoriesData: any = [];

  // subcategoriesに登録がない稽古時間の条件分岐
  if (textTrainingCategories in subCategories) {
    for (const data of subCategories[textTrainingCategories]) {
      subCategoriesData.push([data.text])
    }
  }else{
    subCategoriesData.push('')
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
                {subCategoriesData.map((data) =>(
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputText}>{data[0]}</Text>
                    <TextInput
                     style={styles.input}
                     keyboardType="numeric" 
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
                  {!!checked2 && (
                    <View style={styles.inputGroup}>
                      <TextInput style={styles.input} keyboardType="numeric" />
                      <Text style={styles.inputText}>{textTrainingUnit}</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
            {!!input3 && (
              <View>
                <View style={styles.inputpicker}>
                  <Picker
                    selectedValue={place}
                    onValueChange={(itemValue, itemIndex) => setPlace(itemValue.toString())}
                    itemStyle={{ height: 60 }}>
                    {subCategoriesData.map((data) =>(
                      <Picker.Item label={data[0]} value={data[0]} />
                    ))}
                    <Picker.Item label="直接入力" value="input" />
                  </Picker>
                  {!!inputSelected &&(
                    <TextInput style={styles.inputFull} />
                    )
                  }
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
  }
});

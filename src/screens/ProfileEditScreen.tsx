import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { TextForm } from "../components/TextForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";
import { LevelForm } from "../components/LevelForm";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

type Props = NativeStackScreenProps<MainStackParamList, "ProfileEdit">;

export const ProfileEditScreen: React.FC<Props> = ({}: Props) => {
  // useProfileFormというカスタムフックにフォーム編集に関わるロジックを分離しています
  const {
    currentName,
    currentBirthday,
    currentAge,
    currentKenNumber,
    currentPassedDate,
    currentExamDate,
    onChangeName,
    onChangeBirthday,
    onChangePassedDate,
    onChangeExamDate,
    onChangeAge,
    onChangeKenNumber,
    onPressSave,
  } = useProfileForm();

  const [show, setShow] = useState<boolean>(false);
  const showDatepicker = () => {
    setShow(true);
  };
  const onPressClose = () => {
    setShow(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileContainer}>
        <View style={styles.profileBody}>
          <TextForm label="氏名" value={currentName} onChangeText={onChangeName} />
          <View style={styles.birthdayInput}>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              <Text style={styles.buttonText}>誕生日設定</Text>
            </TouchableOpacity>
            <Text style={styles.birthdayText}>{currentBirthday}</Text>
          </View>
          <Modal
            animationType="fade"
            visible={show}
            transparent={true}
            onRequestClose={() => {
              setShow(false);
            }}
          >
            <View style={styles.modalView}>
              <DateTimePicker
                value={dayjs(currentBirthday.toString(), "YYYYMMDD").toDate()}
                mode="date"
                display={"spinner"}
                onChange={(event, date) => {
                  if (date) {
                    const birthday = Number(dayjs(date).format("YYYYMMDD"));
                    onChangeBirthday(birthday);
                  }
                }}
              />
              <TouchableOpacity style={styles.modalButton} onPress={() => onPressClose()}>
                <Text style={styles.textStyle}>×</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <TextForm label="年齢" value={currentAge} onChangeText={onChangeAge} />
          <TextForm label="全剣連番号" value={currentKenNumber} onChangeText={onChangeKenNumber} />
        </View>
        <Image style={styles.profileImage} source={require("../../assets/images/profile.png")} />
      </View>

      <LevelForm
        label="初段"
        currentPassedDateText={currentPassedDate}
        currentExamDateText={currentExamDate}
        passedDateValue={dayjs(currentPassedDate.toString(), "YYYYMMDD").toDate()}
        examDateValue={dayjs(currentExamDate.toString(), "YYYYMMDD").toDate()}
        onChangePassed={(event, date1) => {
          if (date1) {
            const passed = Number(dayjs(date1).format("YYYYMMDD"));
            onChangePassedDate(passed);
          }
        }}
        onChangeExam={(event, date2) => {
          if (date2) {
            const exam = Number(dayjs(date2).format("YYYYMMDD"));
            onChangeExamDate(exam);
          }
        }}
      />

      <View style={styles.buttonContainer}>
        <Button text="プロフィール登録" onPress={onPressSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  modalView: {
    position: "relative",
    top: "40%",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  modalButton: {
    borderRadius: 5,
    padding: 7,
    width: 50,
    elevation: 2,
    position: "absolute",
    top: 15,
    right: 15,
  },
  textStyle: {
    fontSize: 26,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  profileContainer: {
    flexDirection: "row",
  },
  profileBody: {
    flexGrow: 1,
    paddingRight: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  birthdayInput: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 30,
    height: 25,
    borderColor: "#aaa",
    color: "#000",
    fontWeight: "600",
    fontSize: 20,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "#a53010",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  birthdayText: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    marginLeft: 15,
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingHorizontal: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
});

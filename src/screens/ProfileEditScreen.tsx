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
    currentPassedDate01,
    currentPassedDate02,
    currentExamDate01,
    currentExamDate02,
    onChangeName,
    onChangeBirthday,
    onChangePassedDate01,
    onChangePassedDate02,
    onChangeExamDate01,
    onChangeExamDate02,
    onChangeAge,
    onChangeKenNumber,
    onPressSave,
  } = useProfileForm();

  // 日付選択モーダルの表示非表示
  const [show, setShow] = useState<boolean>(false);
  const [show01, setShow01] = useState<boolean>(false);
  const [show02, setShow02] = useState<boolean>(false);
  const [show03, setShow03] = useState<boolean>(false);
  const [show04, setShow04] = useState<boolean>(false);

  const showDatepicker = () => {
    setShow(true);
  };
  const showDatepicker01 = () => {
    setShow01(true);
  };
  const showDatepicker02 = () => {
    setShow02(true);
  };
  const showDatepicker03 = () => {
    setShow03(true);
  };
  const showDatepicker04 = () => {
    setShow04(true);
  };
  const onPressClose = () => {
    setShow(false);
    setShow01(false);
    setShow02(false);
    setShow03(false);
    setShow04(false);
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
        visiblePassed={show01}
        visibleExam={show02}
        showDatepickerPassed={showDatepicker01}
        showDatepickerExam={showDatepicker02}
        currentPassedDateText={currentPassedDate01}
        currentExamDateText={currentExamDate01}
        passedDateValue={dayjs(currentPassedDate01.toString(), "YYYYMMDD").toDate()}
        onChangePassed={(event, date1) => {
          if (date1) {
            const passed01 = Number(dayjs(date1).format("YYYYMMDD"));
            onChangePassedDate01(passed01);
          }
        }}
        examDateValue={dayjs(currentExamDate01.toString(), "YYYYMMDD").toDate()}
        onChangeExam={(event, date2) => {
          if (date2) {
            const exam01 = Number(dayjs(date2).format("YYYYMMDD"));
            onChangeExamDate01(exam01);
          }
        }}
        onPressClose={onPressClose}
      />

      <LevelForm
        label="弐段"
        visiblePassed={show03}
        visibleExam={show04}
        showDatepickerPassed={showDatepicker03}
        showDatepickerExam={showDatepicker04}
        currentPassedDateText={currentPassedDate02}
        currentExamDateText={currentExamDate02}
        passedDateValue={dayjs(currentPassedDate02.toString(), "YYYYMMDD").toDate()}
        onChangePassed={(event, date1) => {
          if (date1) {
            const passed02 = Number(dayjs(date1).format("YYYYMMDD"));
            onChangePassedDate02(passed02);
          }
        }}
        examDateValue={dayjs(currentExamDate02.toString(), "YYYYMMDD").toDate()}
        onChangeExam={(event, date2) => {
          if (date2) {
            const exam02 = Number(dayjs(date2).format("YYYYMMDD"));
            onChangeExamDate02(exam02);
          }
        }}
        onPressClose={onPressClose}
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

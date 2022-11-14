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
  let {
    currentName,
    currentBirthday,
    currentAge,
    currentKenNumber,
    currentPassedDate01,
    currentPassedDate02,
    currentPassedDate03,
    currentPassedDate04,
    currentPassedDate05,
    currentPassedDate06,
    currentPassedDate07,
    currentPassedDate08,
    currentExamDate01,
    currentExamDate02,
    currentExamDate03,
    currentExamDate04,
    currentExamDate05,
    currentExamDate06,
    currentExamDate07,
    currentExamDate08,
    onChangeName,
    onChangeBirthday,
    onChangePassedDate01,
    onChangePassedDate02,
    onChangePassedDate03,
    onChangePassedDate04,
    onChangePassedDate05,
    onChangePassedDate06,
    onChangePassedDate07,
    onChangePassedDate08,
    onChangeExamDate01,
    onChangeExamDate02,
    onChangeExamDate03,
    onChangeExamDate04,
    onChangeExamDate05,
    onChangeExamDate06,
    onChangeExamDate07,
    onChangeExamDate08,
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
  const [show05, setShow05] = useState<boolean>(false);
  const [show06, setShow06] = useState<boolean>(false);
  const [show07, setShow07] = useState<boolean>(false);
  const [show08, setShow08] = useState<boolean>(false);
  const [show09, setShow09] = useState<boolean>(false);
  const [show10, setShow10] = useState<boolean>(false);
  const [show11, setShow11] = useState<boolean>(false);
  const [show12, setShow12] = useState<boolean>(false);
  const [show13, setShow13] = useState<boolean>(false);
  const [show14, setShow14] = useState<boolean>(false);
  const [show15, setShow15] = useState<boolean>(false);
  const [show16, setShow16] = useState<boolean>(false);

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
  const showDatepicker05 = () => {
    setShow05(true);
  };
  const showDatepicker06 = () => {
    setShow06(true);
  };
  const showDatepicker07 = () => {
    setShow07(true);
  };
  const showDatepicker08 = () => {
    setShow08(true);
  };
  const showDatepicker09 = () => {
    setShow09(true);
  };
  const showDatepicker10 = () => {
    setShow10(true);
  };
  const showDatepicker11 = () => {
    setShow11(true);
  };
  const showDatepicker12 = () => {
    setShow12(true);
  };
  const showDatepicker13 = () => {
    setShow13(true);
  };
  const showDatepicker14 = () => {
    setShow14(true);
  };
  const showDatepicker15 = () => {
    setShow15(true);
  };
  const showDatepicker16 = () => {
    setShow16(true);
  };
  const onPressClose = () => {
    setShow(false);
    setShow01(false);
    setShow02(false);
    setShow03(false);
    setShow04(false);
    setShow05(false);
    setShow06(false);
    setShow07(false);
    setShow08(false);
    setShow09(false);
    setShow10(false);
    setShow11(false);
    setShow12(false);
    setShow13(false);
    setShow14(false);
    setShow15(false);
    setShow16(false);
  };

  // 誕生日から年齢算出
  const calcAge = () => {
    const dateTo = dayjs(currentBirthday.toString(), "YYYYMMDD");
    const dateFrom = dayjs();
    const baseAge = dateFrom.year() - dateTo.year();
    const thisBirthday = dayjs(`${dateFrom.year()}-${dateTo.month() + 1}-${dateTo.date()}`);
    const nowAge = Number(dateFrom.isBefore(thisBirthday) ? baseAge - 1 : baseAge);
    currentAge = nowAge;
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
                    calcAge();
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
      <LevelForm
        label="参段"
        visiblePassed={show05}
        visibleExam={show06}
        showDatepickerPassed={showDatepicker05}
        showDatepickerExam={showDatepicker06}
        currentPassedDateText={currentPassedDate03}
        currentExamDateText={currentExamDate03}
        passedDateValue={dayjs(currentPassedDate03.toString(), "YYYYMMDD").toDate()}
        onChangePassed={(event, date1) => {
          if (date1) {
            const passed03 = Number(dayjs(date1).format("YYYYMMDD"));
            onChangePassedDate03(passed03);
          }
        }}
        examDateValue={dayjs(currentExamDate03.toString(), "YYYYMMDD").toDate()}
        onChangeExam={(event, date2) => {
          if (date2) {
            const exam03 = Number(dayjs(date2).format("YYYYMMDD"));
            onChangeExamDate03(exam03);
          }
        }}
        onPressClose={onPressClose}
      />

      <LevelForm
        label="四段"
        visiblePassed={show07}
        visibleExam={show08}
        showDatepickerPassed={showDatepicker07}
        showDatepickerExam={showDatepicker08}
        currentPassedDateText={currentPassedDate04}
        currentExamDateText={currentExamDate04}
        passedDateValue={dayjs(currentPassedDate04.toString(), "YYYYMMDD").toDate()}
        onChangePassed={(event, date1) => {
          if (date1) {
            const passed04 = Number(dayjs(date1).format("YYYYMMDD"));
            onChangePassedDate04(passed04);
          }
        }}
        examDateValue={dayjs(currentExamDate04.toString(), "YYYYMMDD").toDate()}
        onChangeExam={(event, date2) => {
          if (date2) {
            const exam04 = Number(dayjs(date2).format("YYYYMMDD"));
            onChangeExamDate04(exam04);
          }
        }}
        onPressClose={onPressClose}
      />

      <LevelForm
        label="五段"
        visiblePassed={show09}
        visibleExam={show10}
        showDatepickerPassed={showDatepicker09}
        showDatepickerExam={showDatepicker10}
        currentPassedDateText={currentPassedDate05}
        currentExamDateText={currentExamDate05}
        passedDateValue={dayjs(currentPassedDate05.toString(), "YYYYMMDD").toDate()}
        onChangePassed={(event, date1) => {
          if (date1) {
            const passed05 = Number(dayjs(date1).format("YYYYMMDD"));
            onChangePassedDate05(passed05);
          }
        }}
        examDateValue={dayjs(currentExamDate05.toString(), "YYYYMMDD").toDate()}
        onChangeExam={(event, date2) => {
          if (date2) {
            const exam05 = Number(dayjs(date2).format("YYYYMMDD"));
            onChangeExamDate05(exam05);
          }
        }}
        onPressClose={onPressClose}
      />

      <LevelForm
        label="六段"
        visiblePassed={show11}
        visibleExam={show12}
        showDatepickerPassed={showDatepicker11}
        showDatepickerExam={showDatepicker12}
        currentPassedDateText={currentPassedDate06}
        currentExamDateText={currentExamDate06}
        passedDateValue={dayjs(currentPassedDate06.toString(), "YYYYMMDD").toDate()}
        onChangePassed={(event, date1) => {
          if (date1) {
            const passed06 = Number(dayjs(date1).format("YYYYMMDD"));
            onChangePassedDate06(passed06);
          }
        }}
        examDateValue={dayjs(currentExamDate06.toString(), "YYYYMMDD").toDate()}
        onChangeExam={(event, date2) => {
          if (date2) {
            const exam06 = Number(dayjs(date2).format("YYYYMMDD"));
            onChangeExamDate06(exam06);
          }
        }}
        onPressClose={onPressClose}
      />

      <LevelForm
        label="七段"
        visiblePassed={show13}
        visibleExam={show14}
        showDatepickerPassed={showDatepicker13}
        showDatepickerExam={showDatepicker14}
        currentPassedDateText={currentPassedDate07}
        currentExamDateText={currentExamDate07}
        passedDateValue={dayjs(currentPassedDate07.toString(), "YYYYMMDD").toDate()}
        onChangePassed={(event, date1) => {
          if (date1) {
            const passed07 = Number(dayjs(date1).format("YYYYMMDD"));
            onChangePassedDate07(passed07);
          }
        }}
        examDateValue={dayjs(currentExamDate07.toString(), "YYYYMMDD").toDate()}
        onChangeExam={(event, date2) => {
          if (date2) {
            const exam07 = Number(dayjs(date2).format("YYYYMMDD"));
            onChangeExamDate07(exam07);
          }
        }}
        onPressClose={onPressClose}
      />

      <LevelForm
        label="八段"
        visiblePassed={show15}
        visibleExam={show16}
        showDatepickerPassed={showDatepicker15}
        showDatepickerExam={showDatepicker16}
        currentPassedDateText={currentPassedDate08}
        currentExamDateText={currentExamDate08}
        passedDateValue={dayjs(currentPassedDate08.toString(), "YYYYMMDD").toDate()}
        onChangePassed={(event, date1) => {
          if (date1) {
            const passed08 = Number(dayjs(date1).format("YYYYMMDD"));
            onChangePassedDate08(passed08);
          }
        }}
        examDateValue={dayjs(currentExamDate08.toString(), "YYYYMMDD").toDate()}
        onChangeExam={(event, date2) => {
          if (date2) {
            const exam08 = Number(dayjs(date2).format("YYYYMMDD"));
            onChangeExamDate08(exam08);
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

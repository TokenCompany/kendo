import React, { useState, useEffect } from "react";
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
    currentPassedDate09,
    currentPassedDate10,
    currentExamDate01,
    currentExamDate02,
    currentExamDate03,
    currentExamDate04,
    currentExamDate05,
    currentExamDate06,
    currentExamDate07,
    currentExamDate08,
    currentExamDate09,
    currentExamDate10,
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
    onChangePassedDate09,
    onChangePassedDate10,
    onChangeExamDate01,
    onChangeExamDate02,
    onChangeExamDate03,
    onChangeExamDate04,
    onChangeExamDate05,
    onChangeExamDate06,
    onChangeExamDate07,
    onChangeExamDate08,
    onChangeExamDate09,
    onChangeExamDate10,
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
  const [show17, setShow17] = useState<boolean>(false);
  const [show18, setShow18] = useState<boolean>(false);
  const [show19, setShow19] = useState<boolean>(false);
  const [show20, setShow20] = useState<boolean>(false);

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
  const showDatepicker17 = () => {
    setShow17(true);
  };
  const showDatepicker18 = () => {
    setShow18(true);
  };
  const showDatepicker19 = () => {
    setShow19(true);
  };
  const showDatepicker20 = () => {
    setShow20(true);
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
    setShow17(false);
    setShow18(false);
    setShow19(false);
    setShow20(false);
  };

  // 年齢が14歳以上なら合格日審査日を入力できる
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (currentAge > 14) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  });

  // 練士、教士の表示
  const [openRenshi, setOpenRenshi] = useState<boolean>(false);
  const [openKyoushi, setOpenKyoushi] = useState<boolean>(false);

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
                    // 誕生日から年齢算出
                    const dateBirthday = dayjs(currentBirthday.toString(), "YYYYMMDD");
                    const dateToday = dayjs();
                    const baseAge = dateToday.year() - dateBirthday.year();
                    const thisBirthday = dayjs(
                      `${dateToday.year()}-${dateBirthday.month() + 1}-${dateBirthday.date()}`,
                    );
                    const nowAge = Number(dateToday.isBefore(thisBirthday) ? baseAge - 1 : baseAge);
                    currentAge = nowAge;
                    onChangeAge(nowAge);
                  }
                }}
              />
              <TouchableOpacity style={styles.modalButton} onPress={() => onPressClose()}>
                <Text style={styles.textStyle}>×</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <View>
            <Text style={styles.label}>年齢</Text>
            <Text style={styles.input}>{String(currentAge)}</Text>
          </View>
          <TextForm label="全剣連番号" value={currentKenNumber} onChangeText={onChangeKenNumber} />
        </View>
        <Image style={styles.profileImage} source={require("../../assets/images/profile.png")} />
      </View>

      {open && (
        <View>
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
                setOpenRenshi(true);
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
                setOpenKyoushi(true);
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
        </View>
      )}
      {openRenshi && (
        <View>
          <LevelForm
            label="錬士"
            visiblePassed={show17}
            visibleExam={show18}
            showDatepickerPassed={showDatepicker17}
            showDatepickerExam={showDatepicker18}
            currentPassedDateText={currentPassedDate09}
            currentExamDateText={currentExamDate09}
            passedDateValue={dayjs(currentPassedDate09.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              if (date1) {
                const passed09 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate09(passed09);
              }
            }}
            examDateValue={dayjs(currentExamDate09.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              if (date2) {
                const exam09 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate09(exam09);
              }
            }}
            onPressClose={onPressClose}
          />
        </View>
      )}
      {openKyoushi && (
        <View>
          <LevelForm
            label="錬士"
            visiblePassed={show19}
            visibleExam={show20}
            showDatepickerPassed={showDatepicker19}
            showDatepickerExam={showDatepicker20}
            currentPassedDateText={currentPassedDate10}
            currentExamDateText={currentExamDate10}
            passedDateValue={dayjs(currentPassedDate10.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              if (date1) {
                const passed10 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate10(passed10);
              }
            }}
            examDateValue={dayjs(currentExamDate10.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              if (date2) {
                const exam10 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate10(exam10);
              }
            }}
            onPressClose={onPressClose}
          />
        </View>
      )}
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
  label: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 10,
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { TextForm } from "../components/TextForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";
import { LevelForm } from "../components/LevelForm";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import profileSlice from "../store/profileSlice";

type Props = NativeStackScreenProps<MainStackParamList, "ProfileEdit">;

export const ProfileEditScreen: React.FC<Props> = ({ navigation }: Props) => {
  // useProfileFormというカスタムフックにフォーム編集に関わるロジックを分離しています
  let {
    currentName,
    currentBirthday,
    currentAge,
    currentKenNumber,
    currentPassedDate00,
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
    currentExamDate00,
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
    currentImage,
    onChangeName,
    onChangeBirthday,
    onChangePassedDate00,
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
    onChangeExamDate00,
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
    onChangeImage,
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
  const [show21, setShow21] = useState<boolean>(false);
  const [show22, setShow22] = useState<boolean>(false);

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
  const showDatepicker21 = () => {
    setShow21(true);
  };
  const showDatepicker22 = () => {
    setShow22(true);
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
    setShow21(false);
    setShow22(false);
  };

  // プロフィール登録ボタン
  // navigation.navigate("Setting");が効かない状態です（何もプロフィールに変更がない場合は効く）
  const onSetting = () => {
    navigation.navigate("Setting");
    onPressSave();
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

  // 練士、教士、範士の表示
  const [openRenshi, setOpenRenshi] = useState<boolean>(false);
  const [openHanshi, setOpenHanshi] = useState<boolean>(false);
  useEffect(() => {
    if (currentPassedDate05 !== 19900000) {
      setOpenRenshi(true);
      setOpenHanshi(true);
    } else {
      setOpenRenshi(false);
      setOpenHanshi(false);
    }
  });
  const [openKyoushi, setOpenKyoushi] = useState<boolean>(false);
  useEffect(() => {
    if (currentPassedDate06 !== 19900000) {
      setOpenKyoushi(true);
    } else {
      setOpenKyoushi(false);
    }
  });

  // 日付表示変換
  const renderChangeText = (date: number) => {
    let originDate = date.toString().split("");
    let changeText = "";
    originDate.forEach((element, index) => {
      if (index == 4) {
        changeText += "/";
      } else if (index == 6) {
        changeText += "/";
      }
      changeText += element;
    });
    return changeText;
  };

  const [image, setImage] = useState(currentImage);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.base64);
      onChangeImage(result.base64);
    }
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
            <Text style={styles.birthdayText}>{renderChangeText(currentBirthday)}</Text>
          </View>
          {Platform.OS === "ios" && (
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
                      const dateBirthday = dayjs(birthday.toString(), "YYYYMMDD");
                      const dateToday = dayjs();
                      const baseAge = dateToday.year() - dateBirthday.year();
                      const thisBirthday = dayjs(
                        `${dateToday.year()}-${dateBirthday.month() + 1}-${dateBirthday.date()}`,
                      );
                      currentAge = Number(dateToday.isBefore(thisBirthday) ? baseAge - 1 : baseAge);
                      onChangeAge(currentAge);
                    }
                  }}
                />
                <TouchableOpacity style={styles.modalButton} onPress={() => onPressClose()}>
                  <Text style={styles.textStyle}>×</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          )}
          {Platform.OS === "android" && (
            <View>
              {show && (
                <DateTimePicker
                  value={dayjs(currentBirthday.toString(), "YYYYMMDD").toDate()}
                  mode="date"
                  display={"default"}
                  onChange={(event, date) => {
                    if (date) {
                      setShow(false);
                      const birthday = Number(dayjs(date).format("YYYYMMDD"));
                      onChangeBirthday(birthday);

                      // 誕生日から年齢算出
                      const dateBirthday = dayjs(birthday.toString(), "YYYYMMDD");

                      const dateToday = dayjs();

                      const baseAge = dateToday.year() - dateBirthday.year();

                      const thisBirthday = dayjs(
                        `${dateToday.year()}-${dateBirthday.month() + 1}-${dateBirthday.date()}`,
                      );
                      const nowAge = Number(
                        dateToday.isBefore(thisBirthday) ? baseAge - 1 : baseAge,
                      );
                      onChangeAge(nowAge);
                      currentAge = nowAge;
                    }
                  }}
                />
              )}
            </View>
          )}
          <View>
            <Text style={styles.label}>年齢</Text>
            <Text style={styles.input}>{String(currentAge)}</Text>
          </View>
          <TextForm label="全剣連番号" value={currentKenNumber} onChangeText={onChangeKenNumber} />
        </View>
        <TouchableOpacity style={styles.profileImage} onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: "data:image/jpeg;base64," + image }}
              style={styles.profileImageImg}
            />
          ) : (
            <Image
              style={styles.profileImageImg}
              source={require("../../assets/images/profile.png")}
            />
          )}
        </TouchableOpacity>
      </View>

      {open && (
        <View>
          <LevelForm
            label="初段"
            visiblePassed={show01}
            visibleExam={show02}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker01}
            showDatepickerExam={showDatepicker02}
            currentPassedDateText={renderChangeText(currentPassedDate00)}
            currentExamDateText={renderChangeText(currentExamDate00)}
            passedDateValue={dayjs(currentPassedDate00.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow01(false);

              if (date1) {
                const passed0 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate00(passed0);
              }
            }}
            examDateValue={dayjs(currentExamDate00.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow02(false);

              if (date2) {
                const exam0 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate00(exam0);
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label="弐段"
            visiblePassed={show03}
            visibleExam={show04}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker03}
            showDatepickerExam={showDatepicker04}
            currentPassedDateText={renderChangeText(currentPassedDate01)}
            currentExamDateText={renderChangeText(currentExamDate01)}
            passedDateValue={dayjs(currentPassedDate01.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow03(false);
              if (date1) {
                const passed1 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate01(passed1);
              }
            }}
            examDateValue={dayjs(currentExamDate01.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow04(false);
              if (date2) {
                const exam1 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate01(exam1);
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label="参段"
            visiblePassed={show05}
            visibleExam={show06}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker05}
            showDatepickerExam={showDatepicker06}
            currentPassedDateText={renderChangeText(currentPassedDate02)}
            currentExamDateText={renderChangeText(currentExamDate02)}
            passedDateValue={dayjs(currentPassedDate02.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow05(false);
              if (date1) {
                const passed2 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate02(passed2);
              }
            }}
            examDateValue={dayjs(currentExamDate02.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow06(false);
              if (date2) {
                const exam2 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate02(exam2);
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label="四段"
            visiblePassed={show07}
            visibleExam={show08}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker07}
            showDatepickerExam={showDatepicker08}
            currentPassedDateText={renderChangeText(currentPassedDate03)}
            currentExamDateText={renderChangeText(currentExamDate03)}
            passedDateValue={dayjs(currentPassedDate03.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow07(false);
              if (date1) {
                const passed3 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate03(passed3);
              }
            }}
            examDateValue={dayjs(currentExamDate03.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow08(false);
              if (date2) {
                const exam3 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate03(exam3);
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label="五段"
            visiblePassed={show09}
            visibleExam={show10}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker09}
            showDatepickerExam={showDatepicker10}
            currentPassedDateText={renderChangeText(currentPassedDate04)}
            currentExamDateText={renderChangeText(currentExamDate04)}
            passedDateValue={dayjs(currentPassedDate04.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow09(false);
              if (date1) {
                const passed4 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate04(passed4);
              }
            }}
            examDateValue={dayjs(currentExamDate04.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow10(false);
              if (date2) {
                const exam4 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate04(exam4);
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label="六段"
            visiblePassed={show11}
            visibleExam={show12}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker11}
            showDatepickerExam={showDatepicker12}
            currentPassedDateText={renderChangeText(currentPassedDate05)}
            currentExamDateText={renderChangeText(currentExamDate05)}
            passedDateValue={dayjs(currentPassedDate05.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow11(false);
              if (date1) {
                const passed5 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate05(passed5);
              }
            }}
            examDateValue={dayjs(currentExamDate05.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow12(false);
              if (date2) {
                const exam5 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate05(exam5);
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label="七段"
            visiblePassed={show13}
            visibleExam={show14}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker13}
            showDatepickerExam={showDatepicker14}
            currentPassedDateText={renderChangeText(currentPassedDate06)}
            currentExamDateText={renderChangeText(currentExamDate06)}
            passedDateValue={dayjs(currentPassedDate06.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow13(false);
              if (date1) {
                const passed6 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate06(passed6);
              }
            }}
            examDateValue={dayjs(currentExamDate06.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow14(false);
              if (date2) {
                const exam6 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate06(exam6);
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label="八段"
            visiblePassed={show15}
            visibleExam={show16}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker15}
            showDatepickerExam={showDatepicker16}
            currentPassedDateText={renderChangeText(currentPassedDate07)}
            currentExamDateText={renderChangeText(currentExamDate07)}
            passedDateValue={dayjs(currentPassedDate07.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow15(false);
              if (date1) {
                const passed7 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate07(passed7);
              }
            }}
            examDateValue={dayjs(currentExamDate07.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow16(false);
              if (date2) {
                const exam7 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate07(exam7);
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
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker17}
            showDatepickerExam={showDatepicker18}
            currentPassedDateText={renderChangeText(currentPassedDate08)}
            currentExamDateText={renderChangeText(currentExamDate08)}
            passedDateValue={dayjs(currentPassedDate08.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow17(false);
              if (date1) {
                const passed8 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate08(passed8);
              }
            }}
            examDateValue={dayjs(currentExamDate08.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow18(false);
              if (date2) {
                const exam8 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate08(exam8);
              }
            }}
            onPressClose={onPressClose}
          />
        </View>
      )}
      {openKyoushi && (
        <View>
          <LevelForm
            label="教士"
            visiblePassed={show19}
            visibleExam={show20}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker19}
            showDatepickerExam={showDatepicker20}
            currentPassedDateText={renderChangeText(currentPassedDate09)}
            currentExamDateText={renderChangeText(currentExamDate09)}
            passedDateValue={dayjs(currentPassedDate09.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow19(false);
              if (date1) {
                const passed9 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate09(passed9);
              }
            }}
            examDateValue={dayjs(currentExamDate09.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow20(false);
              if (date2) {
                const exam9 = Number(dayjs(date2).format("YYYYMMDD"));
                onChangeExamDate09(exam9);
              }
            }}
            onPressClose={onPressClose}
          />
        </View>
      )}
      {openHanshi && (
        <View>
          <LevelForm
            label="範士"
            visiblePassed={show21}
            visibleExam={show22}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker21}
            showDatepickerExam={showDatepicker22}
            currentPassedDateText={renderChangeText(currentPassedDate10)}
            currentExamDateText={renderChangeText(currentExamDate10)}
            passedDateValue={dayjs(currentPassedDate10.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow21(false);
              if (date1) {
                const passed10 = Number(dayjs(date1).format("YYYYMMDD"));
                onChangePassedDate10(passed10);
              }
            }}
            examDateValue={dayjs(currentExamDate10.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow22(false);
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
        <Button text="プロフィール登録" onPress={onSetting} />
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
    fontSize: 12,
    fontWeight: "bold",
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
    width: 80,
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
    paddingHorizontal: 3,
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
  profileImageImg: {
    width: 100,
    height: 100,
  },
});

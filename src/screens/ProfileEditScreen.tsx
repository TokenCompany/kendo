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
  Alert
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { ProfileTextForm } from "../components/ProfileTextForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";
import { LevelForm } from "../components/LevelForm";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import i18n from "../lang/localization";

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
  const [openKyoushi, setOpenKyoushi] = useState<boolean>(false);
  const [openHanshi, setOpenHanshi] = useState<boolean>(false);
  useEffect(() => {
    if (currentPassedDate05 !== 19900000) {
      setOpenRenshi(true);
      setOpenHanshi(true);
    }

    if(currentPassedDate06 !== 19900000) {
      setOpenKyoushi(true);
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

  // プロフィール画像登録
  const [image, setImage] = useState<string>(currentImage);
  const pickImage = async () => {
    let resultImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0,
      base64: true,
    });

    if (!resultImage.cancelled) {
      setImage(String(resultImage.base64));
      onChangeImage(String(resultImage.base64));
    }
  };

  const pickCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      let resultCamera = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0,
        base64: true,
      });
      if (!resultCamera.cancelled) {
        setImage(String(resultCamera.base64));
        onChangeImage(String(resultCamera.base64));
      }
    }
  }

  const optionCamera = () => {
    Alert.alert(`${i18n.t("ProfileEdit.howToSetting")}`, "", [
      {
        text: `${i18n.t("ProfileEdit.album")}`,
        onPress: () => pickImage()
      },
      {
        text: `${i18n.t("ProfileEdit.camera")}`,
        onPress: () => pickCamera(),
      },
    ]);
  };

  //誕生日（date型）
  const calcCurrentBirthday = dayjs(currentBirthday.toString(),"YYYYMMDD").toDate()

  // 審査日が14歳未満でないか確認年
  const ageCheck = (date: Date) => {
    const dateBirthday = dayjs(calcCurrentBirthday.toString(), "YYYYMMDD");
    const examDate = dayjs(date);
    const baseAge = examDate.year() - dateBirthday.year();
    const thisBirthday = dayjs(
      `${examDate.year()}-${dateBirthday.month() + 1}-${dateBirthday.date()}`,
    );
    const examDateAge = Number(examDate.isBefore(thisBirthday) ? baseAge - 1 : baseAge);
    return examDateAge
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileContainer}>
        <View style={styles.profileBody}>
          <ProfileTextForm label={i18n.t("ProfileEdit.name")} value={currentName} onChangeText={onChangeName} />
          <View style={styles.birthdayInput}>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              <Text style={styles.buttonText}>{i18n.t("ProfileEdit.birthday")}</Text>
            </TouchableOpacity>
            <Text style={styles.birthdayText}>{renderChangeText(currentBirthday) !== "1990/00/00" ? renderChangeText(currentBirthday) : ""}</Text>
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
                  locale={i18n.t("Lang.lang")}
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
                  locale={i18n.t("Lang.lang")}
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
            <Text style={styles.label}>{i18n.t("ProfileEdit.age")}</Text>
            <Text style={styles.input}>{String(currentAge) != "0" ? String(currentAge) : ""}</Text>
          </View>
          <ProfileTextForm label={i18n.t("ProfileEdit.number")} value={currentKenNumber} onChangeText={onChangeKenNumber} />
        </View>
        <TouchableOpacity style={styles.profileImage} onPress={optionCamera}>
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
            label={i18n.t("ProfileEdit.stage01")}
            visiblePassed={show01}
            visibleExam={show02}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker01}
            showDatepickerExam={showDatepicker02}
            currentPassedDateText={renderChangeText(currentPassedDate00) !== "1990/00/00" ? renderChangeText(currentPassedDate00) : ""}
            currentExamDateText={renderChangeText(currentExamDate00) !== "1990/00/00" ? renderChangeText(currentExamDate00) : ""}
            passedDateValue={dayjs(currentPassedDate00.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow01(false);
                // 14歳未満の合格は制限
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow01(false);
              } else {
                if (date1) {
                  const passed0 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed0.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 14 || passed0 - currentExamDate00 < 0 || dayjs(calcPassed).diff(dayjs()) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate00(passed0);
                  }
                }
              }
            }}

            examDateValue={dayjs(currentExamDate00.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow02(false);
              // 14歳未満の合格は制限
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow02(false);
              } else {
                if (date2) {
                  const exam0 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 14){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate00(exam0);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />

          <LevelForm
            label={i18n.t("ProfileEdit.stage02")}
            visiblePassed={show03}
            visibleExam={show04}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker03}
            showDatepickerExam={showDatepicker04}
            currentPassedDateText={renderChangeText(currentPassedDate01) !== "1990/00/00" ? renderChangeText(currentPassedDate01) : ""}
            currentExamDateText={renderChangeText(currentExamDate01) !== "1990/00/00" ? renderChangeText(currentExamDate01) : ""}
            passedDateValue={dayjs(currentPassedDate01.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow03(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow03(false);
              } else {
                if (date1) {
                  const passed1 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed1.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 15 || passed1 - currentExamDate01 < 0 || dayjs(calcPassed).diff(dayjs(),) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate01(passed1);
                  }
                }
              }
            }}
            examDateValue={dayjs(currentExamDate01.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow04(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow04(false);
              } else {
                if (date2) {
                  const exam1 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 15){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate01(exam1);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label={i18n.t("ProfileEdit.stage03")}
            visiblePassed={show05}
            visibleExam={show06}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker05}
            showDatepickerExam={showDatepicker06}
            currentPassedDateText={renderChangeText(currentPassedDate02) !== "1990/00/00" ? renderChangeText(currentPassedDate02) : ""}
            currentExamDateText={renderChangeText(currentExamDate02) !== "1990/00/00" ? renderChangeText(currentExamDate02) : ""}
            passedDateValue={dayjs(currentPassedDate02.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow05(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow05(false);
              } else {
                if (date1) {
                  const passed2 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed2.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 17 || passed2 - currentExamDate02 < 0 || dayjs(calcPassed).diff(dayjs(),) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate02(passed2);
                  }
                }
              }
            }}
            examDateValue={dayjs(currentExamDate02.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow06(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow06(false);
              } else {
                if (date2) {
                  const exam2 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 17){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate02(exam2);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label={i18n.t("ProfileEdit.stage04")}
            visiblePassed={show07}
            visibleExam={show08}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker07}
            showDatepickerExam={showDatepicker08}
            currentPassedDateText={renderChangeText(currentPassedDate03) !== "1990/00/00" ? renderChangeText(currentPassedDate03) : ""}
            currentExamDateText={renderChangeText(currentExamDate03) !== "1990/00/00" ? renderChangeText(currentExamDate03) : ""}
            passedDateValue={dayjs(currentPassedDate03.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow07(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow07(false);
              } else {
                if (date1) {
                  const passed3 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed3.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 20 || passed3 - currentExamDate03 < 0 || dayjs(calcPassed).diff(dayjs(),) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate03(passed3);
                  }
                }
              }
            }}
            examDateValue={dayjs(currentExamDate03.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow08(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow08(false);
              } else {
                if (date2) {
                  const exam3 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 20){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate03(exam3);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label={i18n.t("ProfileEdit.stage05")}
            visiblePassed={show09}
            visibleExam={show10}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker09}
            showDatepickerExam={showDatepicker10}
            currentPassedDateText={renderChangeText(currentPassedDate04) !== "1990/00/00" ? renderChangeText(currentPassedDate04) : ""}
            currentExamDateText={renderChangeText(currentExamDate04) !== "1990/00/00" ? renderChangeText(currentExamDate04) : ""}
            passedDateValue={dayjs(currentPassedDate04.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow09(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow09(false);
              } else {
                if (date1) {
                  const passed4 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed4.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 24 || passed4 - currentExamDate04 < 0 || dayjs(calcPassed).diff(dayjs(),) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate04(passed4);
                  }
                }
              }
            }}
            examDateValue={dayjs(currentExamDate04.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow10(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow10(false);
              } else {
                if (date2) {
                  const exam4 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 24){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate04(exam4);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label={i18n.t("ProfileEdit.stage06")}
            visiblePassed={show11}
            visibleExam={show12}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker11}
            showDatepickerExam={showDatepicker12}
            currentPassedDateText={renderChangeText(currentPassedDate05) !== "1990/00/00" ? renderChangeText(currentPassedDate05) : ""}
            currentExamDateText={renderChangeText(currentExamDate05) !== "1990/00/00" ? renderChangeText(currentExamDate05) : ""}
            passedDateValue={dayjs(currentPassedDate05.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow11(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow11(false);
              } else {
                if (date1) {
                  const passed5 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed5.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 29 || passed5 - currentExamDate05 < 0 || dayjs(calcPassed).diff(dayjs(),) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate05(passed5);
                  }
                }
              }

            }}
            examDateValue={dayjs(currentExamDate05.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow12(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow12(false);
              } else {
                if (date2) {
                  const exam5 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 29){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate05(exam5);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label={i18n.t("ProfileEdit.stage07")}
            visiblePassed={show13}
            visibleExam={show14}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker13}
            showDatepickerExam={showDatepicker14}
            currentPassedDateText={renderChangeText(currentPassedDate06) !== "1990/00/00" ? renderChangeText(currentPassedDate06) : ""}
            currentExamDateText={renderChangeText(currentExamDate06) !== "1990/00/00" ? renderChangeText(currentExamDate06) : ""}
            passedDateValue={dayjs(currentPassedDate06.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow13(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow13(false);
              } else {
                if (date1) {
                  const passed6 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed6.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 35 || passed6 - currentExamDate06 < 0 || dayjs(calcPassed).diff(dayjs(),) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate06(passed6);
                  }
                }
              }
            }}
            examDateValue={dayjs(currentExamDate06.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow14(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow14(false);
              } else {
                if (date2) {
                  const exam6 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 35){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate06(exam6);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />
          <LevelForm
            label={i18n.t("ProfileEdit.stage08")}
            visiblePassed={show15}
            visibleExam={show16}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker15}
            showDatepickerExam={showDatepicker16}
            currentPassedDateText={renderChangeText(currentPassedDate07) !== "1990/00/00" ? renderChangeText(currentPassedDate07) : ""}
            currentExamDateText={renderChangeText(currentExamDate07) !== "1990/00/00" ? renderChangeText(currentExamDate07) : ""}
            passedDateValue={dayjs(currentPassedDate07.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow15(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow15(false);
              } else {
                if (date1) {
                  const passed7 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed7.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 45 || passed7 - currentExamDate07 < 0 || dayjs(calcPassed).diff(dayjs(),) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate07(passed7);
                  }
                }
              }
            }}
            examDateValue={dayjs(currentExamDate07.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow16(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow16(false);
              } else {
                if (date2) {
                  const exam7 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 45){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate07(exam7);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />
        </View>
      )}
      {openRenshi && (
        <View>
          <LevelForm
            label={i18n.t("ProfileEdit.stage09")}
            visiblePassed={show17}
            visibleExam={show18}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker17}
            showDatepickerExam={showDatepicker18}
            currentPassedDateText={renderChangeText(currentPassedDate08) !== "1990/00/00" ? renderChangeText(currentPassedDate08) : ""}
            currentExamDateText={renderChangeText(currentExamDate08) !== "1990/00/00" ? renderChangeText(currentExamDate08) : ""}
            passedDateValue={dayjs(currentPassedDate08.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow17(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow17(false);
              } else {
                if (date1) {
                  const passed8 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed8.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 30 || passed8 - currentExamDate08 < 0 || dayjs(calcPassed).diff(dayjs(),) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate08(passed8);
                  }
                }
              }
            }}
            examDateValue={dayjs(currentExamDate08.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow18(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow18(false);
              } else {
                if (date2) {
                  const exam8 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 30){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate08(exam8);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />
        </View>
      )}
      {openKyoushi && (
        <View>
          <LevelForm
            label={i18n.t("ProfileEdit.stage10")}
            visiblePassed={show19}
            visibleExam={show20}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker19}
            showDatepickerExam={showDatepicker20}
            currentPassedDateText={renderChangeText(currentPassedDate09) !== "1990/00/00" ? renderChangeText(currentPassedDate09) : ""}
            currentExamDateText={renderChangeText(currentExamDate09) !== "1990/00/00" ? renderChangeText(currentExamDate09) : ""}
            passedDateValue={dayjs(currentPassedDate09.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow19(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow19(false);
              } else {
                if (date1) {
                  const passed9 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed9.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 37 || passed9 - currentExamDate09 < 0 || dayjs(calcPassed).diff(dayjs(),) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate09(passed9);
                  }
                }
              }
            }}
            examDateValue={dayjs(currentExamDate09.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow20(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow20(false);
              } else {
                if (date2) {
                  const exam9 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 37){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate09(exam9);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />
        </View>
      )}
      {openHanshi && (
        <View>
          <LevelForm
            label={i18n.t("ProfileEdit.stage11")}
            visiblePassed={show21}
            visibleExam={show22}
            closePassed={onPressClose}
            closeExam={onPressClose}
            showDatepickerPassed={showDatepicker21}
            showDatepickerExam={showDatepicker22}
            currentPassedDateText={renderChangeText(currentPassedDate10) !== "1990/00/00" ? renderChangeText(currentPassedDate10) : ""}
            currentExamDateText={renderChangeText(currentExamDate10) !== "1990/00/00" ? renderChangeText(currentExamDate10) : ""}
            passedDateValue={dayjs(currentPassedDate10.toString(), "YYYYMMDD").toDate()}
            onChangePassed={(event, date1) => {
              Platform.OS === "android" && setShow21(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow21(false);
              } else {
                if (date1) {
                  const passed10 = Number(dayjs(date1).format("YYYYMMDD"));
                  const calcPassed = dayjs(passed10.toString(),"YYYYMMDD").toDate()
                  if(ageCheck(date1) < 29 || passed10 - currentExamDate10 < 0 || dayjs(calcPassed).diff(dayjs(),) > 0){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangePassedDate10(passed10);
                  }
                }
              }
            }}
            examDateValue={dayjs(currentExamDate10.toString(), "YYYYMMDD").toDate()}
            onChangeExam={(event, date2) => {
              Platform.OS === "android" && setShow22(false);
              if(event.type == "dismissed") {
                Platform.OS === "android" && setShow22(false);
              } else {
                if (date2) {
                  const exam10 = Number(dayjs(date2).format("YYYYMMDD"));
                  if(ageCheck(date2) < 29){
                    Alert.alert(`${i18n.t("ProfileEdit.alert1")}`, "", [
                      {
                        text: `${i18n.t("TaskEdit.ok")}`,
                      }
                    ]);
                  }else{
                    onChangeExamDate10(exam10);
                  }
                }
              }
            }}
            onPressClose={onPressClose}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button text={i18n.t("ProfileEdit.registerButton")} onPress={onSetting} />
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
    backgroundColor: "gray",
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

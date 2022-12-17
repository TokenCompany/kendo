import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Modal } from "react-native";
import { useFonts } from "expo-font";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";
import * as Notifications from "expo-notifications";
type Props = NativeStackScreenProps<MainStackParamList, "Init">;

export const InitScreen: React.FC<Props> = ({ navigation }: Props) => {
  useEffect(() => {
    requestPermissionsAsync();
  })
  const requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) { return }
  }
  const profile: any = useSelector((state: RootState) => state.profile);
  const [fontsLoaded] = useFonts({
    KouzanGyousho: require("../../assets/fonts/KouzanGyoushoOTF.otf"),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [onPressJudge, setOnPressJudge] = useState(false);

  const { currentLang, onChangeLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;

  let time: any;
  const onPress = (time: any) => {
    setOnPressJudge(true);
    setModalVisible(true);

    time = setTimeout(() => {
      onPressClose(time);
    }, 5000);
  };

  useEffect(() => {
    if (!modalVisible && onPressJudge) {
      navigation.navigate("Menu");
    }
  }, [modalVisible, navigation, onPressJudge]);

  const onPressClose = (time?: any) => {
    setModalVisible(false);
    clearTimeout(time);
  };

  const initText = useSelector((state: RootState) => state.initText.initText);
  const splitText = initText.split("");
  const task = useSelector((state: RootState) => state.profile.task);
  interface keyType {
    [key: string]: Function;
  }
  // 審査日オブジェクト抽出
  const examObject1 = () => {
    let object = {} as keyType;
    Object.keys(profile).forEach((key) => {
      if (key.indexOf("exam") !== -1) {
        object[key] = profile[key];
      }
    });
    return object;
  };
  const onlyExamObject = examObject1();

  // 審査日が今日以降のものを抽出
  const examObject2 = () => {
    let object = {} as keyType;
    Object.keys(onlyExamObject).some((key) => {
      object[key] = profile[key];
      if (profile[key] >= dayjs().format("YYYYMMDD").toString()) {
        return true;
      }
    });
    return object;
  };
  const onlyExamSchedule = examObject2();

  // 合格済の中で最も後のものを抽出
  const passedObject3 = () => {
    let object = {} as keyType;
    Object.keys(onlyExamSchedule).filter((key, index) => {
      if (index == Object.keys(onlyExamSchedule).length - 1) {
        object[key] = onlyExamSchedule[key];
      }
    });
    return object;
  };
  const onlyExamScheduleLast = passedObject3();

  // 段数を表示
  const renderLevel = () => {
    if (Object.keys(onlyExamSchedule).length <= 10) {
      if (Object.keys(onlyExamScheduleLast) === ["exam0"]) {
        return i18n.t("ProfileEdit.stage01");
      } else if (Object.keys(onlyExamScheduleLast).toString() === "exam1") {
        return i18n.t("ProfileEdit.stage02");
      } else if (Object.keys(onlyExamScheduleLast).toString() === "exam2") {
        return i18n.t("ProfileEdit.stage03");
      } else if (Object.keys(onlyExamScheduleLast).toString() === "exam3") {
        return i18n.t("ProfileEdit.stage04");
      } else if (Object.keys(onlyExamScheduleLast).toString() === "exam4") {
        return i18n.t("ProfileEdit.stage05");
      } else if (Object.keys(onlyExamScheduleLast).toString() === "exam5") {
        return i18n.t("ProfileEdit.stage06");
      } else if (Object.keys(onlyExamScheduleLast).toString() === "exam6") {
        return i18n.t("ProfileEdit.stage07");
      } else if (Object.keys(onlyExamScheduleLast).toString() === "exam7") {
        return i18n.t("ProfileEdit.stage08");
      } else if (Object.keys(onlyExamScheduleLast).toString() === "exam8") {
        return i18n.t("ProfileEdit.stage09");
      } else if (Object.keys(onlyExamScheduleLast).toString() === "exam9") {
        return i18n.t("ProfileEdit.stage010");
      } else {
        return i18n.t("ProfileEdit.stage11");
      }
    } else {
      return i18n.t("ProfileEdit.stage01");
    }
  };

  // 審査日までの残り日数
  let profileExam = () => {
    if (profile.exam0 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam0;
    } else if (profile.exam1 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam1;
    } else if (profile.exam2 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam2;
    } else if (profile.exam3 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam3;
    } else if (profile.exam4 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam4;
    } else if (profile.exam5 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam5;
    } else if (profile.exam6 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam6;
    } else if (profile.exam7 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam7;
    } else if (profile.exam8 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam8;
    } else if (profile.exam9 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam9;
    } else if (profile.exam10 >= Number(dayjs().format("YYYYMMDD"))) {
      return profile.exam10;
    }
  };

  const renderExamDate = (exam?: number) => {
    const today = dayjs().format("YYYYMMDD");
    const examDay = String(exam);
    const diffDate = dayjs(examDay).diff(today, "day");
    return diffDate;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {fontsLoaded ? (
        <View>
          {splitText.map((data,index) => {
            return (
              <Text key={index} style={styles.text}>
                {data}
              </Text>
            );
          })}
        </View>
      ) : (
        <ActivityIndicator size={"large"} />
      )}
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            navigation.navigate("Menu");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalLead}>{i18n.t("Modal.task")}</Text>
              <Text style={styles.modalText}>{profile.task ? profile.task : "-"}</Text>
              <Text style={styles.modalLead}>
                {renderLevel()}
                {i18n.t("Modal.stage")}
              </Text>
              <Text style={styles.modalText}>
                {renderExamDate(profileExam()) >= 0 ? renderExamDate(profileExam()) : "-"}
                {i18n.t("Modal.day")}
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => onPressClose()}
              >
                <Text style={styles.textStyle}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "KouzanGyousho",
    fontSize: 64,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    borderRadius: 5,
    padding: 7,
    width: 30,
    elevation: 2,
    position: "absolute",
    top: 15,
    right: 15,
  },
  modalView: {
    position: "relative",
    margin: 20,
    backgroundColor: "#31538f",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#fff",
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalLead: {
    color: "yellow",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 10,
    textAlign: "center",
  },
  modalText: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
  },
});

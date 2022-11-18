import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Modal } from "react-native";
import { useFonts } from "expo-font";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import i18n from "../lang/localization";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

type Props = NativeStackScreenProps<MainStackParamList, "Init">;

export const InitScreen: React.FC<Props> = ({ navigation }: Props) => {
  const profile = useSelector((state: RootState) => state.profile);
  const [fontsLoaded] = useFonts({
    KouzanGyousho: require("../../assets/fonts/KouzanGyoushoOTF.otf"),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [onPressJudge, setOnPressJudge] = useState(false);

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
  });

  const onPressClose = (time: any) => {
    setModalVisible(false);
    clearTimeout(time);
  };

  const initText = useSelector((state: RootState) => state.initText.initText);
  const splitText = initText.split("");
  const task = useSelector((state: RootState) => state.profile.task);

  // 段数を表示
  const renderLevel = () => {
    if (profile.passed1 === 19900000) {
      return <Text>初段</Text>;
    } else if (profile.passed2 === 19900000) {
      return <Text>弐段</Text>;
    } else if (profile.passed3 === 19900000) {
      return <Text>参段</Text>;
    } else if (profile.passed4 === 19900000) {
      return <Text>四段</Text>;
    } else if (profile.passed5 === 19900000) {
      return <Text>五段</Text>;
    } else if (profile.passed6 === 19900000) {
      return <Text>六段</Text>;
    } else if (profile.passed7 === 19900000) {
      return <Text>七段</Text>;
    } else if (profile.passed8 === 19900000) {
      return <Text>八段</Text>;
    } else if (profile.passed9 === 19900000) {
      return <Text>錬士</Text>;
    } else if (profile.passed10 === 19900000) {
      return <Text>教士</Text>;
    } else {
      return <Text>初段</Text>;
    }
  };

  // 審査日までの残り日数
  let profileExam = () => {
    if (profile.passed1 === 19900000) {
      return profile.exam1;
    } else if (profile.passed2 === 19900000) {
      return profile.exam2;
    } else if (profile.passed3 === 19900000) {
      return profile.exam3;
    } else if (profile.passed4 === 19900000) {
      return profile.exam4;
    } else if (profile.passed5 === 19900000) {
      return profile.exam5;
    } else if (profile.passed6 === 19900000) {
      return profile.exam6;
    } else if (profile.passed7 === 19900000) {
      return profile.exam7;
    } else if (profile.passed8 === 19900000) {
      return profile.exam8;
    } else if (profile.passed9 === 19900000) {
      return profile.exam9;
    } else if (profile.passed10 === 19900000) {
      return profile.exam10;
    }
  };

  const renderExamDate = (exam: number) => {
    const examDate = exam;
    const today = Number(dayjs().format("YYYYMMDD"));
    let diffDate = (examDate - today) / 27.397263;
    let diffRoundDate = Math.round(diffDate);
    return diffRoundDate;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {fontsLoaded ? (
        <View>
          {splitText.map((data) => {
            return (
              <Text key={data} style={styles.text}>
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
                {renderExamDate(profileExam()) !== -11721 ? renderExamDate(profileExam()) : "-"}
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
  buttonOpen: {
    backgroundColor: "#F194FF",
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

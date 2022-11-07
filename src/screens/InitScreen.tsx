import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Modal } from "react-native";
import { useFonts } from "expo-font";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import i18n from "../lang/localization";

type Props = NativeStackScreenProps<MainStackParamList, "Init">;

export const InitScreen: React.FC<Props> = ({ navigation }: Props) => {
  const [fontsLoaded] = useFonts({
    KouzanGyousho: require("../../assets/fonts/KouzanGyoushoOTF.otf"),
  });
  const [modalVisible, setModalVisible] = useState(false);
  const onPress = () => {
    setModalVisible(true);
  };
  const hiddenModal = () => {
    setModalVisible(!modalVisible);
  };
  const onPressMenu = () => {
    navigation.navigate("Menu");
    setModalVisible(!modalVisible);
    setTimeout(hiddenModal, 5000);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {fontsLoaded ? (
        <View>
          <Text style={styles.text}>八</Text>
          <Text style={styles.text}>段</Text>
          <Text style={styles.text}>へ</Text>
          <Text style={styles.text}>の</Text>
          <Text style={styles.text}>道</Text>
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
              <Text style={styles.modalText}>-</Text>
              <Text style={styles.modalLead}>初段{i18n.t("Modal.stage")}</Text>
              <Text style={styles.modalText}>-{i18n.t("Modal.day")}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => onPressMenu()}
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

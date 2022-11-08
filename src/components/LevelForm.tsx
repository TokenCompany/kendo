import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Modal, TouchableOpacity } from "react-native";
import DateTimePicker, { AndroidNativeProps } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

type Props = {
  label: string;
  value: number;
  // onChangePassingDay: (text: string) => void;
  // onChangeExamDay: (text: string) => void;
};

export const LevelForm: React.FC<Props> = ({
  label,
  value,
  // onChangePassingDay,
  // onChangeExamDay,
}) => {
  const [currentPassedDate, setCurrentPassedDate] = useState<number>();
  const [currentExamDate, setCurrentExamDate] = useState<number>();
  const [show, setShow] = useState<boolean>(false);
  const showDatepicker = () => {
    setShow(true);
  };
  const onPressClose = () => {
    setShow(false);
  };
  return (
    <View style={styles.levelContainer}>
      <Text style={styles.levelLavel}>{label}</Text>
      <View style={styles.displayRow}>
        <Text style={styles.dayLavel}>合格日</Text>
        <View>
          <View style={styles.dayInput}>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              <Text style={styles.buttonText}>設定</Text>
            </TouchableOpacity>
            <Text style={styles.dayText}>{currentPassedDate}</Text>
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
                value={new Date(20220101)}
                mode="date"
                display={"spinner"}
                onChange={(event, passedDate) => {
                  if (passedDate) {
                    const setPassedDate = Number(dayjs(passedDate).format("YYYYMMDD"));
                    setCurrentPassedDate(setPassedDate);
                  }
                }}
              />
              <TouchableOpacity style={styles.modalButton} onPress={() => onPressClose()}>
                <Text style={styles.textStyle}>×</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
      <View style={styles.displayRow}>
        <Text style={styles.dayLavel}>審査日</Text>
        <View>
          <View style={styles.dayInput}>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              <Text style={styles.buttonText}>設定</Text>
            </TouchableOpacity>
            <Text style={styles.dayText}>{currentExamDate}</Text>
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
                value={new Date(20220101)}
                mode="date"
                display={"spinner"}
                onChange={(event, examDate) => {
                  if (examDate) {
                    const setExamDate = Number(dayjs(examDate).format("YYYYMMDD"));
                    setCurrentExamDate(setExamDate);
                  }
                }}
              />
              <TouchableOpacity style={styles.modalButton} onPress={() => onPressClose()}>
                <Text style={styles.textStyle}>×</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  levelContainer: {
    marginTop: 30,
  },
  levelLavel: {
    fontSize: 18,
    color: "#000",
  },
  displayRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  dayLavel: {
    fontSize: 18,
    marginRight: 10,
  },
  dayInput: {
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
    height: 40,
    backgroundColor: "#a53010",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
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
  dayText: {
    fontSize: 18,
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingLeft: 5,
    paddingRight: "60%",
    marginLeft: 10,
    height: 40,
    width: 60,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
});

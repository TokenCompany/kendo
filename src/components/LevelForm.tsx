import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

type Props = {
  label: string;
  currentPassedDateText: any;
  currentExamDateText: any;
  passedDateValue: any;
  examDateValue: any;
  onChangePassed: (event: DateTimePickerEvent, date1?: Date) => void;
  onChangeExam: (event: DateTimePickerEvent, date2?: Date) => void;
};

export const LevelForm: React.FC<Props> = ({
  label,
  currentPassedDateText,
  currentExamDateText,
  passedDateValue,
  examDateValue,
  onChangePassed,
  onChangeExam,
}) => {
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
            <Text style={styles.dayText}>{currentPassedDateText}</Text>
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
                value={passedDateValue}
                mode="date"
                display={"spinner"}
                onChange={onChangePassed}
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
            <Text style={styles.dayText}>{currentExamDateText}</Text>
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
                value={examDateValue}
                mode="date"
                display={"spinner"}
                onChange={onChangeExam}
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
    paddingRight: "40%",
    marginLeft: 10,
    height: 40,
    width: 60,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
});

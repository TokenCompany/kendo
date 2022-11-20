import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

type Props = {
  label: string;
  currentPassedDateText: string;
  currentExamDateText: string;
  passedDateValue: Date;
  examDateValue: Date;
  onChangePassed: (event: DateTimePickerEvent, date1?: Date) => void;
  onChangeExam: (event: DateTimePickerEvent, date2?: Date) => void;
  showDatepickerPassed: () => void;
  showDatepickerExam: () => void;
  visiblePassed: boolean;
  visibleExam: boolean;
  onPressClose: () => void;
};

export const LevelForm: React.FC<Props> = ({
  label,
  currentPassedDateText,
  currentExamDateText,
  passedDateValue,
  examDateValue,
  onChangePassed,
  onChangeExam,
  visiblePassed,
  visibleExam,
  showDatepickerPassed,
  showDatepickerExam,
  onPressClose,
}) => {
  return (
    <View style={styles.levelContainer}>
      <Text style={styles.levelLavel}>{label}</Text>
      <View style={styles.displayRow}>
        <Text style={styles.dayLavel}>合格日</Text>
        <View>
          <View style={styles.dayInput}>
            <TouchableOpacity style={styles.button} onPress={showDatepickerPassed}>
              <Text style={styles.buttonText}>設定</Text>
            </TouchableOpacity>
            <View style={styles.dayTextWrap}>
              <Text style={styles.dayText}>{currentPassedDateText}</Text>
            </View>
          </View>
          <Modal
            animationType="fade"
            visible={visiblePassed}
            transparent={true}
            onRequestClose={() => {}}
          >
            {Platform.OS === "ios" && (
              <View style={styles.modalView}>
                <DateTimePicker
                  value={passedDateValue}
                  mode="date"
                  display={"spinner"}
                  onChange={onChangePassed}
                />
                <TouchableOpacity style={styles.modalButton} onPress={onPressClose}>
                  <Text style={styles.textStyle}>×</Text>
                </TouchableOpacity>
              </View>
            )}
            {Platform.OS === "android" && (
              <DateTimePicker
                value={passedDateValue}
                mode="date"
                display={"default"}
                onChange={onChangePassed}
              />
            )}
          </Modal>
        </View>
      </View>
      <View style={styles.displayRow}>
        <Text style={styles.dayLavel}>審査日</Text>
        <View>
          <View style={styles.dayInput}>
            <TouchableOpacity style={styles.button} onPress={showDatepickerExam}>
              <Text style={styles.buttonText}>設定</Text>
            </TouchableOpacity>
            <View style={styles.dayTextWrap}>
              <Text style={styles.dayText}>{currentExamDateText}</Text>
            </View>
          </View>
          <Modal
            animationType="fade"
            visible={visibleExam}
            transparent={true}
            onRequestClose={() => {}}
          >
            {Platform.OS === "ios" && (
              <View style={styles.modalView}>
                <DateTimePicker
                  value={examDateValue}
                  mode="date"
                  display={"spinner"}
                  onChange={onChangeExam}
                />
                <TouchableOpacity style={styles.modalButton} onPress={onPressClose}>
                  <Text style={styles.textStyle}>×</Text>
                </TouchableOpacity>
              </View>
            )}
            {Platform.OS === "android" && (
              <DateTimePicker
                value={passedDateValue}
                mode="date"
                display={"default"}
                onChange={onChangePassed}
              />
            )}
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
    width: 200,
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
    elevation: 999,
  },
  dayTextWrap: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingLeft: 5,
    width: 145,
    marginLeft: 10,
    height: 40,
  },
  dayText: {
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
});

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { TextForm } from "../components/TextForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";
import { LevelForm } from "../components/LevelForm";
import DateTimePicker, { AndroidNativeProps } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<MainStackParamList, "ProfileEdit">;

export const ProfileEditScreen: React.FC<Props> = ({}: Props) => {
  // useProfileFormというカスタムフックにフォーム編集に関わるロジックを分離しています
  const {
    currentName,
    currentBirthday,
    currentAge,
    currentKenNumber,
    current1st,
    onChangeName,
    onChangeBirthday,
    onChangeAge,
    onChangeKenNumber,
    onChangePassingDay1st,
    onChangeExamDay1st,
    onPressSave,
  } = useProfileForm();
  // useStateで型を指定しておく
  // なにも指定しないと初期値"date"から推論してstring型になってしまう
  const [show, setShow] = useState(false);
  const showDatepicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = () => {
    hideDatePicker();
  };

  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(true);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.base64);
      setVisible(!visible);
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
            <Text style={styles.birthdayText}>{currentBirthday}</Text>
            {show && (
              <DateTimePicker
                onCancel={hideDatePicker}
                onConfirm={handleConfirm}
                testID="dateTimePicker"
                value={dayjs(currentBirthday.toString(), "YYYYMMDD").toDate()}
                mode="date"
                onChange={(event, date) => {
                  if (date) {
                    const birthday = Number(dayjs(date).format("YYYYMMDD"));
                    onChangeBirthday(birthday);
                  }
                }}
              />
            )}
          </View>
          <TextForm label="年齢" value={currentAge} onChangeText={onChangeAge} />
          <TextForm label="全剣連番号" value={currentKenNumber} onChangeText={onChangeKenNumber} />
        </View>
        <TouchableOpacity style={styles.profileImage} onPress={pickImage}>
          {visible && (
            <Image
              style={styles.profileImageImg}
              source={require("../../assets/images/profile.png")}
            />
          )}
          {image && (
            <Image
              source={{ uri: "data:image/jpeg;base64," + image }}
              style={styles.profileImageImg}
            />
          )}
        </TouchableOpacity>
      </View>

      <LevelForm
        label="初段"
        value={current1st}
        onChangePassingDay={onChangePassingDay1st}
        onChangeExamDay={onChangeExamDay1st}
      />
      <LevelForm
        label="弐段"
        value={current1st}
        onChangePassingDay={onChangePassingDay1st}
        onChangeExamDay={onChangeExamDay1st}
      />
      <LevelForm
        label="参段"
        value={current1st}
        onChangePassingDay={onChangePassingDay1st}
        onChangeExamDay={onChangeExamDay1st}
      />
      <LevelForm
        label="四段"
        value={current1st}
        onChangePassingDay={onChangePassingDay1st}
        onChangeExamDay={onChangeExamDay1st}
      />
      <LevelForm
        label="五段"
        value={current1st}
        onChangePassingDay={onChangePassingDay1st}
        onChangeExamDay={onChangeExamDay1st}
      />
      <LevelForm
        label="六段"
        value={current1st}
        onChangePassingDay={onChangePassingDay1st}
        onChangeExamDay={onChangeExamDay1st}
      />
      <LevelForm
        label="七段"
        value={current1st}
        onChangePassingDay={onChangePassingDay1st}
        onChangeExamDay={onChangeExamDay1st}
      />
      <LevelForm
        label="八段"
        value={current1st}
        onChangePassingDay={onChangePassingDay1st}
        onChangeExamDay={onChangeExamDay1st}
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
  profileImageImg: {
    width: 100,
    height: 100,
  },
});

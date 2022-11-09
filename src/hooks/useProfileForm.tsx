import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setName } from "../store/profileSlice";
import { setAge } from "../store/profileSlice";
import { setKenNumber } from "../store/profileSlice";
import { setBirthday } from "../store/profileSlice";
import { setPassed01 } from "../store/profileSlice";
import { setPassed02 } from "../store/profileSlice";
import { setExam01 } from "../store/profileSlice";
import { setExam02 } from "../store/profileSlice";

type Hooks = {
  currentName: string;
  onChangeName: (text: string) => void;
  currentAge: string;
  onChangeAge: (text: string) => void;
  currentKenNumber: string;
  onChangeKenNumber: (text: string) => void;
  currentBirthday: number;
  onChangeBirthday: (data: number) => void;
  currentPassedDate01: number;
  currentPassedDate02: number;
  onChangePassedDate01: (passed01: number) => void;
  onChangePassedDate02: (passed02: number) => void;
  currentExamDate01: number;
  currentExamDate02: number;
  onChangeExamDate01: (exam01: number) => void;
  onChangeExamDate02: (exam02: number) => void;
  onPressSave: () => void;
};

export const useProfileForm = (): Hooks => {
  const dispatch = useDispatch();
  // 氏名
  // useSelectorでreduxから状態を取得します
  // nameはreduxに永続化された氏名です
  const name = useSelector((state: RootState) => state.profile.name);
  const age = useSelector((state: RootState) => state.profile.age);
  const kenNumber = useSelector((state: RootState) => state.profile.kenNumber);
  const birthday = useSelector((state: RootState) => state.profile.birthday);
  const passed01 = useSelector((state: RootState) => state.profile.passed01);
  const passed02 = useSelector((state: RootState) => state.profile.passed02);
  const exam01 = useSelector((state: RootState) => state.profile.exam01);
  const exam02 = useSelector((state: RootState) => state.profile.exam02);
  // currentNameをフォームに渡して表示します
  // フォームに文字を入力するとsetCurrentNameが呼ばれてcurrentNameを更新します
  // useStateの初期値にnameを入れることで,端末に永続化された氏名をフォーム初期値にします
  const [currentName, setCurrentName] = useState<string>(name);
  const [currentAge, setCurrentAge] = useState<string>(age);
  const [currentKenNumber, setCurrentKenNumber] = useState<string>(kenNumber);
  const [currentBirthday, setCurrentBirthday] = useState<number>(birthday);
  const [currentPassedDate01, setCurrentPassedDate01] = useState<number>(passed01);
  const [currentPassedDate02, setCurrentPassedDate02] = useState<number>(passed02);
  const [currentExamDate01, setCurrentExamDate01] = useState<number>(exam01);
  const [currentExamDate02, setCurrentExamDate02] = useState<number>(exam02);

  // フォームの文字が変更されたときに呼ばれます
  const onChangeName = (text: string) => {
    setCurrentName(text);
  };
  const onChangeAge = (text: string) => {
    setCurrentAge(text);
  };
  const onChangeKenNumber = (text: string) => {
    setCurrentKenNumber(text);
  };
  const onChangeBirthday = (data: number) => {
    setCurrentBirthday(data);
  };
  const onChangePassedDate01 = (passed01: number) => {
    setCurrentPassedDate01(passed01);
  };
  const onChangePassedDate02 = (passed02: number) => {
    setCurrentPassedDate02(passed02);
  };
  const onChangeExamDate01 = (exam01: number) => {
    setCurrentExamDate01(exam01);
  };
  const onChangeExamDate02 = (exam02: number) => {
    setCurrentExamDate02(exam02);
  };

  // ”登録"ボタンを押したときに呼ばれます
  // dispatchでreduxの状態を更新します
  const onPressSave = () => {
    dispatch(setName(currentName));
    dispatch(setAge(currentAge));
    dispatch(setKenNumber(currentKenNumber));
    dispatch(setBirthday(currentBirthday));
    dispatch(setPassed01(currentPassedDate01));
    dispatch(setPassed02(currentPassedDate02));
    dispatch(setExam01(currentExamDate01));
    dispatch(setExam02(currentExamDate02));
  };

  return {
    currentName,
    currentAge,
    currentKenNumber,
    currentBirthday,
    currentPassedDate01,
    currentPassedDate02,
    currentExamDate01,
    currentExamDate02,
    onChangeName,
    onChangeAge,
    onChangeKenNumber,
    onChangeBirthday,
    onChangePassedDate01,
    onChangePassedDate02,
    onChangeExamDate01,
    onChangeExamDate02,
    onPressSave,
  };
};

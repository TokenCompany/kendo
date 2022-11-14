import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setName } from "../store/profileSlice";
import { setAge } from "../store/profileSlice";
import { setKenNumber } from "../store/profileSlice";
import { setBirthday } from "../store/profileSlice";
import { setPassed01 } from "../store/profileSlice";
import { setPassed02 } from "../store/profileSlice";
import { setPassed03 } from "../store/profileSlice";
import { setPassed04 } from "../store/profileSlice";
import { setPassed05 } from "../store/profileSlice";
import { setPassed06 } from "../store/profileSlice";
import { setPassed07 } from "../store/profileSlice";
import { setPassed08 } from "../store/profileSlice";
import { setExam01 } from "../store/profileSlice";
import { setExam02 } from "../store/profileSlice";
import { setExam03 } from "../store/profileSlice";
import { setExam04 } from "../store/profileSlice";
import { setExam05 } from "../store/profileSlice";
import { setExam06 } from "../store/profileSlice";
import { setExam07 } from "../store/profileSlice";
import { setExam08 } from "../store/profileSlice";

type Hooks = {
  currentName: string;
  onChangeName: (text: string) => void;
  currentAge: number;
  onChangeAge: (text: number) => void;
  currentKenNumber: string;
  onChangeKenNumber: (text: string) => void;
  currentBirthday: number;
  onChangeBirthday: (data: number) => void;
  currentPassedDate01: number;
  currentPassedDate02: number;
  currentPassedDate03: number;
  currentPassedDate04: number;
  currentPassedDate05: number;
  currentPassedDate06: number;
  currentPassedDate07: number;
  currentPassedDate08: number;
  onChangePassedDate01: (passed01: number) => void;
  onChangePassedDate02: (passed02: number) => void;
  onChangePassedDate03: (passed03: number) => void;
  onChangePassedDate04: (passed04: number) => void;
  onChangePassedDate05: (passed05: number) => void;
  onChangePassedDate06: (passed06: number) => void;
  onChangePassedDate07: (passed07: number) => void;
  onChangePassedDate08: (passed08: number) => void;
  currentExamDate01: number;
  currentExamDate02: number;
  currentExamDate03: number;
  currentExamDate04: number;
  currentExamDate05: number;
  currentExamDate06: number;
  currentExamDate07: number;
  currentExamDate08: number;
  onChangeExamDate01: (exam01: number) => void;
  onChangeExamDate02: (exam02: number) => void;
  onChangeExamDate03: (exam03: number) => void;
  onChangeExamDate04: (exam04: number) => void;
  onChangeExamDate05: (exam05: number) => void;
  onChangeExamDate06: (exam06: number) => void;
  onChangeExamDate07: (exam07: number) => void;
  onChangeExamDate08: (exam08: number) => void;
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
  const passed03 = useSelector((state: RootState) => state.profile.passed03);
  const passed04 = useSelector((state: RootState) => state.profile.passed04);
  const passed05 = useSelector((state: RootState) => state.profile.passed05);
  const passed06 = useSelector((state: RootState) => state.profile.passed06);
  const passed07 = useSelector((state: RootState) => state.profile.passed07);
  const passed08 = useSelector((state: RootState) => state.profile.passed08);
  const exam01 = useSelector((state: RootState) => state.profile.exam01);
  const exam02 = useSelector((state: RootState) => state.profile.exam02);
  const exam03 = useSelector((state: RootState) => state.profile.exam03);
  const exam04 = useSelector((state: RootState) => state.profile.exam04);
  const exam05 = useSelector((state: RootState) => state.profile.exam05);
  const exam06 = useSelector((state: RootState) => state.profile.exam06);
  const exam07 = useSelector((state: RootState) => state.profile.exam07);
  const exam08 = useSelector((state: RootState) => state.profile.exam08);
  // currentNameをフォームに渡して表示します
  // フォームに文字を入力するとsetCurrentNameが呼ばれてcurrentNameを更新します
  // useStateの初期値にnameを入れることで,端末に永続化された氏名をフォーム初期値にします
  const [currentName, setCurrentName] = useState<string>(name);
  let [currentAge, setCurrentAge] = useState<number>(age);
  const [currentKenNumber, setCurrentKenNumber] = useState<string>(kenNumber);
  const [currentBirthday, setCurrentBirthday] = useState<number>(birthday);
  const [currentPassedDate01, setCurrentPassedDate01] = useState<number>(passed01);
  const [currentPassedDate02, setCurrentPassedDate02] = useState<number>(passed02);
  const [currentPassedDate03, setCurrentPassedDate03] = useState<number>(passed03);
  const [currentPassedDate04, setCurrentPassedDate04] = useState<number>(passed04);
  const [currentPassedDate05, setCurrentPassedDate05] = useState<number>(passed05);
  const [currentPassedDate06, setCurrentPassedDate06] = useState<number>(passed06);
  const [currentPassedDate07, setCurrentPassedDate07] = useState<number>(passed07);
  const [currentPassedDate08, setCurrentPassedDate08] = useState<number>(passed08);
  const [currentExamDate01, setCurrentExamDate01] = useState<number>(exam01);
  const [currentExamDate02, setCurrentExamDate02] = useState<number>(exam02);
  const [currentExamDate03, setCurrentExamDate03] = useState<number>(exam03);
  const [currentExamDate04, setCurrentExamDate04] = useState<number>(exam04);
  const [currentExamDate05, setCurrentExamDate05] = useState<number>(exam05);
  const [currentExamDate06, setCurrentExamDate06] = useState<number>(exam06);
  const [currentExamDate07, setCurrentExamDate07] = useState<number>(exam07);
  const [currentExamDate08, setCurrentExamDate08] = useState<number>(exam08);

  // フォームの文字が変更されたときに呼ばれます
  const onChangeName = (text: string) => {
    setCurrentName(text);
  };
  const onChangeAge = (text: number) => {
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
    setCurrentExamDate02(passed01 + 10000);
    setCurrentExamDate03(passed01 + 20000);
    setCurrentExamDate04(passed01 + 30000);
    setCurrentExamDate05(passed01 + 40000);
    setCurrentExamDate06(passed01 + 50000);
    setCurrentExamDate07(passed01 + 60000);
    setCurrentExamDate08(Math.max(passed01 + 100000, currentBirthday + 460000));
  };
  const onChangePassedDate02 = (passed02: number) => {
    setCurrentPassedDate02(passed02);
  };
  const onChangePassedDate03 = (passed03: number) => {
    setCurrentPassedDate03(passed03);
  };
  const onChangePassedDate04 = (passed04: number) => {
    setCurrentPassedDate04(passed04);
  };
  const onChangePassedDate05 = (passed05: number) => {
    setCurrentPassedDate05(passed05);
  };
  const onChangePassedDate06 = (passed06: number) => {
    setCurrentPassedDate06(passed06);
  };
  const onChangePassedDate07 = (passed07: number) => {
    setCurrentPassedDate07(passed07);
  };
  const onChangePassedDate08 = (passed08: number) => {
    setCurrentPassedDate08(passed08);
  };
  const onChangeExamDate01 = (exam01: number) => {
    setCurrentExamDate01(exam01);
  };
  const onChangeExamDate02 = (exam02: number) => {
    setCurrentExamDate02(exam02);
  };
  const onChangeExamDate03 = (exam03: number) => {
    setCurrentExamDate03(exam03);
  };
  const onChangeExamDate04 = (exam04: number) => {
    setCurrentExamDate04(exam04);
  };
  const onChangeExamDate05 = (exam05: number) => {
    setCurrentExamDate05(exam05);
  };
  const onChangeExamDate06 = (exam06: number) => {
    setCurrentExamDate06(exam06);
  };
  const onChangeExamDate07 = (exam07: number) => {
    setCurrentExamDate07(exam07);
  };
  const onChangeExamDate08 = (exam08: number) => {
    setCurrentExamDate08(exam08);
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
    dispatch(setPassed03(currentPassedDate03));
    dispatch(setPassed04(currentPassedDate04));
    dispatch(setPassed05(currentPassedDate05));
    dispatch(setPassed06(currentPassedDate06));
    dispatch(setPassed07(currentPassedDate07));
    dispatch(setPassed08(currentPassedDate08));
    dispatch(setExam01(currentExamDate01));
    dispatch(setExam02(currentExamDate02));
    dispatch(setExam03(currentExamDate03));
    dispatch(setExam04(currentExamDate04));
    dispatch(setExam05(currentExamDate05));
    dispatch(setExam06(currentExamDate06));
    dispatch(setExam07(currentExamDate07));
    dispatch(setExam08(currentExamDate08));
  };

  return {
    currentName,
    currentAge,
    currentKenNumber,
    currentBirthday,
    currentPassedDate01,
    currentPassedDate02,
    currentPassedDate03,
    currentPassedDate04,
    currentPassedDate05,
    currentPassedDate06,
    currentPassedDate07,
    currentPassedDate08,
    currentExamDate01,
    currentExamDate02,
    currentExamDate03,
    currentExamDate04,
    currentExamDate05,
    currentExamDate06,
    currentExamDate07,
    currentExamDate08,
    onChangeName,
    onChangeAge,
    onChangeKenNumber,
    onChangeBirthday,
    onChangePassedDate01,
    onChangePassedDate02,
    onChangePassedDate03,
    onChangePassedDate04,
    onChangePassedDate05,
    onChangePassedDate06,
    onChangePassedDate07,
    onChangePassedDate08,
    onChangeExamDate01,
    onChangeExamDate02,
    onChangeExamDate03,
    onChangeExamDate04,
    onChangeExamDate05,
    onChangeExamDate06,
    onChangeExamDate07,
    onChangeExamDate08,
    onPressSave,
  };
};

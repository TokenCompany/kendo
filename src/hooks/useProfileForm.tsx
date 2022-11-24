import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setName } from "../store/profileSlice";
import { setAge } from "../store/profileSlice";
import { setKenNumber } from "../store/profileSlice";
import { setBirthday } from "../store/profileSlice";
import { setProfileImage } from "../store/profileSlice";
import { setTask } from "../store/profileSlice";
import { setpassed0 } from "../store/profileSlice";
import { setpassed1 } from "../store/profileSlice";
import { setpassed2 } from "../store/profileSlice";
import { setpassed3 } from "../store/profileSlice";
import { setpassed4 } from "../store/profileSlice";
import { setpassed5 } from "../store/profileSlice";
import { setpassed6 } from "../store/profileSlice";
import { setpassed7 } from "../store/profileSlice";
import { setpassed8 } from "../store/profileSlice";
import { setpassed9 } from "../store/profileSlice";
import { setpassed10 } from "../store/profileSlice";
import { setexam0 } from "../store/profileSlice";
import { setexam1 } from "../store/profileSlice";
import { setexam2 } from "../store/profileSlice";
import { setexam3 } from "../store/profileSlice";
import { setexam4 } from "../store/profileSlice";
import { setexam5 } from "../store/profileSlice";
import { setexam6 } from "../store/profileSlice";
import { setexam7 } from "../store/profileSlice";
import { setexam8 } from "../store/profileSlice";
import { setexam9 } from "../store/profileSlice";
import { setexam10 } from "../store/profileSlice";

type Hooks = {
  currentName: string;
  onChangeName: (text: string) => void;
  currentAge: number;
  onChangeAge: (text: number) => void;
  currentKenNumber: string;
  onChangeKenNumber: (text: string) => void;
  currentBirthday: number;
  onChangeBirthday: (date: number) => void;
  onPressSaveTask: () => void;
  onPressDeleteTask: () => void;
  currentImage: string;
  onChangeImage: (text: string) => void;
  currentTask: string;
  onChangeTask: (text: string) => void;
  currentPassedDate00: number;
  currentPassedDate01: number;
  currentPassedDate02: number;
  currentPassedDate03: number;
  currentPassedDate04: number;
  currentPassedDate05: number;
  currentPassedDate06: number;
  currentPassedDate07: number;
  currentPassedDate08: number;
  currentPassedDate09: number;
  currentPassedDate10: number;
  onChangePassedDate00: (passed0: number) => void;
  onChangePassedDate01: (passed1: number) => void;
  onChangePassedDate02: (passed2: number) => void;
  onChangePassedDate03: (passed3: number) => void;
  onChangePassedDate04: (passed4: number) => void;
  onChangePassedDate05: (passed5: number) => void;
  onChangePassedDate06: (passed6: number) => void;
  onChangePassedDate07: (passed7: number) => void;
  onChangePassedDate08: (passed8: number) => void;
  onChangePassedDate09: (passed9: number) => void;
  onChangePassedDate10: (passed10: number) => void;
  currentExamDate00: number;
  currentExamDate01: number;
  currentExamDate02: number;
  currentExamDate03: number;
  currentExamDate04: number;
  currentExamDate05: number;
  currentExamDate06: number;
  currentExamDate07: number;
  currentExamDate08: number;
  currentExamDate09: number;
  currentExamDate10: number;
  onChangeExamDate00: (exam0: number) => void;
  onChangeExamDate01: (exam1: number) => void;
  onChangeExamDate02: (exam2: number) => void;
  onChangeExamDate03: (exam3: number) => void;
  onChangeExamDate04: (exam4: number) => void;
  onChangeExamDate05: (exam5: number) => void;
  onChangeExamDate06: (exam6: number) => void;
  onChangeExamDate07: (exam7: number) => void;
  onChangeExamDate08: (exam8: number) => void;
  onChangeExamDate09: (exam9: number) => void;
  onChangeExamDate10: (exam10: number) => void;
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
  const image = useSelector((state: RootState) => state.profile.profileImage);
  const task = useSelector((state: RootState) => state.profile.task);
  const passed0 = useSelector((state: RootState) => state.profile.passed0);
  const passed1 = useSelector((state: RootState) => state.profile.passed1);
  const passed2 = useSelector((state: RootState) => state.profile.passed2);
  const passed3 = useSelector((state: RootState) => state.profile.passed3);
  const passed4 = useSelector((state: RootState) => state.profile.passed4);
  const passed5 = useSelector((state: RootState) => state.profile.passed5);
  const passed6 = useSelector((state: RootState) => state.profile.passed6);
  const passed7 = useSelector((state: RootState) => state.profile.passed7);
  const passed8 = useSelector((state: RootState) => state.profile.passed8);
  const passed9 = useSelector((state: RootState) => state.profile.passed9);
  const passed10 = useSelector((state: RootState) => state.profile.passed10);
  const exam0 = useSelector((state: RootState) => state.profile.exam0);
  const exam1 = useSelector((state: RootState) => state.profile.exam1);
  const exam2 = useSelector((state: RootState) => state.profile.exam2);
  const exam3 = useSelector((state: RootState) => state.profile.exam3);
  const exam4 = useSelector((state: RootState) => state.profile.exam4);
  const exam5 = useSelector((state: RootState) => state.profile.exam5);
  const exam6 = useSelector((state: RootState) => state.profile.exam6);
  const exam7 = useSelector((state: RootState) => state.profile.exam7);
  const exam8 = useSelector((state: RootState) => state.profile.exam8);
  const exam9 = useSelector((state: RootState) => state.profile.exam9);
  const exam10 = useSelector((state: RootState) => state.profile.exam10);

  // currentNameは編集中の一時的な氏名です
  // currentNameをフォームに渡して表示します
  // フォームに文字を入力するとsetCurrentNameが呼ばれてcurrentNameを更新します
  // useStateの初期値にnameを入れることで,端末に永続化された氏名をフォーム初期値にします
  const [currentName, setCurrentName] = useState<string>(name);
  let [currentAge, setCurrentAge] = useState<number>(age);
  const [currentKenNumber, setCurrentKenNumber] = useState<string>(kenNumber);
  const [currentBirthday, setCurrentBirthday] = useState<number>(birthday);
  const [currentPassedDate00, setCurrentPassedDate00] = useState<number>(passed0);
  const [currentPassedDate01, setCurrentPassedDate01] = useState<number>(passed1);
  const [currentPassedDate02, setCurrentPassedDate02] = useState<number>(passed2);
  const [currentPassedDate03, setCurrentPassedDate03] = useState<number>(passed3);
  const [currentPassedDate04, setCurrentPassedDate04] = useState<number>(passed4);
  const [currentPassedDate05, setCurrentPassedDate05] = useState<number>(passed5);
  const [currentPassedDate06, setCurrentPassedDate06] = useState<number>(passed6);
  const [currentPassedDate07, setCurrentPassedDate07] = useState<number>(passed7);
  const [currentPassedDate08, setCurrentPassedDate08] = useState<number>(passed8);
  const [currentPassedDate09, setCurrentPassedDate09] = useState<number>(passed9);
  const [currentPassedDate10, setCurrentPassedDate10] = useState<number>(passed10);
  const [currentExamDate00, setCurrentExamDate00] = useState<number>(exam0);
  const [currentExamDate01, setCurrentExamDate01] = useState<number>(exam1);
  const [currentExamDate02, setCurrentExamDate02] = useState<number>(exam2);
  const [currentExamDate03, setCurrentExamDate03] = useState<number>(exam3);
  const [currentExamDate04, setCurrentExamDate04] = useState<number>(exam4);
  const [currentExamDate05, setCurrentExamDate05] = useState<number>(exam5);
  const [currentExamDate06, setCurrentExamDate06] = useState<number>(exam6);
  const [currentExamDate07, setCurrentExamDate07] = useState<number>(exam7);
  const [currentExamDate08, setCurrentExamDate08] = useState<number>(exam8);
  const [currentExamDate09, setCurrentExamDate09] = useState<number>(exam9);
  const [currentExamDate10, setCurrentExamDate10] = useState<number>(exam10);
  const [currentImage, setCurrentImage] = useState<string>(image);
  const [currentTask, setCurrentTask] = useState<string>(task);

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
  const onChangeBirthday = (date: number) => {
    setCurrentBirthday(date);
  };
  const onChangePassedDate00 = (passed0: number) => {
    setCurrentPassedDate00(passed0);
    setCurrentExamDate01(passed0 + 10000);
    setCurrentExamDate02(passed0 + 30000);
    setCurrentExamDate03(passed0 + 60000);
    setCurrentExamDate04(passed0 + 100000);
    setCurrentExamDate05(passed0 + 150000);
    setCurrentExamDate06(passed0 + 210000);
    setCurrentExamDate07(Math.max(passed0 + 310000, currentBirthday + 460000));
  };
  const onChangePassedDate01 = (passed1: number) => {
    setCurrentPassedDate01(passed1);
    setCurrentExamDate02(passed1 + 20000);
    setCurrentExamDate03(passed1 + 50000);
    setCurrentExamDate04(passed1 + 90000);
    setCurrentExamDate05(passed1 + 140000);
    setCurrentExamDate06(passed1 + 200000);
    setCurrentExamDate07(Math.max(passed1 + 300000, currentBirthday + 460000));
  };
  const onChangePassedDate02 = (passed2: number) => {
    setCurrentPassedDate02(passed2);
    setCurrentExamDate03(passed2 + 30000);
    setCurrentExamDate04(passed2 + 70000);
    setCurrentExamDate05(passed2 + 120000);
    setCurrentExamDate06(passed2 + 180000);
    setCurrentExamDate07(Math.max(passed2 + 280000, currentBirthday + 460000));
  };
  const onChangePassedDate03 = (passed3: number) => {
    setCurrentPassedDate03(passed3);
    setCurrentExamDate04(passed3 + 40000);
    setCurrentExamDate05(passed3 + 90000);
    setCurrentExamDate06(passed3 + 150000);
    setCurrentExamDate07(Math.max(passed3 + 250000, currentBirthday + 460000));
  };
  const onChangePassedDate04 = (passed4: number) => {
    setCurrentPassedDate04(passed4);
    setCurrentExamDate05(passed4 + 50000);
    setCurrentExamDate06(passed4 + 110000);
    setCurrentExamDate07(Math.max(passed4 + 210000, currentBirthday + 460000));
  };
  const onChangePassedDate05 = (passed5: number) => {
    setCurrentPassedDate05(passed5);
    setCurrentExamDate06(passed5 + 60000);
    setCurrentExamDate07(Math.max(passed5 + 160000, currentBirthday + 460000));
    setCurrentExamDate08(passed5 + 10000);
    setCurrentExamDate09(passed6 + 80000);
  };
  const onChangePassedDate06 = (passed6: number) => {
    setCurrentPassedDate06(passed6);
    setCurrentExamDate07(Math.max(passed6 + 100000, currentBirthday + 460000));
    setCurrentExamDate09(passed6 + 20000);
  };
  const onChangePassedDate07 = (passed7: number) => {
    setCurrentPassedDate07(passed7);
  };
  const onChangePassedDate08 = (passed8: number) => {
    setCurrentPassedDate08(passed8);
  };
  const onChangePassedDate09 = (passed9: number) => {
    setCurrentPassedDate09(passed9);
  };
  const onChangePassedDate10 = (passed10: number) => {
    setCurrentPassedDate10(passed10);
  };
  const onChangeExamDate00 = (exam0: number) => {
    setCurrentExamDate00(exam0);
  };
  const onChangeExamDate01 = (exam1: number) => {
    setCurrentExamDate01(exam1);
  };
  const onChangeExamDate02 = (exam2: number) => {
    setCurrentExamDate02(exam2);
  };
  const onChangeExamDate03 = (exam3: number) => {
    setCurrentExamDate03(exam3);
  };
  const onChangeExamDate04 = (exam4: number) => {
    setCurrentExamDate04(exam4);
  };
  const onChangeExamDate05 = (exam5: number) => {
    setCurrentExamDate05(exam5);
  };
  const onChangeExamDate06 = (exam6: number) => {
    setCurrentExamDate06(exam6);
  };
  const onChangeExamDate07 = (exam7: number) => {
    setCurrentExamDate07(exam7);
  };
  const onChangeExamDate08 = (exam8: number) => {
    setCurrentExamDate08(exam8);
  };
  const onChangeExamDate09 = (exam9: number) => {
    setCurrentExamDate09(exam9);
  };
  const onChangeExamDate10 = (exam10: number) => {
    setCurrentExamDate10(exam10);
  };

  const onChangeImage = (text: string) => {
    setCurrentImage(text);
  };

  const onChangeTask = (text: string) => {
    setCurrentTask(text);
  };

  // ”登録"ボタンを押したときに呼ばれます
  // dispatchでreduxの状態を更新します
  const onPressSave = () => {
    dispatch(setName(currentName));
    dispatch(setAge(currentAge));
    dispatch(setKenNumber(currentKenNumber));
    dispatch(setBirthday(currentBirthday));
    dispatch(setpassed0(currentPassedDate00));
    dispatch(setpassed1(currentPassedDate01));
    dispatch(setpassed2(currentPassedDate02));
    dispatch(setpassed3(currentPassedDate03));
    dispatch(setpassed4(currentPassedDate04));
    dispatch(setpassed5(currentPassedDate05));
    dispatch(setpassed6(currentPassedDate06));
    dispatch(setpassed7(currentPassedDate07));
    dispatch(setpassed8(currentPassedDate08));
    dispatch(setpassed9(currentPassedDate09));
    dispatch(setpassed10(currentPassedDate10));
    dispatch(setexam0(currentExamDate00));
    dispatch(setexam1(currentExamDate01));
    dispatch(setexam2(currentExamDate02));
    dispatch(setexam3(currentExamDate03));
    dispatch(setexam4(currentExamDate04));
    dispatch(setexam5(currentExamDate05));
    dispatch(setexam6(currentExamDate06));
    dispatch(setexam7(currentExamDate07));
    dispatch(setexam8(currentExamDate08));
    dispatch(setexam9(currentExamDate09));
    dispatch(setexam10(currentExamDate10));
    dispatch(setProfileImage(currentImage));
  };

  const onPressSaveTask = () => {
    dispatch(setTask(currentTask));
  };

  const onPressDeleteTask = () => {
    dispatch(setTask(""));
  };

  return {
    currentName,
    currentAge,
    currentKenNumber,
    currentBirthday,
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
    currentTask,
    onChangeName,
    onChangeAge,
    onChangeKenNumber,
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
    onPressSave,
    onPressSaveTask,
    onPressDeleteTask,
    onChangeImage,
    onChangeTask,
  };
};

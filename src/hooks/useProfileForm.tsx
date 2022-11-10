import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setName } from "../store/profileSlice";
import { setAge } from "../store/profileSlice";
import { setKenNumber } from "../store/profileSlice";
import { setBirthday } from "../store/profileSlice";
import { setProfileImage } from "../store/profileSlice";

type Hooks = {
  currentName: string;
  onChangeName: (text: string) => void;
  currentAge: string;
  onChangeAge: (text: string) => void;
  currentKenNumber: string;
  onChangeKenNumber: (text: string) => void;
  currentBirthday: number;
  onChangeBirthday: (text: number) => void;
  onPressSave: () => void;
  currentImage: string;
  onChangeImage: (text: string) => void;
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
  // currentNameは編集中の一時的な氏名です
  // currentNameをフォームに渡して表示します
  // フォームに文字を入力するとsetCurrentNameが呼ばれてcurrentNameを更新します
  // useStateの初期値にnameを入れることで,端末に永続化された氏名をフォーム初期値にします
  const [currentName, setCurrentName] = useState<string>(name);
  const [currentAge, setCurrentAge] = useState<string>(age);
  const [currentKenNumber, setCurrentKenNumber] = useState<string>(kenNumber);
  const [currentBirthday, setCurrentBirthday] = useState<number>(birthday);
  const [currentImage, setCurrentImage] = useState<string>(image);

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

  const onChangeBirthday = (text: number) => {
    setCurrentBirthday(text);
  };

  const onChangeImage = (text: string) => {
    setCurrentImage(text);
  };

  // ”登録"ボタンを押したときに呼ばれます
  // dispatchでreduxの状態を更新します
  const onPressSave = () => {
    dispatch(setName(currentName));
    dispatch(setAge(currentAge));
    dispatch(setKenNumber(currentKenNumber));
    dispatch(setBirthday(currentBirthday));
    dispatch(setProfileImage(currentImage));
  };

  return {
    currentName,
    currentAge,
    currentKenNumber,
    currentBirthday,
    currentImage,
    onChangeName,
    onChangeAge,
    onChangeKenNumber,
    onChangeBirthday,
    onPressSave,
    onChangeImage,
  };
};

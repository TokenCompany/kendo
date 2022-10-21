import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setName } from "../store/profileSlice";

type Hooks = {
  currentName: string;
  onChangeName: (text: string) => void;
  onPressSave: () => void;
};

export const useProfileForm = (): Hooks => {
  const dispatch = useDispatch();
  // 氏名
  // useSelectorでreduxから状態を取得します
  // nameはreduxに永続化された氏名です
  const name = useSelector((state: RootState) => state.profile.name);
  // currentNameは編集中の一時的な氏名です
  // currentNameをフォームに渡して表示します
  // フォームに文字を入力するとsetCurrentNameが呼ばれてcurrentNameを更新します
  // useStateの初期値にnameを入れることで,端末に永続化された氏名をフォーム初期値にします
  const [currentName, setCurrentName] = useState<string>(name);

  // フォームの文字が変更されたときに呼ばれます
  const onChangeName = (text: string) => {
    setCurrentName(text);
  };

  // ”登録"ボタンを押したときに呼ばれます
  // dispatchでreduxの状態を更新します
  const onPressSave = () => {
    dispatch(setName(currentName));
  };

  return {
    currentName,
    onChangeName,
    onPressSave,
  };
};

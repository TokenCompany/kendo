import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setText } from "../store/subCategorySlice";

type Hooks = {};

export const useSubCategory = (): Hooks => {
  const dispatch = useDispatch();

  const text = useSelector((state: RootState) => state.subCategory.text);

  const [currentText, setCurrentText] = useState<string>(text);

  // フォームの文字が変更されたときに呼ばれます
  const onChangeText = (text: string) => {
    setCurrentText(text);
  };

  // ”登録"ボタンを押したときに呼ばれます
  // dispatchでreduxの状態を更新します
  const onPressSave = () => {
    dispatch(setText(currentText));
  };

  return {
    currentText,
    onChangeText,
    onPressSave,
  };
};

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setSubCategory as setSubCategoryToRedux } from "../store/subCategorySlice";

type Hooks = {
  currentText: string;
  subCategory: string;
  onChangeText: (text: string) => void;
  onPressSubmit: (text: string) => void;
};

export const useSubCategory = (): Hooks => {
  const dispatch = useDispatch();

  const text = useSelector((state: RootState) => state.subCategory.text);

  const [currentText, setCurrentText] = useState<string>(text);
  const [subCategory, setSubCategory] = useState<string>(currentText);

  // フォームの文字が変更されたときに呼ばれます
  const onChangeText = (text: string) => {
    setCurrentText(text);
  };

  // ”登録"ボタンを押したときに呼ばれます
  // dispatchでreduxの状態を更新します
  const onPressSubmit = () => {
    dispatch(setSubCategoryToRedux(currentText));
  };

  return {
    currentText,
    subCategory,
    onChangeText,
    onPressSubmit,
  };
};

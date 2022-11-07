import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setPlace } from "../store/subCategorySlice";

type Hooks = {
  Place: Place[];
  currentPlace: string;
  onPressSave: (text: string) => void;
  onChangeText: (text: string) => void;
  onPressSave: () => void;
};

export type Place = {
  text: string;
  id: string; // uuid
};

export const useSubCategory = (): Hooks => {
  const dispatch = useDispatch();

  const placeSubCategories = useSelector(
    (state: RootState) => state.subCategory.placeSubCategories,
  );

  const [currentPlace, setCurrentPlace] = useState<string>("");
  const [Place, setPlace] = useState<Place[]>([]);

  // フォームの文字が変更されたときに呼ばれます
  const onChangeText = (text: string) => {
    setCurrentPlace(text);
  };

  // ”登録"ボタンを押したときに呼ばれます
  // dispatchでreduxの状態を更新します
  const onPressSubmit = () => {
    dispatch(setPlace(currentPlace));
  };

  return {
    Place,
    currentPlace,
    onChangeText,
    onPressSubmit,
    onPressSave,
  };
};

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setInitText } from "../store/initTextSlice";

type Hooks = {
  currentText: string;
  onPressSave: (text: string) => void;
};

export const useInitText = (): Hooks => {
  const dispatch = useDispatch();
  const initText = useSelector((state: RootState) => state.initText.initText);
  const [currentText, setCurrentText] = useState<string>(initText);

  // dispatchでreduxの状態を更新します
  const onPressSave = (text: string) => {
    setCurrentText(text);
    dispatch(setInitText(text));
  };

  return {
    currentText,
    onPressSave,
  };
};

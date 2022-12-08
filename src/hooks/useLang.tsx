import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setLang } from "../store/langSlice";

type Hooks = {
  currentLang: string;
  onChangeLang: (text: string) => void;
};

export const useLang = (): Hooks => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const [currentLang, setCurrentLang] = useState<string>(lang);

  // dispatchでreduxの状態を更新します
  const onChangeLang = (text: string) => {
    setCurrentLang(text);
    dispatch(setLang(text));
  };

  return {
    currentLang,
    onChangeLang,
  };
};

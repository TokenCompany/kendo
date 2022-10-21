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
  const name = useSelector((state: RootState) => state.profile.name);
  const [currentName, setCurrentName] = useState<string>(name);

  const onChangeName = (text: string) => {
    setCurrentName(text);
  };

  const onPressSave = () => {
    dispatch(setName(currentName));
  };

  return {
    currentName,
    onChangeName,
    onPressSave,
  };
};

import { useState } from "react";

type Hooks = {
  currentName: string;
  onChangeName: (text: string) => void;
};

export const useProfileForm = (): Hooks => {
  const [currentName, setCurrentName] = useState<string>("");

  const onChangeName = (text: string) => {
    setCurrentName(text);
  };

  return {
    currentName,
    onChangeName,
  };
};

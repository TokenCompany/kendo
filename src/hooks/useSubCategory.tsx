import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setPlaceToRedux } from "../store/subCategorySlice";
import { setSwingToRedux } from "../store/subCategorySlice";
import { setFootworkToRedux } from "../store/subCategorySlice";
import { setBeatToRedux } from "../store/subCategorySlice";
import { setResponseToRedux } from "../store/subCategorySlice";
import { setJigeikoToRedux } from "../store/subCategorySlice";
import { setTeacherToRedux } from "../store/subCategorySlice";
import { setKakariToRedux } from "../store/subCategorySlice";
import { setTargetToRedux } from "../store/subCategorySlice";

type Hooks = {
  place: SubCategory[];
  swing: SubCategory[];
  footwork: SubCategory[];
  beat: SubCategory[];
  response: SubCategory[];
  jigeiko: SubCategory[];
  teacher: SubCategory[];
  kakari: SubCategory[];
  target: SubCategory[];
  setPlace: (text: string) => void;
  setSwing: (text: string) => void;
  setFootwork: (text: string) => void;
  setBeat: (text: string) => void;
  setResponse: (text: string) => void;
  setJigeiko: (text: string) => void;
  setTeacher: (text: string) => void;
  setKakari: (text: string) => void;
  setTarget: (text: string) => void;
  onPressSave: (text: string) => void;
};

export type SubCategory = {
  text: string;
  id: string; // uuid
};

export const useSubCategory = (): Hooks => {
  const dispatch = useDispatch();

  const placeSubCategories = useSelector(
    (state: RootState) => state.subCategory.placeSubCategories,
  );

  const [place, setPlace] = useState<SubCategory[]>([]);
  const [swing, setSwing] = useState<SubCategory[]>([]);
  const [footwork, setFootwork] = useState<SubCategory[]>([]);
  const [beat, setBeat] = useState<SubCategory[]>([]);
  const [response, setResponse] = useState<SubCategory[]>([]);
  const [jigeiko, setJigeiko] = useState<SubCategory[]>([]);
  const [teacher, setTeacher] = useState<SubCategory[]>([]);
  const [kakari, setKakari] = useState<SubCategory[]>([]);
  const [target, setTarget] = useState<SubCategory[]>([]);

  // ”登録"ボタンを押したときに呼ばれます
  // dispatchでreduxの状態を更新します
  const onPressSave = () => {
    dispatch(setPlaceToRedux(place));
    dispatch(setSwingToRedux(swing));
    dispatch(setFootworkToRedux(footwork));
    dispatch(setBeatToRedux(beat));
    dispatch(setResponseToRedux(response));
    dispatch(setJigeikoToRedux(jigeiko));
    dispatch(setTeacherToRedux(teacher));
    dispatch(setKakariToRedux(kakari));
    dispatch(setTargetToRedux(target));
  };

  return {
    place,
    swing,
    footwork,
    beat,
    response,
    jigeiko,
    teacher,
    kakari,
    target,
    setPlace,
    setSwing,
    setFootwork,
    setBeat,
    setResponse,
    setJigeiko,
    setTeacher,
    setKakari,
    setTarget,
    onPressSave,
  };
};

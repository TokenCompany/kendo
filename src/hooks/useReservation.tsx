import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
// import { setStartTime } from "../store/reservationSlice";
// import { setEndTime } from "../store/reservationSlice";
// import { setPlace } from "../store/reservationSlice";

type Hooks = {
  // これでカレンダー上に日付が押された時、currentDateに日付文字列を格納する
  currentDate: string;
  currentStartTime: string;
  currentEndTime: string;
  currentPlace: string;
  onPressSave: () => void;
};

export const Reservation = (): Hooks => {
  const dispatch = useDispatch();
  // useSelectorでreduxから状態を取得します
  // 既に予約が入ってたらその予約を取得し、ない場合は''にする
  const date = useSelector((state: RootState) => state.reservation.date)
    ? useSelector((state: RootState) => state.reservation.date)
    : "";
  const startTime = useSelector((state: RootState) => state.reservation.date.startTime);
  const endTime = useSelector((state: RootState) => state.reservation.date.endTime);
  const place = useSelector((state: RootState) => state.reservation.date.place);
  // currentNameをフォームに渡して表示します
  // フォームに文字を入力するとsetCurrentNameが呼ばれてcurrentNameを更新します
  // useStateの初期値にnameを入れることで,端末に永続化された氏名をフォーム初期値にします
  // const [currentDate, setcurrentDate] = useState<string>(date);
  const [currentStartTime, setcurrentStartTime] = useState<string>(startTime);
  const [currentEndTime, setcurrentEndTime] = useState<string>(endTime);
  const [currentPlace, setcurrentPlace] = useState<string>(place);

  // ”登録"ボタンを押したときに呼ばれます
  // dispatchでreduxの状態を更新します
  const onPressSave = () => {
    // dispatch(setName(currentDate));
    dispatch(setStartTime(currentStartTime));
    dispatch(setEndTime(currentEndTime));
    dispatch(setPlace(currentPlace));
  };

  return {
    // ここ
    currentDate,
    currentStartTime,
    currentEndTime,
    currentPlace,
    onPressSave,
  };
};

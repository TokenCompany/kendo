import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { bookReservationItem } from "../store/reservationSlice";
import { deleteReservationItem } from "../store/reservationSlice";

type Hooks = {
  // これでカレンダー上に日付が押された時、currentDateに日付文字列を格納する
  currentState: any;
  onPressReserve: () => void;
  onPressDelete: () => void;
};

export const Reservation = (): Hooks => {
  const dispatch = useDispatch();
  // useSelectorでreduxから状態を取得します
  // 既に予約が入ってたらその予約を取得し、ない場合は''にする
  const reservations = useSelector((state: RootState) => state);
  const [currentState, bookReservationItem] = useState<any>(state);

  // ”登録"ボタンを押したときに呼ばれます
  // dispatchでreduxの状態を更新します
  const onPressReserve = () => {
    dispatch(bookReservationItem(currentState));
  };
  const onPressDelete = () => {
    // dispatch(setName(currentDate));
    dispatch(deleteReservationItem(currentState));
  };

  return {
    // ここ
    currentState,
    onPressReserve,
    onPressDelete
  };
};

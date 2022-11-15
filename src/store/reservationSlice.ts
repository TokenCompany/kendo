import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// カレンダーの予約に関わるREDUX
//
interface ReservationItem {
  startTime: string; // 開始時間
  endTime: string; // 終了時間
  place: string; // 稽古場所
}

export interface ReservationState {
  [date: string]: ReservationItem;
}

// デフォルトの値
// これはからオブジェクトでOKです
const initialState: ReservationState = {};

type BookReservationItemPayload = {
  date: string;
  startTime: string;
  endTime: string;
  place: string;
};
type DeleteReservationItemPayload = {
  date: string;
};

export const counterSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    // 予約情報を新規追加(更新)するアクションです
    bookReservationItem: (state, action: PayloadAction<BookReservationItemPayload>) => {
      state[action.payload.date] = {
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        place: action.payload.place,
      };
    },
    // 予約情報を削除するアクションです
    deleteReservationItem: (state, action: PayloadAction<DeleteReservationItemPayload>) => {
      delete state[action.payload.date];
    },
  },
});

// Action creators are generated for each case reducer function
export const { bookReservationItem } = counterSlice.actions;
export const { deleteReservationItem } = counterSlice.actions;

export default counterSlice.reducer;

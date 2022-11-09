import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// 練習実績に関わるREDUX
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

export const counterSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    // 予約情報を新規追加するアクションです
    addReservationItem: (state, action: PayloadAction<ReservationState>) => {
      state = action.payload;
    },
    // 予約情報を更新するアクションです
    updateReservationItem: (state, action: PayloadAction<ReservationItem>) => {
      state.startTime = action.payload;
      state.endTime = action.payload;
      state.place = action.payload;
    },
    // 予約情報を削除するアクションです
    deleteReservationItem: (state, action: PayloadAction<ReservationItem>) => {
      state = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addReservationItem } = counterSlice.actions;
export const { updateReservationItem } = counterSlice.actions;
export const { deleteReservationItem } = counterSlice.actions;

export default counterSlice.reducer;

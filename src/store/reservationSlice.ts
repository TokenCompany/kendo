import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// カレンダーの予約に関わるREDUX
//
interface ReservationItem {
  startTime: string;// 開始時間
  endTime: string;// 終了時間
  place: string;// 稽古場所
}

export interface reservationState {
  [date: string]: ReservationItem;
}

// デフォルトの値
// これはからオブジェクトでOKです
const initialState: reservationState = {}

export const counterSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    // nameを更新するアクションです
    setStartTime: (state, action: PayloadAction<string>) => {
      state.date.startTime = action.payload;
    },
    setEndTime: (state, action: PayloadAction<string>) => {
      state.date.endTime = action.payload;
    },
    setPlace: (state, action: PayloadAction<string>) => {
      state.date.place = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStartTime } = counterSlice.actions;
export const { setEndTime } = counterSlice.actions;
export const { setPlace } = counterSlice.actions;

export default counterSlice.reducer;

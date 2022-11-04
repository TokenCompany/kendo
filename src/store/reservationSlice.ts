import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// カレンダーの予約に関わるREDUX
//
export interface reservationState {
  date:string;
  startTime: string;
  endTime: string;
  place: string;
}

// デフォルトの値
const initialState: reservationState = {
    date:"", //予約日
    startTime: "", // 開始時間
    endTime: "", // 終了時間
    place: "", // 稽古場所
};

export const counterSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    // nameを更新するアクションです
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload;
    },
    setPlace: (state, action: PayloadAction<string>) => {
      state.place = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDate } = counterSlice.actions;
export const { setStartTime } = counterSlice.actions;
export const { setEndTime } = counterSlice.actions;
export const { setPlace } = counterSlice.actions;

export default counterSlice.reducer;

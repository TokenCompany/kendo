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
const initialState: ReservationState = {
  '2022-11-07':{
    startTime: '19:00', // 開始時間
    endTime: '21:00', // 終了時間
    place: '横浜アリーナ', // 稽古場所
  }
};

export const counterSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    // 予約情報を新規追加(更新)するアクションです
    bookReservationItem: (state, action) => {
      state = {
        ...state,[action.payload.date]:{
          startTime: action.payload.startTime,
          endTime: action.payload.endTime,
          place: action.payload.place
        }
      }
      console.log(action);
      
    },
    // 予約情報を削除するアクションです
    deleteReservationItem: (state, action) => {
      delete state[action.payload.date];
      console.log(action);
    },
  },
});

// Action creators are generated for each case reducer function
export const { bookReservationItem } = counterSlice.actions;
export const { deleteReservationItem } = counterSlice.actions;

export default counterSlice.reducer;

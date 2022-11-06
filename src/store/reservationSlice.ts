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

export const counterSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    // 予約情報を新規追加するアクションです
    addReservationItem: (state, action) => {
      state = {
        ...state,[action.payload.date]:{
          startTime: action.payload.startTime,
          endTime: action.payload.endTime,
          place: action.payload.place
        }
      }
    },
    // 予約情報を更新するアクションです
    updateReservationItem: (state, action) => {
      state[action.payload.date] =  {
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        place: action.payload.place
      }
    },
    // 予約情報を削除するアクションです
    deleteReservationItem: (state, action) => {
      delete state[action.payload.date];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addReservationItem } = counterSlice.actions;
export const { updateReservationItem } = counterSlice.actions;
export const { deleteReservationItem } = counterSlice.actions;

export default counterSlice.reducer;

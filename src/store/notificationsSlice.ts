import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// 練習実績に関わるREDUX
//
export interface NotificationsState {
  [identifier: string]: string
}

type NotificationsPayload = {
  date: string;
  identifier: string;
};

// デフォルトの値
const initialState: NotificationsState = {};

export const counterSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // 渡されるpayloadはメインカテゴリーの名前と登録されたサブカテゴリ―の配列が格納される
    addNotifications: (state, action: PayloadAction<NotificationsPayload>) => {
      state[action.payload.identifier] = action.payload.date;
    },
    deleteNotifications: (state, action: PayloadAction<NotificationsPayload>) => {
      delete state[action.payload.identifier];
    }
  },
});

// Action creators are generated for each case reducer function
export const { addNotifications } = counterSlice.actions;
export const { deleteNotifications } = counterSlice.actions;

export default counterSlice.reducer;

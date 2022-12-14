import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

//
// 通知時間に関わるREDUX
//
export interface ReminderState {
  reminderTimer: string;
}

// デフォルトの値
const initialState: ReminderState = {
  reminderTimer: dayjs().format(),
};

export const counterSlice = createSlice({
  name: "reminder",
  initialState,
  reducers: {
    // 渡されるpayloadは日付をstringにしたもの(例: "12:00")
    addReminder: (state, action: PayloadAction<string>) => {
      state.reminderTimer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addReminder } = counterSlice.actions;

export default counterSlice.reducer;

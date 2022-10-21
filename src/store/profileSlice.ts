import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// プロフィールに関わるredux
//
export interface ProfileState {
  name: string;
}

// デフォルトの値
const initialState: ProfileState = {
  name: "", // 氏名
};

export const counterSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // nameを更新するアクションです
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName } = counterSlice.actions;

export default counterSlice.reducer;

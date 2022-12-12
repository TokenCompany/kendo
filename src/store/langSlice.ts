import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LangState {
  lang: string;
}

// デフォルトの値
const initialState: LangState = {
  lang: "八段への道",
};

export const counterSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLang } = counterSlice.actions;

export default counterSlice.reducer;

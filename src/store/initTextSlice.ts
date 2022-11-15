import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitTextState {
  initText: string;
}

// デフォルトの値
const initialState: InitTextState = {
  initText: "",
};

export const counterSlice = createSlice({
  name: "initText",
  initialState,
  reducers: {
    setInitText: (state, action: PayloadAction<string>) => {
      state.initText = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInitText } = counterSlice.actions;

export default counterSlice.reducer;

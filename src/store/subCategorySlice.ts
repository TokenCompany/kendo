import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// 練習内容項目設定の小項目に関わるredux
//
export interface SubCategoryState {
  text: arrey[];
  category: string;
}

interface arrey {
  text: string;
}

// デフォルトの値
const initialState: SubCategoryState = {
  text: [], // 小項目
  category: "", // 大項目の種類
};

export const counterSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    // textを更新するアクションです
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setText } = counterSlice.actions;

export default counterSlice.reducer;

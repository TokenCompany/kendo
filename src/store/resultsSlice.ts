import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// 練習実績に関わるREDUX
//
export interface ResultsState {
  [date: string]: {
    placeSubCategories: subCategory[];
    trainingTime: subCategory[];
    suburiSubCategories: subCategory[];
    ashiSabakiSubCategories: subCategory[];
    kihonUchiSubCategories: subCategory[];
    oujiwazaSubCategories: subCategory[];
    jigeikoSubCategories: subCategory[];
    teacherSubCategories: subCategory[];
    kakarigeikoSubCategories: subCategory[];
  };
}

interface subCategory {
  id: string;
  text: string;
  result: number | boolean;
}

// デフォルトの値
const initialState: ResultsState = {};

export const counterSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    // 渡されるpayloadはメインカテゴリーの名前と登録されたサブカテゴリ―のstring配列
    addResults: (state, action) => {
      state[action.payload.trainingDate] = action.payload.resultsSum;
      console.log(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addResults } = counterSlice.actions;

export default counterSlice.reducer;

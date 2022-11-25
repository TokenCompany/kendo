import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// 練習実績に関わるREDUX
//
export interface allResultsState {
  [year: string]:[
    
  ]
}

interface resultData  {
  all:{
    times: number;
    goal: number;
  }
};

// デフォルトの値
const initialState: ResultsState = {};

export const counterSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    // 渡されるpayloadはメインカテゴリーの名前と登録されたサブカテゴリ―の配列が格納される
    addResults: (state, action) => {
      state[action.payload.trainingDate] = action.payload.resultsSum;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addResults } = counterSlice.actions;

export default counterSlice.reducer;

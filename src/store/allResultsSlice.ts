import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// 練習実績の合計に関わるREDUX
//
export interface AllResultsState {
  [year: string]:ResultData[]
}

interface ResultData  {
  id: string;
  text: string;
  times: number;
  goal: number;
};

type AllResultsPayload = {
  year: string;
  allResultsSum:[
    {
      id: string;
      text: string;
      times: number;
      goal: number;
    }
  ]
  
}

// デフォルトの値
const initialState: AllResultsState = {};

export const counterSlice = createSlice({
  name: "allResults",
  initialState,
  reducers: {
    addAllResults: (state, action:PayloadAction<AllResultsPayload>) => {
      state[action.payload.year] = action.payload.allResultsSum;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAllResults } = counterSlice.actions;

export default counterSlice.reducer;

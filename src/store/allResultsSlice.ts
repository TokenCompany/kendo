import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// 練習実績の合計に関わるREDUX
//格納例
// const obj = {
//   2020:[
//     {
//       id:"none",
//       text: "all",
//       times: 10,
//       goal: 20
//     },
//     {
//       id:"aaaa",
//       text: "田中",
//       times: 15,
//       goal: 24,
//     },
//     {
//       id:"bbbb",
//       text: "ルイス",
//       times: 15,
//       goal: 24,
//     }
//   ]
// }
export interface AllResultsState {
  [year: string]:ResultData[]
}

interface ResultData  {
  id: string;
  text: string;
  result: number;
  goal: number;
};

type AllResultsPayload = {
  year: string;
  allResultsSum:[
    {
      id: string;
      text: string;
      result: number;
      goal: number;
    }
  ]
}

// デフォルトの値
const initialState: AllResultsState = {};

// export const counterSlice = createSlice({
//   name: "allResults",
//   initialState,
//   reducers: {
//     addAllResults: (state, action:PayloadAction<AllResultsPayload>) => {
//       state[action.payload.year] = action.payload.allResultsSum;
//       console.log(state);
      
      
//     },
//   },
// });

// Action creators are generated for each case reducer function
// export const { addAllResults } = counterSlice.actions;

// export default counterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// プロフィールに関わるredux
//
export interface ProfileState {
  name: string;
  birthday: number;
  age: string;
  kenNumber: string;
  passed01: number;
  passed02: number;
  exam01: number;
  exam02: number;
}

// デフォルトの値
const initialState: ProfileState = {
  name: "", // 氏名
  birthday: 19900101, // 誕生日
  age: "", // 年齢
  kenNumber: "", // 全剣連番号
  passed01: 19900101, // 合格日
  passed02: 19900101,
  exam01: 19900101, // 審査日
  exam02: 19900101,
};

export const counterSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // nameを更新するアクションです
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setAge: (state, action: PayloadAction<string>) => {
      state.age = action.payload;
    },
    setKenNumber: (state, action: PayloadAction<string>) => {
      state.kenNumber = action.payload;
    },
    setBirthday: (state, action: PayloadAction<number>) => {
      state.birthday = action.payload;
    },
    setPassed01: (state, action: PayloadAction<number>) => {
      state.passed01 = action.payload;
    },
    setPassed02: (state, action: PayloadAction<number>) => {
      state.passed02 = action.payload;
    },
    setExam01: (state, action: PayloadAction<number>) => {
      state.exam01 = action.payload;
    },
    setExam02: (state, action: PayloadAction<number>) => {
      state.exam02 = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName } = counterSlice.actions;
export const { setAge } = counterSlice.actions;
export const { setKenNumber } = counterSlice.actions;
export const { setBirthday } = counterSlice.actions;
export const { setPassed01 } = counterSlice.actions;
export const { setPassed02 } = counterSlice.actions;
export const { setExam01 } = counterSlice.actions;
export const { setExam02 } = counterSlice.actions;

export default counterSlice.reducer;

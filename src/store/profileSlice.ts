import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// プロフィールに関わるredux
//
export interface ProfileState {
  name: string;
  birthday: number;
  passed: number;
  exam: number;
  age: string;
  kenNumber: string;
}

// デフォルトの値
const initialState: ProfileState = {
  name: "", // 氏名
  birthday: 19900101, // 誕生日
  age: "", // 年齢
  kenNumber: "", // 全剣連番号
  passed: 19900101, // 合格日
  exam: 19900101, // 審査日
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
    setPassed: (state, action: PayloadAction<number>) => {
      state.passed = action.payload;
    },
    setExam: (state, action: PayloadAction<number>) => {
      state.exam = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName } = counterSlice.actions;
export const { setAge } = counterSlice.actions;
export const { setKenNumber } = counterSlice.actions;
export const { setBirthday } = counterSlice.actions;
export const { setPassed } = counterSlice.actions;
export const { setExam } = counterSlice.actions;

export default counterSlice.reducer;

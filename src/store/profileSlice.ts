import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// プロフィールに関わるredux
//
export interface ProfileState {
  name: string;
  birthday: number;
  age: number;
  kenNumber: string;
  passed01: number;
  passed02: number;
  passed03: number;
  passed04: number;
  passed05: number;
  passed06: number;
  passed07: number;
  passed08: number;
  passed09: number;
  passed10: number;
  exam01: number;
  exam02: number;
  exam03: number;
  exam04: number;
  exam05: number;
  exam06: number;
  exam07: number;
  exam08: number;
  exam09: number;
  exam10: number;
}

// デフォルトの値
const initialState: ProfileState = {
  name: "", // 氏名
  birthday: 19900000, // 誕生日
  age: 0, // 年齢
  kenNumber: "", // 全剣連番号
  passed01: 19900000, // 合格日
  passed02: 19900000,
  passed03: 19900000,
  passed04: 19900000,
  passed05: 19900000,
  passed06: 19900000,
  passed07: 19900000,
  passed08: 19900000,
  passed09: 19900000,
  passed10: 19900000,
  exam01: 19900000, // 審査日
  exam02: 19900000,
  exam03: 19900000,
  exam04: 19900000,
  exam05: 19900000,
  exam06: 19900000,
  exam07: 19900000,
  exam08: 19900000,
  exam09: 19900000,
  exam10: 19900000,
};

export const counterSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // nameを更新するアクションです
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
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
    setPassed03: (state, action: PayloadAction<number>) => {
      state.passed03 = action.payload;
    },
    setPassed04: (state, action: PayloadAction<number>) => {
      state.passed04 = action.payload;
    },
    setPassed05: (state, action: PayloadAction<number>) => {
      state.passed05 = action.payload;
    },
    setPassed06: (state, action: PayloadAction<number>) => {
      state.passed06 = action.payload;
    },
    setPassed07: (state, action: PayloadAction<number>) => {
      state.passed07 = action.payload;
    },
    setPassed08: (state, action: PayloadAction<number>) => {
      state.passed08 = action.payload;
    },
    setPassed09: (state, action: PayloadAction<number>) => {
      state.passed09 = action.payload;
    },
    setPassed10: (state, action: PayloadAction<number>) => {
      state.passed10 = action.payload;
    },
    setExam01: (state, action: PayloadAction<number>) => {
      state.exam01 = action.payload;
    },
    setExam02: (state, action: PayloadAction<number>) => {
      state.exam02 = action.payload;
    },
    setExam03: (state, action: PayloadAction<number>) => {
      state.exam03 = action.payload;
    },
    setExam04: (state, action: PayloadAction<number>) => {
      state.exam04 = action.payload;
    },
    setExam05: (state, action: PayloadAction<number>) => {
      state.exam05 = action.payload;
    },
    setExam06: (state, action: PayloadAction<number>) => {
      state.exam06 = action.payload;
    },
    setExam07: (state, action: PayloadAction<number>) => {
      state.exam07 = action.payload;
    },
    setExam08: (state, action: PayloadAction<number>) => {
      state.exam08 = action.payload;
    },
    setExam09: (state, action: PayloadAction<number>) => {
      state.exam09 = action.payload;
    },
    setExam10: (state, action: PayloadAction<number>) => {
      state.exam10 = action.payload;
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
export const { setPassed03 } = counterSlice.actions;
export const { setPassed04 } = counterSlice.actions;
export const { setPassed05 } = counterSlice.actions;
export const { setPassed06 } = counterSlice.actions;
export const { setPassed07 } = counterSlice.actions;
export const { setPassed08 } = counterSlice.actions;
export const { setPassed09 } = counterSlice.actions;
export const { setPassed10 } = counterSlice.actions;
export const { setExam01 } = counterSlice.actions;
export const { setExam02 } = counterSlice.actions;
export const { setExam03 } = counterSlice.actions;
export const { setExam04 } = counterSlice.actions;
export const { setExam05 } = counterSlice.actions;
export const { setExam06 } = counterSlice.actions;
export const { setExam07 } = counterSlice.actions;
export const { setExam08 } = counterSlice.actions;
export const { setExam09 } = counterSlice.actions;
export const { setExam10 } = counterSlice.actions;

export default counterSlice.reducer;

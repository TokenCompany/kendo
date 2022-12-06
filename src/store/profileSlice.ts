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
  profileImage: string;
  task: string;
  passed0: number;
  passed1: number;
  passed2: number;
  passed3: number;
  passed4: number;
  passed5: number;
  passed6: number;
  passed7: number;
  passed8: number;
  passed9: number;
  passed10: number;
  exam0: number;
  exam1: number;
  exam2: number;
  exam3: number;
  exam4: number;
  exam5: number;
  exam6: number;
  exam7: number;
  exam8: number;
  exam9: number;
  exam10: number;
}

// デフォルトの値
const initialState: ProfileState = {
  name: "", // 氏名
  birthday: 19900000, // 誕生日
  age: 0, // 年齢
  kenNumber: "", // 全剣連番号
  profileImage: "", // プロフィール画像
  task: "", // 課題
  passed0: 19900000, // 合格日
  passed1: 19900000,
  passed2: 19900000,
  passed3: 19900000,
  passed4: 19900000,
  passed5: 19900000,
  passed6: 19900000,
  passed7: 19900000,
  passed8: 19900000,
  passed9: 19900000,
  passed10: 19900000,
  exam0: 19900000, // 審査日
  exam1: 19900000,
  exam2: 19900000,
  exam3: 19900000,
  exam4: 19900000,
  exam5: 19900000,
  exam6: 19900000,
  exam7: 19900000,
  exam8: 19900000,
  exam9: 19900000,
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
    setProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
    setTask: (state, action: PayloadAction<string>) => {
      state.task = action.payload;
    },
    setpassed0: (state, action: PayloadAction<number>) => {
      state.passed0 = action.payload;
    },
    setpassed1: (state, action: PayloadAction<number>) => {
      state.passed1 = action.payload;
    },
    setpassed2: (state, action: PayloadAction<number>) => {
      state.passed2 = action.payload;
    },
    setpassed3: (state, action: PayloadAction<number>) => {
      state.passed3 = action.payload;
    },
    setpassed4: (state, action: PayloadAction<number>) => {
      state.passed4 = action.payload;
    },
    setpassed5: (state, action: PayloadAction<number>) => {
      state.passed5 = action.payload;
    },
    setpassed6: (state, action: PayloadAction<number>) => {
      state.passed6 = action.payload;
    },
    setpassed7: (state, action: PayloadAction<number>) => {
      state.passed7 = action.payload;
    },
    setpassed8: (state, action: PayloadAction<number>) => {
      state.passed8 = action.payload;
    },
    setpassed9: (state, action: PayloadAction<number>) => {
      state.passed9 = action.payload;
    },
    setpassed10: (state, action: PayloadAction<number>) => {
      state.passed10 = action.payload;
    },
    setexam0: (state, action: PayloadAction<number>) => {
      state.exam0 = action.payload;
    },
    setexam1: (state, action: PayloadAction<number>) => {
      state.exam1 = action.payload;
    },
    setexam2: (state, action: PayloadAction<number>) => {
      state.exam2 = action.payload;
    },
    setexam3: (state, action: PayloadAction<number>) => {
      state.exam3 = action.payload;
    },
    setexam4: (state, action: PayloadAction<number>) => {
      state.exam4 = action.payload;
    },
    setexam5: (state, action: PayloadAction<number>) => {
      state.exam5 = action.payload;
    },
    setexam6: (state, action: PayloadAction<number>) => {
      state.exam6 = action.payload;
    },
    setexam7: (state, action: PayloadAction<number>) => {
      state.exam7 = action.payload;
    },
    setexam8: (state, action: PayloadAction<number>) => {
      state.exam8 = action.payload;
    },
    setexam9: (state, action: PayloadAction<number>) => {
      state.exam9 = action.payload;
    },
    setexam10: (state, action: PayloadAction<number>) => {
      state.exam10 = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName } = counterSlice.actions;
export const { setAge } = counterSlice.actions;
export const { setKenNumber } = counterSlice.actions;
export const { setBirthday } = counterSlice.actions;
export const { setProfileImage } = counterSlice.actions;
export const { setTask } = counterSlice.actions;
export const { setpassed0 } = counterSlice.actions;
export const { setpassed1 } = counterSlice.actions;
export const { setpassed2 } = counterSlice.actions;
export const { setpassed3 } = counterSlice.actions;
export const { setpassed4 } = counterSlice.actions;
export const { setpassed5 } = counterSlice.actions;
export const { setpassed6 } = counterSlice.actions;
export const { setpassed7 } = counterSlice.actions;
export const { setpassed8 } = counterSlice.actions;
export const { setpassed9 } = counterSlice.actions;
export const { setpassed10 } = counterSlice.actions;
export const { setexam0 } = counterSlice.actions;
export const { setexam1 } = counterSlice.actions;
export const { setexam2 } = counterSlice.actions;
export const { setexam3 } = counterSlice.actions;
export const { setexam4 } = counterSlice.actions;
export const { setexam5 } = counterSlice.actions;
export const { setexam6 } = counterSlice.actions;
export const { setexam7 } = counterSlice.actions;
export const { setexam8 } = counterSlice.actions;
export const { setexam9 } = counterSlice.actions;
export const { setexam10 } = counterSlice.actions;

export default counterSlice.reducer;

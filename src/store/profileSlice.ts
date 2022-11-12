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
  profileImage: string;
  task: string;
}

// デフォルトの値
const initialState: ProfileState = {
  name: "", // 氏名
  birthday: 19900101, // 誕生日
  age: "", // 年齢
  kenNumber: "", // 全剣連番号
  profileImage: "", // プロフィール画像
  task: "", // 課題
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
    setProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
    setTask: (state, action: PayloadAction<string>) => {
      state.task = action.payload;
      console.log(state.task);
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

export default counterSlice.reducer;

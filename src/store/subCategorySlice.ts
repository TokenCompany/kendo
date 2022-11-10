import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// 練習内容項目設定の小項目に関わるredux
//
export interface SubCategoryState {
  placeSubCategories: subcategory[];
  swingSubCategories: subcategory[];
  footworkSubCategories: subcategory[];
  beatSubCategories: subcategory[];
  responseSubCategories: subcategory[];
  jigeikoSubCategories: subcategory[];
  teacherSubCategories: subcategory[];
  kakariSubCategories: subcategory[];
  targetSubCategories: subcategory[];
}

interface subcategory {
  text: string;
  id: string;
}

// デフォルトの値
const initialState: SubCategoryState = {
  placeSubCategories: [],
  swingSubCategories: [],
  footworkSubCategories: [],
  beatSubCategories: [],
  responseSubCategories: [],
  jigeikoSubCategories: [],
  teacherSubCategories: [],
  kakariSubCategories: [],
  targetSubCategories: [],
};

export const counterSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    // subcategoryを更新するアクションです
    setPlaceToRedux: (state, action: PayloadAction<subcategory[]>) => {
      state.placeSubCategories = action.payload;
    },
    setSwingToRedux: (state, action: PayloadAction<subcategory[]>) => {
      state.swingSubCategories = action.payload;
    },
    setFootworkToRedux: (state, action: PayloadAction<subcategory[]>) => {
      state.footworkSubCategories = action.payload;
    },
    setBeatToRedux: (state, action: PayloadAction<subcategory[]>) => {
      state.beatSubCategories = action.payload;
    },
    setResponseToRedux: (state, action: PayloadAction<subcategory[]>) => {
      state.responseSubCategories = action.payload;
    },
    setJigeikoToRedux: (state, action: PayloadAction<subcategory[]>) => {
      state.jigeikoSubCategories = action.payload;
    },
    setTeacherToRedux: (state, action: PayloadAction<subcategory[]>) => {
      state.teacherSubCategories = action.payload;
    },
    setKakariToRedux: (state, action: PayloadAction<subcategory[]>) => {
      state.kakariSubCategories = action.payload;
    },
    setTargetToRedux: (state, action: PayloadAction<subcategory[]>) => {
      state.targetSubCategories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlaceToRedux } = counterSlice.actions;
export const { setSwingToRedux } = counterSlice.actions;
export const { setFootworkToRedux } = counterSlice.actions;
export const { setBeatToRedux } = counterSlice.actions;
export const { setResponseToRedux } = counterSlice.actions;
export const { setJigeikoToRedux } = counterSlice.actions;
export const { setTeacherToRedux } = counterSlice.actions;
export const { setKakariToRedux } = counterSlice.actions;
export const { setTargetToRedux } = counterSlice.actions;

export default counterSlice.reducer;

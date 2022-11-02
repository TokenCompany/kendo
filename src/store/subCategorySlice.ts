import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// 練習内容項目設定の小項目に関わるredux
//
export interface SubCategoryState {
  placeSubCategories: subcategory[];
  suburiSubCategories: subcategory[];
  ashiSabakiSubCategories: subcategory[];
  kihonUchiSubCategories: subcategory[];
  oujiwazaSubCategories: subcategory[];
  jigeikoSubCategories: subcategory[];
  teacherSubCategories: subcategory[];
  kakarigeikoSubCategories: subcategory[];
  targetSubCategories: subcategory[];
}

interface subcategory {
  text: string;
  id: string;
}

// デフォルトの値
const initialState: SubCategoryState = {
  placeSubCategories: [],
  suburiSubCategories: [],
  ashiSabakiSubCategories: [],
  kihonUchiSubCategories: [],
  oujiwazaSubCategories: [],
  jigeikoSubCategories: [],
  teacherSubCategories: [],
  kakarigeikoSubCategories: [],
  targetSubCategories: [],
};

export const counterSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    // subcategoryを更新するアクションです
    setSubCategory: (state, action: PayloadAction<string>) => {
      state.placeSubCategories.text = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSubCategory } = counterSlice.actions;

export default counterSlice.reducer;

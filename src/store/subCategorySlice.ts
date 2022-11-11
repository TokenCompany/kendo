import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// 練習内容項目設定の小項目に関わるredux
//
export interface SubCategoryState {
  placeSubCategories: subCategory[];
  suburiSubCategories: subCategory[];
  ashiSabakiSubCategories: subCategory[];
  kihonUchiSubCategories: subCategory[];
  oujiwazaSubCategories: subCategory[];
  jigeikoSubCategories: subCategory[];
  teacherSubCategories: subCategory[];
  kakarigeikoSubCategories: subCategory[];
  targetSubCategories: subCategory[];
}

interface subCategory {
  id: string;
  subCategories: string[];
  unit: string;
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

type addSubCategoryPayload = {
  mainCategory: string;
  subCategoriesArray: string[];
}
type deleteSubCategoryPayload = {
  mainCategory: string;
  category: string;
}

export const counterSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    // 渡されるpayloadはメインカテゴリーの名前と登録されたサブカテゴリ―のstring配列
    addSubCategory: (state, action: PayloadAction<addSubCategoryPayload>) => {
      state[action.payload.mainCategory].subCategories = action.payload.subCategoriesArray;
    },
    deleteSubCategory:(state, action: PayloadAction<deleteSubCategoryPayload>)=>{
      let deleteCategoryNum = state[action.payload.mainCategory].subCategories.indexOf(action.payload.category);
      state[action.payload.mainCategory].subCategories.splice(deleteCategoryNum,1);
    }
  },
});

// Action creators are generated for each case reducer function
export const { addSubCategory } = counterSlice.actions;
export const { deleteSubCategory } = counterSlice.actions;

export default counterSlice.reducer;

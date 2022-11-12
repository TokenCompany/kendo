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

interface TotalResults{
  [year: string]:number;
}

interface subCategory {
  id: string;
  text: string;
  unit: string;
  totalResults:TotalResults;
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
}

type addSubCategoryPayload = {
  mainCategoryName:string;
  id:string;
  text:string;
  totalResults:TotalResults;
}

export const counterSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    // 渡されるpayloadはメインカテゴリーの名前と登録されたサブカテゴリ―のstring配列
    addSubCategory: (state, action: PayloadAction<addSubCategoryPayload>) => {
      // state[action.payload.mainCategory].subCategories = action.payload.subCategoriesArray;
      console.log(action.payload);
      
    },
    deleteSubCategory:(state, action)=>{
      // let deleteCategoryNum = state[action.payload.mainCategory].subCategories.indexOf(action.payload.category);
      // state[action.payload.mainCategory].subCategories.splice(deleteCategoryNum,1);
      console.log(action.payload);
    }
  },
}) ;

// Action creators are generated for each case reducer function
export const { addSubCategory } = counterSlice.actions;
export const { deleteSubCategory } = counterSlice.actions;

export default counterSlice.reducer;

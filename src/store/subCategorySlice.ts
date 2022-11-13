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
  targetSubCategories: targetCategory;
}

interface TotalResults {
  [year: string]: number;
}

interface subCategory {
  id: string;
  text: string;
  // totalResults:TotalResults;
}

// 年間目標のtype宣言
interface targetCategories {
  id: string;
  text: string;
  times: number;
}

interface targetCategory {
  [date: number]:targetCategories[]
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
  targetSubCategories: {},
};

type SubCategoryPayload = {
  mainCategoryName: string;
  id: string;
  text: string;
};

type deleteSubCategory = {
  categoryName: string;
  id: string;
};

export const counterSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    // 渡されるpayloadはメインカテゴリーの名前と登録されたサブカテゴリ―のstring配列
    addSubCategory: (state, action: PayloadAction<SubCategoryPayload>) => {
      state[action.payload.mainCategoryName as keyof SubCategoryState].push({
        id: action.payload.id,
        text: action.payload.text,
      });
    },
    deleteSubCategory: (state, action: PayloadAction<deleteSubCategory>) => {
      const newArray = state[action.payload.categoryName as keyof SubCategoryState].filter(
        (item) => item.id !== action.payload.id,
      );
      state[action.payload.categoryName as keyof SubCategoryState] = newArray;
    },
    addTargetCategory:(state,action) => {
      console.log(action.payload);
    }
  },
});

// Action creators are generated for each case reducer function
export const { addSubCategory } = counterSlice.actions;
export const { deleteSubCategory } = counterSlice.actions;
export const { addTargetCategory } = counterSlice.actions;

export default counterSlice.reducer;

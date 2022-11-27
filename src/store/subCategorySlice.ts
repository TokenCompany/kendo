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
  teacherSubCategories: teacherSubcategory[];
  kakarigeikoSubCategories: subCategory[];
  targetSubCategories: TargetCategories;
}

interface subCategory {
  id: string;
  text: string;
}

interface teacherSubcategory {
  id: string;
  text: string;
}

// 年間目標のtype宣言
interface TargetCategory {
  id: string;
  text: string;
  goal: number;
  result:number;
}

interface TargetCategories {
  [year: string]: TargetCategory[];
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
type TargetSubCategoryPayload = {
  year: string;
  targets:TargetCategory[]
};

type DeleteSubCategory = {
  categoryName: string;
  id: string;
};

export const counterSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    // 渡されるpayloadはメインカテゴリーの名前と登録されたサブカテゴリ―のstring配列
    addSubCategory: (state, action: PayloadAction<SubCategoryPayload>) => {
      let newSubcategory = [
        ...state[action.payload.mainCategoryName as keyof SubCategoryPayload],
        {
          id: action.payload.id,
          text: action.payload.text,
        },
      ];
      state[action.payload.mainCategoryName as keyof SubCategoryPayload] = newSubcategory;
    },
    deleteSubCategory: (state, action: PayloadAction<DeleteSubCategory>) => {
      const newArray = state[action.payload.categoryName as keyof SubCategoryState].filter(
        (item: any) => item.id !== action.payload.id,
      );
      state[action.payload.categoryName as keyof SubCategoryState] = newArray;
    },
    addTargetCategory: (state, action: PayloadAction<TargetSubCategoryPayload>) => {
      state.targetSubCategories[action.payload.year as keyof TargetSubCategoryPayload] = action.payload.targets;
      console.log(state.targetSubCategories);
      
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSubCategory } = counterSlice.actions;
export const { deleteSubCategory } = counterSlice.actions;
export const { addTargetCategory } = counterSlice.actions;

export default counterSlice.reducer;

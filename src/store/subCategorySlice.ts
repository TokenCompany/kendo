import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
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
  targetSubCategories: TargetCategory;
}

interface subCategory {
  id: string;
  text: string;
}

interface teacherSubcategory {
  id: string;
  text: string;
  times: number;
}

// 年間目標のtype宣言
interface TargetCategories {
  id: string;
  text: string;
  times: number;
}

interface TargetCategory {
  [year: string]: TargetCategories[];
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
      if (action.payload.mainCategoryName === "teacherSubCategories") {
        // targetSubCategoriesも同時にセット
        let currentYear = dayjs().year();
        let newTargetSubCategories = { ...state["targetSubCategories"] };
        if (currentYear in newTargetSubCategories) {
          newTargetSubCategories[currentYear] = [
            ...newTargetSubCategories[currentYear],
            {
              id: action.payload.id,
              text: action.payload.text,
              times: 0,
            },
          ];
        } else {
          newTargetSubCategories[currentYear] = [
            {
              id: action.payload.id,
              text: action.payload.text,
              times: 0,
            },
          ];
        }
        state["targetSubCategories"] = newTargetSubCategories;
      }
      let newSubcategory = [
        ...state[action.payload.mainCategoryName as keyof SubCategoryState],
        {
          id: action.payload.id,
          text: action.payload.text,
        },
      ];
      state[action.payload.mainCategoryName as keyof SubCategoryState] = newSubcategory;
    },
    deleteSubCategory: (state, action: PayloadAction<deleteSubCategory>) => {
      const newArray = state[action.payload.categoryName as keyof SubCategoryState].filter(
        (item: any) => item.id !== action.payload.id,
      );
      state[action.payload.categoryName as keyof SubCategoryState] = newArray;
    },
    addTargetCategory: (state, action: PayloadAction<TargetCategory>) => {
      state.targetSubCategories = action.payload;
      console.log(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSubCategory } = counterSlice.actions;
export const { deleteSubCategory } = counterSlice.actions;
export const { addTargetCategory } = counterSlice.actions;

export default counterSlice.reducer;

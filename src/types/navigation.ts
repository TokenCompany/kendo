import { SubCategory } from "./subCategory";
// navigation関連の型
// Screenを追加する際にはここにも定義してください
export type MainStackParamList = {
  Init: undefined;
  Menu: undefined;
  History: undefined;
  Schedule: undefined;
  Setting: undefined;
  Statistics: undefined;
  TaskEdit: undefined;
  ProfileEdit: undefined;
  TrainingEdit: undefined;
  // SubCategory: undefined;
  // subCategoryType: string;
  SubCategory: { subCategory: SubCategory };
  ResultEdit: undefined;
};

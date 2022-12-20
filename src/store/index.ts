import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileReducer from "./profileSlice";
import subCategoryReducer from "./subCategorySlice";
import reservationReducer from "./reservationSlice";
import resultsReducer from "./resultsSlice";
import reminderReducer from "./reminderSlice";
import initTextReducer from "./initTextSlice";
import langReducer from "./langSlice";
import notificationsReducer from "./notificationsSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// 永続化の設定
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// reduxツリーの大元を定義します
// reduxに保存する状態を増やす時はここに追加してください
const rootReducer = combineReducers({
  profile: profileReducer,
  subCategory: subCategoryReducer,
  reservation: reservationReducer,
  initText: initTextReducer,
  results: resultsReducer,
  reminder: reminderReducer,
  lang: langReducer,
  notifications:notificationsReducer,
  // allResults:allResultsReducer,
});

// 永続化のための設定
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ストアの設定
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // warningを防止: https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

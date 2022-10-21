import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { store, persistor } from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MainStack } from "./src/navigation/MainStack";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={theme}>
          <MainStack />
        </NavigationContainer>
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}

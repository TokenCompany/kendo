import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/store";
import { Provider } from "react-redux";
import { MainStack } from "./src/navigation/MainStack";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}

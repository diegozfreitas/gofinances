import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import light from "./src/globals/styles/light";

import { AuthProvider, UseAuth } from "./src/contexts/Auth";

import { Routes } from "./src/routes";

export default function App() {
  const { isLoading } = UseAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || isLoading) {
    return <></>;
  }

  return (
    <ThemeProvider theme={light}>
      <StatusBar style="light" />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

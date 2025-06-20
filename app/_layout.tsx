import React from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from '../context/GlobalProvider'
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsloaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsloaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsloaded, error]);

  if (!fontsloaded && !error) {
    return null;
  }
  return (
    <GlobalProvider>
      <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="search/[query]"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
    <StatusBar backgroundColor="#161622" style="light"></StatusBar>
    </GlobalProvider>
    
  );
}

import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import "react-native-url-polyfill/auto";
import { useGlobalContext } from "../context/GlobalProvider";
const App = () => {
  const { isLoading, isLogged } = useGlobalContext();

  if (!isLoading && isLogged) {
    return (
      <Redirect href="/home" />
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex items-center justify-center  min-h-[85vh] w-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[85px] h-[15]px absolute -bottom-6 -right-5"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push("/signin");
            }}
            containerStyles="w-full mt-7"
            textStyles="font-psemibold"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

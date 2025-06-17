import { View, Text, Image } from "react-native";
import React from "react";
import {router} from 'expo-router'
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import '../global.css'
const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-white">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle} </Text>

      <CustomButton
      title="Create video"
      handlePress={()=> router.push('/create')}
      containerStyles="w-full my-5"
      textStyles="font-psemibold"
      />
    </View>
  );
};

export default EmptyState;

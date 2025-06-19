import { View, Text,Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {icons} from '../constants'


const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View
        className={`flex-row border-2 rounded-2xl w-full h-16 px-4 bg-black-100 items-center ${
          isFocused ? "border-secondary" : "border-black-200"
        }`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
                <Image
                source={!showPassword? icons.eye:icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
                />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

import { View, Text,Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {icons} from '../constants'
import '../global.css'
interface SearchInputProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
      <View
        className={`flex-row border-2 rounded-2xl w-full h-16 px-4 bg-black-100 items-center space-x-4 ${
          isFocused ? "border-secondary" : "border-black-200"
        }` }
      >
        <TextInput
          className="flex-1 text-white font-pregular mt-0.5 text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity>
                <Image
                source={icons.search}
                className="w-5 h-5"
                resizeMode="contain"
                />
        </TouchableOpacity>
      </View>
  );
};

export default SearchInput;

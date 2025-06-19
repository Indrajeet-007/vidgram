import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import "../global.css";
import { router, usePathname } from "expo-router";

const SearchInput = ({initialQuery}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`flex-row border-2 rounded-2xl w-full h-16 px-4 bg-black-100 items-center space-x-4 ${
        isFocused ? "border-secondary" : "border-black-200"
      }`}
    >
      <TextInput
        className="flex-1 text-white font-pregular mt-0.5 text-base"
        value={query}
        placeholder="Search here..."
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Search Query",
              "Please enter a search query to proceed."
            );
          }

          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            console.log("Navigating to search page with query:", query);
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

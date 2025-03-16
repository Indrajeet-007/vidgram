import { View, Text, Image, Alert } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getCurrentUser, signIn } from "@/lib/appwrite";
const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);
  const submit = async() => {
    if(!form.email ||!form.password ){
          Alert.alert('Error','Please fill in all the fields')
        }
        setisSubmitting(true);
        try {
           await signIn(form.email, form.password)
           const result = await getCurrentUser();
           console.log(result)
           setUser(result);
           setIsLogged(true);
           Alert.alert("Success", "User signed in successfully");
          router.replace('/home')
        }
        catch(error){
          Alert.alert('Error', (error as any).message)
        }finally{
          setisSubmitting(false);
        }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign in"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            textStyles="font-psemibold"
          />
          <View className="justify-center pt-5 flex-row gap-2 ">
          <Text className="text-lg text-gray-100 font-pregular">Don't have account?</Text>
          <Link href="/signup" className="text-lg font-psemibold text-secondary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

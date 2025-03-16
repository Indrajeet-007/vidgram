import { View, Text, Image,ScrollView, Alert } from "react-native";
import {createUser} from '../../lib/appwrite'
import React from "react";
import { Link, router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
const SignUp = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
    username:''
  });
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setisSubmitting] = useState(false);
  const submit = async () => {

    if(!form.username||!form.password ||!form.email ){
      Alert.alert('Error','Please fill in all the fields')
    }
    setisSubmitting(true);
    try {
      const result =  await createUser(form.email, form.password, form.username)
      console.log(result)
      setUser(result)
      setIsLogged(true)
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
            Register to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            placeholder="Enter your username"
            handleChangeText={(e) => setform({ ...form, username: e })}
            otherStyles="mt-7"
          />
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
            title="Sign up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            textStyles="font-psemibold"
          />
          <View className="justify-center pt-5 flex-row gap-2 ">
          <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
          <Link href="/signin" className="text-lg font-psemibold text-secondary">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

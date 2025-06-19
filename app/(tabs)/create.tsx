import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { useState } from 'react'

const Create = () => {
  const [form, setForm] = useState({
    title:'',
    
  })
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='="px-4 my-6'>
        <Text className='text-white text-2xl font-psemibold'>
          Upload Video
        </Text>
        <FormField 
          title="Video Title"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
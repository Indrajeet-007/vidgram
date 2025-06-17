import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Trending = ({ posts }) => {  // Destructure posts from props
  return (
    <View className="w-full">
      <FlatList
        data={posts}
        horizontal={true}  
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View className="mr-4 bg-black-100 rounded-lg p-4">
            <Text className='text-white'>{item.id}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default Trending
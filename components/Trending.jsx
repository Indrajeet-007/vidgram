import { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEventListener } from 'expo';

import { icons } from "../constants";

const zoomIn = { 0: { scale: 0.9 }, 1: { scale: 1 } };
const zoomOut = { 0: { scale: 1 }, 1: { scale: 0.9 } };

const testVideos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
];

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const player = useVideoPlayer(null);

  // Handle video end
  useEventListener(player, 'playToEnd', () => {
    player.pause();
    player.currentTime = 0;
    setPlay(false);
  });

  // Handle status changes
  useEventListener(player, 'statusChange', ({ status, error }) => {
    console.log('Player status:', status);
    if (error) {
      console.error('Player error:', error);
      setError(error.message);
      setLoading(false);
    }
  });

  // Handle source load
  useEventListener(player, 'sourceLoad', ({ videoSource, error }) => {
    console.log('Source loaded:', videoSource);
    if (error) {
      console.error('Source load error:', error);
      setError(error.message);
    }
    setLoading(false);
  });

  // Pause when item becomes inactive
  useEffect(() => {
    if (activeItem !== item.$id && play) {
      player.pause();
      player.currentTime = 0;
      setPlay(false);
    }
  }, [activeItem, item.$id]);

  const handlePlayPress = async () => {
    setPlay(true);
    setLoading(true);
    setError(null);
    
    try {
      console.log('Loading video:', item.video);
      await player.replaceAsync(testVideos[0]);
      console.log('Video loaded successfully');
      player.play();
    } catch (error) {
      console.error("Error loading video:", error);
      setError(error.message);
      setPlay(false);
      setLoading(false);
    }
  };

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View className="w-52 h-72 rounded-[25px] mt-3 bg-white/10 justify-center items-center">
          <VideoView
            player={player}
            className="w-full h-full rounded-[25px]"
            contentFit="contain"
            allowsFullscreen
            allowsPictureInPicture
            nativeControls
          />
          
          {loading && (
            <View className="absolute">
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
          
          {error && (
            <View className="absolute p-2.5">
              <Text className="text-white text-center">
                Error: {error}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={handlePlayPress}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[25px] my-5 overflow-hidden"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
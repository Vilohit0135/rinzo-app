import { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface FavouriteButtonProps {
  isFavourite: boolean;
  onPress: () => void;
  size?: number;
}

export function FavouriteButton({ isFavourite, onPress, size = 26 }: FavouriteButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isFavourite) {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.3, duration: 100, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    }
  }, [isFavourite]);

  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons
          name={isFavourite ? 'heart' : 'heart-outline'}
          size={size}
          color={isFavourite ? '#FF3040' : '#000000'}
        />
      </Animated.View>
    </Pressable>
  );
}

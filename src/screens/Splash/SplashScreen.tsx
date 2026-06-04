import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Svg, { Circle } from 'react-native-svg';

const RING_SIZE = 60;
const STROKE_WIDTH = 6;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PROGRESS_LENGTH = CIRCUMFERENCE * 0.25;

interface SplashScreenProps {
  onFinish?: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const { height } = useWindowDimensions();
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();

    const timer = setTimeout(() => {
      animation.stop();
      onFinish?.();
    }, 2500);

    return () => {
      animation.stop();
      clearTimeout(timer);
    };
  }, [rotation, onFinish]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const topPadding = height * 0.74;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={[styles.container, { paddingTop: topPadding }]}>
        <Text style={styles.tagline}>Clean Clothes , Happy Life</Text>
        <View style={styles.loaderGap} />
        <Animated.View
          style={[
            styles.loader,
            { transform: [{ rotate: rotateInterpolation }] },
          ]}
        >
          <Svg width={RING_SIZE} height={RING_SIZE} viewBox="0 0 60 60">
            <Circle
              cx={30}
              cy={30}
              r={RADIUS}
              stroke="#E2D7F7"
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
            <Circle
              cx={30}
              cy={30}
              r={RADIUS}
              stroke="#8259D2"
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={`${PROGRESS_LENGTH} ${CIRCUMFERENCE - PROGRESS_LENGTH}`}
            />
          </Svg>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tagline: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    color: '#A0A0A0',
    letterSpacing: 0,
    lineHeight: 22,
  },
  loaderGap: {
    height: 20,
  },
  loader: {
    width: RING_SIZE,
    height: RING_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;

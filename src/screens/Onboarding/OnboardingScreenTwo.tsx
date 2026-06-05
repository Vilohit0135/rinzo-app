import { useRef } from 'react';
import { PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import OnboardingImage from '../../components/onboarding/OnboardingImage';
import OnboardingContent from '../../components/onboarding/OnboardingContent';
import OnboardingPagination from '../../components/onboarding/OnboardingPagination';
import OnboardingButton from '../../components/onboarding/OnboardingButton';
import { onboardingData } from '../../data/onboarding/onboardingData';

interface OnboardingScreenTwoProps {
  onNext?: () => void;
  onPrev?: () => void;
  onDotPress?: (index: number) => void;
  onSkip?: () => void;
}

const SWIPE_THRESHOLD = 60;

const OnboardingScreenTwo = ({ onNext, onPrev, onDotPress, onSkip }: OnboardingScreenTwoProps) => {
  const item = onboardingData[1];
  const gestureX = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 20,
      onPanResponderGrant: (_, g) => {
        gestureX.current = g.dx;
      },
      onPanResponderMove: (_, g) => {
        gestureX.current = g.dx;
      },
      onPanResponderRelease: () => {
        if (gestureX.current < -SWIPE_THRESHOLD) onNext?.();
        else if (gestureX.current > SWIPE_THRESHOLD) onPrev?.();
      },
    }),
  ).current;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container} {...panResponder.panHandlers}>
        <TouchableOpacity style={styles.skipBtn} onPress={() => onSkip?.()} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.topSection}>
          <OnboardingImage source={item.image} />
        </View>

        <OnboardingContent title={item.title} description={item.description} />

        <OnboardingPagination total={3} activeIndex={1} onDotPress={onDotPress} />

        <View style={styles.bottomSection}>
          <OnboardingButton title="Next" onPress={() => onNext?.()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  skipBtn: {
    alignSelf: 'flex-end',
    marginTop: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    textDecorationLine: 'underline',
  },
  topSection: {
    top: 1,
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    paddingBottom: 34,
  },
});

export default OnboardingScreenTwo;

import { useRef, useState } from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import OnboardingImage from '../../components/onboarding/OnboardingImage';
import OnboardingContent from '../../components/onboarding/OnboardingContent';
import OnboardingPagination from '../../components/onboarding/OnboardingPagination';
import OnboardingButton from '../../components/onboarding/OnboardingButton';
import { onboardingData } from '../../data/onboarding/onboardingData';

interface OnboardingScreenOneProps {
  onNext?: () => void;
  onSkip?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const OnboardingScreenOne = ({ onNext, onSkip }: OnboardingScreenOneProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
      onNext?.();
    }
  };

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.skipBtn} onPress={() => onSkip?.()} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.centerSection}>
          <FlatList
            ref={flatListRef}
            data={onboardingData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <OnboardingImage source={item.image} />
                <OnboardingContent title={item.title} description={item.description} />
              </View>
            )}
          />
        </View>

        <OnboardingPagination total={3} activeIndex={currentIndex} onDotPress={handleDotPress} />

        <View style={styles.bottomSection}>
          <OnboardingButton title="Next" onPress={handleNext} />
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
    paddingHorizontal: 24,
  },
  skipBtn: {
    alignSelf: 'flex-end',
    marginTop: 16,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    textDecorationLine: 'underline',
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
  },
  slide: {
    width: SCREEN_WIDTH - 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    paddingBottom: 34,
  },
});

export default OnboardingScreenOne;

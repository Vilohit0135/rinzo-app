import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import OnboardingImage from '../../components/onboarding/OnboardingImage';
import OnboardingContent from '../../components/onboarding/OnboardingContent';
import OnboardingPagination from '../../components/onboarding/OnboardingPagination';
import OnboardingButton from '../../components/onboarding/OnboardingButton';
import { onboardingData } from '../../data/onboarding/onboardingData';

interface OnboardingScreenTwoProps {
  onNext?: () => void;
}

const OnboardingScreenTwo = ({ onNext }: OnboardingScreenTwoProps) => {
  const item = onboardingData[1];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.topSection}>
          <OnboardingImage source={item.image} />
        </View>

        <OnboardingContent title={item.title} description={item.description} />

        <OnboardingPagination total={3} activeIndex={1} />

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
  topSection: {
    top: 50,
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    paddingBottom: 34,
  },
});

export default OnboardingScreenTwo;

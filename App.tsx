import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen1 from './src/screens/Onboarding/OnboardingScreen1';
import SplashScreen from './src/screens/Splash/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <OnboardingScreen1 />
    </SafeAreaProvider>
  );
}

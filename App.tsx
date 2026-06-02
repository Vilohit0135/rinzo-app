import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen1 from './src/screens/Onboarding/OnboardingScreen1';
import SplashScreen from './src/screens/Splash/SplashScreen';
import LocationAccessScreen from './src/screens/LocationAccess/LocationAccessScreen';

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'onboarding' | 'location'>('splash');

  return (
    <SafeAreaProvider>
      {screen === 'splash' && <SplashScreen onFinish={() => setScreen('onboarding')} />}
      {screen === 'onboarding' && <OnboardingScreen1 onNext={() => setScreen('location')} />}
      {screen === 'location' && <LocationAccessScreen />}
    </SafeAreaProvider>
  );
}

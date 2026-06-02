import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen1 from './src/screens/Onboarding/OnboardingScreen1';
import SplashScreen from './src/screens/Splash/SplashScreen';
import LocationAccessScreen from './src/screens/LocationAccess/LocationAccessScreen';
import LoginScreen from './src/screens/Login/LoginScreen';

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'onboarding' | 'location' | 'login'>('splash');

  return (
    <SafeAreaProvider>
      {screen === 'splash' && <SplashScreen onFinish={() => setScreen('onboarding')} />}
      {screen === 'onboarding' && <OnboardingScreen1 onNext={() => setScreen('location')} />}
      {screen === 'location' && <LocationAccessScreen onNext={() => setScreen('login')} />}
      {screen === 'login' && <LoginScreen />}
    </SafeAreaProvider>
  );
}

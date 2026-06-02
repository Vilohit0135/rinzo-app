import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SchedulePickupScreen from './src/screens/SchedulePickup/SchedulePickupScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SchedulePickupScreen />
      </NavigationContainer>
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

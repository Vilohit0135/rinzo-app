import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SchedulePickupScreen from './src/screens/SchedulePickup/SchedulePickupScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SchedulePickupScreen />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

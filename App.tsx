// App.tsx

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SchedulePickupScreen from './src/screens/SchedulePickup/SchedulePickupScreen';
import BookPickupScreen from './src/screens/BookPickup/BookPickupScreen';
import PickupDetailsScreen from './src/screens/PickupDetails/PickupDetailsScreen';
import OrderSummaryScreen from './src/screens/OrderSummary/OrderSummaryScreen';
import PaymentScreen from './src/screens/Payment/PaymentScreen';
import OrderConfirmationScreen from './src/screens/OrderConfirmation/OrderConfirmationScreen';
import OrderTrackingScreen from './src/screens/OrderTracking/OrderTrackingScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="BookPickup"
        >
          <Stack.Screen
            name="BookPickup"
            component={BookPickupScreen}
          />
          <Stack.Screen
            name="PickupDetails"
            component={PickupDetailsScreen}
          />
          <Stack.Screen
            name="SchedulePickup"
            component={SchedulePickupScreen}
          />
          <Stack.Screen
            name="OrderSummary"
            component={OrderSummaryScreen}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
          />
          <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmationScreen}
          />
          <Stack.Screen
            name="OrderTracking"
            component={OrderTrackingScreen}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
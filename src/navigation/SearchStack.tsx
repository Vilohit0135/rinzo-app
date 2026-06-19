import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import SearchScreen from '../screens/Search/SearchScreen';
import LaundryDetailScreen from '../screens/LaundryDetail/LaundryDetailScreen';
import BookPickupScreen from '../screens/BookPickup/BookPickupScreen';
import PickupDetailsScreen from '../screens/PickupDetails/PickupDetailsScreen';
import SchedulePickupScreen from '../screens/orders/SchedulePickupScreen';
import OrderSummaryScreen from '../screens/OrderSummary/OrderSummaryScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmation/OrderConfirmationScreen';
import OrderPlacedScreen from '../screens/OrderPlaced/OrderPlacedScreen';
import OrderPickedUpScreen from '../screens/orders/OrderPickedUpScreen';
import OrderTrackingScreen from '../screens/OrderTracking/OrderTrackingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="LaundryDetail" component={LaundryDetailScreen} />
      <Stack.Screen name="BookPickup" component={BookPickupScreen} />
      <Stack.Screen name="PickupDetails" component={PickupDetailsScreen} />
      <Stack.Screen name="SchedulePickup" component={SchedulePickupScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="OrderPickedUp" component={OrderPickedUpScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;

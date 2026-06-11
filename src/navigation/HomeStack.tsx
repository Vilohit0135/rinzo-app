import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import HomeScreen from '../screens/Home/HomeScreen';
import AllServicesScreen from '../screens/services/AllServicesScreen';
import BookPickupScreen from '../screens/BookPickup/BookPickupScreen';
import PickupDetailsScreen from '../screens/PickupDetails/PickupDetailsScreen';
import SchedulePickupScreen from '../screens/orders/SchedulePickupScreen';
import OrderSummaryScreen from '../screens/OrderSummary/OrderSummaryScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmation/OrderConfirmationScreen';
import OrderPickedUpScreen from '../screens/orders/OrderPickedUpScreen';
import OrderTrackingScreen from '../screens/OrderTracking/OrderTrackingScreen';
import LaundryDetailScreen from '../screens/LaundryDetail/LaundryDetailScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import OffersScreen from '../screens/Offers/OffersScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import LocationSelectionScreen from '../screens/LocationSelection/LocationSelectionScreen';
import AddAddressScreen from '../screens/AddAddress/AddAddressScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AllServices" component={AllServicesScreen} />
      <Stack.Screen name="BookPickup" component={BookPickupScreen} />
      <Stack.Screen name="PickupDetails" component={PickupDetailsScreen} />
      <Stack.Screen name="SchedulePickup" component={SchedulePickupScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="OrderPickedUp" component={OrderPickedUpScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen name="LaundryDetail" component={LaundryDetailScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Offers" component={OffersScreen} />
      <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
      <Stack.Screen name="LocationSelection" component={LocationSelectionScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;

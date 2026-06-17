import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import YourCartScreen from '../screens/YourCart/YourCartScreen';
import OrderSummaryScreen from '../screens/OrderSummary/OrderSummaryScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmation/OrderConfirmationScreen';
import OrderPickedUpScreen from '../screens/orders/OrderPickedUpScreen';
import OrderTrackingScreen from '../screens/OrderTracking/OrderTrackingScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import PickupDetailsScreen from '../screens/PickupDetails/PickupDetailsScreen';
import SchedulePickupScreen from '../screens/orders/SchedulePickupScreen';
import SavedAddressScreen from '../screens/SavedAddress/SavedAddressScreen';
import AddAddressScreen from '../screens/AddAddress/AddAddressScreen';
import EditAddressScreen from '../screens/EditAddress/EditAddressScreen';
import OrderDetailScreen from '../screens/OrderDetail/OrderDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const OrdersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="YourCart" component={YourCartScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="OrderPickedUp" component={OrderPickedUpScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
      <Stack.Screen name="PickupDetails" component={PickupDetailsScreen} />
      <Stack.Screen name="SchedulePickup" component={SchedulePickupScreen} />
      <Stack.Screen name="SavedAddress" component={SavedAddressScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="AddAddressDetails" component={AddAddressScreen} />
      <Stack.Screen name="EditAddress" component={EditAddressScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default OrdersStack;

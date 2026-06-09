import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import YourCartScreen from '../screens/YourCart/YourCartScreen';
import MyOrdersScreen from '../screens/MyOrders/MyOrdersScreen';
import OrderSummaryScreen from '../screens/OrderSummary/OrderSummaryScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmation/OrderConfirmationScreen';
import OrderPickedUpScreen from '../screens/orders/OrderPickedUpScreen';
import OrderTrackingScreen from '../screens/OrderTracking/OrderTrackingScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const OrdersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="YourCart" component={YourCartScreen} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="OrderPickedUp" component={OrderPickedUpScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
    </Stack.Navigator>
  );
};

export default OrdersStack;

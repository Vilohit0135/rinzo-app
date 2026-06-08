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

const Stack = createNativeStackNavigator<RootStackParamList>();

const OrdersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="YourCart" component={YourCartScreen} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="OrderPickedUp" component={OrderPickedUpScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
    </Stack.Navigator>
  );
};

export default OrdersStack;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookPickupScreen from '../screens/BookPickup/BookPickupScreen';
import SchedulePickupScreen from '../screens/SchedulePickup/SchedulePickupScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BookPickup" component={BookPickupScreen} />
        <Stack.Screen name="SchedulePickup" component={SchedulePickupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import SearchScreen from '../screens/Search/SearchScreen';
import LaundryDetailScreen from '../screens/LaundryDetail/LaundryDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="LaundryDetail" component={LaundryDetailScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;

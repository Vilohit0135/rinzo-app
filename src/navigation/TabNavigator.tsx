import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '../components/home/BottomTabBar';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import OrdersStack from './OrdersStack';
import ProfileStack from './ProfileStack';
import { TabBarProvider } from '../utils/TabBarContext';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <TabBarProvider>
      <Tab.Navigator
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="SearchTab" component={SearchStack} />
      <Tab.Screen name="OrdersTab" component={OrdersStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
      </Tab.Navigator>
    </TabBarProvider>
  );
};

export default TabNavigator;

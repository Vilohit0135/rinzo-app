import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/Splash/SplashScreen';
import OnboardingScreen1 from './src/screens/Onboarding/OnboardingScreen1';
import LocationAccessScreen from './src/screens/LocationAccess/LocationAccessScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import SearchScreen from './src/screens/Search/SearchScreen';
import YourCartScreen from './src/screens/YourCart/YourCartScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import SchedulePickupScreen from './src/screens/SchedulePickup/SchedulePickupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Splash"
          >
            {({ navigation }) => (
              <SplashScreen onFinish={() => navigation.replace('Onboarding')} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Onboarding"
          >
            {({ navigation }) => (
              <OnboardingScreen1 onNext={() => navigation.navigate('LocationAccess')} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="LocationAccess"
          >
            {({ navigation }) => (
              <LocationAccessScreen onNext={() => navigation.navigate('Login')} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Login"
          >
            {({ navigation }) => (
              <LoginScreen onLoginSuccess={() => navigation.replace('Home')} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            name="Search"
            component={SearchScreen}
          />

          <Stack.Screen
            name="YourCart"
            component={YourCartScreen}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
          />

          <Stack.Screen
            name="SchedulePickup"
            component={SchedulePickupScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

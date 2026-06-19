import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/types/navigation';
import { supabase } from './src/lib/supabase';
import { useAuthStore, BYPASS_AUTH } from './src/store/authStore';

import OnboardingScreenOne from './src/screens/Onboarding/OnboardingScreenOne';
import LocationAccessScreen from './src/screens/LocationAccess/LocationAccessScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import PhoneLoginScreen from './src/screens/Login/PhoneLoginScreen';
import OtpVerificationScreen from './src/screens/Auth/OtpVerificationScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
import TabNavigator from './src/navigation/TabNavigator';
import PushNotificationHandler from './src/components/notifications/PushNotificationHandler';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const initialize = useAuthStore((s) => s.initialize);
  const isLoading = useAuthStore((s) => s.isLoading);
  const session = useAuthStore((s) => s.session);
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    initialize();

    if (!supabase || BYPASS_AUTH) return;

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
          <ActivityIndicator size="large" color="#7C5CE6" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
          {session ? (
            <Stack.Screen name="Main" component={TabNavigator} />
          ) : (
            <>
              <Stack.Screen name="Onboarding">
                {({ navigation }) => (
                  <OnboardingScreenOne
                    onNext={() => navigation.navigate('LocationAccess')}
                    onSkip={() => navigation.navigate('LocationAccess')}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="LocationAccess">
                {({ navigation }) => (
                  <LocationAccessScreen onNext={() => navigation.navigate('Login')} />
                )}
              </Stack.Screen>

              <Stack.Screen name="Login">
                {({ navigation }) => (
                  <LoginScreen
                    onLoginSuccess={(phone) => navigation.navigate('OtpVerification', { phone })}
                    onSignupPress={() => navigation.navigate('Signup')}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="PhoneLogin">
                {({ navigation }) => (
                  <PhoneLoginScreen
                    onLoginSuccess={(phone) => navigation.navigate('OtpVerification', { phone })}
                    onEmailLoginPress={() => navigation.goBack()}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="Signup">
                {({ navigation }) => (
                  <SignupScreen
                    onSignupSuccess={() => navigation.goBack()}
                    onLoginPress={() => navigation.goBack()}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
            </>
          )}
        </Stack.Navigator>
        <PushNotificationHandler />
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}

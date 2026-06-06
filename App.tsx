import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/types/navigation';
import { supabase } from './src/lib/supabase';
import { useAuthStore } from './src/store/authStore';

import OnboardingScreenOne from './src/screens/Onboarding/OnboardingScreenOne';
import LocationAccessScreen from './src/screens/LocationAccess/LocationAccessScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import SearchScreen from './src/screens/Search/SearchScreen';
import YourCartScreen from './src/screens/YourCart/YourCartScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import PersonalInformationScreen from './src/screens/Profile/PersonalInformationScreen';
import FavouritesScreen from './src/screens/Profile/FavouritesScreen';
import PaymentMethodsScreen from './src/screens/PaymentMethods/PaymentMethodsScreen';
import MyReviewsScreen from './src/screens/Profile/MyReviewsScreen';
import HelpCenterScreen from './src/screens/Profile/HelpCenterScreen';
import ContactSupportScreen from './src/screens/Profile/ContactSupportScreen';
import TermsPrivacyScreen from './src/screens/Profile/TermsPrivacyScreen';
import HelpAndSupportScreen from './src/screens/support/HelpAndSupportScreen';
import ChatSupportScreen from './src/screens/support/ChatSupportScreen';
import ReportIssueScreen from './src/screens/support/ReportIssueScreen';
import NotificationsScreen from './src/screens/Notifications/NotificationsScreen';
import OffersScreen from './src/screens/Offers/OffersScreen';
import LaundryDetailScreen from './src/screens/LaundryDetail/LaundryDetailScreen';
import SavedAddressScreen from './src/screens/SavedAddress/SavedAddressScreen';
import AddAddressScreen from './src/screens/AddAddress/AddAddressScreen';
import EditAddressScreen from './src/screens/EditAddress/EditAddressScreen';
import MyOrdersScreen from './src/screens/MyOrders/MyOrdersScreen';
import OtpVerificationScreen from './src/screens/Auth/OtpVerificationScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
import BookPickupScreen from './src/screens/BookPickup/BookPickupScreen';
import PickupDetailsScreen from './src/screens/PickupDetails/PickupDetailsScreen';
import SchedulePickupScreen from './src/screens/orders/SchedulePickupScreen';
import OrderSummaryScreen from './src/screens/OrderSummary/OrderSummaryScreen';
import PaymentScreen from './src/screens/Payment/PaymentScreen';
import OrderConfirmationScreen from './src/screens/OrderConfirmation/OrderConfirmationScreen';
import OrderPickedUpScreen from './src/screens/orders/OrderPickedUpScreen';
import OrderTrackingScreen from './src/screens/OrderTracking/OrderTrackingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const initialize = useAuthStore((s) => s.initialize);
  const isLoading = useAuthStore((s) => s.isLoading);
  const session = useAuthStore((s) => s.session);
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    initialize();

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
          initialRouteName={session ? 'Home' : 'Onboarding'}
          screenOptions={{ headerShown: false }}
        >
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

          <Stack.Screen name="Signup">
            {({ navigation }) => (
              <SignupScreen
                onSignupSuccess={() => navigation.goBack()}
                onLoginPress={() => navigation.goBack()}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="YourCart" component={YourCartScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
          <Stack.Screen name="Favourites" component={FavouritesScreen} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
          <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
          <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
          <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
          <Stack.Screen name="TermsPrivacy" component={TermsPrivacyScreen} />
          <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} />
          <Stack.Screen name="ChatSupport" component={ChatSupportScreen} />
          <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Offers" component={OffersScreen} />
          <Stack.Screen name="LaundryDetail" component={LaundryDetailScreen} />
          <Stack.Screen name="SavedAddress" component={SavedAddressScreen} />
          <Stack.Screen name="AddAddress" component={AddAddressScreen} />
          <Stack.Screen name="AddAddressDetails" component={AddAddressScreen} />
          <Stack.Screen name="EditAddress" component={EditAddressScreen} />
          <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
          <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
          <Stack.Screen name="BookPickup" component={BookPickupScreen} />
          <Stack.Screen name="PickupDetails" component={PickupDetailsScreen} />
          <Stack.Screen name="SchedulePickup" component={SchedulePickupScreen} />
          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
          <Stack.Screen name="OrderPickedUp" component={OrderPickedUpScreen} />
          <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

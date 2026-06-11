import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import MyReviewsScreen from '../screens/Profile/MyReviewsScreen';
import PersonalInformationScreen from '../screens/Profile/PersonalInformationScreen';
import HelpCenterScreen from '../screens/Profile/HelpCenterScreen';
import ContactSupportScreen from '../screens/Profile/ContactSupportScreen';
import TermsPrivacyScreen from '../screens/Profile/TermsPrivacyScreen';
import PaymentMethodsScreen from '../screens/PaymentMethods/PaymentMethodsScreen';
import SavedAddressScreen from '../screens/SavedAddress/SavedAddressScreen';
import AddAddressScreen from '../screens/AddAddress/AddAddressScreen';
import EditAddressScreen from '../screens/EditAddress/EditAddressScreen';
import HelpAndSupportScreen from '../screens/support/HelpAndSupportScreen';
import ChatSupportScreen from '../screens/support/ChatSupportScreen';
import ReportIssueScreen from '../screens/support/ReportIssueScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
      <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
      <Stack.Screen name="TermsPrivacy" component={TermsPrivacyScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="SavedAddress" component={SavedAddressScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="AddAddressDetails" component={AddAddressScreen} />
      <Stack.Screen name="EditAddress" component={EditAddressScreen} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} />
      <Stack.Screen name="ChatSupport" component={ChatSupportScreen} />
      <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
      <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

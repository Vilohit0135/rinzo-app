import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Splash: undefined;
  HelpAndSupport: undefined;
  ChatSupport: undefined;
  ReportIssue: undefined;
  Notifications: undefined;
  Offers: undefined;
  Onboarding: undefined;
  OnboardingTwo: undefined;
  OnboardingThree: undefined;
  LocationAccess: undefined;
  Login: undefined;
  Main: undefined;
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  Favourites: undefined;
  MyReviews: undefined;
  HelpCenter: undefined;
  ContactSupport: undefined;
  TermsPrivacy: undefined;
  PersonalInformation: undefined;
  PaymentMethods: undefined;
  SavedAddress: undefined;
  AddAddress: undefined;
  AddAddressDetails: undefined;
  EditAddress: {
    index: number;
    addressType: string;
    title: string;
    address1: string;
    address2: string;
    contact: string;
    isDefault: boolean;
  };
  LaundryDetail: { id: string };
  MyOrders: { fromProfile?: boolean } | undefined;
  OtpVerification: { phone: string };
  Signup: undefined;
  AllServices: undefined;
  BookPickup: undefined;
  PickupDetails: undefined;
  SchedulePickup: undefined;
  OrderSummary: undefined;
  Payment: undefined;
  OrderConfirmation: undefined;
  OrderPickedUp: undefined;
  OrderTracking: { from?: string } | undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
  
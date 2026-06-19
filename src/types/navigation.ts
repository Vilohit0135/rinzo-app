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
  LaundryNearby: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  MyReviews: undefined;
  HelpCenter: undefined;
  ContactSupport: undefined;
  TermsPrivacy: undefined;
  PersonalInformation: undefined;
  PaymentMethods: undefined;
  SavedAddress: { selectMode?: boolean } | undefined;
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
  OrderDetail: { orderId: string };
  OrderSummaryDelivered: { orderId: string };
  OtpVerification: { phone: string };
  Signup: undefined;
  ForgotPassword: undefined;
  AllServices: { serviceId: string } | undefined;
  ServiceDetail: { serviceId: string; serviceTitle: string };
  BookPickup: undefined;
  PickupDetails: undefined;
  SchedulePickup: undefined;
  OrderSummary: undefined;
  Payment: undefined;
  OrderConfirmation: undefined;
  OrderPlaced: undefined;
  OrderPickedUp: undefined;
  OrderTracking: { from?: string } | undefined;
  ComingSoon: { title?: string; icon?: string; subtitle?: string } | undefined;
  LocationSelection: undefined;
  NotificationDetails: { notificationId: string };
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
  
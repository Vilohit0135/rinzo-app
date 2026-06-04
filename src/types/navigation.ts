import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  LocationAccess: undefined;
  Login: undefined;
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  Favourites: undefined;
  PersonalInformation: undefined;
  SavedAddress: undefined;
  AddAddress: undefined;
  LaundryDetail: { id: string };
  MyOrders: undefined;
  OtpVerification: undefined;
  Signup: undefined;
  BookPickup: undefined;
  PickupDetails: undefined;
  SchedulePickupTime: undefined;
  OrderSummary: undefined;
  Payment: undefined;
  OrderConfirmation: undefined;
  OrderTracking: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LaundryInfoCard from '../../components/cart/LaundryInfoCard';
import ServicesCard from '../../components/cart/ServicesCard';
import ClothesSummaryCard from '../../components/cart/ClothesSummaryCard';
import PickupDetailsCard from '../../components/cart/PickupDetailsCard';
import CouponSection from '../../components/cart/CouponSection';
import PriceSummary from '../../components/cart/PriceSummary';
import CheckoutButton from '../../components/cart/CheckoutButton';
import CartHeader from '../../components/cart/CartHeader';
import EmptyCartState from '../../components/cart/EmptyCartState';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { cartData } from '../../data/cart/cartData';
import { cartStateData } from '../../data/cart/cartStateData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  MyOrders: undefined;
  Profile: undefined;
};

const YourCartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'YourCart'>>();
  const { itemCount, title, subtitle } = cartStateData;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <CartHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.content}>
          {itemCount === 0 ? (
            <EmptyCartState title={title} subtitle={subtitle} />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
            >
              <LaundryInfoCard {...cartData.laundryInfo} />

              <View style={styles.sectionServices}>
                <Text style={styles.sectionTitle}>Services</Text>
                <ServicesCard services={cartData.services} />
              </View>

              <View style={styles.sectionClothes}>
                <Text style={styles.sectionTitle}>Clothes Summary</Text>
                <ClothesSummaryCard items={cartData.clothesSummary} />
              </View>

              <View style={styles.sectionPickup}>
                <Text style={styles.sectionTitle}>Pickup Details</Text>
                <PickupDetailsCard {...cartData.pickupDetails} />
              </View>

              <View style={styles.sectionCoupon}>
                <Text style={styles.sectionTitle}>Apply Coupon</Text>
                <CouponSection />
              </View>

              <View style={styles.sectionPricing}>
                <PriceSummary pricing={cartData.pricingSummary} />
              </View>

              <View style={styles.checkoutWrap}>
                <CheckoutButton />
              </View>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
      <BottomTabBar activeTab="Orders" onTabPress={(tab) => { if (tab === 'Home') navigation.navigate('Home'); if (tab === 'Search') navigation.navigate( 'Search'); if (tab === 'Profile') navigation.navigate('Profile'); }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 140,
  },
  sectionServices: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#20203A',
    marginBottom: 12,
  },
  sectionClothes: {
    marginTop: 28,
  },
  sectionPickup: {
    marginTop: 28,
  },
  sectionCoupon: {
    marginTop: 28,
  },
  sectionPricing: {
    marginTop: 28,
  },
  checkoutWrap: {
    marginTop: 20,
  },
});

export default YourCartScreen;


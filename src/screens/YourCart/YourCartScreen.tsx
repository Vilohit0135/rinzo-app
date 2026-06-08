import { useMemo, useState } from 'react';
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
import { useBookingStore, DELIVERY_CHARGE, DISCOUNT } from '../../store/bookingStore';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  MyOrders: undefined;
  Profile: undefined;
  OrderSummary: undefined;
};

const serviceImageMap: Record<string, any> = {
  'Wash & Fold': require('../../../assets/images/Home/wash-fold.png'),
  'Wash and Fold': require('../../../assets/images/Home/wash-fold.png'),
  'Iron Only': require('../../../assets/images/Home/iron-only.png'),
  'Dry Clean': require('../../../assets/images/Home/dry-only.png'),
};

const serviceIcons: Record<string, string> = {
  '1': 'shirt-outline',
  '2': 'sparkles-outline',
  '3': 'water-outline',
};

const YourCartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'YourCart'>>();
  const storeServices = useBookingStore((s) => s.services);
  const updateQuantity = useBookingStore((s) => s.updateQuantity);
  const address = useBookingStore((s) => s.address);
  const pickupDate = useBookingStore((s) => s.pickupDate);
  const pickupTime = useBookingStore((s) => s.pickupTime);

  const [clothes, setClothes] = useState(cartData.clothesSummary);

  const hasItems = storeServices.some((s) => s.quantity > 0);

  const services = useMemo(
    () =>
      storeServices
        .filter((s) => s.quantity > 0)
        .map((s) => ({
          id: s.id,
          name: s.title,
          price: `₹${s.unitPrice}/${s.unit}`,
          quantity: `${s.quantity} ${s.unit === 'Kg' ? 'kg' : 'items'}`,
          total: s.quantity * s.unitPrice,
          icon: serviceIcons[s.id] || 'shirt-outline',
        })),
    [storeServices]
  );

  const handleClothesQuantity = (name: string, qty: number) => {
    setClothes((prev) =>
      prev.map((c) => (c.name === name ? { ...c, quantity: Math.max(0, qty) } : c))
    );
  };

  const subtotal = useMemo(
    () => storeServices.reduce((sum, s) => sum + s.quantity * s.unitPrice, 0),
    [storeServices]
  );

  const total = subtotal + DELIVERY_CHARGE - DISCOUNT;

  const pickupLabel = pickupTime
    ? `${pickupTime}${pickupDate ? `, ${pickupDate}` : ''}`
    : 'Not selected';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <CartHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.content}>
          {!hasItems ? (
            <EmptyCartState
              title="Your cart is empty"
              subtitle="Looks like you haven't add any service yet"
            />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
            >
              <LaundryInfoCard {...cartData.laundryInfo} imageSource={require('../../../assets/images/Laundry/krishna-laundry.png')} />

              <View style={styles.sectionServices}>
                <Text style={styles.sectionTitle}>Services</Text>
                <ServicesCard services={services} onUpdateQuantity={updateQuantity} serviceImages={serviceImageMap} />
              </View>

              <View style={styles.sectionClothes}>
                <Text style={styles.sectionTitle}>Clothes Summary</Text>
                <ClothesSummaryCard items={clothes} onUpdateQuantity={handleClothesQuantity} />
              </View>

              <View style={styles.sectionPickup}>
                <Text style={styles.sectionTitle}>Pickup Details</Text>
                <PickupDetailsCard address={address} pickupTime={pickupLabel} />
              </View>

              <View style={styles.sectionCoupon}>
                <Text style={styles.sectionTitle}>Apply Coupon</Text>
                <CouponSection />
              </View>

              <View style={styles.sectionPricing}>
                <PriceSummary
                  pricing={{
                    subtotal,
                    deliveryCharge: DELIVERY_CHARGE,
                    discounts: [{ label: 'Discount', value: `-₹${DISCOUNT}` }],
                    total,
                  }}
                />
              </View>

              <View style={styles.checkoutWrap}>
                <CheckoutButton onPress={() => navigation.navigate('OrderSummary')} />
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

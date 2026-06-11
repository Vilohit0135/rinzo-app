import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import ScrollableScreen from '../../components/common/ScrollableScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import LaundryInfoCard from '../../components/cart/LaundryInfoCard';
import ServicesCard from '../../components/cart/ServicesCard';
import ClothesSummaryCard from '../../components/cart/ClothesSummaryCard';
import PickupDetailsCard from '../../components/cart/PickupDetailsCard';
import CouponSection from '../../components/cart/CouponSection';
import PriceSummary from '../../components/cart/PriceSummary';
import CheckoutButton from '../../components/cart/CheckoutButton';
import CartHeader from '../../components/cart/CartHeader';
import EmptyCartState from '../../components/cart/EmptyCartState';
import { COLORS } from '../../constants/colors';
import { cartData } from '../../data/cart/cartData';
import { useBookingStore, DELIVERY_CHARGE, calculateDiscount } from '../../store/bookingStore';
import Toast from 'react-native-toast-message';
import { laundryItems } from '../../data/laundry/laundryData';

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
  const appliedCoupon = useBookingStore((s) => s.appliedCoupon);
  const setAppliedCoupon = useBookingStore((s) => s.setAppliedCoupon);

  const [clothes, setClothes] = useState(cartData.clothesSummary);
  const [couponInput, setCouponInput] = useState('');

  const handleLaundryCardPress = () => {
    const targetLaundry = laundryItems.find(
      (l) => l.name === cartData.laundryInfo.name
    );
    const laundryId = targetLaundry ? targetLaundry.id : 'krishna-laundry';
    (navigation as any).navigate('HomeTab', {
      screen: 'LaundryDetail',
      params: { id: laundryId },
    });
  };

  const hasItems = storeServices.some((s) => s.quantity > 0);

  const services = useMemo(
    () =>
      storeServices
        .filter((s) => s.quantity > 0)
        .map((s) => ({
          id: s.id,
          name: s.title,
          price: `₹${s.unitPrice}/${s.unit}`,
          quantity: `${s.quantity} ${s.unit === 'Kg' ? 'kg' : 'itm'}`,
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

  const discountValue = useMemo(() => {
    return calculateDiscount(appliedCoupon, subtotal, storeServices);
  }, [appliedCoupon, subtotal, storeServices]);

  const total = Math.max(0, subtotal + DELIVERY_CHARGE - discountValue);

  const pickupLabel = pickupTime
    ? `${pickupTime}${pickupDate ? `, ${pickupDate}` : ''}`
    : 'Not selected';

  const handleCouponAction = () => {
    if (appliedCoupon) {
      setAppliedCoupon(null);
      setCouponInput('');
      Toast.show({
        type: 'info',
        text1: 'Coupon Removed',
        text2: 'The coupon discount has been removed.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } else {
      const code = couponInput.toUpperCase().trim();
      if (!code) {
        Toast.show({
          type: 'error',
          text1: 'Empty Code',
          text2: 'Please enter a coupon code.',
          position: 'bottom',
          visibilityTime: 2000,
        });
        return;
      }

      const validCodes = ['323232', 'FLAT20', 'FREESHIP', 'IRON15'];
      if (!validCodes.includes(code)) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Coupon',
          text2: `"${code}" is not a valid coupon code.`,
          position: 'bottom',
          visibilityTime: 2000,
        });
        return;
      }

      const calculated = calculateDiscount(code, subtotal, storeServices);
      if (code === 'FLAT20' && subtotal < 500) {
        Toast.show({
          type: 'error',
          text1: 'Criteria Not Met',
          text2: 'FLAT20 requires a minimum subtotal of ₹500.',
          position: 'bottom',
          visibilityTime: 2500,
        });
        return;
      }

      if (code === 'IRON15') {
        const ironService = storeServices.find((s) => s.id === '2' || s.title.toLowerCase().includes('iron'));
        if (!ironService || ironService.quantity === 0) {
          Toast.show({
            type: 'error',
            text1: 'Criteria Not Met',
            text2: 'IRON15 requires Iron Only services in your cart.',
            position: 'bottom',
            visibilityTime: 2500,
          });
          return;
        }
      }

      setAppliedCoupon(code);
      Toast.show({
        type: 'success',
        text1: 'Coupon Applied!',
        text2: `Successfully applied code "${code}". Discount: ₹${calculated}`,
        position: 'bottom',
        visibilityTime: 2500,
      });
    }
  };

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
<ScrollableScreen
    contentContainerStyle={styles.scroll}
>
              <LaundryInfoCard {...cartData.laundryInfo} imageSource={require('../../../assets/images/Laundry/krishna-laundry.png')} onPress={handleLaundryCardPress} />

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
                <PickupDetailsCard 
                  address={address} 
                  pickupTime={pickupLabel} 
                  onAddressPress={() => (navigation as any).navigate('SavedAddress', { selectMode: true })}
                  onTimePress={() => (navigation as any).navigate('SchedulePickup')}
                />
              </View>

              <View style={styles.sectionCoupon}>
                <Text style={styles.sectionTitle}>Apply Coupon</Text>
                <CouponSection 
                  value={couponInput}
                  onChangeText={setCouponInput}
                  appliedCoupon={appliedCoupon}
                  onApplyPress={handleCouponAction}
                />
              </View>

              <View style={styles.sectionPricing}>
                <PriceSummary
                  pricing={{
                    subtotal,
                    deliveryCharge: DELIVERY_CHARGE,
                    discounts: discountValue > 0 ? [{ label: appliedCoupon ? `Discount (${appliedCoupon})` : 'Discount', value: `-₹${discountValue}` }] : [],
                    total,
                  }}
                />
              </View>

              <View style={styles.checkoutWrap}>
                <CheckoutButton onPress={() => navigation.navigate('OrderSummary')} />
              </View>
            </ScrollableScreen>
          )}
        </View>
      </KeyboardAvoidingView>

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
    paddingHorizontal: scale(16),
  },
  content: {
    flex: 1,
  },
  scroll: {
    paddingBottom: verticalScale(140),
  },
  sectionServices: {
    marginTop: verticalScale(24),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#20203A',
    marginBottom: verticalScale(12),
  },
  sectionClothes: {
    marginTop: verticalScale(28),
  },
  sectionPickup: {
    marginTop: verticalScale(28),
  },
  sectionCoupon: {
    marginTop: verticalScale(28),
  },
  sectionPricing: {
    marginTop: verticalScale(28),
  },
  checkoutWrap: {
    marginTop: verticalScale(20),
  },
});

export default YourCartScreen;

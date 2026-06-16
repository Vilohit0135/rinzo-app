import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBar } from '../../utils/TabBarContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';
import { useOrderStore } from '../../store/orderStore';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderConfirmation'>;

const OrderConfirmationScreen = ({ navigation }: Props) => {
  const { setTabBarVisible } = useTabBar();
  const orderSavedRef = useRef(false);
  const pickupDate = useBookingStore((s) => s.pickupDate);
  const pickupTime = useBookingStore((s) => s.pickupTime);
  const orderId = useBookingStore((s) => s.orderId);
  const clearBooking = useBookingStore((s) => s.clear);
  const addOrder = useOrderStore((s) => s.addOrder);

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);

      if (!orderSavedRef.current && orderId) {
        orderSavedRef.current = true;
        const state = useBookingStore.getState();
        addOrder({
          id: state.orderId,
          status: 'ongoing',
          statusLabel: 'Order Confirmed',
          laundryName: state.laundryName,
          date: state.pickupDate && state.pickupTime
            ? `${state.pickupTime}, ${state.pickupDate}`
            : 'Tomorrow, 2:00–4:00 PM',
          amount: `₹${state.totalAmount}`,
          pickupDate: state.pickupDate,
          pickupTime: state.pickupTime,
          address: state.address,
          addressLabel: state.addressLabel,
          addressContact: state.addressContact,
          services: state.services
            .filter((s) => s.quantity > 0)
            .map((s) => ({
              title: s.title,
              quantity: s.quantity,
              unit: s.unit,
              price: s.unitPrice,
            })),
        });
        clearBooking();
      }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
  );

  const pickupDisplay = pickupDate && pickupTime
    ? `${pickupTime}, ${pickupDate}`
    : 'Tomorrow, 2:00–4:00 PM';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../../../assets/images/order-confirm.gif')}
            style={styles.gif}
            resizeMode="contain"
          />
          <Text style={styles.title} allowFontScaling={false}>
            Order Confirmation
          </Text>

          <Text style={styles.subtitle} allowFontScaling={false}>
            Your order has been placed successfully
          </Text>

          <View style={styles.detailCard}>
            <View style={styles.row}>
              <Text style={styles.rowLabel} allowFontScaling={false}>Order ID</Text>
              <Text style={styles.rowValue} allowFontScaling={false}>
                {orderId || 'R1212178173819'}
              </Text>
            </View>

            <View style={styles.divider} />

            <View>
              <Text style={styles.rowLabel} allowFontScaling={false}>Pickup Time</Text>
              <Text style={styles.timeValue} allowFontScaling={false}>
                {pickupDisplay}
              </Text>
            </View>
          </View>

          <Text style={styles.trackingMsg} allowFontScaling={false}>
            You can track your order in real time
          </Text>

          <TouchableOpacity
            style={styles.trackButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('OrderPickedUp')}
          >
            <LinearGradient
              colors={['#8259D2', '#8259D2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.trackGradient}
            >
              <Text style={styles.trackText} allowFontScaling={false}>
                Track Order
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            activeOpacity={0.7}
            onPress={() => (navigation as any).navigate('HomeTab', { screen: 'Home' })}
          >
            <Text style={styles.homeText} allowFontScaling={false}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1 },
  content: {
    flex: 1,
    top: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },

  gif: {
    width: scale(320),
    height: verticalScale(320),
    marginBottom: verticalScale(28),
  },
  title: {
    fontSize: responsiveFontSize(22),
    fontWeight: '700',
    color: '#1D1D1F',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: verticalScale(8),
    fontSize: responsiveFontSize(13),
    fontWeight: '500',
    color: '#9E9E9E',
    textAlign: 'center',
  },

  detailCard: {
    marginTop: verticalScale(20),
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECE8F6',
    borderRadius: scale(16),
    padding: scale(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
    marginBottom: verticalScale(17),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: '#1D1D1F',
  },
  rowValue: {
    fontSize: responsiveFontSize(13),
    fontWeight: '700',
    color: '#1D1D1F',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: verticalScale(10),
  },
  timeValue: {
    marginTop: verticalScale(4),
    fontSize: responsiveFontSize(13),
    fontWeight: '500',
    color: '#9E9E9E',
  },

  trackingMsg: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(10),
    fontSize: responsiveFontSize(13),
    fontWeight: '500',
    color: '#9E9E9E',
    textAlign: 'center',
  },

  trackButton: {
    marginTop: verticalScale(16),
    width: '100%',
    height: verticalScale(40),
  },
  trackGradient: {
    flex: 1,
    borderRadius: verticalScale(23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },

  homeButton: {
    marginTop: verticalScale(14),
    backgroundColor: 'transparent',
  },
  homeText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#3D2A85',
    textAlign: 'center',
  },
});

export default OrderConfirmationScreen;
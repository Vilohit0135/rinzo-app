import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBar } from '../../utils/TabBarContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import Svg, { Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';
import { useOrderStore } from '../../store/orderStore';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderConfirmation'>;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const OrderConfirmationScreen = ({ navigation }: Props) => {
  const { setTabBarVisible } = useTabBar();
  const orderSavedRef = useRef(false);
  const orderId = useBookingStore((s) => s.orderId);
  const clearBooking = useBookingStore((s) => s.clear);
  const addOrder = useOrderStore((s) => s.addOrder);

  // Local state to persist data for rendering after store clear
  const [localPickupDate, setLocalPickupDate] = useState('');
  const [localPickupTime, setLocalPickupTime] = useState('');
  const [localAddress, setLocalAddress] = useState('');
  const [localOrderId, setLocalOrderId] = useState('');

  // Hide bottom tab bar
  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        setTabBarVisible(false);
      }, 50);
      return () => {
        clearTimeout(timeout);
        setTabBarVisible(true);
      };
    }, [setTabBarVisible])
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTabBarVisible(false);
    }, 50);
    return () => {
      clearTimeout(timeout);
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);

  // Capture booking data, add order, and clear booking store
  useEffect(() => {
    if (!orderSavedRef.current && orderId) {
      orderSavedRef.current = true;
      const state = useBookingStore.getState();

      setLocalPickupDate(state.pickupDate);
      setLocalPickupTime(state.pickupTime);
      setLocalAddress(state.address);
      setLocalOrderId(state.orderId);

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
  }, [orderId, addOrder, clearBooking]);

  // Animations values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const ring1Scale = useRef(new Animated.Value(0.3)).current;
  const ring1Opacity = useRef(new Animated.Value(0)).current;
  const ring2Scale = useRef(new Animated.Value(0.3)).current;
  const ring2Opacity = useRef(new Animated.Value(0)).current;
  const tickDrawAnim = useRef(new Animated.Value(0)).current;
  const dotOpacity = useRef(new Animated.Value(0.4)).current;

  // Run animations on mount
  useEffect(() => {
    // Pulse animation for Live Tracker Dot
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // spring checkmark pop
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // ripple ring waves
    Animated.parallel([
      Animated.sequence([
        Animated.delay(100),
        Animated.parallel([
          Animated.timing(ring1Scale, {
            toValue: 1.45,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(ring1Opacity, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(ring1Opacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(300),
        Animated.parallel([
          Animated.timing(ring2Scale, {
            toValue: 1.6,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(ring2Opacity, {
            toValue: 0.35,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(ring2Opacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Checkmark draw animation
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(tickDrawAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, ring1Scale, ring1Opacity, ring2Scale, ring2Opacity, tickDrawAnim, dotOpacity]);

  const displayDate = localPickupDate || 'Monday, 12 Oct';
  const displayTime = localPickupTime || '08:00 - 10:00 AM';
  const displayAddress = localAddress || 'Flat 402, Skyline Residency, Plot 12, Sector 5, HSR Layout, Bangalore - 560102';
  const displayOrderId = localOrderId || 'LX-889240';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Google Pay Style Tick Animation Area */}
        <View style={styles.animationContainer}>
          {/* Ripple Ring 2 */}
          <Animated.View
            style={[
              styles.rippleRing,
              {
                transform: [{ scale: ring2Scale }],
                opacity: ring2Opacity,
                backgroundColor: 'rgba(124, 92, 230, 0.12)',
              },
            ]}
          />
          {/* Ripple Ring 1 */}
          <Animated.View
            style={[
              styles.rippleRing,
              {
                transform: [{ scale: ring1Scale }],
                opacity: ring1Opacity,
                backgroundColor: 'rgba(124, 92, 230, 0.18)',
              },
            ]}
          />
          {/* Bouncing checkmark circle */}
          <Animated.View
            style={[
              styles.mainCircle,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Svg width="30" height="30" viewBox="0 0 24 24">
              <AnimatedPath
                d="M5 12l5 5L20 7"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="40"
                strokeDashoffset={tickDrawAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                })}
              />
            </Svg>
          </Animated.View>
        </View>

        {/* Dynamic Titles */}
        <Text style={styles.successTitle} allowFontScaling={false}>
          Pickup Scheduled Successfully!
        </Text>
        <Text style={styles.orderIdSubtitle} allowFontScaling={false}>
          Order ID: <Text style={styles.orderIdHighlight}>#{displayOrderId}</Text>
        </Text>

        {/* Pickup Schedule Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="calendar-outline" size={18} color="#7C5CE6" style={styles.cardIcon} />
            <Text style={styles.cardTitle} allowFontScaling={false}>Pickup Schedule</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.cardRow}>
            <Text style={styles.rowLabel} allowFontScaling={false}>Date</Text>
            <Text style={styles.rowValue} allowFontScaling={false}>{displayDate}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.rowLabel} allowFontScaling={false}>Time Slot</Text>
            <Text style={styles.rowValue} allowFontScaling={false}>{displayTime}</Text>
          </View>
        </View>

        {/* Pickup Address Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={18} color="#7C5CE6" style={styles.cardIcon} />
            <Text style={styles.cardTitle} allowFontScaling={false}>Pickup Address</Text>
          </View>
          <View style={styles.addressBodyContainer}>
            <Text style={styles.addressBodyText} allowFontScaling={false}>
              {displayAddress}
            </Text>
          </View>
        </View>

        {/* Map Snapshot Card */}
        <View style={styles.mapCard}>
          <Image
            source={require('../../../assets/images/google-map.png')}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <View style={styles.trackerBadge}>
            <Animated.View style={[styles.trackerDot, { opacity: dotOpacity }]} />
            <Text style={styles.trackerText} allowFontScaling={false}>Live Tracker Enabled</Text>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.trackBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('OrderTracking')}
          >
            <Ionicons name="bus-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.trackBtnText} allowFontScaling={false}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            activeOpacity={0.8}
            onPress={() => (navigation as any).navigate('HomeTab', { screen: 'Home' })}
          >
            <Ionicons name="home-outline" size={18} color="#7C5CE6" style={styles.btnIcon} />
            <Text style={styles.homeBtnText} allowFontScaling={false}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(36),
    paddingBottom: verticalScale(40),
    alignItems: 'center',
  },
  animationContainer: {
    width: 150,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: verticalScale(12),
  },
  rippleRing: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  mainCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#7C5CE6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#7C5CE6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  successTitle: {
    fontSize: responsiveFontSize(21),
    fontWeight: '800',
    color: '#1C1C36',
    textAlign: 'center',
    lineHeight: responsiveFontSize(28),
  },
  orderIdSubtitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#6B7280',
    marginTop: verticalScale(6),
    marginBottom: verticalScale(24),
  },
  orderIdHighlight: {
    color: '#7C5CE6',
    fontWeight: '800',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(18),
    borderWidth: 1,
    borderColor: '#EBEBF0',
    marginBottom: verticalScale(16),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: scale(8),
  },
  cardTitle: {
    fontSize: responsiveFontSize(15),
    fontWeight: '800',
    color: '#1C1C36',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1F6',
    marginVertical: verticalScale(12),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(5),
  },
  rowLabel: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '600',
    color: '#9CA3AF',
  },
  rowValue: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '800',
    color: '#1C1C36',
  },
  addressBodyContainer: {
    marginTop: verticalScale(12),
  },
  addressBodyText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#4B5563',
    lineHeight: responsiveFontSize(20),
  },
  mapCard: {
    width: '100%',
    height: verticalScale(130),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EBEBF0',
    position: 'relative',
    marginBottom: verticalScale(24),
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  trackerBadge: {
    position: 'absolute',
    top: scale(12),
    right: scale(12),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(14),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBEBF0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  trackerDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: '#7C5CE6',
    marginRight: scale(6),
  },
  trackerText: {
    fontSize: responsiveFontSize(10.5),
    fontWeight: '800',
    color: '#4B5563',
  },
  buttonContainer: {
    width: '100%',
    gap: verticalScale(12),
  },
  trackBtn: {
    width: '100%',
    height: verticalScale(48),
    backgroundColor: '#7C5CE6',
    borderRadius: scale(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C5CE6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  trackBtnText: {
    fontSize: responsiveFontSize(15.5),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  homeBtn: {
    width: '100%',
    height: verticalScale(48),
    backgroundColor: '#F5F2FF',
    borderRadius: scale(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBEBF0',
  },
  homeBtnText: {
    fontSize: responsiveFontSize(15.5),
    fontWeight: '800',
    color: '#7C5CE6',
  },
  btnIcon: {
    marginRight: scale(6),
  },
});

export default OrderConfirmationScreen;
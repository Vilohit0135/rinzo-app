import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import * as Clipboard from 'expo-clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';
import { useTabBar } from '../../utils/TabBarContext';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderPlaced'>;

const OrderPlacedScreen = ({ navigation }: Props) => {
  const { setTabBarVisible } = useTabBar();

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
  const orderId = useBookingStore((s) => s.orderId) || 'ORD-2025-0842';
  const pickupDate = useBookingStore((s) => s.pickupDate) || 'Today';
  const pickupTime = useBookingStore((s) => s.pickupTime) || '2:00 PM - 3:00 PM';

  const copyToClipboard = async () => {
    const cleanId = orderId.startsWith('#') ? orderId : `#${orderId}`;
    await Clipboard.setStringAsync(cleanId);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Order ID copied to clipboard', ToastAndroid.SHORT);
    } else {
      Toast.show({
        type: 'success',
        text1: 'Copied!',
        text2: 'Order ID copied to clipboard',
        position: 'bottom',
      });
    }
  };

  const handleTrackYourOrder = () => {
    // Redirects to Pickup Scheduled Successfully screen (OrderConfirmation)
    navigation.navigate('OrderConfirmation');
  };

  const handleBackToHome = () => {
    // Navigate back to the home tab
    (navigation as any).navigate('HomeTab', { screen: 'Home' });
  };

  const formattedOrderId = orderId.startsWith('#') ? orderId : `#${orderId}`;

  // Formatted estimated pickup text
  const formattedPickup = `${pickupDate}, ${pickupTime}`;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Delivery Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/order-success.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Status Texts */}
        <Text style={styles.title} allowFontScaling={false}>
          Order Placed Successfully!
        </Text>
        <Text style={styles.subtitle} allowFontScaling={false}>
          Your laundry is in good hands. Our executive will arrive shortly for the pickup.
        </Text>

        {/* Info card */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel} allowFontScaling={false}>Order ID</Text>
            <TouchableOpacity
              style={styles.copyRow}
              activeOpacity={0.7}
              onPress={copyToClipboard}
            >
              <Text style={styles.orderIdText} allowFontScaling={false}>{formattedOrderId}</Text>
              <Ionicons name="copy-outline" size={16} color="#1E1E2D" style={styles.copyIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.pickupRow}>
            <View style={styles.clockIconWrap}>
              <Ionicons name="time-outline" size={20} color="#845DF1" />
            </View>
            <View style={styles.pickupTextWrap}>
              <Text style={styles.estimatedLabel} allowFontScaling={false}>Estimated Pickup</Text>
              <Text style={styles.estimatedValue} allowFontScaling={false}>{formattedPickup}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.trackBtn}
            activeOpacity={0.85}
            onPress={handleTrackYourOrder}
          >
            <Text style={styles.trackBtnText} allowFontScaling={false}>Track Your Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            activeOpacity={0.85}
            onPress={handleBackToHome}
          >
            <Text style={styles.homeBtnText} allowFontScaling={false}>Back to Home</Text>
          </TouchableOpacity>
        </View>

        {/* Safety Badge */}
        <View style={styles.safetyBadge}>
          <Ionicons name="shield-checkmark-outline" size={14} color="#9CA3AF" />
          <Text style={styles.safetyText} allowFontScaling={false}>Safe & Secure Pickup Verified</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFD',
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(30),
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: verticalScale(30),
    width: scale(260),
    height: scale(260),
    borderRadius: scale(130),
    backgroundColor: '#E2F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: responsiveFontSize(20),
    fontWeight: '800',
    color: '#1C1C30',
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
  subtitle: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: responsiveFontSize(19),
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#EFEFF4',
    padding: scale(16),
    marginTop: verticalScale(28),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(4),
  },
  cardLabel: {
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
    color: '#6B7280',
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIdText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#845DF1',
  },
  copyIcon: {
    marginLeft: scale(6),
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1F6',
    marginVertical: verticalScale(12),
  },
  pickupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(4),
  },
  clockIconWrap: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  pickupTextWrap: {
    flex: 1,
  },
  estimatedLabel: {
    fontSize: responsiveFontSize(12),
    fontWeight: '600',
    color: '#9CA3AF',
  },
  estimatedValue: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '700',
    color: '#1C1C30',
    marginTop: verticalScale(2),
  },
  buttonContainer: {
    width: '100%',
    marginTop: verticalScale(28),
    gap: verticalScale(12),
  },
  trackBtn: {
    backgroundColor: '#845DF1',
    borderRadius: moderateScale(14),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackBtnText: {
    fontSize: responsiveFontSize(15.5),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  homeBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(14),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEFF4',
  },
  homeBtnText: {
    fontSize: responsiveFontSize(15.5),
    fontWeight: '700',
    color: '#4B5563',
  },
  safetyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(24),
  },
  safetyText: {
    fontSize: responsiveFontSize(11),
    color: '#9CA3AF',
    fontWeight: '500',
    marginLeft: scale(4),
  },
});

export default OrderPlacedScreen;

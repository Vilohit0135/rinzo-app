import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  Animated,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBar } from '../../utils/TabBarContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore } from '../../store/bookingStore';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderTracking'>;

const { height: screenHeight } = Dimensions.get('window');

const OrderTrackingScreen = ({ navigation, route }: Props) => {
  const { setTabBarVisible } = useTabBar();
  const bookingOrderId = useBookingStore((s) => s.orderId) || 'ORD-2025-001';
  const orderId = route.params?.orderId || bookingOrderId;

  // Hide bottom tab bar on focus with timeout to prevent navigation race condition
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

  // Pulsing active tracker dot
  const dotOpacity = React.useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
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
  }, [dotOpacity]);

  // Flow redirect timers
  useEffect(() => {
    const flow = route.params?.flow || 'checkout';
    
    if (flow === 'checkout') {
      // After 5 seconds, redirect to Pickup Scheduled Success (OrderConfirmation)
      const timer = setTimeout(() => {
        navigation.navigate('OrderConfirmation');
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      // After 5 seconds, redirect to Order Delivery Success (OrderSummaryDelivered)
      const timer = setTimeout(() => {
        navigation.navigate('OrderSummaryDelivered', { orderId });
      }, 5000); // Set to 5 seconds for snappy testing of the success screen redirection
      return () => clearTimeout(timer);
    }
  }, [navigation, orderId, route.params?.flow]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="#1E1E2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>
          Order Tracking
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Order Info Subheader Row */}
      <View style={styles.subheaderRow}>
        <Text style={styles.orderIdText} allowFontScaling={false}>
          #{orderId}
        </Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText} allowFontScaling={false}>
            ON THE WAY
          </Text>
        </View>
      </View>

      {/* Map Background Container */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../../../assets/images/google-map.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Raider Details Panel */}
      <View style={styles.bottomPanel}>
        {/* Grabber Line Handle */}
        <View style={styles.panelHandle} />

        {/* Raider Profile Info Row */}
        <View style={styles.raiderRow}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150' }}
              style={styles.avatar}
            />
            <View style={styles.activeDot} />
          </View>
          <View style={styles.raiderTextCol}>
            <Text style={styles.raiderLabel} allowFontScaling={false}>Your Raider</Text>
            <Text style={styles.raiderName} allowFontScaling={false}>Rahul Sharma</Text>
          </View>
          <TouchableOpacity
            style={styles.callButton}
            activeOpacity={0.8}
            onPress={() => Linking.openURL('tel:+919876543210').catch(err => console.error("Failed to open dialer", err))}
          >
            <Ionicons name="call" size={18} color="#7C5CE6" />
          </TouchableOpacity>
        </View>

        {/* Uber-style PIN Section */}
        <View style={styles.pinRow}>
          <Text style={styles.pinLabel} allowFontScaling={false}>PIN for this trip</Text>
          <View style={styles.pinContainer}>
            {['5', '8', '2', '4'].map((digit, idx) => (
              <View key={idx} style={styles.pinBox}>
                <Text style={styles.pinText} allowFontScaling={false}>{digit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Estimated Arrival Time Card */}
        <View style={styles.arrivalCard}>
          <Ionicons name="time" size={20} color="#7C5CE6" style={styles.arrivalIcon} />
          <View style={styles.arrivalTextCol}>
            <Text style={styles.arrivalLabel} allowFontScaling={false}>Estimated Arrival</Text>
            <Text style={styles.arrivalTime} allowFontScaling={false}>About 30 minutes</Text>
          </View>
        </View>

        {/* Vertical Progress Timeline */}
        <View style={styles.timelineContainer}>
          {/* Step 1: Pickup Location */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeftCol}>
              <View style={styles.greenOutlineCircle} />
              <View style={styles.solidLine} />
            </View>
            <View style={styles.timelineMiddleCol}>
              <Text style={styles.stepLabel} allowFontScaling={false}>Pickup Location</Text>
              <Text style={styles.stepMainText} allowFontScaling={false}>24, 10th Main Rd, Indiranagar</Text>
            </View>
            <View style={styles.timelineRightCol}>
              <Text style={styles.stepTime} allowFontScaling={false}>12:30 PM</Text>
            </View>
          </View>

          {/* Step 2: On the way */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeftCol}>
              <View style={styles.purpleSolidCircle} />
              <View style={styles.dashedLine} />
            </View>
            <View style={styles.timelineMiddleCol}>
              <Text style={styles.stepLabelActive} allowFontScaling={false}>On the way</Text>
              <Text style={styles.stepSubTextActive} allowFontScaling={false}>Driver is heading to you</Text>
            </View>
            <View style={styles.timelineRightCol}>
              <Text style={styles.stepTime} allowFontScaling={false}>12:45 PM</Text>
            </View>
          </View>

          {/* Step 3: Delivery to you */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeftCol}>
              <View style={styles.greySolidCircle} />
            </View>
            <View style={styles.timelineMiddleCol}>
              <Text style={styles.stepLabelPending} allowFontScaling={false}>Delivery to you</Text>
            </View>
            <View style={styles.timelineRightCol}>
              <Text style={styles.stepTime} allowFontScaling={false}>1:00 PM</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(14),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F6',
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBEBF0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '800',
    color: '#1E1E2D',
  },
  headerSpacer: {
    width: scale(36),
  },
  subheaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F6',
  },
  orderIdText: {
    fontSize: responsiveFontSize(15.5),
    fontWeight: '800',
    color: '#1E1E2D',
  },
  statusBadge: {
    backgroundColor: '#E6F7F0',
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
  },
  statusBadgeText: {
    fontSize: responsiveFontSize(10.5),
    fontWeight: '800',
    color: '#10B981',
    letterSpacing: 0.3,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    height: screenHeight * 0.45,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  bottomPanel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(10),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(34) : verticalScale(20),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 10,
  },
  panelHandle: {
    width: scale(40),
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: verticalScale(16),
  },
  raiderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: scale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: '#EBEBF0',
  },
  pinLabel: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '700',
    color: '#4B5563',
  },
  pinContainer: {
    flexDirection: 'row',
    gap: scale(6),
  },
  pinBox: {
    width: scale(26),
    height: scale(26),
    backgroundColor: '#172135',
    borderRadius: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(13.5),
    fontWeight: '800',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: scale(12),
  },
  avatar: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  activeDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  raiderTextCol: {
    flex: 1,
  },
  raiderLabel: {
    fontSize: responsiveFontSize(11.5),
    fontWeight: '600',
    color: '#9CA3AF',
  },
  raiderName: {
    fontSize: responsiveFontSize(16),
    fontWeight: '800',
    color: '#1E1E2D',
    marginTop: verticalScale(2),
  },
  callButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrivalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F2FF',
    borderRadius: scale(14),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderWidth: 1,
    borderColor: '#EFEAFB',
    marginBottom: verticalScale(20),
  },
  arrivalIcon: {
    marginRight: scale(12),
  },
  arrivalTextCol: {
    flex: 1,
  },
  arrivalLabel: {
    fontSize: responsiveFontSize(11.5),
    fontWeight: '600',
    color: '#9CA3AF',
  },
  arrivalTime: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '800',
    color: '#7C5CE6',
    marginTop: verticalScale(2),
  },
  timelineContainer: {
    width: '100%',
    paddingBottom: verticalScale(10),
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(20),
  },
  timelineLeftCol: {
    width: scale(30),
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },
  timelineMiddleCol: {
    flex: 1,
    paddingLeft: scale(8),
  },
  timelineRightCol: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  greenOutlineCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#10B981',
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  purpleSolidCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#7C5CE6',
    zIndex: 2,
  },
  greySolidCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E5E7EB',
    zIndex: 2,
  },
  solidLine: {
    width: 2,
    position: 'absolute',
    top: 14,
    bottom: -24,
    backgroundColor: '#10B981',
    zIndex: 1,
  },
  dashedLine: {
    width: 1,
    position: 'absolute',
    top: 14,
    bottom: -24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 0.1,
    zIndex: 1,
  },
  stepLabel: {
    fontSize: responsiveFontSize(11.5),
    fontWeight: '600',
    color: '#9CA3AF',
  },
  stepMainText: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '700',
    color: '#1E1E2D',
    marginTop: verticalScale(2),
  },
  stepLabelActive: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '800',
    color: '#7C5CE6',
  },
  stepSubTextActive: {
    fontSize: responsiveFontSize(12.5),
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: verticalScale(2),
  },
  stepLabelPending: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#9CA3AF',
  },
  stepTime: {
    fontSize: responsiveFontSize(11.5),
    fontWeight: '600',
    color: '#9CA3AF',
  },
});

export default OrderTrackingScreen;

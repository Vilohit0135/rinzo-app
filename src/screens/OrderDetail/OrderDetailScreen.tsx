import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBar } from '../../utils/TabBarContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useOrderStore } from '../../store/orderStore';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetail'>;

interface TimelineStepProps {
  stepNum: number;
  label: string;
  subtitle: string;
  isCompleted: boolean;
  isActive: boolean;
  iconName: string;
  isLast?: boolean;
}

const TimelineStep = ({
  stepNum,
  label,
  subtitle,
  isCompleted,
  isActive,
  iconName,
  isLast = false,
}: TimelineStepProps) => {
  return (
    <View style={styles.timelineStepRow}>
      {/* Indicator Column */}
      <View style={styles.indicatorCol}>
        <View
          style={[
            styles.timelineCircle,
            isCompleted && styles.circleCompleted,
            isActive && styles.circleActive,
            !isCompleted && !isActive && styles.circlePending,
          ]}
        >
          <Ionicons
            name={iconName as any}
            size={isCompleted ? 14 : isActive ? 16 : 14}
            color={isCompleted || isActive ? '#FFFFFF' : '#A0A0B0'}
          />
        </View>
        {!isLast && (
          <View
            style={[
              styles.timelineLine,
              isCompleted && styles.lineCompleted,
            ]}
          />
        )}
      </View>

      {/* Content Column */}
      <View style={styles.stepContentCol}>
        <Text
          style={[
            styles.stepLabel,
            isActive && styles.stepLabelActive,
            !isCompleted && !isActive && styles.stepLabelPending,
          ]}
          allowFontScaling={false}
        >
          {label}
        </Text>
        {subtitle ? (
          <Text style={styles.stepSubtitle} allowFontScaling={false}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const OrderDetailScreen = ({ route, navigation }: Props) => {
  const { setTabBarVisible } = useTabBar();
  const { orderId } = route.params;
  const orders = useOrderStore((s) => s.orders);
  const order = orders.find((o) => o.id === orderId);

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

  // Fallback Mock Order details if not found in store
  const defaultOrder = {
    id: 'RZ12345',
    status: 'ongoing' as const,
    statusLabel: 'Washing in Progress',
    laundryName: 'Krishna Laundry',
    date: 'Today, 6:30 PM',
    amount: '₹200',
    pickupDate: 'Today',
    pickupTime: '10:15 AM',
    address: '123 Lavender Lane, Indiranagar, Bangalore, 560038',
    addressLabel: 'Home',
    addressContact: '+91 98765 43210',
    services: [
      { title: 'Wash & Fold', quantity: 5, unit: 'kg', price: 30 },
      { title: 'Steam Ironing', quantity: 3, unit: 'shirts', price: 10 },
    ],
  };

  const displayOrder = order || defaultOrder;

  // Compute pricing totals
  const subtotal = displayOrder.services.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalNum =
    parseInt(displayOrder.amount.replace(/[^0-9]/g, ''), 10) || 200;
  const taxAndServiceFee = Math.max(0, totalNum - subtotal);

  // Map order status to progress timeline steps
  let activeStep = 3; // Default to Washing in Progress
  if (displayOrder.status === 'completed') {
    activeStep = 5;
  } else if (displayOrder.status === 'cancelled') {
    activeStep = 1;
  } else {
    const label = displayOrder.statusLabel.toLowerCase();
    if (label.includes('placed') || label.includes('confirmed')) {
      activeStep = 1;
    } else if (label.includes('pick') || label.includes('picked')) {
      activeStep = 2;
    } else if (label.includes('wash') || label.includes('progress')) {
      activeStep = 3;
    } else if (label.includes('delivery') || label.includes('out')) {
      activeStep = 4;
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#8259D2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>
          Order Detail
        </Text>
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('ComingSoon', {
              title: 'Order Options',
              icon: 'ellipsis-vertical-outline',
            })
          }
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#8259D2" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Card 1: Rider Illustration Banner */}
        <View style={styles.card}>
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../../../assets/images/order/order-detail.png')}
              style={styles.riderImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle} allowFontScaling={false}>
              {displayOrder.statusLabel}
            </Text>
            <Text style={styles.statusDescription} allowFontScaling={false}>
              Your order #{displayOrder.id} is being treated with care at{' '}
              {displayOrder.laundryName}.
            </Text>
            <View style={styles.deliveryTimeRow}>
              <Ionicons name="time-outline" size={16} color="#8259D2" />
              <Text style={styles.deliveryTimeText} allowFontScaling={false}>
                Estimated Delivery: {displayOrder.pickupDate ? 'Today' : 'Tomorrow'}, 6:30 PM
              </Text>
            </View>
          </View>
        </View>

        {/* Card 2: Live Progress Stepper */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle} allowFontScaling={false}>
            LIVE PROGRESS
          </Text>

          <TimelineStep
            stepNum={1}
            label="Order Placed"
            subtitle="Today, 10:15 AM"
            isCompleted={activeStep > 1}
            isActive={activeStep === 1}
            iconName="checkmark"
          />

          <TimelineStep
            stepNum={2}
            label="Picked Up"
            subtitle="Today, 11:30 AM"
            isCompleted={activeStep > 2}
            isActive={activeStep === 2}
            iconName="checkmark"
          />

          <TimelineStep
            stepNum={3}
            label="Washing in Progress"
            subtitle="Your clothes are currently in the machine."
            isCompleted={activeStep > 3}
            isActive={activeStep === 3}
            iconName="shirt-outline"
          />

          <TimelineStep
            stepNum={4}
            label="Out for Delivery"
            subtitle="Expected by 5:45 PM"
            isCompleted={activeStep > 4}
            isActive={activeStep === 4}
            iconName="bus-outline"
          />

          <TimelineStep
            stepNum={5}
            label="Delivered"
            subtitle="Estimated by 6:30 PM"
            isCompleted={activeStep > 5}
            isActive={activeStep === 5}
            iconName="checkmark-done"
            isLast={true}
          />
        </View>

        {/* Card 3: Invoice Card */}
        <View style={styles.card}>
          <View style={styles.laundryHeaderRow}>
            <Text style={styles.laundryName} allowFontScaling={false}>
              {displayOrder.laundryName}
            </Text>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText} allowFontScaling={false}>
                Premium Care
              </Text>
            </View>
          </View>
          <Text style={styles.invoiceOrderId} allowFontScaling={false}>
            Order #{displayOrder.id}
          </Text>

          {/* Items List */}
          {displayOrder.services.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName} allowFontScaling={false}>
                {item.title} ({item.quantity} {item.unit})
              </Text>
              <Text style={styles.itemPrice} allowFontScaling={false}>
                ₹{item.price * item.quantity}
              </Text>
            </View>
          ))}

          {/* Dotted Line */}
          <View style={styles.dottedDivider} />

          {/* Financial Breakdown */}
          <View style={styles.financeRow}>
            <Text style={styles.financeLabel} allowFontScaling={false}>
              Subtotal
            </Text>
            <Text style={styles.financeValue} allowFontScaling={false}>
              ₹{subtotal}
            </Text>
          </View>
          <View style={styles.financeRow}>
            <Text style={styles.financeLabel} allowFontScaling={false}>
              Tax & Service Fee
            </Text>
            <Text style={styles.financeValue} allowFontScaling={false}>
              ₹{taxAndServiceFee}
            </Text>
          </View>

          {/* Dotted Line */}
          <View style={styles.dottedDivider} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel} allowFontScaling={false}>
              Total Amount
            </Text>
            <Text style={styles.totalValue} allowFontScaling={false}>
              ₹ {totalNum}
            </Text>
          </View>
        </View>

        {/* Card 4: Address Details */}
        <View style={styles.card}>
          {/* Pickup Address Row */}
          <View style={styles.addressRow}>
            <View style={styles.addressIconContainer}>
              <Ionicons name="location-outline" size={18} color="#8259D2" />
            </View>
            <View style={styles.addressTextCol}>
              <Text style={styles.addressHeader} allowFontScaling={false}>
                PICKUP ADDRESS
              </Text>
              <Text style={styles.addressText} allowFontScaling={false}>
                {displayOrder.address ||
                  '123 Lavender Lane, Indiranagar, Bangalore, 560038'}
              </Text>
            </View>
          </View>

          {/* Space between */}
          <View style={styles.addressSpacing} />

          {/* Delivery Address Row */}
          <View style={styles.addressRow}>
            <View style={styles.addressIconContainer}>
              <Ionicons name="home-outline" size={18} color="#8259D2" />
            </View>
            <View style={styles.addressTextCol}>
              <Text style={styles.addressHeader} allowFontScaling={false}>
                DELIVERY ADDRESS
              </Text>
              <Text style={styles.addressText} allowFontScaling={false}>
                Suite 405, Prestige Towers, MG Road, Bangalore, 560001
              </Text>
            </View>
          </View>
        </View>

        {/* Card 5: Need Help Banner */}
        <TouchableOpacity
          style={styles.helpBanner}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('HelpAndSupport')}
        >
          <Ionicons name="headset-outline" size={18} color="#8259D2" />
          <Text style={styles.helpBannerText} allowFontScaling={false}>
            NEED HELP WITH THIS ORDER?
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating CTA Bottom Button */}
      <View style={styles.ctaBottomPanel}>
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OrderTracking')}
        >
          <Ionicons name="map-outline" size={18} color="#FFFFFF" />
          <Text style={styles.ctaText} allowFontScaling={false}>
            Track Executive on Map
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFE',
  },
  header: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F6',
  },
  headerBtn: {
    width: scale(36),
    height: scale(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(18),
  },
  headerTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '800',
    color: '#1C1C38',
  },
  scrollContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(100),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(18),
    borderWidth: 1,
    borderColor: '#EBEBF0',
    overflow: 'hidden',
    marginBottom: verticalScale(16),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(18),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1.5,
  },
  illustrationContainer: {
    backgroundColor: '#E8EFFF',
    marginHorizontal: scale(-20),
    marginTop: verticalScale(-18),
    height: verticalScale(200),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  riderImage: {
    width: '100%',
    height: '100%',
  },
  statusTextContainer: {
    alignItems: 'center',
    paddingTop: verticalScale(18),
  },
  statusTitle: {
    fontSize: responsiveFontSize(19),
    fontWeight: '800',
    color: '#1C1C38',
    marginBottom: verticalScale(8),
  },
  statusDescription: {
    fontSize: responsiveFontSize(12.5),
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: verticalScale(16),
  },
  deliveryTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2EFFF',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
    borderRadius: 20,
  },
  deliveryTimeText: {
    fontSize: responsiveFontSize(12.5),
    fontWeight: '700',
    color: '#8259D2',
    marginLeft: scale(6),
  },
  cardSectionTitle: {
    fontSize: responsiveFontSize(11.5),
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    marginBottom: verticalScale(20),
  },
  timelineStepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: verticalScale(60),
  },
  indicatorCol: {
    width: scale(36),
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },
  timelineCircle: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  circleCompleted: {
    backgroundColor: '#8259D2',
  },
  circleActive: {
    backgroundColor: '#8259D2',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#8259D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  circlePending: {
    backgroundColor: '#F1F1F6',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  timelineLine: {
    width: 2,
    position: 'absolute',
    top: scale(28),
    bottom: verticalScale(-20),
    backgroundColor: '#E5E7EB',
    zIndex: 1,
  },
  lineCompleted: {
    backgroundColor: '#8259D2',
  },
  stepContentCol: {
    flex: 1,
    paddingLeft: scale(10),
    paddingTop: verticalScale(2),
  },
  stepLabel: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '800',
    color: '#1C1C38',
  },
  stepLabelActive: {
    color: '#8259D2',
  },
  stepLabelPending: {
    color: '#9CA3AF',
    fontWeight: '600',
  },
  stepSubtitle: {
    fontSize: responsiveFontSize(12),
    fontWeight: '500',
    color: '#6B7280',
    marginTop: verticalScale(4),
    lineHeight: 16,
  },
  laundryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  laundryName: {
    fontSize: responsiveFontSize(17),
    fontWeight: '800',
    color: '#1C1C38',
  },
  premiumBadge: {
    backgroundColor: '#8259D2',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(10),
  },
  premiumBadgeText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(10.5),
    fontWeight: '700',
  },
  invoiceOrderId: {
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: verticalScale(4),
    marginBottom: verticalScale(16),
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(6),
  },
  itemName: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#4B5563',
  },
  itemPrice: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#1C1C38',
  },
  dottedDivider: {
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    marginVertical: verticalScale(14),
    borderRadius: 0.1,
  },
  financeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
  },
  financeLabel: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '600',
    color: '#9CA3AF',
  },
  financeValue: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#1C1C38',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(2),
  },
  totalLabel: {
    fontSize: responsiveFontSize(16),
    fontWeight: '800',
    color: '#1C1C38',
  },
  totalValue: {
    fontSize: responsiveFontSize(18),
    fontWeight: '800',
    color: '#8259D2',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#F2EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  addressTextCol: {
    flex: 1,
  },
  addressHeader: {
    fontSize: responsiveFontSize(10.5),
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: verticalScale(4),
  },
  addressText: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '600',
    color: '#4B5563',
    lineHeight: 18,
  },
  addressSpacing: {
    height: verticalScale(16),
  },
  helpBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8EFFF',
    borderRadius: scale(14),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
    gap: scale(8),
    marginBottom: verticalScale(20),
  },
  helpBannerText: {
    fontSize: responsiveFontSize(12.5),
    fontWeight: '800',
    color: '#8259D2',
    letterSpacing: 0.3,
  },
  ctaBottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F6',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 5,
  },
  ctaButton: {
    backgroundColor: '#8259D2',
    borderRadius: scale(14),
    height: verticalScale(48),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(15),
    fontWeight: '800',
  },
});

export default OrderDetailScreen;

import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Linking,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBar } from '../../utils/TabBarContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import Svg, { Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

const AnimatedPath = Animated.createAnimatedComponent(Path);
import { useOrderStore } from '../../store/orderStore';
import { useReviewStore } from '../../store/reviewStore';
import { laundryItems } from '../../data/laundry/laundryData';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderSummaryDelivered'>;

const OrderSummaryDeliveredScreen = ({ route, navigation }: Props) => {
  const { orderId } = route.params;
  const { setTabBarVisible } = useTabBar();
  const orders = useOrderStore((s) => s.orders);
  const order = orders.find((o) => o.id === orderId);
  const addReview = useReviewStore((s) => s.addReview);

  // Ensure bottom tab bar is visible on Order Summary Delivered screen
  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(true);
    }, [setTabBarVisible])
  );

  // Animations values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const ring1Scale = useRef(new Animated.Value(0.3)).current;
  const ring1Opacity = useRef(new Animated.Value(0)).current;
  const ring2Scale = useRef(new Animated.Value(0.3)).current;
  const ring2Opacity = useRef(new Animated.Value(0)).current;
  const tickDrawAnim = useRef(new Animated.Value(0)).current;

  // Run animations on mount
  useEffect(() => {
    // spring checkmark pop (snappy and normal)
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // ripple ring waves (loops continuously at normal speed)
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(ring1Scale, { toValue: 0.3, duration: 0, useNativeDriver: true }),
            Animated.timing(ring1Opacity, { toValue: 0, duration: 0, useNativeDriver: true }),
          ]),
          Animated.delay(100),
          Animated.parallel([
            Animated.timing(ring1Scale, {
              toValue: 1.45,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(ring1Opacity, {
              toValue: 0.5,
              duration: 250,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(ring1Opacity, {
            toValue: 0,
            duration: 750,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(ring2Scale, { toValue: 0.3, duration: 0, useNativeDriver: true }),
            Animated.timing(ring2Opacity, { toValue: 0, duration: 0, useNativeDriver: true }),
          ]),
          Animated.delay(400),
          Animated.parallel([
            Animated.timing(ring2Scale, {
              toValue: 1.6,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(ring2Opacity, {
              toValue: 0.35,
              duration: 250,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(ring2Opacity, {
            toValue: 0,
            duration: 750,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Checkmark draw animation (starts drawing right after pop, draws smoothly over 1.2 seconds)
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(tickDrawAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, ring1Scale, ring1Opacity, ring2Scale, ring2Opacity, tickDrawAnim]);

  // Local state for star ratings and feedback text
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState<boolean>(false);

  // Fallback Mock Order details if not found in store
  const defaultOrder = {
    id: 'RZ12346',
    status: 'completed' as const,
    statusLabel: 'Delivered',
    laundryName: 'Krishna Laundry',
    date: '24 Oct 2023 at 04:20 PM',
    amount: '₹320',
    pickupDate: '24 Oct 2023',
    pickupTime: '04:20 PM',
    address: '123 Lavender Lane, Indiranagar, Bangalore, 560038',
    addressLabel: 'Home',
    addressContact: '+91 98765 43210',
    services: [
      { title: 'Wash & Fold', quantity: 5, unit: 'kg', price: 30, desc: 'Premium detergent used', icon: 'shirt-outline' },
      { title: 'Steam Ironing', quantity: 5, unit: 'shirts', price: 30, desc: 'Crisp hanger finish', icon: 'water-outline' },
    ],
  };

  const displayOrder = order || defaultOrder;

  // Add mock icons/descriptions to services if not present
  const servicesList = displayOrder.services.map((item, idx) => ({
    ...item,
    desc: (item as any).desc || (idx === 0 ? 'Premium detergent used' : 'Crisp hanger finish'),
    icon: (item as any).icon || (idx === 0 ? 'shirt-outline' : 'water-outline'),
  }));

  // Compute pricing totals
  const subtotal = servicesList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalNum =
    parseInt(displayOrder.amount.replace(/[^0-9]/g, ''), 10) || 320;
  const taxAndServiceFee = Math.max(0, totalNum - subtotal);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
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
            Order Summary
          </Text>
          <TouchableOpacity
            style={styles.headerBtn}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('ComingSoon', {
                title: 'User Profile',
                icon: 'person-circle-outline',
              })
            }
          >
            <Ionicons name="person-circle-outline" size={24} color="#8259D2" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Top Checkmark Badge */}
          <View style={styles.badgeContainer}>
            <View style={styles.animationContainer}>
              {/* Ripple Ring 2 */}
              <Animated.View
                style={[
                  styles.rippleRing,
                  {
                    transform: [{ scale: ring2Scale }],
                    opacity: ring2Opacity,
                    backgroundColor: 'rgba(130, 89, 210, 0.12)',
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
                    backgroundColor: 'rgba(130, 89, 210, 0.18)',
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
                <Svg width="26" height="26" viewBox="0 0 24 24">
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
            <Text style={styles.deliveredTitle} allowFontScaling={false}>
              Order Delivered!
            </Text>
            <Text style={styles.deliveredSubtitle} allowFontScaling={false}>
              {displayOrder.date}
            </Text>
          </View>

          {/* Card 1: Rider Information */}
          <View style={styles.card}>
            <View style={styles.riderRow}>
              <View style={styles.riderIconBadge}>
                <Ionicons name="cube-outline" size={18} color="#8259D2" />
              </View>
              <View style={styles.riderTextCol}>
                <Text style={styles.riderOrderId} allowFontScaling={false}>
                  ORDER ID #{displayOrder.id}
                </Text>
                <Text style={styles.riderName} allowFontScaling={false}>
                  Delivered by Mc Carlos
                </Text>
              </View>
              <TouchableOpacity
                style={styles.callButton}
                activeOpacity={0.8}
                onPress={() => Linking.openURL('tel:+919876543210').catch(err => console.error("Failed to open dialer", err))}
              >
                <Ionicons name="call-outline" size={18} color="#8259D2" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Section Header: Order Details */}
          <Text style={styles.sectionTitle} allowFontScaling={false}>
            Order Details
          </Text>

          {/* Card 2: Items & Financial Details */}
          <View style={styles.detailsCard}>
            <View style={styles.detailsCardPadding}>
              {servicesList.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <View style={styles.itemLeftContainer}>
                    <View style={styles.itemIconContainer}>
                      <Ionicons name={item.icon as any} size={18} color="#8259D2" />
                    </View>
                    <View style={styles.itemTextCol}>
                      <Text style={styles.itemName} allowFontScaling={false}>
                        {item.title} ({item.quantity} {item.unit})
                      </Text>
                      <Text style={styles.itemDesc} allowFontScaling={false}>
                        {item.desc}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.itemPrice} allowFontScaling={false}>
                    ₹{item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </View>

            {/* Financial panel with blue background */}
            <View style={styles.financialPanel}>
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
                  Tax & Fees
                </Text>
                <Text style={styles.financeValue} allowFontScaling={false}>
                  ₹{taxAndServiceFee}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel} allowFontScaling={false}>
                  Total Amount Paid
                </Text>
                <Text style={styles.totalValue} allowFontScaling={false}>
                  ₹{totalNum}
                </Text>
              </View>
            </View>
          </View>

          {/* Section Header: Proof of Delivery */}
          <Text style={styles.sectionTitle} allowFontScaling={false}>
            Proof of Delivery
          </Text>

          {/* Card 3: Proof Image */}
          <View style={styles.proofCard}>
            <Image
              source={require('../../../assets/images/order/proof_delivery.png')}
              style={styles.proofImage}
              resizeMode="cover"
            />
            <View style={styles.proofBadge}>
              <Ionicons name="location-outline" size={12} color="#4B5563" />
              <Text style={styles.proofBadgeText} allowFontScaling={false}>
                Captured at delivery
              </Text>
            </View>
          </View>

          {/* Card 4: Star Rating Feed */}
          <View style={[styles.card, styles.ratingCard]}>
            {isFeedbackSubmitted ? (
              <View style={styles.successFeedbackContainer}>
                <Ionicons name="checkmark-circle" size={48} color="#693FB7" />
                <Text style={styles.successFeedbackTitle} allowFontScaling={false}>
                  Thank you!
                </Text>
                <Text style={styles.successFeedbackText} allowFontScaling={false}>
                  Your feedback has been submitted successfully.
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.ratingCardTitle} allowFontScaling={false}>
                  Rate your experience
                </Text>

                {/* Stars Row */}
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((starNum) => {
                    const isSelected = rating >= starNum;
                    return (
                      <TouchableOpacity
                        key={starNum}
                        activeOpacity={0.7}
                        onPress={() => setRating(starNum)}
                      >
                        <Ionicons
                          name={isSelected ? 'star' : 'star-outline'}
                          size={36}
                          color={isSelected ? '#FBBF24' : '#7C7C90'}
                          style={styles.starIcon}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Message Input */}
                <TextInput
                  style={styles.feedbackInput}
                  placeholder="Tell us what you loved about the service..."
                  placeholderTextColor="#A0A0A0"
                  multiline={true}
                  numberOfLines={4}
                  value={feedback}
                  onChangeText={setFeedback}
                  allowFontScaling={false}
                />

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.feedbackBtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    const resolvedLaundry = laundryItems.find(
                      (l) => l.name.toLowerCase() === displayOrder.laundryName.toLowerCase()
                    );
                    const resolvedLaundryId = (displayOrder as any).laundryId || resolvedLaundry?.id || 'krishna-laundry';

                    addReview({
                      laundryId: resolvedLaundryId,
                      rating: rating || 5,
                      reviewText: feedback || 'Great service, delivered on time!',
                    });

                    setIsFeedbackSubmitted(true);
                  }}
                >
                  <Text style={styles.feedbackBtnText} allowFontScaling={false}>
                    Submit Feedback
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
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
    paddingBottom: verticalScale(140),
  },
  badgeContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  animationContainer: {
    width: scale(150),
    height: verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: verticalScale(6),
  },
  rippleRing: {
    position: 'absolute',
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
  },
  mainCircle: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: COLORS.purple,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  deliveredTitle: {
    fontSize: responsiveFontSize(21),
    fontWeight: '900',
    color: '#8259D2',
    marginTop: verticalScale(16),
  },
  deliveredSubtitle: {
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: verticalScale(4),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#EBEBF0',
    overflow: 'hidden',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    marginBottom: verticalScale(16),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1.5,
  },
  ratingCard: {
    backgroundColor: '#916dd41a',
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    borderRadius: scale(18),
  },
  riderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riderIconBadge: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#F2EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  riderTextCol: {
    flex: 1,
  },
  riderOrderId: {
    fontSize: responsiveFontSize(11.5),
    fontWeight: '800',
    color: '#8259D2',
    letterSpacing: 0.3,
  },
  riderName: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '800',
    color: '#1C1C38',
    marginTop: verticalScale(2),
  },
  callButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    borderWidth: 1,
    borderColor: '#EFEAFB',
    backgroundColor: '#FBF9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '800',
    color: '#1C1C38',
    marginBottom: verticalScale(12),
    marginTop: verticalScale(4),
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#EBEBF0',
    overflow: 'hidden',
    marginBottom: verticalScale(16),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1.5,
  },
  detailsCardPadding: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
  },
  itemLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: scale(16),
  },
  itemIconContainer: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(10),
    backgroundColor: '#F2EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  itemTextCol: {
    flex: 1,
  },
  itemName: {
    fontSize: responsiveFontSize(14),
    fontWeight: '800',
    color: '#1C1C38',
  },
  itemDesc: {
    fontSize: responsiveFontSize(11.5),
    fontWeight: '500',
    color: '#9CA3AF',
    marginTop: verticalScale(2),
  },
  itemPrice: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '800',
    color: '#1C1C38',
  },
  financialPanel: {
    backgroundColor: '#F4F7FF',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
  },
  financeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(4),
  },
  financeLabel: {
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: '#8D8DAD',
  },
  financeValue: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '700',
    color: '#1C1C38',
  },
  divider: {
    height: 1,
    backgroundColor: '#EBEBF4',
    marginVertical: verticalScale(10),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '800',
    color: '#1C1C38',
  },
  totalValue: {
    fontSize: responsiveFontSize(16),
    fontWeight: '800',
    color: '#8259D2',
  },
  proofCard: {
    height: verticalScale(170),
    borderRadius: scale(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EBEBF0',
    position: 'relative',
    marginBottom: verticalScale(20),
  },
  proofImage: {
    width: '100%',
    height: '100%',
  },
  proofBadge: {
    position: 'absolute',
    bottom: scale(12),
    left: scale(12),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  proofBadgeText: {
    fontSize: responsiveFontSize(10.5),
    fontWeight: '700',
    color: '#4B5563',
  },
  ratingCardTitle: {
    fontSize: responsiveFontSize(21),
    fontWeight: '800',
    color: '#693FB7',
    textAlign: 'center',
    marginTop: verticalScale(6),
    marginBottom: verticalScale(4),
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(12),
    marginVertical: verticalScale(14),
  },
  starIcon: {
    marginHorizontal: scale(2),
  },
  feedbackInput: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: scale(16),
    padding: scale(16),
    height: verticalScale(105),
    textAlignVertical: 'top',
    fontSize: responsiveFontSize(14.5),
    color: '#1C1C38',
    backgroundColor: '#FFFFFF',
    marginBottom: verticalScale(16),
  },
  feedbackBtn: {
    backgroundColor: '#693FB7',
    borderRadius: scale(14),
    height: verticalScale(46),
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackBtnText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(15),
    fontWeight: '800',
  },
  successFeedbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(14),
  },
  successFeedbackTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '800',
    color: '#693FB7',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(6),
  },
  successFeedbackText: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '500',
    color: '#4B5563',
    textAlign: 'center',
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
    flexDirection: 'row',
    gap: scale(12),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 5,
  },
  ctaInvoiceButton: {
    flex: 1,
    borderColor: '#8259D2',
    borderWidth: 1.5,
    borderRadius: scale(12),
    height: verticalScale(44),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(6),
    backgroundColor: '#FFFFFF',
  },
  ctaInvoiceText: {
    color: '#8259D2',
    fontSize: responsiveFontSize(14),
    fontWeight: '800',
  },
  ctaReorderButton: {
    flex: 1,
    backgroundColor: '#8259D2',
    borderRadius: scale(12),
    height: verticalScale(44),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(6),
  },
  ctaReorderText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(14),
    fontWeight: '800',
  },
});

export default OrderSummaryDeliveredScreen;

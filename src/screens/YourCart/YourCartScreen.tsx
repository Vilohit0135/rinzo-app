import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RootStackParamList } from '../../types/navigation';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import {
  useBookingStore,
  DELIVERY_CHARGE,
  SERVICE_FEE,
  calculateDiscount,
  calculateSubtotal,
} from '../../store/bookingStore';
import EmptyCartState from '../../components/cart/EmptyCartState';
import { garmentItems } from '../../data/services/itemsData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'YourCart'>;

const YourCartScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const storeServices = useBookingStore((s) => s.services);
  const clothesSummary = useBookingStore((s) => s.clothesSummary);
  const updateQuantity = useBookingStore((s) => s.updateQuantity);
  const setServiceClothes = useBookingStore((s) => s.setServiceClothes);
  const clearStore = useBookingStore((s) => s.clear);

  const address = useBookingStore((s) => s.address);
  const addressLabel = useBookingStore((s) => s.addressLabel);
  const appliedCoupon = useBookingStore((s) => s.appliedCoupon);

  // Map item names to generated high-quality images
  const getItemImage = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('cotton shirt') || n.includes('shirt') || n.includes('t-shirt')) {
      return require('../../../assets/images/cart/cotton-shirt.png');
    }
    if (n.includes('trousers') || n.includes('pants') || n.includes('jeans')) {
      return require('../../../assets/images/cart/formal-trousers.png');
    }
    if (n.includes('blazer') || n.includes('suit') || n.includes('jacket') || n.includes('dress') || n.includes('saree')) {
      return require('../../../assets/images/cart/premium-blazer.jpg');
    }
    return require('../../../assets/images/cart/cotton-shirt.png');
  };

  // Compile cart list items
  // 1. Piece-based items from clothes checklist
  const pieceItems = useMemo(() => {
    const list: {
      id: string;
      name: string;
      subtitle: string;
      price: number;
      quantity: number;
      targetServiceId: string;
      isWeight: false;
    }[] = [];

    // Traverse clothes checklists across active services
    Object.entries(clothesSummary).forEach(([serviceId, garments]) => {
      const service = storeServices.find(s => s.id === serviceId);
      if (!service || service.unit === 'Kg') return; // Skip weight services here

      garments.forEach((g) => {
        if (g.quantity > 0) {
          // Lookup item price in itemsData config
          const match = garmentItems.find(item => item.name.toLowerCase() === g.name.toLowerCase());
          const price = g.unitPrice || match?.price || service.unitPrice;
          const subtitle = match?.subtitle || service.title;
          
          list.push({
            id: `${serviceId}-${g.name}`,
            name: g.name,
            subtitle,
            price,
            quantity: g.quantity,
            targetServiceId: serviceId,
            isWeight: false,
          });
        }
      });
    });
    return list;
  }, [clothesSummary, storeServices]);

  // 2. Weight-based services
  const weightItems = useMemo(() => {
    return storeServices
      .filter((s) => s.unit === 'Kg' && s.quantity > 0)
      .map((s) => ({
        id: s.id,
        name: s.title,
        subtitle: 'Weight-based Laundry',
        price: s.unitPrice,
        quantity: s.quantity,
        targetServiceId: s.id,
        isWeight: true,
      }));
  }, [storeServices]);

  const cartItems = useMemo(() => [...pieceItems, ...weightItems], [pieceItems, weightItems]);

  const hasItems = cartItems.length > 0;

  // Subtotal calculations
  const subtotal = useMemo(
    () => calculateSubtotal(storeServices, clothesSummary),
    [storeServices, clothesSummary]
  );

  const discountValue = useMemo(
    () => calculateDiscount(appliedCoupon, subtotal, storeServices),
    [appliedCoupon, subtotal, storeServices]
  );

  const finalTotal = useMemo(
    () => Math.max(0, subtotal + DELIVERY_CHARGE + SERVICE_FEE - discountValue),
    [subtotal, discountValue]
  );

  // Counter changes
  const handleItemQuantityChange = (targetServiceId: string, name: string, isWeight: boolean, diff: number) => {
    if (isWeight) {
      const service = storeServices.find(s => s.id === targetServiceId);
      if (!service) return;
      updateQuantity(targetServiceId, Math.max(0, service.quantity + diff));
    } else {
      const currentClothes = clothesSummary[targetServiceId] ? [...clothesSummary[targetServiceId]] : [];
      const itemIndex = currentClothes.findIndex(c => c.name.toLowerCase() === name.toLowerCase());
      
      if (itemIndex > -1) {
        const nextQty = Math.max(0, currentClothes[itemIndex].quantity + diff);
        if (nextQty === 0) {
          currentClothes.splice(itemIndex, 1);
        } else {
          currentClothes[itemIndex] = { ...currentClothes[itemIndex], quantity: nextQty };
        }
      }
      
      setServiceClothes(targetServiceId, currentClothes);
      const newTotalQty = currentClothes.reduce((sum, c) => sum + c.quantity, 0);
      updateQuantity(targetServiceId, newTotalQty);
    }
  };

  const handleRemoveItem = (targetServiceId: string, name: string, isWeight: boolean) => {
    if (isWeight) {
      updateQuantity(targetServiceId, 0);
    } else {
      const currentClothes = clothesSummary[targetServiceId] ? [...clothesSummary[targetServiceId]] : [];
      const itemIndex = currentClothes.findIndex(c => c.name.toLowerCase() === name.toLowerCase());
      if (itemIndex > -1) {
        currentClothes.splice(itemIndex, 1);
      }
      setServiceClothes(targetServiceId, currentClothes);
      const newTotalQty = currentClothes.reduce((sum, c) => sum + c.quantity, 0);
      updateQuantity(targetServiceId, newTotalQty);
    }
  };

  const handleProceedToCheckout = () => {
    navigation.navigate('OrderSummary');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#1C1C30" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>Laundry Cart</Text>
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={22} color="#1C1C30" />
        </TouchableOpacity>
      </View>

      {!hasItems ? (
        <EmptyCartState
          title="Your cart is empty"
          subtitle="Looks like you haven't added any services yet"
        />
      ) : (
        <View style={styles.contentWrap}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
          >
            {/* Your Items Section */}
            <Text style={styles.sectionHeaderTitle} allowFontScaling={false}>YOUR ITEMS</Text>
            <View style={styles.itemsListContainer}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <View style={styles.itemCardContent}>
                    {/* Item Thumbnail */}
                    <Image
                      source={item.isWeight ? require('../../../assets/images/service/wash.png') : getItemImage(item.name)}
                      style={styles.itemThumb}
                      resizeMode="cover"
                    />

                    {/* Item Details */}
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName} allowFontScaling={false} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.itemSubtitle} allowFontScaling={false}>
                        {item.subtitle}
                      </Text>
                      <Text style={styles.itemPrice} allowFontScaling={false}>
                        ₹{item.price}{item.isWeight ? '/kg' : ''}
                      </Text>
                    </View>
                  </View>

                  {/* Actions Column */}
                  <View style={styles.cardActionsCol}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleRemoveItem(item.targetServiceId, item.name, item.isWeight)}
                      style={styles.trashBtn}
                    >
                      <Ionicons name="trash-outline" size={18} color="#EF4444" />
                    </TouchableOpacity>

                    {/* Counter Control */}
                    <View style={styles.counterControlPill}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleItemQuantityChange(item.targetServiceId, item.name, item.isWeight, -1)}
                      >
                        <Ionicons name="remove" size={15} color="#7C4DFF" />
                      </TouchableOpacity>
                      <Text style={styles.counterControlValue} allowFontScaling={false}>
                        {item.quantity}{item.isWeight ? ' kg' : ''}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleItemQuantityChange(item.targetServiceId, item.name, item.isWeight, 1)}
                      >
                        <Ionicons name="add" size={15} color="#7C4DFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Apply Coupon Section */}
            <TouchableOpacity
              style={styles.couponContainer}
              activeOpacity={0.8}
              onPress={() => (navigation as any).navigate('HomeTab', { screen: 'Offers' })}
            >
              <View style={styles.couponLeft}>
                <View style={styles.couponIconCircle}>
                  <Ionicons name="pricetag-outline" size={18} color="#7C4DFF" />
                </View>
                <View style={styles.couponTextWrap}>
                  <Text style={styles.couponTitle} allowFontScaling={false}>Apply Coupon</Text>
                  <Text style={styles.couponSubtitle} allowFontScaling={false}>Unlock extra savings on your order</Text>
                </View>
              </View>
              <Text style={styles.viewOffersText} allowFontScaling={false}>View Offers</Text>
            </TouchableOpacity>

            {/* Pickup Location Section */}
            <Text style={styles.sectionHeaderTitle} allowFontScaling={false}>PICKUP LOCATION</Text>
            <TouchableOpacity
              style={styles.locationContainer}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('SavedAddress', { selectMode: true })}
            >
              <View style={styles.locationLeft}>
                <View style={styles.locationIconWrap}>
                  <Ionicons name="home-outline" size={20} color="#7C4DFF" />
                </View>
                <View style={styles.locationTextWrap}>
                  <Text style={styles.locationTitle} allowFontScaling={false}>
                    {addressLabel} - Indiranagar, Bangalore
                  </Text>
                  <Text style={styles.locationSubtitle} allowFontScaling={false} numberOfLines={1}>
                    {address || 'Flat 402, 12th Main, 4th Cross Road'}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Bill Details Section */}
            <Text style={styles.sectionHeaderTitle} allowFontScaling={false}>BILL DETAILS</Text>
            <View style={styles.billDetailsContainer}>
              <View style={styles.billRow}>
                <Text style={styles.billLabel} allowFontScaling={false}>Item Total</Text>
                <Text style={styles.billValue} allowFontScaling={false}>₹{subtotal}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel} allowFontScaling={false}>Delivery Fee</Text>
                <Text style={styles.billValue} allowFontScaling={false}>₹{DELIVERY_CHARGE}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel} allowFontScaling={false}>Service Fee</Text>
                <Text style={styles.billValue} allowFontScaling={false}>₹{SERVICE_FEE}</Text>
              </View>
              {discountValue > 0 && (
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, styles.discountText]} allowFontScaling={false}>
                    Coupon Discount ({appliedCoupon})
                  </Text>
                  <Text style={[styles.billValue, styles.discountText]} allowFontScaling={false}>
                    -₹{discountValue}
                  </Text>
                </View>
              )}
              
              <View style={styles.billDivider} />

              <View style={styles.billTotalRow}>
                <Text style={styles.billTotalLabel} allowFontScaling={false}>Total Amount</Text>
                <Text style={styles.billTotalValue} allowFontScaling={false}>₹{finalTotal}</Text>
              </View>
            </View>

            {/* Safety Handling Badge */}
            <View style={styles.safetyBadge}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#10B981" style={styles.safetyIcon} />
              <Text style={styles.safetyText} allowFontScaling={false}>
                100% Safe & Professional Handling
              </Text>
            </View>
          </ScrollView>

          {/* Bottom Payable Card */}
          <View style={styles.footerContainer}>
            <View style={styles.footerLeft}>
              <Text style={styles.payableLabel} allowFontScaling={false}>Payable Amount</Text>
              <Text style={styles.payableValue} allowFontScaling={false}>₹{finalTotal}</Text>
            </View>
            <TouchableOpacity
              style={styles.payBtn}
              activeOpacity={0.85}
              onPress={handleProceedToCheckout}
            >
              <Text style={styles.payBtnText} allowFontScaling={false}>Pay ₹{finalTotal}</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={styles.payBtnIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  backButton: {
    padding: scale(2),
  },
  headerTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1C1C30',
  },
  menuButton: {
    padding: scale(2),
  },
  contentWrap: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(185),
  },
  sectionHeaderTitle: {
    fontSize: responsiveFontSize(12),
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginTop: verticalScale(16),
    marginBottom: verticalScale(10),
  },
  itemsListContainer: {
    gap: verticalScale(12),
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#EFEFF4',
    padding: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(90),
  },
  itemCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemThumb: {
    width: scale(62),
    height: scale(62),
    borderRadius: scale(8),
    marginRight: scale(12),
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '800',
    color: '#1C1C30',
  },
  itemSubtitle: {
    fontSize: responsiveFontSize(11.5),
    color: '#8E8E9E',
    marginTop: verticalScale(2),
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: responsiveFontSize(14),
    fontWeight: '800',
    color: '#7C4DFF',
    marginTop: verticalScale(4),
  },
  cardActionsCol: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  trashBtn: {
    paddingHorizontal: scale(4),
    paddingVertical: verticalScale(2),
  },
  counterControlPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3EEFF',
    borderWidth: 1,
    borderColor: '#DCD4FF',
    borderRadius: moderateScale(20),
    width: scale(85),
    height: verticalScale(30),
    paddingHorizontal: scale(8),
  },
  counterControlValue: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: '#7C4DFF',
    textAlign: 'center',
  },
  couponContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3EEFF',
    borderWidth: 1,
    borderColor: '#E1D8FF',
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  couponIconCircle: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  couponTextWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  couponTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: '800',
    color: '#1C1C30',
  },
  couponSubtitle: {
    fontSize: responsiveFontSize(11),
    color: '#7C4DFF',
    fontWeight: '500',
    marginTop: verticalScale(1),
  },
  viewOffersText: {
    color: '#7C4DFF',
    fontSize: responsiveFontSize(13.5),
    fontWeight: '800',
    marginLeft: scale(10),
  },
  locationContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#EFEFF4',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: scale(10),
  },
  locationIconWrap: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(8),
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  locationTextWrap: {
    flex: 1,
  },
  locationTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: '800',
    color: '#1C1C30',
  },
  locationSubtitle: {
    fontSize: responsiveFontSize(11.5),
    color: '#8E8E9E',
    marginTop: verticalScale(2),
    fontWeight: '500',
  },
  billDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#EFEFF4',
    padding: scale(14),
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
  },
  billLabel: {
    fontSize: responsiveFontSize(13.5),
    color: '#6B7280',
    fontWeight: '500',
  },
  billValue: {
    fontSize: responsiveFontSize(13.5),
    color: '#1C1C30',
    fontWeight: '600',
  },
  discountText: {
    color: '#10B981',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F1F1F6',
    marginVertical: verticalScale(8),
  },
  billTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(2),
  },
  billTotalLabel: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '800',
    color: '#1C1C30',
  },
  billTotalValue: {
    fontSize: responsiveFontSize(16),
    fontWeight: '800',
    color: '#7C4DFF',
  },
  safetyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  safetyIcon: {
    marginRight: scale(6),
  },
  safetyText: {
    fontSize: responsiveFontSize(12),
    color: '#8E8E9E',
    fontWeight: '500',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(12),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(104) : verticalScale(96),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    justifyContent: 'center',
  },
  payableLabel: {
    fontSize: responsiveFontSize(12),
    color: '#8E8E9E',
    fontWeight: '500',
  },
  payableValue: {
    fontSize: responsiveFontSize(18),
    fontWeight: '800',
    color: '#1C1C30',
    marginTop: verticalScale(2),
  },
  payBtn: {
    backgroundColor: '#7C4DFF',
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(24),
    height: verticalScale(46),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  payBtnText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(14.5),
    fontWeight: '700',
  },
  payBtnIcon: {
    marginLeft: scale(4),
  },
});

export default YourCartScreen;

import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBar } from '../../utils/TabBarContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useBookingStore, DELIVERY_CHARGE, SERVICE_FEE, calculateDiscount, calculateSubtotal } from '../../store/bookingStore';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderSummary'>;

const OrderSummaryScreen = ({ navigation }: Props) => {
  const { setTabBarVisible } = useTabBar();

  // Hide the tab bar when focusing this checkout screen
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

  const services = useBookingStore((s) => s.services);
  const pickupDate = useBookingStore((s) => s.pickupDate);
  const pickupTime = useBookingStore((s) => s.pickupTime);
  const address = useBookingStore((s) => s.address);
  const addressLabel = useBookingStore((s) => s.addressLabel);
  const setAddress = useBookingStore((s) => s.setAddress);
  const setAddressLabel = useBookingStore((s) => s.setAddressLabel);
  const setAddressContact = useBookingStore((s) => s.setAddressContact);
  const instructions = useBookingStore((s) => s.instructions);
  const setInstructions = useBookingStore((s) => s.setInstructions);
  const setOrderId = useBookingStore((s) => s.setOrderId);
  const setTotalAmount = useBookingStore((s) => s.setTotalAmount);
  const appliedCoupon = useBookingStore((s) => s.appliedCoupon);
  const clothesSummary = useBookingStore((s) => s.clothesSummary);

  const homeAddressObj = {
    label: 'Home',
    address: 'Flat 402, Skyline Residency, Sector 45, Gurgaon, Haryana - 122003',
    contact: 'MS Mira Sharma - 9875263167'
  };

  const workAddressObj = {
    label: 'Work',
    address: 'Tech Park, Phase 3, Office 12B, DLF Cyber City, Gurgaon - 122002',
    contact: 'Anjali Verma - 9123456780'
  };

  // Sync with default home address if no address or a different address is set
  useEffect(() => {
    if (!address || (address !== homeAddressObj.address && address !== workAddressObj.address)) {
      setAddress(homeAddressObj.address);
      setAddressLabel(homeAddressObj.label);
      setAddressContact(homeAddressObj.contact);
    }
  }, []);

  const subtotal = calculateSubtotal(services, clothesSummary);
  const discountValue = calculateDiscount(appliedCoupon, subtotal, services);
  const total = Math.max(0, subtotal + DELIVERY_CHARGE + SERVICE_FEE - discountValue);

  const handleProceedToPayment = () => {
    navigation.navigate('SchedulePickup');
  };

  const isHomeSelected = addressLabel === 'Home';
  const isWorkSelected = addressLabel === 'Work';

  // Format pickup label
  const pickupLabel = pickupTime
    ? `${pickupDate ? `${pickupDate}, ` : ''}${pickupTime}`
    : 'Tomorrow, 10:00 AM - 12:00 PM';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#1E1E2D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} allowFontScaling={false}>
            Pickup Address
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Stepper Timeline (Address first, then Schedule) */}
          <View style={styles.timelineContainer}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineCircleActive}>
                <Text style={styles.timelineNumberActive} allowFontScaling={false}>1</Text>
              </View>
              <Text style={styles.timelineLabelActive} allowFontScaling={false}>Address</Text>
            </View>
            
            <View style={styles.timelineLine} />
            
            <View style={styles.timelineItem}>
              <View style={styles.timelineCircleInactive}>
                <Text style={styles.timelineNumberInactive} allowFontScaling={false}>2</Text>
              </View>
              <Text style={styles.timelineLabelInactive} allowFontScaling={false}>Schedule</Text>
            </View>
          </View>

          {/* Map View */}
          <View style={styles.mapCard}>
            <Image
              source={require('../../../assets/images/google-map.png')}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.mapLocateBtn} activeOpacity={0.8}>
              <Ionicons name="locate" size={20} color="#7C5CE6" />
            </TouchableOpacity>
          </View>

          {/* Selected Pickup Time Card */}
          <View style={styles.timeCard}>
            <View style={styles.timeContent}>
              <Text style={styles.timeTitle} allowFontScaling={false}>Selected Pickup Time</Text>
              <Text style={styles.timeValue} allowFontScaling={false}>{pickupLabel}</Text>
            </View>
            <TouchableOpacity
              style={styles.editBtn}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('SchedulePickup')}
            >
              <Ionicons name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Saved Addresses Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle} allowFontScaling={false}>Saved Addresses</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('SavedAddress', { selectMode: true })}>
              <Text style={styles.addNewText} allowFontScaling={false}>+ Add New</Text>
            </TouchableOpacity>
          </View>

          {/* Home Address Card */}
          <TouchableOpacity
            style={[styles.addressCard, isHomeSelected && styles.addressCardSelected]}
            activeOpacity={0.9}
            onPress={() => {
              setAddress(homeAddressObj.address);
              setAddressLabel(homeAddressObj.label);
              setAddressContact(homeAddressObj.contact);
            }}
          >
            <View style={[styles.radioOuter, isHomeSelected && styles.radioOuterSelected]}>
              {isHomeSelected && <View style={styles.radioInner} />}
            </View>
            <View style={styles.addressIconContainer}>
              <Ionicons name={isHomeSelected ? "home" : "home-outline"} size={18} color={isHomeSelected ? "#7C5CE6" : "#A1A1AA"} />
            </View>
            <View style={styles.addressDetails}>
              <View style={styles.addressLabelRow}>
                <Text style={styles.addressLabelText} allowFontScaling={false}>Home</Text>
              </View>
              <Text style={styles.addressBodyText} allowFontScaling={false}>{homeAddressObj.address}</Text>
            </View>
          </TouchableOpacity>

          {/* Work Address Card */}
          <TouchableOpacity
            style={[styles.addressCard, isWorkSelected && styles.addressCardSelected]}
            activeOpacity={0.9}
            onPress={() => {
              setAddress(workAddressObj.address);
              setAddressLabel(workAddressObj.label);
              setAddressContact(workAddressObj.contact);
            }}
          >
            <View style={[styles.radioOuter, isWorkSelected && styles.radioOuterSelected]}>
              {isWorkSelected && <View style={styles.radioInner} />}
            </View>
            <View style={styles.addressIconContainer}>
              <Ionicons name={isWorkSelected ? "briefcase" : "briefcase-outline"} size={18} color={isWorkSelected ? "#7C5CE6" : "#A1A1AA"} />
            </View>
            <View style={styles.addressDetails}>
              <View style={styles.addressLabelRow}>
                <Text style={styles.addressLabelText} allowFontScaling={false}>Work</Text>
              </View>
              <Text style={styles.addressBodyText} allowFontScaling={false}>{workAddressObj.address}</Text>
            </View>
          </TouchableOpacity>

          {/* Pickup Instructions */}
          <Text style={styles.instructionsHeader} allowFontScaling={false}>PICKUP INSTRUCTIONS</Text>
          <TextInput
            style={styles.instructionInput}
            value={instructions}
            onChangeText={setInstructions}
            placeholder="e.g. Ring the bell at the side gate..."
            placeholderTextColor="#A1A1AA"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            allowFontScaling={false}
          />
        </ScrollView>

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.priceRow}>
            <Text style={styles.feeLabel} allowFontScaling={false}>Estimated Service Fee</Text>
            <Text style={styles.feeValue} allowFontScaling={false}>₹{total > 0 ? total.toFixed(2) : '49.00'}</Text>
          </View>
          <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.8} onPress={handleProceedToPayment}>
            <Text style={styles.confirmBtnText} allowFontScaling={false}>Confirm & Schedule</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" style={styles.confirmBtnIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(14),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F6',
  },
  backButton: {
    marginRight: scale(12),
  },
  headerTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  scrollContent: {
    paddingTop: verticalScale(16),
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(14),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    marginBottom: verticalScale(16),
    marginHorizontal: scale(18),
    borderWidth: 1,
    borderColor: '#EBEBF0',
  },
  timelineItem: {
    alignItems: 'center',
    width: scale(80),
  },
  timelineCircleActive: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    backgroundColor: '#7C5CE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  timelineCircleInactive: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    backgroundColor: '#EAE8FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  timelineLine: {
    flex: 0.5,
    height: 2,
    backgroundColor: '#E2E1F6',
    marginBottom: verticalScale(24),
  },
  timelineLabelActive: {
    fontSize: responsiveFontSize(11),
    fontWeight: '700',
    color: '#7C5CE6',
  },
  timelineLabelInactive: {
    fontSize: responsiveFontSize(11),
    fontWeight: '700',
    color: '#8E8E93',
  },
  timelineNumberActive: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  timelineNumberInactive: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: '#7C5CE6',
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    height: verticalScale(140),
    marginHorizontal: scale(18),
    marginBottom: verticalScale(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EBEBF0',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapLocateBtn: {
    position: 'absolute',
    bottom: scale(12),
    right: scale(12),
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeCard: {
    backgroundColor: '#7C5CE6',
    borderRadius: scale(16),
    padding: scale(16),
    marginHorizontal: scale(18),
    marginBottom: verticalScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContent: {
    flex: 1,
  },
  timeTitle: {
    fontSize: responsiveFontSize(12),
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  timeValue: {
    fontSize: responsiveFontSize(16),
    color: '#FFFFFF',
    fontWeight: '800',
  },
  editBtn: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(8),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(12),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '800',
    color: '#1E1E2D',
  },
  addNewText: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '700',
    color: '#7C5CE6',
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(16),
    marginHorizontal: scale(18),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: '#EBEBF0',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressCardSelected: {
    borderColor: '#7C5CE6',
    borderWidth: 1.5,
  },
  radioOuter: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    borderWidth: 1.5,
    borderColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
    marginTop: verticalScale(2),
  },
  radioOuterSelected: {
    borderColor: '#7C5CE6',
  },
  radioInner: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: '#7C5CE6',
  },
  addressIconContainer: {
    marginRight: scale(10),
    marginTop: verticalScale(1),
  },
  addressDetails: {
    flex: 1,
  },
  addressLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  addressLabelText: {
    fontSize: responsiveFontSize(15),
    fontWeight: '800',
    color: '#1E1E2D',
  },
  addressBodyText: {
    fontSize: responsiveFontSize(13),
    color: '#6B7280',
    lineHeight: responsiveFontSize(18),
  },
  instructionsHeader: {
    fontSize: responsiveFontSize(11),
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    paddingHorizontal: scale(18),
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
  },
  instructionInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBF0',
    borderRadius: scale(16),
    padding: scale(14),
    marginHorizontal: scale(18),
    marginBottom: verticalScale(140),
    fontSize: responsiveFontSize(14.5),
    color: '#1E1E2D',
    height: verticalScale(80),
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F6',
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(14),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(28) : verticalScale(14),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  feeLabel: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#6B7280',
  },
  feeValue: {
    fontSize: responsiveFontSize(20),
    fontWeight: '800',
    color: '#7C5CE6',
  },
  confirmBtn: {
    backgroundColor: '#7C5CE6',
    borderRadius: scale(12),
    height: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C5CE6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmBtnText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  confirmBtnIcon: {
    marginLeft: scale(6),
    marginTop: verticalScale(1),
  },
});

export default OrderSummaryScreen;

import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import * as Clipboard from 'expo-clipboard';
import { useBookingStore } from '../../store/bookingStore';
import { useTabBar } from '../../utils/TabBarContext';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import { featuredOffer, offersData } from '../../data/offers/offersData';
import Toast from 'react-native-toast-message';

const OffersScreen = () => {
  const navigation = useNavigation();
  const setAppliedCoupon = useBookingStore((s) => s.setAppliedCoupon);
  const appliedCoupon = useBookingStore((s) => s.appliedCoupon);
  const { setTabBarVisible } = useTabBar();

  const [inputText, setInputText] = useState('');

  // Hide bottom tab bar on focus
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

  const handleApplyInputCoupon = () => {
    const code = inputText.toUpperCase().trim();
    if (!code) return;

    const isValid = code === 'FIRST30' || offersData.some(offer => offer.couponCode === code);

    if (isValid) {
      setAppliedCoupon(code);
      if (Platform.OS === 'android') {
        ToastAndroid.show(`Coupon "${code}" applied!`, ToastAndroid.SHORT);
      } else {
        Toast.show({
          type: 'success',
          text1: 'Coupon Applied!',
          text2: `Coupon code "${code}" has been applied.`,
          position: 'bottom',
        });
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Invalid coupon code!', ToastAndroid.SHORT);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid Coupon',
          text2: `"${code}" is not a valid coupon code.`,
          position: 'bottom',
        });
      }
    }
    setInputText('');
  };

  const handleCopyCode = async (code: string) => {
    await Clipboard.setStringAsync(code);
    setAppliedCoupon(code);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`Coupon "${code}" copied and applied!`, ToastAndroid.SHORT);
    } else {
      Toast.show({
        type: 'success',
        text1: 'Copied & Applied!',
        text2: `Coupon code "${code}" has been applied.`,
        position: 'bottom',
      });
    }
  };

  const handleApplyCoupon = (code: string) => {
    if (appliedCoupon === code) {
      setAppliedCoupon(null);
      if (Platform.OS === 'android') {
        ToastAndroid.show(`Coupon "${code}" removed!`, ToastAndroid.SHORT);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Coupon Removed',
          text2: `Coupon code "${code}" has been removed.`,
          position: 'bottom',
        });
      }
    } else {
      setAppliedCoupon(code);
      if (Platform.OS === 'android') {
        ToastAndroid.show(`Coupon "${code}" applied!`, ToastAndroid.SHORT);
      } else {
        Toast.show({
          type: 'success',
          text1: 'Coupon Applied!',
          text2: `Coupon code "${code}" has been applied.`,
          position: 'bottom',
        });
      }
    }
  };

  const handleViewTerms = (code: string) => {
    Toast.show({
      type: 'info',
      text1: `${code} Terms`,
      text2: 'Min order value apply. Not valid with other offers.',
      position: 'bottom',
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#1C1C30" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>Offers & Coupons</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Input Coupon Box */}
        <View style={styles.inputCard}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter coupon code"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="characters"
            value={inputText}
            onChangeText={setInputText}
            allowFontScaling={false}
          />
          <TouchableOpacity
            style={styles.applyBtn}
            activeOpacity={0.8}
            onPress={handleApplyInputCoupon}
          >
            <Text style={styles.applyBtnText} allowFontScaling={false}>APPLY</Text>
          </TouchableOpacity>
        </View>

        {/* Exclusive section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle} allowFontScaling={false}>Exclusive for you</Text>
        </View>

        {/* Featured Offer Card */}
        <View style={styles.featuredCard}>
          <View style={styles.welcomeBadge}>
            <Text style={styles.welcomeBadgeText} allowFontScaling={false}>WELCOME OFFER</Text>
          </View>
          <Text style={styles.featuredTitle} allowFontScaling={false}>
            Get 30% Off{'\n'}on your first order
          </Text>
          <Text style={styles.featuredSubtitle} allowFontScaling={false}>
            {featuredOffer.description}
          </Text>
          
          <View style={styles.featuredFooter}>
            <View style={styles.dashedCodeBox}>
              <Text style={styles.dashedCodeText} allowFontScaling={false}>
                {featuredOffer.couponCode}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.copyBtn}
              activeOpacity={0.8}
              onPress={() => handleCopyCode(featuredOffer.couponCode)}
            >
              <Text style={styles.copyBtnText} allowFontScaling={false}>COPY</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available coupons section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle} allowFontScaling={false}>Available Coupons</Text>
        </View>

        <View style={styles.couponsList}>
          {offersData.map((offer) => {
            const isApplied = appliedCoupon === offer.couponCode;
            
            // Icon mapping based on coupons
            let iconName = 'ticket-outline';
            if (offer.couponCode === 'WASHREADY') iconName = 'water-outline';
            if (offer.couponCode === 'FREEDEL') iconName = 'car-outline';

            return (
              <View key={offer.id} style={styles.couponCard}>
                <View style={styles.couponLeft}>
                  <View style={styles.iconWrap}>
                    <Ionicons name={iconName as any} size={22} color="#7C4DFF" />
                  </View>
                  <View style={styles.couponInfo}>
                    <Text style={styles.couponCodeTitle} allowFontScaling={false}>
                      {offer.couponCode}
                    </Text>
                    <Text style={styles.couponDesc} allowFontScaling={false} numberOfLines={1}>
                      {offer.description}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleViewTerms(offer.couponCode)}
                    >
                      <Text style={styles.viewTermsText} allowFontScaling={false}>VIEW T&C</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    styles.couponApplyBtn,
                    isApplied && styles.couponAppliedBtn,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => handleApplyCoupon(offer.couponCode)}
                >
                  <Text
                    style={[
                      styles.couponApplyText,
                      isApplied && styles.couponAppliedText,
                    ]}
                    allowFontScaling={false}
                  >
                    {isApplied ? 'APPLIED' : 'APPLY'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Footer Gift Section */}
        <View style={styles.footerGiftSection}>
          <Image
            source={require('../../../assets/images/gift-box.png')}
            style={styles.giftImage}
          />
          <Text style={styles.footerText} allowFontScaling={false}>
            Check back daily for more fresh deals and laundry rewards!
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  backButton: {
    marginRight: scale(16),
  },
  headerTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1C1C30',
  },
  scroll: {
    paddingBottom: verticalScale(40),
  },
  inputCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#EFEFF4',
    paddingLeft: scale(16),
    paddingRight: scale(8),
    marginHorizontal: scale(16),
    marginTop: verticalScale(16),
    height: verticalScale(54),
  },
  textInput: {
    flex: 1,
    fontSize: responsiveFontSize(14),
    color: '#1C1C30',
    paddingVertical: 0,
    fontWeight: '400',
  },
  applyBtn: {
    backgroundColor: '#7C4DFF',
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(20),
    height: verticalScale(38),
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(13),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    marginTop: verticalScale(22),
    marginHorizontal: scale(16),
    marginBottom: verticalScale(10),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(15),
    fontWeight: '800',
    color: '#1C1C30',
  },
  featuredCard: {
    backgroundColor: '#824CF4',
    borderRadius: moderateScale(16),
    marginHorizontal: scale(16),
    padding: scale(20),
    shadowColor: '#824CF4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    alignSelf: 'flex-start',
  },
  welcomeBadgeText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(10),
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontSize: responsiveFontSize(22),
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: verticalScale(14),
    lineHeight: responsiveFontSize(28),
  },
  featuredSubtitle: {
    fontSize: responsiveFontSize(13),
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: verticalScale(8),
    fontWeight: '500',
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(22),
  },
  dashedCodeBox: {
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderStyle: 'dashed',
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(8),
  },
  dashedCodeText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    letterSpacing: 1,
  },
  copyBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(24),
    height: verticalScale(38),
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyBtnText: {
    color: '#824CF4',
    fontSize: responsiveFontSize(13),
    fontWeight: '700',
  },
  couponsList: {
    marginHorizontal: scale(16),
    gap: verticalScale(12),
  },
  couponCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#EFEFF4',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(82),
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: scale(10),
  },
  iconWrap: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(10),
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(14),
  },
  couponInfo: {
    flex: 1,
  },
  couponCodeTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: '800',
    color: '#1C1C30',
  },
  couponDesc: {
    fontSize: responsiveFontSize(12),
    color: '#8E8E9E',
    marginTop: verticalScale(2),
    fontWeight: '500',
  },
  viewTermsText: {
    fontSize: responsiveFontSize(11),
    color: '#824CF4',
    fontWeight: '700',
    marginTop: verticalScale(4),
  },
  couponApplyBtn: {
    backgroundColor: '#F3EEFF',
    borderRadius: moderateScale(8),
    width: scale(68),
    height: verticalScale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponAppliedBtn: {
    backgroundColor: '#824CF4',
  },
  couponApplyText: {
    color: '#824CF4',
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
  },
  couponAppliedText: {
    color: '#FFFFFF',
  },
  footerGiftSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(30),
    marginHorizontal: scale(40),
  },
  giftImage: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
    marginBottom: verticalScale(12),
  },
  footerText: {
    fontSize: responsiveFontSize(12.5),
    color: '#8E8E9E',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: responsiveFontSize(18),
    width: scale(240),
  },
});

export default OffersScreen;

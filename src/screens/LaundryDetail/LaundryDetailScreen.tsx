import React, { useCallback } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';

import { COLORS } from '../../constants/colors';
import { useTabBar } from '../../utils/TabBarContext';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import { getLaundryById } from '../../data/laundry/laundryData';

type RootStackParamList = {
  LaundryDetail: { id: string };
  AllServices: undefined;
};

const heroImage = require('../../../assets/images/Detail/krishna-d.png');

const serviceIcons: Record<string, { icon: string; bg: string; color: string }> = {
  'wash': { icon: 'layers-outline', bg: '#EFE9FF', color: '#8259D2' },
  'iron': { icon: 'shirt-outline', bg: '#F1F1F4', color: '#4F4F6A' },
  'press': { icon: 'shirt-outline', bg: '#F1F1F4', color: '#4F4F6A' },
  'dry': { icon: 'water-outline', bg: '#E3F2FD', color: '#1E88E5' },
  'clean': { icon: 'water-outline', bg: '#E3F2FD', color: '#1E88E5' },
};

const getServiceStyle = (name: string) => {
  const lowercaseName = name.toLowerCase();
  for (const key in serviceIcons) {
    if (lowercaseName.includes(key)) {
      return serviceIcons[key];
    }
  }
  return { icon: 'sparkles-outline', bg: '#F1F1F4', color: '#4F4F6A' };
};

const getDynamicAddress = (name: string, locationArea?: string) => {
  const area = locationArea || 'Downtown';
  return `42, Gandhi Road, near Central Park, ${area}, Mumbai, Maharashtra 400001`;
};

const LaundryDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'LaundryDetail'>>();
  const item = getLaundryById(route.params.id);
  const { setTabBarVisible } = useTabBar();

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(true);
    }, [setTabBarVisible])
  );

  if (!item) {
    return null;
  }

  const minPrice = item.price || '₹50/kg';

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Hero Image Section */}
        <View style={styles.heroContainer}>
          <Image source={heroImage} style={styles.heroImage} />
          
          {/* Absolute Floating Back Button */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={20} color="#1C1C38" />
          </TouchableOpacity>
        </View>

        {/* Shop Info Card Overlay */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardRow}>
            <Text style={styles.shopName} numberOfLines={1} allowFontScaling={false}>
              {item.name}
            </Text>
            
            {/* Purple Action Icon Button */}
            <TouchableOpacity style={styles.purpleActionButton} activeOpacity={0.75}>
              <Ionicons name="cube-outline" size={18} color="#8259D2" />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingRow}>
            {/* Green Rating Pill */}
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={11} color="#27AE60" />
              <Text style={styles.ratingText} allowFontScaling={false}>
                {item.rating.toFixed(1)}
              </Text>
            </View>
            <Text style={styles.bullet} allowFontScaling={false}>•</Text>
            <Text style={styles.infoSubText} allowFontScaling={false}>
              {item.distance}
            </Text>
            <Text style={styles.bullet} allowFontScaling={false}>•</Text>
            <Text
              style={[
                styles.openStatusText,
                { color: item.isOpen ? '#27AE60' : '#E74C3C' }
              ]}
              allowFontScaling={false}
            >
              {item.isOpen ? 'OPEN NOW' : 'CLOSED NOW'}
            </Text>
          </View>
        </View>

        {/* Main Content Details Wrapper */}
        <View style={styles.detailsContainer}>
          
          {/* Our Services Section */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle} allowFontScaling={false}>
              Our Services
            </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('AllServices')}>
              <Text style={styles.viewAllText} allowFontScaling={false}>
                VIEW ALL
              </Text>
            </TouchableOpacity>
          </View>

          {/* Scrolling horizontal list to the edge of the screen */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.servicesScrollView}
            contentContainerStyle={styles.servicesRow}
          >
            {item.services.slice(0, 4).map((service, idx) => {
              const styleProps = getServiceStyle(service.name);
              return (
                <View key={idx} style={styles.serviceCard}>
                  <View style={[styles.serviceIconContainer, { backgroundColor: styleProps.bg }]}>
                    <Ionicons name={styleProps.icon as any} size={20} color={styleProps.color} />
                  </View>
                  <Text style={styles.serviceCardTitle} numberOfLines={2} allowFontScaling={false}>
                    {service.name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* About Section */}
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle} allowFontScaling={false}>
              About
            </Text>
          </View>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutDescription} allowFontScaling={false}>
              {item.description}
            </Text>
            
            <View style={styles.aboutPillsRow}>
              {/* Pill A */}
              <View style={styles.aboutPill}>
                <Ionicons name="leaf-outline" size={22} color="#8259D2" />
                <Text style={styles.aboutPillText} allowFontScaling={false}>
                  {"Eco-friendly\nPractices"}
                </Text>
              </View>
              {/* Pill B */}
              <View style={styles.aboutPill}>
                <Ionicons name="time-outline" size={22} color="#8259D2" />
                <Text style={styles.aboutPillText} allowFontScaling={false}>
                  {"24h Express\nDelivery"}
                </Text>
              </View>
            </View>
          </View>

          {/* Pricing Section */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle} allowFontScaling={false}>
              Pricing
            </Text>
            <Text style={styles.startingFromText} allowFontScaling={false}>
              Starting from ~ {minPrice.replace('₹', '')}
            </Text>
          </View>

          <View style={styles.pricingList}>
            {item.services.map((service, idx) => (
              <View key={idx} style={styles.pricingItem}>
                <View style={styles.pricingLeft}>
                  <View style={styles.purpleDot} />
                  <Text style={styles.pricingName} numberOfLines={1} allowFontScaling={false}>
                    {service.name}
                  </Text>
                </View>
                <Text style={styles.pricingVal} allowFontScaling={false}>
                  {service.price}
                </Text>
              </View>
            ))}
          </View>

          {/* Location Section */}
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle} allowFontScaling={false}>
              Location
            </Text>
          </View>
          
          <View style={styles.mapContainer}>
            <Image
              source={require('../../../assets/images/google-map.png')}
              style={styles.mapImage}
            />
          </View>

          <View style={styles.locationFooter}>
            <Ionicons name="location-outline" size={18} color="#8259D2" style={styles.locationPin} />
            <Text style={styles.locationAddressText} allowFontScaling={false}>
              {getDynamicAddress(item.name, item.locationArea)}
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  scroll: {
    paddingBottom: verticalScale(110),
  },
  heroContainer: {
    width: '100%',
    height: verticalScale(220),
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(40),
    left: scale(18),
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(14),
    marginHorizontal: scale(18),
    marginTop: verticalScale(-36),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  infoCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopName: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1C1C38',
    flex: 1,
    marginRight: scale(10),
  },
  purpleActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFE9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  ratingBadge: {
    backgroundColor: '#E2F9EB',
    borderRadius: moderateScale(6),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(3),
  },
  ratingText: {
    fontSize: responsiveFontSize(11.5),
    fontWeight: '700',
    color: '#27AE60',
  },
  bullet: {
    fontSize: responsiveFontSize(13),
    color: '#8D8DAD',
    marginHorizontal: scale(8),
  },
  infoSubText: {
    fontSize: responsiveFontSize(12),
    color: '#8D8DAD',
    fontWeight: '500',
  },
  openStatusText: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
  },
  detailsContainer: {
    paddingHorizontal: scale(18),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(24),
    marginBottom: verticalScale(12),
  },
  sectionTitleContainer: {
    marginTop: verticalScale(24),
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#1C1C38',
  },
  viewAllText: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: '#8259D2',
  },
  servicesScrollView: {
    marginHorizontal: -scale(18),
  },
  servicesRow: {
    paddingHorizontal: scale(18),
    gap: scale(12),
  },
  serviceCard: {
    width: scale(115),
    height: verticalScale(110),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    padding: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1.5,
    marginBottom: verticalScale(12),
  },
  serviceIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  serviceCardTitle: {
    fontSize: responsiveFontSize(11.5),
    fontWeight: '700',
    color: '#1C1C38',
    textAlign: 'center',
  },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    padding: scale(20),
    borderWidth: 1,
    borderColor: '#EBEBF0',
  },
  aboutDescription: {
    fontSize: responsiveFontSize(15),
    color: '#4F4F6A',
    lineHeight: 24,
    fontWeight: '400',
    marginBottom: verticalScale(20),
  },
  aboutPillsRow: {
    flexDirection: 'row',
    gap: scale(12),
  },
  aboutPill: {
    flex: 1,
    height: verticalScale(96),
    backgroundColor: '#EFF3FD',
    borderRadius: moderateScale(14),
    padding: scale(14),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  aboutPillText: {
    fontSize: responsiveFontSize(12.5),
    fontWeight: '700',
    color: '#1C1C38',
    lineHeight: 16,
  },
  startingFromText: {
    fontSize: responsiveFontSize(12),
    color: '#8D8DAD',
    fontWeight: '500',
  },
  pricingList: {
    gap: verticalScale(8),
  },
  pricingItem: {
    height: verticalScale(50),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1.5,
  },
  pricingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  purpleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8259D2',
  },
  pricingName: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '700',
    color: '#1C1C38',
    marginLeft: scale(12),
    flex: 1,
  },
  pricingVal: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '600',
    color: '#666680',
  },
  mapContainer: {
    width: '100%',
    height: verticalScale(130),
    borderRadius: moderateScale(16),
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  locationFooter: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: verticalScale(12),
    paddingHorizontal: scale(4),
  },
  locationPin: {
    marginRight: scale(8),
    marginTop: 2,
  },
  locationAddressText: {
    fontSize: responsiveFontSize(12),
    color: '#666680',
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
});

export default LaundryDetailScreen;

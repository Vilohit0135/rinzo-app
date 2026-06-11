import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, useFocusEffect, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import type { RootStackParamList } from '../../types/navigation';
import { allServices } from '../../data/services/servicesData';
import { useTabBar } from '../../utils/TabBarContext';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import { WashingMachineIcon, SteamIronIcon, HangerIcon } from '../../components/icons/ServiceIcons';

type ServiceDetailRouteProp = RouteProp<RootStackParamList, 'ServiceDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const serviceMetadata: Record<
  string,
  {
    description: string;
    categorization: string;
    turnover: string;
    iconType: 'wash' | 'iron' | 'specialized';
    priceLabel?: string;
  }
> = {
  'Wash & Fold': {
    description: 'Standard automated laundry service. Includes washing, drying, and neat folding of all items.',
    categorization: 'Standard',
    turnover: '24 Hours (Standard)',
    iconType: 'wash',
    priceLabel: '₹99.00 / Per KG',
  },
  'Iron Only': {
    description: 'Professional steam ironing removes every wrinkle. Perfect for shirts, formal wear, and delicate fabrics.',
    categorization: 'Standard',
    turnover: '12 Hours (Standard)',
    iconType: 'iron',
    priceLabel: '₹15.00 / Per Itm',
  },
  'Specialized Care': {
    description: 'Premium dry cleaning, steam pressing, blanket wash and more specialized treatments for all your fabrics.',
    categorization: 'Premium',
    turnover: '48 Hours (Standard)',
    iconType: 'specialized',
    priceLabel: 'from ₹15/pc',
  },
  'Dry Clean': {
    description: 'Premium dry cleaning service for your delicate garments, formal suits, and expensive fabrics.',
    categorization: 'Premium',
    turnover: '48 Hours (Standard)',
    iconType: 'specialized',
  },
  'Iron & Fold': {
    description: 'Wash, dry, steam iron, and neatly fold your garments for a complete wardrobe-ready look.',
    categorization: 'Standard',
    turnover: '24 Hours (Standard)',
    iconType: 'wash',
  },
  'Steam Press': {
    description: 'Heavy duty steam pressing for crisp wrinkles-free clothing. Best for cotton shirts and trousers.',
    categorization: 'Standard',
    turnover: '6 Hours (Express)',
    iconType: 'iron',
  },
  'Blanket Wash': {
    description: 'Deep cleaning and sanitization for heavy blankets, quilts, and comforters.',
    categorization: 'Standard',
    turnover: '48 Hours (Standard)',
    iconType: 'wash',
  },
  'Shoe Cleaning': {
    description: 'Complete shoe cleaning, sanitization, deodorization, and polishing for all shoe types.',
    categorization: 'Specialized',
    turnover: '24 Hours (Standard)',
    iconType: 'specialized',
  },
  'Curtain Dry Clean': {
    description: 'Curtain and drapes specialist cleaning to remove dust, allergens, and wrinkles.',
    categorization: 'Specialized',
    turnover: '72 Hours (Standard)',
    iconType: 'specialized',
  },
};

const ServiceDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ServiceDetailRouteProp>();
  const { serviceId, serviceTitle } = route.params;

  const { setTabBarVisible } = useTabBar();
  const [extraNotes, setExtraNotes] = useState('');

  // Keep bottom tab bar visible when entering this screen
  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(true);
    }, [setTabBarVisible])
  );

  // Retrieve base data from database services
  const service = allServices.find((s) => s.id === serviceId) ||
                  allServices.find((s) => s.title === serviceTitle) ||
                  allServices.find((s) => s.title.toLowerCase().includes(serviceTitle?.toLowerCase())) ||
                  { id: serviceId || '1', title: serviceTitle || 'Wash & Fold', unitPrice: 99, unit: 'Kg', subtitle: '', duration: '24 hrs' };

  // Fetch mockup specifications
  const meta = serviceMetadata[service.title] || {
    description: service.subtitle || 'Professional care for all types of clothes.',
    categorization: 'Standard',
    turnover: `${service.duration} (Standard)`,
    iconType: (service.title.toLowerCase().includes('iron') || service.title.toLowerCase().includes('press')) ? 'iron' : 'wash',
  };

  const priceDisplay = meta.priceLabel || `₹${service.unitPrice.toFixed(2)} / Per ${service.unit === 'Kg' ? 'KG' : service.unit === 'Itm' ? 'Itm' : service.unit}`;

  // Get matching SVG Icon Component
  const renderIcon = () => {
    switch (meta.iconType) {
      case 'iron':
        return <SteamIronIcon width={24} height={24} color="#7C5CE6" strokeWidth={2.2} />;
      case 'specialized':
        return <HangerIcon width={24} height={24} color="#7C5CE6" strokeWidth={2.2} />;
      case 'wash':
      default:
        return <WashingMachineIcon width={24} height={24} color="#7C5CE6" strokeWidth={2.2} />;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      
      {/* Custom Header matching layout */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#1E1E2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>
          {service.title} Details
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Service Description & Rate Card */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            {renderIcon()}
          </View>
          <Text style={styles.serviceTitle} allowFontScaling={false}>
            {service.title}
          </Text>
          <Text style={styles.description} allowFontScaling={false}>
            {meta.description}
          </Text>
          
          <View style={styles.divider} />
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel} allowFontScaling={false}>
              FIXED RATE
            </Text>
            <Text style={styles.priceValue} allowFontScaling={false}>
              {priceDisplay.split(' / ')[0]}
              <Text style={styles.priceUnit} allowFontScaling={false}>
                {priceDisplay.includes(' / ') ? ` / ${priceDisplay.split(' / ')[1]}` : ''}
              </Text>
            </Text>
          </View>
        </View>

        {/* Service Categorization Card */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Ionicons name="grid-outline" size={20} color="#7C5CE6" />
            <Text style={styles.sectionTitle} allowFontScaling={false}>
              Service Categorization
            </Text>
          </View>
          
          <View style={styles.badgeRow}>
            <Ionicons name="ribbon-outline" size={18} color="#7C5CE6" style={styles.badgeIcon} />
            <Text style={styles.badgeText} allowFontScaling={false}>
              {meta.categorization}
            </Text>
          </View>
          
          <Text style={styles.sectionLabel} allowFontScaling={false}>
            TURNOVER
          </Text>
          
          <View style={styles.badgeRow}>
            <Ionicons name="time-outline" size={18} color="#7C5CE6" style={styles.badgeIcon} />
            <Text style={styles.badgeText} allowFontScaling={false}>
              {meta.turnover}
            </Text>
          </View>
        </View>

        {/* Service Details Card */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text-outline" size={20} color="#7C5CE6" />
            <Text style={styles.sectionTitle} allowFontScaling={false}>
              Service Details
            </Text>
          </View>
          
          <Text style={styles.sectionLabel} allowFontScaling={false}>
            DESCRIPTION
          </Text>
          
          <TextInput
            style={styles.textInput}
            value={extraNotes}
            onChangeText={setExtraNotes}
            placeholder="Ex: High-quali.."
            placeholderTextColor="#A1A1AA"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            allowFontScaling={false}
          />
        </View>

        {/* Add to Cart button sits naturally above bottom tab bar */}
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => {}}>
          <Text style={styles.addButtonText} allowFontScaling={false}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F9FE',
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
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(120), // leaves space for absolute BottomTabBar (height 66 + bottom 24)
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(20),
    marginBottom: verticalScale(16),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(12),
    backgroundColor: 'rgba(124, 92, 230, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: responsiveFontSize(24),
    fontWeight: '800',
    color: '#1E1E2D',
    marginTop: verticalScale(16),
  },
  description: {
    fontSize: responsiveFontSize(14.5),
    color: '#6B7280',
    lineHeight: responsiveFontSize(21),
    marginTop: verticalScale(12),
    marginBottom: verticalScale(20),
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: verticalScale(16),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: '#8E8E8E',
    letterSpacing: 0.5,
  },
  priceValue: {
    fontSize: responsiveFontSize(20),
    fontWeight: '800',
    color: '#7C5CE6',
  },
  priceUnit: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '600',
    color: '#6B7280',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(14),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#1E1E2D',
    marginLeft: scale(8),
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: scale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(12),
  },
  badgeIcon: {
    marginRight: scale(6),
  },
  badgeText: {
    fontSize: responsiveFontSize(15),
    fontWeight: '600',
    color: '#1E1E2D',
  },
  sectionLabel: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: '#8E8E8E',
    letterSpacing: 0.5,
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8),
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: scale(12),
    padding: scale(14),
    fontSize: responsiveFontSize(15),
    color: '#1E1E2D',
    height: verticalScale(110),
  },
  addButton: {
    backgroundColor: '#7C5CE6',
    borderRadius: scale(12),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(8),
    shadowColor: '#7C5CE6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  addButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default ServiceDetailScreen;

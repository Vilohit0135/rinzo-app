import React, { useState, useEffect, useCallback } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, useFocusEffect, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import type { RootStackParamList } from '../../types/navigation';
import { allServices } from '../../data/services/servicesData';
import { garmentItems } from '../../data/services/itemsData';
import { useTabBar } from '../../utils/TabBarContext';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import { useBookingStore, calculateSubtotal } from '../../store/bookingStore';

type ServiceDetailRouteProp = RouteProp<RootStackParamList, 'ServiceDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const ServiceDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ServiceDetailRouteProp>();
  const { serviceTitle } = route.params;

  const { setTabBarVisible } = useTabBar();
  const storeServices = useBookingStore((s) => s.services);
  const clothesSummary = useBookingStore((s) => s.clothesSummary);
  const updateStoreQuantity = useBookingStore((s) => s.updateQuantity);
  const setServiceClothes = useBookingStore((s) => s.setServiceClothes);
  const clearStore = useBookingStore((s) => s.clear);

  const [activeToggle, setActiveToggle] = useState<'item' | 'kg'>('item');
  const [activeCategory, setActiveCategory] = useState<'Men' | 'Women' | 'Household' | 'Kids'>('Men');
  const [searchQuery, setSearchQuery] = useState('');

  // Automatically adjust initial toggle based on route parameter
  useEffect(() => {
    if (serviceTitle) {
      const titleLower = serviceTitle.toLowerCase();
      if (titleLower.includes('per kg') || titleLower.includes('weight') || titleLower.includes('fold')) {
        setActiveToggle('kg');
      } else {
        setActiveToggle('item');
      }
      
      if (titleLower.includes('household')) {
        setActiveCategory('Household');
      } else if (titleLower.includes('kids')) {
        setActiveCategory('Kids');
      } else if (titleLower.includes('women')) {
        setActiveCategory('Women');
      } else {
        setActiveCategory('Men');
      }
    }
  }, [serviceTitle]);

  // Hide bottom tab bar while focused
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

  // Subtotal and added items computation using helper
  const subtotal = calculateSubtotal(storeServices, clothesSummary);
  const totalItemsCount = storeServices.reduce((sum, s) => sum + s.quantity, 0);

  // List of weight-based services
  const weightServices = allServices.filter(s => s.unit === 'Kg');

  // Filtered lists based on search
  const filteredWeightServices = weightServices.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGarments = garmentItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = item.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && (searchQuery ? true : matchesCategory);
  });

  // Handle weight-based increments / decrements
  const handleWeightQuantityChange = (serviceId: string, diff: number) => {
    const service = storeServices.find(s => s.id === serviceId);
    if (!service) return;
    const currentQty = service.quantity;
    const nextQty = Math.max(0, currentQty + diff);
    updateStoreQuantity(serviceId, nextQty);
  };

  // Handle item-based garment increments / decrements
  const handleItemQuantityChange = (garmentId: string, diff: number) => {
    const garment = garmentItems.find(g => g.id === garmentId);
    if (!garment) return;

    const serviceId = garment.targetServiceId;
    const currentClothes = clothesSummary[serviceId] ? [...clothesSummary[serviceId]] : [];
    
    // Find item in current service clothes checklist
    let itemIndex = currentClothes.findIndex(c => c.name.toLowerCase() === garment.name.toLowerCase());
    
    if (itemIndex > -1) {
      const currentQty = currentClothes[itemIndex].quantity;
      const nextQty = Math.max(0, currentQty + diff);
      if (nextQty === 0) {
        currentClothes.splice(itemIndex, 1);
      } else {
        currentClothes[itemIndex] = { ...currentClothes[itemIndex], quantity: nextQty };
      }
    } else if (diff > 0) {
      currentClothes.push({ name: garment.name, quantity: diff, unitPrice: garment.price });
    }

    // Set new clothes checklist and update total service quantity
    setServiceClothes(serviceId, currentClothes);
    const newTotalServiceQty = currentClothes.reduce((sum, c) => sum + c.quantity, 0);
    updateStoreQuantity(serviceId, newTotalServiceQty);
  };

  const handleViewCart = () => {
    navigation.navigate('OrdersTab' as any, { screen: 'YourCart' });
  };

  const handleClearCart = () => {
    clearStore();
  };

  // Dynamic banner copy for weight-based category tabs
  const getWeightBannerDesc = () => {
    switch (activeCategory) {
      case 'Women':
        return "Perfect for Women's daily wear. Wash, dry, and fold at unbeatable rates per kilogram.";
      case 'Household':
        return "Perfect for blankets, sheets & household items. Wash, dry, and fold at unbeatable rates per kilogram.";
      case 'Kids':
        return "Perfect for kids' delicate clothes. Wash, dry, and fold at unbeatable rates per kilogram.";
      case 'Men':
      default:
        return "Perfect for Men's daily wear. Wash, dry, and fold at unbeatable rates per kilogram.";
    }
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
        <Text style={styles.headerTitle} allowFontScaling={false}>
          {activeToggle === 'kg' ? 'Price per KG' : 'Price per Item'}
        </Text>
        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={22} color="#1C1C30" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for items (e.g. Shirt, Saree)"
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          allowFontScaling={false}
        />
      </View>

      {/* Pricing Toggle Switches */}
      <View style={styles.toggleOuterContainer}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleBtn, activeToggle === 'item' && styles.toggleBtnActive]}
            onPress={() => {
              setActiveToggle('item');
              setSearchQuery('');
            }}
            activeOpacity={0.85}
          >
            <Text style={[styles.toggleText, activeToggle === 'item' && styles.toggleTextActive]} allowFontScaling={false}>
              Price per Item
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, activeToggle === 'kg' && styles.toggleBtnActive]}
            onPress={() => {
              setActiveToggle('kg');
              setSearchQuery('');
            }}
            activeOpacity={0.85}
          >
            <Text style={[styles.toggleText, activeToggle === 'kg' && styles.toggleTextActive]} allowFontScaling={false}>
              Service per KG
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs (ALWAYS visible per user instructions) */}
      {!searchQuery && (
        <View style={styles.categoryContainer}>
          {['Men', 'Women', 'Household', 'Kids'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryTab, activeCategory === cat && styles.categoryTabActive]}
              onPress={() => setActiveCategory(cat as any)}
              activeOpacity={0.7}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]} allowFontScaling={false}>
                {cat}
              </Text>
              {activeCategory === cat && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner Segment */}
        {activeToggle === 'kg' ? (
          <View style={styles.bannerContainer}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle} allowFontScaling={false}>
                Weight-based Laundry
              </Text>
              <Text style={styles.bannerDesc} allowFontScaling={false}>
                {getWeightBannerDesc()}
              </Text>
            </View>
            <Image
              source={require('../../../assets/images/service/weight-based.jpg')}
              style={styles.bannerImage}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={styles.dryCleanBannerContainer}>
            <Image
              source={require('../../../assets/images/service/dry-clean-banner.png')}
              style={styles.dryCleanBannerBg}
              resizeMode="cover"
            />
            <View style={styles.dryCleanBannerOverlay} />
            <View style={styles.dryCleanBannerContent}>
              <View style={styles.flashBadge}>
                <Text style={styles.flashBadgeText} allowFontScaling={false}>FLASH SALE</Text>
              </View>
              <Text style={styles.dryCleanTitle} allowFontScaling={false}>
                Premium Dry Clean
              </Text>
              <Text style={styles.dryCleanDesc} allowFontScaling={false}>
                20% off on all Silk items
              </Text>
            </View>
          </View>
        )}

        <Text style={styles.listSectionTitle} allowFontScaling={false}>
          Available Services
        </Text>

        {/* Services / Garments List */}
        <View style={styles.listContainer}>
          {activeToggle === 'kg' ? (
            filteredWeightServices.map((service) => {
              const currentQty = storeServices.find(s => s.id === service.id)?.quantity || 0;
              
              let iconName = 'shirt-outline';
              if (service.title.includes('Iron')) iconName = 'color-wand-outline';
              if (service.title.includes('Premium')) iconName = 'ribbon-outline';
              if (service.title.includes('Press')) iconName = 'water-outline';

              return (
                <View key={service.id} style={styles.card}>
                  <View style={styles.cardLeft}>
                    <View style={styles.iconWrap}>
                      <Ionicons name={iconName as any} size={22} color="#7C4DFF" />
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle} allowFontScaling={false}>
                        {service.title}
                      </Text>
                      <Text style={styles.cardPrice} allowFontScaling={false}>
                        ₹{service.unitPrice}/kg
                      </Text>
                    </View>
                  </View>
                  
                  {currentQty === 0 ? (
                    <TouchableOpacity
                      style={styles.addBtn}
                      activeOpacity={0.8}
                      onPress={() => handleWeightQuantityChange(service.id, 1)}
                    >
                      <Ionicons name="add" size={20} color="#7C4DFF" />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.counterPill}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleWeightQuantityChange(service.id, -1)}
                      >
                        <Ionicons name="remove" size={16} color="#7C4DFF" />
                      </TouchableOpacity>
                      <Text style={styles.counterValue} allowFontScaling={false}>
                        {currentQty} kg
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleWeightQuantityChange(service.id, 1)}
                      >
                        <Ionicons name="add" size={16} color="#7C4DFF" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })
          ) : (
            filteredGarments.map((item) => {
              // Calculate current selected item quantity from corresponding service's clothes summary
              const serviceClothes = clothesSummary[item.targetServiceId] || [];
              const currentQty = serviceClothes.find(c => c.name.toLowerCase() === item.name.toLowerCase())?.quantity || 0;

              return (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardLeft}>
                    <View style={styles.iconWrap}>
                      <Ionicons name={item.icon as any} size={22} color="#7C4DFF" />
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle} allowFontScaling={false}>
                        {item.name}
                      </Text>
                      <Text style={styles.cardSubtitle} allowFontScaling={false}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.cardRightWrap}>
                    <Text style={styles.cardPricePerItem} allowFontScaling={false}>
                      ₹{item.price}
                    </Text>

                    {currentQty === 0 ? (
                      <TouchableOpacity
                        style={styles.addBtn}
                        activeOpacity={0.8}
                        onPress={() => handleItemQuantityChange(item.id, 1)}
                      >
                        <Ionicons name="add" size={20} color="#7C4DFF" />
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.counterPill}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => handleItemQuantityChange(item.id, -1)}
                        >
                          <Ionicons name="remove" size={16} color="#7C4DFF" />
                        </TouchableOpacity>
                        <Text style={styles.counterValue} allowFontScaling={false}>
                          {currentQty}
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => handleItemQuantityChange(item.id, 1)}
                        >
                          <Ionicons name="add" size={16} color="#7C4DFF" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              );
            })
          )}
        </View>

        {activeToggle === 'kg' && (
          <View style={styles.infoLabelContainer}>
            <Ionicons name="information-circle-outline" size={16} color="#8E8E9E" style={styles.infoIcon} />
            <Text style={styles.infoLabel} allowFontScaling={false}>
              Minimum order weight: 3kg
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Footer Cart Bar matching Mockup */}
      <View style={styles.footerContainer}>
        <View style={styles.footerInner}>
          <View style={styles.footerSummaryRow}>
            <View style={styles.footerInfoCol}>
              <View style={styles.basketIconWrap}>
                <Ionicons name="basket-outline" size={20} color="#7C4DFF" />
              </View>
              <View style={styles.footerTextWrap}>
                <Text style={styles.footerItemsText} allowFontScaling={false}>
                  {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} Added
                </Text>
                <Text style={styles.footerSubtotalText} allowFontScaling={false}>
                  Subtotal: ₹{subtotal}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleClearCart}
              style={styles.clearBtn}
            >
              <Text style={styles.clearBtnText} allowFontScaling={false}>Clear</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.viewCartBtn}
            activeOpacity={0.85}
            onPress={handleViewCart}
          >
            <Text style={styles.viewCartBtnText} allowFontScaling={false}>
              View My Cart
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={styles.viewCartIcon} />
          </TouchableOpacity>
        </View>
      </View>
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
  bellButton: {
    padding: scale(2),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(12),
    marginHorizontal: scale(16),
    marginTop: verticalScale(14),
    paddingHorizontal: scale(14),
    height: verticalScale(44),
  },
  searchIcon: {
    marginRight: scale(10),
  },
  searchInput: {
    flex: 1,
    fontSize: responsiveFontSize(14),
    color: '#1C1C30',
    paddingVertical: 0,
    fontWeight: '400',
  },
  toggleOuterContainer: {
    alignItems: 'center',
    marginTop: verticalScale(14),
    marginHorizontal: scale(16),
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(12),
    padding: scale(4),
    width: '100%',
    height: verticalScale(46),
  },
  toggleBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '600',
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#7C4DFF',
    fontWeight: '700',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(14),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    height: verticalScale(44),
  },
  categoryTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
  },
  categoryTabActive: {},
  categoryText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#7C4DFF',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: scale(20),
    right: scale(20),
    height: verticalScale(3),
    backgroundColor: '#7C4DFF',
    borderTopLeftRadius: moderateScale(3),
    borderTopRightRadius: moderateScale(3),
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(160), // Larger padding for the height of the dual-row footer
  },
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: '#824CF4',
    borderRadius: moderateScale(16),
    padding: scale(16),
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(140),
    shadowColor: '#824CF4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerContent: {
    flex: 1.2,
    marginRight: scale(8),
  },
  bannerTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bannerDesc: {
    fontSize: responsiveFontSize(12),
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: verticalScale(6),
    lineHeight: responsiveFontSize(16),
    fontWeight: '500',
  },
  bannerImage: {
    flex: 0.8,
    height: '110%',
    width: '100%',
    marginBottom: verticalScale(-15),
  },
  dryCleanBannerContainer: {
    height: verticalScale(140),
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  dryCleanBannerBg: {
    width: '100%',
    height: '100%',
  },
  dryCleanBannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(124, 77, 255, 0.25)', // slight purple overlay
  },
  dryCleanBannerContent: {
    position: 'absolute',
    left: scale(16),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  flashBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    alignSelf: 'flex-start',
    marginBottom: verticalScale(8),
  },
  flashBadgeText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(9.5),
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dryCleanTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dryCleanDesc: {
    fontSize: responsiveFontSize(13),
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: verticalScale(4),
    fontWeight: '500',
  },
  listSectionTitle: {
    fontSize: responsiveFontSize(15),
    fontWeight: '800',
    color: '#1C1C30',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(12),
  },
  listContainer: {
    gap: verticalScale(12),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#EFEFF4',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(74),
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(10),
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(14),
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: '800',
    color: '#1C1C30',
  },
  cardSubtitle: {
    fontSize: responsiveFontSize(12),
    color: '#8E8E9E',
    marginTop: verticalScale(2),
    fontWeight: '500',
  },
  cardPrice: {
    fontSize: responsiveFontSize(12.5),
    color: '#8E8E9E',
    marginTop: verticalScale(2),
    fontWeight: '500',
  },
  cardRightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  cardPricePerItem: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '800',
    color: '#1C1C30',
  },
  addBtn: {
    backgroundColor: '#EFEFF4',
    borderRadius: moderateScale(18),
    width: scale(36),
    height: scale(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3EEFF',
    borderWidth: 1,
    borderColor: '#DCD4FF',
    borderRadius: moderateScale(20),
    width: scale(95),
    height: verticalScale(34),
    paddingHorizontal: scale(8),
  },
  counterValue: {
    fontSize: responsiveFontSize(13),
    fontWeight: '700',
    color: '#7C4DFF',
    textAlign: 'center',
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(24),
  },
  infoIcon: {
    marginRight: scale(4),
  },
  infoLabel: {
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
    paddingBottom: Platform.OS === 'ios' ? verticalScale(26) : verticalScale(14),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  footerInner: {
    gap: verticalScale(12),
  },
  footerSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerInfoCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  basketIconWrap: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  footerTextWrap: {
    justifyContent: 'center',
  },
  footerItemsText: {
    fontSize: responsiveFontSize(13.5),
    fontWeight: '700',
    color: '#1C1C30',
  },
  footerSubtotalText: {
    fontSize: responsiveFontSize(12),
    color: '#8E8E9E',
    fontWeight: '500',
    marginTop: verticalScale(1),
  },
  clearBtn: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
  },
  clearBtnText: {
    color: '#7C4DFF',
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
  },
  viewCartBtn: {
    backgroundColor: '#7C4DFF',
    borderRadius: moderateScale(10),
    height: verticalScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  viewCartBtnText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
  },
  viewCartIcon: {
    marginLeft: scale(6),
  },
});

export default ServiceDetailScreen;

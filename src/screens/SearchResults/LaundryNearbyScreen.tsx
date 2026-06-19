import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS } from '../../constants/colors';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import { laundryItems } from '../../data/laundry/laundryData';
import LaundryNearbyCard from '../../components/search/LaundryNearbyCard';
import SearchFilterModal, { FilterState } from '../../components/search/SearchFilterModal';

type RootStackParamList = {
  LaundryNearby: undefined;
  LaundryDetail: { id: string };
};

const laundryImageMap: Record<string, any> = {
  'Krishna Laundry': require('../../../assets/images/Laundry/krishna-laundry.png'),
  'Royal Wash': require('../../../assets/images/Laundry/royal-wash.jpg'),
  'Eco Laundry Hub': require('../../../assets/images/Laundry/krishna-laundry.png'),
  'Sparkle Dry Clean': require('../../../assets/images/Laundry/royal-wash.jpg'),
  'Crystal Clean': require('../../../assets/images/Laundry/krishna-laundry.png'),
  'EcoWash Hub': require('../../../assets/images/Laundry/royal-wash.jpg'),
  'Presto Laundry': require('../../../assets/images/Laundry/krishna-laundry.png'),
};

const LaundryNearbyScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'LaundryNearby'>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeQuickFilter, setActiveQuickFilter] = useState<string>(''); // '', 'rating', 'distance', 'price'
  
  // Custom filter states
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'distance', // Default sorting is by distance as shown in header
    serviceTypes: [],
    ratings: [],
    availability: [],
    priceRange: '',
  });

  const handleQuickFilterPress = (filterType: string) => {
    setActiveQuickFilter((prev) => (prev === filterType ? '' : filterType));
  };

  // Filter and sort the list of shops
  const filteredShops = useMemo(() => {
    let result = [...laundryItems];

    // 1. Text Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (shop) =>
          shop.name.toLowerCase().includes(q) ||
          shop.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 2. Quick Filters (from the chips)
    if (activeQuickFilter === 'rating') {
      result = result.filter((shop) => shop.rating >= 4.5);
    }

    // 3. Modal Filters
    if (filters.ratings.length > 0) {
      const minRatings = filters.ratings.map((r) => parseFloat(r.replace('+', '')));
      result = result.filter((shop) => minRatings.some((min) => shop.rating >= min));
    }

    if (filters.serviceTypes.length > 0) {
      // Filter if the shop description or tags match service type
      result = result.filter((shop) =>
        filters.serviceTypes.some((serviceType) =>
          shop.services.some((s) => s.name.toLowerCase().includes(serviceType.toLowerCase()))
        )
      );
    }

    if (filters.availability.length > 0) {
      result = result.filter((shop) =>
        filters.availability.some((a) => {
          if (a.toLowerCase().includes('open')) return shop.isOpen;
          if (a.toLowerCase().includes('pickup')) {
            return shop.tags.some((t) => t.toLowerCase().includes('pickup'));
          }
          return true;
        })
      );
    }

    if (filters.priceRange) {
      result = result.filter((shop) => {
        const priceNum = parseInt(shop.price.replace(/[^0-9]/g, ''), 10);
        if (isNaN(priceNum)) return true;
        if (filters.priceRange === 'under30') return priceNum < 30;
        if (filters.priceRange === '30to50') return priceNum >= 30 && priceNum <= 50;
        if (filters.priceRange === 'above50') return priceNum > 50;
        return true;
      });
    }

    // 4. Sorting
    // Priority: Quick filters, then Modal Sort
    let sortOption = filters.sortBy;
    if (activeQuickFilter === 'distance') {
      sortOption = 'distance';
    } else if (activeQuickFilter === 'price') {
      sortOption = 'priceLowHigh';
    }

    if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'distance') {
      result.sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });
    } else if (sortOption === 'priceLowHigh') {
      result.sort((a, b) => {
        const valA = parseInt(a.price.replace(/[^0-9]/g, ''), 10);
        const valB = parseInt(b.price.replace(/[^0-9]/g, ''), 10);
        return valA - valB;
      });
    } else if (sortOption === 'priceHighLow') {
      result.sort((a, b) => {
        const valA = parseInt(a.price.replace(/[^0-9]/g, ''), 10);
        const valB = parseInt(b.price.replace(/[^0-9]/g, ''), 10);
        return valB - valA;
      });
    }

    return result;
  }, [searchQuery, activeQuickFilter, filters]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.sortBy !== 'distance') count++;
    count += filters.serviceTypes.length;
    count += filters.ratings.length;
    count += filters.availability.length;
    if (filters.priceRange) count++;
    return count;
  }, [filters]);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setShowFilterModal(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#1C1C38" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} allowFontScaling={false}>
            laundry Nearby
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={18} color="#8D8DAD" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for services or laundries.."
            placeholderTextColor="#8D8DAD"
            value={searchQuery}
            onChangeText={setSearchQuery}
            allowFontScaling={false}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowFilterModal(true)}
            style={styles.filterButton}
          >
            <Ionicons name="options-outline" size={20} color="#8D8DAD" />
            {activeFiltersCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText} allowFontScaling={false}>
                  {activeFiltersCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Filter Chips Scroll Row */}
        <View style={styles.chipsSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsRow}
          >
            {/* All Filters Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowFilterModal(true)}
              style={[
                styles.chip,
                styles.allFiltersChip,
                activeFiltersCount > 0 && styles.allFiltersChipActive,
              ]}
            >
              <Ionicons
                name="funnel"
                size={12}
                color="#FFFFFF"
                style={styles.chipIcon}
              />
              <Text style={styles.allFiltersText} allowFontScaling={false}>
                All Filters
              </Text>
            </TouchableOpacity>

            {/* Rating 4.5+ */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleQuickFilterPress('rating')}
              style={[
                styles.chip,
                styles.greyChip,
                activeQuickFilter === 'rating' && styles.activeChip,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  activeQuickFilter === 'rating' && styles.activeChipText,
                ]}
                allowFontScaling={false}
              >
                Rating 4.5+
              </Text>
            </TouchableOpacity>

            {/* Distance */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleQuickFilterPress('distance')}
              style={[
                styles.chip,
                styles.greyChip,
                activeQuickFilter === 'distance' && styles.activeChip,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  activeQuickFilter === 'distance' && styles.activeChipText,
                ]}
                allowFontScaling={false}
              >
                Distance
              </Text>
            </TouchableOpacity>

            {/* Price */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleQuickFilterPress('price')}
              style={[
                styles.chip,
                styles.greyChip,
                activeQuickFilter === 'price' && styles.activeChip,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  activeQuickFilter === 'price' && styles.activeChipText,
                ]}
                allowFontScaling={false}
              >
                Price
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* List Header */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.listHeaderTitle} allowFontScaling={false}>
            {filteredShops.length} Shops Nearby
          </Text>
          <Text style={styles.sortText} allowFontScaling={false}>
            Sorted by {activeQuickFilter === 'price' ? 'Price' : activeQuickFilter === 'rating' ? 'Rating' : 'Distance'}
          </Text>
        </View>

        {/* Scrollable list of cards */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => (
              <LaundryNearbyCard
                key={shop.id}
                id={shop.id}
                name={shop.name}
                rating={shop.rating}
                reviewCount={shop.reviewCount}
                distance={shop.distance}
                locationArea={shop.locationArea}
                price={shop.price}
                tags={shop.tags}
                imageSource={laundryImageMap[shop.name]}
                onPress={() => navigation.navigate('LaundryDetail', { id: shop.id })}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color="#C4C4D4" />
              <Text style={styles.emptyText} allowFontScaling={false}>
                No laundry shops found matching the filters.
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Filter Bottom Sheet Modal */}
      <SearchFilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
        resultCount={filteredShops.length}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  flex: {
    flex: 1,
  },
  header: {
    height: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    marginTop: verticalScale(5),
  },
  backButton: {
    marginRight: scale(10),
  },
  headerTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1C1C38',
  },
  searchBarContainer: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    marginHorizontal: scale(18),
    marginTop: verticalScale(10),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: scale(8),
    fontSize: responsiveFontSize(14.5),
    color: '#1C1C38',
    paddingVertical: 0,
  },
  filterButton: {
    paddingLeft: scale(8),
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#8259D2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  filterBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chipsSection: {
    marginTop: verticalScale(14),
  },
  chipsRow: {
    paddingHorizontal: scale(18),
    gap: scale(8),
  },
  chip: {
    height: 30,
    borderRadius: 15,
    paddingHorizontal: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  allFiltersChip: {
    backgroundColor: '#8259D2',
  },
  allFiltersChipActive: {
    backgroundColor: '#6C40C5',
  },
  allFiltersText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(12.5),
    fontWeight: '600',
  },
  chipIcon: {
    marginRight: scale(4),
  },
  greyChip: {
    backgroundColor: '#F1F1F4',
  },
  activeChip: {
    backgroundColor: '#EFE9FF',
    borderWidth: 1,
    borderColor: '#BDA3FF',
  },
  chipText: {
    color: '#4F4F6A',
    fontSize: responsiveFontSize(12.5),
    fontWeight: '600',
  },
  activeChipText: {
    color: '#8259D2',
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(8),
  },
  listHeaderTitle: {
    fontSize: responsiveFontSize(16.5),
    fontWeight: '700',
    color: '#1C1C38',
  },
  sortText: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: '#8259D2',
  },
  scrollContainer: {
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(4),
    paddingBottom: verticalScale(110), // ensures space above bottom tab bar
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(60),
    gap: verticalScale(10),
  },
  emptyText: {
    fontSize: responsiveFontSize(13.5),
    color: '#8D8DAD',
    textAlign: 'center',
    paddingHorizontal: scale(30),
  },
});

export default LaundryNearbyScreen;

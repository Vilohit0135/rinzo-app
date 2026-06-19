import { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import {
  scale,
  verticalScale,
  moderateScale,
  responsiveFontSize,
} from '../../utils/responsive';

export interface FilterState {
  sortBy: string;
  serviceTypes: string[];
  ratings: string[];
  availability: string[];
  priceRange: string; // Added to support mockup price filters
}

const DEFAULT_FILTERS: FilterState = {
  sortBy: 'distance', // Set default sorting to 'distance' as shown in mockup
  serviceTypes: [],
  ratings: [],
  availability: [],
  priceRange: '',
};

interface SearchFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
  resultCount?: number; // Optional so it is backward compatible
}

const SearchFilterModal = ({
  visible,
  onClose,
  onApply,
  initialFilters,
}: SearchFilterModalProps) => {
  const [localSortBy, setLocalSortBy] = useState(initialFilters.sortBy || 'distance');
  const [localServiceTypes, setLocalServiceTypes] = useState<string[]>(
    initialFilters.serviceTypes || []
  );
  const [localPriceRange, setLocalPriceRange] = useState(
    initialFilters.priceRange || ''
  );
  const [localRatings, setLocalRatings] = useState<string[]>(
    initialFilters.ratings || []
  );

  // Sync state with parent's current filters when opening
  useEffect(() => {
    if (visible) {
      setLocalSortBy(initialFilters.sortBy || 'distance');
      setLocalServiceTypes(initialFilters.serviceTypes || []);
      setLocalPriceRange(initialFilters.priceRange || '');
      setLocalRatings(initialFilters.ratings || []);
    }
  }, [visible, initialFilters]);

  const handleClearAll = () => {
    setLocalSortBy('distance');
    setLocalServiceTypes([]);
    setLocalPriceRange('');
    setLocalRatings([]);
  };

  const handleApply = () => {
    onApply({
      sortBy: localSortBy,
      serviceTypes: localServiceTypes,
      priceRange: localPriceRange,
      ratings: localRatings,
      availability: initialFilters.availability || [], // Maintain compatibility
    });
    onClose();
  };

  // Toggle multi-select arrays
  const toggleSelection = (
    arr: string[],
    item: string,
    setter: (v: string[]) => void
  ) => {
    if (arr.includes(item)) {
      setter(arr.filter((i) => i !== item));
    } else {
      setter([...arr, item]);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {/* Top Grab Indicator Bar */}
              <View style={styles.grabIndicator} />

              {/* Title Section */}
              <View style={styles.header}>
                <Text style={styles.title} allowFontScaling={false}>
                  Filters
                </Text>
                <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
                  <Text style={styles.clearAll} allowFontScaling={false}>
                    Clear All
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sort By Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle} allowFontScaling={false}>
                  Sort By
                </Text>
                <View style={styles.pillsContainer}>
                  {[
                    { label: 'Distance', value: 'distance' },
                    { label: 'Rating', value: 'rating' },
                    { label: 'Price', value: 'priceLowHigh' },
                  ].map((opt) => {
                    const isSelected = localSortBy === opt.value;
                    return (
                      <TouchableOpacity
                        key={opt.value}
                        style={[
                          styles.pill,
                          isSelected ? styles.pillSelected : styles.pillUnselected,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => setLocalSortBy(isSelected ? '' : opt.value)}
                      >
                        <Text
                          style={[
                            styles.pillText,
                            isSelected ? styles.pillTextSelected : styles.pillTextUnselected,
                          ]}
                          allowFontScaling={false}
                        >
                          {opt.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Service Type Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle} allowFontScaling={false}>
                  Service Type
                </Text>
                <View style={styles.pillsContainer}>
                  {[
                    { label: 'Wash & Fold', value: 'Wash & Iron' },
                    { label: 'Dry Clean', value: 'Dry Clean' },
                    { label: 'Steam Iron', value: 'Steam Press' },
                  ].map((opt) => {
                    const isSelected = localServiceTypes.includes(opt.value);
                    return (
                      <TouchableOpacity
                        key={opt.value}
                        style={[
                          styles.pill,
                          isSelected ? styles.pillSelected : styles.pillUnselected,
                        ]}
                        activeOpacity={0.8}
                        onPress={() =>
                          toggleSelection(localServiceTypes, opt.value, setLocalServiceTypes)
                        }
                      >
                        <Text
                          style={[
                            styles.pillText,
                            isSelected ? styles.pillTextSelected : styles.pillTextUnselected,
                          ]}
                          allowFontScaling={false}
                        >
                          {opt.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Price Range Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle} allowFontScaling={false}>
                  Price Range
                </Text>
                <View style={styles.pillsContainer}>
                  {[
                    { label: 'Under ₹30', value: 'under30' },
                    { label: '₹30 - ₹50', value: '30to50' },
                    { label: 'Above ₹50', value: 'above50' },
                  ].map((opt) => {
                    const isSelected = localPriceRange === opt.value;
                    return (
                      <TouchableOpacity
                        key={opt.value}
                        style={[
                          styles.pill,
                          isSelected ? styles.pillSelected : styles.pillUnselected,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => setLocalPriceRange(isSelected ? '' : opt.value)}
                      >
                        <Text
                          style={[
                            styles.pillText,
                            isSelected ? styles.pillTextSelected : styles.pillTextUnselected,
                          ]}
                          allowFontScaling={false}
                        >
                          {opt.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Ratings Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle} allowFontScaling={false}>
                  Ratings
                </Text>
                <View style={styles.pillsContainer}>
                  {[
                    { label: '4.0+', value: '4.0+' },
                    { label: '4.5+', value: '4.5+' },
                  ].map((opt) => {
                    const isSelected = localRatings.includes(opt.value);
                    return (
                      <TouchableOpacity
                        key={opt.value}
                        style={[
                          styles.pill,
                          isSelected ? styles.pillSelected : styles.pillUnselected,
                          styles.ratingPill,
                        ]}
                        activeOpacity={0.8}
                        onPress={() =>
                          toggleSelection(localRatings, opt.value, setLocalRatings)
                        }
                      >
                        <Ionicons
                          name="star"
                          size={12}
                          color={isSelected ? '#FFFFFF' : '#F5A623'}
                          style={styles.starIcon}
                        />
                        <Text
                          style={[
                            styles.pillText,
                            isSelected ? styles.pillTextSelected : styles.pillTextUnselected,
                          ]}
                          allowFontScaling={false}
                        >
                          {opt.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Bottom Apply Button */}
              <TouchableOpacity
                style={styles.applyButton}
                activeOpacity={0.85}
                onPress={handleApply}
              >
                <Text style={styles.applyText} allowFontScaling={false}>
                  Apply Filters
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(28, 28, 48, 0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(34),
  },
  grabIndicator: {
    width: scale(40),
    height: verticalScale(4),
    backgroundColor: '#E2E5EC',
    borderRadius: moderateScale(2),
    alignSelf: 'center',
    marginBottom: verticalScale(14),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(14),
  },
  title: {
    fontSize: responsiveFontSize(22),
    fontWeight: '800',
    color: '#1C1C30',
  },
  clearAll: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '700',
    color: '#8259D2',
  },
  section: {
    marginTop: verticalScale(16),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#1C1C30',
    marginBottom: verticalScale(10),
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  pill: {
    height: verticalScale(36),
    borderRadius: moderateScale(18),
    paddingHorizontal: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pillSelected: {
    backgroundColor: '#8259D2',
    borderColor: '#8259D2',
  },
  pillUnselected: {
    backgroundColor: '#F8F7FC',
    borderColor: '#E6E1F5',
  },
  pillText: {
    fontSize: responsiveFontSize(13.5),
  },
  pillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  pillTextUnselected: {
    color: '#4F4F6A',
    fontWeight: '600',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: scale(4),
  },
  applyButton: {
    marginTop: verticalScale(32),
    height: verticalScale(48),
    borderRadius: moderateScale(14),
    backgroundColor: '#8259D2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8259D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  applyText: {
    fontSize: responsiveFontSize(15.5),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default SearchFilterModal;

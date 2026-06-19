import { useState, useEffect } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

export interface FilterState {
  sortBy: 'relevance' | 'priceLowHigh' | 'priceHighLow';
  serviceTypes: string[];
  priceRange: 'all' | 'under50' | '50to100' | '100to200' | '200plus';
}

const DEFAULT_FILTERS: FilterState = {
  sortBy: 'relevance',
  serviceTypes: [],
  priceRange: 'all',
};

const sortOptions = [
  { value: 'relevance' as const, label: 'Relevance' },
  { value: 'priceLowHigh' as const, label: 'Price Low → High' },
  { value: 'priceHighLow' as const, label: 'Price High → Low' },
];

const priceRangeOptions = [
  { value: 'all' as const, label: 'All' },
  { value: 'under50' as const, label: 'Under ₹50' },
  { value: '50to100' as const, label: '₹50 – ₹100' },
  { value: '100to200' as const, label: '₹100 – ₹200' },
  { value: '200plus' as const, label: '₹200+' },
];

interface ServiceFilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
  availableServiceTypes: string[];
}

const RadioButton = ({ selected }: { selected: boolean }) => (
  <View style={[radioStyles.circle, selected && radioStyles.selectedCircle]}>
    {selected && <View style={radioStyles.dot} />}
  </View>
);

const radioStyles = StyleSheet.create({
  circle: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: '#D1D1D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    borderColor: '#8259D2',
  },
  dot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: '#8259D2',
  },
});

const CheckBox = ({ selected }: { selected: boolean }) => (
  <View style={[checkStyles.box, selected && checkStyles.selectedBox]}>
    {selected && (
      <Ionicons name="checkmark" size={scale(14)} color="#FFFFFF" />
    )}
  </View>
);

const checkStyles = StyleSheet.create({
  box: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(6),
    borderWidth: 2,
    borderColor: '#D1D1D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBox: {
    backgroundColor: '#8259D2',
    borderColor: '#8259D2',
  },
});

const ServiceFilterBottomSheet = ({
  visible,
  onClose,
  onApply,
  initialFilters,
  availableServiceTypes,
}: ServiceFilterBottomSheetProps) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  useEffect(() => {
    if (visible) {
      setFilters(initialFilters);
    }
  }, [visible, initialFilters]);

  const toggleServiceType = (type: string) => {
    setFilters((prev) => {
      const exists = prev.serviceTypes.includes(type);
      return {
        ...prev,
        serviceTypes: exists
          ? prev.serviceTypes.filter((t) => t !== type)
          : [...prev.serviceTypes, type],
      };
    });
  };

  const activeFilterCount =
    filters.serviceTypes.length + (filters.priceRange !== 'all' ? 1 : 0);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClearAll = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.sheet}>
          <View style={styles.handleContainer}>
            <View style={styles.dragHandle} />
          </View>

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle} allowFontScaling={false}>
              Filters
            </Text>
            <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
              <Text style={styles.clearAll} allowFontScaling={false}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.sectionTitle} allowFontScaling={false}>
              Sort By
            </Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() =>
                  setFilters((prev) => ({ ...prev, sortBy: option.value }))
                }
              >
                <RadioButton selected={filters.sortBy === option.value} />
                <Text style={styles.optionLabel} allowFontScaling={false}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}

            <Text
              style={[styles.sectionTitle, styles.sectionSpacing]}
              allowFontScaling={false}
            >
              Service Type
            </Text>
            {availableServiceTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => toggleServiceType(type)}
              >
                <CheckBox selected={filters.serviceTypes.includes(type)} />
                <Text style={styles.optionLabel} allowFontScaling={false}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}

            <Text
              style={[styles.sectionTitle, styles.sectionSpacing]}
              allowFontScaling={false}
            >
              Price Range
            </Text>
            {priceRangeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() =>
                  setFilters((prev) => ({ ...prev, priceRange: option.value }))
                }
              >
                <RadioButton selected={filters.priceRange === option.value} />
                <Text style={styles.optionLabel} allowFontScaling={false}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.applyContainer}>
            <TouchableOpacity
              style={styles.applyButton}
              activeOpacity={0.8}
              onPress={handleApply}
            >
              <Text style={styles.applyText} allowFontScaling={false}>
                {activeFilterCount > 0
                  ? `Apply (${activeFilterCount})`
                  : 'Apply'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayTop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    maxHeight: '85%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(4),
  },
  dragHandle: {
    width: scale(36),
    height: verticalScale(4),
    borderRadius: scale(2),
    backgroundColor: '#D1D1D6',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: '700',
    color: '#171A2C',
  },
  clearAll: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#8259D2',
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#171A2C',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(4),
  },
  sectionSpacing: {
    marginTop: verticalScale(20),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    gap: scale(14),
  },
  optionLabel: {
    fontSize: responsiveFontSize(15),
    fontWeight: '500',
    color: '#3A3A3A',
    flex: 1,
  },
  applyContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(30) : verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  applyButton: {
    height: verticalScale(50),
    borderRadius: scale(12),
    backgroundColor: '#8259D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default ServiceFilterBottomSheet;

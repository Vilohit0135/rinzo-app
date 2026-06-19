import { useState, type ReactNode } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
}

const DEFAULT_FILTERS: FilterState = {
  sortBy: 'relevance',
  serviceTypes: [],
  ratings: [],
  availability: [],
};

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'rating', label: 'Rating (High → Low)' },
  { value: 'distance', label: 'Distance (Nearby)' },
  { value: 'priceLowHigh', label: 'Price (Low → High)' },
  { value: 'priceHighLow', label: 'Price (High → Low)' },
];

const serviceTypeOptions = [
  'Wash & Iron',
  'Dry Clean',
  'Iron Only',
  'Steam Press',
];

const ratingOptions = [
  { value: '4.5+', label: '4.5 & Above' },
  { value: '4.0+', label: '4.0 & Above' },
  { value: '3.5+', label: '3.5 & Above' },
];

const availabilityOptions = [
  { value: 'Free Pickup', label: 'Free Pickup' },
  { value: 'Express', label: 'Express Service' },
];

interface SearchFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
  resultCount: number;
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
    borderColor: COLORS.purple,
  },
  dot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: COLORS.purple,
  },
});

const CheckBox = ({ selected }: { selected: boolean }) => (
  <View style={[checkStyles.box, selected && checkStyles.selectedBox]}>
    {selected && (
      <Ionicons name="checkmark" size={scale(14)} color={COLORS.white} />
    )}
  </View>
);

const checkStyles = StyleSheet.create({
  box: {
    width: scale(20),
    height: scale(20),
    borderRadius: moderateScale(4),
    borderWidth: 2,
    borderColor: '#D1D1D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBox: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.purple,
  },
});

const SearchFilterModal = ({
  visible,
  onClose,
  onApply,
  initialFilters,
  resultCount,
}: SearchFilterModalProps) => {
  const [localSortBy, setLocalSortBy] = useState(initialFilters.sortBy);
  const [localServiceTypes, setLocalServiceTypes] = useState<string[]>(
    initialFilters.serviceTypes
  );
  const [localRatings, setLocalRatings] = useState<string[]>(
    initialFilters.ratings
  );
  const [localAvailability, setLocalAvailability] = useState<string[]>(
    initialFilters.availability
  );

  const toggleArrayItem = (
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

  const handleClearAll = () => {
    setLocalSortBy(DEFAULT_FILTERS.sortBy);
    setLocalServiceTypes([]);
    setLocalRatings([]);
    setLocalAvailability([]);
  };

  const handleApply = () => {
    onApply({
      sortBy: localSortBy,
      serviceTypes: localServiceTypes,
      ratings: localRatings,
      availability: localAvailability,
    });
    onClose();
  };

  const hasChanges =
    localSortBy !== initialFilters.sortBy ||
    localServiceTypes.length !== initialFilters.serviceTypes.length ||
    localServiceTypes.some((v) => !initialFilters.serviceTypes.includes(v)) ||
    localRatings.length !== initialFilters.ratings.length ||
    localRatings.some((v) => !initialFilters.ratings.includes(v)) ||
    localAvailability.length !== initialFilters.availability.length ||
    localAvailability.some((v) => !initialFilters.availability.includes(v));

  const OptionRow = ({
    onPress,
    icon,
    children,
  }: {
    onPress: () => void;
    icon: ReactNode;
    children: ReactNode;
  }) => (
    <TouchableOpacity
      style={styles.optionRow}
      activeOpacity={0.6}
      onPress={onPress}
    >
      {icon}
      <Text
        style={styles.optionText}
        allowFontScaling={false}
        numberOfLines={1}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.container}>
          <View style={styles.handleRow}>
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <Text
              style={styles.title}
              allowFontScaling={false}
              numberOfLines={1}
            >
              Filters
            </Text>
            <TouchableOpacity
              onPress={handleClearAll}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text
                style={styles.clearAll}
                allowFontScaling={false}
                numberOfLines={1}
              >
                Clear All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-outline" size={scale(24)} color="#1C1C38" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={styles.sectionTitle}
              allowFontScaling={false}
              numberOfLines={1}
            >
              Sort By
            </Text>
            <View style={styles.sectionDivider} />
            {sortOptions.map((option) => (
              <OptionRow
                key={option.value}
                onPress={() => setLocalSortBy(option.value)}
                icon={<RadioButton selected={localSortBy === option.value} />}
              >
                {option.label}
              </OptionRow>
            ))}

            <Text
              style={[styles.sectionTitle, styles.sectionSpacer]}
              allowFontScaling={false}
              numberOfLines={1}
            >
              Service Type
            </Text>
            <View style={styles.sectionDivider} />
            {serviceTypeOptions.map((option) => (
              <OptionRow
                key={option}
                onPress={() =>
                  toggleArrayItem(
                    localServiceTypes,
                    option,
                    setLocalServiceTypes
                  )
                }
                icon={
                  <CheckBox selected={localServiceTypes.includes(option)} />
                }
              >
                {option}
              </OptionRow>
            ))}

            <Text
              style={[styles.sectionTitle, styles.sectionSpacer]}
              allowFontScaling={false}
              numberOfLines={1}
            >
              Rating
            </Text>
            <View style={styles.sectionDivider} />
            {ratingOptions.map((option) => (
              <OptionRow
                key={option.value}
                onPress={() =>
                  toggleArrayItem(localRatings, option.value, setLocalRatings)
                }
                icon={
                  <CheckBox selected={localRatings.includes(option.value)} />
                }
              >
                {option.label}
              </OptionRow>
            ))}

            <Text
              style={[styles.sectionTitle, styles.sectionSpacer]}
              allowFontScaling={false}
              numberOfLines={1}
            >
              Availability
            </Text>
            <View style={styles.sectionDivider} />
            {availabilityOptions.map((option) => (
              <OptionRow
                key={option.value}
                onPress={() =>
                  toggleArrayItem(
                    localAvailability,
                    option.value,
                    setLocalAvailability
                  )
                }
                icon={
                  <CheckBox
                    selected={localAvailability.includes(option.value)}
                  />
                }
              >
                {option.label}
              </OptionRow>
            ))}
            <View style={{ height: verticalScale(20) }} />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.applyButton}
              activeOpacity={0.85}
              onPress={handleApply}
            >
              <Text
                style={styles.applyText}
                allowFontScaling={false}
                numberOfLines={1}
              >
                Apply Filters ({resultCount})
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
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    maxHeight: '85%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingBottom: verticalScale(24),
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(4),
  },
  handle: {
    width: scale(36),
    height: verticalScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: '#D1D1D6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    flex: 1,
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1C1C38',
  },
  clearAll: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: COLORS.purple,
    marginRight: scale(14),
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#1C1C38',
    marginBottom: verticalScale(4),
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: verticalScale(8),
  },
  sectionSpacer: {
    marginTop: verticalScale(18),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    paddingVertical: verticalScale(10),
  },
  optionText: {
    fontSize: responsiveFontSize(14),
    color: '#1C1C38',
  },
  footer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
  },
  applyButton: {
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default SearchFilterModal;

import { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import ServicesHeader from '../../components/services/ServicesHeader';
import ServicesSearchBar from '../../components/services/ServicesSearchBar';
import PremiumBanner from '../../components/services/PremiumBanner';
import ExpertiseSection from '../../components/services/ExpertiseSection';
import CareProcessSection from '../../components/services/CareProcessSection';
import ServiceFilterBottomSheet from '../../components/services/ServiceFilterBottomSheet';
import type { FilterState } from '../../components/services/ServiceFilterBottomSheet';
import { allServices } from '../../data/services/servicesData';

type Props = NativeStackScreenProps<RootStackParamList, 'AllServices'>;

const DEFAULT_FILTERS: FilterState = {
  sortBy: 'relevance',
  serviceTypes: [],
  priceRange: 'all',
};

const serviceImageMap: Record<string, any> = {
  'Wash & Fold': require('../../../assets/images/service/wash.png'),
  'Iron Only': require('../../../assets/images/service/iron.png'),
  'Specialized Care': require('../../../assets/images/service/specialized.png'),
};

const serviceDescriptions: Record<string, string> = {
  'Wash & Fold': 'Expert washing and folding service with premium detergents. Your clothes come back fresh, clean, and perfectly folded.',
  'Iron Only': 'Professional steam ironing removes every wrinkle. Perfect for shirts, formal wear, and delicate fabrics.',
  'Specialized Care': 'Premium dry cleaning, steam pressing, blanket wash and more specialized treatments for all your fabrics.',
};

const formatPriceLabel = (price: number, unit: string) => {
  const perUnit = unit === 'Kg' ? 'kg' : unit === 'Itm' ? 'pc' : unit.toLowerCase();
  return `from ₹${price}/${perUnit}`;
};

const matchesPriceRange = (price: number, range: string) => {
  switch (range) {
    case 'under50': return price < 50;
    case '50to100': return price >= 50 && price <= 100;
    case '100to200': return price >= 100 && price <= 200;
    case '200plus': return price > 200;
    default: return true;
  }
};

const AllServicesScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const searchFiltered = useMemo(() => {
    if (!searchQuery.trim()) return allServices;
    const q = searchQuery.toLowerCase();
    return allServices.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredServices = useMemo(() => {
    let results = [...searchFiltered];

    if (activeFilters.serviceTypes.length > 0) {
      results = results.filter((s) =>
        activeFilters.serviceTypes.includes(s.title)
      );
    }

    if (activeFilters.priceRange !== 'all') {
      results = results.filter((s) =>
        matchesPriceRange(s.unitPrice, activeFilters.priceRange)
      );
    }

    switch (activeFilters.sortBy) {
      case 'priceLowHigh':
        results.sort((a, b) => a.unitPrice - b.unitPrice);
        break;
      case 'priceHighLow':
        results.sort((a, b) => b.unitPrice - a.unitPrice);
        break;
    }

    return results;
  }, [searchFiltered, activeFilters]);

  const availableServiceTypes = useMemo(
    () => [...new Set(allServices.map((s) => s.title))],
    []
  );

  const expertiseServices = useMemo(() => {
    const kept = filteredServices.filter(
      (s) => s.title === 'Wash & Fold' || s.title === 'Iron Only'
    );
    const washFold = kept.find((s) => s.title === 'Wash & Fold');
    const ironOnly = kept.find((s) => s.title === 'Iron Only');
    const result = [];
    if (washFold) {
      result.push({
        id: washFold.id,
        title: washFold.title,
        description: serviceDescriptions[washFold.title] || washFold.subtitle,
        priceLabel: formatPriceLabel(washFold.unitPrice, washFold.unit),
        imageSource: serviceImageMap[washFold.title] || require('../../../assets/images/Home/wash-fold.png'),
      });
    }
    if (ironOnly) {
      result.push({
        id: ironOnly.id,
        title: ironOnly.title,
        description: serviceDescriptions[ironOnly.title] || ironOnly.subtitle,
        priceLabel: formatPriceLabel(ironOnly.unitPrice, ironOnly.unit),
        imageSource: serviceImageMap[ironOnly.title] || require('../../../assets/images/Home/iron-only.png'),
      });
    }
    result.push({
      id: '3',
      title: 'Specialized Care',
      description: serviceDescriptions['Specialized Care'],
      priceLabel: 'from ₹15/pc',
      imageSource: serviceImageMap['Specialized Care'],
    });
    return result;
  }, [filteredServices]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ServicesHeader onBackPress={() => navigation.goBack()} />
        <ServicesSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setShowFilter(true)}
        />
        <PremiumBanner />
        <ExpertiseSection
          services={expertiseServices}
          onCardPress={(serviceId, serviceTitle) => {
            navigation.navigate('ServiceDetail', { serviceId, serviceTitle });
          }}
        />
        <CareProcessSection />
      </ScrollView>

      <ServiceFilterBottomSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={setActiveFilters}
        initialFilters={activeFilters}
        availableServiceTypes={availableServiceTypes}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  scrollContent: {
    paddingHorizontal: scale(18),
    paddingBottom: verticalScale(30),
  },
});

export default AllServicesScreen;

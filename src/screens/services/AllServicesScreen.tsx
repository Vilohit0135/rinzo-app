import { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { scale, verticalScale } from '../../utils/responsive';
import ServicesHeader from '../../components/services/ServicesHeader';
import ServicesSearchBar from '../../components/services/ServicesSearchBar';
import PremiumBanner from '../../components/services/PremiumBanner';
import ExpertiseSection from '../../components/services/ExpertiseSection';
import CareProcessSection from '../../components/services/CareProcessSection';
import { allServices } from '../../data/services/servicesData';

type Props = NativeStackScreenProps<RootStackParamList, 'AllServices'>;

const serviceImageMap: Record<string, any> = {
  'Wash & Fold': require('../../../assets/images/service/process.png'),
  'Iron Only': require('../../../assets/images/service/process.png'),
  'Specialized Care': require('../../../assets/images/service/process.png'),
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

const AllServicesScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return allServices;
    const q = searchQuery.toLowerCase();
    return allServices.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const expertiseServices = useMemo(() => {
    const kept = filteredServices.filter(
      (s) => s.title === 'Wash & Fold' || s.title === 'Iron Only'
    );
    const washFold = kept.find((s) => s.title === 'Wash & Fold');
    const ironOnly = kept.find((s) => s.title === 'Iron Only');
    const result = [];
    if (washFold) {
      result.push({
        title: washFold.title,
        description: serviceDescriptions[washFold.title] || washFold.subtitle,
        priceLabel: formatPriceLabel(washFold.unitPrice, washFold.unit),
        imageSource: serviceImageMap[washFold.title] || require('../../../assets/images/Home/wash-fold.png'),
      });
    }
    if (ironOnly) {
      result.push({
        title: ironOnly.title,
        description: serviceDescriptions[ironOnly.title] || ironOnly.subtitle,
        priceLabel: formatPriceLabel(ironOnly.unitPrice, ironOnly.unit),
        imageSource: serviceImageMap[ironOnly.title] || require('../../../assets/images/Home/iron-only.png'),
      });
    }
    result.push({
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
        <ServicesSearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <PremiumBanner />
        <ExpertiseSection services={expertiseServices} />
        <CareProcessSection />
      </ScrollView>
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

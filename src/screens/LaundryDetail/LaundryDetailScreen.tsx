import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import LaundryHero from '../../components/laundry/LaundryHero';
import LaundryInfo from '../../components/laundry/LaundryInfo';
import ServicePricingCard from '../../components/laundry/ServicePricingCard';
import AboutSection from '../../components/laundry/AboutSection';
import ReviewSection from '../../components/laundry/ReviewSection';
import CheckoutButton from '../../components/laundry/CheckoutButton';
import { COLORS } from '../../constants/colors';
import { getLaundryById } from '../../data/laundry/laundryData';
import { useFavouritesStore } from '../../store/favouritesStore';

const heroImageMap: Record<string, any> = {
  'krishna-laundry': require('../../../assets/images/Detail/krishna-d.png'),
};

type RootStackParamList = {
  LaundryDetail: { id: string };
};

const LaundryDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'LaundryDetail'>>();
  const item = getLaundryById(route.params.id);
  const favouriteIds = useFavouritesStore((s) => s.favouriteIds);
  const toggleFavourite = useFavouritesStore((s) => s.toggleFavourite);

  if (!item) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <LaundryHero
          onBackPress={() => navigation.goBack()}
          isFavourite={favouriteIds.includes(item.id)}
          onToggleFavourite={() => toggleFavourite(item.id)}
          imageSource={heroImageMap[item.id]}
        />

        <View style={styles.details}>
          <LaundryInfo
            name={item.name}
            rating={item.rating}
            reviewCount={item.reviewCount}
            distance={item.distance}
            closingTime={item.closingTime}
            tags={item.tags}
          />

          <View style={styles.servicesSection}>
            <ServicePricingCard services={item.services} />
          </View>

          <View style={styles.aboutSection}>
            <AboutSection description={item.description} />
          </View>

          <View style={styles.reviewSection}>
            <ReviewSection
              rating={item.rating}
              reviewCount={item.reviewCount}
              reviewSummary={item.reviewSummary}
            />
          </View>
        </View>
      </ScrollView>
      <CheckoutButton onPress={() => navigation.navigate('BookPickup' as never)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingBottom: 100,
  },
  details: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  servicesSection: {
    marginTop: 32,
  },
  aboutSection: {
    marginTop: 36,
  },
  reviewSection: {
    marginTop: 44,
  },
});

export default LaundryDetailScreen;

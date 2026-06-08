import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import OffersHeader from '../../components/offers/OffersHeader';
import FeaturedOfferBanner from '../../components/offers/FeaturedOfferBanner';
import OfferCard from '../../components/offers/OfferCard';
import { COLORS } from '../../constants/colors';
import { offersData } from '../../data/offers/offersData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
};

const OffersScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <OffersHeader onBackPress={() => navigation.goBack()} />
        <FeaturedOfferBanner />

        <View style={styles.listSection}>
          {offersData.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingBottom: 180,
  },
  listSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
});

export default OffersScreen;

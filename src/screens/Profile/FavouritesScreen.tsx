import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import FavouritesHeader from '../../components/favourites/FavouritesHeader';
import FavouriteLaundryCard from '../../components/favourites/FavouriteLaundryCard';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { useFavouritesStore } from '../../store/favouritesStore';

const FavouritesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Favourites'>>();
  const favouriteIds = useFavouritesStore((s) => s.favouriteIds);
  const toggleFavourite = useFavouritesStore((s) => s.toggleFavourite);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <FavouritesHeader onBackPress={() => navigation.goBack()} />

        {favouriteIds.length === 0 ? (
          <View style={styles.emptyState}>
            <Image
              source={require('../../assets/icons/empty-laundry.png')}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <View style={styles.emptyTextWrap}>
              <Text style={styles.emptyTitle}>No favourites yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap the heart icon on any laundry to add it here
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.listSection}>
            {favouriteIds.map((id) => (
              <FavouriteLaundryCard
                key={id}
                laundryId={id}
                isFavourite={true}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <BottomTabBar activeTab="Profile" onTabPress={(tab) => { if (tab === 'Home') navigation.navigate('Home'); if (tab === 'Search') navigation.navigate('Search'); if (tab === 'Orders') navigation.navigate('YourCart'); }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: 18,
    paddingBottom: 140,
  },
  listSection: {
    marginTop: 42,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
    marginTop: 140,
  },
  emptyImage: {
    width: 280,
    height: 280,
    marginBottom: 24,
  },
  emptyTextWrap: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '400',
    color: '#A5A5A5',
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default FavouritesScreen;

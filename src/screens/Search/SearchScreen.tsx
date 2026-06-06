import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SearchResultCard from '../../components/search/SearchResultCard';
import EmptySearchState from '../../components/search/EmptySearchState';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { useFavouritesStore } from '../../store/favouritesStore';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  MyOrders: undefined;
  Profile: undefined;
  LaundryDetail: { id: string };
};

const recentSearches = ['Dry Clean', 'Krishna Laundry', 'Iron Service'];

const filterButtons = ['Nearby', 'Top Rated', 'Pickup', 'Open Now'];

const searchResults = [
  { id: 'krishna-laundry', name: 'Krishna Laundry', rating: 4.8, reviewCount: 231, distance: '1.2 km away', price: '? 50/kg', tags: ['Pickup', 'Fast Service'], deliveryTime: '2:00 PM' },
  { id: 'sparkle-dry-clean', name: 'Sparkle Dry Clean', rating: 4.6, reviewCount: 189, distance: '2.5 km away', price: '? 80/kg', tags: ['Dry Clean', 'Free Pickup'], deliveryTime: '4:00 PM' },
  { id: 'royal-wash', name: 'Royal Wash', rating: 4.9, reviewCount: 345, distance: '0.8 km away', price: '? 60/kg', tags: ['Express', 'Eco Friendly'], deliveryTime: '1:00 PM' },
  { id: 'eco-laundry-hub', name: 'Eco Laundry Hub', rating: 4.7, reviewCount: 156, distance: '3.1 km away', price: '? 45/kg', tags: ['Budget', 'Pickup'], deliveryTime: '5:00 PM' },
];

const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Search'>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const favouriteIds = useFavouritesStore((s) => s.favouriteIds);
  const toggleFavourite = useFavouritesStore((s) => s.toggleFavourite);

  const getFilteredResults = () => {
    let results = searchResults.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (activeFilter === 'Pickup') {
      results = results.filter((item) =>
        item.tags.some((t) => t.toLowerCase().includes('pickup'))
      );
    }
    if (activeFilter === 'Top Rated') {
      results = [...results].sort((a, b) => b.rating - a.rating);
    }
    if (activeFilter === 'Nearby') {
      results = [...results].sort((a, b) => {
        const da = parseFloat(a.distance.split(' ')[0]);
        const db = parseFloat(b.distance.split(' ')[0]);
        return da - db;
      });
    }
    return results;
  };

  const filteredResults = getFilteredResults();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={24} color={COLORS.placeholder} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for services or laundries.."
            placeholderTextColor={COLORS.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="options-outline" size={22} color={COLORS.placeholder} />
        </View>

        {searchQuery && filteredResults.length === 0 ? (
          <EmptySearchState query={searchQuery} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {!searchQuery && (
              <View style={styles.recentSection}>
                <View style={styles.recentHeader}>
                  <Text style={styles.recentTitle}>Recent Searches</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.clearText}>Clear</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.chipsRow}>
                  {recentSearches.map((item) => (
                    <TouchableOpacity key={item} style={styles.chip} activeOpacity={0.8} onPress={() => setSearchQuery(item)}>
                      <Text style={styles.chipText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.filterSection}>
              <View style={styles.filterRow}>
                {filterButtons.map((button) => (
                  <TouchableOpacity
                    key={button}
                    style={styles.filterButton}
                    activeOpacity={0.8}
                    onPress={() => setActiveFilter(activeFilter === button ? '' : button)}
                  >
                    <Text style={styles.filterButtonText}>{button}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.resultsSection}>
              {filteredResults.map((item) => (
                <SearchResultCard
                  key={item.id}
                  {...item}
                  isFavourite={favouriteIds.includes(item.id)}
                  onToggleFavourite={toggleFavourite}
                  onPress={() => navigation.navigate('LaundryDetail', { id: item.id })}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
      <BottomTabBar activeTab="Search" onTabPress={(tab) => { if (tab === 'Home') navigation.navigate('Home'); if (tab === 'Orders') navigation.navigate('YourCart'); if (tab === 'Profile') navigation.navigate('Profile'); }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  searchBar: {
    height: 46,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E2D',
    paddingVertical: 0,
  },
  recentSection: {
    marginTop: 28,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22223D',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.purpleDark,
  },
  chipsRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 12,
  },
  chip: {
    height: 34,
    paddingHorizontal: 18,
    borderRadius: 21,
    backgroundColor: COLORS.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.purpleDark,
  },
  filterSection: {
    marginTop: 28,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 7,
  },
  filterButton: {
    height: 30,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
  },
  resultsSection: {
    marginTop: 28,
  },
});

export default SearchScreen;

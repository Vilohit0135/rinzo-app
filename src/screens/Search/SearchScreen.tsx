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
import { responsiveFontSize } from '../../utils/responsive';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  MyOrders: undefined;
  Profile: undefined;
  LaundryDetail: { id: string };
};

const laundryImageMap: Record<string, any> = {
  'Krishna Laundry': require('../../../assets/images/Laundry/krishna-laundry.png'),
  'Royal Wash': require('../../../assets/images/Laundry/royal-wash.jpg'),
  'Eco Laundry Hub': require('../../../assets/images/Laundry/krishna-laundry.png'),
  'Sparkle Dry Clean': require('../../../assets/images/Laundry/royal-wash.jpg'),
};

const recentSearches = ['Dry Clean', 'Krishna Laundry', 'Iron Service'];

const filterButtons = ['Nearby', 'Top Rated', 'Pickup', 'Open Now'];

const searchResults = [
  { id: 'krishna-laundry', name: 'Krishna Laundry', rating: 4.8, reviewCount: 231, distance: '1.2 km away', price: '₹ 50/kg', tags: ['Pickup', 'Fast Service'], deliveryTime: '2:00 PM' },
  { id: 'sparkle-dry-clean', name: 'Sparkle Dry Clean', rating: 4.6, reviewCount: 189, distance: '2.5 km away', price: '₹ 80/kg', tags: ['Dry Clean', 'Free Pickup'], deliveryTime: '4:00 PM' },
  { id: 'royal-wash', name: 'Royal Wash', rating: 4.9, reviewCount: 345, distance: '0.8 km away', price: '₹ 60/kg', tags: ['Express', 'Eco Friendly'], deliveryTime: '1:00 PM' },
  { id: 'eco-laundry-hub', name: 'Eco Laundry Hub', rating: 4.7, reviewCount: 156, distance: '3.1 km away', price: '₹ 45/kg', tags: ['Budget', 'Pickup'], deliveryTime: '5:00 PM' },
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
            allowFontScaling={false}
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
                  <Text style={styles.recentTitle} allowFontScaling={false} numberOfLines={1}>Recent Searches</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.clearText} allowFontScaling={false} numberOfLines={1}>Clear</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
                  {recentSearches.map((item) => (
                    <TouchableOpacity key={item} style={styles.chip} activeOpacity={0.8} onPress={() => setSearchQuery(item)}>
                      <Text style={styles.chipText} allowFontScaling={false} numberOfLines={1}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.filterSection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
                {filterButtons.map((button) => (
                  <TouchableOpacity
                    key={button}
                    style={[styles.filterButton, activeFilter === button && styles.filterButtonActive]}
                    activeOpacity={0.8}
                    onPress={() => setActiveFilter(activeFilter === button ? '' : button)}
                  >
                    <Text style={[styles.filterButtonText, activeFilter === button && styles.filterButtonTextActive]} allowFontScaling={false} numberOfLines={1}>{button}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.resultsSection}>
              {filteredResults.map((item) => (
                <SearchResultCard
                  key={item.id}
                  {...item}
                  imageSource={laundryImageMap[item.name]}
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
    fontSize: responsiveFontSize(15),
    color: '#1E1E2D',
    paddingVertical: 0,
    textAlignVertical: 'center',
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
    marginBottom: 12,
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#22223D',
  },
  clearText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: COLORS.purpleDark,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
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
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: COLORS.purpleDark,
  },
  filterSection: {
    marginTop: 22,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 7,
    paddingRight: 20,
  },
  filterButton: {
    top: 0,
    height: 30,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor:COLORS.purple,
    borderWidth: 1,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: COLORS.purple,
  },
  filterButtonText: {
    color: COLORS.white,
    fontSize: responsiveFontSize(13),
    fontWeight: '400',
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  resultsSection: {
    marginTop: 28,
  },
});

export default SearchScreen;

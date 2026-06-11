import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import {
  scale,
  verticalScale,
  moderateScale,
  responsiveFontSize,
} from '../../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLocationStore } from '../../store/locationStore';
import { useLocation } from '../../hooks/useLocation';
import { searchPlaces, type PlaceResult } from '../../services/locationService';
import type { RootStackParamList } from '../../types/navigation';
import LocationSearchBar from '../../components/location/LocationSearchBar';
import CurrentLocationCard from '../../components/location/CurrentLocationCard';
import SavedAddressList from '../../components/location/SavedAddressList';
import RecentLocationItem from '../../components/location/RecentLocationItem';

const LocationSelectionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { loading, error, requestAndGetLocation } = useLocation();

  const setCurrentAddress = useLocationStore((s) => s.setCurrentAddress);
  const setCurrentCoordinates = useLocationStore((s) => s.setCurrentCoordinates);
  const addRecentLocation = useLocationStore((s) => s.addRecentLocation);
  const recentLocations = useLocationStore((s) => s.recentLocations);
  const clearRecentLocations = useLocationStore((s) => s.clearRecentLocations);
  const removeRecentLocation = useLocationStore((s) => s.removeRecentLocation);

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      const results = await searchPlaces(text);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const selectAddress = (address: string) => {
    setCurrentAddress(address);
    addRecentLocation(address);
    navigation.goBack();
  };

  const handleCurrentLocation = async () => {
    const result = await requestAndGetLocation();
    if (result) {
      setCurrentAddress(result.address);
      setCurrentCoordinates(result.coords);
      addRecentLocation(result.address);
      navigation.goBack();
    }
  };

  const handleSelectSavedAddress = (addr: any) => {
    const fullAddress = `${addr.address1}, ${addr.address2}`;
    selectAddress(fullAddress);
  };

  return (
    <Modal visible transparent animationType="slide" onRequestClose={() => navigation.goBack()}>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View style={styles.handleRow}>
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <Text style={styles.title} allowFontScaling={false} numberOfLines={1}>
              Select Location
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-outline" size={scale(24)} color="#1C1C38" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <LocationSearchBar value={searchQuery} onChangeText={handleSearch} />

            {showSearchResults ? (
              <View style={styles.searchResults}>
                {searchResults.length > 0 ? (
                  searchResults.map((place) => (
                    <TouchableOpacity
                      key={place.id}
                      style={styles.searchRow}
                      activeOpacity={0.7}
                      onPress={() => selectAddress(`${place.name}, ${place.address}, ${place.area}, ${place.city}`)}
                    >
                      <Ionicons name="location-outline" size={18} color="#8D8DAD" />
                      <View style={styles.searchTextCol}>
                        <Text style={styles.searchName} allowFontScaling={false} numberOfLines={1}>{place.name}</Text>
                        <Text style={styles.searchAddress} allowFontScaling={false} numberOfLines={1}>{place.address}, {place.area}, {place.city}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.noResults} allowFontScaling={false}>No results found</Text>
                )}
              </View>
            ) : (
              <>
                <View style={styles.sectionGap}>
                  <CurrentLocationCard
                    loading={loading}
                    error={error}
                    onPress={handleCurrentLocation}
                  />
                </View>

                <View style={styles.sectionGap}>
                  <SavedAddressList
                    onSelect={handleSelectSavedAddress}
                    onAddNew={() => {
                      (navigation as any).navigate('AddAddress');
                    }}
                  />
                </View>

                {recentLocations.length > 0 && (
                  <View style={styles.sectionGap}>
                    <View style={styles.recentHeader}>
                      <Text style={styles.sectionTitle} allowFontScaling={false}>Recent Locations</Text>
                      <TouchableOpacity activeOpacity={0.7} onPress={clearRecentLocations}>
                        <Text style={styles.clearText} allowFontScaling={false}>Clear</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                    {recentLocations.map((loc, index) => (
                      <RecentLocationItem
                          key={index}
                          address={loc}
                          onPress={() => selectAddress(loc)}
                          onDelete={() => removeRecentLocation(loc)}
                        />
                    ))}
                  </View>
                )}
              </>
            )}

            <View style={{ height: verticalScale(40) }} />
          </ScrollView>
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
    maxHeight: '90%',
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
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1C1C38',
  },
  scroll: {
    paddingHorizontal: scale(20),
  },
  scrollContent: {
    paddingTop: verticalScale(16),
  },
  sectionGap: {
    marginTop: verticalScale(16),
  },
  searchResults: {
    marginTop: verticalScale(12),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: verticalScale(10),
  },
  searchTextCol: {
    flex: 1,
  },
  searchName: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#1C1C38',
  },
  searchAddress: {
    fontSize: responsiveFontSize(12),
    color: '#8D8DAD',
    marginTop: 1,
  },
  noResults: {
    textAlign: 'center',
    fontSize: responsiveFontSize(14),
    color: '#8D8DAD',
    marginTop: verticalScale(20),
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#1C1C38',
    marginBottom: 4,
  },
  clearText: {
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: COLORS.purple,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 4,
  },
});

export default LocationSelectionScreen;

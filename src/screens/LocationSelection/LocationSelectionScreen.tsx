import { useState, useRef, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  PanResponder,
  Animated,
  Dimensions,
  ActivityIndicator,
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
import { searchPlaces, getPlaceDetails, type PlaceResult } from '../../services/locationService';
import type { RootStackParamList } from '../../types/navigation';
import LocationSearchBar from '../../components/location/LocationSearchBar';
import CurrentLocationCard from '../../components/location/CurrentLocationCard';
import SavedAddressList from '../../components/location/SavedAddressList';
import RecentLocationItem from '../../components/location/RecentLocationItem';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const getCleanSubtitle = (p: PlaceResult) => {
  const parts = [];
  if (p.address) parts.push(p.address);
  if (p.area && !p.address.toLowerCase().includes(p.area.toLowerCase())) {
    parts.push(p.area);
  }
  if (
    p.city &&
    !p.address.toLowerCase().includes(p.city.toLowerCase()) &&
    (!p.area || !p.area.toLowerCase().includes(p.city.toLowerCase()))
  ) {
    parts.push(p.city);
  }
  return parts.join(', ');
};

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

  // Initialize sheet off-screen (at SCREEN_HEIGHT) to animate entrance
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Slide up entrance on mount
  useEffect(() => {
    Animated.spring(panY, {
      toValue: 0,
      tension: 65,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, []);

  const resetPositionAnim = Animated.spring(panY, {
    toValue: 0,
    tension: 80,
    friction: 10,
    useNativeDriver: true,
  });

  // Slide down off-screen exit
  const handleDismiss = () => {
    Animated.timing(panY, {
      toValue: SCREEN_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const startPanY = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Stop any running animations immediately to lock to drag pointer
        panY.stopAnimation((value) => {
          startPanY.current = value;
        });
      },
      onPanResponderMove: (_, gestureState) => {
        // Clamped to positive translateY so it tracks the pointer perfectly downwards
        panY.setValue(Math.max(0, startPanY.current + gestureState.dy));
      },
      onPanResponderRelease: (_, gestureState) => {
        const currentTranslateY = Math.max(0, startPanY.current + gestureState.dy);
        if (currentTranslateY > 120 || gestureState.vy > 0.5) {
          handleDismiss();
        } else {
          resetPositionAnim.start();
        }
      },
    })
  ).current;

  // Background overlay fades in and out in perfect sync with the vertical position of the sheet
  const backdropOpacity = panY.interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

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

  const [resolvingCoords, setResolvingCoords] = useState(false);

  const selectAddress = async (
    address: string,
    coords?: { latitude: number; longitude: number },
    placeId?: string
  ) => {
    let resolvedCoords = coords;
    if (!resolvedCoords && placeId) {
      setResolvingCoords(true);
      const details = await getPlaceDetails(placeId);
      resolvedCoords = details || undefined;
      setResolvingCoords(false);
    }

    setCurrentAddress(address);
    if (resolvedCoords) {
      setCurrentCoordinates(resolvedCoords);
    }
    addRecentLocation(address);
    handleDismiss();
  };

  const handleCurrentLocation = async () => {
    const result = await requestAndGetLocation();
    if (result) {
      setCurrentAddress(result.address);
      setCurrentCoordinates(result.coords);
      addRecentLocation(result.address);
      handleDismiss();
    }
  };

  const handleSelectSavedAddress = (addr: any) => {
    const fullAddress = `${addr.address1}, ${addr.address2}`;
    selectAddress(fullAddress, { latitude: addr.latitude || 12.9716, longitude: addr.longitude || 77.5946 });
  };

  return (
    <Modal visible transparent animationType="none" onRequestClose={handleDismiss}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={handleDismiss}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY: panY }],
            },
          ]}
        >
          {/* Draggable handle zone covering the top grey line */}
          <View style={styles.handleRow} {...panResponder.panHandlers}>
            <View style={styles.handle} />
          </View>

          {/* Header with non-draggable title & close button */}
          <View style={styles.header}>
            <Text style={styles.title} allowFontScaling={false} numberOfLines={1}>
              Select Location
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleDismiss}
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
                      onPress={() => {
                        const cleanSub = getCleanSubtitle(place);
                        const fullAddress = cleanSub ? `${place.name}, ${cleanSub}` : place.name;
                        const coords = (place.latitude && place.longitude) ? { latitude: place.latitude, longitude: place.longitude } : undefined;
                        selectAddress(fullAddress, coords, place.placeId);
                      }}
                    >
                      <Ionicons name="location-outline" size={18} color="#8D8DAD" />
                      <View style={styles.searchTextCol}>
                        <Text style={styles.searchName} allowFontScaling={false} numberOfLines={1}>{place.name}</Text>
                        <Text style={styles.searchAddress} allowFontScaling={false} numberOfLines={1}>{getCleanSubtitle(place)}</Text>
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
          {resolvingCoords && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={COLORS.purple} />
            </View>
          )}
        </Animated.View>
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
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(14),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
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
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    zIndex: 999,
  },
});

export default LocationSelectionScreen;

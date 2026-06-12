import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { addAddress } from "../../data/addressStore";
import CityIcon from "../../assets/icons/city.png";
import LocationIcon from "../../assets/icons/location.png";
import * as Location from "expo-location";
import { searchPlaces, type PlaceResult } from "../../services/locationService";


type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  SavedAddress: undefined;
  AddAddress: undefined;
};

const AddAddressScreen = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "AddAddress">
    >();

  const [selectedRadio, setSelectedRadio] = useState<"Myself" | "someone else">(
    "Myself",
  );
  const [addressType, setAddressType] = useState<"Home" | "Work" | "Other">(
    "Home",
  );
  const [receiverName, setReceiverName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  // Real-time location & search states
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const [isAreaModalVisible, setIsAreaModalVisible] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [areaSearchQuery, setAreaSearchQuery] = useState("");
  const [areaResults, setAreaResults] = useState<PlaceResult[]>([]);
  const [isAreaLoading, setIsAreaLoading] = useState(false);

  const popularCities = [
    "Bengaluru",
    "Mumbai",
    "Delhi",
    "Gurgaon",
    "Noida",
    "Pune",
    "Chennai",
    "Hyderabad",
    "Kolkata",
  ];

  const handleEnableLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please allow location permission to auto-fill address.");
        return;
      }
      
      setIsLocationLoading(true);
      const loc = await Location.getCurrentPositionAsync({});
      const results = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (results && results.length > 0) {
        const r = results[0];
        
        // City
        const cityVal = r.city || r.subregion || r.region || "";
        setSelectedCity(cityVal);
        
        // Area
        const areaVal = r.district || r.street || r.name || "";
        setSelectedArea(areaVal);
        
        // Address: combine name and street
        const addrParts = [];
        if (r.name && r.name !== r.street) {
          addrParts.push(r.name);
        }
        if (r.street) {
          if (r.streetNumber) {
            addrParts.push(`${r.streetNumber} ${r.street}`);
          } else {
            addrParts.push(r.street);
          }
        }
        if (r.postalCode) {
          addrParts.push(r.postalCode);
        }
        const fullAddr = addrParts.join(", ");
        setAddress(fullAddr || `${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`);
        Alert.alert("Success", "Address auto-filled using your current location!");
      } else {
        setAddress(`${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`);
      }
    } catch (err: any) {
      console.log("Error fetching current location:", err);
      Alert.alert("Error", err?.message || "Could not fetch current location.");
    } finally {
      setIsLocationLoading(false);
    }
  };

  const handleAreaSearch = async (query: string) => {
    setAreaSearchQuery(query);
    if (!query.trim()) {
      setAreaResults([]);
      return;
    }
    setIsAreaLoading(true);
    try {
      const results = await searchPlaces(query);
      setAreaResults(results);
    } catch (err) {
      console.log("Error searching area:", err);
    } finally {
      setIsAreaLoading(false);
    }
  };

  const handleSave = () => {
    const cityPart = selectedCity ? `${selectedCity}` : "";
    const areaPart = selectedArea ? `, ${selectedArea}` : "";
    addAddress({
      title: addressType === "Home" ? "Home ( Default )" : addressType,
      address1: address || "221b Baker Street",
      address2: `${cityPart}${areaPart}` || "Bengaluru, 500012",
      contact: `${receiverName || "Ms Mira Sharma"} – ${mobile || "94444283283"}`,
      isDefault: addressType === "Home",
    });
    navigation.goBack();
  };


  const radioOptions: Array<"Myself" | "someone else"> = [
    "Myself",
    "someone else",
  ];
  const addressTypes: Array<"Home" | "Work" | "Other"> = [
    "Home",
    "Work",
    "Other",
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={22} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add address details</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Section 1: Current Location Card */}
          <View style={[styles.card, styles.locationCard]}>
            <Ionicons name="location-outline" size={26} color="#111111" />
            <View style={styles.locationTextCol}>
              <Text style={styles.locationTitle}>
                Adding address at your current location ?
              </Text>
              <Text style={styles.locationSubtitle}>
                Enable it to auto-fill address
              </Text>
            </View>
            <TouchableOpacity
              style={styles.enableBtn}
              onPress={handleEnableLocation}
              activeOpacity={0.8}
              disabled={isLocationLoading}
            >
              {isLocationLoading ? (
                <ActivityIndicator size="small" color="#4B238D" />
              ) : (
                <Text style={styles.enableBtnText}>Enable</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Section 2: Address Form Card */}
          <View style={[styles.card, styles.formCard]}>
            {/* City Selector */}
            <View style={styles.selector}>
              <Image
                source={CityIcon}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.selectorPlaceholder,
                  selectedCity ? styles.selectorValue : null,
                ]}
              >
                {selectedCity || "Select a city"}
              </Text>
              <TouchableOpacity
                style={styles.selectBtn}
                onPress={() => setIsCityModalVisible(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.selectBtnText}>Select</Text>
              </TouchableOpacity>
            </View>

            {/* Area Selector */}
            <View style={[styles.selector, { marginTop: 10 }]}>
              <Image
                source={LocationIcon}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.selectorPlaceholder,
                  selectedArea ? styles.selectorValue : null,
                ]}
              >
                {selectedArea || "Select an area, Street"}
              </Text>
              <TouchableOpacity
                style={styles.selectBtn}
                onPress={() => setIsAreaModalVisible(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.selectBtnText}>Select</Text>
              </TouchableOpacity>
            </View>

            {/* Address Label */}
            <Text style={styles.addressLabel}>Enter complete address</Text>

            {/* Address Input */}
            <TextInput
              style={styles.addressInput}
              placeholder="House/Building/Flat"
              placeholderTextColor="#B2B2B2"
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>

          {/* Section 3: Contact Details Card */}
          <View style={[styles.card, styles.contactCard]}>
            <Text style={styles.contactTitle}>Contact Details</Text>

            {/* Radio Buttons */}
            <View style={styles.radioGroup}>
              {radioOptions.map((option) => {
                const active = option === selectedRadio;
                return (
                  <TouchableOpacity
                    key={option}
                    style={styles.radioRow}
                    activeOpacity={0.7}
                    onPress={() => setSelectedRadio(option)}
                  >
                    <View
                      style={[
                        styles.radioOuter,
                        active && styles.radioOuterActive,
                      ]}
                    >
                      {active && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.radioLabel}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Name Input */}
            <TextInput
              style={styles.contactInput}
              placeholder="Receivers name*"
              placeholderTextColor="#B2B2B2"
              value={receiverName}
              onChangeText={setReceiverName}
            />

            {/* Mobile Label */}
            <Text style={styles.mobileLabel}>Mobile</Text>

            {/* Mobile Input */}
            <TextInput
              style={styles.contactInput}
              placeholder="+91 83334747583"
              placeholderTextColor="#B2B2B2"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />

            {/* Save Address As */}
            <Text style={styles.saveAsLabel}>Save address as</Text>

            {/* Segmented Buttons */}
            <View style={styles.segmentRow}>
              {addressTypes.map((type) => {
                const active = type === addressType;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.segmentBtn,
                      active ? styles.segmentActive : styles.segmentInactive,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setAddressType(type)}
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        active
                          ? styles.segmentTextActive
                          : styles.segmentTextInactive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleSave}
            style={styles.saveBtnWrapper}
          >
            <LinearGradient
              colors={["#7C5CE6", "#8C63EA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveBtn}
            >
              <Text style={styles.saveBtnText}>Save changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        {/* City Selection Modal */}
        <Modal
          visible={isCityModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsCityModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select City</Text>
                <TouchableOpacity onPress={() => setIsCityModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#111111" />
                </TouchableOpacity>
              </View>

              {/* Search Input */}
              <View style={styles.modalSearchContainer}>
                <Ionicons name="search-outline" size={20} color="#8D8DAD" />
                <TextInput
                  style={styles.modalSearchInput}
                  placeholder="Search city..."
                  placeholderTextColor="#A0A0A0"
                  value={citySearchQuery}
                  onChangeText={setCitySearchQuery}
                />
                {citySearchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setCitySearchQuery("")}>
                    <Ionicons name="close-circle" size={16} color="#8D8DAD" />
                  </TouchableOpacity>
                )}
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Popular Cities Header */}
                <Text style={styles.modalSectionTitle}>Popular Cities</Text>
                
                {/* Grid of popular cities */}
                <View style={styles.citiesGrid}>
                  {popularCities
                    .filter(city => city.toLowerCase().includes(citySearchQuery.toLowerCase()))
                    .map((city) => (
                      <TouchableOpacity
                        key={city}
                        style={[
                          styles.cityGridItem,
                          selectedCity === city && styles.cityGridItemActive,
                        ]}
                        onPress={() => {
                          setSelectedCity(city);
                          setIsCityModalVisible(false);
                          setCitySearchQuery("");
                        }}
                      >
                        <Ionicons 
                          name="business-outline" 
                          size={16} 
                          color={selectedCity === city ? "#7C5CE6" : "#4B238D"} 
                        />
                        <Text style={[
                          styles.cityGridItemText,
                          selectedCity === city && styles.cityGridItemTextActive,
                        ]}>
                          {city}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
                
                {/* Custom input option */}
                {citySearchQuery.trim() !== "" && 
                 !popularCities.some(city => city.toLowerCase() === citySearchQuery.trim().toLowerCase()) && (
                  <TouchableOpacity
                    style={styles.customCityItem}
                    onPress={() => {
                      setSelectedCity(citySearchQuery.trim());
                      setIsCityModalVisible(false);
                      setCitySearchQuery("");
                    }}
                  >
                    <Ionicons name="location-outline" size={18} color="#7C5CE6" />
                    <Text style={styles.customCityText}>Use "{citySearchQuery.trim()}"</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Area Selection Modal */}
        <Modal
          visible={isAreaModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsAreaModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Area / Street</Text>
                <TouchableOpacity onPress={() => setIsAreaModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#111111" />
                </TouchableOpacity>
              </View>

              {/* Selected City context indicator */}
              {selectedCity ? (
                <Text style={styles.cityContext}>
                  Searching in <Text style={{fontWeight: "700", color: "#7C5CE6"}}>{selectedCity}</Text>
                </Text>
              ) : null}

              {/* Search Input */}
              <View style={styles.modalSearchContainer}>
                <Ionicons name="search-outline" size={20} color="#8D8DAD" />
                <TextInput
                  style={styles.modalSearchInput}
                  placeholder="Search area, street, mall, store..."
                  placeholderTextColor="#A0A0A0"
                  value={areaSearchQuery}
                  onChangeText={handleAreaSearch}
                />
                {areaSearchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => handleAreaSearch("")}>
                    <Ionicons name="close-circle" size={16} color="#8D8DAD" />
                  </TouchableOpacity>
                )}
              </View>

              {isAreaLoading ? (
                <View style={styles.modalLoading}>
                  <ActivityIndicator size="large" color="#7C5CE6" />
                </View>
              ) : (
                <ScrollView 
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {areaResults.length > 0 ? (
                    areaResults.map((place) => (
                      <TouchableOpacity
                        key={place.id}
                        style={styles.areaResultRow}
                        onPress={() => {
                          setSelectedArea(place.name || place.area);
                          if (place.address) {
                            setAddress(place.address);
                          }
                          if (place.city) {
                            setSelectedCity(place.city);
                          }
                          setIsAreaModalVisible(false);
                          setAreaSearchQuery("");
                          setAreaResults([]);
                        }}
                      >
                        <Ionicons name="location-outline" size={20} color="#8D8DAD" />
                        <View style={styles.areaResultTextCol}>
                          <Text style={styles.areaResultName} numberOfLines={1}>
                            {place.name}
                          </Text>
                          <Text style={styles.areaResultAddress} numberOfLines={1}>
                            {place.address || place.area}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View style={styles.emptyResultsContainer}>
                      {areaSearchQuery.trim() ? (
                        <Text style={styles.emptyResultsText}>No areas found matching "{areaSearchQuery}"</Text>
                      ) : (
                        <Text style={styles.emptyResultsText}>Type to search for areas, streets, stores</Text>
                      )}
                    </View>
                  )}
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7F5FC",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
  },
  backBtn: {
    position: "absolute",
    left: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },
  scrollContent: {
    paddingTop: 6,
    paddingBottom: 100,
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ECE8F7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },

  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    height: 78,
    paddingHorizontal: 10,
    gap: 8,
  },
  locationTextCol: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 12.7,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 1,
  },
  locationSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#9B9B9B",
  },
  enableBtn: {
    height: 29,
    width: 68,
    borderRadius: 14,
    backgroundColor: "#F1EAFF",
    justifyContent: "center",
    alignItems: "center",
  },
  enableBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B238D",
  },

  formCard: {
    padding: 10,
    marginTop: 14,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    paddingHorizontal: 10,
    gap: 8,
  },
  selectorPlaceholder: {
    flex: 1,
    fontSize: 13,
    color: "#A0A0A0",
  },
  selectorValue: {
    color: "#111111",
  },
  selectBtn: {
    height: 25,
    width: 64,
    borderRadius: 13,
    backgroundColor: "#F1EAFF",
    justifyContent: "center",
    alignItems: "center",
  },
  selectBtnText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#4B238D",
  },
  iconImage: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  addressLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111111",
    marginTop: 14,
    marginBottom: 6,
  },
  addressInput: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    paddingHorizontal: 12,
    paddingTop: 8,
    fontSize: 13,
    color: "#111111",
  },

  contactCard: {
    padding: 10,
    marginTop: 10,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  radioRow: {
    marginLeft: 14,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  radioOuter: {
    width: 16,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#111111",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterActive: {
    borderColor: "#7C5CE6",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7C5CE6",
  },
  radioLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111111",
  },
  contactInput: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#111111",
    marginBottom: 8,
  },
  mobileLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111111",
    marginBottom: 6,
  },

  saveAsLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111111",
    marginTop: 10,
    marginBottom: 8,
  },
  segmentRow: {
    marginLeft: 4,
    marginBottom: 8,
    flexDirection: "row",
    gap: 8,
  },
  segmentBtn: {
    flex: 1,
    height: 26,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  segmentActive: {
    backgroundColor: "#7C5CE6",
  },
  segmentInactive: {
    backgroundColor: "#F2F2F2",
  },
  segmentText: {
    fontSize: 13,
    fontWeight: "600",
  },
  segmentTextActive: {
    color: "#FFFFFF",
  },
  segmentTextInactive: {
    color: "#111111",
  },

  saveBtnWrapper: {
    marginTop: 12,
    marginBottom: 0,
  },
  saveBtn: {
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },
  modalSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
    gap: 8,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111111",
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9B9B9B",
    marginBottom: 12,
    marginTop: 8,
  },
  citiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  cityGridItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F8FD",
    borderColor: "#ECE8F7",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 36,
    gap: 6,
  },
  cityGridItemActive: {
    backgroundColor: "#F1EAFF",
    borderColor: "#7C5CE6",
  },
  cityGridItemText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B238D",
  },
  cityGridItemTextActive: {
    color: "#7C5CE6",
  },
  customCityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
    borderTopWidth: 1,
    borderColor: "#F5F5F7",
  },
  customCityText: {
    fontSize: 14,
    color: "#7C5CE6",
    fontWeight: "600",
  },
  cityContext: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 10,
  },
  modalLoading: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  areaResultRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F7",
    gap: 12,
  },
  areaResultTextCol: {
    flex: 1,
  },
  areaResultName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
  },
  areaResultAddress: {
    fontSize: 12,
    color: "#8D8DAD",
    marginTop: 2,
  },
  emptyResultsContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyResultsText: {
    fontSize: 14,
    color: "#8D8DAD",
    textAlign: "center",
  },
});

export default AddAddressScreen;

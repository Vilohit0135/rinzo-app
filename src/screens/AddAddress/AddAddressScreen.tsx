import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BottomTabBar from "../../components/home/BottomTabBar";
import { addAddress } from "../../data/addressStore";
import CityIcon from "../../assets/icons/city.png";
import LocationIcon from "../../assets/icons/location.png";

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
              onPress={() => console.log("Enable location")}
              activeOpacity={0.8}
            >
              <Text style={styles.enableBtnText}>Enable</Text>
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
                onPress={() => console.log("Open city picker")}
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
                onPress={() => console.log("Open area picker")}
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

        <BottomTabBar
          activeTab="Profile"
          onTabPress={(tab) => {
            if (tab === "Home") navigation.navigate("Home");
            if (tab === "Search") navigation.navigate("Search");
            if (tab === "Orders") navigation.navigate("YourCart");
          }}
        />
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
    height: 68,
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
    height: 24,
    width: 68,
    borderRadius: 14,
    backgroundColor: "#F1EAFF",
    justifyContent: "center",
    alignItems: "center",
  },
  enableBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4B238D",
  },

  formCard: {
    padding: 10,
    marginTop: 8,
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
    height: 18,
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
    marginTop: 8,
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
    marginTop: 8,
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
});

export default AddAddressScreen;

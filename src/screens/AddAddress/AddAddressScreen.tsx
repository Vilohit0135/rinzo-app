import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomTabBar from '../../components/home/BottomTabBar';
import { addAddress } from '../../data/addressStore';
import CityIcon from '../../assets/icons/city.png';
import LocationIcon from '../../assets/icons/location.png';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  SavedAddress: undefined;
  AddAddress: undefined;
};

const AddAddressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'AddAddress'>>();

  const [selectedRadio, setSelectedRadio] = useState<'Myself' | 'someone else'>('Myself');
  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [receiverName, setReceiverName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const handleSave = () => {
    const cityPart = selectedCity ? `${selectedCity}` : '';
    const areaPart = selectedArea ? `, ${selectedArea}` : '';
    addAddress({
      title: addressType === 'Home' ? 'Home ( Default )' : addressType,
      address1: address || '221b Baker Street',
      address2: `${cityPart}${areaPart}` || 'Bengaluru, 500012',
      contact: `${receiverName || 'Ms Mira Sharma'} – ${mobile || '94444283283'}`,
      isDefault: addressType === 'Home',
    });
    navigation.goBack();
  };

  const radioOptions: Array<'Myself' | 'someone else'> = ['Myself', 'someone else'];
  const addressTypes: Array<'Home' | 'Work' | 'Other'> = ['Home', 'Work', 'Other'];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={26} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add address details</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Section 1: Current Location Card */}
          <View style={[styles.card, styles.locationCard]}>
            <Ionicons name="location-outline" size={42} color="#111111" />
            <View style={styles.locationTextCol}>
              <Text style={styles.locationTitle}>Adding address at your current location ?</Text>
              <Text style={styles.locationSubtitle}>Enable it to auto-fill address</Text>
            </View>
            <TouchableOpacity style={styles.enableBtn} onPress={() => console.log('Enable location')} activeOpacity={0.8}>
              <Text style={styles.enableBtnText}>Enable</Text>
            </TouchableOpacity>
          </View>

          {/* Section 2: Address Form Card */}
          <View style={[styles.card, styles.formCard]}>
            {/* City Selector */}
            <View style={styles.selector}>
              <Image source={CityIcon} style={styles.iconImage} resizeMode="contain" />
              <Text style={[styles.selectorPlaceholder, selectedCity ? styles.selectorValue : null]}>
                {selectedCity || 'Select a city'}
              </Text>
              <TouchableOpacity style={styles.selectBtn} onPress={() => console.log('Open city picker')} activeOpacity={0.8}>
                <Text style={styles.selectBtnText}>Select</Text>
              </TouchableOpacity>
            </View>

            {/* Area Selector */}
            <View style={[styles.selector, { marginTop: 14 }]}>
              <Image source={LocationIcon} style={styles.iconImage} resizeMode="contain" />
              <Text style={[styles.selectorPlaceholder, selectedArea ? styles.selectorValue : null]}>
                {selectedArea || 'Select an area, Street'}
              </Text>
              <TouchableOpacity style={styles.selectBtn} onPress={() => console.log('Open area picker')} activeOpacity={0.8}>
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
                    <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
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
          </View>

          {/* Save Address As */}
          <Text style={styles.saveAsLabel}>Save address as</Text>

          {/* Segmented Buttons */}
          <View style={styles.segmentRow}>
            {addressTypes.map((type) => {
              const active = type === addressType;
              return (
                <TouchableOpacity
                  key={type}
                  style={[styles.segmentBtn, active ? styles.segmentActive : styles.segmentInactive]}
                  activeOpacity={0.8}
                  onPress={() => setAddressType(type)}
                >
                  <Text style={[styles.segmentText, active ? styles.segmentTextActive : styles.segmentTextInactive]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity activeOpacity={0.9} onPress={handleSave} style={styles.saveBtnWrapper}>
            <LinearGradient
              colors={['#7C5CE6', '#8C63EA']}
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
            if (tab === 'Home') navigation.navigate('Home');
            if (tab === 'Search') navigation.navigate('Search');
            if (tab === 'Orders') navigation.navigate('YourCart');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F5FC',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 140,
    paddingHorizontal: 16,
  },

  /* Shared Card Style */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ECE8F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },

  /* Location Card */
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 110,
    paddingHorizontal: 18,
    gap: 14,
  },
  locationTextCol: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 4,
  },
  locationSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9B9B9B',
  },
  enableBtn: {
    height: 34,
    width: 84,
    borderRadius: 17,
    backgroundColor: '#F1EAFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enableBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B238D',
  },

  /* Form Card */
  formCard: {
    padding: 14,
    marginTop: 16,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 72,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    paddingHorizontal: 16,
    gap: 12,
  },
  selectorPlaceholder: {
    flex: 1,
    fontSize: 17,
    color: '#A0A0A0',
  },
  selectorValue: {
    color: '#111111',
  },
  selectBtn: {
    height: 34,
    width: 84,
    borderRadius: 17,
    backgroundColor: '#F1EAFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B238D',
  },
  iconImage: {
    width: 42,
    height: 42,
    marginRight: 16,
  },
  addressLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111111',
    marginTop: 16,
    marginBottom: 12,
  },
  addressInput: {
    height: 70,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    paddingHorizontal: 16,
    paddingTop: 14,
    fontSize: 17,
    color: '#111111',
  },

  /* Contact Card */
  contactCard: {
    padding: 16,
    marginTop: 18,
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioOuter: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#7C5CE6',
  },
  radioInner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#7C5CE6',
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
  },
  contactInput: {
    height: 70,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    paddingHorizontal: 16,
    fontSize: 17,
    color: '#111111',
    marginBottom: 16,
  },
  mobileLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111111',
    marginBottom: 10,
  },

  /* Save Address As */
  saveAsLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111111',
    marginTop: 22,
    marginBottom: 14,
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 12,
  },
  segmentBtn: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: '#7C5CE6',
  },
  segmentInactive: {
    backgroundColor: '#F2F2F2',
  },
  segmentText: {
    fontSize: 17,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  segmentTextInactive: {
    color: '#111111',
  },

  /* Save Button */
  saveBtnWrapper: {
    marginTop: 24,
    marginBottom: 0,
  },
  saveBtn: {
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default AddAddressScreen;

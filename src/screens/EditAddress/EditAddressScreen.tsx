import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { updateAddress, deleteAddress } from '../../data/addressStore';

type EditAddressParams = {
  index: number;
  addressType: string;
  title: string;
  address1: string;
  address2: string;
  contact: string;
  isDefault: boolean;
};

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  SavedAddress: undefined;
  EditAddress: EditAddressParams;
};

const addressTypes: Array<'Home' | 'Work' | 'Other'> = ['Home', 'Work', 'Other'];

const parseAddress2 = (addr2: string) => {
  const parts = addr2.split(',').map((s) => s.trim());
  const pincodeMatch = addr2.match(/\d{6}/);
  const nonPincodeParts = parts.filter((p) => !/^\d{6}$/.test(p));
  return {
    area: nonPincodeParts.length > 1 ? nonPincodeParts[0] : '',
    city: nonPincodeParts.length > 1 ? nonPincodeParts.slice(0, -1).join(', ') : nonPincodeParts[0] || addr2,
    pincode: pincodeMatch ? pincodeMatch[0] : '',
  };
};

const mapTitleToSegment = (title: string): 'Home' | 'Work' | 'Other' => {
  if (title.includes('Home')) return 'Home';
  if (title.includes('Work')) return 'Work';
  return 'Other';
};

const EditAddressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'EditAddress'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'EditAddress'>>();
  const { index, address1, address2 } = route.params;

  const initialSegment = mapTitleToSegment(route.params.title);
  const parsed = parseAddress2(address2);

  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'Other'>(initialSegment);
  const [houseBuilding, setHouseBuilding] = useState(address1);
  const [areaStreet, setAreaStreet] = useState(parsed.area);
  const [city, setCity] = useState(parsed.city);
  const [pincode, setPincode] = useState(parsed.pincode);
  const [state, setState] = useState('Karnataka');
  const [landmark, setLandmark] = useState('Kali Temple');

  const handleSave = () => {
    const title = addressType === 'Home' ? 'Home ( Default )' : addressType;
    const reconstructedAddress2 = [areaStreet, city, pincode].filter(Boolean).join(', ');
    updateAddress(index, {
      title,
      address1: houseBuilding || address1,
      address2: reconstructedAddress2 || address2,
      contact: route.params.contact,
      isDefault: addressType === 'Home',
    });
    Alert.alert('Success', 'Address updated successfully');
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Delete Address?', 'Are you sure you want to delete this address?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteAddress(index);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={22} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit address</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.saveAsLabel}>Save address as</Text>

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
                  {active ? (
                    <LinearGradient
                      colors={['#7C5CE6', '#8C63EA']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.segmentGradient}
                    >
                      <Text style={styles.segmentTextActive}>{type}</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.segmentTextInactive}>{type}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.fieldLabel}>Full address</Text>

          <TextInput
            style={styles.input}
            placeholder="222b baker street"
            placeholderTextColor="#B8B8B8"
            value={houseBuilding}
            onChangeText={setHouseBuilding}
          />

          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Koramangala"
            placeholderTextColor="#B8B8B8"
            value={areaStreet}
            onChangeText={setAreaStreet}
            multiline
          />

          <Text style={styles.fieldLabel}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Bengaluru"
            placeholderTextColor="#B8B8B8"
            value={city}
            onChangeText={setCity}
          />

          <Text style={styles.fieldLabel}>Pincode</Text>
          <TextInput
            style={styles.input}
            placeholder="500023"
            placeholderTextColor="#B8B8B8"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
          />

          <Text style={styles.fieldLabel}>State</Text>
          <TouchableOpacity style={styles.statePicker} activeOpacity={0.7}>
            <Text style={styles.stateText}>{state}</Text>
            <Ionicons name="chevron-down" size={20} color="#B8B8B8" />
          </TouchableOpacity>

          <Text style={styles.fieldLabel}>Landmark ( Optional )</Text>
          <TextInput
            style={styles.input}
            placeholder="Kali Temple"
            placeholderTextColor="#B8B8B8"
            value={landmark}
            onChangeText={setLandmark}
          />

          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.8}>
            <Text style={styles.deleteText}>Delete Address</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} onPress={handleSave} style={styles.saveBtnWrapper}>
            <LinearGradient
              colors={['#8259D2', '#8259D2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveBtn}
            >
              <Text style={styles.saveBtnText}>Save changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>


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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },

  saveAsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 12,
  },

  segmentRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  segmentBtn: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  segmentGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  segmentActive: {},
  segmentInactive: {
    backgroundColor: '#F2F2F2',
  },
  segmentTextActive: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  segmentTextInactive: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 6,
  },

  input: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    fontSize: 13,
    fontWeight: '500',
    color: '#111111',
    marginBottom: 10,
  },
  inputMultiline: {
    height: 60,
    textAlignVertical: 'top',
  },

  statePicker: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stateText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111111',
  },

  deleteBtn: {
    width: '100%',
    height: 45,
    borderRadius: 20,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF4D4F',
  },

  saveBtnWrapper: {
    width: '100%',
    marginTop: 0,
    marginBottom: 10,
  },
  saveBtn: {
    height: 45,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default EditAddressScreen;

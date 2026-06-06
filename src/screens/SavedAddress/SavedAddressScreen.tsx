import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AddressCard from '../../components/address/AddressCard';
import BottomTabBar from '../../components/home/BottomTabBar';
import { getAddresses, subscribe } from '../../data/addressStore';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  SavedAddress: undefined;
  AddAddress: undefined;
  AddAddressDetails: undefined;
  EditAddress: {
    index: number;
    addressType: string;
    title: string;
    address1: string;
    address2: string;
    contact: string;
    isDefault: boolean;
  };
};

const SavedAddressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SavedAddress'>>();
  const [addresses, setAddresses] = useState(getAddresses);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const unsub = subscribe(() => setAddresses(getAddresses()));
    return unsub;
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={20} color="#B0B0B0" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Saved Address</Text>
          </View>
          <TouchableOpacity style={styles.addNewRow} onPress={() => navigation.navigate('AddAddress')} activeOpacity={0.7}>
            <Ionicons name="add" size={24} color="#4B238D" />
            <Text style={styles.addNewText}>Add New</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {addresses.map((item, index) => (
            <AddressCard
              key={index}
              title={item.title}
              address1={item.address1}
              address2={item.address2}
              contact={item.contact}
              isDefault={item.isDefault}
              selected={selectedIndex === index}
              onSelect={() => setSelectedIndex(index)}
              onEdit={() =>
                navigation.navigate('EditAddress', {
                  index,
                  addressType: item.title,
                  title: item.title,
                  address1: item.address1,
                  address2: item.address2,
                  contact: item.contact,
                  isDefault: item.isDefault,
                })
              }
            />
          ))}
          <TouchableOpacity style={styles.bottomCta} onPress={() => navigation.navigate('AddAddressDetails')} activeOpacity={0.8}>
            <Ionicons name="add" size={24} color="#4B238D" />
            <Text style={styles.bottomCtaText}>Add New Address</Text>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  addNewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  addNewText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B238D',
    marginLeft: 2,
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 140,
  },
  bottomCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#B08CF8',
    backgroundColor: 'transparent',
    gap: 8,
  },
  bottomCtaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B238D',
  },
});

export default SavedAddressScreen;

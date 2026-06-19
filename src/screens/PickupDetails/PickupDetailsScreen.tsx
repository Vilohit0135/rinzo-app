import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import ScrollableScreen from '../../components/common/ScrollableScreen';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from "@react-native-vector-icons/ionicons/static";
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import BookingStepper from '../../components/common/BookingStepper';
import { useBookingStore } from '../../store/bookingStore';
import { useAddressStore } from '../../store/addressStore';
import AddressCard from '../../components/address/AddressCard';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'PickupDetails'>;

const steps = ['Service', 'Address', 'Time', 'Confirm'];

const PickupDetailsScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const pickupDate = useBookingStore((s) => s.pickupDate);
  const pickupTime = useBookingStore((s) => s.pickupTime);
  const address = useBookingStore((s) => s.address);
  const addressLabel = useBookingStore((s) => s.addressLabel);
  const addressContact = useBookingStore((s) => s.addressContact);
  const address1 = useBookingStore((s) => s.address1);
  const address2 = useBookingStore((s) => s.address2);
  const addresses = useAddressStore((s) => s.addresses);
  const setAddress1 = useBookingStore((s) => s.setAddress1);
  const setAddress2 = useBookingStore((s) => s.setAddress2);
  const setAddressLabel = useBookingStore((s) => s.setAddressLabel);
  const setAddressContact = useBookingStore((s) => s.setAddressContact);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || addresses.length === 0) return;
    const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
    if (defaultAddr) {
      setAddress1(defaultAddr.address1);
      setAddress2(defaultAddr.address2);
      setAddressLabel(defaultAddr.title.replace(' ( Default )', ''));
      setAddressContact(defaultAddr.contact);
    }
    initialized.current = true;
  }, [addresses]);

  const handleContinue = () => {
    navigation.navigate('SchedulePickup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollableScreen
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 40 },
          ]}
        >
          <View style={[styles.header, { paddingTop: verticalScale(14) }]}>
            <TouchableOpacity
              style={[
                styles.backButton,
                {
                  width: scale(40),
                  height: scale(40),
                  borderRadius: scale(20),
                },
              ]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={scale(18)} color="#B5B5B5" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { fontSize: responsiveFontSize(20) }]} numberOfLines={1} allowFontScaling={false}>
              Book Pickup
            </Text>
            <View style={{ width: scale(40) }} />
          </View>

          <BookingStepper steps={steps} currentStep={1} />

          <Text style={[styles.sectionTitle, { marginTop: verticalScale(40), fontSize: responsiveFontSize(15) }]} numberOfLines={1} allowFontScaling={false}>
            Pickup Address
          </Text>

          <View style={styles.addressCardContainer}>
            <AddressCard
              title={addressLabel}
              address1={address1}
              address2={address2}
              contact={addressContact}
              onSelect={() => navigation.navigate('SavedAddress', { selectMode: true })}
            />
            <TouchableOpacity style={styles.changeRow} activeOpacity={0.7} onPress={() => navigation.navigate('SavedAddress', { selectMode: true })}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addAddressRow} activeOpacity={0.7} onPress={() => navigation.navigate('AddAddressDetails')}>
              <Ionicons name="add-circle-outline" size={scale(20)} color="#8B5CF6" />
              <Text style={styles.addAddressText}>Add New Address</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.fieldSectionTitle, { marginTop: verticalScale(18), fontSize: responsiveFontSize(15) }]} numberOfLines={1} allowFontScaling={false}>
            Pickup Date
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SchedulePickup')}
              style={[
                styles.fieldCard,
                {
                  marginTop: verticalScale(10),
                  height: verticalScale(44),
                  borderRadius: scale(16),
                  paddingHorizontal: scale(16),
                },
              ]}
            >
              <View style={styles.fieldRow}>
                <Text
                  style={[
                    styles.fieldText,
                    { fontSize: responsiveFontSize(12), color: pickupDate ? '#1D1D1F' : '#B8B8B8' },
                  ]}
                  numberOfLines={1}
                  allowFontScaling={false}
                >
                  {pickupDate || 'Select pickup date'}
                </Text>
                <Ionicons name="chevron-forward" size={scale(14)} color="#B8B8B8" />
              </View>
            </TouchableOpacity>

            <Text style={[styles.fieldSectionTitle, { marginTop: verticalScale(14), fontSize: responsiveFontSize(15) }]} numberOfLines={1} allowFontScaling={false}>
              Pickup Time
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('SchedulePickup')}
              style={[
                styles.fieldCard,
                {
                  marginTop: verticalScale(10),
                  height: verticalScale(44),
                  borderRadius: scale(16),
                  paddingHorizontal: scale(16),
                },
              ]}
            >
              <View style={styles.fieldRow}>
                <Text
                  style={[
                    styles.fieldText,
                    { fontSize: responsiveFontSize(12), color: pickupTime ? '#1D1D1F' : '#B8B8B8' },
                  ]}
                  numberOfLines={1}
                  allowFontScaling={false}
                >
                  {pickupTime || 'Select pickup time'}
                </Text>
                <Ionicons name="chevron-forward" size={scale(14)} color="#B8B8B8" />
              </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                marginTop: verticalScale(45),
                marginBottom: verticalScale(20),
                height: verticalScale(38),
              },
            ]}
            activeOpacity={0.8}
            onPress={handleContinue}
          >
            <LinearGradient
              colors={['#8259D2', '#8259D2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.continueGradient,
                { borderRadius: verticalScale(24) },
              ]}
            >
              <Text style={[styles.continueText, { fontSize: responsiveFontSize(14) }]} numberOfLines={1} allowFontScaling={false}>
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollableScreen>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F6FB' },
  container: { flex: 1 },
  scrollContent: {},

  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    color: '#1D1D1F',
  },

  sectionTitle: {
    marginLeft: 24,
    fontWeight: '700',
    color: '#22223B',
  },

  addressCardContainer: {
    marginTop: verticalScale(16),
  },
  changeRow: {
    marginLeft: 24,
    marginTop: verticalScale(8),
  },
  changeText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#8259D2',
  },

  addAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
    marginTop: verticalScale(6),
    gap: scale(10),
    paddingVertical: verticalScale(8),
  },
  addAddressText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#8259D2',
  },

  fieldSectionTitle: {
    marginLeft: 24,
    fontWeight: '700',
    color: '#22223B',
  },

  fieldCard: {
    marginHorizontal: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldText: {
    fontWeight: '600',
    color: '#B8B8B8',
  },

  continueButton: {
    marginHorizontal: 24,
  },
  continueGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default PickupDetailsScreen;
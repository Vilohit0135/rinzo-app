import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from "@react-native-vector-icons/ionicons/static";
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import BookingStepper from '../../components/common/BookingStepper';
import BottomTabBar from '../../components/home/BottomTabBar';
import { useBookingStore } from '../../store/bookingStore';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'PickupDetails'>;

const steps = ['Service', 'Address', 'Time', 'Confirm'];

const PickupDetailsScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const pickupDate = useBookingStore((s) => s.pickupDate);
  const pickupTime = useBookingStore((s) => s.pickupTime);
  const setAddress = useBookingStore((s) => s.setAddress);

  const handleContinue = () => {
    setAddress('221b Baker Street, Bangalore - 50001, Karnataka');
    navigation.navigate('SchedulePickup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
          showsVerticalScrollIndicator={false}
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

          <View
              style={[
                styles.addressCard,
                {
                  marginTop: verticalScale(16),
                  borderRadius: scale(18),
                  padding: scale(16),
                },
              ]}
            >
              <Text style={[styles.addressTitle, { fontSize: responsiveFontSize(14), marginBottom: verticalScale(6) }]} numberOfLines={1} allowFontScaling={false}>
                221b Baker Street
              </Text>
              <Text style={[styles.addressLine, { fontSize: responsiveFontSize(12) }]} numberOfLines={1} allowFontScaling={false}>
                Bangalore - 50001 , Karnataka
              </Text>

              <View style={[styles.divider, { marginVertical: verticalScale(8) }]} />

              <View style={styles.homeRow}>
                <View style={styles.homeLeft}>
                  <Text style={[styles.homeLabel, { fontSize: responsiveFontSize(14) }]} numberOfLines={1} allowFontScaling={false}>Home</Text>
                  <Text style={[styles.homeContact, { fontSize: responsiveFontSize(12) }]} numberOfLines={1} allowFontScaling={false}>
                    MS Mira Sharma - 9875263167
                  </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={[styles.changeText, { fontSize: responsiveFontSize(14) }]} numberOfLines={1} allowFontScaling={false}>Change</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.divider, { marginVertical: verticalScale(8) }]} />

              <TouchableOpacity style={styles.addAddressRow} activeOpacity={0.7} onPress={() => navigation.navigate('AddAddressDetails')}>
                <Ionicons name="add-circle-outline" size={scale(20)} color="#8B5CF6" />
                <Text style={[styles.addAddressText, { fontSize: responsiveFontSize(14) }]} numberOfLines={1} allowFontScaling={false}>
                  Add New Address
                </Text>
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
        </ScrollView>

        <BottomTabBar
          activeTab="Home"
          onTabPress={(tab) => {
            if (tab === 'Search') navigation.navigate('Search');
            if (tab === 'Orders') navigation.navigate('YourCart');
            if (tab === 'Profile') navigation.navigate('Profile');
          }}
        />
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

  addressCard: {
    width: '92%',
    height: verticalScale(170),
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
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
  addressTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#1D1D1F',
  },
  addressLine: {
    fontSize: responsiveFontSize(12),
    fontWeight: '500',
    color: '#9A9A9A',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },

  homeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  homeLeft: {
    flex: 1,
  },
  homeLabel: {
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 2,
    fontSize: responsiveFontSize(14),
  },
  homeContact: {
    fontWeight: '500',
    color: '#9E9E9E',
    fontSize: responsiveFontSize(14),
  },
  changeText: {
    fontWeight: '700',
    color: '#8259D2',
  },

  addAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingVertical: verticalScale(8),
  },
  addAddressText: {
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
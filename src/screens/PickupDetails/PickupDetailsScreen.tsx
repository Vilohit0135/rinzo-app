import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import BookingStepper from '../../components/common/BookingStepper';
import BottomTabBar from '../../components/home/BottomTabBar';

type Props = NativeStackScreenProps<RootStackParamList, 'PickupDetails'>;

const steps = ['Service', 'Address', 'Time', 'Confirm'];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = Math.min(SCREEN_WIDTH / 390, 1.3);
const vertScale = Math.min(SCREEN_HEIGHT / 844, 1.3);

const hp = (px: number) => Math.round(px * vertScale);
const wp = (px: number) => Math.round(px * scale);
const fs = (px: number) => Math.round(px * Math.min(scale, 1.15));

const PickupDetailsScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();

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
          <View style={[styles.header, { paddingTop: hp(14) }]}>
            <TouchableOpacity
              style={[
                styles.backButton,
                {
                  width: wp(40),
                  height: wp(40),
                  borderRadius: wp(20),
                },
              ]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={wp(18)} color="#B5B5B5" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { fontSize: fs(20) }]}>
              Book Pickup
            </Text>
          </View>

          <BookingStepper steps={steps} currentStep={1} />

          <Text style={[styles.sectionTitle, { marginTop: hp(40), fontSize: fs(15) }]}>
            Pickup Address
          </Text>

          <View
            style={[
              styles.addressCard,
              {
                marginTop: hp(16),
                borderRadius: wp(18),
                padding: wp(16),
              },
            ]}
          >
            <Text style={[styles.addressTitle, { fontSize: fs(14), marginBottom: hp(6) }]}>
              221b Baker Street
            </Text>
            <Text style={[styles.addressLine, { fontSize: fs(12) }]}>
              Bangalore - 50001 , Karnataka
            </Text>

            <View style={[styles.divider, { marginVertical: hp(8) }]} />

            <View style={styles.homeRow}>
              <View style={styles.homeLeft}>
                <Text style={[styles.homeLabel, { fontSize: fs(14) }]}>Home</Text>
                <Text style={[styles.homeContact, { fontSize: fs(12) }]}>
                  MS Mira Sharma - 9875263167
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={[styles.changeText, { fontSize: fs(14) }]}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.divider, { marginVertical: hp(8) }]} />

            <TouchableOpacity style={styles.addAddressRow} activeOpacity={0.7} onPress={() => navigation.navigate('AddAddressDetails')}>
              <Ionicons name="add-circle-outline" size={wp(20)} color="#8B5CF6" />
              <Text style={[styles.addAddressText, { fontSize: fs(14) }]}>
                Add New Address
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.fieldSectionTitle, { marginTop: hp(18), fontSize: fs(15) }]}>
            Pickup Date
          </Text>

          <View
            style={[
              styles.fieldCard,
              {
                marginTop: hp(10),
                height: hp(44),
                borderRadius: wp(16),
                paddingHorizontal: wp(16),
              },
            ]}
          >
            <Text style={[styles.fieldText, { fontSize: fs(12) }]}>
              Tomorrow , 21 May
            </Text>
          </View>

          <Text style={[styles.fieldSectionTitle, { marginTop: hp(14), fontSize: fs(15) }]}>
            Pickup Time
          </Text>

          <View
            style={[
              styles.fieldCard,
              {
                marginTop: hp(10),
                height: hp(44),
                borderRadius: wp(16),
                paddingHorizontal: wp(16),
              },
            ]}
          >
            <Text style={[styles.fieldText, { fontSize: fs(12) }]}>
              2:00 PM – 4:00 PM
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                marginTop: hp(45),
                marginBottom: hp(20),
                height: hp(38),
              },
            ]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SchedulePickup')}
          >
            <LinearGradient
              colors={['#8259D2', '#8259D2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.continueGradient,
                { borderRadius: hp(24) },
              ]}
            >
              <Text style={[styles.continueText, { fontSize: fs(14) }]}>
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
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontWeight: '700',
    color: '#1D1D1F',
    paddingHorizontal: 24,
  },

  sectionTitle: {
    marginLeft: 24,
    fontWeight: '700',
    color: '#22223B',
  },

  addressCard: {
    width: '92%',
    height: hp(170),
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
    fontSize: 14,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  addressLine: {
    fontSize: 12,
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
    fontSize: 14,
  },
  homeContact: {
    fontWeight: '500',
    color: '#9E9E9E',
    fontSize: 14,
  },
  changeText: {
    fontWeight: '700',
    color: '#8259D2',
  },

  addAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(10),
    paddingVertical: hp(8),
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
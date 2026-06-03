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
import BottomTabBar from '../../components/navigation/BottomTabBar';

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
            { paddingBottom: insets.bottom + 140 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.header, { paddingTop: hp(20) }]}>
            <TouchableOpacity
              style={[
                styles.backButton,
                {
                  width: wp(48),
                  height: wp(48),
                  borderRadius: wp(24),
                },
              ]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={wp(20)} color="#B5B5B5" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { fontSize: fs(28) }]}>
              Book Pickup
            </Text>
          </View>

          <BookingStepper steps={steps} currentStep={1} />

          <Text style={[styles.sectionTitle, { marginTop: hp(35), fontSize: fs(24) }]}>
            Pickup Address
          </Text>

          <View
            style={[
              styles.addressCard,
              {
                marginTop: hp(20),
                borderRadius: wp(24),
                padding: wp(20),
              },
            ]}
          >
            <Text style={[styles.addressTitle, { fontSize: fs(18), marginBottom: hp(10) }]}>
              221b Baker Street
            </Text>
            <Text style={[styles.addressLine, { fontSize: fs(14) }]}>
              Bangalore - 50001 , Karnataka
            </Text>

            <View style={[styles.divider, { marginVertical: hp(12) }]} />

            <View style={styles.homeRow}>
              <View style={styles.homeLeft}>
                <Text style={[styles.homeLabel, { fontSize: fs(16) }]}>Home</Text>
                <Text style={[styles.homeContact, { fontSize: fs(14) }]}>
                  MS Mira Sharma - 9875263167
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={[styles.changeText, { fontSize: fs(16) }]}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.divider, { marginVertical: hp(12) }]} />

            <TouchableOpacity style={styles.addAddressRow} activeOpacity={0.7}>
              <Ionicons name="add-circle-outline" size={wp(22)} color="#8B5CF6" />
              <Text style={[styles.addAddressText, { fontSize: fs(16) }]}>
                Add New Address
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.fieldSectionTitle, { marginTop: hp(30), fontSize: fs(24) }]}>
            Pickup Date
          </Text>

          <View
            style={[
              styles.fieldCard,
              {
                marginTop: hp(12),
                height: hp(70),
                borderRadius: wp(20),
                paddingHorizontal: wp(20),
              },
            ]}
          >
            <Text style={[styles.fieldText, { fontSize: fs(16) }]}>
              Tomorrow , 21 May
            </Text>
          </View>

          <Text style={[styles.fieldSectionTitle, { marginTop: hp(20), fontSize: fs(24) }]}>
            Pickup Time
          </Text>

          <View
            style={[
              styles.fieldCard,
              {
                marginTop: hp(12),
                height: hp(70),
                borderRadius: wp(20),
                paddingHorizontal: wp(20),
              },
            ]}
          >
            <Text style={[styles.fieldText, { fontSize: fs(16) }]}>
              2:00 PM – 4:00 PM
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                marginTop: hp(30),
                marginBottom: hp(32),
                height: hp(58),
              },
            ]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SchedulePickupTime')}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C4DFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.continueGradient,
                { borderRadius: hp(29) },
              ]}
            >
              <Text style={[styles.continueText, { fontSize: fs(20) }]}>
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        <BottomTabBar />
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
        elevation: 4,
      },
    }),
  },
  addressTitle: {
    fontWeight: '700',
    color: '#1D1D1F',
  },
  addressLine: {
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
  },
  homeContact: {
    fontWeight: '500',
    color: '#9E9E9E',
  },
  changeText: {
    fontWeight: '700',
    color: '#7C4DFF',
  },

  addAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(10),
    paddingVertical: hp(8),
  },
  addAddressText: {
    fontWeight: '600',
    color: '#8B5CF6',
  },

  fieldSectionTitle: {
    marginLeft: 24,
    fontWeight: '700',
    color: '#22223B',
  },

  fieldCard: {
    marginHorizontal: 24,
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
        elevation: 4,
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
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default PickupDetailsScreen;
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types/navigation';
import BookingStepper from '../../components/common/BookingStepper';
import BottomTabBar from '../../components/navigation/BottomTabBar';

const steps = ['Service', 'Address', 'Time', 'Confirm'];

type Props = NativeStackScreenProps<RootStackParamList, 'PickupDetails'>;

const PickupDetailsScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={20} color="#A7A7A7" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Book Pickup</Text>
          </View>

          <BookingStepper steps={steps} currentStep={1} />

          {/* Section Title */}
          <Text style={styles.sectionTitle}>Pickup Address</Text>

          {/* Address Card */}
          <View style={styles.addressCard}>
            <Text style={styles.addressTitle}>221b Baker Street</Text>
            <Text style={styles.addressSubtitle}>
              Bangalore - 50001 , Karnataka
            </Text>

            <View style={styles.divider} />

            <View style={styles.addressTypeRow}>
              <Text style={styles.addressTypeText}>Home</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.contactText}>
              MS Mira Sharma - 9875263167
            </Text>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.addAddressRow}
              activeOpacity={0.7}
            >
              <Ionicons
                name="add-circle-outline"
                size={28}
                color="#7C58D6"
              />
              <Text style={styles.addAddressText}>Add New Address</Text>
            </TouchableOpacity>
          </View>

          {/* Pickup Date */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Pickup Date</Text>
            <View style={styles.fieldCard}>
              <Text style={styles.fieldText}>Tomorrow , 21 May</Text>
            </View>
          </View>

          {/* Pickup Time */}
          <View style={styles.fieldSectionTime}>
            <Text style={styles.fieldLabel}>Pickup Time</Text>
            <View style={styles.fieldCard}>
              <Text style={styles.fieldText}>2:00 PM - 4:00 PM</Text>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SchedulePickup')}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C58D6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.continueGradient}
            >
              <Text style={styles.continueText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        <BottomTabBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F4F8',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  // Header
  header: {
    height: 36,
    marginTop: 6,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
  },

  // Section Title
  sectionTitle: {
    marginTop: 34,
    marginLeft: 24,
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2340',
  },

  // Address Card
  addressCard: {
    marginTop: 16,
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  addressTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },
  addressSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A0A0A0',
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: 8,
  },
  addressTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressTypeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4C2C91',
  },
  contactText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A0A0A0',
    marginTop: 8,
  },
  addAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addAddressText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5B2DBF',
  },

  // Pickup Date & Time
  fieldSection: {
    marginTop: 24,
    marginHorizontal: 24,
  },
  fieldSectionTime: {
    marginTop: 18,
    marginHorizontal: 24,
  },
  fieldLabel: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2340',
  },
  fieldCard: {
    marginTop: 14,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  fieldText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#B1B1B1',
  },

  // Continue Button
  continueButton: {
    marginHorizontal: 24,
    marginTop: 36,
    height: 44,
  },
  continueGradient: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },

});

export default PickupDetailsScreen;

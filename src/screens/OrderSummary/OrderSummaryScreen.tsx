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
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import BookingStepper from '../../components/common/BookingStepper';
import BottomTabBar from '../../components/home/BottomTabBar';
import { useBookingStore } from '../../store/bookingStore';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderSummary'>;

const steps = ['Service', 'Address', 'Time', 'Confirm'];

const DELIVERY_CHARGE = 20;
const DISCOUNT = 20;

const formatCurrency = (amount: number) => `₹${amount}`;

const OrderSummaryScreen = ({ navigation }: Props) => {
  const services = useBookingStore((s) => s.services);
  const pickupDate = useBookingStore((s) => s.pickupDate);
  const pickupTime = useBookingStore((s) => s.pickupTime);

  const lineItems = services
    .filter((s) => s.quantity > 0)
    .map((s) => ({
      name: `${s.title} ( ${s.quantity} ${s.unit} )`,
      price: s.quantity * s.unitPrice,
    }));

  const subtotal = lineItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + DELIVERY_CHARGE - DISCOUNT;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={20} color="#A7A7A7" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Book Pickup</Text>
          </View>

          <BookingStepper steps={steps} currentStep={3} />

          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.summaryCard}>
            {lineItems.map((item, index) => (
              <React.Fragment key={item.name}>
                {index > 0 && <View style={styles.summaryDivider} />}
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{item.name}</Text>
                  <Text style={styles.summaryPrice}>{formatCurrency(item.price)}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>

          <View style={styles.addressCard}>
            <View style={styles.addressHeaderRow}>
              <Text style={styles.addressTitle}>Pickup Address</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('PickupDetails')}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.addressText}>
              221b Baker Street Bangalore - 50001
            </Text>
            <View style={styles.addressDivider} />
            <View style={styles.timeHeaderRow}>
              <Text style={styles.timeLabel}>Pickup Time</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('SchedulePickup')}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.timeText}>{pickupTime}{pickupDate ? `, ${pickupDate}` : ''}</Text>
          </View>

          <View style={styles.pricingCard}>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Subtotal</Text>
              <Text style={styles.pricingValue}>{formatCurrency(subtotal)}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Delivery Charge</Text>
              <Text style={styles.pricingValue}>{formatCurrency(DELIVERY_CHARGE)}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabelDiscount}>Discount</Text>
              <Text style={styles.pricingDiscount}>-{formatCurrency(DISCOUNT)}</Text>
            </View>
            <View style={styles.pricingDivider} />
            <View style={styles.pricingRow}>
              <Text style={styles.pricingTotalLabel}>Total</Text>
              <Text style={styles.pricingTotalValue}>{formatCurrency(total)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.proceedButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Payment')}
          >
            <LinearGradient colors={['#8259D2', '#8259D2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.proceedGradient}>
              <Text style={styles.proceedText}>Proceed to Payment</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        <BottomTabBar
          activeTab="Orders"
          onTabPress={(tab) => {
            if (tab === 'Home') navigation.navigate('Home');
            if (tab === 'Search') navigation.navigate('Search');
            if (tab === 'Profile') navigation.navigate('Profile');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F4F8' },
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100 },

  header: {
    paddingTop: 16,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E35',
    marginTop: 45,
    marginBottom: 16,
    paddingHorizontal: 24,
  },

  summaryCard: {
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    paddingVertical: 22,
    paddingHorizontal: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  summaryPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8259D2',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 3,
  },

  addressCard: {
    marginTop: 16,
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    padding: 18,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8259D2',
  },
  addressText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555555',
    marginTop: 4,
    lineHeight: 18,
  },
  addressDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  timeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },
  timeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555555',
    marginTop: 3,
  },

  pricingCard: {
    marginTop: 16,
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 36,
  },
  pricingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  pricingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  pricingLabelDiscount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#41B883',
  },
  pricingDiscount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#41B883',
  },
  pricingDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  pricingTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  pricingTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8259D2',
  },

  proceedButton: {
    marginTop: 23,
    marginHorizontal: 24,
    height: 48,
  },
  proceedGradient: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default OrderSummaryScreen;

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

interface OrderItem {
  title: string;
  price: string;
}

const orderItems: OrderItem[] = [
  { title: 'Wash and Fold ( 4 Kg )', price: '₹200' },
  { title: 'Iron Only ( 6 Items )', price: '₹76' },
  { title: 'Dry Cleaning ( 2 Items )', price: '₹240' },
];

const steps = ['Service', 'Address', 'Time', 'Confirm'];

const subtotal = 515;
const deliveryCharge = 20;
const discount = 20;
const total = 485;

type Props = NativeStackScreenProps<RootStackParamList, 'OrderSummary'>;

const OrderSummaryScreen = ({ navigation }: Props) => {
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

          <BookingStepper steps={steps} currentStep={3} />

          {/* Section Title */}
          <Text style={styles.sectionTitle}>Order Summary</Text>

          {/* Services Summary Card */}
          <View style={styles.servicesCard}>
            {orderItems.map((item, index) => (
              <React.Fragment key={item.title}>
                <View style={styles.orderItemRow}>
                  <Text style={styles.orderItemTitle}>{item.title}</Text>
                  <Text style={styles.orderItemPrice}>{item.price}</Text>
                </View>
                {index < orderItems.length - 1 && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Address & Time Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Pickup Address</Text>
            <Text style={styles.infoValue}>
              221b Baker Street Bangalore - 50001
            </Text>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <View style={styles.infoRowLeft}>
                <Text style={styles.infoTitle}>Pickup Time</Text>
                <Text style={styles.infoValue}>
                  Tomorrow, 2:00–4:00 PM
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Price Breakdown */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceLabel}>₹{subtotal}</Text>
            </View>
            <View style={styles.priceDivider} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery Charge</Text>
              <Text style={styles.priceLabel}>₹{deliveryCharge}</Text>
            </View>
            <View style={styles.priceDivider} />
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Discount</Text>
              <Text style={styles.discountText}>~{discount}</Text>
            </View>
            <View style={styles.priceDivider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{total}</Text>
            </View>
          </View>

          {/* Proceed Button */}
          <TouchableOpacity
            style={styles.proceedButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Payment')}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C58D6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.proceedGradient}
            >
              <Text style={styles.proceedText}>Proceed to Payment</Text>
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2340',
  },

  // Services Summary Card
  servicesCard: {
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
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    flex: 1,
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4C2C91',
  },
  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
  },

  // Address & Time Card
  infoCard: {
    marginTop: 18,
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
  infoTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0A0A0',
    marginTop: 6,
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRowLeft: {
    flex: 1,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4C2C91',
    marginLeft: 16,
  },

  // Price Breakdown
  priceSection: {
    marginTop: 18,
    marginHorizontal: 36,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#A0A0A0',
  },
  discountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48B97C',
  },
  priceDivider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },
  totalValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4C2C91',
  },

  // Proceed Button
  proceedButton: {
    marginHorizontal: 24,
    marginTop: 16,
    height: 44,
  },
  proceedGradient: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default OrderSummaryScreen;

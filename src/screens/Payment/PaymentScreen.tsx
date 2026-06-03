import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types/navigation';

interface PaymentMethod {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'UPI',
    title: 'UPI',
    subtitle: 'Pay using any UPI App',
    icon: 'business-outline',
  },
  {
    id: 'Card',
    title: 'Card',
    subtitle: 'Visa Mastercard , Rupay',
    icon: 'card-outline',
  },
  {
    id: 'Wallet',
    title: 'Wallet',
    subtitle: 'Pay using any wallet balance',
    icon: 'wallet-outline',
  },
  {
    id: 'COD',
    title: 'Cash on Delivery',
    subtitle: '',
    icon: 'cash-outline',
  },
];

const totalAmount = 200;

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const PaymentScreen = ({ navigation }: Props) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('UPI');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={20} color="#A7A7A7" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Payment Method</Text>
          </View>

          {/* Section Title */}
          <Text style={styles.sectionTitle}>Select Payment Method</Text>

          {/* Payment Options */}
          <View style={styles.paymentList}>
            {paymentMethods.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentCard,
                    isSelected && styles.paymentCardSelected,
                  ]}
                  onPress={() => setSelectedMethod(method.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.paymentRow}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name={method.icon as any}
                        size={22}
                        color="#7C58D6"
                      />
                    </View>
                    <View style={styles.paymentTextCol}>
                      <Text style={styles.paymentTitle}>{method.title}</Text>
                      {method.subtitle ? (
                        <Text style={styles.paymentSubtitle}>
                          {method.subtitle}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.trailingContainer}>
                      {isSelected ? (
                        <View style={styles.checkmarkCircle}>
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color="#FFFFFF"
                          />
                        </View>
                      ) : (
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="#A0A0A0"
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Bottom Payment Panel */}
        <View style={styles.bottomPanel}>
          <View style={styles.totalRow}>
            <Text style={styles.totalPayableLabel}>Total Payable</Text>
            <Text style={styles.totalPayableAmount}>₹{totalAmount}</Text>
          </View>
          <TouchableOpacity
            style={styles.payButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('OrderConfirmation')}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C58D6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.payGradient}
            >
              <Text style={styles.payText}>Pay ₹{totalAmount}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    flex: 1,
  },

  // Header
  header: {
    height: 36,
    marginTop: 4,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    color: '#111111',
  },

  // Section Title
  sectionTitle: {
    marginTop: 28,
    marginLeft: 24,
    fontSize: 19,
    fontWeight: '700',
    color: '#111111',
  },

  // Payment Options
  paymentList: {
    marginTop: 14,
    gap: 12,
    paddingHorizontal: 20,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 76,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentCardSelected: {
    borderColor: '#B794F4',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F5F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentTextCol: {
    flex: 1,
    marginLeft: 16,
  },
  paymentTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },
  paymentSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A0A0A0',
    marginTop: 4,
  },
  trailingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#7C58D6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Bottom Payment Panel
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 32,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  totalPayableLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },
  totalPayableAmount: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111111',
  },
  payButton: {
    marginTop: 18,
    marginHorizontal: 24,
    height: 44,
  },
  payGradient: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default PaymentScreen;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types/navigation';

const orderId = 'R1212178173819';
const pickupTime = 'Tomorrow , 2:00–4:00 PM';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderConfirmation'>;

const OrderConfirmationScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Order Confirmation</Text>
          <Text style={styles.successMessage}>
            Your order has been placed successfully
          </Text>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Order ID</Text>
              <Text style={styles.cardValue}>{orderId}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Pickup Time</Text>
              <Text style={styles.cardValueSecondary}>{pickupTime}</Text>
            </View>
          </View>

          <Text style={styles.trackMessage}>
            You can track your order in real time
          </Text>

          <TouchableOpacity
            style={styles.trackButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('OrderTracking')}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C58D6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.trackGradient}
            >
              <Text style={styles.trackText}>Track Order</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.homeText}>Back to Home</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  // Title
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },

  // Success Message
  successMessage: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#A0A0A0',
    textAlign: 'center',
  },

  // Order Details Card
  card: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E3F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  cardValueSecondary: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A0A0A0',
  },
  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: 3,
  },

  // Track Message
  trackMessage: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
    color: '#A0A0A0',
    textAlign: 'center',
  },

  // Track Order Button
  trackButton: {
    marginTop: 14,
    width: '100%',
    height: 44,
  },
  trackGradient: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Back to Home
  homeButton: {
    marginTop: 12,
    backgroundColor: 'transparent',
  },
  homeText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2E247E',
    textAlign: 'center',
  },
});

export default OrderConfirmationScreen;

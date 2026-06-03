import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
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

interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  unit: string;
}

const services: Service[] = [
  { id: '1', name: 'Wash and Fold', price: '₹50', description: 'Wash , Dry and Neatly Folded', unit: 'Kg' },
  { id: '2', name: 'Iron Only', price: '₹15', description: 'Wash , Dry and Neatly Folded', unit: 'Item' },
  { id: '3', name: 'Dry Clean', price: '₹120', description: 'Wash , Dry and Neatly Folded', unit: 'Item' },
];

const steps = ['Service', 'Address', 'Time', 'Confirm'];

type Props = NativeStackScreenProps<RootStackParamList, 'BookPickup'>;

const BookPickupScreen = ({ navigation }: Props) => {
  const [activeStep] = useState(0);
  const [quantities, setQuantities] = useState<Record<string, number>>({
    '1': 4,
    '2': 0,
    '3': 0,
  });
  const [instructions, setInstructions] = useState('');

  const increment = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));
  };

  const formatQuantity = (id: string, unit: string) => {
    const val = quantities[id] || 0;
    return `${val}${unit === 'Kg' ? 'Kg' : 'Itm'}`;
  };

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

          <BookingStepper steps={steps} currentStep={activeStep} />

          {/* Select Services Title */}
          <Text style={styles.sectionTitle}>Select Services</Text>

          {/* Service Cards */}
          <View style={styles.serviceList}>
            {services.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceCardTop}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>{service.price} {service.unit}</Text>
                </View>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.quantitySelector}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decrement(service.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="remove" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {formatQuantity(service.id, service.unit)}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => increment(service.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Special Instructions */}
          <View style={styles.instructionsSection}>
            <Text style={styles.instructionsTitle}>Special Instructions ( Optional )</Text>
            <TextInput
              style={styles.instructionsInput}
              placeholder="E.g Separate white clothes"
              placeholderTextColor="#B5B5B5"
              multiline
              textAlignVertical="top"
              value={instructions}
              onChangeText={setInstructions}
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PickupDetails')}
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
    height: 44,
    marginTop: 4,
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
    marginTop: 36,
    marginLeft: 24,
    fontSize: 19,
    fontWeight: '700',
    color: '#111827',
  },

  // Service Cards
  serviceList: {
    marginTop: 20,
    paddingHorizontal: 24,
    gap: 14,
  },
  serviceCard: {
    width: '100%',
    height: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  serviceName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#A0A0A0',
  },
  serviceDescription: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A0A0A0',
    marginTop: 6,
  },
  quantitySelector: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 130,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 18,
    paddingHorizontal: 6,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#A0A0A0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },

  instructionsSection: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  instructionsTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2340',
  },
  instructionsInput: {
    marginTop: 16,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    padding: 16,
    fontSize: 16,
    color: '#111111',
  },

  // Continue Button
  continueButton: {
    marginHorizontal: 24,
    marginTop: 30,
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

export default BookPickupScreen;

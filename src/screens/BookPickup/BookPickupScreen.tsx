import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import BookingStepper from '../../components/common/BookingStepper';
import BottomTabBar from '../../components/navigation/BottomTabBar';

type Props = NativeStackScreenProps<RootStackParamList, 'BookPickup'>;

const steps = ['Service', 'Address', 'Time', 'Confirm'];

interface Service {
  id: string;
  title: string;
  price: string;
  priceUnit: string;
  unit: string;
  subtitle: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Wash and Fold',
    price: '₹50',
    priceUnit: 'Kg',
    unit: 'Kg',
    subtitle: 'Wash , Dry and Neatly Folded',
  },
  {
    id: '2',
    title: 'Iron Only',
    price: '₹15',
    priceUnit: '/Item',
    unit: 'Itm',
    subtitle: 'Wash , Dry and Neatly Folded',
  },
  {
    id: '3',
    title: 'Dry Clean',
    price: '₹120',
    priceUnit: '/Item',
    unit: 'Itm',
    subtitle: 'Wash , Dry and Neatly Folded',
  },
];

const initialQtys: Record<string, number> = { '1': 4, '2': 5, '3': 5 };

const BookPickupScreen = ({ navigation }: Props) => {
  const [quantities, setQuantities] = useState<Record<string, number>>(initialQtys);
  const [instructions, setInstructions] = useState('');

  const increment = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrement = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={20} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Book Pickup</Text>
          </View>

          <BookingStepper steps={steps} currentStep={0} />

          <Text style={styles.sectionTitle}>Select Services</Text>

          <View style={styles.servicesList}>
            {services.map((item) => {
              const qty = quantities[item.id];
              return (
                <View key={item.id} style={styles.serviceCard}>
                  <View style={styles.serviceContent}>
                    <View style={styles.serviceTopRow}>
                      <Text style={styles.serviceTitle}>{item.title}</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.servicePrice}>{item.price}</Text>
                        <Text style={styles.servicePriceUnit}>{item.priceUnit}</Text>
                      </View>
                    </View>
                    <Text style={styles.serviceSubtitle}>{item.subtitle}</Text>
                    <View style={styles.serviceSpacer} />
                    <View style={styles.serviceCounterRow}>
                      <View style={styles.counterPill}>
                        <TouchableOpacity
                          onPress={() => decrement(item.id)}
                          activeOpacity={0.7}
                          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                          <View style={[styles.counterBtn, qty === 0 && styles.counterBtnDisabled]}>
                            <Ionicons name="remove" size={14} color="#FFFFFF" />
                          </View>
                        </TouchableOpacity>
                        <Text style={styles.counterValue}>
                          {qty}{item.unit}
                        </Text>
                        <TouchableOpacity
                          onPress={() => increment(item.id)}
                          activeOpacity={0.7}
                          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                          <View style={styles.counterBtn}>
                            <Ionicons name="add" size={14} color="#FFFFFF" />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <Text style={styles.sectionTitleInstructions}>
            Special Instructions<Text style={styles.optionalText}> ( Optional )</Text>
          </Text>

          <TextInput
            style={styles.instructionsInput}
            multiline
            value={instructions}
            onChangeText={setInstructions}
            placeholder="E.g Separate white clothes"
            placeholderTextColor="#B8B8B8"
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PickupDetails')}
          >
            <LinearGradient colors={['#8B5CF6', '#7C4DFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.continueGradient}>
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
  safeArea: { flex: 1, backgroundColor: '#F7F6FB' },
  container: { flex: 1 },
  scrollContent: { paddingBottom: 120 },

  header: {
    paddingTop: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#1D1D1F',
    paddingHorizontal: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22223B',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  sectionTitleInstructions: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22223B',
    marginTop: 18,
    marginBottom: 10,
    paddingHorizontal: 24,
  },
  optionalText: {
    fontWeight: '500',
    color: '#A7A7A7',
    fontSize: 12,
  },

  servicesList: {
    paddingHorizontal: 24,
    gap: 14,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 105,
    paddingHorizontal: 18,
    paddingVertical: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  serviceContent: {
    flex: 1,
  },
  serviceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7C4DFF',
  },
  servicePriceUnit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9A9A9A',
  },
  serviceSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#AFAFAF',
    marginTop: 4,
  },
  serviceSpacer: {
    flex: 1,
  },
  serviceCounterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  counterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 18,
    width: 110,
    height: 36,
    gap: 4,
  },
  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#AFAFAF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnDisabled: {
    backgroundColor: '#D0D0D0',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },

  instructionsInput: {
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E5F4',
    padding: 14,
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1D1F',
    height: 100,
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

  continueButton: { marginHorizontal: 24, marginTop: 16, marginBottom: 100, height: 54 },
  continueGradient: { flex: 1, borderRadius: 27, justifyContent: 'center', alignItems: 'center' },
  continueText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
});

export default BookPickupScreen;
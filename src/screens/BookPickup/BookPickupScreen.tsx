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
import BottomTabBar from '../../components/home/BottomTabBar';
import { useBookingStore } from '../../store/bookingStore';

type Props = NativeStackScreenProps<RootStackParamList, 'BookPickup'>;

const steps = ['Service', 'Address', 'Time', 'Confirm'];

const BookPickupScreen = ({ navigation }: Props) => {
  const services = useBookingStore((s) => s.services);
  const updateQuantity = useBookingStore((s) => s.updateQuantity);
  const instructions = useBookingStore((s) => s.instructions);
  const setInstructions = useBookingStore((s) => s.setInstructions);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={20} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Book Pickup</Text>
          </View>

          <BookingStepper steps={steps} currentStep={0} />

          <Text style={styles.sectionTitle}>Select Services</Text>

          <View style={styles.servicesList}>
            {services.map((item) => {
              return (
                <View key={item.id} style={styles.serviceCard}>
                  <View style={styles.serviceContent}>
                    <View style={styles.serviceTopRow}>
                      <Text style={styles.serviceTitle}>{item.title}</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.servicePrice}>₹{item.unitPrice}</Text>
                        <Text style={styles.servicePriceUnit}>/{item.unit}</Text>
                      </View>
                    </View>
                    <Text style={styles.serviceSubtitle}>{item.subtitle}</Text>
                    <View style={styles.serviceSpacer} />
                    <View style={styles.serviceCounterRow}>
                      <View style={styles.counterPill}>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                          activeOpacity={0.7}
                          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                          <View style={[styles.counterBtn, item.quantity === 0 && styles.counterBtnDisabled]}>
                            <Ionicons name="remove" size={14} color="#FFFFFF" />
                          </View>
                        </TouchableOpacity>
                        <Text style={styles.counterValue}>
                          {item.quantity}{item.unit}
                        </Text>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
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
            <LinearGradient colors={['#8259D2', '#8259D2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.continueGradient}>
              <Text style={styles.continueText}>Continue</Text>
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
    backgroundColor: '#F4F4F4',
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
    color: '#1D1D1F',
    paddingHorizontal: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22223B',
    marginTop: 28,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionTitleInstructions: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22223B',
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  optionalText: {
    fontWeight: '500',
    color: '#000000',
    fontSize: 14,
  },

  servicesList: {
    paddingHorizontal: 24,
    gap: 10,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    height: 92,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
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
    fontSize: 14,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8259D2',
  },
  servicePriceUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9A9A9A',
  },
  serviceSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#AFAFAF',
    marginTop: 2,
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
    borderRadius: 16,
    width: 77,
    height: 22,
    gap: 4,
  },
  counterBtn: {
    width: 16,
    height: 16,
    borderRadius: 13,
    backgroundColor: '#AFAFAF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnDisabled: {
    backgroundColor: '#D0D0D0',
  },
  counterValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },

  instructionsInput: {
    top: 4,
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8E5F4',
    padding: 12,
    fontSize: 13,
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
        elevation: 1,
      },
    }),
  },

  continueButton: { marginHorizontal: 24, marginTop: 37, marginBottom: 80, height: 43 },
  continueGradient: { flex: 1, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  continueText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});

export default BookPickupScreen;
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from "@react-native-vector-icons/ionicons/static";
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import BookingStepper from '../../components/common/BookingStepper';
import { useBookingStore } from '../../store/bookingStore';
import { scale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import ScrollableScreen from '../../components/common/ScrollableScreen';

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
        <ScrollableScreen contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={20} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1} allowFontScaling={false}>Book Pickup</Text>
            <View style={styles.headerSpacer} />
          </View>

          <BookingStepper steps={steps} currentStep={0} />

          <Text style={styles.sectionTitle} numberOfLines={1} allowFontScaling={false}>Select Services</Text>

          <View style={styles.servicesList}>
            {services.map((item) => {
              return (
                <View key={item.id} style={styles.serviceCard}>
                  <View style={styles.serviceContent}>
                    <View style={styles.serviceTopRow}>
                      <Text style={styles.serviceTitle} numberOfLines={1} allowFontScaling={false}>{item.title}</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.servicePrice} allowFontScaling={false}>₹{item.unitPrice}</Text>
                        <Text style={styles.servicePriceUnit} allowFontScaling={false}>/{item.unit}</Text>
                      </View>
                    </View>
                    <Text style={styles.serviceSubtitle} numberOfLines={1} allowFontScaling={false}>{item.subtitle}</Text>
                    <View style={styles.serviceSpacer} />
                    <View style={styles.serviceCounterRow}>
                      <View style={styles.counterPill}>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                          activeOpacity={0.7}
                          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                          <View style={[styles.counterBtn, item.quantity === 0 && styles.counterBtnDisabled]}>
                            <Ionicons name="remove" size={12} color="#FFFFFF" />
                          </View>
                        </TouchableOpacity>
                        <Text style={styles.counterValue} allowFontScaling={false}>
                          {item.quantity}{item.unit}
                        </Text>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          activeOpacity={0.7}
                          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                          <View style={styles.counterBtn}>
                            <Ionicons name="add" size={12} color="#FFFFFF" />
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
            Special Instructions<Text style={styles.optionalText} allowFontScaling={false}> ( Optional )</Text>
          </Text>

          <TextInput
            style={styles.instructionsInput}
            multiline
            value={instructions}
            onChangeText={setInstructions}
            placeholder="E.g Separate white clothes"
            placeholderTextColor="#B8B8B8"
            textAlignVertical="top"
            allowFontScaling={false}
          />

          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PickupDetails')}
          >
            <LinearGradient colors={['#8259D2', '#8259D2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.continueGradient}>
              <Text style={styles.continueText} numberOfLines={1} allowFontScaling={false}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollableScreen>

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
    flex: 1,
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1D1D1F',
  },
  headerSpacer: {
    width: 40,
  },

  sectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#22223B',
    marginTop: 28,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionTitleInstructions: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#22223B',
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  optionalText: {
    fontWeight: '500',
    color: '#000000',
    fontSize: responsiveFontSize(14),
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
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#1D1D1F',
  },
  servicePrice: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#331970',
  },
  servicePriceUnit: {
    fontSize: responsiveFontSize(12),
    fontWeight: '600',
    color: '#331970',
  },
  serviceSubtitle: {
    fontSize: responsiveFontSize(12),
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
    borderRadius: moderateScale(14),
    width: scale(75),
    height: scale(22),
    gap: scale(4),
  },
  counterBtn: {
    width: scale(15),
    height: scale(15),
    borderRadius: moderateScale(12),
    backgroundColor: '#504f4f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnDisabled: {
    backgroundColor: '#D0D0D0',
  },
  counterValue: {
    fontSize: responsiveFontSize(11),
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
    fontSize: responsiveFontSize(13),
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
  continueText: { fontSize: responsiveFontSize(16), fontWeight: '700', color: '#FFFFFF' },
});

export default BookPickupScreen;
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { responsiveFontSize } from '../../utils/responsive';
import { allServices, type ServiceItem } from '../../data/services/servicesData';
import { useBookingStore } from '../../store/bookingStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AllServices'>;

const AllServicesScreen = ({ navigation }: Props) => {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(allServices.map((s) => [s.id, 0]))
  );
  const setStoreServices = useBookingStore((s) => s.setServices);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }));
  };

  const handleAddToBooking = () => {
    const selected = allServices
      .filter((s) => quantities[s.id] > 0)
      .map((s) => ({
        id: s.id,
        title: s.title,
        unitPrice: s.unitPrice,
        unit: s.unit,
        quantity: quantities[s.id],
        subtitle: s.subtitle,
      }));
    if (selected.length > 0) {
      setStoreServices(selected);
    }
    navigation.navigate('BookPickup');
  };

  const hasSelection = Object.values(quantities).some((q) => q > 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={20} color="#B3B3B3" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1} allowFontScaling={false}>All Services</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {allServices.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              quantity={quantities[item.id]}
              onDecrement={() => updateQuantity(item.id, -1)}
              onIncrement={() => updateQuantity(item.id, 1)}
            />
          ))}
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.addButton, !hasSelection && styles.addButtonDisabled]}
            activeOpacity={0.8}
            onPress={handleAddToBooking}
          >
            <LinearGradient
              colors={['#8259D2', '#8259D2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.addGradient, !hasSelection && styles.addGradientDisabled]}
            >
              <Text style={styles.addText} numberOfLines={1} allowFontScaling={false}>Add to Booking</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const ServiceCard = ({
  item,
  quantity,
  onDecrement,
  onIncrement,
}: {
  item: ServiceItem;
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) => (
  <View style={cardStyles.card}>
    <View style={cardStyles.iconWrap}>
      <Image source={require('../../../assets/images/placeholder-icon.png')} style={cardStyles.iconImage} />
    </View>
    <View style={cardStyles.middle}>
      <Text style={cardStyles.title} numberOfLines={1} allowFontScaling={false}>{item.title}</Text>
      <Text style={cardStyles.subtitle} numberOfLines={1} allowFontScaling={false}>{item.subtitle}</Text>
      <View style={cardStyles.metaRow}>
        <View style={cardStyles.durationPill}>
          <Ionicons name="time-outline" size={11} color="#9A9A9A" />
          <Text style={cardStyles.durationText} allowFontScaling={false}>{item.duration}</Text>
        </View>
      </View>
    </View>
    <View style={cardStyles.right}>
      <View style={cardStyles.priceRow}>
        <Text style={cardStyles.price} allowFontScaling={false}>₹{item.unitPrice}</Text>
        <Text style={cardStyles.priceUnit} allowFontScaling={false}>/{item.unit}</Text>
      </View>
      <View style={cardStyles.counterPill}>
        <TouchableOpacity onPress={onDecrement} activeOpacity={0.7} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
          <View style={[cardStyles.counterBtn, quantity === 0 && cardStyles.counterBtnDisabled]}>
            <Ionicons name="remove" size={12} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <Text style={cardStyles.counterValue} allowFontScaling={false}>{quantity}{item.unit}</Text>
        <TouchableOpacity onPress={onIncrement} activeOpacity={0.7} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
          <View style={cardStyles.counterBtn}>
            <Ionicons name="add" size={12} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F6FB' },
  container: { flex: 1 },

  header: {
    paddingTop: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
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

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
    gap: 10,
  },

  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 28,
    backgroundColor: '#F7F6FB',
  },
  addButton: {
    height: 46,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addGradient: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addGradientDisabled: {},
  addText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 82,
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
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 28,
    height: 28,
  },
  middle: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#1D1D1F',
  },
  subtitle: {
    fontSize: responsiveFontSize(11),
    fontWeight: '500',
    color: '#AFAFAF',
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  durationText: {
    fontSize: responsiveFontSize(10),
    fontWeight: '600',
    color: '#9A9A9A',
  },
  right: {
    alignItems: 'flex-end',
    gap: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 1,
  },
  price: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#8259D2',
  },
  priceUnit: {
    fontSize: responsiveFontSize(11),
    fontWeight: '600',
    color: '#9A9A9A',
  },
  counterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 14,
    width: 72,
    height: 22,
    gap: 4,
  },
  counterBtn: {
    width: 15,
    height: 15,
    borderRadius: 12,
    backgroundColor: '#AFAFAF',
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
});

export default AllServicesScreen;

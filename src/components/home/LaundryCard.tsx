import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

const LaundryCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>Krishna Laundry</Text>
          <View style={styles.metaRow}>
            <Text style={styles.rating}>4.8 (231)</Text>
          </View>
        </View>
        <View style={styles.iconWrap}>
          <Ionicons name="shirt-outline" size={36} color={COLORS.purple} />
        </View>
      </View>

      <Text style={styles.distance}>1.2 km away</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>Rs.50/kg</Text>
        <Text style={styles.deliveryText}>Delivery by 2:00 PM</Text>
      </View>

      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Pickup Available</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Fast Service</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 250,
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 22,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  metaRow: {
    marginTop: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 24,
    backgroundColor: COLORS.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distance: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  priceRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.purple,
  },
  deliveryText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  tagsRow: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
  },
  tag: {
    backgroundColor: COLORS.purpleLight,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.purple,
  },
});

export default LaundryCard;

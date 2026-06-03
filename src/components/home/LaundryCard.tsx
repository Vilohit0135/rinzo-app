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
          <Ionicons name="shirt-outline" size={27} color={COLORS.purple} />
        </View>
      </View>

      <Text style={styles.distance}>1.2 km away</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹50/kg</Text>
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
    height: 188,
    backgroundColor: COLORS.white,
    borderRadius: 21,
    padding: 17,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  metaRow: {
    marginTop: 9,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: COLORS.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distance: {
    marginTop: 11,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  priceRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.purple,
  },
  deliveryText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  tagsRow: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: COLORS.purpleLight,
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.purple,
  },
});

export default LaundryCard;

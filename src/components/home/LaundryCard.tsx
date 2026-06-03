import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface LaundryCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  price: string;
  tags: string[];
  deliveryTime: string;
  icon?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

const tagIcons: Record<string, string> = {
  'Pickup Available': 'car-outline',
  'Fast Service': 'flash-outline',
  'Express': 'flash-outline',
  'Eco Friendly': 'leaf-outline',
  'Dry Clean': 'water-outline',
  'Free Pickup': 'car-outline',
  'Budget': 'wallet-outline',
};

const LaundryCard = ({ name, rating, reviewCount, distance, price, tags, deliveryTime, icon, style, onPress }: LaundryCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.card, style]}>
      <View style={styles.leftIconSection}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon || 'shirt-outline'} size={28} color="#7C4DFF" />
        </View>
      </View>
      <View style={styles.rightContent}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={styles.ratingGroup}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.reviewCount}>({reviewCount})</Text>
          </View>
        </View>

        <View style={styles.secondRow}>
          <Text style={styles.distance}>{distance}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>

        <View style={styles.tagsRow}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Ionicons name={tagIcons[tag] || 'pricetag-outline'} size={12} color="#7C4DFF" />
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.deliveryRow}>
          <Text style={styles.deliveryText}>🕒 Delivery by {deliveryTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 115,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  leftIconSection: {
    width: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContent: {
    flex: 1,
    paddingLeft: 7,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  reviewCount: {
    fontSize: 13,
    color: '#9A9AB0',
  },
  secondRow: {
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distance: {
    fontSize: 14,
    color: '#8E8EAA',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6C4DFF',
  },
  tagsRow: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 3,
  },
  tag: {
    height: 16,
    borderRadius: 13,
    paddingHorizontal: 10,
    backgroundColor: '#EFE9FF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#7C4DFF',
  },
  deliveryRow: {
    marginTop: 10,
  },
  deliveryText: {
    fontSize: 13,
    color: '#8E8EAA',
  },
});

export default LaundryCard;

import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { FavouriteButton } from '../favourites/FavouriteButton';

interface LaundryCardProps {
  id: string;
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
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
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

const LaundryCard = ({ id, name, rating, reviewCount, distance, price, tags, deliveryTime, icon, style, onPress, isFavourite, onToggleFavourite }: LaundryCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.card, style]}>
      <View style={styles.leftIconSection}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon || 'shirt-outline' as any} size={24} color="#8259D2" />
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
              <Ionicons name={tagIcons[tag] || 'pricetag-outline' as any} size={12} color="#8259D2" />
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.deliveryRow}>
          <Text style={styles.deliveryText}>🕒 Delivery by {deliveryTime}</Text>
        </View>
      </View>

      <View style={styles.favouriteWrap}>
        <FavouriteButton
          isFavourite={isFavourite}
          onPress={() => onToggleFavourite(id)}
          size={22}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 2,
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
    elevation: 1,
  },
  leftIconSection: {
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginLeft: -10,
    width: 78,
    height: 82,
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
    fontSize: 14,
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
    fontSize: 12,
    color: '#8E8EAA',
  },
  price: {
    fontSize: 14,
    marginTop: 3,
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
    marginTop: 7,
  },
  deliveryText: {
    fontSize: 12,
    color: '#8E8EAA',
  },
  favouriteWrap: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LaundryCard;

import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { getLaundryById } from '../../data/laundry/laundryData';
import { FavouriteButton } from './FavouriteButton';

interface FavouriteLaundryCardProps {
  laundryId: string;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
  imageSource?: any;
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

const FavouriteLaundryCard = ({ laundryId, isFavourite, onToggleFavourite, imageSource }: FavouriteLaundryCardProps) => {
  const laundry = getLaundryById(laundryId);

  if (!laundry) {
    return null;
  }

  return (
    <View style={styles.card}>
      {imageSource ? (
        <Image source={imageSource} style={styles.thumbnailImage} />
      ) : (
        <View style={styles.thumbnail} />
      )}

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>{laundry.name}</Text>
          <View style={styles.ratingGroup}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <Text style={styles.rating}>{laundry.rating}</Text>
            <Text style={styles.reviewCount}>({laundry.reviewCount})</Text>
          </View>
        </View>

        <View style={styles.secondRow}>
          <View style={styles.locationGroup}>
            <Ionicons name="location-outline" size={13} color="#8259D2" />
            <Text style={styles.distance}>{laundry.distance}</Text>
          </View>
          <Text style={styles.price}>{laundry.price}</Text>
        </View>

        <View style={styles.tagsRow}>
          {laundry.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Ionicons name={tagIcons[tag] || 'pricetag-outline' as any} size={11} color="#6C4DFF" />
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.deliveryRow}>
          <Ionicons name="time-outline" size={12} color="#8D8DAD" />
          <Text style={styles.deliveryText}> Delivery by {laundry.deliveryTime}</Text>
        </View>
      </View>

      <View style={styles.favouriteIcon}>
        <FavouriteButton
          isFavourite={isFavourite}
          onPress={() => onToggleFavourite(laundryId)}
          size={22}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 139,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  thumbnail: {
    width: 79,
    height: 99,
    borderRadius: 14,
    backgroundColor: '#F1ECFF',
    alignSelf: 'center',
  },
  thumbnailImage: {
    width: 79,
    height: 99,
    borderRadius: 14,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    paddingLeft: 12,
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
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  reviewCount: {
    fontSize: 12,
    color: '#9A9AB0',
  },
  secondRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 13,
    color: '#8D8DAD',
  },
  locationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#331970',
  },
  tagsRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 13,
    backgroundColor: '#EEE8FF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6C4DFF',
  },
  deliveryRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 12,
    color: '#8D8DAD',
  },
  favouriteIcon: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default FavouriteLaundryCard;

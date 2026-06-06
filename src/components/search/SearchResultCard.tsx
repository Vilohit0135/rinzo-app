import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FavouriteButton } from '../favourites/FavouriteButton';

interface SearchResultCardProps {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  price: string;
  tags: string[];
  deliveryTime: string;
  onPress?: () => void;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
}

const SearchResultCard = ({ id, name, rating, reviewCount, distance, price, tags, deliveryTime, onPress, isFavourite, onToggleFavourite }: SearchResultCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.card}>
      <View style={styles.thumbnail} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={styles.ratingGroup}>
            <Ionicons name="star" size={11} color="#FFC107" />
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
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '98%',
    marginLeft: 2,
    height: 115,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: '#F1ECFF',
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  reviewCount: {
    fontSize: 11,
    color: '#8D8DAD',
  },
  secondRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distance: {
    fontSize: 12,
    color: '#8D8DAD',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8259D2',
  },
  tagsRow: {
    marginTop: 6,
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 14,
    backgroundColor: '#EEE8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8259D2',
  },
  deliveryRow: {
    marginTop: 8,
  },
  deliveryText: {
    fontSize: 12,
    color: '#8D8DAD',
  },
  favouriteWrap: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchResultCard;

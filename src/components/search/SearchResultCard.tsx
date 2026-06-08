import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { FavouriteButton } from '../favourites/FavouriteButton';
import { responsiveFontSize } from '../../utils/responsive';

interface SearchResultCardProps {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  price: string;
  tags: string[];
  deliveryTime: string;
  imageSource?: any;
  onPress?: () => void;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
}

const SearchResultCard = ({ id, name, rating, reviewCount, distance, price, tags, deliveryTime, imageSource, onPress, isFavourite, onToggleFavourite }: SearchResultCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.card}>
      {imageSource ? (
        <Image source={imageSource} style={styles.thumbnailImage} />
      ) : (
        <View style={styles.thumbnail} />
      )}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1} allowFontScaling={false}>{name}</Text>
          <View style={styles.ratingGroup}>
            <Ionicons name="star" size={11} color="#FFC107" />
            <Text style={styles.rating} allowFontScaling={false}>{rating}</Text>
            <Text style={styles.reviewCount} allowFontScaling={false}>({reviewCount})</Text>
          </View>
        </View>

        <View style={styles.secondRow}>
          <View style={styles.locationGroup}>
            <Ionicons name="location-outline" size={12} color="#8259D2" />
            <Text style={styles.distance} allowFontScaling={false} numberOfLines={1}>{distance}</Text>
          </View>
          <Text style={styles.price} allowFontScaling={false} numberOfLines={1}>{price}</Text>
        </View>

        <View style={styles.tagsRow}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText} allowFontScaling={false} numberOfLines={1}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.deliveryRow}>
          <Text style={styles.deliveryText} allowFontScaling={false} numberOfLines={1}>🕒 Delivery by {deliveryTime}</Text>
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
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 14,
    resizeMode: 'cover',
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
    fontSize: responsiveFontSize(13),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    fontSize: responsiveFontSize(11),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  reviewCount: {
    fontSize: responsiveFontSize(11),
    color: '#8D8DAD',
  },
  secondRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distance: {
    fontSize: responsiveFontSize(12),
    color: '#8D8DAD',
  },
  locationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#331970',
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
    fontSize: responsiveFontSize(10),
    fontWeight: '600',
    color: '#8259D2',
  },
  deliveryRow: {
    marginTop: 8,
  },
  deliveryText: {
    fontSize: responsiveFontSize(12),
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

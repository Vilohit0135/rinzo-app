import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { FavouriteButton } from '../favourites/FavouriteButton';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

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
  imageSource?: any;
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

const LaundryCard = ({ id, name, rating, reviewCount, distance, price, tags, deliveryTime, icon, imageSource, style, onPress, isFavourite, onToggleFavourite }: LaundryCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.card, style]}>
      <View style={styles.leftIconSection}>
        <View style={styles.iconContainer}>
          <Image source={imageSource || require('../../../assets/images/placeholder-icon.png')} style={styles.cardIcon} />
        </View>
      </View>
      <View style={styles.rightContent}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1} allowFontScaling={false}>{name}</Text>
          <View style={styles.ratingGroup}>
            <Ionicons name="star" size={16} color="#FFC107" />
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
              <Ionicons name={tagIcons[tag] || 'pricetag-outline' as any} size={12} color="#8259D2" />
              <Text style={styles.tagText} allowFontScaling={false} numberOfLines={1}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.deliveryRow}>
          <Ionicons name="time-outline" size={14} color="#8E8EAA" />
          <Text style={styles.deliveryText} allowFontScaling={false} numberOfLines={1}> Delivery by {deliveryTime}</Text>
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
    height: verticalScale(115),
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(18),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  leftIconSection: {
    width: scale(75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginLeft: scale(-10),
    width: scale(108),
    height: verticalScale(82),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContent: {
    flex: 1,
    paddingLeft: scale(7),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flexShrink: 1,
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
  },
  rating: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  reviewCount: {
    fontSize: responsiveFontSize(13),
    color: '#9A9AB0',
  },
  secondRow: {
    marginTop: verticalScale(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distance: {
    fontSize: responsiveFontSize(12),
    color: '#8E8EAA',
  },
  locationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  price: {
    fontSize: responsiveFontSize(14),
    marginTop: verticalScale(3),
    fontWeight: '700',
    color: '#331970',
  },
  tagsRow: {
    marginTop: verticalScale(5),
    flexDirection: 'row',
    gap: scale(3),
  },
  tag: {
    height: verticalScale(16),
    borderRadius: moderateScale(13),
    paddingHorizontal: scale(10),
    backgroundColor: '#EFE9FF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  tagText: {
    fontSize: responsiveFontSize(8),
    fontWeight: '500',
    color: '#7C4DFF',
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: verticalScale(7),
  },
  deliveryText: {
    fontSize: responsiveFontSize(12),
    color: '#8E8EAA',
  },
  cardIcon: {
    width: scale(88),
    height: verticalScale(88),
    borderRadius: moderateScale(13),
  },
  favouriteWrap: {
    position: 'absolute',
    bottom: verticalScale(8),
    right: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LaundryCard;

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface LaundryInfoCardProps {
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
  imageSource?: any;
  onPress?: () => void;
}

const LaundryInfoCard = ({ name, rating, reviews, distance, price, imageSource, onPress }: LaundryInfoCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      disabled={!onPress}
    >
      {imageSource ? (
        <Image source={imageSource} style={styles.thumbnailImage} />
      ) : (
        <View style={styles.thumbnail} />
      )}
      <View style={styles.content}>
        <View style={styles.row1}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={styles.ratingGroup}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.reviews}>({reviews})</Text>
          </View>
        </View>
        <View style={styles.row2}>
          <View style={styles.locationGroup}>
            <Ionicons name="location-outline" size={12} color="#8259D2" />
            <Text style={styles.distance}>{distance}</Text>
          </View>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: verticalScale(96),
    top: verticalScale(15),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#EFEAFB',
    padding: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: scale(62),
    height: verticalScale(62),
    borderRadius: moderateScale(12),
    backgroundColor: '#F1ECFF',
  },
  thumbnailImage: {
    width: scale(62),
    height: verticalScale(62),
    borderRadius: moderateScale(12),
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    paddingLeft: scale(12),
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(22),
  },
  name: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(8),
    gap: scale(4),
  },
  rating: {
    fontSize: responsiveFontSize(14),
    fontWeight: '700',
    color: '#1E1E2D',
  },
  reviews: {
    fontSize: responsiveFontSize(13),
    color: '#A1A1B5',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(4),
  },
  locationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  distance: {
    fontSize: responsiveFontSize(13),
    color: '#8D8DAD',
  },
  price: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#331970',
    marginLeft: scale(12),
  },
});

export default LaundryInfoCard;

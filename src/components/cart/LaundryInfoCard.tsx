import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface LaundryInfoCardProps {
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
}

const LaundryInfoCard = ({ name, rating, reviews, distance, price }: LaundryInfoCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.thumbnail} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 96,
    top: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EFEAFB',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 62,
    height: 62,
    borderRadius: 12,
    backgroundColor: '#F1ECFF',
  },
  content: {
    flex: 1,
    paddingLeft: 12,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 22,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  reviews: {
    fontSize: 13,
    color: '#A1A1B5',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  locationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    fontSize: 13,
    color: '#8D8DAD',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6C4DFF',
    marginLeft: 12,
  },
});

export default LaundryInfoCard;

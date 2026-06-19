import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { getLaundryById } from '../../data/laundry/laundryData';
import RatingStars from './RatingStars';

interface ReviewCardProps {
  laundryId: string;
  rating: number;
  reviewDate: string;
  reviewText: string;
  onEditPress?: () => void;
}

const ReviewCard = ({ laundryId, rating, reviewDate, reviewText, onEditPress }: ReviewCardProps) => {
  const laundry = getLaundryById(laundryId);

  if (!laundry) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.laundryName}>{laundry.name}</Text>

      <Text style={styles.date}>{reviewDate}</Text>

      <View style={styles.starRow}>
        <RatingStars rating={rating} />
      </View>

      <Text style={styles.reviewText} numberOfLines={2}>
        {reviewText}
      </Text>

      <TouchableOpacity style={styles.editSection} activeOpacity={0.7} onPress={onEditPress}>
        <Text style={styles.editText}>Edit Review</Text>
        <Ionicons name="chevron-forward" size={14} color="#111111" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 148,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  laundryName: {
    top: 4,
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  date: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: '500',
    color: '#B2B2B2',
  },
  starRow: {
    marginTop: 8,
  },
  reviewText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 19,
    fontWeight: '400',
    color: '#9C9C9C',
    maxWidth: 260,
  },
  editSection: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3E248C',
    textDecorationLine: 'underline',
  },
});

export default ReviewCard;

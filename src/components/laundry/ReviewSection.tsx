import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ReviewStar {
  label: string;
  percentage: number;
}

interface ReviewSectionProps {
  rating: number;
  reviewCount: number;
  reviewSummary: ReviewStar[];
}

const ReviewSection = ({ rating, reviewCount, reviewSummary }: ReviewSectionProps) => {
  return (
    <View>
      <Text style={styles.title}>Reviews ({reviewCount})</Text>

      <View style={styles.ratingBlock}>
        <Text style={styles.ratingNumber}>{rating}</Text>
        <View style={styles.starsRow}>
          <Ionicons name="star" size={16} color="#E6A12D" />
          <Ionicons name="star" size={16} color="#E6A12D" />
          <Ionicons name="star" size={16} color="#E6A12D" />
          <Ionicons name="star" size={16} color="#E6A12D" />
          <Ionicons name="star-outline" size={16} color="#E5E5E5" />
        </View>
      </View>

      {reviewSummary.map((item) => (
        <View key={item.label} style={styles.barRow}>
          <Text style={styles.barLabel}>{item.label}</Text>
          <View style={styles.barBg}>
            <View style={[styles.barFill, { width: `${item.percentage}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  ratingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  ratingNumber: {
    fontSize: 56,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
  },

  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 10,
  },
  barLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E1E2D',
    width: 45,
  },
  barBg: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E5E5',
    overflow: 'hidden',
  },
  barFill: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E6A12D',
  },
});

export default ReviewSection;

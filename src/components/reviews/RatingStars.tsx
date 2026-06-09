import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface RatingStarsProps {
  rating: number;
  size?: number;
  onRate?: (rating: number) => void;
}

const RatingStars = ({ rating, size = 17, onRate }: RatingStarsProps) => {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((star) => {
        const starIcon = onRate ? (
          <TouchableOpacity key={star} activeOpacity={0.7} onPress={() => onRate(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={size}
              color={star <= rating ? '#FFC107' : '#D1D1D6'}
            />
          </TouchableOpacity>
        ) : (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={size}
            color={star <= rating ? '#FFC107' : '#D1D1D6'}
          />
        );
        return starIcon;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default RatingStars;

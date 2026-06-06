import { StyleSheet, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

const RatingStars = () => {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <Ionicons key={index} name="star" size={17} color="#6A44AF" />
      ))}
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

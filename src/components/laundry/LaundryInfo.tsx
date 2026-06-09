import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface LaundryInfoProps {
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  closingTime: string;
  tags: string[];
}

const LaundryInfo = ({ name, rating, reviewCount, distance, closingTime, tags }: LaundryInfoProps) => {
  return (
    <View>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={15} color="#FFC107" />
        <Text style={styles.rating}>{rating}</Text>
        <Text style={styles.reviews}>({reviewCount} Reviews)</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color="#8259D2" />
          <Text style={styles.infoText}>{distance}</Text>
        </View>
        <Text style={styles.infoText}>🟢 Open till {closingTime}</Text>
      </View>

      <View style={styles.tagsRow}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 5,
  },
  rating: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  reviews: {
    fontSize: 14,
    color: '#9A9AB0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#8D8DAD',
  },
  tagsRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 8,
  },
  tag: {
    height: 27,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#EEE8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8259D2',
  },
});

export default LaundryInfo;

import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Offer } from '../../data/offers/offersData';

interface OfferCardProps {
  offer: Offer;
  index: number;
}

const OfferCard = ({ offer, index }: OfferCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons name={offer.icon as any} size={22} color="#B497F2" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
        <Text style={styles.validity}>{offer.validTill}</Text>
      </View>
      {index === 0 && (
        <Text style={styles.viewAll}>View All</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 108,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9D9D9D',
    lineHeight: 20,
  },
  validity: {
    fontSize: 13,
    fontWeight: '400',
    color: '#9D9D9D',
    marginTop: 4,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#352178',
    textDecorationLine: 'underline',
  },
});

export default OfferCard;

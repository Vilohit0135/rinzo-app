import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface PickupDetailsCardProps {
  address: string;
  pickupTime: string;
}

const PickupDetailsCard = ({ address, pickupTime }: PickupDetailsCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.address}>{address}</Text>
        <Ionicons name="create-outline" size={16} color="#8D8DAD" />
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Pickup Time</Text>
          <Text style={styles.time}>{pickupTime}</Text>
        </View>
        <Ionicons name="create-outline" size={16} color="#8D8DAD" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  address: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1E1E2D',
    flex: 1,
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
  },
  label: {
    fontSize: 11,
    color: '#8D8DAD',
    marginBottom: 2,
  },
  time: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1E1E2D',
  },
});

export default PickupDetailsCard;

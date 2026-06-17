import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface OrderCardProps {
  id: string;
  status: 'ongoing' | 'completed' | 'cancelled';
  statusLabel: string;
  laundryName: string;
  date: string;
  amount: string;
  onPress?: () => void;
}

const badgeStyles: Record<string, { bg: string; text: string }> = {
  ongoing: { bg: '#EDE6FF', text: '#1E1E2D' },
  completed: { bg: '#D8F1E4', text: '#4E9A6A' },
  cancelled: { bg: '#9C9C9C', text: '#FFFFFF' },
};

const OrderCard = ({ id, status, statusLabel, laundryName, date, amount, onPress }: OrderCardProps) => {
  const badge = badgeStyles[status] || badgeStyles.cancelled;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.orderId}>#{id}</Text>

      <View style={[styles.badge, { backgroundColor: badge.bg }]}>
        <Text style={[styles.badgeText, { color: badge.text }]}>{statusLabel}</Text>
      </View>

      <Text style={styles.laundryName}>{laundryName}</Text>

      <Text style={styles.date}>{date}</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>{amount}</Text>
        <Ionicons name="chevron-forward" size={18} color="#111111" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 10,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  orderId: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 6,
    height: 20,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  laundryName: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '500',
    color: '#A0A0A0',
  },
  date: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    color: '#A0A0A0',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: '#331970',
  },
});

export default OrderCard;

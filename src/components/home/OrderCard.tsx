import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const OrderCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.name}>Krishna Laundry</Text>
        <Text style={styles.status}>Washing in progress</Text>
        <Text style={styles.orderId}>Order ID: #KL21345</Text>
        <Text style={styles.schedule}>Scheduled for Today, 3:00 PM</Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Track Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 118,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  status: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.purpleDark,
  },
  orderId: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  schedule: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  button: {
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderPurple,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.purple,
  },
});

export default OrderCard;

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
    height: 89,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  status: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.purpleDark,
  },
  orderId: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  schedule: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  button: {
    height: 33,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.borderPurple,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.purple,
  },
});

export default OrderCard;

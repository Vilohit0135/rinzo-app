import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { responsiveFontSize } from '../../utils/responsive';

interface OrderStatusTimeProps {
  pickupTime: string;
  trackMessage?: string;
}

const OrderStatusTime = ({ pickupTime, trackMessage = 'You can track your order in real time' }: OrderStatusTimeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeRow}>
        <Ionicons name="time-outline" size={22} color="#6F7787" />
        <Text style={styles.timeText} allowFontScaling={false}>{pickupTime}</Text>
      </View>
      <Text style={styles.trackMessage} allowFontScaling={false}>{trackMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 36,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#6F7787',
  },
  trackMessage: {
    fontSize: responsiveFontSize(13),
    fontWeight: '500',
    color: '#6F7787',
    textAlign: 'center',
    marginTop: 28,
  },
});

export default OrderStatusTime;

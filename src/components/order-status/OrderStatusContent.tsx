import { StyleSheet, Text, View } from 'react-native';
import { responsiveFontSize } from '../../utils/responsive';

interface OrderStatusContentProps {
  orderId: string;
  title?: string;
}

const OrderStatusContent = ({ orderId, title = 'Order Picked Up' }: OrderStatusContentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} allowFontScaling={false}>{title}</Text>
      <Text style={styles.orderMessage} allowFontScaling={false}>
        Your order #{orderId}{'\n'}has been picked up
      </Text>
      <Text style={styles.description} allowFontScaling={false}>
        Our executive will reach the laundry facility shortly.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: responsiveFontSize(22),
    fontWeight: '600',
    color: '#171A2C',
    textAlign: 'center',
    marginTop: -36,
  },
  orderMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(20),
    fontWeight: '700',
    color: '#171A2C',
    lineHeight: 26,
    textAlign: 'center',
    maxWidth: 280,
    marginTop: 22,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
    color: '#6F7787',
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 240,
    marginTop: 12,
  },
});

export default OrderStatusContent;

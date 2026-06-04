import { Image, StyleSheet } from 'react-native';

const OrderStatusIllustration = () => {
  return (
    <Image
      source={require('../../../assets/images/order-status.png')}
      style={styles.image}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    alignSelf: 'center',
  },
});

export default OrderStatusIllustration;

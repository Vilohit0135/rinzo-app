import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CheckoutButtonProps {
  onPress?: () => void;
}

const LaundryCheckoutButton = ({ onPress }: CheckoutButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.wrapper} onPress={onPress}>
      <LinearGradient
        colors={['#8259D2', '#8259D2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.text}>Proceed to Checkout</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 26,
    left: 16,
    right: 16,
  },
  button: {
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default LaundryCheckoutButton;

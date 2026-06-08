import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface CheckoutButtonProps {
  onPress: () => void;
}

const CheckoutButton = ({ onPress }: CheckoutButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
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
  button: {
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default CheckoutButton;

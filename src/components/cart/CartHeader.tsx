import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface CartHeaderProps {
  onBackPress: () => void;
}

const CartHeader = ({ onBackPress }: CartHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={20} color="#8C8C8C" />
      </TouchableOpacity>
      <Text style={styles.title}>Your cart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: verticalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    width: scale(42),
    height: verticalScale(42),
    borderRadius: moderateScale(26),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: responsiveFontSize(28),
    fontWeight: '500',
    color: '#111111',
  },
});

export default CartHeader;

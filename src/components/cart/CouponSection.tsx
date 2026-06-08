import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

const CouponSection = () => {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Entry Coupon Code"
        placeholderTextColor="#8D8DAD"
      />
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  input: {
    height: verticalScale(44),
    width: '72%',
    borderRadius: moderateScale(12),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: scale(14),
    fontSize: responsiveFontSize(14),
    color: '#1E1E2D',
  },
  applyText: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#4D2CA3',
  },
});

export default CouponSection;

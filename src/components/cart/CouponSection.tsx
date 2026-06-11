import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface CouponSectionProps {
  value: string;
  onChangeText: (text: string) => void;
  onApplyPress: () => void;
  appliedCoupon: string | null;
}

const CouponSection = ({ value, onChangeText, onApplyPress, appliedCoupon }: CouponSectionProps) => {
  return (
    <View style={styles.row}>
      <TextInput
        style={[styles.input, appliedCoupon ? styles.inputApplied : null]}
        placeholder="Entry Coupon Code"
        placeholderTextColor="#8D8DAD"
        value={appliedCoupon ? appliedCoupon : value}
        onChangeText={onChangeText}
        editable={!appliedCoupon}
        autoCapitalize="characters"
        allowFontScaling={false}
      />
      <TouchableOpacity activeOpacity={0.7} onPress={onApplyPress}>
        <Text style={[styles.applyText, appliedCoupon ? styles.removeText : null]}>
          {appliedCoupon ? 'Remove' : 'Apply'}
        </Text>
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
  inputApplied: {
    backgroundColor: '#F3FCF8',
    borderColor: '#41B883',
    color: '#41B883',
    fontWeight: '700',
  },
  applyText: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#4D2CA3',
  },
  removeText: {
    color: '#E53E3E',
  },
});

export default CouponSection;

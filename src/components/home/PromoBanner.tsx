import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';

interface PromoBannerProps {
  onClaimPress?: () => void;
}

const PromoBanner = ({ onClaimPress }: PromoBannerProps) => {
  return (
    <LinearGradient
      colors={[COLORS.promoStart, COLORS.promoEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      <View style={styles.content}>
        <View style={styles.label}>
          <Text style={styles.labelText}>PROMO</Text>
        </View>
        <Text style={styles.title}>Get 30% Off</Text>
        <Text style={styles.subtitle}>On your first order</Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onClaimPress}>
        <Text style={styles.buttonText}>Claim Now →</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: verticalScale(80),
    borderRadius: moderateScale(17),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  label: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.purple,
    borderRadius: moderateScale(5),
    paddingHorizontal: scale(19),
    paddingVertical: verticalScale(3),
  },
  labelText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.white,
  },
  title: {
    marginTop: verticalScale(1),
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    marginTop: 0,
    fontSize: 13,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  button: {
    height: verticalScale(29),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.purple,
    paddingHorizontal: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default PromoBanner;

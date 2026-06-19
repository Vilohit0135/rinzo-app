import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface ServiceCardProps {
  title: string;
  icon: string;
}

const ServiceCard = ({ title }: ServiceCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Image source={require('../../../assets/images/placeholder-icon.png')} style={styles.iconImage} />
      </View>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: scale(83),
    height: verticalScale(98),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(6),
    },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 1,
  },
  iconWrap: {
    alignSelf: 'center',
    width: scale(54),
    height: verticalScale(54),
    borderRadius: moderateScale(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: scale(42),
    height: verticalScale(42),
  },
  title: {
    top: verticalScale(5),
    alignSelf: 'center',
    fontSize: responsiveFontSize(10.5),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});

export default ServiceCard;

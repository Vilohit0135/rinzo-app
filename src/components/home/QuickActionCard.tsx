import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface QuickActionCardProps {
  title: string;
  icon: string;
  iconSource?: any;
  onPress?: () => void;
}

const QuickActionCard = ({ title, icon, iconSource, onPress }: QuickActionCardProps) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.iconWrap}>
        {iconSource ? (
          <Image source={iconSource} style={styles.quickIcon} />
        ) : (
          <Ionicons name={icon as any} size={24} color={COLORS.purple} />
        )}
      </View>
      <Text style={styles.title} allowFontScaling={false} numberOfLines={2}>{title.replace(' ', '\n')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: scale(135),
    height: verticalScale(43),
    backgroundColor: COLORS.purpleLight,
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: scale(26),
    height: verticalScale(26),
    borderRadius: moderateScale(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIcon: {
    width: scale(24),
    height: verticalScale(24),
  },
  title: {
    marginLeft: scale(10),
    fontSize: responsiveFontSize(11),
    fontWeight: '700',
    color: '#331970',
  },
});

export default QuickActionCard;

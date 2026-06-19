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
          <Ionicons name={icon as any} size={22} color={COLORS.purple} />
        )}
      </View>
      <Text style={styles.title} allowFontScaling={false} numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: scale(102),
    height: verticalScale(104),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#EFEFF4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
  },
  iconWrap: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#F5F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(6),
  },
  quickIcon: {
    width: scale(22),
    height: scale(22),
  },
  title: {
    fontSize: responsiveFontSize(11),
    fontWeight: '700',
    color: '#1C1C30',
    textAlign: 'center',
    marginTop: verticalScale(2),
  },
});

export default QuickActionCard;

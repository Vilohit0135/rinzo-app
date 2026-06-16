import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import { useLocationStore } from '../../store/locationStore';
import NotificationBadge from '../notifications/NotificationBadge';

interface HeaderSectionProps {
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  onLocationPress?: () => void;
}

const HeaderSection = ({ onNotificationPress, onProfilePress, onLocationPress }: HeaderSectionProps) => {
  const currentAddress = useLocationStore((s) => s.currentAddress);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={onProfilePress}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onNotificationPress}>
          <View style={styles.bellWrap}>
            <Ionicons name="notifications-outline" size={26} color={COLORS.textDark} />
            <NotificationBadge />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting} allowFontScaling={false}>Hey Mira 👋</Text>
      <Text style={styles.title} numberOfLines={2} allowFontScaling={false}>Find laundry near you</Text>

      <TouchableOpacity style={styles.locationRow} activeOpacity={0.7} onPress={onLocationPress}>
        <Ionicons name="location-outline" size={17} color={COLORS.purplelocation} />
        <Text style={styles.locationText} allowFontScaling={false} numberOfLines={1}>
          {currentAddress || 'Select location'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(15),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(20),
  },
  greeting: {
    marginTop: verticalScale(15),
    fontSize: responsiveFontSize(15),
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  title: {
    marginTop: 0,
    fontSize: responsiveFontSize(24),
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: responsiveFontSize(36),
  },
  locationRow: {
    marginTop: verticalScale(1),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  locationText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: COLORS.purpledarks1,
    flex: 1,
  },
  bellWrap: {
    position: 'relative',
  },
});

export default HeaderSection;

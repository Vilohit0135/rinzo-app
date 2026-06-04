import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

interface HeaderSectionProps {
  onNotificationPress?: () => void;
}

const HeaderSection = ({ onNotificationPress }: HeaderSectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={require('../../assets/images/profile.png')}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <TouchableOpacity activeOpacity={0.7} onPress={onNotificationPress}>
          <Ionicons name="notifications-outline" size={21} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Hey Mira 👋</Text>
      <Text style={styles.title}>Find laundry near you</Text>

      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={17} color={COLORS.purplelocation} />
        <Text style={styles.locationText}>Bangalore</Text>
        <Ionicons name="chevron-down" size={20} color={COLORS.purple} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 15,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  title: {
    marginTop: -5,
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 36,
  },
  locationRow: {
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.purpledarks1,
  },
});

export default HeaderSection;

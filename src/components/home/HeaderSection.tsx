import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

const HeaderSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={require('../../assets/images/profile.png')}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={28} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Hey Mira</Text>
      <Text style={styles.title}>Find laundry near you</Text>

      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={22} color={COLORS.purple} />
        <Text style={styles.locationText}>Bangalore</Text>
        <Ionicons name="chevron-down" size={20} color={COLORS.purple} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  greeting: {
    marginTop: 28,
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  title: {
    marginTop: 6,
    fontSize: 42,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 48,
  },
  locationRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.purple,
  },
});

export default HeaderSection;

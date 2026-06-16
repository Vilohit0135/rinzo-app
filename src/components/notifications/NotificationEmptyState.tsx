import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

const NotificationEmptyState = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="notifications-off-outline" size={48} color="#D1D1D6" />
      </View>
      <Text style={styles.title} allowFontScaling={false}>No Notifications Yet</Text>
      <Text style={styles.description} allowFontScaling={false}>
        Updates about your laundry orders,{'\n'}offers, rewards and payments{'\n'}will appear here.
      </Text>
      <TouchableOpacity
        style={styles.cta}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AllServices' as any)}
      >
        <Text style={styles.ctaText} allowFontScaling={false}>Explore Services</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
    minHeight: verticalScale(400),
  },
  iconWrap: {
    width: scale(96),
    height: verticalScale(96),
    borderRadius: scale(48),
    backgroundColor: '#F8F7FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: responsiveFontSize(20),
    fontWeight: '700',
    color: '#1C1C38',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  description: {
    fontSize: responsiveFontSize(14),
    color: '#8D8DAD',
    textAlign: 'center',
    lineHeight: responsiveFontSize(22),
    marginBottom: verticalScale(24),
  },
  cta: {
    paddingHorizontal: scale(28),
    paddingVertical: verticalScale(12),
    borderRadius: scale(24),
    backgroundColor: COLORS.purple,
  },
  ctaText: {
    fontSize: responsiveFontSize(15),
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default NotificationEmptyState;

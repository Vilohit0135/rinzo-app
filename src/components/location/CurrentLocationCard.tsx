import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

interface CurrentLocationCardProps {
  loading: boolean;
  error: string | null;
  onPress: () => void;
}

const CurrentLocationCard = ({ loading, error, onPress }: CurrentLocationCardProps) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress} disabled={loading}>
    <View style={styles.iconWrap}>
      <Ionicons name="locate-outline" size={22} color={COLORS.purple} />
    </View>
    <View style={styles.textCol}>
      <Text style={styles.title} allowFontScaling={false}>Use Current Location</Text>
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.purple} style={styles.spinner} />
      ) : error ? (
        <Text style={styles.error} allowFontScaling={false} numberOfLines={1}>{error}</Text>
      ) : (
        <Text style={styles.subtitle} allowFontScaling={false}>Automatically detect your location</Text>
      )}
    </View>
    <Ionicons name="chevron-forward" size={18} color="#B2B2B2" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(14),
    gap: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#1C1C38',
  },
  subtitle: {
    fontSize: responsiveFontSize(12),
    color: '#8D8DAD',
    marginTop: 2,
  },
  error: {
    fontSize: responsiveFontSize(11),
    color: '#E74C3C',
    marginTop: 2,
  },
  spinner: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
});

export default CurrentLocationCard;

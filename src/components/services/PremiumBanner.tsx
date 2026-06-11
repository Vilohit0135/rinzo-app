import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

const PremiumBanner = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6D46D8', '#8D63E8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText} allowFontScaling={false}>PREMIUM EXPERIENCE</Text>
          </View>
          <Text style={styles.heroTitle} allowFontScaling={false}>Gentle Care,{'\n'}Expert Handling</Text>
          <Text style={styles.heroDesc} allowFontScaling={false}>
            Professional laundry services with premium care for your favorite clothes.
          </Text>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
            <Text style={styles.ctaText} allowFontScaling={false}>Discover More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageWrap}>
          <Image
            source={require('../../../assets/images/service/premium-exp.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(180),
    borderRadius: scale(20),
    overflow: 'hidden',
    marginTop: verticalScale(16),
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1.3,
    paddingLeft: scale(18),
    paddingTop: verticalScale(16),
    paddingRight: scale(4),
    justifyContent: 'space-between',
    paddingBottom: verticalScale(16),
  },
  badge: {
    height: verticalScale(22),
    paddingHorizontal: scale(12),
    borderRadius: scale(11),
    backgroundColor: 'rgba(255,255,255,0.20)',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: responsiveFontSize(10),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: verticalScale(26),
  },
  heroDesc: {
    fontSize: responsiveFontSize(10),
    fontWeight: '500',
    color: 'rgba(255,255,255,0.85)',
    lineHeight: verticalScale(17),
    marginBottom: verticalScale(8), 
  },
  ctaButton: {
    height: verticalScale(34),
    width: scale(130),
    borderRadius: scale(17),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    fontSize: responsiveFontSize(13),
    fontWeight: '700',
    color: '#6D46D8',
  },
  imageWrap: {
    flex: 0.9,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  heroImage: {
    marginBottom: verticalScale(-20),
    marginRight: scale(1),
    width: '110%',
    height: '100%',
  },
});

export default PremiumBanner;

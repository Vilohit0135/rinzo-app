import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

interface ExpertiseCardProps {
  title: string;
  description: string;
  priceLabel: string;
  imageSource: any;
}

const ExpertiseCard = ({ title, description, priceLabel, imageSource }: ExpertiseCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.backgroundImage} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(0,0,0,0.55)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.overlay}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} allowFontScaling={false}>{title}</Text>
        <Text style={styles.description} numberOfLines={2} allowFontScaling={false}>{description}</Text>
        <View style={styles.priceBadge}>
          <Text style={styles.priceText} allowFontScaling={false}>{priceLabel}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: verticalScale(150),
    borderRadius: scale(18),
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: scale(16),
    paddingRight: scale(12),
    paddingBottom: verticalScale(14),
  },
  title: {
    fontSize: responsiveFontSize(17),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  description: {
    fontSize: responsiveFontSize(12),
    fontWeight: '500',
    color: 'rgba(255,255,255,0.90)',
    marginTop: verticalScale(3),
  },
  priceBadge: {
    height: verticalScale(26),
    paddingHorizontal: scale(12),
    borderRadius: scale(13),
    backgroundColor: '#7D57D8',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: verticalScale(8),
  },
  priceText: {
    fontSize: responsiveFontSize(13),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default ExpertiseCard;

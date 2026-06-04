import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { featuredOffer } from '../../data/offers/offersData';

interface FeaturedOfferBannerProps {
  onClaimPress?: () => void;
}

const FeaturedOfferBanner = ({ onClaimPress }: FeaturedOfferBannerProps) => {
  return (
    <LinearGradient
      colors={['#8457DB', '#B194F2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.banner}
    >
      <Text style={styles.title}>{featuredOffer.title}</Text>
      <Text style={styles.subtitle}>{featuredOffer.subtitle}</Text>
      <TouchableOpacity style={styles.couponButton} activeOpacity={0.8} onPress={onClaimPress}>
        <Text style={styles.couponText}>Use code {featuredOffer.couponCode}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  banner: {
    marginTop: 29,
    marginHorizontal: 20,
    height: 150,
    borderRadius: 18,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'poppins',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'poppins',
    fontWeight: '400',
    color: '#FFFFFF',
    marginTop: 5,
  },
  couponButton: {
    marginTop: 10,
    height: 34,
    width: 160,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponText: {
    fontSize: 15,
    fontFamily: 'poppins',
    fontWeight: '500',
    color: '#352178',
  },
});

export default FeaturedOfferBanner;

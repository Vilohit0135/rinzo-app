import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import { featuredOffer } from '../../data/offers/offersData';

interface FeaturedOfferBannerProps {
  onClaimPress?: () => void;
}

const FeaturedOfferBanner = ({ onClaimPress }: FeaturedOfferBannerProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await Clipboard.setStringAsync(featuredOffer.couponCode);
      setCopied(true);

      Toast.show({
        type: 'success',
        text1: 'Copied!',
        text2: `Coupon code "${featuredOffer.couponCode}" copied to clipboard`,
        position: 'bottom',
        visibilityTime: 2000,
      });

      if (onClaimPress) {
        onClaimPress();
      }

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard', error);
    }
  };

  return (
    <LinearGradient
      colors={['#8259D2', '#8259D2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.banner}
    >
      <Text style={styles.title}>{featuredOffer.title}</Text>
      <Text style={styles.subtitle}>{featuredOffer.subtitle}</Text>
      <TouchableOpacity 
        style={[styles.couponButton, copied && styles.couponButtonCopied]} 
        activeOpacity={0.8} 
        onPress={handleCopyCode}
      >
        <Text style={[styles.couponText, copied && styles.couponTextCopied]}>
          {copied ? 'Copied!' : `Use code ${featuredOffer.couponCode}`}
        </Text>
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
  couponButtonCopied: {
    backgroundColor: '#34C759',
  },
  couponText: {
    fontSize: 15,
    fontFamily: 'poppins',
    fontWeight: '500',
    color: '#352178',
  },
  couponTextCopied: {
    color: '#FFFFFF',
  },
});

export default FeaturedOfferBanner;

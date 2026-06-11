import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import { Offer } from '../../data/offers/offersData';

interface OfferCardProps {
  offer: Offer;
  index: number;
}

const OfferCard = ({ offer, index }: OfferCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!offer.couponCode) return;
    try {
      await Clipboard.setStringAsync(offer.couponCode);
      setCopied(true);
      Toast.show({
        type: 'success',
        text1: 'Copied!',
        text2: `Coupon code "${offer.couponCode}" copied to clipboard`,
        position: 'bottom',
        visibilityTime: 2000,
      });
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (e) {
      console.error('Failed to copy code', e);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons name={offer.icon as any} size={22} color="#B497F2" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
        <Text style={styles.validity}>{offer.validTill}</Text>
      </View>
      {offer.couponCode && (
        <TouchableOpacity 
          style={[styles.useCodeButton, copied && styles.useCodeButtonCopied]} 
          activeOpacity={0.7}
          onPress={handleCopy}
        >
          <Text style={[styles.useCodeText, copied && styles.useCodeTextCopied]}>
            {copied ? 'Copied' : 'Use Code'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 108,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9D9D9D',
    lineHeight: 20,
  },
  validity: {
    fontSize: 13,
    fontWeight: '400',
    color: '#9D9D9D',
    marginTop: 4,
  },
  useCodeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#F3EFFF',
    borderWidth: 1,
    borderColor: '#E8E1FF',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 84,
  },
  useCodeButtonCopied: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  useCodeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4D2CA3',
  },
  useCodeTextCopied: {
    color: '#FFFFFF',
  },
});

export default OfferCard;

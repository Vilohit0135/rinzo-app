import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import { COLORS } from '../../constants/colors';

interface LaundryNearbyCardProps {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  locationArea?: string;
  price: string;
  tags: string[];
  imageSource?: any;
  onPress?: () => void;
}

const tagIcons: Record<string, string> = {
  'Pickup Available': 'cube-outline',
  'Express Service': 'flash-outline',
  'Eco-Friendly': 'leaf-outline',
  'Steam Press': 'water-outline',
  '24/7 Open': 'time-outline',
  'Expert Ironing': 'shirt-outline',
  'Fast Service': 'flash-outline',
  'Express': 'flash-outline',
  'Eco Friendly': 'leaf-outline',
  'Dry Clean': 'water-outline',
  'Free Pickup': 'cube-outline',
  'Budget': 'wallet-outline',
};

// Return if tag should have purple styling (active) or grey/neutral styling
const isPurpleTag = (tag: string): boolean => {
  const t = tag.toLowerCase();
  return (
    t.includes('pickup') ||
    t.includes('eco') ||
    t.includes('24/7') ||
    t.includes('open')
  );
};

const LaundryNearbyCard = ({
  id,
  name,
  rating,
  distance,
  locationArea,
  price,
  tags,
  imageSource,
  onPress,
}: LaundryNearbyCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource || require('../../../assets/images/placeholder-icon.png')}
          style={styles.image}
        />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={11} color="#FFC107" />
          <Text style={styles.ratingText} allowFontScaling={false}>
            {rating.toFixed(1)}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1} allowFontScaling={false}>
            {name}
          </Text>
          <Text style={styles.price} allowFontScaling={false}>
            {price}
          </Text>
        </View>

        <View style={styles.subRow}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={12} color="#8259D2" style={styles.pinIcon} />
            <Text style={styles.locationText} numberOfLines={1} allowFontScaling={false}>
              {distance} {locationArea ? `• ${locationArea}` : ''}
            </Text>
          </View>
          <Text style={styles.startsFromText} allowFontScaling={false}>
            STARTS FROM
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          {tags.map((tag, idx) => {
            const purple = isPurpleTag(tag);
            const iconName = tagIcons[tag] || 'pricetag-outline';
            return (
              <View
                key={idx}
                style={[
                  styles.tag,
                  purple ? styles.purpleTag : styles.greyTag,
                ]}
              >
                <Ionicons
                  name={iconName as any}
                  size={11}
                  color={purple ? '#8259D2' : '#8D8DAD'}
                />
                <Text
                  style={[
                    styles.tagText,
                    purple ? styles.purpleTagText : styles.greyTagText,
                  ]}
                  allowFontScaling={false}
                  numberOfLines={1}
                >
                  {tag}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: verticalScale(155),
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    height: 24,
    paddingHorizontal: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  ratingText: {
    fontSize: responsiveFontSize(11),
    fontWeight: '700',
    color: '#1C1C38',
  },
  infoContainer: {
    padding: scale(14),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#1C1C38',
    flex: 1,
    marginRight: scale(10),
  },
  price: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#8259D2',
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: scale(10),
  },
  pinIcon: {
    marginRight: scale(3),
  },
  locationText: {
    fontSize: responsiveFontSize(11.5),
    color: '#8D8DAD',
    fontWeight: '500',
  },
  startsFromText: {
    fontSize: responsiveFontSize(9),
    color: '#8D8DAD',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(6),
    marginTop: verticalScale(10),
  },
  tag: {
    height: 22,
    borderRadius: moderateScale(11),
    paddingHorizontal: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
  },
  purpleTag: {
    backgroundColor: '#EFE9FF',
  },
  greyTag: {
    backgroundColor: '#F1F1F4',
  },
  tagText: {
    fontSize: responsiveFontSize(10.5),
    fontWeight: '600',
  },
  purpleTagText: {
    color: '#8259D2',
  },
  greyTagText: {
    color: '#4F4F6A',
  },
});

export default LaundryNearbyCard;

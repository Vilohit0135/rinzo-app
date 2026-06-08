import { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface HeaderSectionProps {
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

const cities = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
];

const HeaderSection = ({ onNotificationPress, onProfilePress }: HeaderSectionProps) => {
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={onProfilePress}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onNotificationPress}>
          <Ionicons name="notifications-outline" size={26} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting} allowFontScaling={false}>Hey Mira 👋</Text>
      <Text style={styles.title} numberOfLines={2} allowFontScaling={false}>Find laundry near you</Text>

      <TouchableOpacity style={styles.locationRow} activeOpacity={0.7} onPress={() => setShowDropdown(true)}>
        <Ionicons name="location-outline" size={17} color={COLORS.purplelocation} />
        <Text style={styles.locationText} allowFontScaling={false} numberOfLines={1}>{selectedCity}</Text>
        <Ionicons name="chevron-down" size={20} color={COLORS.purple} />
      </TouchableOpacity>

      <Modal visible={showDropdown} transparent animationType="fade" onRequestClose={() => setShowDropdown(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowDropdown(false)}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle} allowFontScaling={false}>Select City</Text>
            <FlatList
              data={cities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.cityOption, item === selectedCity && styles.cityOptionActive]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedCity(item);
                    setShowDropdown(false);
                  }}
                >
                  <Ionicons
                    name={item === selectedCity ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={item === selectedCity ? COLORS.purple : '#999'}
                  />
                  <Text style={[styles.cityText, item === selectedCity && styles.cityTextActive]} allowFontScaling={false} numberOfLines={1}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(15),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(20),
  },
  greeting: {
    marginTop: verticalScale(15),
    fontSize: responsiveFontSize(15),
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  title: {
    marginTop: 0,
    fontSize: responsiveFontSize(24),
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: responsiveFontSize(36),
  },
  locationRow: {
    marginTop: verticalScale(1),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  locationText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: COLORS.purpledarks1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: '80%',
    maxHeight: verticalScale(420),
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(16),
  },
  dropdownTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1E1E2D',
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },
  cityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(8),
    borderRadius: moderateScale(12),
  },
  cityOptionActive: {
    backgroundColor: '#F3EEFF',
  },
  cityText: {
    fontSize: responsiveFontSize(16),
    color: '#333',
  },
  cityTextActive: {
    color: COLORS.purple,
    fontWeight: '600',
  },
});

export default HeaderSection;

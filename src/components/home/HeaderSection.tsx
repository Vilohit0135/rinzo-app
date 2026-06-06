import { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';

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

      <Text style={styles.greeting}>Hey Mira 👋</Text>
      <Text style={styles.title}>Find laundry near you</Text>

      <TouchableOpacity style={styles.locationRow} activeOpacity={0.7} onPress={() => setShowDropdown(true)}>
        <Ionicons name="location-outline" size={17} color={COLORS.purplelocation} />
        <Text style={styles.locationText}>{selectedCity}</Text>
        <Ionicons name="chevron-down" size={20} color={COLORS.purple} />
      </TouchableOpacity>

      <Modal visible={showDropdown} transparent animationType="fade" onRequestClose={() => setShowDropdown(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowDropdown(false)}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>Select City</Text>
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
                  <Text style={[styles.cityText, item === selectedCity && styles.cityTextActive]}>
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
    paddingHorizontal: 18,
    paddingTop: 15,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  title: {
    marginTop: 0,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 36,
  },
  locationRow: {
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
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
    maxHeight: 420,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E2D',
    marginBottom: 16,
    textAlign: 'center',
  },
  cityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  cityOptionActive: {
    backgroundColor: '#F3EEFF',
  },
  cityText: {
    fontSize: 16,
    color: '#333',
  },
  cityTextActive: {
    color: COLORS.purple,
    fontWeight: '600',
  },
});

export default HeaderSection;

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import { useAddressStore, type AddressItem } from '../../store/addressStore';

interface SavedAddressListProps {
  onSelect: (address: AddressItem) => void;
  onAddNew: () => void;
}

const typeIcon: Record<string, string> = {
  Home: 'home-outline',
  Work: 'briefcase-outline',
  Other: 'ellipse-outline',
};

const SavedAddressList = ({ onSelect, onAddNew }: SavedAddressListProps) => {
  const addresses = useAddressStore((s) => s.addresses);

  return (
    <View>
      <Text style={styles.sectionTitle} allowFontScaling={false}>Saved Addresses</Text>
      <View style={styles.divider} />

      {addresses.map((addr, index) => {
        const type = addr.title.includes('Home') ? 'Home' : addr.title.includes('Work') ? 'Work' : 'Other';
        return (
          <TouchableOpacity
            key={index}
            style={styles.addressRow}
            activeOpacity={0.7}
            onPress={() => onSelect(addr)}
          >
            <View style={styles.iconWrap}>
              <Ionicons name={typeIcon[type] as any || 'ellipse-outline'} size={20} color={COLORS.purple} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.addressTitle} allowFontScaling={false} numberOfLines={1}>{addr.title}</Text>
              <Text style={styles.addressDetail} allowFontScaling={false} numberOfLines={1}>
                {addr.address1}, {addr.address2}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#B2B2B2" />
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.addNewRow} activeOpacity={0.7} onPress={onAddNew}>
        <View style={styles.addIconWrap}>
          <Ionicons name="add" size={22} color={COLORS.purple} />
        </View>
        <Text style={styles.addNewText} allowFontScaling={false}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#1C1C38',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: verticalScale(12),
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCol: {
    flex: 1,
  },
  addressTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#1C1C38',
  },
  addressDetail: {
    fontSize: responsiveFontSize(12),
    color: '#8D8DAD',
    marginTop: 2,
  },
  addNewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginTop: 4,
  },
  addIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.purple,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: COLORS.purple,
  },
});

export default SavedAddressList;

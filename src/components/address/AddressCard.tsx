import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AddressCardProps {
  title: string;
  address1: string;
  address2: string;
  contact: string;
  isDefault?: boolean;
  onEdit?: () => void;
}

const AddressCard = ({ title, address1, address2, contact, isDefault, onEdit }: AddressCardProps) => {
  return (
    <View style={[styles.card, isDefault && styles.cardDefault]}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.addressText}>{address1}</Text>
        <Text style={styles.addressText}>{address2}</Text>
        <Text style={styles.addressText}>{contact}</Text>
      </View>
      <TouchableOpacity style={styles.editBtn} onPress={onEdit} activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons name="create-outline" size={22} color="#4B238D" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 0,
  },
  cardDefault: {
    borderWidth: 2,
    borderColor: '#C9B4F8',
    shadowColor: '#A07AF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6,
  },
  addressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9E9E9E',
    lineHeight: 20,
  },
  editBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});

export default AddressCard;

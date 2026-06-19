import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface PickupDetailsCardProps {
  address: string;
  pickupTime: string;
  onAddressPress?: () => void;
  onTimePress?: () => void;
}

const PickupDetailsCard = ({ address, pickupTime, onAddressPress, onTimePress }: PickupDetailsCardProps) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.row} 
        activeOpacity={0.7} 
        onPress={onAddressPress}
      >
        <Text style={styles.address}>{address}</Text>
        <Ionicons name="create-outline" size={16} color="#8D8DAD" />
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity 
        style={styles.row} 
        activeOpacity={0.7} 
        onPress={onTimePress}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Pickup Time</Text>
          <Text style={styles.time}>{pickupTime}</Text>
        </View>
        <Ionicons name="create-outline" size={16} color="#8D8DAD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(18),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
  },
  address: {
    fontSize: responsiveFontSize(13),
    fontWeight: '500',
    color: '#1E1E2D',
    flex: 1,
    marginRight: scale(8),
  },
  divider: {
    height: verticalScale(1),
    backgroundColor: '#ECECEC',
  },
  label: {
    fontSize: responsiveFontSize(11),
    color: '#8D8DAD',
    marginBottom: verticalScale(2),
  },
  time: {
    fontSize: responsiveFontSize(13),
    fontWeight: '500',
    color: '#1E1E2D',
  },
});

export default PickupDetailsCard;

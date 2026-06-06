import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface OrdersHeaderProps {
  onBackPress?: () => void;
}

const OrdersHeader = ({ onBackPress }: OrdersHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} activeOpacity={0.8} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={18} color="#8C8C8C" />
      </TouchableOpacity>
      <Text style={styles.title}>My Orders</Text>
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#111111',
    textAlign: 'center',
  },
  spacer: {
    width: 36,
  },
});

export default OrdersHeader;

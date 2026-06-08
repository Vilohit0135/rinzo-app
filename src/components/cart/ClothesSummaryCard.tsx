import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface ClothesItem {
  name: string;
  quantity: number;
}

interface ClothesSummaryCardProps {
  items: ClothesItem[];
  onUpdateQuantity: (name: string, newQuantity: number) => void;
}

const ClothesSummaryCard = ({ items, onUpdateQuantity }: ClothesSummaryCardProps) => {
  return (
    <View style={styles.card}>
      {items.map((item) => (
        <View key={item.name} style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => onUpdateQuantity(item.name, item.quantity - 1)}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Ionicons name="remove" size={14} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => onUpdateQuantity(item.name, item.quantity + 1)}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Ionicons name="add" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(18),
    paddingHorizontal: scale(12),
  },
  row: {
    height: verticalScale(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#1E1E2D',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  button: {
    width: scale(26),
    height: verticalScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: '#D7D7D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: '#1E1E2D',
    minWidth: scale(18),
    textAlign: 'center',
  },
});

export default ClothesSummaryCard;

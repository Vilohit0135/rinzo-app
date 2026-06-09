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
          <View style={styles.counterPill}>
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.name, item.quantity - 1)}
              activeOpacity={0.7}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <View style={[styles.counterBtn, item.quantity === 0 && styles.counterBtnDisabled]}>
                <Ionicons name="remove" size={12} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.name, item.quantity + 1)}
              activeOpacity={0.7}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <View style={styles.counterBtn}>
                <Ionicons name="add" size={12} color="#FFFFFF" />
              </View>
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
  counterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: moderateScale(14),
    width: scale(75),
    height: scale(22),
    gap: scale(9),
  },
  counterBtn: {
    width: scale(15),
    height: scale(15),
    borderRadius: moderateScale(12),
    backgroundColor: '#504f4f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnDisabled: {
    backgroundColor: '#D0D0D0',
  },
  counterValue: {
    fontSize: responsiveFontSize(11),
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
});

export default ClothesSummaryCard;

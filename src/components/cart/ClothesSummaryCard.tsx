import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface ClothesItem {
  name: string;
  quantity: number;
}

interface ClothesSummaryCardProps {
  items: ClothesItem[];
}

const ClothesSummaryCard = ({ items }: ClothesSummaryCardProps) => {
  return (
    <View style={styles.card}>
      {items.map((item) => (
        <View key={item.name} style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
              <Ionicons name="remove" size={14} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
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
    borderRadius: 18,
    paddingHorizontal: 12,
  },
  row: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E2D',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#D7D7D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E2D',
    minWidth: 18,
    textAlign: 'center',
  },
});

export default ClothesSummaryCard;

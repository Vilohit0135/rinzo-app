import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import type { LegalMenuItem } from '../../data/legal/legalData';

interface LegalMenuCardProps {
  item: LegalMenuItem;
  onPress?: () => void;
}

const LegalMenuCard = ({ item, onPress }: LegalMenuCardProps) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.iconArea}>
        <Ionicons name={item.icon as any} size={20} color="#8259D2" />
      </View>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={16} color="#999999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 54,
    top: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconArea: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
});

export default LegalMenuCard;

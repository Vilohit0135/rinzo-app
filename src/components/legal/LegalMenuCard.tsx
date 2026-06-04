import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { LegalMenuItem } from '../../data/legal/legalData';

interface LegalMenuCardProps {
  item: LegalMenuItem;
}

const LegalMenuCard = ({ item }: LegalMenuCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconArea}>
        <Ionicons name={item.icon} size={20} color="#8259D2" />
      </View>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={16} color="#999999" />
    </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
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

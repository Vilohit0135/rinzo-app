import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import type { SupportOption } from '../../data/support/contactSupportData';

interface SupportOptionCardProps {
  option: SupportOption;
}

const SupportOptionCard = ({ option }: SupportOptionCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={option.icon as any} size={24} color="#8259D2" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{option.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{option.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#8259D2" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 63,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    top: 4,
  },
  iconContainer: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#9A9A9A',
  },
});

export default SupportOptionCard;

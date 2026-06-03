import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

interface MenuItemProps {
  icon: string;
  title: string;
  isLast?: boolean;
}

const MenuItem = ({ icon, title, isLast }: MenuItemProps) => {
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons name={icon} size={18} color={COLORS.purple} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#8B5CF6" />
      </View>
      {!isLast && <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 48,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E1E2D',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1F1',
    marginLeft: 44,
  },
});

export default MenuItem;

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SupportMenu } from '../../data/support/helpSupportData';

interface SupportMenuItemProps {
  item: SupportMenu;
  isLast: boolean;
  onPress: () => void;
}

const SupportMenuItem = ({ item, isLast, onPress }: SupportMenuItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={22} color="#8259D2" />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={18} color="#8259D2" />
      </View>
      {!isLast && <View style={styles.divider} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginLeft: 12,
    marginRight: 12,
  },
});

export default SupportMenuItem;

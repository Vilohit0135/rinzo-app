import { StyleSheet, Text, View } from 'react-native';
import MenuItem from './MenuItem';

interface MenuItemData {
  icon: string;
  title: string;
  onPress?: () => void;
}

interface MenuSectionProps {
  heading: string;
  items: MenuItemData[];
}

const MenuSection = ({ heading, items }: MenuSectionProps) => {
  return (
    <View>
      <Text style={styles.heading}>{heading}</Text>
      <View style={styles.card}>
        {items.map((item, index) => (
          <MenuItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            isLast={index === items.length - 1}
            onPress={item.onPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#22223D',
    marginTop: 18,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});

export default MenuSection;

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OrderFilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = ['All', 'Ongoing', 'Completed', 'Cancelled'];

const OrderFilterTabs = ({ activeFilter, onFilterChange }: OrderFilterTabsProps) => {
  return (
    <View style={styles.row}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          activeOpacity={0.8}
          style={[styles.tab, activeFilter === filter && styles.activeTab]}
          onPress={() => onFilterChange(filter)}
        >
          <Text style={[styles.tabText, activeFilter === filter && styles.activeTabText]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    marginLeft: 18,
    marginRight: 18,
  },
  tab: {
    height: 36,
    paddingHorizontal: 20,
    borderRadius: 18,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#8259D2',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});

export default OrderFilterTabs;

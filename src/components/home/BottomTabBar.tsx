import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';

interface BottomTabBarProps {
  activeTab?: 'Home' | 'Search' | 'Orders' | 'Profile';
  onTabPress?: (tab: string) => void;
}

const tabs = [
  { name: 'Home' as const, icon: 'home-outline' },
  { name: 'Search' as const, icon: 'search-outline' },
  { name: 'Orders' as const, icon: 'bag-handle-outline' },
  { name: 'Profile' as const, icon: 'person-outline' },
];

const BottomTabBar = ({ activeTab = 'Home', onTabPress }: BottomTabBarProps) => {
  return (
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {tabs.map((tab) =>
        tab.name === activeTab ? (
          <TouchableOpacity key={tab.name} style={styles.activeTab} activeOpacity={0.8} onPress={() => onTabPress?.(tab.name)}>
            <Ionicons name={tab.icon as any} size={18} color={COLORS.purple} />
            <Text style={styles.activeText}>{tab.name}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity key={tab.name} style={styles.inactiveTab} activeOpacity={0.8} onPress={() => onTabPress?.(tab.name)}>
            <Ionicons name={tab.icon as any} size={20} color={COLORS.white} />
          </TouchableOpacity>
        )
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 18,
    right: 18,
    height: 66,
    borderRadius: 33,
    paddingHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.14,
    shadowRadius: 17,
    elevation: 6,
  },
  activeTab: {
    width: 105,
    height: 45,
    borderRadius: 23,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  activeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.purple,
  },
  inactiveTab: {
    width: 36,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabBar;

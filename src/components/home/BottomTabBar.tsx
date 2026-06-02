import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

const BottomTabBar = () => {
  return (
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.activeTab}>
        <Ionicons name="home-outline" size={24} color={COLORS.purple} />
        <Text style={styles.activeText}>Home</Text>
      </View>
      <View style={styles.inactiveTab}>
        <Ionicons name="search-outline" size={26} color={COLORS.white} />
      </View>
      <View style={styles.inactiveTab}>
        <Ionicons name="bag-handle-outline" size={26} color={COLORS.white} />
      </View>
      <View style={styles.inactiveTab}>
        <Ionicons name="person-outline" size={26} color={COLORS.white} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    height: 88,
    borderRadius: 44,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.14,
    shadowRadius: 22,
    elevation: 8,
  },
  activeTab: {
    width: 140,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  activeText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.purple,
  },
  inactiveTab: {
    width: 48,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabBar;

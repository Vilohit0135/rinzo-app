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
        <Ionicons name="home-outline" size={18} color={COLORS.purple} />
        <Text style={styles.activeText}>Home</Text>
      </View>
      <View style={styles.inactiveTab}>
        <Ionicons name="search-outline" size={20} color={COLORS.white} />
      </View>
      <View style={styles.inactiveTab}>
        <Ionicons name="bag-handle-outline" size={20} color={COLORS.white} />
      </View>
      <View style={styles.inactiveTab}>
        <Ionicons name="person-outline" size={20} color={COLORS.white} />
      </View>
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

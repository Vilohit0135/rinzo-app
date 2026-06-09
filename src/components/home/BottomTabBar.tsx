import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import { useTabBar } from '../../utils/TabBarContext';

interface BottomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const tabConfig: Record<string, { icon: string; label: string }> = {
  HomeTab: { icon: 'home-outline', label: 'Home' },
  SearchTab: { icon: 'search-outline', label: 'Search' },
  OrdersTab: { icon: 'bag-handle-outline', label: 'Orders' },
  ProfileTab: { icon: 'person-outline', label: 'Profile' },
};

const BottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { isTabBarVisible } = useTabBar();

  if (!isTabBarVisible) return null;

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const config = tabConfig[route.name] || { icon: 'ellipse-outline', label: route.name };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              if (route.name === 'OrdersTab') {
                navigation.navigate('OrdersTab', { screen: 'YourCart' });
              } else {
                navigation.navigate(route.name);
              }
            }
          };

          return isFocused ? (
            <TouchableOpacity key={route.name} style={styles.activeTab} activeOpacity={0.8} onPress={onPress}>
              <Ionicons name={config.icon as any} size={18} color={COLORS.purple} />
              <Text style={styles.activeText} allowFontScaling={false} numberOfLines={1}>{config.label}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={route.name} style={styles.inactiveTab} activeOpacity={0.8} onPress={onPress}>
              <Ionicons name={config.icon as any} size={20} color={COLORS.white} />
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: scale(18),
    right: scale(18),
    bottom: verticalScale(24),
  },
  container: {
    height: verticalScale(66),
    borderRadius: moderateScale(33),
    paddingHorizontal: scale(11),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(8),
    },
    shadowOpacity: 0.14,
    shadowRadius: 17,
    elevation: 6,
  },
  activeTab: {
    width: scale(105),
    height: verticalScale(45),
    borderRadius: moderateScale(23),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
  },
  activeText: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: COLORS.purple,
  },
  inactiveTab: {
    width: scale(36),
    height: verticalScale(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabBar;

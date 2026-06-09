import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const TAB_COUNT = 4;

const BottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { isTabBarVisible } = useTabBar();
  const [containerWidth, setContainerWidth] = useState(0);
  const sliderAnim = useRef(new Animated.Value(0)).current;

  const padding = scale(15);
  const tabWidth = containerWidth > 0 ? (containerWidth - padding * 2) / TAB_COUNT : 0;
  const pillWidth = tabWidth;

  useEffect(() => {
    if (containerWidth > 0) {
      Animated.timing(sliderAnim, {
        toValue: tabWidth * state.index,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [state.index, containerWidth, tabWidth, sliderAnim]);

  if (!isTabBarVisible) return null;

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <View style={styles.trackLine} pointerEvents="none" />

        {containerWidth > 0 && (
          <Animated.View
            style={[
              styles.slidingPill,
              {
                width: pillWidth,
                left: padding,
                transform: [{ translateX: sliderAnim }],
              },
            ]}
          />
        )}

        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const config = tabConfig[route.name] || { icon: 'ellipse-outline', label: route.name };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!event.defaultPrevented) {
              if (route.name === 'OrdersTab') {
                navigation.navigate('OrdersTab', { screen: 'YourCart' });
              } else if (!isFocused) {
                navigation.navigate(route.name);
              }
            }
          };

          return (
            <TouchableOpacity key={route.name} style={styles.tab} activeOpacity={0.8} onPress={onPress}>
              <Ionicons
                name={config.icon as any}
                size={isFocused ? 18 : 20}
                color={isFocused ? COLORS.purple : COLORS.white}
              />
              {isFocused && (
                <Text style={styles.activeText} allowFontScaling={false} numberOfLines={1}>
                  {config.label}
                </Text>
              )}
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
    left: scale(12),
    right: scale(12),
    bottom: verticalScale(24),
  },
  container: {
    height: verticalScale(66),
    borderRadius: moderateScale(33),
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: verticalScale(8),
    },
    shadowOpacity: 0.14,
    shadowRadius: 17,
    elevation: 6,
  },
  trackLine: {
    position: 'absolute',
    top: verticalScale(10),
    left: scale(16),
    right: scale(16),
    height: verticalScale(2),
    borderRadius: moderateScale(1),
  },
  slidingPill: {
    position: 'absolute',
    top: verticalScale(11),
    height: verticalScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: COLORS.white,
  },
  tab: {
    flex: 1,
    height: verticalScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: scale(6),
    zIndex: 1,
  },
  activeText: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: COLORS.purple,
  },
});

export default BottomTabBar;

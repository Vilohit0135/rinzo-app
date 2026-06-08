import { useCallback, useRef, type ReactNode } from 'react';
import { ScrollView, type ScrollViewProps, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBar } from '../../utils/TabBarContext';
import { verticalScale } from '../../utils/responsive';

interface ScrollableScreenProps extends ScrollViewProps {
  children: ReactNode;
}

const SCROLL_THRESHOLD = 5;
const TAB_BAR_PADDING = verticalScale(66) + verticalScale(24) + 20;

const ScrollableScreen = ({ children, contentContainerStyle, onScroll, ...rest }: ScrollableScreenProps) => {
  const { setTabBarVisible } = useTabBar();
  const lastOffset = useRef(0);

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(true);
    }, [setTabBarVisible])
  );

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = e.nativeEvent.contentOffset.y;
      const diff = currentOffset - lastOffset.current;

      if (Math.abs(diff) > SCROLL_THRESHOLD) {
        if (diff > 0 && currentOffset > 0) {
          setTabBarVisible(false);
        } else if (diff < 0) {
          setTabBarVisible(true);
        }
      }

      lastOffset.current = currentOffset;
      onScroll?.(e);
    },
    [onScroll, setTabBarVisible]
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={[
        contentContainerStyle,
        { paddingBottom: TAB_BAR_PADDING },
      ]}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollableScreen;

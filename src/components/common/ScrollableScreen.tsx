import { useCallback, type ReactNode } from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTabBar } from '../../utils/TabBarContext';
import { verticalScale } from '../../utils/responsive';

interface ScrollableScreenProps extends ScrollViewProps {
  children: ReactNode;
}

const TAB_BAR_PADDING = verticalScale(66) + verticalScale(24) + 20;

const ScrollableScreen = ({ children, contentContainerStyle, ...rest }: ScrollableScreenProps) => {
  const { setTabBarVisible } = useTabBar();

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(true);
    }, [setTabBarVisible])
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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

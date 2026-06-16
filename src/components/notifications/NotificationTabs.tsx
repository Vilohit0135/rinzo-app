import { useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNotificationStore } from '../../store/notificationStore';
import { NOTIFICATION_TABS } from '../../constants/notification.constants';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import type { NotificationTab } from '../../types/notification.types';

interface NotificationTabsProps {
  onTabChange?: (tab: NotificationTab) => void;
}

const NotificationTabs = ({ onTabChange }: NotificationTabsProps) => {
  const activeTab = useNotificationStore((s) => s.activeTab);
  const setActiveTab = useNotificationStore((s) => s.setActiveTab);
  const notifications = useNotificationStore((s) => s.notifications);
  const scrollRef = useRef<ScrollView>(null);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: notifications.length };
    NOTIFICATION_TABS.forEach((tab) => {
      if (tab.key === 'all') return;
      const count = tab.categories.length > 0
        ? notifications.filter((n) => tab.categories.includes(n.category)).length
        : 0;
      counts[tab.key] = count;
    });
    return counts;
  }, [notifications]);

  const handleTabPress = (tabKey: NotificationTab) => {
    setActiveTab(tabKey);
    onTabChange?.(tabKey);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {NOTIFICATION_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = tabCounts[tab.key] ?? 0;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, isActive && styles.activeTab]}
              activeOpacity={0.7}
              onPress={() => handleTabPress(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={[styles.tabLabel, isActive && styles.activeTabLabel]}
                allowFontScaling={false}
              >
                {tab.label}
              </Text>
              {count > 0 && (
                <View style={[styles.countBadge, isActive && styles.activeCountBadge]}>
                  <Text
                    style={[styles.countText, isActive && styles.activeCountText]}
                    allowFontScaling={false}
                  >
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(8),
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    gap: scale(8),
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    gap: scale(6),
  },
  activeTab: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.purple,
  },
  tabLabel: {
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: '#1C1C38',
  },
  activeTabLabel: {
    color: COLORS.white,
  },
  countBadge: {
    minWidth: scale(20),
    height: verticalScale(20),
    borderRadius: scale(10),
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(5),
  },
  activeCountBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  countText: {
    fontSize: responsiveFontSize(11),
    fontWeight: '700',
    color: COLORS.purple,
  },
  activeCountText: {
    color: COLORS.white,
  },
});

export default NotificationTabs;

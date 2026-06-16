import { useEffect, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import { useNotificationStore } from '../../store/notificationStore';
import { NOTIFICATION_TABS } from '../../constants/notification.constants';
import { initializeNotifications, simulatePushNotification } from '../../services/notification.service';
import type { RootStackParamList } from '../../types/navigation';
import type { NotificationItem, NotificationTab } from '../../types/notification.types';
import NotificationCard from '../../components/notifications/NotificationCard';
import NotificationTabs from '../../components/notifications/NotificationTabs';
import NotificationEmptyState from '../../components/notifications/NotificationEmptyState';

const NotificationsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const notifications = useNotificationStore((s) => s.notifications);
  const activeTab = useNotificationStore((s) => s.activeTab);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const clearRead = useNotificationStore((s) => s.clearRead);

  useEffect(() => {
    initializeNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') return notifications;
    const tabDef = NOTIFICATION_TABS.find((t) => t.key === activeTab);
    if (!tabDef) return notifications;
    return notifications.filter((n) => tabDef.categories.includes(n.category));
  }, [notifications, activeTab]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const hasReadNotifications = useMemo(
    () => filteredNotifications.some((n) => n.isRead),
    [filteredNotifications]
  );

  const handleRefresh = useCallback(() => {
    simulatePushNotification();
  }, []);

  const handleNotificationPress = useCallback(
    (item: NotificationItem) => {
      (navigation as any).navigate('NotificationDetails', { notificationId: item.id });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: NotificationItem }) => (
      <NotificationCard item={item} onPress={handleNotificationPress} />
    ),
    [handleNotificationPress]
  );

  const keyExtractor = useCallback((item: NotificationItem) => item.id, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={20} color="#1C1C38" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} allowFontScaling={false}>Notifications</Text>
        </View>
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <TouchableOpacity activeOpacity={0.7} onPress={markAllRead} style={styles.headerAction}>
              <Text style={styles.headerActionText} allowFontScaling={false}>Mark All Read</Text>
            </TouchableOpacity>
          )}
          {hasReadNotifications && (
            <TouchableOpacity activeOpacity={0.7} onPress={clearRead} style={styles.headerAction}>
              <Ionicons name="trash-outline" size={18} color={COLORS.purple} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <NotificationTabs />

      {filteredNotifications.length === 0 ? (
        <NotificationEmptyState />
      ) : (
        <FlatList
          data={filteredNotifications}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={15}
          windowSize={10}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(10),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  backButton: {
    width: scale(36),
    height: verticalScale(36),
    borderRadius: scale(18),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: '700',
    color: '#1C1C38',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  headerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  headerActionText: {
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: COLORS.purple,
  },
  list: {
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(180),
    gap: verticalScale(6),
  },
});

export default NotificationsScreen;

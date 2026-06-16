import { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';
import { useNotificationStore } from '../../store/notificationStore';
import { CATEGORY_ICON_MAP, CATEGORY_COLOR_MAP, CTA_LABEL_MAP } from '../../constants/notification.constants';
import type { RootStackParamList } from '../../types/navigation';
import { NotificationAction } from '../../types/notification.types';

type NotificationDetailsRouteProp = RouteProp<RootStackParamList, 'NotificationDetails'>;

function formatFullDate(isoDate: string): string {
  const d = new Date(isoDate);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} at ${h12}:${minutes} ${ampm}`;
}

const NotificationDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<NotificationDetailsRouteProp>();
  const { notificationId } = route.params;

  const notifications = useNotificationStore((s) => s.notifications);
  const markRead = useNotificationStore((s) => s.markRead);

  const item = useMemo(
    () => notifications.find((n) => n.id === notificationId),
    [notifications, notificationId]
  );

  useEffect(() => {
    if (item && !item.isRead) {
      markRead(item.id);
    }
  }, [item, markRead]);

  if (!item) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <View style={styles.notFound}>
          <Ionicons name="alert-circle-outline" size={48} color="#D1D1D6" />
          <Text style={styles.notFoundText} allowFontScaling={false}>Notification not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const iconName = CATEGORY_ICON_MAP[item.category] || 'notifications-outline';
  const iconColor = CATEGORY_COLOR_MAP[item.category] || COLORS.purple;
  const ctaLabel = item.actionType ? CTA_LABEL_MAP[item.actionType] : null;

  const handleAction = () => {
    switch (item.actionType) {
      case NotificationAction.TRACK_ORDER:
        (navigation as any).navigate('OrderTracking');
        break;
      case NotificationAction.VIEW_ORDER:
        (navigation as any).navigate('MyOrders');
        break;
      case NotificationAction.VIEW_PAYMENT:
        (navigation as any).navigate('PaymentMethods');
        break;
      case NotificationAction.CLAIM_OFFER:
        (navigation as any).navigate('Offers');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="#1C1C38" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>Notification</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.iconWrap, { backgroundColor: `${iconColor}15` }]}>
          <Ionicons name={iconName as any} size={40} color={iconColor} />
        </View>

        <Text style={styles.title} allowFontScaling={false}>{item.title}</Text>
        <Text style={styles.timestamp} allowFontScaling={false}>{formatFullDate(item.createdAt)}</Text>
        <View style={styles.divider} />
        <Text style={styles.message} allowFontScaling={false}>{item.message}</Text>

        {ctaLabel && (
          <TouchableOpacity style={styles.cta} activeOpacity={0.7} onPress={handleAction}>
            <Text style={styles.ctaText} allowFontScaling={false}>{ctaLabel}</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </ScrollView>
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
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1C1C38',
  },
  headerSpacer: {
    width: scale(36),
  },
  scrollContent: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(60),
    alignItems: 'center',
  },
  iconWrap: {
    width: scale(80),
    height: verticalScale(80),
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: responsiveFontSize(22),
    fontWeight: '700',
    color: '#1C1C38',
    textAlign: 'center',
    marginBottom: verticalScale(6),
  },
  timestamp: {
    fontSize: responsiveFontSize(13),
    color: '#A5A5A5',
    textAlign: 'center',
    marginBottom: verticalScale(16),
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: verticalScale(16),
  },
  message: {
    fontSize: responsiveFontSize(15),
    color: '#4A4A6A',
    textAlign: 'center',
    lineHeight: responsiveFontSize(24),
    marginBottom: verticalScale(28),
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    paddingHorizontal: scale(32),
    paddingVertical: verticalScale(14),
    borderRadius: scale(24),
    backgroundColor: COLORS.purple,
  },
  ctaText: {
    fontSize: responsiveFontSize(15),
    fontWeight: '600',
    color: COLORS.white,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(12),
  },
  notFoundText: {
    fontSize: responsiveFontSize(16),
    color: '#8D8DAD',
  },
});

export default NotificationDetailsScreen;

import { useRef, useCallback } from 'react';
import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { type NotificationItem, NotificationAction, NotificationCategory } from '../../types/notification.types';
import { CATEGORY_ICON_MAP, CATEGORY_COLOR_MAP, CTA_LABEL_MAP } from '../../constants/notification.constants';
import { COLORS } from '../../constants/colors';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { useNotificationStore } from '../../store/notificationStore';

interface NotificationCardProps {
  item: NotificationItem;
  onMarkRead?: (id: string) => void;
  onMarkUnread?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPress?: (item: NotificationItem) => void;
}

function formatRelativeTime(isoDate: string): string {
  const now = Date.now();
  const date = new Date(isoDate).getTime();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins === 1) return '1 min ago';
  if (diffMins < 60) return `${diffMins} mins ago`;
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  const d = new Date(isoDate);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getActionRoute(action?: NotificationAction): keyof RootStackParamList | null {
  switch (action) {
    case NotificationAction.TRACK_ORDER:
      return 'OrderTracking' as any;
    case NotificationAction.VIEW_ORDER:
      return 'MyOrders' as any;
    case NotificationAction.VIEW_PAYMENT:
      return 'PaymentMethods' as any;
    case NotificationAction.CLAIM_OFFER:
      return 'Offers' as any;
    case NotificationAction.UPDATE_APP:
      return null;
    default:
      return null;
  }
}

const SWIPE_THRESHOLD = 80;
const ACTION_WIDTH = 80;

const NotificationCard = ({ item, onPress }: NotificationCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const markRead = useNotificationStore((s) => s.markRead);
  const markUnread = useNotificationStore((s) => s.markUnread);
  const deleteNotification = useNotificationStore((s) => s.deleteNotification);

  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderMove: (_, gs) => {
        if (gs.dx < 0 || gs.dx > SWIPE_THRESHOLD) {
          translateX.setValue(gs.dx);
        }
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dx < -SWIPE_THRESHOLD) {
          Animated.timing(translateX, { toValue: -ACTION_WIDTH, duration: 200, useNativeDriver: true }).start(() => {
            deleteNotification(item.id);
          });
        } else if (gs.dx > SWIPE_THRESHOLD) {
          Animated.timing(translateX, { toValue: ACTION_WIDTH, duration: 200, useNativeDriver: true }).start(() => {
            if (item.isRead) {
              markUnread(item.id);
            } else {
              markRead(item.id);
            }
            Animated.timing(translateX, { toValue: 0, duration: 200, useNativeDriver: true }).start();
          });
        } else {
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true, bounciness: 8 }).start();
        }
      },
    })
  ).current;

  const handlePress = useCallback(() => {
    if (!item.isRead) {
      markRead(item.id);
    }
    if (onPress) {
      onPress(item);
    } else {
      const route = getActionRoute(item.actionType);
      if (route) {
        (navigation as any).navigate(route);
      }
    }
  }, [item, markRead, onPress, navigation]);

  const iconName = CATEGORY_ICON_MAP[item.category] || 'notifications-outline';
  const iconColor = CATEGORY_COLOR_MAP[item.category] || COLORS.purple;
  const ctaLabel = item.actionType ? CTA_LABEL_MAP[item.actionType] : null;

  const isDelivered = item.category === NotificationCategory.ORDER_DELIVERED;
  const isFailed = item.category === NotificationCategory.PAYMENT_FAILED;

  const handleActionPress = () => {
    if (!item.isRead) markRead(item.id);
    const route = getActionRoute(item.actionType);
    if (route) {
      (navigation as any).navigate(route);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.actionsContainer,
          { transform: [{ translateX }] },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={[styles.swipeAction, styles.swipeActionRight]}
          activeOpacity={0.8}
          onPress={() => deleteNotification(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.swipeAction, item.isRead ? styles.swipeActionUnread : styles.swipeActionRead]}
          activeOpacity={0.8}
          onPress={() => {
            if (item.isRead) markUnread(item.id);
            else markRead(item.id);
          }}
        >
          <Ionicons
            name={item.isRead ? 'mail-unread-outline' : 'checkmark-outline'}
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          !item.isRead && styles.unreadCard,
          isDelivered && styles.successCard,
          isFailed && styles.failedCard,
          { transform: [{ translateX }] },
        ]}
      >
        <TouchableOpacity
          style={styles.cardInner}
          activeOpacity={0.95}
          onPress={handlePress}
          accessibilityRole="button"
          accessibilityLabel={`${item.title}. ${item.message}`}
        >
          {!item.isRead && <View style={styles.unreadDot} />}

          <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
            <Ionicons name={iconName as any} size={22} color={iconColor} />
          </View>

          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text
                style={[styles.title, !item.isRead && styles.unreadTitle]}
                numberOfLines={1}
                ellipsizeMode="tail"
                allowFontScaling={false}
              >
                {item.title}
              </Text>
              <Text style={styles.time} allowFontScaling={false}>
                {formatRelativeTime(item.createdAt)}
              </Text>
            </View>
            <Text
              style={styles.message}
              numberOfLines={1}
              ellipsizeMode="tail"
              allowFontScaling={false}
            >
              {item.message}
            </Text>
          </View>
        </TouchableOpacity>

        {ctaLabel && (
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.7} onPress={handleActionPress}>
            <Text style={styles.ctaText} allowFontScaling={false}>{ctaLabel}</Text>
            <Ionicons name="chevron-forward" size={14} color={COLORS.purple} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: verticalScale(3),
    position: 'relative',
  },
  actionsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 0,
  },
  swipeAction: {
    width: scale(ACTION_WIDTH),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeActionRight: {
    backgroundColor: '#E74C3C',
    borderTopRightRadius: scale(14),
    borderBottomRightRadius: scale(14),
  },
  swipeActionRead: {
    backgroundColor: '#2ECC71',
  },
  swipeActionUnread: {
    backgroundColor: COLORS.purple,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: '#F0F0F0',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
  },
  unreadCard: {
    backgroundColor: '#F8F6FF',
    borderColor: '#EEE8FF',
  },
  successCard: {
    borderColor: '#E8F8E8',
  },
  failedCard: {
    borderColor: '#FDE8E8',
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    gap: scale(12),
  },
  unreadDot: {
    position: 'absolute',
    left: scale(4),
    top: '50%',
    width: scale(6),
    height: verticalScale(6),
    borderRadius: scale(3),
    backgroundColor: COLORS.purple,
  },
  iconContainer: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: verticalScale(2),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(8),
  },
  title: {
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
    color: '#1C1C38',
    flex: 1,
  },
  unreadTitle: {
    fontWeight: '700',
    color: '#1C1C38',
  },
  time: {
    fontSize: responsiveFontSize(11),
    color: '#A5A5A5',
    flexShrink: 0,
  },
  message: {
    fontSize: responsiveFontSize(13),
    color: '#8D8DAD',
    marginTop: verticalScale(1),
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
    paddingVertical: verticalScale(8),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  ctaText: {
    fontSize: responsiveFontSize(13),
    fontWeight: '600',
    color: COLORS.purple,
  },
});

export default NotificationCard;

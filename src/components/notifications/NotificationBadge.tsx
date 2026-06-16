import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNotificationStore } from '../../store/notificationStore';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

const NotificationBadge = () => {
  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

  if (unreadCount === 0) return null;

  const display = unreadCount > 99 ? '99+' : String(unreadCount);

  return (
    <View style={styles.badge}>
      <Text style={styles.text} allowFontScaling={false}>{display}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -verticalScale(4),
    right: -scale(4),
    minWidth: scale(18),
    height: verticalScale(18),
    borderRadius: scale(9),
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(4),
  },
  text: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(10),
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default NotificationBadge;

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import MarkAllReadButton from './MarkAllReadButton';

interface NotificationsHeaderProps {
  onBackPress: () => void;
  onMarkAllRead: () => void;
}

const NotificationsHeader = ({ onBackPress, onMarkAllRead }: NotificationsHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={onBackPress}
        >
          <Ionicons name="chevron-back" size={18} color="#A9A9A9" />
        </TouchableOpacity>

        <Text style={styles.title} allowFontScaling={false}>
          Notifications
        </Text>

        <MarkAllReadButton onPress={onMarkAllRead} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#171A2C',
    textAlign: 'center',
  },
});

export default NotificationsHeader;

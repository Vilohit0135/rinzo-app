import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface NotificationHeaderProps {
  onBackPress: () => void;
  onMarkRead?: () => void;
}

const NotificationHeader = ({ onBackPress }: NotificationHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#A9A9A9" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.markRead}>mark as read</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 6,
    alignItems: 'center',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
    textAlign: 'center',
    marginTop: -32,
  },
  markRead: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4D2C91',
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});

export default NotificationHeader;

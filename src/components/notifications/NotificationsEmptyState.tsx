import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

const NotificationsEmptyState = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="notifications-off-outline" size={44} color="#D1D1D6" />
      <Text style={styles.title} allowFontScaling={false}>No Notifications</Text>
      <Text style={styles.subtitle} allowFontScaling={false}>
        We'll notify you when something happens.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171A2C',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#A9A9A9',
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 17,
  },
});

export default NotificationsEmptyState;

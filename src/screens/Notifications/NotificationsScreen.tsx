import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NotificationHeader from '../../components/notifications/NotificationHeader';
import NotificationCard from '../../components/notifications/NotificationCard';
import { COLORS } from '../../constants/colors';
import { notificationsData } from '../../data/notifications/notificationsData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
};

const NotificationsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <NotificationHeader onBackPress={() => navigation.goBack()} />
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 180,
  },
});

export default NotificationsScreen;

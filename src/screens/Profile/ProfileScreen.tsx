import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProfileCard from '../../components/profile/ProfileCard';
import StatsCard from '../../components/profile/StatsCard';
import MenuSection from '../../components/profile/MenuSection';
import LogoutButton from '../../components/profile/LogoutButton';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { profileData } from '../../data/profile/profileData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  MyOrders: undefined;
  Profile: undefined;
  PersonalInformation: undefined;
};

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <ProfileCard {...profileData.userProfile} />

        <StatsCard {...profileData.stats} />

        <MenuSection
          heading={profileData.accountMenu.heading}
          items={profileData.accountMenu.items.map((item) =>
            item.title === 'Personal Information'
              ? { ...item, onPress: () => navigation.navigate('PersonalInformation') }
              : item
          )}
        />
        <MenuSection
          heading={profileData.activityMenu.heading}
          items={profileData.activityMenu.items.map((item) =>
            item.title === 'Order History'
              ? { ...item, onPress: () => navigation.navigate('MyOrders') }
              : item
          )}
        />
        <MenuSection {...profileData.supportMenu} />

        <LogoutButton />
      </ScrollView>
      <BottomTabBar activeTab="Profile" onTabPress={(tab) => { if (tab === 'Home') navigation.navigate('Home'); if (tab === 'Search') navigation.navigate('Search'); if (tab === 'Orders') navigation.navigate('YourCart'); }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: 12,
    paddingBottom: 140,
  },
});

export default ProfileScreen;

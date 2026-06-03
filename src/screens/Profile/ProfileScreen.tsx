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
  Profile: undefined;
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

        <MenuSection {...profileData.accountMenu} />
        <MenuSection {...profileData.activityMenu} />
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

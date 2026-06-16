import { StyleSheet } from 'react-native';
import ScrollableScreen from '../../components/common/ScrollableScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, CommonActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProfileCard from '../../components/profile/ProfileCard';
import StatsCard from '../../components/profile/StatsCard';
import MenuSection from '../../components/profile/MenuSection';
import LogoutButton from '../../components/profile/LogoutButton';
import { COLORS } from '../../constants/colors';
import { profileData } from '../../data/profile/profileData';
import { useAuthStore } from '../../store/authStore';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  MyOrders: { fromProfile?: boolean } | undefined;
  MyReviews: undefined;
  Offers: undefined;
  HelpAndSupport: undefined;
  HelpCenter: undefined;
  ContactSupport: undefined;
  TermsPrivacy: undefined;
  PaymentMethods: undefined;
  Profile: undefined;
  PersonalInformation: undefined;
  SavedAddress: undefined;
  Login: undefined;
};

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();
  const signOut = useAuthStore((s) => s.signOut);

  const handleLogout = async () => {
    await signOut();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollableScreen contentContainerStyle={styles.scroll}>
        <ProfileCard {...profileData.userProfile} onPress={() => navigation.navigate('PersonalInformation')} />

        <StatsCard {...profileData.stats} />

        <MenuSection
          heading={profileData.accountMenu.heading}
          items={profileData.accountMenu.items.map((item) =>
            item.title === 'Personal Information'
              ? { ...item, onPress: () => navigation.navigate('PersonalInformation') }
              : item.title === 'Saved Address'
              ? { ...item, onPress: () => navigation.navigate('SavedAddress') }
              : item.title === 'Payment Methods'
              ? { ...item, onPress: () => navigation.navigate('PaymentMethods') }
              : item
          )}
        />
        <MenuSection
          heading={profileData.activityMenu.heading}
          items={profileData.activityMenu.items.map((item) =>
            item.title === 'Order History'
              ? { ...item, onPress: () => navigation.navigate('MyOrders', { fromProfile: true }) }
              : item.title === 'Review and Ratings'
              ? { ...item, onPress: () => navigation.navigate('MyReviews') }
              : item.title === 'Offers'
              ? { ...item, onPress: () => navigation.navigate('Offers') }
              : item
          )}
        />
        <MenuSection
          heading={profileData.supportMenu.heading}
          items={profileData.supportMenu.items.map((item) =>
            item.title === 'Help Center'
              ? { ...item, onPress: () => navigation.navigate('HelpCenter') }
              : item.title === 'Help and Support'
              ? { ...item, onPress: () => navigation.navigate('HelpAndSupport') }
              : item.title === 'Contact Support'
              ? { ...item, onPress: () => navigation.navigate('ContactSupport') }
              : item.title === 'Terms and Privacy'
              ? { ...item, onPress: () => navigation.navigate('TermsPrivacy') }
              : item
          )}
        />

        <LogoutButton onPress={handleLogout} />
      </ScrollableScreen>
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

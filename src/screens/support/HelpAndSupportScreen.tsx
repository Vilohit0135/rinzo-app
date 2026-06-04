import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SupportHeader from '../../components/support/SupportHeader';
import SupportMenuCard from '../../components/support/SupportMenuCard';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { helpSupportData } from '../../data/support/helpSupportData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  HelpCenter: undefined;
  ContactSupport: undefined;
  ChatSupport: undefined;
  ReportIssue: undefined;
  TermsPrivacy: undefined;
};

const HelpAndSupportScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const handleItemPress = (route: string) => {
    navigation.navigate(route as keyof RootStackParamList);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <SupportHeader onBackPress={() => navigation.goBack()} />

        <Text style={styles.sectionTitle}>How can we help you ?</Text>

        <SupportMenuCard data={helpSupportData} onItemPress={handleItemPress} />
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
    paddingBottom: 180,
  },
  sectionTitle: {
    marginTop: 28,
    marginHorizontal: 16,
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
  },
});

export default HelpAndSupportScreen;

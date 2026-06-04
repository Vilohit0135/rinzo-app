import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ContactSupportHeader from '../../components/support/ContactSupportHeader';
import SupportHeroCard from '../../components/support/SupportHeroCard';
import SupportOptionCard from '../../components/support/SupportOptionCard';
import RecentConversationCard from '../../components/support/RecentConversationCard';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { supportOptions, recentConversation } from '../../data/support/contactSupportData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
};

const ContactSupportScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <ContactSupportHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.heroSection}>
          <SupportHeroCard />
        </View>

        <Text style={styles.sectionTitle}>Choose a way to contact</Text>

        <View style={styles.optionsSection}>
          <FlatList
            data={supportOptions}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <SupportOptionCard option={item} />
            )}
          />
        </View>

        <Text style={styles.recentTitle}>Your recent conversation</Text>

        <View style={styles.recentSection}>
          <RecentConversationCard conversation={recentConversation} />
        </View>
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
    paddingHorizontal: 16,
    paddingBottom: 130,
  },
  heroSection: {
    marginTop: 20,
  },
  sectionTitle: {
    marginTop: 22,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  optionsSection: {
    marginTop: 14,
  },
  recentTitle: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  recentSection: {
    marginTop: 12,
  },
});

export default ContactSupportScreen;

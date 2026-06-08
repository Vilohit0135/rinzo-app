import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScrollableScreen from '../../components/common/ScrollableScreen';
import HelpHeader from '../../components/help/HelpHeader';
import HelpSearchBar from '../../components/help/HelpSearchBar';
import HelpTopicCard from '../../components/help/HelpTopicCard';
import SupportCard from '../../components/help/SupportCard';
import { COLORS } from '../../constants/colors';
import { helpTopics } from '../../data/help/helpCenterData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  HelpAndSupport: undefined;
};

const HelpCenterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollableScreen contentContainerStyle={styles.scroll}>
        <HelpHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.searchSection}>
          <HelpSearchBar />
        </View>

        <Text style={styles.popularTitle}>Popular Topics</Text>

        <View style={styles.topicsContainer}>
          <FlatList
            data={helpTopics}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            nestedScrollEnabled
            renderItem={({ item, index }) => (
              <HelpTopicCard topic={item} isLast={index === helpTopics.length - 1} />
            )}
          />
        </View>

        <View style={styles.supportSection}>
          <SupportCard onChatPress={() => navigation.navigate('HelpAndSupport')} />
        </View>
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
    paddingHorizontal: 16,
    paddingBottom: 140,
  },
  searchSection: {
    marginTop: 22,
  },
  popularTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  topicsContainer: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  supportSection: {
    marginTop: 22,
  },
});

export default HelpCenterScreen;

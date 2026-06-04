import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TermsPrivacyHeader from '../../components/legal/TermsPrivacyHeader';
import LegalMenuCard from '../../components/legal/LegalMenuCard';
import LegalIllustration from '../../components/legal/LegalIllustration';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { legalMenuItems } from '../../data/legal/legalData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
};

const TermsPrivacyScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <TermsPrivacyHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.menuSection}>
          <FlatList
            data={legalMenuItems}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <LegalMenuCard item={item} />
            )}
          />
        </View>

        <LegalIllustration />
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
    paddingHorizontal: 14,
    paddingBottom: 120,
  },
  menuSection: {
    marginTop: 20,
  },
});

export default TermsPrivacyScreen;

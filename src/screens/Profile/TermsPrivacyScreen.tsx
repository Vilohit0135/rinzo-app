import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScrollableScreen from '../../components/common/ScrollableScreen';
import TermsPrivacyHeader from '../../components/legal/TermsPrivacyHeader';
import LegalMenuCard from '../../components/legal/LegalMenuCard';
import LegalIllustration from '../../components/legal/LegalIllustration';
import { COLORS } from '../../constants/colors';
import { legalMenuItems } from '../../data/legal/legalData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
  ComingSoon: { title?: string } | undefined;
};

const TermsPrivacyScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollableScreen contentContainerStyle={styles.scroll}>
        <TermsPrivacyHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.menuSection}>
          <FlatList
            data={legalMenuItems}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <LegalMenuCard
                item={item}
                onPress={() => navigation.navigate('ComingSoon', { title: item.title })}
              />
            )}
          />
        </View>

        <LegalIllustration />
      </ScrollableScreen>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor:'#F9F8FD',
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

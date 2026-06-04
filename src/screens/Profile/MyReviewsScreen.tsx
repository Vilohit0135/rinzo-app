import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ReviewsHeader from '../../components/reviews/ReviewsHeader';
import ReviewCard from '../../components/reviews/ReviewCard';
import BottomTabBar from '../../components/home/BottomTabBar';
import { COLORS } from '../../constants/colors';
import { reviewsData } from '../../data/reviews/reviewsData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
};

const MyReviewsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <ReviewsHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.listSection}>
          {reviewsData.map((item) => (
            <ReviewCard
              key={item.id}
              laundryId={item.laundryId}
              reviewDate={item.reviewDate}
              reviewText={item.reviewText}
            />
          ))}
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
  listSection: {
    marginTop: 44,
  },
});

export default MyReviewsScreen;

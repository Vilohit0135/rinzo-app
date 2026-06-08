import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScrollableScreen from '../../components/common/ScrollableScreen';
import ReviewsHeader from '../../components/reviews/ReviewsHeader';
import ReviewCard from '../../components/reviews/ReviewCard';
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
      <ScrollableScreen contentContainerStyle={styles.scroll}>
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
    paddingBottom: 130,
  },
  listSection: {
    marginTop: 44,
  },
});

export default MyReviewsScreen;

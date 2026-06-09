import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScrollableScreen from '../../components/common/ScrollableScreen';
import ReviewsHeader from '../../components/reviews/ReviewsHeader';
import ReviewCard from '../../components/reviews/ReviewCard';
import EditReviewModal from '../../components/reviews/EditReviewModal';
import { COLORS } from '../../constants/colors';
import { reviewsData, type ReviewItem } from '../../data/reviews/reviewsData';
import { getLaundryById } from '../../data/laundry/laundryData';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  YourCart: undefined;
  Profile: undefined;
};

const MyReviewsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();
  const [reviews, setReviews] = useState<ReviewItem[]>(reviewsData);
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);

  const handleEditSubmit = (rating: number, feedback: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === editingReview!.id ? { ...r, rating, reviewText: feedback } : r
      )
    );
    setEditingReview(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollableScreen contentContainerStyle={styles.scroll}>
        <ReviewsHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.listSection}>
          {reviews.map((item) => (
            <ReviewCard
              key={item.id}
              laundryId={item.laundryId}
              rating={item.rating}
              reviewDate={item.reviewDate}
              reviewText={item.reviewText}
              onEditPress={() => setEditingReview(item)}
            />
          ))}
        </View>
      </ScrollableScreen>

      <EditReviewModal
        visible={!!editingReview}
        onClose={() => setEditingReview(null)}
        onSubmit={handleEditSubmit}
        initialRating={editingReview?.rating ?? 5}
        initialFeedback={editingReview?.reviewText ?? ''}
        laundryName={getLaundryById(editingReview?.laundryId ?? '')?.name ?? ''}
      />
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

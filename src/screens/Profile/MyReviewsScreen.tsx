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
import { type ReviewItem } from '../../data/reviews/reviewsData';
import { useReviewStore } from '../../store/reviewStore';
import { getLaundryById } from '../../data/laundry/laundryData';
import { RootStackParamList } from '../../types/navigation';

const MyReviewsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MyReviews'>>();
  const reviews = useReviewStore((s) => s.reviews);
  const updateReview = useReviewStore((s) => s.updateReview);
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);

  const handleEditSubmit = (rating: number, feedback: string) => {
    updateReview(editingReview!.id, rating, feedback);
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

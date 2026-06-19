import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reviewsData, type ReviewItem } from '../data/reviews/reviewsData';

interface ReviewStore {
  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id' | 'reviewDate'>) => void;
  updateReview: (id: string, rating: number, feedback: string) => void;
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviews: reviewsData,
      addReview: (review) =>
        set((state) => {
          const newReview: ReviewItem = {
            ...review,
            id: `review_${Date.now()}`,
            reviewDate: new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
          };
          return { reviews: [newReview, ...state.reviews] };
        }),
      updateReview: (id, rating, feedback) =>
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === id ? { ...r, rating, reviewText: feedback } : r
          ),
        })),
    }),
    {
      name: 'rinzo-reviews',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

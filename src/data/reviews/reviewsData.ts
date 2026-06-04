export interface ReviewItem {
  id: string;
  laundryId: string;
  rating: number;
  reviewDate: string;
  reviewText: string;
}

export const reviewsData: ReviewItem[] = [
  {
    id: 'review_1',
    laundryId: 'krishna-laundry',
    rating: 5,
    reviewDate: '12 May 2025',
    reviewText: 'Great service, clothes were super clean delivered on time',
  },
  {
    id: 'review_2',
    laundryId: 'krishna-laundry',
    rating: 5,
    reviewDate: '12 May 2025',
    reviewText: 'Great service, clothes were super clean delivered on time',
  },
  {
    id: 'review_3',
    laundryId: 'krishna-laundry',
    rating: 5,
    reviewDate: '12 May 2025',
    reviewText: 'Great service, clothes were super clean delivered on time',
  },
  {
    id: 'review_4',
    laundryId: 'krishna-laundry',
    rating: 5,
    reviewDate: '12 May 2025',
    reviewText: 'Great service, clothes were super clean delivered on time',
  },
];

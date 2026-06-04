export interface FavouriteItem {
  id: string;
  laundryId: string;
  isFavourite: boolean;
}

export const favouritesData: FavouriteItem[] = [
  { id: 'fav_1', laundryId: 'krishna-laundry', isFavourite: true },
  { id: 'fav_2', laundryId: 'krishna-laundry', isFavourite: true },
  { id: 'fav_3', laundryId: 'krishna-laundry', isFavourite: true },
  { id: 'fav_4', laundryId: 'krishna-laundry', isFavourite: true },
];

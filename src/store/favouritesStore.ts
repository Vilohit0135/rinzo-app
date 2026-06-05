import { create } from 'zustand';

interface FavouritesState {
  favouriteIds: string[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
}

export const useFavouritesStore = create<FavouritesState>((set, get) => ({
  favouriteIds: [],

  toggleFavourite: (id: string) => {
    set((state) => {
      const exists = state.favouriteIds.includes(id);
      return {
        favouriteIds: exists
          ? state.favouriteIds.filter((fid) => fid !== id)
          : [...state.favouriteIds, id],
      };
    });
  },

  isFavourite: (id: string) => {
    return get().favouriteIds.includes(id);
  },
}));

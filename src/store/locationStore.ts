import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LocationState {
  currentAddress: string | null;
  currentCoordinates: { latitude: number; longitude: number } | null;
  recentLocations: string[];
  setCurrentAddress: (address: string) => void;
  setCurrentCoordinates: (coords: { latitude: number; longitude: number }) => void;
  addRecentLocation: (address: string) => void;
  removeRecentLocation: (address: string) => void;
  clearRecentLocations: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      currentAddress: null,
      currentCoordinates: null,
      recentLocations: [],

      setCurrentAddress: (address: string) => set({ currentAddress: address }),

      setCurrentCoordinates: (coords) => set({ currentCoordinates: coords }),

  addRecentLocation: (address: string) =>
    set((state) => ({
      recentLocations: [address, ...state.recentLocations.filter((l) => l !== address)].slice(0, 5),
    })),
  removeRecentLocation: (address: string) =>
    set((state) => ({
      recentLocations: state.recentLocations.filter((l) => l !== address),
    })),
  clearRecentLocations: () => set({ recentLocations: [] }),
    }),
    {
      name: 'rinzo-location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

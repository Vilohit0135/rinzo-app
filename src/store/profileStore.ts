import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profileData } from '../data/profile/profileData';

interface ProfileState {
  name: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  gender: string;
  preferredLanguage: string;
  profileImage: string | null;
  updateProfile: (data: Partial<Omit<ProfileState, 'updateProfile'>>) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: profileData.userProfile.name,
      email: profileData.userProfile.email,
      mobile: profileData.userProfile.mobile,
      dateOfBirth: profileData.userProfile.dateOfBirth,
      gender: profileData.userProfile.gender,
      preferredLanguage: profileData.userProfile.preferredLanguage,
      profileImage: null,
      updateProfile: (data) => set(data),
    }),
    {
      name: 'rinzo-profile',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

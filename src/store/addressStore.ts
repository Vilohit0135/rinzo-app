import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AddressItem {
  title: string;
  address1: string;
  address2: string;
  contact: string;
  isDefault: boolean;
}

const defaultAddresses: AddressItem[] = [
  {
    title: 'Home ( Default )',
    address1: '12, 5th Cross Road',
    address2: 'HSR Layout, Bengaluru, 560102',
    contact: 'Mohammed Rayaan – 9876543210',
    isDefault: true,
  },
  {
    title: 'Work',
    address1: '45, 100 Feet Road',
    address2: 'Indiranagar, Bengaluru, 560038',
    contact: 'Anjali Verma – 9123456780',
    isDefault: false,
  },
  {
    title: 'Parents House',
    address1: '78, 7th Block',
    address2: 'Koramangala, Bengaluru, 560095',
    contact: 'Ahmed Khan – 9988776655',
    isDefault: false,
  },
  {
    title: 'Friend House',
    address1: '23, Brigade Tech Park Road',
    address2: 'Whitefield, Bengaluru, 560066',
    contact: 'Priya Nair – 9012345678',
    isDefault: false,
  },
  {
    title: 'Hostel',
    address1: '56, 4th Phase',
    address2: 'JP Nagar, Bengaluru, 560078',
    contact: 'Rahul Sharma – 9090909090',
    isDefault: false,
  },
];

interface AddressState {
  addresses: AddressItem[];
  addAddress: (addr: AddressItem) => void;
  updateAddress: (index: number, addr: AddressItem) => void;
  deleteAddress: (index: number) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: defaultAddresses,
      addAddress: (addr) =>
        set((state) => ({ addresses: [...state.addresses, addr] })),
      updateAddress: (index, addr) =>
        set((state) => ({
          addresses: state.addresses.map((item, i) =>
            i === index ? addr : item
          ),
        })),
      deleteAddress: (index) =>
        set((state) => ({
          addresses: state.addresses.filter((_, i) => i !== index),
        })),
    }),
    {
      name: 'rinzo-addresses',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

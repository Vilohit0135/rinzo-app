import { create } from 'zustand';

export interface ServiceSelection {
  id: string;
  title: string;
  unitPrice: number;
  unit: string;
  quantity: number;
  subtitle: string;
}

export const DELIVERY_CHARGE = 20;
export const DISCOUNT = 20;

interface BookingState {
  services: ServiceSelection[];
  instructions: string;
  pickupDate: string;
  pickupTime: string;
  address: string;
  addressLabel: string;
  addressContact: string;
  laundryName: string;
  orderId: string;
  setServices: (services: ServiceSelection[]) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setInstructions: (text: string) => void;
  setPickupDate: (date: string) => void;
  setPickupTime: (time: string) => void;
  setAddress: (address: string) => void;
  setAddressLabel: (label: string) => void;
  setAddressContact: (contact: string) => void;
  setLaundryName: (name: string) => void;
  setOrderId: (id: string) => void;
  clear: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  services: [
    { id: '1', title: 'Wash and Fold', unitPrice: 50, unit: 'Kg', quantity: 4, subtitle: 'Wash , Dry and Neatly Folded' },
    { id: '2', title: 'Iron Only', unitPrice: 15, unit: 'Itm', quantity: 5, subtitle: 'Wash , Dry and Neatly Folded' },
    { id: '3', title: 'Dry Clean', unitPrice: 120, unit: 'Itm', quantity: 5, subtitle: 'Wash , Dry and Neatly Folded' },
  ],
  instructions: '',
  pickupDate: '',
  pickupTime: '',
  address: '221b Baker Street Bangalore - 50001',
  addressLabel: 'Home',
  addressContact: 'MS Mira Sharma - 9875263167',
  laundryName: 'Krishna Laundry',
  orderId: '',

  setServices: (services) => set({ services }),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === id ? { ...s, quantity: Math.max(0, quantity) } : s
      ),
    })),

  setInstructions: (instructions) => set({ instructions }),

  setPickupDate: (pickupDate) => set({ pickupDate }),

  setPickupTime: (pickupTime) => set({ pickupTime }),

  setAddress: (address) => set({ address }),

  setAddressLabel: (addressLabel) => set({ addressLabel }),

  setAddressContact: (addressContact) => set({ addressContact }),

  setLaundryName: (laundryName) => set({ laundryName }),

  setOrderId: (orderId) => set({ orderId }),

  clear: () =>
    set({
      services: [
        { id: '1', title: 'Wash and Fold', unitPrice: 50, unit: 'Kg', quantity: 4, subtitle: 'Wash , Dry and Neatly Folded' },
        { id: '2', title: 'Iron Only', unitPrice: 15, unit: 'Itm', quantity: 5, subtitle: 'Wash , Dry and Neatly Folded' },
        { id: '3', title: 'Dry Clean', unitPrice: 120, unit: 'Itm', quantity: 5, subtitle: 'Wash , Dry and Neatly Folded' },
      ],
      instructions: '',
      pickupDate: '',
      pickupTime: '',
      address: '221b Baker Street Bangalore - 50001',
      addressLabel: 'Home',
      addressContact: 'MS Mira Sharma - 9875263167',
      laundryName: 'Krishna Laundry',
      orderId: '',
    }),
}));

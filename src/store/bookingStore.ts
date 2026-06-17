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

export const calculateDiscount = (
  couponCode: string | null,
  subtotal: number,
  services: ServiceSelection[]
): number => {
  if (!couponCode) return 0;
  const code = couponCode.toUpperCase().trim();
  switch (code) {
    case '323232':
      return Math.round(subtotal * 0.3);
    case 'FLAT20':
      if (subtotal >= 500) {
        return Math.round(subtotal * 0.2);
      }
      return 0;
    case 'FREESHIP':
      return DELIVERY_CHARGE;
    case 'IRON15': {
      // Iron Only service is id '2' (or check title contains Iron)
      const ironService = services.find((s) => s.id === '2' || s.title.toLowerCase().includes('iron'));
      if (ironService) {
        const ironTotal = ironService.quantity * ironService.unitPrice;
        return Math.round(ironTotal * 0.15);
      }
      return 0;
    }
    default:
      return 0;
  }
};

interface BookingState {
  services: ServiceSelection[];
  instructions: string;
  pickupDate: string;
  pickupTime: string;
  address: string;
  addressLabel: string;
  addressContact: string;
  selectedLaundryId: string;
  laundryName: string;
  laundryRating: number;
  laundryReviews: number;
  laundryDistance: string;
  laundryPrice: string;
  orderId: string;
  totalAmount: number;
  appliedCoupon: string | null;
  clothesSummary: { name: string; quantity: number }[];
  setServices: (services: ServiceSelection[]) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setInstructions: (text: string) => void;
  setPickupDate: (date: string) => void;
  setPickupTime: (time: string) => void;
  setAddress: (address: string) => void;
  setAddressLabel: (label: string) => void;
  setAddressContact: (contact: string) => void;
  setSelectedLaundry: (laundry: { id: string; name: string; rating: number; reviewCount: number; distance: string; price: string }) => void;
  setLaundryName: (name: string) => void;
  setOrderId: (id: string) => void;
  setTotalAmount: (amount: number) => void;
  setAppliedCoupon: (coupon: string | null) => void;
  setClothesSummary: (clothes: { name: string; quantity: number }[]) => void;
  updateClothesQuantity: (name: string, quantity: number) => void;
  clear: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  services: [
    { id: '1', title: 'Wash and Fold', unitPrice: 50, unit: 'Kg', quantity: 0, subtitle: 'Wash , Dry and Neatly Folded' },
    { id: '2', title: 'Iron Only', unitPrice: 15, unit: 'Itm', quantity: 0, subtitle: 'Wash , Dry and Neatly Folded' },
    { id: '3', title: 'Dry Clean', unitPrice: 120, unit: 'Itm', quantity: 0, subtitle: 'Wash , Dry and Neatly Folded' },
  ],
  instructions: '',
  pickupDate: '',
  pickupTime: '',
  address: '221b Baker Street Bangalore - 50001',
  addressLabel: 'Home',
  addressContact: 'MS Mira Sharma - 9875263167',
  selectedLaundryId: 'presto-laundry',
  laundryName: 'Presto Laundry',
  laundryRating: 4.9,
  laundryReviews: 210,
  laundryDistance: '0.8 km away',
  laundryPrice: '₹50/kg',
  orderId: '',
  totalAmount: 0,
  appliedCoupon: null,
  clothesSummary: [
    { name: 'Shirts', quantity: 0 },
    { name: 'Pants', quantity: 0 },
    { name: 'T-Shirts', quantity: 0 },
    { name: 'Bedsheets', quantity: 0 },
  ],

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

  setSelectedLaundry: (laundry) =>
    set({
      selectedLaundryId: laundry.id,
      laundryName: laundry.name,
      laundryRating: laundry.rating,
      laundryReviews: laundry.reviewCount,
      laundryDistance: laundry.distance,
      laundryPrice: laundry.price,
    }),

  setLaundryName: (laundryName) => set({ laundryName }),

  setOrderId: (orderId) => set({ orderId }),

  setTotalAmount: (totalAmount) => set({ totalAmount }),

  setAppliedCoupon: (appliedCoupon) => set({ appliedCoupon }),

  setClothesSummary: (clothesSummary) => set({ clothesSummary }),

  updateClothesQuantity: (name, quantity) =>
    set((state) => ({
      clothesSummary: state.clothesSummary.map((c) =>
        c.name === name ? { ...c, quantity: Math.max(0, quantity) } : c
      ),
    })),

  clear: () =>
    set({
      services: [
        { id: '1', title: 'Wash and Fold', unitPrice: 50, unit: 'Kg', quantity: 0, subtitle: 'Wash , Dry and Neatly Folded' },
        { id: '2', title: 'Iron Only', unitPrice: 15, unit: 'Itm', quantity: 0, subtitle: 'Wash , Dry and Neatly Folded' },
        { id: '3', title: 'Dry Clean', unitPrice: 120, unit: 'Itm', quantity: 0, subtitle: 'Wash , Dry and Neatly Folded' },
      ],
      instructions: '',
      pickupDate: '',
      pickupTime: '',
      address: '221b Baker Street Bangalore - 50001',
      addressLabel: 'Home',
      addressContact: 'MS Mira Sharma - 9875263167',
      selectedLaundryId: 'presto-laundry',
      laundryName: 'Presto Laundry',
      laundryRating: 4.9,
      laundryReviews: 210,
      laundryDistance: '0.8 km away',
      laundryPrice: '₹50/kg',
      orderId: '',
      totalAmount: 0,
      appliedCoupon: null,
      clothesSummary: [
        { name: 'Shirts', quantity: 0 },
        { name: 'Pants', quantity: 0 },
        { name: 'T-Shirts', quantity: 0 },
        { name: 'Bedsheets', quantity: 0 },
      ],
    }),
}));

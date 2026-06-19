import { create } from 'zustand';
import { allServices } from '../data/services/servicesData';

export interface ServiceSelection {
  id: string;
  title: string;
  unitPrice: number;
  unit: string;
  quantity: number;
  subtitle: string;
}

export const DELIVERY_CHARGE = 20;

export const calculateSubtotal = (
  services: ServiceSelection[],
  clothesSummary: Record<string, { name: string; quantity: number; unitPrice?: number }[]>
): number => {
  let sum = 0;
  services.forEach((s) => {
    if (s.quantity > 0) {
      if (s.unit === 'Kg') {
        sum += s.quantity * s.unitPrice;
      } else {
        const serviceClothes = clothesSummary[s.id] || [];
        sum += serviceClothes.reduce((sub, item) => sub + item.quantity * (item.unitPrice || s.unitPrice), 0);
      }
    }
  });
  return sum;
};


export const calculateDiscount = (
  couponCode: string | null,
  subtotal: number,
  services: ServiceSelection[]
): number => {
  if (!couponCode) return 0;
  const code = couponCode.toUpperCase().trim();
  switch (code) {
    case 'FIRST30':
    case '323232':
      return Math.round(subtotal * 0.3);
    case 'FLAT50':
      return 50;
    case 'WASHREADY':
      return Math.round(subtotal * 0.2);
    case 'FREEDEL':
    case 'FREESHIP':
      return DELIVERY_CHARGE;
    case 'FLAT20':
      if (subtotal >= 500) {
        return Math.round(subtotal * 0.2);
      }
      return 0;
    case 'IRON15': {
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

const defaultClothes = [
  { name: 'Shirts', quantity: 0 },
  { name: 'Pants', quantity: 0 },
  { name: 'T-Shirts', quantity: 0 },
  { name: 'Bedsheets', quantity: 0 },
];

const getInitialClothesSummary = (): Record<string, { name: string; quantity: number }[]> => ({
  '1': defaultClothes.map(c => ({ ...c })),
  '2': defaultClothes.map(c => ({ ...c })),
  '3': defaultClothes.map(c => ({ ...c })),
  '4': defaultClothes.map(c => ({ ...c })),
  '5': defaultClothes.map(c => ({ ...c })),
  '6': defaultClothes.map(c => ({ ...c })),
  '7': defaultClothes.map(c => ({ ...c })),
  '8': defaultClothes.map(c => ({ ...c })),
  '9': defaultClothes.map(c => ({ ...c })),
});

const getInitialServices = (): ServiceSelection[] =>
  allServices.map(s => ({
    id: s.id,
    title: s.title,
    unitPrice: s.unitPrice,
    unit: s.unit,
    quantity: 0,
    subtitle: s.subtitle,
  }));

interface BookingState {
  services: ServiceSelection[];
  instructions: string;
  pickupDate: string;
  pickupTime: string;
  address: string;
  address1: string;
  address2: string;
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
  clothesSummary: Record<string, { name: string; quantity: number; unitPrice?: number }[]>;
  setServices: (services: ServiceSelection[]) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setInstructions: (text: string) => void;
  setPickupDate: (date: string) => void;
  setPickupTime: (time: string) => void;
  setAddress: (address: string) => void;
  setAddress1: (addr: string) => void;
  setAddress2: (addr: string) => void;
  setAddressLabel: (label: string) => void;
  setAddressContact: (contact: string) => void;
  setSelectedLaundry: (laundry: { id: string; name: string; rating: number; reviewCount: number; distance: string; price: string }) => void;
  setLaundryName: (name: string) => void;
  setOrderId: (id: string) => void;
  setTotalAmount: (amount: number) => void;
  setAppliedCoupon: (coupon: string | null) => void;
  setClothesSummary: (clothes: Record<string, { name: string; quantity: number; unitPrice?: number }[]>) => void;
  setServiceClothes: (serviceId: string, clothes: { name: string; quantity: number; unitPrice?: number }[]) => void;
  updateClothesQuantity: (name: string, quantity: number) => void;
  clear: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  services: getInitialServices(),
  instructions: '',
  pickupDate: '',
  pickupTime: '',
  address: '221b Baker Street Bangalore - 50001',
  address1: '221b Baker Street Bangalore - 50001',
  address2: '',
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
  clothesSummary: getInitialClothesSummary(),

  setServices: (services) => set({ services }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const targetQty = Math.max(0, quantity);
      const nextServices = state.services.map((s) =>
        s.id === id ? { ...s, quantity: targetQty } : s
      );

      const nextClothesSummary = { ...state.clothesSummary };
      if (targetQty === 0 && nextClothesSummary[id]) {
        // If the service quantity is set to 0, clear all clothes for this service to 0
        nextClothesSummary[id] = nextClothesSummary[id].map((c) => ({ ...c, quantity: 0 }));
      }

      return {
        services: nextServices,
        clothesSummary: nextClothesSummary,
      };
    }),

  setInstructions: (instructions) => set({ instructions }),

  setPickupDate: (pickupDate) => set({ pickupDate }),

  setPickupTime: (pickupTime) => set({ pickupTime }),

  setAddress: (address) => set({ address }),

  setAddress1: (address1) => set({ address1 }),

  setAddress2: (address2) => set({ address2 }),

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

  setServiceClothes: (serviceId, clothes) =>
    set((state) => ({
      clothesSummary: {
        ...state.clothesSummary,
        [serviceId]: clothes,
      },
    })),

  updateClothesQuantity: (name, targetQuantity) =>
    set((state) => {
      // Find active services (quantity > 0)
      const activeServices = state.services.filter((s) => s.quantity > 0);
      if (activeServices.length === 0) return {};

      // 1. Calculate current total of this item across all active services
      let currentTotal = 0;
      activeServices.forEach((s) => {
        const list = state.clothesSummary[s.id] || [];
        const item = list.find((c) => c.name === name);
        if (item) {
          currentTotal += item.quantity;
        }
      });

      const diff = targetQuantity - currentTotal;
      if (diff === 0) return {};

      const nextClothesSummary = { ...state.clothesSummary };
      const nextServices = state.services.map((s) => ({ ...s }));

      if (diff > 0) {
        // User incremented. Add diff to the first active service.
        const serviceToUpdate = activeServices[0];
        const serviceId = serviceToUpdate.id;
        
        const serviceList = nextClothesSummary[serviceId]
          ? nextClothesSummary[serviceId].map((c) => ({ ...c }))
          : [];
        const itemIndex = serviceList.findIndex((c) => c.name === name);
        if (itemIndex > -1) {
          serviceList[itemIndex].quantity += diff;
        } else {
          serviceList.push({ name, quantity: diff });
        }
        nextClothesSummary[serviceId] = serviceList;

        const sIdx = nextServices.findIndex((s) => s.id === serviceId);
        if (sIdx > -1) {
          nextServices[sIdx].quantity += diff;
        }
      } else {
        // User decremented. Subtract abs(diff) from active services.
        let remainingToSubtract = Math.abs(diff);

        for (const s of activeServices) {
          if (remainingToSubtract <= 0) break;

          const serviceId = s.id;
          const serviceList = nextClothesSummary[serviceId]
            ? nextClothesSummary[serviceId].map((c) => ({ ...c }))
            : [];
          const itemIndex = serviceList.findIndex((c) => c.name === name);

          if (itemIndex > -1 && serviceList[itemIndex].quantity > 0) {
            const currentQty = serviceList[itemIndex].quantity;
            const subtractAmount = Math.min(currentQty, remainingToSubtract);

            serviceList[itemIndex].quantity = currentQty - subtractAmount;
            nextClothesSummary[serviceId] = serviceList;
            remainingToSubtract -= subtractAmount;

            const sIdx = nextServices.findIndex((service) => service.id === serviceId);
            if (sIdx > -1) {
              nextServices[sIdx].quantity = Math.max(0, nextServices[sIdx].quantity - subtractAmount);
            }
          }
        }
      }

      return {
        clothesSummary: nextClothesSummary,
        services: nextServices,
      };
    }),

  clear: () =>
    set({
      services: getInitialServices(),
      instructions: '',
      pickupDate: '',
      pickupTime: '',
      address: '221b Baker Street Bangalore - 50001',
      address1: '221b Baker Street Bangalore - 50001',
      address2: '',
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
      clothesSummary: getInitialClothesSummary(),
    }),
}));


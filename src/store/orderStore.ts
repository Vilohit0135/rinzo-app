import { create } from 'zustand';

export interface PlacedOrder {
  id: string;
  status: 'ongoing' | 'completed' | 'cancelled';
  statusLabel: string;
  laundryName: string;
  laundryId?: string;
  date: string;
  amount: string;
  pickupDate: string;
  pickupTime: string;
  address: string;
  addressLabel: string;
  addressContact: string;
  services: { title: string; quantity: number; unit: string; price: number }[];
}

interface OrderStore {
  orders: PlacedOrder[];
  addOrder: (order: PlacedOrder) => void;
  updateOrderStatus: (id: string, status: 'ongoing' | 'completed' | 'cancelled', statusLabel: string) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  addOrder: (order) =>
    set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (id, status, statusLabel) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, status, statusLabel } : o
      ),
    })),
  clearOrders: () => set({ orders: [] }),
}));

export interface ServiceItem {
  name: string;
  price: string;
  quantity: string;
  total: number;
  icon: string;
}

export interface ClothesItem {
  name: string;
  quantity: number;
}

export interface DiscountItem {
  label: string;
  value: string;
}

export interface CartData {
  laundryInfo: {
    name: string;
    rating: number;
    reviews: number;
    distance: string;
    price: string;
  };
  services: ServiceItem[];
  clothesSummary: ClothesItem[];
  pickupDetails: {
    address: string;
    pickupTime: string;
  };
  pricingSummary: {
    subtotal: number;
    deliveryCharge: number;
    discounts: DiscountItem[];
    total: number;
  };
}

export const cartData: CartData = {
  laundryInfo: {
    name: 'Krishna Laundry',
    rating: 4.8,
    reviews: 231,
    distance: '1.2 km away',
    price: '₹50/kg',
  },
  services: [
    { name: 'Wash and Fold', price: '₹50/kg', quantity: '4kg', total: 200, icon: 'shirt-outline' },
    { name: 'Iron Only', price: '₹15/item', quantity: '5 items', total: 75, icon: 'sparkles-outline' },
    { name: 'Dry Clean', price: '₹120/item', quantity: '2 items', total: 240, icon: 'water-outline' },
  ],
  clothesSummary: [
    { name: 'Shirts', quantity: 3 },
    { name: 'Pants', quantity: 3 },
    { name: 'T-Shirts', quantity: 3 },
    { name: 'Bedsheets', quantity: 3 },
  ],
  pickupDetails: {
    address: '221b Baker Street, 700092',
    pickupTime: 'Tomorrow between 2:00 - 4:00 PM',
  },
  pricingSummary: {
    subtotal: 515,
    deliveryCharge: 515,
    discounts: [
      { label: 'Discount', value: '-50%' },
      { label: 'Discount', value: '-50%' },
    ],
    total: 485,
  },
};

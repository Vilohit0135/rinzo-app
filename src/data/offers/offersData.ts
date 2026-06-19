export interface Offer {
  id: string;
  title: string;
  description: string;
  validTill: string;
  icon: string;
  couponCode: string;
}

export const featuredOffer = {
  title: 'Get 30% Off',
  subtitle: 'on your first order',
  couponCode: 'FIRST30',
  description: 'Valid for first-time users only',
};

export const offersData: Offer[] = [
  {
    id: '1',
    title: 'FLAT50',
    description: 'Flat ₹50 off on...',
    validTill: 'valid till 20 may 2026',
    icon: 'ticket-outline',
    couponCode: 'FLAT50',
  },
  {
    id: '2',
    title: 'WASHREADY',
    description: '20% off on Wash &',
    validTill: 'valid till 20 may 2026',
    icon: 'water-outline',
    couponCode: 'WASHREADY',
  },
  {
    id: '3',
    title: 'FREEDEL',
    description: 'Free pickup &...',
    validTill: 'valid till 20 may 2026',
    icon: 'car-outline',
    couponCode: 'FREEDEL',
  },
];

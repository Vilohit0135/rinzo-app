export interface Offer {
  id: string;
  title: string;
  description: string;
  validTill: string;
  icon: string;
}

export const featuredOffer = {
  title: 'Get 30% off',
  subtitle: 'On your first order',
  couponCode: '323232',
};

export const offersData: Offer[] = [
  {
    id: '1',
    title: 'Flat 20 %',
    description: 'Get 20% off on orders above 500',
    validTill: 'valid till 20 may 2026',
    icon: 'pricetag-outline',
  },
  {
    id: '2',
    title: 'Freeship',
    description: 'Free Delivery on all orders',
    validTill: 'valid till 20 may 2026',
    icon: 'gift-outline',
  },
  {
    id: '3',
    title: 'Iron 15',
    description: '10% on iron services',
    validTill: 'valid till 20 may 2026',
    icon: 'pricetag-outline',
  },
];

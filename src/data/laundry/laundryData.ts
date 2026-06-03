export interface LaundryService {
  name: string;
  price: string;
}

export interface ReviewStar {
  label: string;
  percentage: number;
}

export interface LaundryItem {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  price: string;
  deliveryTime: string;
  icon?: string;
  isOpen: boolean;
  closingTime: string;
  tags: string[];
  services: LaundryService[];
  description: string;
  reviewSummary: ReviewStar[];
}

export const laundryItems: LaundryItem[] = [
  {
    id: 'krishna-laundry',
    name: 'Krishna Laundry',
    rating: 4.8,
    reviewCount: 231,
    distance: '1.2 km away',
    price: '₹50/kg',
    deliveryTime: '2:00 PM',
    icon: 'shirt-outline',
    isOpen: true,
    closingTime: '10:00 PM',
    tags: ['Pickup Available', 'Fast Service'],
    services: [
      { name: 'Wash and Fold', price: '₹200' },
      { name: 'Iron Only', price: '₹15/item' },
      { name: 'Dry Cleaning', price: '₹125/item' },
      { name: 'Bedsheets', price: '₹125/item' },
      { name: 'Shoe Cleaning', price: '₹125/item' },
    ],
    description: 'Krishna Laundry provides premium laundry with fast service with fast pickup and delivery. We ensure quality and hygiene in every wash.',
    reviewSummary: [
      { label: '5 Star', percentage: 72 },
      { label: '4 Star', percentage: 46 },
    ],
  },
  {
    id: 'royal-wash',
    name: 'Royal Wash',
    rating: 4.9,
    reviewCount: 345,
    distance: '0.8 km away',
    price: '₹60/kg',
    deliveryTime: '1:00 PM',
    icon: 'sparkles-outline',
    isOpen: true,
    closingTime: '11:00 PM',
    tags: ['Express', 'Eco Friendly'],
    services: [
      { name: 'Wash and Fold', price: '₹250' },
      { name: 'Iron Only', price: '₹20/item' },
      { name: 'Dry Cleaning', price: '₹150/item' },
      { name: 'Curtains', price: '₹200/item' },
      { name: 'Shoe Cleaning', price: '₹100/item' },
    ],
    description: 'Royal Wash offers express laundry services with eco-friendly detergents. Same-day delivery available for orders placed before noon.',
    reviewSummary: [
      { label: '5 Star', percentage: 80 },
      { label: '4 Star', percentage: 35 },
    ],
  },
  {
    id: 'eco-laundry-hub',
    name: 'Eco Laundry Hub',
    rating: 4.7,
    reviewCount: 156,
    distance: '3.1 km away',
    price: '₹45/kg',
    deliveryTime: '5:00 PM',
    icon: 'leaf-outline',
    isOpen: false,
    closingTime: '9:00 PM',
    tags: ['Budget', 'Eco Friendly'],
    services: [
      { name: 'Wash and Fold', price: '₹150' },
      { name: 'Iron Only', price: '₹12/item' },
      { name: 'Dry Cleaning', price: '₹100/item' },
      { name: 'Bedsheets', price: '₹100/item' },
      { name: 'Blankets', price: '₹250/item' },
    ],
    description: 'Eco Laundry Hub provides affordable laundry services using organic detergents. Budget-friendly options without compromising on quality.',
    reviewSummary: [
      { label: '5 Star', percentage: 60 },
      { label: '4 Star', percentage: 50 },
    ],
  },
  {
    id: 'sparkle-dry-clean',
    name: 'Sparkle Dry Clean',
    rating: 4.6,
    reviewCount: 189,
    distance: '2.5 km away',
    price: '₹80/kg',
    deliveryTime: '4:00 PM',
    icon: 'water-outline',
    isOpen: true,
    closingTime: '9:30 PM',
    tags: ['Dry Clean', 'Free Pickup'],
    services: [
      { name: 'Dry Cleaning', price: '₹180/item' },
      { name: 'Wash and Fold', price: '₹220' },
      { name: 'Iron Only', price: '₹18/item' },
      { name: 'Suit Cleaning', price: '₹300/item' },
      { name: 'Carpet Wash', price: '₹500/item' },
    ],
    description: 'Sparkle Dry Clean specializes in dry cleaning and garment care. Free pickup and delivery with professional stain treatment for all fabrics.',
    reviewSummary: [
      { label: '5 Star', percentage: 55 },
      { label: '4 Star', percentage: 55 },
    ],
  },
];

export const getLaundryById = (id: string): LaundryItem | undefined =>
  laundryItems.find((item) => item.id === id);

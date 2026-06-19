export interface GarmentItem {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women' | 'household' | 'kids';
  icon: string;
  targetServiceId: string; // The service this item maps to in the booking store
}

export const garmentItems: GarmentItem[] = [
  // Men
  { id: 'm1', name: 'Shirt', price: 15, category: 'men', icon: 'shirt-outline', targetServiceId: '2' },
  { id: 'm2', name: 'Pants', price: 15, category: 'men', icon: 'body-outline', targetServiceId: '2' },
  { id: 'm3', name: 'T-Shirt', price: 15, category: 'men', icon: 'shirt-outline', targetServiceId: '2' },
  { id: 'm4', name: 'Suit', price: 120, category: 'men', icon: 'ribbon-outline', targetServiceId: '3' },
  { id: 'm5', name: 'Kurta', price: 15, category: 'men', icon: 'body-outline', targetServiceId: '2' },
  
  // Women
  { id: 'w1', name: 'Saree', price: 120, category: 'women', icon: 'color-palette-outline', targetServiceId: '3' },
  { id: 'w2', name: 'Dress', price: 120, category: 'women', icon: 'woman-outline', targetServiceId: '3' },
  { id: 'w3', name: 'Top', price: 15, category: 'women', icon: 'shirt-outline', targetServiceId: '2' },
  { id: 'w4', name: 'Jeans', price: 15, category: 'women', icon: 'body-outline', targetServiceId: '2' },
  { id: 'w5', name: 'Kurti', price: 15, category: 'women', icon: 'woman-outline', targetServiceId: '2' },

  // Household
  { id: 'h1', name: 'Bedsheet', price: 15, category: 'household', icon: 'bed-outline', targetServiceId: '2' },
  { id: 'h2', name: 'Blanket', price: 180, category: 'household', icon: 'albums-outline', targetServiceId: '6' },
  { id: 'h3', name: 'Curtain', price: 200, category: 'household', icon: 'document-text-outline', targetServiceId: '8' },
  { id: 'h4', name: 'Towel', price: 15, category: 'household', icon: 'water-outline', targetServiceId: '2' },

  // Kids
  { id: 'k1', name: 'Kids T-Shirt', price: 15, category: 'kids', icon: 'shirt-outline', targetServiceId: '2' },
  { id: 'k2', name: 'Kids Pants', price: 15, category: 'kids', icon: 'body-outline', targetServiceId: '2' },
  { id: 'k3', name: 'Kids Frock', price: 15, category: 'kids', icon: 'woman-outline', targetServiceId: '2' },
];

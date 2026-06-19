export interface GarmentItem {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women' | 'household' | 'kids';
  icon: string;
  subtitle: string;
  targetServiceId: string; // The service this item maps to in the booking store
}

export const garmentItems: GarmentItem[] = [
  // Men
  { id: 'm1', name: 'Cotton Shirt', price: 40, category: 'men', icon: 'shirt-outline', subtitle: 'Wash & Iron', targetServiceId: '4' },
  { id: 'm2', name: 'Formal Trousers', price: 65, category: 'men', icon: 'shirt-outline', subtitle: 'Dry Clean', targetServiceId: '3' },
  { id: 'm3', name: 'Premium Blazer', price: 180, category: 'men', icon: 'shirt-outline', subtitle: 'Steamed & Boxed', targetServiceId: '3' },
  { id: 'm4', name: 'Denim Jeans', price: 55, category: 'men', icon: 'shirt-outline', subtitle: 'Deep Clean', targetServiceId: '3' },
  { id: 'm5', name: 'Casual T-shirt', price: 30, category: 'men', icon: 'shirt-outline', subtitle: 'Wash & Fold', targetServiceId: '1' },
  
  // Women
  { id: 'w1', name: 'Silk Saree', price: 150, category: 'women', icon: 'color-palette-outline', subtitle: 'Dry Clean', targetServiceId: '3' },
  { id: 'w2', name: 'Dress', price: 120, category: 'women', icon: 'woman-outline', subtitle: 'Dry Clean', targetServiceId: '3' },
  { id: 'w3', name: 'Jeans', price: 55, category: 'women', icon: 'shirt-outline', subtitle: 'Wash & Iron', targetServiceId: '4' },
  { id: 'w4', name: 'Kurti', price: 40, category: 'women', icon: 'woman-outline', subtitle: 'Wash & Iron', targetServiceId: '4' },

  // Household
  { id: 'h1', name: 'Bedsheet', price: 40, category: 'household', icon: 'bed-outline', subtitle: 'Wash & Fold', targetServiceId: '1' },
  { id: 'h2', name: 'Blanket', price: 180, category: 'household', icon: 'albums-outline', subtitle: 'Blanket Wash', targetServiceId: '6' },
  { id: 'h3', name: 'Curtain', price: 200, category: 'household', icon: 'document-text-outline', subtitle: 'Curtain Dry Clean', targetServiceId: '8' },

  // Kids
  { id: 'k1', name: 'Kids Dress', price: 30, category: 'kids', icon: 'shirt-outline', subtitle: 'Wash & Fold', targetServiceId: '1' },
  { id: 'k2', name: 'Kids Pants', price: 30, category: 'kids', icon: 'shirt-outline', subtitle: 'Wash & Fold', targetServiceId: '1' },
];

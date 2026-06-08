export interface ServiceItem {
  id: string;
  title: string;
  unitPrice: number;
  unit: string;
  subtitle: string;
  duration: string;
}

export const allServices: ServiceItem[] = [
  {
    id: '1',
    title: 'Wash & Fold',
    unitPrice: 50,
    unit: 'Kg',
    subtitle: 'Wash, Dry and Neatly Folded',
    duration: '24 hrs',
  },
  {
    id: '2',
    title: 'Iron Only',
    unitPrice: 15,
    unit: 'Itm',
    subtitle: 'Professional Steam Ironing',
    duration: '12 hrs',
  },
  {
    id: '3',
    title: 'Dry Clean',
    unitPrice: 120,
    unit: 'Itm',
    subtitle: 'Premium Dry Cleaning Service',
    duration: '48 hrs',
  },
  {
    id: '4',
    title: 'Wash & Iron',
    unitPrice: 65,
    unit: 'Kg',
    subtitle: 'Wash, Dry & Iron Everything',
    duration: '24 hrs',
  },
  {
    id: '5',
    title: 'Steam Press',
    unitPrice: 25,
    unit: 'Itm',
    subtitle: 'Heavy Duty Steam Pressing',
    duration: '6 hrs',
  },
  {
    id: '6',
    title: 'Blanket Wash',
    unitPrice: 180,
    unit: 'Itm',
    subtitle: 'Deep Clean for Blankets & Quilts',
    duration: '48 hrs',
  },
  {
    id: '7',
    title: 'Shoe Cleaning',
    unitPrice: 99,
    unit: 'Pair',
    subtitle: 'Complete Shoe Care & Polish',
    duration: '24 hrs',
  },
  {
    id: '8',
    title: 'Curtain Dry Clean',
    unitPrice: 200,
    unit: 'Itm',
    subtitle: 'Curtain & Drapes Specialist',
    duration: '72 hrs',
  },
];

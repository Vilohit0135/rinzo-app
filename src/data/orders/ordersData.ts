export interface OrderItem {
  id: string;
  status: 'ongoing' | 'completed' | 'cancelled';
  statusLabel: string;
  laundryId: string;
  date: string;
  amount: string;
}

export const ordersData: OrderItem[] = [
  {
    id: 'RZ12345',
    status: 'ongoing',
    statusLabel: 'Washing in Progress',
    laundryId: 'krishna-laundry',
    date: 'Today 2:00PM',
    amount: '₹200',
  },
  {
    id: 'RZ12345',
    status: 'completed',
    statusLabel: 'Delivered',
    laundryId: 'krishna-laundry',
    date: 'Today 2:00PM',
    amount: '₹320',
  },
  {
    id: 'RZ12345',
    status: 'cancelled',
    statusLabel: 'Cancelled',
    laundryId: 'krishna-laundry',
    date: 'Today 2:00PM',
    amount: '₹320',
  },
];

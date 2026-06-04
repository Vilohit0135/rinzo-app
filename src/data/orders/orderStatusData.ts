import { ordersData } from './ordersData';
import { laundryItems } from '../laundry/laundryData';

export interface OrderStatusData {
  orderId: string;
  laundryName: string;
  pickupTime: string;
  status: string;
}

const currentOrder = ordersData[0];
const laundry = laundryItems.find((item) => item.id === currentOrder.laundryId);

export const orderStatusData: OrderStatusData = {
  orderId: currentOrder.id,
  laundryName: laundry?.name || 'Laundry',
  pickupTime: currentOrder.date,
  status: 'picked up',
};

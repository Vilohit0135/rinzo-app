export interface EmptyOrdersData {
  hasOrders: boolean;
  title: string;
  subtitle: string;
}

export const emptyOrdersData: EmptyOrdersData = {
  hasOrders: false,
  title: 'No Orders Yet',
  subtitle: "Looks like you havent add any orders yet",
};

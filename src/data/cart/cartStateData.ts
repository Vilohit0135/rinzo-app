export interface CartState {
  itemCount: number;
  title: string;
  subtitle: string;
}

export const cartStateData: CartState = {
  itemCount: 0,
  title: 'Your cart is empty',
  subtitle: "Looks like you haven't add any service yet",
};

export interface PaymentMethodItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'radio' | 'chevron';
}

export interface BankOptionItem {
  id: string;
  title: string;
  icon: string;
}

export const upiMethods: PaymentMethodItem[] = [
  {
    id: 'google_pay',
    title: 'Google Pay',
    icon: 'cash-outline',
    type: 'radio',
  },
  {
    id: 'phonepe',
    title: 'PhonePe',
    icon: 'phone-portrait-outline',
    type: 'radio',
  },
  {
    id: 'enter_upi',
    title: 'Enter UPI ID',
    icon: 'at-outline',
    type: 'chevron',
  },
];

export const cardMethods: PaymentMethodItem[] = [
  {
    id: 'credit_card',
    title: 'Credit/Debit Card',
    subtitle: 'Visa, Mastercard, RuPay',
    icon: 'card-outline',
    type: 'chevron',
  },
];

export const bankOptions: BankOptionItem[] = [
  {
    id: 'hdfc',
    title: 'HDFC',
    icon: 'business-outline',
  },
  {
    id: 'icici',
    title: 'ICICI',
    icon: 'business-outline',
  },
  {
    id: 'sbi',
    title: 'SBI',
    icon: 'business-outline',
  },
  {
    id: 'search_bank',
    title: 'Search',
    icon: 'search-outline',
  },
];

export const otherOptions: PaymentMethodItem[] = [
  {
    id: 'cod',
    title: 'Cash on Delivery',
    subtitle: 'Pay after service',
    icon: 'cash-outline',
    type: 'radio',
  },
];

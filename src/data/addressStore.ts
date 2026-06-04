export interface AddressItem {
  title: string;
  address1: string;
  address2: string;
  contact: string;
  isDefault: boolean;
}

let addresses: AddressItem[] = [
  {
    title: 'Home ( Default )',
    address1: '221b Baker Street',
    address2: 'Bengaluru, 500012',
    contact: 'Ms Mira Sharma – 94444283283',
    isDefault: true,
  },
  {
    title: 'Work',
    address1: '221b Baker Street',
    address2: 'Bengaluru, 500012',
    contact: 'Ms Mira Sharma – 94444283283',
    isDefault: false,
  },
  {
    title: 'Parents House',
    address1: '221b Baker Street',
    address2: 'Bengaluru, 500012',
    contact: 'Ms Mira Sharma – 94444283283',
    isDefault: false,
  },
];

const listeners = new Set<() => void>();

export function getAddresses(): AddressItem[] {
  return addresses;
}

export function addAddress(addr: AddressItem): void {
  addresses = [...addresses, addr];
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

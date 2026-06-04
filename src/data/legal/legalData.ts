export interface LegalMenuItem {
  id: string;
  title: string;
  icon: string;
}

export const legalMenuItems: LegalMenuItem[] = [
  {
    id: 'terms',
    title: 'Terms of Service',
    icon: 'chatbubble',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: 'chatbubble',
  },
  {
    id: 'refund',
    title: 'Refund & Cancellation Policy',
    icon: 'chatbubble',
  },
  {
    id: 'data',
    title: 'Data Policy',
    icon: 'server-outline',
  },
  {
    id: 'about',
    title: 'About Rinzo',
    icon: 'chatbubble',
  },
];

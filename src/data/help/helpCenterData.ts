export interface HelpTopic {
  id: string;
  icon: string;
  title: string;
}

export const helpTopics: HelpTopic[] = [
  { id: 'pickup', icon: 'help-circle', title: 'How does pickup work ?' },
  { id: 'track', icon: 'location', title: 'How to track my order ?' },
  { id: 'refund', icon: 'card', title: 'Cancellation and Refund' },
  { id: 'payment', icon: 'card', title: 'Payment Issues' },
  { id: 'guidelines', icon: 'card', title: 'Laundry Guidelines' },
];

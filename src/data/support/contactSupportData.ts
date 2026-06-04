export interface SupportOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface Conversation {
  id: string;
  orderId: string;
  issue: string;
}

export const supportOptions: SupportOption[] = [
  {
    id: 'chat',
    title: 'How does pickup work?',
    subtitle: 'Get instant help',
    icon: 'chatbubble',
  },
  {
    id: 'call',
    title: 'Call Support',
    subtitle: '9AM - 9PM , Mon - Sun',
    icon: 'call',
  },
  {
    id: 'email',
    title: 'Email Support',
    subtitle: 'support@laundry.com',
    icon: 'mail',
  },
];

export const recentConversation: Conversation = {
  id: 'conv_1',
  orderId: 'Order#12131323234',
  issue: 'Delivery Issue',
};

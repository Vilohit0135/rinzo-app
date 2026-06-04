export interface SupportMenu {
  id: string;
  title: string;
  icon: string;
  route: string;
}

export const helpSupportData: SupportMenu[] = [
  {
    id: '1',
    title: 'FAQ',
    icon: 'help-circle',
    route: 'HelpCenter',
  },
  {
    id: '2',
    title: 'Contact Support',
    icon: 'at-circle',
    route: 'ContactSupport',
  },
  {
    id: '3',
    title: 'Chat with us',
    icon: 'chatbubbles',
    route: 'ChatSupport',
  },
  {
    id: '4',
    title: 'Report an Issue',
    icon: 'alert-circle',
    route: 'ReportIssue',
  },
  {
    id: '5',
    title: 'Terms and Conditions',
    icon: 'document-text',
    route: 'TermsPrivacy',
  },
  {
    id: '6',
    title: 'Privacy Policy',
    icon: 'lock-closed',
    route: 'TermsPrivacy',
  },
];

export interface MenuItemData {
  icon: string;
  title: string;
}

export interface MenuSectionData {
  heading: string;
  items: MenuItemData[];
}

export interface ProfileData {
  userProfile: {
    name: string;
    email: string;
    mobile: string;
    dateOfBirth: string;
    gender: string;
    preferredLanguage: string;
    profileImage: number;
  };
  stats: {
    totalOrders: number;
    totalSavings: number;
  };
  accountMenu: MenuSectionData;
  activityMenu: MenuSectionData;
  supportMenu: MenuSectionData;
}

export const profileData: ProfileData = {
  userProfile: {
    name: 'Mira Sharma',
    email: 'mira.sharma@gmail.com',
    mobile: '+91 83334747583',
    dateOfBirth: '3/10/2001',
    gender: 'Female',
    preferredLanguage: 'English',
    profileImage: require('../../assets/images/profile.png'),
  },
  stats: {
    totalOrders: 24,
    totalSavings: 200,
  },
  accountMenu: {
    heading: 'Account',
    items: [
      { icon: 'person-circle', title: 'Personal Information' },
      { icon: 'location', title: 'Saved Address' },
      { icon: 'card', title: 'Payment Methods' },
    ],
  },
  activityMenu: {
    heading: 'Activity',
    items: [
      { icon: 'receipt', title: 'Order History' },
      { icon: 'star', title: 'Review and Ratings' },
    ],
  },
  supportMenu: {
    heading: 'Support',
    items: [
      { icon: 'help-circle', title: 'Help Center' },
      { icon: 'help-circle-outline', title: 'Help and Support' },
      { icon: 'chatbubble', title: 'Contact Support' },
      { icon: 'lock-closed', title: 'Terms and Privacy' },
    ],
  },
};

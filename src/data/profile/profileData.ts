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
      { icon: 'heart', title: 'Favourites' },
      { icon: 'star', title: 'Review and Ratings' },
    ],
  },
  supportMenu: {
    heading: 'Support',
    items: [
      { icon: 'help-circle', title: 'Help Center' },
      { icon: 'chatbubble', title: 'Contact Support' },
      { icon: 'lock-closed', title: 'Terms and Privacy' },
    ],
  },
};

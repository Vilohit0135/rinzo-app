export interface OnboardingItem {
  id: number;
  image: any;
  title: string;
  description: string;
}

export const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    image: require('../../../assets/images/onboarding-2.png'),
    title: 'Pickup at your Doorstep',
    description: 'We pickup your clothes from Doorstep and deliver them fresh and Clean',
  },
  {
    id: 2,
    image: require('../../../assets/images/onboarding-1.png'),
    title: 'Pickup at your Doorstep',
    description: 'We pickup your clothes from Doorstep and deliver them fresh and Clean',
  },
  {
    id: 3,
    image: require('../../../assets/images/onboarding-3.png'),
    title: 'Pickup at your Doorstep',
    description: 'We pickup your clothes from Doorstep and deliver them fresh and Clean',
  },
];

export interface PickupDate {
  id: string;
  day: string;
  date: string;
}

export interface PickupTimeSlot {
  id: string;
  label: string;
}

const ordinalSuffix = (n: number): string => {
  if (n > 10 && n < 14) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
};

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const generatePickupDates = (): PickupDate[] => {
  const today = new Date();
  const dates: PickupDate[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const day = i === 0 ? 'Today' : shortDays[d.getDay()];
    const date = `${ordinalSuffix(d.getDate())} ${shortMonths[d.getMonth()]}`;
    dates.push({ id: String(i), day, date });
  }
  return dates;
};

export const pickupTimeSlots: PickupTimeSlot[] = [
  { id: '1', label: '9AM - 11AM' },
  { id: '2', label: '12PM - 1PM' },
  { id: '3', label: '1PM - 3PM' },
  { id: '4', label: '3PM - 4PM' },
  { id: '5', label: '4PM - 5PM' },
];

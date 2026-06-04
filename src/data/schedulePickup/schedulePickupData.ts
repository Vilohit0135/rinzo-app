export interface PickupDate {
  id: string;
  day: string;
  date: string;
}

export interface PickupTimeSlot {
  id: string;
  label: string;
}

export const pickupDates: PickupDate[] = [
  { id: '1', day: 'Today', date: '16th May' },
  { id: '2', day: 'Sat', date: '17th May' },
  { id: '3', day: 'Sun', date: '18th May' },
  { id: '4', day: 'Mon', date: '19th May' },
  { id: '5', day: 'Tue', date: '20th May' },
];

export const pickupTimeSlots: PickupTimeSlot[] = [
  { id: '1', label: '9AM - 11AM' },
  { id: '2', label: '12PM - 1PM' },
  { id: '3', label: '1PM - 3PM' },
  { id: '4', label: '3PM - 4PM' },
  { id: '5', label: '4PM - 5PM' },
];

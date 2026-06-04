# SchedulePickup Screen — Complete Build Plan

## 7 New Files, 3 Modified, 2 Deleted

---

## FILE 1: src/data/schedulePickup/schedulePickupData.ts

```ts
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
```

---

## FILE 2: src/components/schedule-pickup/ScheduleHeader.tsx

```tsx
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ScheduleHeaderProps {
  onBack: () => void;
  title?: string;
}

const ScheduleHeader = ({ onBack, title = 'Schedule Pickup' }: ScheduleHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={24} color="#A9A9A9" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  backButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 24,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    color: '#171A2C',
  },
});

export default ScheduleHeader;
```

---

## FILE 3: src/components/schedule-pickup/DateCard.tsx

```tsx
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface DateCardProps {
  day: string;
  date: string;
  isSelected: boolean;
  onPress: () => void;
}

const DateCard = ({ day, date, isSelected, onPress }: DateCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.day, isSelected && styles.daySelected]}>{day}</Text>
      <Text style={[styles.dateText, isSelected && styles.dateTextSelected]}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 118,
    height: 118,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSelected: {
    backgroundColor: '#8257E6',
    borderWidth: 0,
  },
  day: {
    fontSize: 22,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  daySelected: {
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 4,
  },
  dateTextSelected: {
    color: '#FFFFFF',
  },
});

export default DateCard;
```

---

## FILE 4: src/components/schedule-pickup/DateSelector.tsx

```tsx
import { ScrollView, StyleSheet } from 'react-native';
import DateCard from './DateCard';
import type { PickupDate } from '../../data/schedulePickup/schedulePickupData';

interface DateSelectorProps {
  dates: PickupDate[];
  selectedDate: string;
  onSelectDate: (id: string) => void;
}

const DateSelector = ({ dates, selectedDate, onSelectDate }: DateSelectorProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {dates.map((item) => (
        <DateCard
          key={item.id}
          day={item.day}
          date={item.date}
          isSelected={item.id === selectedDate}
          onPress={() => onSelectDate(item.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    gap: 16,
    height: 120,
    alignItems: 'center',
    marginTop: 24,
  },
});

export default DateSelector;
```

---

## FILE 5: src/components/schedule-pickup/TimeSlotCard.tsx

```tsx
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TimeSlotCardProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const TimeSlotCard = ({ label, isSelected, onPress }: TimeSlotCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 84,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    justifyContent: 'center',
    borderWidth: 0,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#B794FF',
  },
  label: {
    fontSize: 22,
    fontWeight: '700',
    color: '#171A2C',
  },
});

export default TimeSlotCard;
```

---

## FILE 6: src/components/schedule-pickup/TimeSlotList.tsx

```tsx
import { View, StyleSheet } from 'react-native';
import TimeSlotCard from './TimeSlotCard';
import type { PickupTimeSlot } from '../../data/schedulePickup/schedulePickupData';

interface TimeSlotListProps {
  slots: PickupTimeSlot[];
  selectedSlot: string;
  onSelectSlot: (id: string) => void;
}

const TimeSlotList = ({ slots, selectedSlot, onSelectSlot }: TimeSlotListProps) => {
  return (
    <View style={styles.container}>
      {slots.map((slot) => (
        <TimeSlotCard
          key={slot.id}
          label={slot.label}
          isSelected={slot.id === selectedSlot}
          onPress={() => onSelectSlot(slot.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    gap: 18,
    marginTop: 28,
  },
});

export default TimeSlotList;
```

---

## FILE 7: src/screens/orders/SchedulePickupScreen.tsx

```tsx
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { pickupDates, pickupTimeSlots } from '../../data/schedulePickup/schedulePickupData';
import ScheduleHeader from '../../components/schedule-pickup/ScheduleHeader';
import DateSelector from '../../components/schedule-pickup/DateSelector';
import TimeSlotList from '../../components/schedule-pickup/TimeSlotList';

type Props = NativeStackScreenProps<RootStackParamList, 'SchedulePickup'>;

const SchedulePickupScreen = ({ navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>('1');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('1');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScheduleHeader onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.sectionTitleRow}>
          <View style={styles.sectionBullet} />
          <View style={styles.sectionTitleText}>
            <View />
            <View />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
});

export default SchedulePickupScreen;
```

Wait, I need to fix the Screen file above -- let me rewrite it properly:

## FILE 7 (CORRECTED): src/screens/orders/SchedulePickupScreen.tsx

```tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { pickupDates, pickupTimeSlots } from '../../data/schedulePickup/schedulePickupData';
import ScheduleHeader from '../../components/schedule-pickup/ScheduleHeader';
import DateSelector from '../../components/schedule-pickup/DateSelector';
import TimeSlotList from '../../components/schedule-pickup/TimeSlotList';

type Props = NativeStackScreenProps<RootStackParamList, 'SchedulePickup'>;

const SchedulePickupScreen = ({ navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>('1');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('1');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScheduleHeader onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Choose Date</Text>
        <DateSelector
          dates={pickupDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <Text style={[styles.sectionTitle, styles.sectionTitleSpacing]}>Choose Time Slot</Text>
        <TimeSlotList
          slots={pickupTimeSlots}
          selectedSlot={selectedTimeSlot}
          onSelectSlot={setSelectedTimeSlot}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#171A2C',
    marginTop: 40,
    marginLeft: 24,
  },
  sectionTitleSpacing: {
    marginTop: 50,
  },
});

export default SchedulePickupScreen;
```

---

## MODIFICATION 1: src/types/navigation.ts

Add `SchedulePickup: undefined;` after `SchedulePickupTime: undefined;` (line 44 area)

## MODIFICATION 2: App.tsx

Add import: `import SchedulePickupScreen from './src/screens/orders/SchedulePickupScreen';`
Add Screen: `<Stack.Screen name="SchedulePickup" component={SchedulePickupScreen} />`

## MODIFICATION 3: src/screens/PickupDetails/PickupDetailsScreen.tsx

Change `navigation.navigate('SchedulePickupTime')` → `navigation.navigate('SchedulePickup')`

## DELETIONS

1. `src/screens/SchedulePickup/SchedulePickupScreen.tsx`
2. `src/screens/SchedulePickup/.gitkeep`

---

## Verification

Run `npx tsc --noEmit` — must pass with zero errors.
